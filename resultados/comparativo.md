# Comparação das alternativas (gerado por src/calcular.py)

## Resumo

| Indicador | A0 Convencional | A1 LED na rede | A2 LED + FV na rede | A3 LED solar autônomo |
|---|---:|---:|---:|---:|
| Compra líquida da rede (kWh/mês) | 493,5 | 175,2 | 6,3 | 0,0 |
| Economia de energia da rede (%) | 0,0 | 64,5 | 98,7 | 100,0 |
| Participação de energia renovável (%) | 0,0 | 0,0 | 95,0 | 100,0 |
| Custo de operação (R$/mês) | 262,92 | 86,73 | 24,69 | 313,33 |
| Redução de custo (R$/mês) | 0,00 | 176,18 | 238,23 | -50,42 |
| Investimento (R$) | 0 | 5.920 | 11.540 | 56.960 |
| Payback simples (anos) | - | 2,8 | 4,0 | não se paga |
| Emissões evitadas líquidas do FV (kg CO2e/ano) | 0,0 | 176,1 | 207,8 | 208,1 |

## Consumo e energia

| Indicador | A0 Convencional | A1 LED na rede | A2 LED + FV na rede | A3 LED solar autônomo |
|---|---:|---:|---:|---:|
| Potência por ponto (W) | 84,5 | 30,0 | 30,0 | 30,0 |
| Energia por noite (kWh) | 16,22 | 5,76 | 4,14 | 4,14 |
| Consumo da carga (kWh/ano) | 5.922 | 2.102 | 1.513 | 1.513 |
| Consumo da carga (kWh/mês) | 493,5 | 175,2 | 126,1 | 126,1 |
| Compra líquida da rede (kWh/mês) | 493,5 | 175,2 | 6,3 | 0,0 |
| Economia de energia da rede (kWh/mês) | 0,0 | 318,3 | 487,2 | 493,5 |
| Economia de energia da rede (%) | 0,0 | 64,5 | 98,7 | 100,0 |
| Participação de energia renovável (%) | 0,0 | 0,0 | 95,0 | 100,0 |
| Horas por noite em modo economia (h/dia) | 0,0 | 0,0 | 7,0 | 7,0 |

## Custos e payback

| Indicador | A0 Convencional | A1 LED na rede | A2 LED + FV na rede | A3 LED solar autônomo |
|---|---:|---:|---:|---:|
| Custo de energia (R$/mês) | 214,25 | 76,06 | 10,54 | 0,00 |
| Manutenção (R$/mês) | 48,67 | 10,67 | 14,15 | 313,33 |
| Custo de operação (R$/mês) | 262,92 | 86,73 | 24,69 | 313,33 |
| Redução de custo (R$/mês) | 0,00 | 176,18 | 238,23 | -50,42 |
| Investimento (R$) | 0 | 5.920 | 11.540 | 56.960 |
| Payback simples (anos) | - | 2,8 | 4,0 | não se paga |
| Economia líquida em 10 anos, sem desconto (R$) | 0 | 15.222 | 17.047 | -63.010 |

## Emissões

| Indicador | A0 Convencional | A1 LED na rede | A2 LED + FV na rede | A3 LED solar autônomo |
|---|---:|---:|---:|---:|
| Emissões da rede (kg CO2/ano) | 273,0 | 96,9 | 3,5 | 0,0 |
| Emissões evitadas na operação (kg CO2/ano) | 0,0 | 176,1 | 269,5 | 273,0 |
| Emissões do ciclo de vida do FV (kg CO2e/ano) | 0,0 | 0,0 | 61,7 | 64,9 |
| Emissões evitadas líquidas do FV (kg CO2e/ano) | 0,0 | 176,1 | 207,8 | 208,1 |
| Mercúrio retirado de uso (mg) | 0 | 261 | 261 | 261 |

## Viabilidade, impactos, benefícios e limitações

