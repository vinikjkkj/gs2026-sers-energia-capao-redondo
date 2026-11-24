# Módulo de energia (SERS) do Neighborhood Action Dashboard
# Aluno: Vinícius Alves de Souza, RM 575576 (Soluções em Energias Renováveis e Sustentáveis, FIAP)
# Lê dados/premissas.csv, calcula consumo, custo, payback e emissões de 4 alternativas de
# iluminação e grava resultados/ e dashboard/data/resultados.js
# Uso: python src/calcular.py [--readme]  (--readme também atualiza as tabelas do README)

import csv
import json
import math
import os
import re
import sys
from datetime import date

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARQ_PREMISSAS = os.path.join(RAIZ, "dados", "premissas.csv")
ARQ_IRRADIACAO = os.path.join(RAIZ, "dados", "irradiacao_sundata_sao_paulo.csv")
ARQ_QUALITATIVO = os.path.join(RAIZ, "dados", "qualitativo.json")
ARQ_README = os.path.join(RAIZ, "README.md")

IDS = ["A0", "A1", "A2", "A3"]
ANOS_PAYBACK_MAX = 50  # acima disso, "não se paga"


def ler_premissas(caminho=ARQ_PREMISSAS):
    linhas = []
    valores = {}
    with open(caminho, encoding="utf-8", newline="") as f:
        for linha in csv.DictReader(f):
            linhas.append(linha)
            valores[linha["id"]] = float(linha["valor"])
    return linhas, valores


def ler_irradiacao(caminho=ARQ_IRRADIACAO):
    meses = []
    with open(caminho, encoding="utf-8", newline="") as f:
        for linha in csv.DictReader(f):
            meses.append(
                {
                    "mes": linha["mes"],
                    "dias": int(linha["dias"]),
                    "horizontal": float(linha["horizontal_kwh_m2_dia"]),
                    "inclinado": float(linha["inclinado_24graus_kwh_m2_dia"]),
                }
            )
    return meses


def energia_kwh(potencia_w, horas):
    """E = P x t / 1000 (kWh)."""
    return potencia_w * horas / 1000


def arredonda_acima(valor, passo):
    return math.ceil(valor / passo - 1e-9) * passo


