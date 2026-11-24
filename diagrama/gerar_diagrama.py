# Gera diagrama_blocos.svg e diagrama_blocos.png (o PNG é uma captura do SVG feita com o Chrome headless).
# Aluno: Vinícius Alves de Souza, RM 575576 (SERS, FIAP). Uso: python diagrama/gerar_diagrama.py

import os
import subprocess
import sys
from xml.sax.saxutils import escape

PASTA = os.path.dirname(os.path.abspath(__file__))
SVG = os.path.join(PASTA, "diagrama_blocos.svg")
PNG = os.path.join(PASTA, "diagrama_blocos.png")
CHROME = os.environ.get("CHROME", r"C:\Program Files\Google\Chrome\Application\chrome.exe")

W, H = 1130, 772
LARG, GAP = 230, 50
COL = [30 + i * (LARG + GAP) for i in range(4)]

COR_ENERGIA, COR_DADOS, COR_COMANDO = "#c2410c", "#1d4ed8", "#15803d"


def bloco(x, y, w, h, titulo, linhas, cor, tracejado=False, fundo="#ffffff"):
    dash = ' stroke-dasharray="6 4"' if tracejado else ""
    s = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fundo}" stroke="{cor}" stroke-width="2"{dash}/>\n'
    s += f'<text x="{x + 12}" y="{y + 26}" font-size="16" font-weight="700" fill="#111827">{escape(titulo)}</text>\n'
    for i, linha in enumerate(linhas):
        s += f'<text x="{x + 12}" y="{y + 50 + i * 20}" font-size="14" fill="#374151">{escape(linha)}</text>\n'
    return s


def seta(pontos, cor, tracejado=False):
    d = "M " + " L ".join(f"{x} {y}" for x, y in pontos)
    dash = ' stroke-dasharray="7 5"' if tracejado else ""
    marcador = {COR_ENERGIA: "ponta-energia", COR_DADOS: "ponta-dados", COR_COMANDO: "ponta-comando"}[cor]
    return f'<path d="{d}" fill="none" stroke="{cor}" stroke-width="3"{dash} marker-end="url(#{marcador})"/>\n'


def rotulo(x, y, texto, cor, ancora="start"):
    return f'<text x="{x}" y="{y}" font-size="13" font-style="italic" fill="{cor}" text-anchor="{ancora}">{escape(texto)}</text>\n'


def faixa(y, h, titulo, fundo, borda, cor_texto):
    s = f'<rect x="14" y="{y}" width="{W - 28}" height="{h}" rx="12" fill="{fundo}" stroke="{borda}" stroke-width="1.5"/>\n'
    s += f'<text x="30" y="{y + 22}" font-size="14" font-weight="700" fill="{cor_texto}" letter-spacing="0.5">{escape(titulo)}</text>\n'
    return s