| Alternativa | Viabilidade técnica | Impactos ambientais | Benefícios | Limitações |
|---|---|---|---|---|
| **A0 Convencional** | Já instalada. Não exige obra. Depende de reposição periódica de lâmpadas e reatores. | Maior consumo de eletricidade da rede. Cada lâmpada contém cerca de 16 mg de mercúrio, que exige descarte específico. Luz amarelada de menor reprodução de cor. | • Sem investimento inicial<br>• Tecnologia conhecida pela equipe de manutenção | • Maior consumo e maior custo mensal de energia<br>• Troca de lâmpada a cada cerca de 5,5 anos<br>• Mercúrio na lâmpada<br>• Sem dados de consumo nem dimerização |
| **A1 LED na rede** | Alta. Reaproveita postes e rede existentes. Troca rápida, sem obra civil. Exige luminária com certificação do Inmetro e projeto fotométrico simples para manter a iluminância. | Reduz o consumo da rede e as emissões associadas. Elimina o mercúrio das lâmpadas de sódio. Os módulos de LED têm vida longa, o que reduz resíduos. | • Menor payback entre as alternativas<br>• Menos manutenção (vida útil de cerca de 11 anos)<br>• Melhor reprodução de cor<br>• Base para as alternativas A2 e A3 | • Continua dependente da rede, sem parcela renovável própria<br>• Sem dimerização, o LED fica em potência plena a noite toda<br>• Qualidade varia entre fabricantes; exige especificação e certificação |
| **A2 LED + FV na rede** | Média a alta. Exige local com sol sem sombra para os módulos (por exemplo, telhado de um equipamento público próximo), pedido de acesso à Enel e enquadramento como geração distribuída com compensação em unidade consumidora da prefeitura. A regra para iluminação pública não foi confirmada. | Maior redução de consumo da rede entre as alternativas conectadas. A parcela FV evita eletricidade do SIN, que já é majoritariamente renovável, então o ganho de CO2 por kWh é pequeno; a fabricação dos módulos tem pegada própria (42,9 g CO2e/kWh na literatura). | • Menor consumo líquido da rede<br>• Cerca de 95% da energia do ponto compensada por geração própria<br>• Dados de presença e consumo para o dashboard<br>• Mantém a rede como reserva: sem risco de apagar por falta de sol | • Investimento maior que A1<br>• Depende de local para os módulos e de autorização da distribuidora<br>• Compensação reduzida pelo Fio B (60% em 2026) e sujeita a mudança de regra<br>• Inversor precisa ser trocado em cerca de 10 a 15 anos (não incluído no payback) |
| **A3 LED solar autônomo** | Média. Exige poste com orientação para o norte, sem sombra de árvores ou prédios, e estrutura que aguente painel e bateria. Faz mais sentido onde não há rede ou o custo de ligar à rede é alto. No caso-modelo a rede já existe. | Zera o consumo da rede no ponto. A bateria tem pegada de fabricação e precisa ser trocada a cada cerca de 8 anos; o descarte exige logística reversa. O balanço de carbono considerando a bateria não foi quantificado. | • 100% da energia vem do sol, sem conta de luz<br>• Continua acesa em queda da rede<br>• Dispensa extensão de rede em locais novos | • Maior investimento (painel, bateria e controlador em cada poste)<br>• Troca de bateria a cada cerca de 8 anos pesa mais que a economia de energia<br>• Autonomia limitada em dias nublados seguidos<br>• Risco de furto de painel e bateria<br>• Desempenho menor em junho e julho, meses de menor irradiação |

## Sensibilidade do payback

| Premissa variada | Faixa testada (mín. a máx.) | Payback A1 (anos, do mín. ao máx.) | Payback A2 (anos, do mín. ao máx.) | Payback A3 (anos, do mín. ao máx.) |
|---|---|---|---|---|
| Preço da luminária LED de 30 W | 150 a 450 R$/un | 2,0 a 4,3 | 3,5 a 5,2 | não se paga |
| Multiplicador da tarifa para tributos e bandeira tarifária | 0,90 a 1,40 fator | 3,0 a 2,1 | 4,4 a 3,0 | não se paga |
| Mão de obra de troca da luminária em poste existente | 60 a 250 R$/ponto | 2,3 a 3,8 | 3,7 a 4,8 | não se paga |
| Custo de uma troca de lâmpada HPS (lâmpada, reator/ignitor rateado e mão de obra) | 120 a 350 R$/troca | 3,1 a 2,3 | 4,4 a 3,5 | não se paga |
| Sensor de presença, fotocélula e driver dimerizável por ponto | 50 a 200 R$/ponto | 2,8 a 2,8 | 3,8 a 4,7 | não se paga |
| Potência da luminária LED adotada por ponto (com driver) | 27 a 40 W | 2,7 a 3,3 | 4,0 a 4,8 | não se paga |
| Custo instalado do sistema FV conectado à rede, porte muito pequeno | 2,45 a 4,50 R$/Wp | 2,8 a 2,8 | 3,5 a 4,3 | não se paga |
| Vida útil da lâmpada HPS | 16.000 a 32.000 h | 2,5 a 3,0 | 3,7 a 4,3 | não se paga |
| Horas de funcionamento por noite (pôr do sol ao nascer do sol) | 11 a 13 h/dia | 3,1 a 2,6 | 4,4 a 3,8 | não se paga |
| Manutenção anual da luminária LED (inspeção e limpeza) | 4 a 20 R$/ponto/ano | 2,7 a 3,1 | 3,9 a 4,3 | não se paga |

## Cenários combinados

| Cenário combinado | Payback A1 (anos) | Payback A2 (anos) | Payback A3 (anos) | Economia A2 (R$/mês) | Emissões evitadas líquidas A2 (kg CO2e/ano) |
|---|---|---|---|---|---|
| Otimista | 0,8 | 1,2 | 26,8 | 467,30 | 243,8 |
| Base | 2,8 | 4,0 | não se paga | 238,23 | 207,8 |
| Conservador | 11,9 | 13,0 | não se paga | 140,07 | 156,5 |