def calcular(p, meses):
    n = int(p["n_pontos_praca"] + p["n_pontos_onibus"])
    h = p["horas_noite"]
    d = p["dias_ano"]
    horas_ano = h * d

    tarifa = (p["tarifa_tusd_b4a"] + p["tarifa_te_b4a"]) / 1000 * p["fator_tarifa_encargos"]  # R$/kWh
    fe = p["fe_sin"]  # tCO2/MWh equivale numericamente a kg CO2/kWh

    # mesma necessidade de luz: o LED deve entregar pelo menos o fluxo (lm) que sai da luminária antiga
    fluxo_lampada = p["eficacia_hps"] * p["p_nominal_hps"]
    fluxo_util_antigo = fluxo_lampada * p["lor_luminaria_antiga"]
    fluxo_led = p["eficacia_led"] * p["p_led"]
    equivalencia_ok = fluxo_led >= fluxo_util_antigo

    h_ini = p["h_inicio_noite"]
    h_mad = p["h_madrugada"]
    h_ama = max(h - h_ini - h_mad, 0)
    nivel_mad = p["nivel_base"] + p["fracao_presenca"] * (1 - p["nivel_base"])
    horas_equivalentes = h_ini + h_mad * nivel_mad + h_ama  # horas a 100% por noite

    # carga elétrica: E = P x t / 1000 (kWh por noite e por ano)
    p_ponto_hps = p["p_lampada_hps"] + p["p_reator"]
    carga_noite = {
        "A0": energia_kwh(n * p_ponto_hps, h),
        "A1": energia_kwh(n * p["p_led"], h),
    }
    aux_dia = energia_kwh(n * p["p_aux_sensor"], 24)
    carga_noite["A2"] = energia_kwh(n * p["p_led"], horas_equivalentes) + aux_dia
    carga_noite["A3"] = carga_noite["A2"]
    carga_ano = {k: v * d for k, v in carga_noite.items()}

    # A2: geração FV na rede, com a série mensal de irradiação do SunData
    soma_h_dias = sum(m["inclinado"] * m["dias"] for m in meses)
    irr_media = soma_h_dias / sum(m["dias"] for m in meses)
    irr_critica = min(m["inclinado"] for m in meses)
    rendimento_kwp = soma_h_dias * p["pr_ongrid"]  # kWh por kWp por ano
    kwp_necessario = carga_ano["A2"] / rendimento_kwp
    n_modulos = max(1, round(kwp_necessario * 1000 / p["wp_modulo"]))
    kwp_fv = n_modulos * p["wp_modulo"] / 1000
    geracao_fv = kwp_fv * rendimento_kwp
    fv_utilizada = min(geracao_fv, carga_ano["A2"])
    capex_fv = kwp_fv * 1000 * p["custo_fv_wp"]

    # A3: painel dimensionado pelo pior mês e bateria pela autonomia desejada (por ponto)
    energia_dia_ponto_wh = carga_noite["A3"] / n * 1000
    wp_painel = arredonda_acima(energia_dia_ponto_wh / (irr_critica * p["pr_offgrid"]), 10)
    wh_bateria = arredonda_acima(energia_dia_ponto_wh * p["autonomia_noites"] / p["dod_bateria"], 10)
    custo_painel = wp_painel * p["preco_painel_wp"]
    custo_bateria = wh_bateria * p["preco_bateria_wh"]
    capex_ponto_a3 = (
        custo_painel + custo_bateria + p["custo_controlador"] + p["preco_luminaria_led"]
        + p["custo_adaptacao_poste"] + p["custo_instalacao_solar"]
    )
    geracao_a3_ano = n * wp_painel / 1000 * irr_media * d * p["pr_offgrid"]

    capex_led = n * (p["preco_luminaria_led"] + p["custo_instalacao_ponto"])
    capex = {
        "A0": 0.0,
        "A1": capex_led,
        "A2": capex_led + n * p["custo_sensor_dimmer"] + capex_fv,
        "A3": n * capex_ponto_a3,
    }
    capex_detalhe = {
        "A0": {},
        "A1": {"Luminárias LED": n * p["preco_luminaria_led"], "Instalação": n * p["custo_instalacao_ponto"]},
        "A2": {
            "Luminárias LED": n * p["preco_luminaria_led"],
            "Instalação": n * p["custo_instalacao_ponto"],
            "Sensores e dimerização": n * p["custo_sensor_dimmer"],
            "Sistema fotovoltaico": capex_fv,
        },
        "A3": {
            "Painéis FV": n * custo_painel,
            "Baterias": n * custo_bateria,
            "Controlador e cabos": n * p["custo_controlador"],
            "Luminárias LED": n * p["preco_luminaria_led"],
            "Adaptação do poste": n * p["custo_adaptacao_poste"],
            "Instalação": n * p["custo_instalacao_solar"],
        },
    }

    anos_entre_trocas = p["vida_hps_h"] / horas_ano
    om = {
        "A0": n * p["custo_troca_hps"] / anos_entre_trocas,
        "A1": n * p["om_led_ponto"],
        "A2": n * p["om_led_ponto"] + p["om_fv_pct"] * capex_fv,
        "A3": n * (p["om_solar_ponto"] + custo_bateria / p["vida_bateria_anos"]),
    }
    rede_liquida = {  # kWh/ano comprados da rede depois da compensação FV
        "A0": carga_ano["A0"],
        "A1": carga_ano["A1"],
        "A2": carga_ano["A2"] - fv_utilizada,
        "A3": 0.0,
    }
    # só a fração fator_compensacao da geração FV abate o valor da tarifa (efeito do Fio B)
    custo_energia = {
        "A0": carga_ano["A0"] * tarifa,
        "A1": carga_ano["A1"] * tarifa,
        "A2": (carga_ano["A2"] - fv_utilizada * p["fator_compensacao"]) * tarifa,
        "A3": 0.0,
    }
    renovavel_kwh = {"A0": 0.0, "A1": 0.0, "A2": fv_utilizada, "A3": carga_ano["A3"]}

    emissao_rede = {k: rede_liquida[k] * fe for k in IDS}
    emissao_ciclo_fv = {k: renovavel_kwh[k] * p["ef_ciclo_fv"] / 1000 for k in IDS}
    base_emissao = emissao_rede["A0"]

    base_custo_total = custo_energia["A0"] + om["A0"]
    base_carga = carga_ano["A0"]
    qual = json.load(open(ARQ_QUALITATIVO, encoding="utf-8"))
    alternativas = []
    for k in IDS:
        custo_total = custo_energia[k] + om[k]
        economia_ano = base_custo_total - custo_total
        # payback simples = investimento / economia anual, sem desconto
        payback = capex[k] / economia_ano if (capex[k] > 0 and economia_ano > 0) else None
        if payback is not None and payback > ANOS_PAYBACK_MAX:
            payback = None
        evitadas_op = base_emissao - emissao_rede[k]
        evitadas_liq = evitadas_op - emissao_ciclo_fv[k]
        horas_economia = h_mad if k in ("A2", "A3") else 0.0
        # origem da economia em kWh/mês (rede, LED, dimerização, solar)
        carga_led = carga_ano["A1"] if k != "A0" else carga_ano["A0"]
        decomp = {
            "rede": rede_liquida[k] / 12,
            "eficiencia_led": (base_carga - carga_led) / 12 if k != "A0" else 0.0,
            "dimerizacao": (carga_led - carga_ano[k]) / 12 if k in ("A2", "A3") else 0.0,
            "renovavel": renovavel_kwh[k] / 12,
        }
        alternativas.append(
            {
                **{c: qual[k][c] for c in ("id", "nome", "nome_completo", "descricao", "renovavel",
                                           "viabilidade", "impactos_ambientais", "beneficios", "limitacoes")},
                "potencia_ponto_w": p_ponto_hps if k == "A0" else p["p_led"],
                "energia_noite_kwh": carga_noite[k],
                "carga_kwh_ano": carga_ano[k],
                "carga_kwh_mes": carga_ano[k] / 12,
                "rede_kwh_mes": rede_liquida[k] / 12,
                "renovavel_kwh_mes": renovavel_kwh[k] / 12,
                "economia_carga_pct": 100 * (1 - carga_ano[k] / base_carga),
                "economia_rede_kwh_mes": (base_carga - rede_liquida[k]) / 12,
                "economia_rede_pct": 100 * (1 - rede_liquida[k] / base_carga),
                "custo_energia_rs_mes": custo_energia[k] / 12,
                "custo_om_rs_mes": om[k] / 12,
                "custo_operacao_rs_mes": custo_total / 12,
                "economia_rs_mes": economia_ano / 12,
                "economia_rs_ano": economia_ano,
                "capex_rs": capex[k],
                "capex_detalhe_rs": capex_detalhe[k],
                "payback_anos": payback,
                "economia_liquida_10anos_rs": economia_ano * 10 - capex[k],
                "participacao_renovavel_pct": 100 * renovavel_kwh[k] / carga_ano[k],
                "horas_modo_economia_dia": horas_economia,
                "emissoes_rede_kg_ano": emissao_rede[k],
                "emissoes_evitadas_kg_ano": evitadas_op,
                "emissoes_ciclo_fv_kg_ano": emissao_ciclo_fv[k],
                "emissoes_evitadas_liquidas_kg_ano": evitadas_liq,
                "mercurio_retirado_mg": n * p["hg_mg_hps"] if k != "A0" else 0.0,
                "decomposicao_kwh_mes": decomp,
            }
        )

    mensal = {
        "meses": [m["mes"] for m in meses],
        "irradiacao_inclinada": [m["inclinado"] for m in meses],
        "carga_a2_kwh": [carga_noite["A2"] * m["dias"] for m in meses],
        "geracao_a2_kwh": [kwp_fv * m["inclinado"] * m["dias"] * p["pr_ongrid"] for m in meses],
        "carga_a3_kwh": [carga_noite["A3"] * m["dias"] for m in meses],
        "geracao_a3_kwh": [n * wp_painel / 1000 * m["inclinado"] * m["dias"] * p["pr_offgrid"] for m in meses],
    }

    dimensionamento = {
        "pontos_total": n,
        "pontos_praca": int(p["n_pontos_praca"]),
        "pontos_onibus": int(p["n_pontos_onibus"]),
        "horas_noite": h,
        "dias_ano": d,
        "tarifa_rs_kwh": tarifa,
        "fator_emissao_kg_kwh": fe,
        "potencia_ponto_convencional_w": p_ponto_hps,
        "fluxo_lampada_hps_lm": fluxo_lampada,
        "fluxo_util_antigo_lm": fluxo_util_antigo,
        "fluxo_led_lm": fluxo_led,
        "equivalencia_iluminacao_ok": equivalencia_ok,
        "led_dimerizado_horas_equivalentes": horas_equivalentes,
        "perfil": {"inicio_h": h_ini, "madrugada_h": h_mad, "amanhecer_h": h_ama, "nivel_madrugada_medio": nivel_mad},
        "irradiacao_media_kwh_m2_dia": irr_media,
        "irradiacao_mes_critico_kwh_m2_dia": irr_critica,
        "a2_kwp_necessario": kwp_necessario,
        "a2_modulos": n_modulos,
        "a2_kwp_instalado": kwp_fv,
        "a2_geracao_kwh_ano": geracao_fv,
        "a2_cobertura_pct": 100 * fv_utilizada / carga_ano["A2"],
        "a2_capex_fv_rs": capex_fv,
        "a3_energia_dia_ponto_wh": energia_dia_ponto_wh,
        "a3_painel_wp_por_ponto": wp_painel,
        "a3_bateria_wh_por_ponto": wh_bateria,
        "a3_capex_por_ponto_rs": capex_ponto_a3,
        "a3_geracao_kwh_ano": geracao_a3_ano,
        "vida_led_anos": p["vida_led_h"] / horas_ano,
        "anos_entre_trocas_hps": anos_entre_trocas,
        "ref_intelbras_preco_rs": p.get("ref_intelbras_preco"),
    }
    return {"dimensionamento": dimensionamento, "alternativas": alternativas, "mensal": mensal}


