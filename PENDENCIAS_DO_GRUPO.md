# Pendências do grupo (SERS)

Tudo o que está abaixo depende de vocês. O código, os cálculos, o diagrama, o dashboard e o README já estão prontos e testados neste repositório.

## 1. Trocar os marcadores

Troquem com um único localizar e substituir (em todo o repositório, UTF-8):

| Marcador | Trocar por | Arquivos onde aparece |
|---|---|---|
| `[[NOME_1]]`, `[[NOME_2]]`, `[[NOME_3]]` | nome completo de cada integrante | `README.md`, `entrega_SERS.txt`, `dashboard/index.html` (rodapé) |
| `[[RM_1]]`, `[[RM_2]]`, `[[RM_3]]` | RM de cada integrante | os mesmos |
| `[[TURMA]]` | turma (provável 1CCPS; confirmar) | os mesmos |
| `[[LINK_GITHUB]]` | URL do repositório público | `entrega_SERS.txt` |
| `[[LINK_YOUTUBE]]` | URL do vídeo não listado | `entrega_SERS.txt` |
| `[[PREENCHER PELO GRUPO: URL do GitHub Pages, se ativarem]]` | URL do Pages, ou apagar a frase | `README.md` |

Se o grupo tiver só 2 integrantes, apague a linha do terceiro nos três arquivos.

## 2. Criar o repositório no GitHub e enviar

O repositório já tem `git init` e commits locais na branch `main`. Falta criar o repositório **público** no GitHub e enviar:

```bash
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git push -u origin main
```

Abram o link numa janela anônima para conferir que está acessível. Se a SERS ficar dentro de um repositório compartilhado com outras disciplinas, copiem esta pasta para uma subpasta (por exemplo `energia-sers/`) e mantenham o README dela identificando a contribuição de SERS.

## 3. GitHub Pages (opcional, recomendado)

Em Settings > Pages: Source = branch `main`, pasta `/ (root)`. O `index.html` da raiz redireciona para `dashboard/`. Depois de ativar, abram a URL e confirmem que os gráficos aparecem (os gráficos baixam o Chart.js de CDN). Coloquem a URL no README e na descrição do vídeo.

## 4. Conferir e, se possível, trocar o caso-modelo por dados reais

O estudo usa um caso-modelo **simulado**: praça com 12 pontos de luz e 4 pontos de ônibus, todos com sódio de 70 W. Se quiserem usar uma praça real:

1. Conferir no GeoSampa (camada de iluminação pública) o tipo de lâmpada e a quantidade de pontos da praça escolhida.
2. Editar `dados/premissas.csv` (linhas `n_pontos_praca`, `n_pontos_onibus`, potências etc.).
3. Rodar `python src/calcular.py --readme` e `python tests/test_calculos.py`.
4. Atualizar à mão os textos que têm número fixo: seção 2 (Leitura), seção 3, tabelas de cálculo da seção 5 e as caixas do diagrama (`diagrama/gerar_diagrama.py`, depois `python diagrama/gerar_diagrama.py`). As tabelas das seções 2 e 6 se atualizam sozinhas.
5. Tirar uma nova captura do dashboard para `capturas/`.

Valores que o grupo pode tentar confirmar (hoje são premissas declaradas, em `dados/premissas.csv`):

- tempo médio anual de iluminação de São Paulo (Anexo I da RH ANEEL 2.590/2019);
- preço de luminária LED de 30 W, de bateria LiFePO4, de painel e de poste (cotações ou atas de registro de preços);
- ficha completa do reator de vapor de sódio 70 W;
- como a prefeitura é cobrada (tributos e bandeira) e como funciona a compensação de geração distribuída para iluminação pública (Lei 14.300, Fio B).

## 5. Roteiro do vídeo (até 3 minutos, não listado no YouTube)

Meta: ficar abaixo de 2 min 50 s, para sobrar folga (o limite do enunciado é 3 min). A narração abaixo tem cerca de 320 palavras (≈ 2 min 15 s em ritmo calmo); a coluna de tempo é a janela de cada trecho, e sobra tempo para mostrar a tela sem pressa. Revezem as vozes entre os integrantes. Gravem a tela do computador (por exemplo, com o Gravador do Windows, `Win + Alt + R`, ou o OBS) e narrem por cima.