def montar():
    c1, c2, c3, c4 = COL
    s = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
    s += 'font-family="Segoe UI, Arial, Helvetica, sans-serif" role="img" aria-labelledby="t d">\n'
    s += "<title id=\"t\">Diagrama de blocos da solução de iluminação eficiente e renovável</title>\n"
    s += ("<desc id=\"d\">A rede elétrica e os módulos fotovoltaicos alimentam a conversão e, em seguida, 16 luminárias LED. "
          "Sensores e medidores geram dados que passam pelo controlador e pela telemetria até o processamento em Python, "
          "que alimenta os indicadores do dashboard.</desc>\n")
    s += "<defs>\n"
    for nome, cor in (("ponta-energia", COR_ENERGIA), ("ponta-dados", COR_DADOS), ("ponta-comando", COR_COMANDO)):
        s += (f'<marker id="{nome}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">'
              f'<path d="M 0 0 L 10 5 L 0 10 z" fill="{cor}"/></marker>\n')
    s += "</defs>\n"
    s += f'<rect width="{W}" height="{H}" fill="#ffffff"/>\n'
    s += '<text x="30" y="34" font-size="21" font-weight="700" fill="#111827">Diagrama de blocos conceitual: iluminação eficiente e renovável</text>\n'
    s += ('<text x="30" y="58" font-size="14" fill="#4b5563">Praça comunitária e pontos de ônibus do entorno, Capão Redondo (São Paulo). '
          'Caso-modelo simulado. A2 = LED + FV na rede; A3 = LED solar autônomo.</text>\n')

    s += faixa(76, 232, "1. ENERGIA: FONTES, CONVERSÃO E CONSUMIDORES", "#fff7ed", "#fdba74", "#9a3412")
    s += faixa(318, 160, "2. SENSORES, MEDIÇÃO E AUTOMAÇÃO", "#eff6ff", "#93c5fd", "#1e3a8a")
    s += faixa(488, 266, "3. DADOS, PROCESSAMENTO E DASHBOARD", "#f0fdf4", "#86efac", "#14532d")

    # faixa 1: energia
    s += bloco(c1, 108, LARG, 84, "Rede elétrica (SIN)", ["Enel SP, tarifa B4a", "R$ 0,434 por kWh"], COR_ENERGIA)
    s += bloco(c1, 204, LARG, 84, "Sol: módulos FV", ["A2: 2 × 550 Wp, na rede", "A3: 100 Wp por poste"], COR_ENERGIA)
    s += bloco(c2, 118, LARG, 160, "Conversão e proteção",
               ["A2: quadro, inversor", "conectado à rede e", "medidor bidirecional", "A3: controlador MPPT e", "bateria LiFePO4 por poste"],
               COR_ENERGIA)
    s += bloco(c3, 118, LARG, 160, "Consumidores",
               ["16 luminárias LED de 30 W", "12 na praça e 4 em pontos", "de ônibus", "Driver dimerizável", "Mesma necessidade de luz"],
               COR_ENERGIA)
    s += bloco(c4, 118, LARG, 160, "Cálculo do consumo",
               ["E (kWh) = P (W) × t (h) / 1000", "Base: 16 pontos, 12 h por", "noite, 365 dias por ano", "A0: 16 × 84,5 W × 12 h", "= 16,2 kWh por noite"],
               "#6b7280", tracejado=True, fundo="#f9fafb")

    # faixa 2: sensores e automação
    s += bloco(c1, 350, LARG, 116, "Legenda", [], "#6b7280", fundo="#ffffff")
    for i, (cor, tracej, texto) in enumerate(((COR_ENERGIA, False, "fluxo de energia"), (COR_DADOS, True, "dados e medições"),
                                              (COR_COMANDO, True, "comandos"))):
        y = 386 + i * 26
        dash = ' stroke-dasharray="7 5"' if tracej else ""
        s += f'<line x1="{c1 + 14}" y1="{y}" x2="{c1 + 64}" y2="{y}" stroke="{cor}" stroke-width="3"{dash}/>\n'
        s += f'<text x="{c1 + 76}" y="{y + 5}" font-size="14" fill="#374151">{texto}</text>\n'
    s += bloco(c2, 350, LARG, 116, "Medição de energia", ["kWh da rede e gerados", "tensão da bateria (A3)", "dados de consumo"], COR_DADOS)
    s += bloco(c3, 350, LARG, 116, "Lógica de automação", ["100% no início da noite;", "30% na madrugada e 100%", "ao detectar presença"], COR_COMANDO)
    s += bloco(c4, 350, LARG, 116, "Sensores", ["Presença (PIR)", "Fotocélula ou relógio", "astronômico"], COR_DADOS)

    # faixa 3: dados e dashboard
    s += bloco(c1, 520, LARG, 178, "Escopo deste trabalho",
               ["Não há equipamento físico.", "Sensores e medidores são", "simulados: o script gera os", "valores a partir das", "premissas em", "dados/premissas.csv."],
               "#6b7280", tracejado=True, fundo="#f9fafb")
    s += bloco(c2, 520, LARG, 118, "Telemetria", ["Gateway envia as leituras", "de energia ao processamento", "(simulado)"], COR_DADOS)
    s += bloco(c3, 520, LARG, 118, "Processamento", ["Script Python (calcular.py)", "E = P × t / 1000, custos,", "payback e emissões de CO₂"], COR_DADOS)
    s += bloco(c4, 520, LARG, 118, "Dashboard", ["kWh/mês, economia (%), R$/mês,", "% renovável, kg CO₂/ano e", "horas em modo economia"], COR_DADOS)
    s += bloco(c3, 668, LARG, 70, "Dados de referência", ["Tarifa Enel, CRESESB, MCTI"], "#6b7280", tracejado=True, fundo="#f9fafb")

    # setas de energia
    s += seta([(c1 + LARG, 150), (c1 + LARG + 25, 150), (c1 + LARG + 25, 175), (c2, 175)], COR_ENERGIA)
    s += seta([(c1 + LARG, 246), (c1 + LARG + 25, 246), (c1 + LARG + 25, 221), (c2, 221)], COR_ENERGIA)
    s += seta([(c2 + LARG, 198), (c3, 198)], COR_ENERGIA)
    # medição e dados
    s += seta([(c2 + 115, 278), (c2 + 115, 350)], COR_DADOS, True)
    s += rotulo(c2 + 138, 336, "medição", COR_DADOS)
    s += seta([(c2 + 115, 466), (c2 + 115, 520)], COR_DADOS, True)
    s += rotulo(c2 + 138, 510, "leituras", COR_DADOS)
    s += seta([(c4, 408), (c3 + LARG, 408)], COR_DADOS, True)
    s += seta([(c2 + LARG, 579), (c3, 579)], COR_DADOS, True)
    s += seta([(c3 + 115, 466), (c3 + 115, 520)], COR_DADOS, True)
    s += rotulo(c3 + 138, 510, "estado e eventos", COR_DADOS)
    s += seta([(c3 + LARG, 579), (c4, 579)], COR_DADOS, True)
    s += seta([(c3 + 115, 668), (c3 + 115, 638)], COR_DADOS, True)
    # comando
    s += seta([(c3 + 115, 350), (c3 + 115, 278)], COR_COMANDO, True)
    s += rotulo(c3 + 138, 336, "comando de dimerização", COR_COMANDO)
    s += "</svg>\n"
    return s


def main():
    with open(SVG, "w", encoding="utf-8", newline="\n") as f:
        f.write(montar())
    print("SVG gravado:", SVG)
    if not os.path.exists(CHROME):
        print("Chrome não encontrado; PNG não gerado. Defina a variável CHROME.")
        return 1
    url = "file:///" + SVG.replace("\\", "/")
    cmd = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--screenshot={PNG}",
           f"--window-size={W},{H}", "--force-device-scale-factor=2", url]
    subprocess.run(cmd, check=True, capture_output=True, timeout=120)
    print("PNG gravado:", PNG)
    return 0


if __name__ == "__main__":
    sys.exit(main())