def _payback(res, alt):
    v = next(a for a in res["alternativas"] if a["id"] == alt)["payback_anos"]
    return v


def _evitadas(res, alt):
    return next(a for a in res["alternativas"] if a["id"] == alt)["emissoes_evitadas_liquidas_kg_ano"]


def sensibilidade(linhas, base, meses):
    """Varia uma premissa por vez entre o minimo e o maximo."""
    tabela = []
    for linha in linhas:
        if linha["sensibilidade"] != "sim":
            continue
        pid = linha["id"]
        vmin, vmax = float(linha["minimo"]), float(linha["maximo"])
        if vmin == vmax:
            continue
        saidas = []
        for v in (vmin, vmax):
            p = dict(base)
            p[pid] = v
            saidas.append(calcular(p, meses))
        tabela.append(
            {
                "id": pid,
                "descricao": linha["descricao"],
                "unidade": linha["unidade"],
                "base": base[pid],
                "minimo": vmin,
                "maximo": vmax,
                "payback_a1": [_payback(s, "A1") for s in saidas],
                "payback_a2": [_payback(s, "A2") for s in saidas],
                "payback_a3": [_payback(s, "A3") for s in saidas],
                "evitadas_liq_a2": [_evitadas(s, "A2") for s in saidas],
            }
        )

    def chave(x):
        return float("inf") if x is None else x

    # cenários combinados: em cada premissa vai a ponta que piora (ou melhora) o payback de A2
    pior, melhor = dict(base), dict(base)
    for t in tabela:
        if t["payback_a2"][0] == t["payback_a2"][1]:
            continue  # premissa sem efeito no payback de A2: fica no valor-base
        extremos = sorted(zip(t["payback_a2"], (t["minimo"], t["maximo"])), key=lambda z: chave(z[0]))
        melhor[t["id"]] = extremos[0][1]
        pior[t["id"]] = extremos[-1][1]
    cenarios = {}
    for nome, p in (("otimista", melhor), ("base", base), ("conservador", pior)):
        r = calcular(p, meses)
        cenarios[nome] = {
            "payback_a1": _payback(r, "A1"),
            "payback_a2": _payback(r, "A2"),
            "payback_a3": _payback(r, "A3"),
            "economia_rs_mes_a2": next(a for a in r["alternativas"] if a["id"] == "A2")["economia_rs_mes"],
            "evitadas_liq_a2": _evitadas(r, "A2"),
        }
    # ordena pelas premissas que mais mexem no payback de A2
    def amplitude(t):
        a, b = t["payback_a2"]
        return 1e9 if (a is None or b is None) else abs(b - a)

    tabela.sort(key=lambda t: -amplitude(t))
    return tabela, cenarios


