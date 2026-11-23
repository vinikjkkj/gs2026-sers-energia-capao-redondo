"""Conferencia independente dos calculos (sem bibliotecas externas).

Rodar:  python tests/test_calculos.py
Cada teste refaz a conta a mao, com os valores de dados/premissas.csv, e compara
com o que o script src/calcular.py produz.
"""
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(RAIZ, "src"))
import calcular  # noqa: E402

linhas, p = calcular.ler_premissas()
meses = calcular.ler_irradiacao()
res = calcular.calcular(p, meses)
alt = {a["id"]: a for a in res["alternativas"]}


def perto(a, b, tol=1e-6):
    return abs(a - b) <= tol * max(1.0, abs(b))


def test_formula_energia():
    # E = P x t / 1000: 16 pontos x 84,5 W x 12 h = 16,224 kWh por noite
    assert perto(calcular.energia_kwh(16 * 84.5, 12), 16.224)


def test_consumo_convencional():
    esperado_ano = 16 * (72.5 + 12) * 12 * 365 / 1000  # kWh/ano
    assert perto(alt["A0"]["carga_kwh_ano"], esperado_ano)
    assert perto(alt["A0"]["carga_kwh_mes"], esperado_ano / 12)


def test_consumo_led():
    assert perto(alt["A1"]["carga_kwh_ano"], 16 * 30 * 12 * 365 / 1000)


def test_perfil_dimerizacao():
    # 4 h a 100% + 7 h a (0,30 + 0,15 x 0,70) + 1 h a 100% = 7,835 h equivalentes
    assert perto(res["dimensionamento"]["led_dimerizado_horas_equivalentes"], 4 + 7 * (0.30 + 0.15 * 0.70) + 1)
    esperado = 16 * 30 * 7.835 / 1000 + 16 * 1.0 * 24 / 1000  # kWh por noite (LED dimerizado + sensores)
    assert perto(alt["A2"]["energia_noite_kwh"], esperado)


def test_tarifa_e_custo():
    tarifa = (259.83 + 174.33) / 1000
    assert perto(res["dimensionamento"]["tarifa_rs_kwh"], tarifa)
    assert perto(alt["A0"]["custo_energia_rs_mes"], alt["A0"]["carga_kwh_mes"] * tarifa)


def test_payback_a1_feito_a_mao():
    capex = 16 * (250 + 120)
    energia = (alt["A0"]["carga_kwh_ano"] - alt["A1"]["carga_kwh_ano"]) * 0.43416
    manut_hps = 16 * 200 / (24000 / (12 * 365))
    manut_led = 16 * 8
    esperado = capex / (energia + manut_hps - manut_led)
    assert perto(alt["A1"]["payback_anos"], esperado)


def test_irradiacao_confere_com_sundata():
    # SunData informa media anual de 4,59 kWh/m2.dia no plano inclinado
    assert abs(res["dimensionamento"]["irradiacao_media_kwh_m2_dia"] - 4.59) < 0.01
    assert res["dimensionamento"]["irradiacao_mes_critico_kwh_m2_dia"] == 4.02


def test_fv_a2():
    d = res["dimensionamento"]
    rendimento = sum(m["inclinado"] * m["dias"] for m in meses) * 0.78  # kWh/kWp.ano
    assert perto(d["a2_geracao_kwh_ano"], d["a2_kwp_instalado"] * rendimento)
    assert d["a2_modulos"] == 2 and perto(d["a2_kwp_instalado"], 1.1)
    assert 0 < d["a2_cobertura_pct"] <= 100


def test_emissoes():
    fe = 0.0461  # kg CO2/kWh (= tCO2/MWh)
    assert perto(alt["A0"]["emissoes_rede_kg_ano"], alt["A0"]["carga_kwh_ano"] * fe)
    assert perto(alt["A1"]["emissoes_evitadas_kg_ano"], (alt["A0"]["carga_kwh_ano"] - alt["A1"]["carga_kwh_ano"]) * fe)
    for k in ("A2", "A3"):
        a = alt[k]
        assert perto(a["emissoes_evitadas_liquidas_kg_ano"], a["emissoes_evitadas_kg_ano"] - a["emissoes_ciclo_fv_kg_ano"])


def test_decomposicao_fecha_com_a_carga_base():
    base = alt["A0"]["carga_kwh_mes"]
    for a in res["alternativas"]:
        assert perto(sum(a["decomposicao_kwh_mes"].values()), base), a["id"]


def test_mesma_necessidade_de_iluminacao():
    d = res["dimensionamento"]
    assert d["equivalencia_iluminacao_ok"], "o LED precisa entregar pelo menos o fluxo util da luminaria antiga"


def test_autonomo_nao_usa_rede():
    assert alt["A3"]["rede_kwh_mes"] == 0 and alt["A3"]["participacao_renovavel_pct"] == 100


def test_resultados_json_atualizado():
    import json
    with open(os.path.join(RAIZ, "resultados", "resultados.json"), encoding="utf-8") as f:
        salvo = json.load(f)
    for a in salvo["alternativas"]:
        novo = alt[a["id"]]
        assert perto(a["carga_kwh_mes"], novo["carga_kwh_mes"]) and perto(a["capex_rs"], novo["capex_rs"]), (
            "resultados.json desatualizado: rode python src/calcular.py")


def test_todas_as_premissas_tem_fonte():
    for l in linhas:
        assert l["fonte"].strip(), l["id"]
        assert l["tipo"] in ("dado confirmado", "dado parcial", "premissa"), l["id"]
        if l["tipo"] == "dado confirmado":
            assert l["url"].startswith("http") and l["data_acesso"], l["id"]


if __name__ == "__main__":
    testes = [(n, f) for n, f in sorted(globals().items()) if n.startswith("test_") and callable(f)]
    falhas = 0
    for nome, f in testes:
        try:
            f()
            print("ok    ", nome)
        except AssertionError as e:
            falhas += 1
            print("FALHOU", nome, e)
    print(f"{len(testes) - falhas}/{len(testes)} testes passaram")
    sys.exit(1 if falhas else 0)