| Tempo | Ponto do enunciado (item 6.2) | Na tela | Fala |
|---|---|---|---|
| 0:00 a 0:25 | O espaço comunitário e o problema | README (seção 3) ou o diagrama; mostrar o nome da disciplina | "Somos [[NOME_1]], [[NOME_2]] e [[NOME_3]]: esta é a contribuição de Energias Renováveis e Sustentáveis ao Neighborhood Action Dashboard. Estudamos a iluminação de uma praça e de quatro pontos de ônibus do Capão Redondo, em São Paulo, num caso-modelo simulado: 16 pontos de luz com lâmpadas de sódio de 70 watts, acesas a noite toda, com mercúrio." |
| 0:25 a 1:20 | A análise energética e a comparação das alternativas | `dados/premissas.csv` (rolar rápido), trecho de `src/calcular.py` com `energia_kwh`, depois a tabela comparativa do dashboard ou do README (seção 6) | "Consumo é E igual a P vezes t, dividido por mil: 16 pontos de 84,5 watts por 12 horas dão 493 quilowatts-hora por mês, 263 reais com a tarifa da Enel. A1, LED de 30 watts: 175 quilowatts-hora, 64,5% a menos, payback de 2,8 anos. A2, LED com sensores e dimerização, mais dois módulos solares na rede: compra da rede de 6 quilowatts-hora, 95% de energia solar, payback de 4 anos. A3, luminárias solares autônomas: zeram a conta, mas custam quase 57 mil reais e, onde já há rede, não se pagam. Tarifa, irradiação do CRESESB e fator de emissão do MCTI têm fonte; o resto é premissa declarada." |
| 1:20 a 1:50 | O diagrama conceitual | `diagrama/diagrama_blocos.png` em tela cheia, apontando cada faixa | "No diagrama, rede e sol alimentam a conversão e as luminárias. Sensores de presença e fotocélula comandam a dimerização, e a medição gera dados de consumo. A telemetria leva tudo ao processamento em Python, que calcula consumo, custo, payback e emissões e alimenta o dashboard. Sensores e medidores são simulados." |
| 1:50 a 2:30 | A demonstração dos indicadores no dashboard | Dashboard aberto no navegador: clicar em A1, A2 e A3; rolar pelos gráficos, tabela comparativa e sensibilidade | "No dashboard escolhemos a alternativa A2: consumo da rede de 6,3 quilowatts-hora por mês, economia de 98,7%, redução de 238 reais por mês, 95% renovável, 208 quilos de CO₂ evitados por ano e 7 horas por noite em modo economia. Em A3 o custo mensal fica maior que o atual. Abaixo, os gráficos de custo, investimento e retorno, a sensibilidade e as fontes." |
| 2:30 a 2:55 | Os benefícios esperados e as limitações | README (seção 12) ou o fim do dashboard | "Benefícios: menos consumo, menos custo, menos mercúrio e dados para acompanhar. Limitações: caso simulado, preços em premissa, payback simples, ganho de CO₂ pequeno porque a rede brasileira já é limpa, e regras da distribuidora para a energia solar. São projeções condicionadas às premissas. Obrigado." |

Dicas: leiam o texto em voz alta e cronometrem antes de gravar; se passar de 2 min 50 s, cortem frases da parte 2. Subam no YouTube como **Não listado** e, na descrição, coloquem o link do repositório. Testem o link em janela anônima. O enunciado exige no máximo 3 minutos.

## 6. Enviar ao portal

Enviar **apenas** o arquivo `entrega_SERS.txt` (depois de trocar os marcadores), salvo em UTF-8. Os links precisam estar acessíveis para avaliação.

## 7. Antes de entregar: estudar o que está no repositório

O enunciado diz que a equipe responde pela verificação dos dados, cálculos e referências. Cada integrante deve conseguir explicar:

- a fórmula E = P × t / 1000 e como ela foi aplicada em cada alternativa (seção 5.1 do README);
- por que A2 se paga em cerca de 4 anos e A3 não se paga (seções 5.2, 5.3 e 6.4);
- de onde vêm a tarifa, a irradiação e o fator de emissão, e quais valores são premissas (seção 4);
- por que o ganho em CO₂ é pequeno no Brasil (seção 6.3);
- o que o dashboard mostra e como ele lê os resultados (seção 9).