def fmt(v, casas=1):
    if v is None:
        return "não se paga"
    s = f"{v:,.{casas}f}"
    return s.replace(",", "X").replace(".", ",").replace("X", ".")


def fmt_auto(v):
    return fmt(v, 0 if float(v).is_integer() else 2)


def fmt_par(par):
    if par[0] is None and par[1] is None:
        return "não se paga"
    return f"{fmt(par[0], 1)} a {fmt(par[1], 1)}"


def tabelas_markdown(res, sens, cenarios):
    alts = res["alternativas"]
    nomes = [a["nome"] for a in alts]
    cab = "| Indicador | " + " | ".join(nomes) + " |\n|---|" + "---:|" * len(alts) + "\n"

    def linha(rotulo, campo, casas=1):
        return f"| {rotulo} | " + " | ".join(fmt(a[campo], casas) for a in alts) + " |\n"

    t0 = cab
    t0 += linha("Compra líquida da rede (kWh/mês)", "rede_kwh_mes", 1)
    t0 += linha("Economia de energia da rede (%)", "economia_rede_pct", 1)
    t0 += linha("Participação de energia renovável (%)", "participacao_renovavel_pct", 1)
    t0 += linha("Custo de operação (R$/mês)", "custo_operacao_rs_mes", 2)
    t0 += linha("Redução de custo (R$/mês)", "economia_rs_mes", 2)
    t0 += linha("Investimento (R$)", "capex_rs", 0)
    t0 += "| Payback simples (anos) | " + " | ".join(
        "-" if a["id"] == "A0" else fmt(a["payback_anos"], 1) for a in alts) + " |\n"
    t0 += linha("Emissões evitadas líquidas do FV (kg CO2e/ano)", "emissoes_evitadas_liquidas_kg_ano", 1)

    t1 = cab
    t1 += "| Potência por ponto (W) | " + " | ".join(fmt(a["potencia_ponto_w"], 1) for a in alts) + " |\n"
    t1 += linha("Energia por noite (kWh)", "energia_noite_kwh", 2)
    t1 += linha("Consumo da carga (kWh/ano)", "carga_kwh_ano", 0)
    t1 += linha("Consumo da carga (kWh/mês)", "carga_kwh_mes", 1)
    t1 += linha("Compra líquida da rede (kWh/mês)", "rede_kwh_mes", 1)
    t1 += linha("Economia de energia da rede (kWh/mês)", "economia_rede_kwh_mes", 1)
    t1 += linha("Economia de energia da rede (%)", "economia_rede_pct", 1)
    t1 += linha("Participação de energia renovável (%)", "participacao_renovavel_pct", 1)
    t1 += linha("Horas por noite em modo economia (h/dia)", "horas_modo_economia_dia", 1)

    t2 = cab
    t2 += linha("Custo de energia (R$/mês)", "custo_energia_rs_mes", 2)
    t2 += linha("Manutenção (R$/mês)", "custo_om_rs_mes", 2)
    t2 += linha("Custo de operação (R$/mês)", "custo_operacao_rs_mes", 2)
    t2 += linha("Redução de custo (R$/mês)", "economia_rs_mes", 2)
    t2 += linha("Investimento (R$)", "capex_rs", 0)
    t2 += "| Payback simples (anos) | " + " | ".join(
        "-" if a["id"] == "A0" else fmt(a["payback_anos"], 1) for a in alts) + " |\n"
    t2 += linha("Economia líquida em 10 anos, sem desconto (R$)", "economia_liquida_10anos_rs", 0)

    t3 = cab
    t3 += linha("Emissões da rede (kg CO2/ano)", "emissoes_rede_kg_ano", 1)
    t3 += linha("Emissões evitadas na operação (kg CO2/ano)", "emissoes_evitadas_kg_ano", 1)
    t3 += linha("Emissões do ciclo de vida do FV (kg CO2e/ano)", "emissoes_ciclo_fv_kg_ano", 1)
    t3 += linha("Emissões evitadas líquidas do FV (kg CO2e/ano)", "emissoes_evitadas_liquidas_kg_ano", 1)
    t3 += "| Mercúrio retirado de uso (mg) | " + " | ".join(fmt(a["mercurio_retirado_mg"], 0) for a in alts) + " |\n"

    t4 = "| Alternativa | Viabilidade técnica | Impactos ambientais | Benefícios | Limitações |\n|---|---|---|---|---|\n"
    for a in alts:
        t4 += (f"| **{a['nome']}** | {a['viabilidade']} | {a['impactos_ambientais']} | "
               + "<br>".join("• " + b for b in a["beneficios"]) + " | "
               + "<br>".join("• " + b for b in a["limitacoes"]) + " |\n")

    t5 = ("| Premissa variada | Faixa testada (mín. a máx.) | Payback A1 (anos, do mín. ao máx.) | Payback A2 (anos, do mín. ao máx.) "
          "| Payback A3 (anos, do mín. ao máx.) |\n|---|---|---|---|---|\n")
    for t_ in sens[:10]:
        t5 += (f"| {t_['descricao']} | {fmt_auto(t_['minimo'])} a {fmt_auto(t_['maximo'])} {t_['unidade']} | "
               f"{fmt_par(t_['payback_a1'])} | {fmt_par(t_['payback_a2'])} | {fmt_par(t_['payback_a3'])} |\n")
    t6 = "| Cenário combinado | Payback A1 (anos) | Payback A2 (anos) | Payback A3 (anos) | Economia A2 (R$/mês) | Emissões evitadas líquidas A2 (kg CO2e/ano) |\n|---|---|---|---|---|---|\n"
    for nome in ("otimista", "base", "conservador"):
        c = cenarios[nome]
        t6 += (f"| {nome.capitalize()} | {fmt(c['payback_a1'], 1)} | {fmt(c['payback_a2'], 1)} | {fmt(c['payback_a3'], 1)} | "
               f"{fmt(c['economia_rs_mes_a2'], 2)} | {fmt(c['evitadas_liq_a2'], 1)} |\n")
    return {"resumo": t0, "consumo": t1, "custos": t2, "emissoes": t3, "qualitativo": t4, "sensibilidade": t5, "cenarios": t6}


def gravar(res, sens, cenarios, linhas):
    os.makedirs(os.path.join(RAIZ, "resultados"), exist_ok=True)
    saida = {
        "titulo": "Neighborhood Action Dashboard: módulo de energia (SERS)",
        "gerado_em": date.today().isoformat(),
        "aviso": "Todos os valores são projeções condicionadas às premissas de dados/premissas.csv. O caso-modelo é simulado.",
        "dimensionamento": res["dimensionamento"],
        "alternativas": res["alternativas"],
        "mensal": res["mensal"],
        "sensibilidade": sens,
        "cenarios": cenarios,
        "premissas": [
            {k: l[k] for k in ("id", "descricao", "valor", "unidade", "minimo", "maximo", "tipo",
                               "usado_no_calculo", "fonte", "url", "data_acesso", "justificativa")}
            for l in linhas
        ],
    }
    texto = json.dumps(saida, ensure_ascii=False, indent=2)
    with open(os.path.join(RAIZ, "resultados", "resultados.json"), "w", encoding="utf-8", newline="\n") as f:
        f.write(texto + "\n")
    with open(os.path.join(RAIZ, "dashboard", "data", "resultados.js"), "w", encoding="utf-8", newline="\n") as f:
        f.write("// Gerado por src/calcular.py a partir de dados/premissas.csv. Não editar à mão.\n")
        f.write("window.RESULTADOS = " + texto + ";\n")

    campos = ["id", "nome", "potencia_ponto_w", "carga_kwh_mes", "rede_kwh_mes", "economia_rede_kwh_mes",
              "economia_rede_pct", "participacao_renovavel_pct", "custo_operacao_rs_mes", "economia_rs_mes",
              "capex_rs", "payback_anos", "economia_liquida_10anos_rs", "emissoes_evitadas_kg_ano",
              "emissoes_evitadas_liquidas_kg_ano", "horas_modo_economia_dia"]
    with open(os.path.join(RAIZ, "resultados", "comparativo.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(campos)
        for a in res["alternativas"]:
            w.writerow([("" if a[c] is None else (round(a[c], 4) if isinstance(a[c], float) else a[c])) for c in campos])

    with open(os.path.join(RAIZ, "resultados", "sensibilidade.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["premissa", "descricao", "unidade", "base", "minimo", "maximo", "payback_a1_min", "payback_a1_max",
                    "payback_a2_min", "payback_a2_max", "payback_a3_min", "payback_a3_max",
                    "evitadas_liq_a2_min", "evitadas_liq_a2_max"])
        for t in sens:
            vals = [("" if v is None else round(v, 3)) for v in (*t["payback_a1"], *t["payback_a2"], *t["payback_a3"], *t["evitadas_liq_a2"])]
            w.writerow([t["id"], t["descricao"], t["unidade"], t["base"], t["minimo"], t["maximo"], *vals])

    tabelas = tabelas_markdown(res, sens, cenarios)
    with open(os.path.join(RAIZ, "resultados", "comparativo.md"), "w", encoding="utf-8", newline="\n") as f:
        f.write("# Comparação das alternativas (gerado por src/calcular.py)\n\n")
        for chave, titulo in (("resumo", "Resumo"), ("consumo", "Consumo e energia"), ("custos", "Custos e payback"), ("emissoes", "Emissões"),
                              ("qualitativo", "Viabilidade, impactos, benefícios e limitações"),
                              ("sensibilidade", "Sensibilidade do payback"), ("cenarios", "Cenários combinados")):
            f.write(f"## {titulo}\n\n{tabelas[chave]}\n")
    return tabelas


def atualizar_readme(tabelas):
    if not os.path.exists(ARQ_README):
        print("README.md ainda não existe; nada atualizado.")
        return
    texto = open(ARQ_README, encoding="utf-8").read()
    for chave, tabela in tabelas.items():
        padrao = re.compile(rf"(<!-- AUTO:{chave}:inicio -->\n).*?(<!-- AUTO:{chave}:fim -->)", re.S)
        texto, qtd = padrao.subn(lambda m: m.group(1) + tabela + m.group(2), texto)
        if qtd == 0:
            print(f"aviso: marcador AUTO:{chave} não encontrado no README")
    with open(ARQ_README, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)
    print("README.md atualizado.")


def main():
    linhas, base = ler_premissas()
    meses = ler_irradiacao()
    res = calcular(base, meses)
    sens, cenarios = sensibilidade(linhas, base, meses)
    tabelas = gravar(res, sens, cenarios, linhas)
    d = res["dimensionamento"]
    print(f"Pontos: {d['pontos_total']} | tarifa {d['tarifa_rs_kwh']:.5f} R$/kWh | irradiação média {d['irradiacao_media_kwh_m2_dia']:.3f}")
    for a in res["alternativas"]:
        pb = "n/a" if a["id"] == "A0" else fmt(a["payback_anos"], 1)
        print(f"{a['id']}: carga {a['carga_kwh_mes']:.1f} kWh/mês | rede {a['rede_kwh_mes']:.1f} | "
              f"custo {a['custo_operacao_rs_mes']:.2f} R$/mês | capex {a['capex_rs']:.0f} | payback {pb} | "
              f"CO2 evit. {a['emissoes_evitadas_kg_ano']:.1f} (líq. {a['emissoes_evitadas_liquidas_kg_ano']:.1f})")
    if "--readme" in sys.argv:
        atualizar_readme(tabelas)


if __name__ == "__main__":
    main()
