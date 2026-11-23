// Gerado por src/calcular.py a partir de dados/premissas.csv. Não editar à mão.
window.RESULTADOS = {
  "titulo": "Neighborhood Action Dashboard: módulo de energia (SERS)",
  "gerado_em": "2026-11-23",
  "aviso": "Todos os valores são projeções condicionadas às premissas de dados/premissas.csv. O caso-modelo é simulado.",
  "dimensionamento": {
    "pontos_total": 16,
    "pontos_praca": 12,
    "pontos_onibus": 4,
    "horas_noite": 12.0,
    "dias_ano": 365.0,
    "tarifa_rs_kwh": 0.43416,
    "fator_emissao_kg_kwh": 0.0461,
    "potencia_ponto_convencional_w": 84.5,
    "fluxo_lampada_hps_lm": 5600.0,
    "fluxo_util_antigo_lm": 3919.9999999999995,
    "fluxo_led_lm": 4500.0,
    "equivalencia_iluminacao_ok": true,
    "led_dimerizado_horas_equivalentes": 7.835,
    "perfil": {
      "inicio_h": 4.0,
      "madrugada_h": 7.0,
      "amanhecer_h": 1.0,
      "nivel_madrugada_medio": 0.40499999999999997
    },
    "irradiacao_media_kwh_m2_dia": 4.588904109589041,
    "irradiacao_mes_critico_kwh_m2_dia": 4.02,
    "a2_kwp_necessario": 1.157977161201138,
    "a2_modulos": 2,
    "a2_kwp_instalado": 1.1,
    "a2_geracao_kwh_ano": 1437.1071000000002,
    "a2_cobertura_pct": 94.99323793735277,
    "a2_capex_fv_rs": 4180.0,
    "a3_energia_dia_ponto_wh": 259.05,
    "a3_painel_wp_por_ponto": 100,
    "a3_bateria_wh_por_ponto": 650,
    "a3_capex_por_ponto_rs": 3560.0,
    "a3_geracao_kwh_ano": 1741.948,
    "vida_led_anos": 11.415525114155251,
    "anos_entre_trocas_hps": 5.47945205479452,
    "ref_intelbras_preco_rs": 1572.28
  },
  "alternativas": [
    {
      "id": "A0",
      "nome": "A0 Convencional",
      "nome_completo": "A0 Situação atual: vapor de sódio 70 W com reator",
      "descricao": "Lâmpadas de vapor de sódio de alta pressão (70 W) com reator eletromagnético, acesas das 18h às 6h aproximadamente por relé fotoelétrico, sem dimerização.",
      "renovavel": false,
      "viabilidade": "Já instalada. Não exige obra. Depende de reposição periódica de lâmpadas e reatores.",
      "impactos_ambientais": "Maior consumo de eletricidade da rede. Cada lâmpada contém cerca de 16 mg de mercúrio, que exige descarte específico. Luz amarelada de menor reprodução de cor.",
      "beneficios": [
        "Sem investimento inicial",
        "Tecnologia conhecida pela equipe de manutenção"
      ],
      "limitacoes": [
        "Maior consumo e maior custo mensal de energia",
        "Troca de lâmpada a cada cerca de 5,5 anos",
        "Mercúrio na lâmpada",
        "Sem dados de consumo nem dimerização"
      ],
      "potencia_ponto_w": 84.5,
      "energia_noite_kwh": 16.224,
      "carga_kwh_ano": 5921.76,
      "carga_kwh_mes": 493.48,
      "rede_kwh_mes": 493.48,
      "renovavel_kwh_mes": 0.0,
      "economia_carga_pct": 0.0,
      "economia_rede_kwh_mes": 0.0,
      "economia_rede_pct": 0.0,
      "custo_energia_rs_mes": 214.2492768,
      "custo_om_rs_mes": 48.666666666666664,
      "custo_operacao_rs_mes": 262.91594346666665,
      "economia_rs_mes": 0.0,
      "economia_rs_ano": 0.0,
      "capex_rs": 0.0,
      "capex_detalhe_rs": {},
      "payback_anos": null,
      "economia_liquida_10anos_rs": 0.0,
      "participacao_renovavel_pct": 0.0,
      "horas_modo_economia_dia": 0.0,
      "emissoes_rede_kg_ano": 272.99313600000005,
      "emissoes_evitadas_kg_ano": 0.0,
      "emissoes_ciclo_fv_kg_ano": 0.0,
      "emissoes_evitadas_liquidas_kg_ano": 0.0,
      "mercurio_retirado_mg": 0.0,
      "decomposicao_kwh_mes": {
        "rede": 493.48,
        "eficiencia_led": 0.0,
        "dimerizacao": 0.0,
        "renovavel": 0.0
      }
    },
    {
      "id": "A1",
      "nome": "A1 LED na rede",
      "nome_completo": "A1 Retrofit para LED na rede (30 W, sem dimerização)",
      "descricao": "Troca das luminárias antigas por luminárias LED de 30 W nos mesmos postes, alimentadas pela rede, ligadas a noite toda em potência plena.",
      "renovavel": false,
      "viabilidade": "Alta. Reaproveita postes e rede existentes. Troca rápida, sem obra civil. Exige luminária com certificação do Inmetro e projeto fotométrico simples para manter a iluminância.",
      "impactos_ambientais": "Reduz o consumo da rede e as emissões associadas. Elimina o mercúrio das lâmpadas de sódio. Os módulos de LED têm vida longa, o que reduz resíduos.",
      "beneficios": [
        "Menor payback entre as alternativas",
        "Menos manutenção (vida útil de cerca de 11 anos)",
        "Melhor reprodução de cor",
        "Base para as alternativas A2 e A3"
      ],
      "limitacoes": [
        "Continua dependente da rede, sem parcela renovável própria",
        "Sem dimerização, o LED fica em potência plena a noite toda",
        "Qualidade varia entre fabricantes; exige especificação e certificação"
      ],
      "potencia_ponto_w": 30.0,
      "energia_noite_kwh": 5.76,
      "carga_kwh_ano": 2102.4,
      "carga_kwh_mes": 175.20000000000002,
      "rede_kwh_mes": 175.20000000000002,
      "renovavel_kwh_mes": 0.0,
      "economia_carga_pct": 64.49704142011834,
      "economia_rede_kwh_mes": 318.28000000000003,
      "economia_rede_pct": 64.49704142011834,
      "custo_energia_rs_mes": 76.06483200000001,
      "custo_om_rs_mes": 10.666666666666666,
      "custo_operacao_rs_mes": 86.73149866666667,
      "economia_rs_mes": 176.18444480000002,
      "economia_rs_ano": 2114.2133376,
      "capex_rs": 5920.0,
      "capex_detalhe_rs": {
        "Luminárias LED": 4000.0,
        "Instalação": 1920.0
      },
      "payback_anos": 2.8000958534866824,
      "economia_liquida_10anos_rs": 15222.133376000002,
      "participacao_renovavel_pct": 0.0,
      "horas_modo_economia_dia": 0.0,
      "emissoes_rede_kg_ano": 96.92064,
      "emissoes_evitadas_kg_ano": 176.07249600000006,
      "emissoes_ciclo_fv_kg_ano": 0.0,
      "emissoes_evitadas_liquidas_kg_ano": 176.07249600000006,
      "mercurio_retirado_mg": 260.8,
      "decomposicao_kwh_mes": {
        "rede": 175.20000000000002,
        "eficiencia_led": 318.28000000000003,
        "dimerizacao": 0.0,
        "renovavel": 0.0
      }
    },
    {
      "id": "A2",
      "nome": "A2 LED + FV na rede",
      "nome_completo": "A2 LED com sensores e dimerização + sistema fotovoltaico conectado à rede (renovável)",
      "descricao": "A1 mais sensores de presença e fotocélula com dimerização, e um pequeno sistema fotovoltaico (2 módulos de 550 Wp) que gera créditos de energia compensados na fatura de iluminação.",
      "renovavel": true,
      "viabilidade": "Média a alta. Exige local com sol sem sombra para os módulos (por exemplo, telhado de um equipamento público próximo), pedido de acesso à Enel e enquadramento como geração distribuída com compensação em unidade consumidora da prefeitura. A regra para iluminação pública não foi confirmada.",
      "impactos_ambientais": "Maior redução de consumo da rede entre as alternativas conectadas. A parcela FV evita eletricidade do SIN, que já é majoritariamente renovável, então o ganho de CO2 por kWh é pequeno; a fabricação dos módulos tem pegada própria (42,9 g CO2e/kWh na literatura).",
      "beneficios": [
        "Menor consumo líquido da rede",
        "Cerca de 95% da energia do ponto compensada por geração própria",
        "Dados de presença e consumo para o dashboard",
        "Mantém a rede como reserva: sem risco de apagar por falta de sol"
      ],
      "limitacoes": [
        "Investimento maior que A1",
        "Depende de local para os módulos e de autorização da distribuidora",
        "Compensação reduzida pelo Fio B (60% em 2026) e sujeita a mudança de regra",
        "Inversor precisa ser trocado em cerca de 10 a 15 anos (não incluído no payback)"
      ],
      "potencia_ponto_w": 30.0,
      "energia_noite_kwh": 4.1448,
      "carga_kwh_ano": 1512.852,
      "carga_kwh_mes": 126.07100000000001,
      "rede_kwh_mes": 6.312074999999993,
      "renovavel_kwh_mes": 119.75892500000002,
      "economia_carga_pct": 74.45266272189349,
      "economia_rede_kwh_mes": 487.167925,
      "economia_rede_pct": 98.72090560914323,
      "custo_energia_rs_mes": 10.539630713699996,
      "custo_om_rs_mes": 14.15,
      "custo_operacao_rs_mes": 24.689630713699998,
      "economia_rs_mes": 238.22631275296666,
      "economia_rs_ano": 2858.7157530356,
      "capex_rs": 11540.0,
      "capex_detalhe_rs": {
        "Luminárias LED": 4000.0,
        "Instalação": 1920.0,
        "Sensores e dimerização": 1440.0,
        "Sistema fotovoltaico": 4180.0
      },
      "payback_anos": 4.0367776991279944,
      "economia_liquida_10anos_rs": 17047.157530356,
      "participacao_renovavel_pct": 94.99323793735277,
      "horas_modo_economia_dia": 7.0,
      "emissoes_rede_kg_ano": 3.4918398899999965,
      "emissoes_evitadas_kg_ano": 269.50129611000006,
      "emissoes_ciclo_fv_kg_ano": 61.651894590000005,
      "emissoes_evitadas_liquidas_kg_ano": 207.84940152000004,
      "mercurio_retirado_mg": 260.8,
      "decomposicao_kwh_mes": {
        "rede": 6.312074999999993,
        "eficiencia_led": 318.28000000000003,
        "dimerizacao": 49.129,
        "renovavel": 119.75892500000002
      }
    },
    {
      "id": "A3",
      "nome": "A3 LED solar autônomo",
      "nome_completo": "A3 Luminárias LED solares autônomas com sensores e dimerização (renovável)",
      "descricao": "Cada ponto tem seu próprio painel fotovoltaico, bateria de lítio ferro fosfato e controlador, sem usar a rede elétrica.",
      "renovavel": true,
      "viabilidade": "Média. Exige poste com orientação para o norte, sem sombra de árvores ou prédios, e estrutura que aguente painel e bateria. Faz mais sentido onde não há rede ou o custo de ligar à rede é alto. No caso-modelo a rede já existe.",
      "impactos_ambientais": "Zera o consumo da rede no ponto. A bateria tem pegada de fabricação e precisa ser trocada a cada cerca de 8 anos; o descarte exige logística reversa. O balanço de carbono considerando a bateria não foi quantificado.",
      "beneficios": [
        "100% da energia vem do sol, sem conta de luz",
        "Continua acesa em queda da rede",
        "Dispensa extensão de rede em locais novos"
      ],
      "limitacoes": [
        "Maior investimento (painel, bateria e controlador em cada poste)",
        "Troca de bateria a cada cerca de 8 anos pesa mais que a economia de energia",
        "Autonomia limitada em dias nublados seguidos",
        "Risco de furto de painel e bateria",
        "Desempenho menor em junho e julho, meses de menor irradiação"
      ],
      "potencia_ponto_w": 30.0,
      "energia_noite_kwh": 4.1448,
      "carga_kwh_ano": 1512.852,
      "carga_kwh_mes": 126.07100000000001,
      "rede_kwh_mes": 0.0,
      "renovavel_kwh_mes": 126.07100000000001,
      "economia_carga_pct": 74.45266272189349,
      "economia_rede_kwh_mes": 493.48,
      "economia_rede_pct": 100.0,
      "custo_energia_rs_mes": 0.0,
      "custo_om_rs_mes": 313.3333333333333,
      "custo_operacao_rs_mes": 313.3333333333333,
      "economia_rs_mes": -50.41738986666667,
      "economia_rs_ano": -605.0086784,
      "capex_rs": 56960.0,
      "capex_detalhe_rs": {
        "Painéis FV": 4800.0,
        "Baterias": 24960.0,
        "Controlador e cabos": 7200.0,
        "Luminárias LED": 4000.0,
        "Adaptação do poste": 9600.0,
        "Instalação": 6400.0
      },
      "payback_anos": null,
      "economia_liquida_10anos_rs": -63010.086784,
      "participacao_renovavel_pct": 100.0,
      "horas_modo_economia_dia": 7.0,
      "emissoes_rede_kg_ano": 0.0,
      "emissoes_evitadas_kg_ano": 272.99313600000005,
      "emissoes_ciclo_fv_kg_ano": 64.9013508,
      "emissoes_evitadas_liquidas_kg_ano": 208.09178520000006,
      "mercurio_retirado_mg": 260.8,
      "decomposicao_kwh_mes": {
        "rede": 0.0,
        "eficiencia_led": 318.28000000000003,
        "dimerizacao": 49.129,
        "renovavel": 126.07100000000001
      }
    }
  ],
  "mensal": {
    "meses": [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ],
    "irradiacao_inclinada": [
      4.78,
      5.23,
      4.82,
      4.73,
      4.14,
      4.02,
      4.03,
      4.84,
      4.34,
      4.45,
      4.68,
      5.05
    ],
    "carga_a2_kwh": [
      128.4888,
      116.0544,
      128.4888,
      124.344,
      128.4888,
      124.344,
      128.4888,
      128.4888,
      124.344,
      128.4888,
      124.344,
      128.4888
    ],
    "geracao_a2_kwh": [
      127.13844000000002,
      125.64552000000003,
      128.20236000000003,
      121.75020000000004,
      110.11572000000001,
      103.4748,
      107.18994000000002,
      128.73432,
      111.7116,
      118.36110000000001,
      120.4632,
      134.31990000000002
    ],
    "carga_a3_kwh": [
      128.4888,
      116.0544,
      128.4888,
      124.344,
      128.4888,
      124.344,
      128.4888,
      128.4888,
      124.344,
      128.4888,
      124.344,
      128.4888
    ],
    "geracao_a3_kwh": [
      154.1072,
      152.29760000000002,
      155.3968,
      147.57600000000005,
      133.4736,
      125.42399999999999,
      129.9272,
      156.0416,
      135.408,
      143.46800000000002,
      146.016,
      162.812
    ]
  },
  "sensibilidade": [
    {
      "id": "preco_luminaria_led",
      "descricao": "Preço da luminária LED de 30 W",
      "unidade": "R$/un",
      "base": 250.0,
      "minimo": 150.0,
      "maximo": 450.0,
      "payback_a1": [
        2.0433131903821735,
        4.3136611796957
      ],
      "payback_a2": [
        3.4770858170998493,
        5.156161463184284
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "fator_tarifa_encargos",
      "descricao": "Multiplicador da tarifa para tributos e bandeira tarifária",
      "unidade": "fator",
      "base": 1.0,
      "minimo": 0.9,
      "maximo": 1.4,
      "payback_a1": [
        3.0384029437261764,
        2.1314141599113947
      ],
      "payback_a2": [
        4.41424401493017,
        3.0079326631829906
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "custo_instalacao_ponto",
      "descricao": "Mão de obra de troca da luminária em poste existente",
      "unidade": "R$/ponto",
      "base": 120.0,
      "minimo": 60.0,
      "maximo": 250.0,
      "payback_a1": [
        2.3460262556239773,
        3.7839133155225437
      ],
      "payback_a2": [
        3.7009625699111073,
        4.764377145764582
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "custo_troca_hps",
      "descricao": "Custo de uma troca de lâmpada HPS (lâmpada, reator/ignitor rateado e mão de obra)",
      "unidade": "R$/troca",
      "base": 200.0,
      "minimo": 120.0,
      "maximo": 350.0,
      "payback_a1": [
        3.1479091856037678,
        2.3195553102026074
      ],
      "payback_a2": [
        4.3959966285888585,
        3.5004534404805825
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "custo_sensor_dimmer",
      "descricao": "Sensor de presença, fotocélula e driver dimerizável por ponto",
      "unidade": "R$/ponto",
      "base": 90.0,
      "minimo": 50.0,
      "maximo": 200.0,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        3.8129009463167365,
        4.6524387693589535
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "p_led",
      "descricao": "Potência da luminária LED adotada por ponto (com driver)",
      "unidade": "W",
      "base": 30.0,
      "minimo": 27.0,
      "maximo": 40.0,
      "payback_a1": [
        2.6842093823767694,
        3.2708013400342257
      ],
      "payback_a2": [
        3.985346265352468,
        4.806115805254954
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        213.98063388000006,
        188.46228960000005
      ]
    },
    {
      "id": "custo_fv_wp",
      "descricao": "Custo instalado do sistema FV conectado à rede, porte muito pequeno",
      "unidade": "R$/Wp",
      "base": 3.8,
      "minimo": 2.45,
      "maximo": 4.5,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        3.49913691356393,
        4.317759376423301
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "vida_hps_h",
      "descricao": "Vida útil da lâmpada HPS",
      "unidade": "h",
      "base": 24000.0,
      "minimo": 16000.0,
      "maximo": 32000.0,
      "payback_a1": [
        2.460297226140685,
        3.0078040255629657
      ],
      "payback_a2": [
        3.6626598222583646,
        4.254039512649432
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "horas_noite",
      "descricao": "Horas de funcionamento por noite (pôr do sol ao nascer do sol)",
      "unidade": "h/dia",
      "base": 12.0,
      "minimo": 11.0,
      "maximo": 13.0,
      "payback_a1": [
        3.0715554760438994,
        2.572722377420245
      ],
      "payback_a2": [
        4.379237190665644,
        3.789113985479997
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        192.8584372,
        222.52210952
      ]
    },
    {
      "id": "om_led_ponto",
      "descricao": "Manutenção anual da luminária LED (inspeção e limpeza)",
      "unidade": "R$/ponto/ano",
      "base": 8.0,
      "minimo": 4.0,
      "maximo": 20.0,
      "payback_a1": [
        2.7178237768586877,
        3.079783021062313
      ],
      "payback_a2": [
        3.948382591777627,
        4.327420343493184
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "p_reator",
      "descricao": "Perda do reator e equipamentos auxiliares da lâmpada HPS",
      "unidade": "W",
      "base": 12.0,
      "minimo": 8.0,
      "maximo": 15.0,
      "payback_a1": [
        2.9711274570445156,
        2.68420938237677
      ],
      "payback_a2": [
        4.216276694415322,
        3.911872957954134
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        194.92664951999998,
        217.54146552
      ]
    },
    {
      "id": "fator_compensacao",
      "descricao": "Fração do valor da tarifa efetivamente compensada pela geração FV (Fio B)",
      "unidade": "fração",
      "base": 0.85,
      "minimo": 0.75,
      "maximo": 1.0,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.12684902375294,
        3.908809022187801
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "fracao_presenca",
      "descricao": "Fração do tempo da madrugada em que há presença detectada (luz a 100%)",
      "unidade": "fração",
      "base": 0.15,
      "minimo": 0.05,
      "maximo": 0.3,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        3.989960632405152,
        4.117299359081994
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        211.77466440000006,
        201.91301232000004
      ]
    },
    {
      "id": "pr_ongrid",
      "descricao": "Taxa de desempenho (PR) do sistema FV conectado à rede",
      "unidade": "fração",
      "base": 0.78,
      "minimo": 0.7,
      "maximo": 0.85,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.1150774338216864,
        3.9976882027986576
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.37773560000005,
        208.09178520000006
      ]
    },
    {
      "id": "pr_offgrid",
      "descricao": "Taxa de desempenho (PR) do sistema FV autônomo com bateria",
      "unidade": "fração",
      "base": 0.65,
      "minimo": 0.55,
      "maximo": 0.75,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.0367776991279944,
        4.0367776991279944
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "autonomia_noites",
      "descricao": "Autonomia da bateria sem sol (noites)",
      "unidade": "noites",
      "base": 2.0,
      "minimo": 1.5,
      "maximo": 3.0,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.0367776991279944,
        4.0367776991279944
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "preco_painel_wp",
      "descricao": "Preço do módulo FV avulso (sistema autônomo)",
      "unidade": "R$/Wp",
      "base": 3.0,
      "minimo": 2.0,
      "maximo": 4.5,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.0367776991279944,
        4.0367776991279944
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "preco_bateria_wh",
      "descricao": "Preço da bateria LiFePO4",
      "unidade": "R$/Wh",
      "base": 2.4,
      "minimo": 1.4,
      "maximo": 3.5,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.0367776991279944,
        4.0367776991279944
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "custo_adaptacao_poste",
      "descricao": "Adaptação do poste existente para painel e bateria (braço, caixa, reforço)",
      "unidade": "R$/ponto",
      "base": 600.0,
      "minimo": 300.0,
      "maximo": 2000.0,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.0367776991279944,
        4.0367776991279944
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "vida_bateria_anos",
      "descricao": "Vida útil da bateria LiFePO4 em ciclo diário",
      "unidade": "anos",
      "base": 8.0,
      "minimo": 6.0,
      "maximo": 12.0,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.0367776991279944,
        4.0367776991279944
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        207.84940152000004,
        207.84940152000004
      ]
    },
    {
      "id": "fe_sin",
      "descricao": "Fator médio de emissão de CO2 do SIN, média anual de 2025",
      "unidade": "tCO2/MWh",
      "base": 0.0461,
      "minimo": 0.0385,
      "maximo": 0.1355,
      "payback_a1": [
        2.8000958534866824,
        2.8000958534866824
      ],
      "payback_a2": [
        4.0367776991279944,
        4.0367776991279944
      ],
      "payback_a3": [
        null,
        null
      ],
      "evitadas_liq_a2": [
        163.41968676,
        730.48315146
      ]
    }
  ],
  "cenarios": {
    "otimista": {
      "payback_a1": 0.7656230015325604,
      "payback_a2": 1.2224535927512703,
      "payback_a3": 26.83280102623983,
      "economia_rs_mes_a2": 467.29790266666663,
      "evitadas_liq_a2": 243.77991716000002
    },
    "base": {
      "payback_a1": 2.8000958534866824,
      "payback_a2": 4.0367776991279944,
      "payback_a3": null,
      "economia_rs_mes_a2": 238.22631275296666,
      "evitadas_liq_a2": 207.84940152000004
    },
    "conservador": {
      "payback_a1": 11.94658409595516,
      "payback_a2": 12.98429054631202,
      "payback_a3": null,
      "economia_rs_mes_a2": 140.07311323733333,
      "evitadas_liq_a2": 156.5226872
    }
  },
  "premissas": [
    {
      "id": "n_pontos_praca",
      "descricao": "Pontos de luz na praça (caso-modelo)",
      "valor": "12",
      "unidade": "un",
      "minimo": "8",
      "maximo": "20",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Caso-modelo simulado do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Praça hipotética. O número é um valor intermediário adotado para o estudo; o grupo deve trocá-lo pelo levantamento real do local (camada de iluminação do GeoSampa ou visita)."
    },
    {
      "id": "n_pontos_onibus",
      "descricao": "Pontos de luz em pontos de ônibus do entorno (caso-modelo)",
      "valor": "4",
      "unidade": "un",
      "minimo": "2",
      "maximo": "8",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Caso-modelo simulado do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Quatro pontos de ônibus no entorno da praça, um ponto de luz em cada. Valor simulado, a ser substituído pelo levantamento real."
    },
    {
      "id": "horas_noite",
      "descricao": "Horas de funcionamento por noite (pôr do sol ao nascer do sol)",
      "valor": "12",
      "unidade": "h/dia",
      "minimo": "11",
      "maximo": "13",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Geometria solar em 23,7 graus S; REN ANEEL 1.000/2021, art. 468, IV",
      "url": "https://www.cemig.com.br/wp-content/uploads/2025/08/ren20211000.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "Em 23,7 graus de latitude sul a noite dura cerca de 10,6 h (dezembro) a 13,4 h (junho); a média anual fica perto de 12 h. A REN 1.000/2021 estima o consumo da iluminação pública pelo tempo médio anual homologado para cada município (RH 2.590/2019); o valor de São Paulo não foi confirmado nesta pesquisa."
    },
    {
      "id": "dias_ano",
      "descricao": "Dias por ano (período de referência)",
      "valor": "365",
      "unidade": "dias",
      "minimo": "365",
      "maximo": "365",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Calendário",
      "url": "",
      "data_acesso": "",
      "justificativa": "Período de referência comum a todas as alternativas: 1 ano de 365 dias. Mês = ano / 12."
    },
    {
      "id": "p_nominal_hps",
      "descricao": "Potência nominal da lâmpada de vapor de sódio (HPS)",
      "valor": "70",
      "unidade": "W",
      "minimo": "70",
      "maximo": "70",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Ficha técnica Signify SON 70 W E27",
      "url": "https://www.signify.com/api/assets/v1/file/Signify/content/LP_CF_DSON_EU.pt_BR.PROF.CF-1/SON.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "Modelo comum em iluminação pública. Usado na equivalência de fluxo luminoso."
    },
    {
      "id": "p_lampada_hps",
      "descricao": "Consumo de energia da lâmpada HPS 70 W",
      "valor": "72.5",
      "unidade": "W",
      "minimo": "72.5",
      "maximo": "72.5",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Ficha técnica Signify SON 70 W E27 (consumo de energia 72,5 W; 73 kWh/1000 h)",
      "url": "https://www.signify.com/api/assets/v1/file/Signify/content/LP_CF_DSON_EU.pt_BR.PROF.CF-1/SON.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "Valor da ficha, maior que os 70 W nominais."
    },
    {
      "id": "p_reator",
      "descricao": "Perda do reator e equipamentos auxiliares da lâmpada HPS",
      "valor": "12",
      "unidade": "W",
      "minimo": "8",
      "maximo": "15",
      "tipo": "dado parcial",
      "usado_no_calculo": "sim",
      "fonte": "Ficha do reator Demape RVS AFP 70 W (perda 12 W), visto em resultado de busca",
      "url": "",
      "data_acesso": "2026-11-23",
      "justificativa": "Valor citado no resultado de busca; a ficha completa não foi aberta. A REN 1.000/2021 (art. 468) manda incluir os equipamentos auxiliares na carga do ponto. Faixa de 8 a 15 W cobre reatores eletromagnéticos de 70 W."
    },
    {
      "id": "eficacia_hps",
      "descricao": "Eficácia luminosa nominal da lâmpada HPS",
      "valor": "80",
      "unidade": "lm/W",
      "minimo": "80",
      "maximo": "80",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Ficha técnica Signify SON 70 W E27",
      "url": "https://www.signify.com/api/assets/v1/file/Signify/content/LP_CF_DSON_EU.pt_BR.PROF.CF-1/SON.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "Fluxo da lâmpada = 80 lm/W x 70 W = 5.600 lm."
    },
    {
      "id": "lor_luminaria_antiga",
      "descricao": "Rendimento óptico da luminária antiga (parcela do fluxo que sai da luminária)",
      "valor": "0.7",
      "unidade": "fração",
      "minimo": "0.6",
      "maximo": "0.8",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Luminárias antigas perdem parte do fluxo no refletor e no difusor. A faixa de 0,60 a 0,80 é uma estimativa; serve só para verificar que o LED escolhido entrega pelo menos a mesma luz."
    },
    {
      "id": "vida_hps_h",
      "descricao": "Vida útil da lâmpada HPS",
      "valor": "24000",
      "unidade": "h",
      "minimo": "16000",
      "maximo": "32000",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo (valor típico de mercado, não confirmado na ficha consultada)",
      "url": "",
      "data_acesso": "",
      "justificativa": "Usada para estimar a frequência de troca: 24.000 h / 4.380 h por ano = 5,5 anos."
    },
    {
      "id": "custo_troca_hps",
      "descricao": "Custo de uma troca de lâmpada HPS (lâmpada, reator/ignitor rateado e mão de obra)",
      "valor": "200",
      "unidade": "R$/troca",
      "minimo": "120",
      "maximo": "350",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Estimativa de ordem de grandeza: lâmpada, parte do equipamento auxiliar e deslocamento com cesto aéreo. Não há orçamento real."
    },
    {
      "id": "hg_mg_hps",
      "descricao": "Mercúrio por lâmpada HPS 70 W",
      "valor": "16.3",
      "unidade": "mg",
      "minimo": "16.3",
      "maximo": "16.3",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Ficha técnica Signify SON 70 W E27",
      "url": "https://www.signify.com/api/assets/v1/file/Signify/content/LP_CF_DSON_EU.pt_BR.PROF.CF-1/SON.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "Usado só no indicador ambiental de mercúrio retirado de uso."
    },
    {
      "id": "eficacia_led",
      "descricao": "Eficácia da luminária LED pública (nível da luminária)",
      "valor": "150",
      "unidade": "lm/W",
      "minimo": "120",
      "maximo": "170",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Ata de Registro de Preços 137/2026 (Presidência da República), item 4: LED 120 W, 18.000 lm, 150 lm/W, IP66, ENCE A, vida até 50.000 h",
      "url": "https://www.gov.br/casacivil/pt-br/acesso-a-informacao/licitacoes-e-contratos/secretaria-de-administracao/atas-de-registro-de-precos/2026/ata-no-137-2026/2-ata-no-137-2026-bmb.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "Especificação de luminária pública LED comprada pelo governo federal em 2026. Serve de referência para a eficácia; a potência do ponto do estudo é menor (30 W)."
    },
    {
      "id": "p_led",
      "descricao": "Potência da luminária LED adotada por ponto (com driver)",
      "valor": "30",
      "unidade": "W",
      "minimo": "27",
      "maximo": "40",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Calculada pelo grupo a partir do fluxo (ver equivalência no script)",
      "url": "",
      "data_acesso": "",
      "justificativa": "Fluxo útil da luminária antiga = 5.600 lm x 0,70 = 3.920 lm. Com 150 lm/W bastariam 26 W; adotamos 30 W (4.500 lm), tamanho comercial com folga de 15%."
    },
    {
      "id": "vida_led_h",
      "descricao": "Vida útil da luminária LED",
      "valor": "50000",
      "unidade": "h",
      "minimo": "40000",
      "maximo": "100000",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Ata de Registro de Preços 137/2026, item 4 (vida útil até 50.000 h)",
      "url": "https://www.gov.br/casacivil/pt-br/acesso-a-informacao/licitacoes-e-contratos/secretaria-de-administracao/atas-de-registro-de-precos/2026/ata-no-137-2026/2-ata-no-137-2026-bmb.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "50.000 h / 4.380 h por ano = 11,4 anos."
    },
    {
      "id": "preco_luminaria_led",
      "descricao": "Preço da luminária LED de 30 W",
      "valor": "250",
      "unidade": "R$/un",
      "minimo": "150",
      "maximo": "450",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa ancorada na Ata 137/2026 (R$ 291,00 por luminária LED de 120 W)",
      "url": "https://www.gov.br/casacivil/pt-br/acesso-a-informacao/licitacoes-e-contratos/secretaria-de-administracao/atas-de-registro-de-precos/2026/ata-no-137-2026/2-ata-no-137-2026-bmb.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "O preço registrado em ata federal para o modelo de 120 W dá a ordem de grandeza. Para 30 W com certificação do Inmetro, em compra pequena, adotamos R$ 250 (faixa R$ 150 a R$ 450). Não foi encontrado preço público de um modelo de 30 W."
    },
    {
      "id": "custo_instalacao_ponto",
      "descricao": "Mão de obra de troca da luminária em poste existente",
      "valor": "120",
      "unidade": "R$/ponto",
      "minimo": "60",
      "maximo": "250",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Troca de luminária em poste já instalado, sem obra civil. Valor estimado."
    },
    {
      "id": "om_led_ponto",
      "descricao": "Manutenção anual da luminária LED (inspeção e limpeza)",
      "valor": "8",
      "unidade": "R$/ponto/ano",
      "minimo": "4",
      "maximo": "20",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Estimativa: inspeção e limpeza periódicas; sem troca de lâmpada durante a vida útil."
    },
    {
      "id": "tarifa_tusd_b4a",
      "descricao": "TUSD da Iluminação Pública B4a, Enel SP",
      "valor": "259.83",
      "unidade": "R$/MWh",
      "minimo": "259.83",
      "maximo": "259.83",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Enel SP, tabela de tarifas, Resolução Homologatória ANEEL 3.596/2026 (vigência a partir de 04/07/2026)",
      "url": "https://www.enel.com.br/pt-saopaulo/Para_Voce/tarifa-energia-eletrica.html",
      "data_acesso": "2026-11-23",
      "justificativa": "Tarifa de uso do sistema de distribuição."
    },
    {
      "id": "tarifa_te_b4a",
      "descricao": "TE (tarifa de energia) da Iluminação Pública B4a, Enel SP",
      "valor": "174.33",
      "unidade": "R$/MWh",
      "minimo": "174.33",
      "maximo": "174.33",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Enel SP, tabela de tarifas, Resolução Homologatória ANEEL 3.596/2026",
      "url": "https://www.enel.com.br/pt-saopaulo/Para_Voce/tarifa-energia-eletrica.html",
      "data_acesso": "2026-11-23",
      "justificativa": "TUSD + TE = 434,16 R$/MWh, o mesmo valor que a Enel lista para B4a na tabela do Grupo B."
    },
    {
      "id": "fator_tarifa_encargos",
      "descricao": "Multiplicador da tarifa para tributos e bandeira tarifária",
      "valor": "1.0",
      "unidade": "fator",
      "minimo": "0.9",
      "maximo": "1.4",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "A tarifa homologada é publicada sem tributos e sem bandeira. Não confirmamos como a prefeitura é cobrada. O valor-base 1,00 é conservador para o payback; a faixa 0,90 a 1,40 é de teste, não um dado."
    },
    {
      "id": "irradiacao_sundata",
      "descricao": "Irradiação solar diária média mensal, plano inclinado na latitude (24 graus)",
      "valor": "4.59",
      "unidade": "kWh/m2.dia",
      "minimo": "4.02",
      "maximo": "5.23",
      "tipo": "dado confirmado",
      "usado_no_calculo": "nao",
      "fonte": "CRESESB SunData v3.0 (Atlas Brasileiro de Energia Solar, 2a ed., INPE 2017), estação São Paulo 23,701 S 46,749 O, a 5,6 km do ponto -23,66 / -46,78",
      "url": "https://cresesb.cepel.br/index.php?section=sundata",
      "data_acesso": "2026-11-23",
      "justificativa": "Média anual 4,59; mínimo mensal 4,02 (junho); máximo 5,23 (fevereiro). Valores mensais em dados/irradiacao_sundata_sao_paulo.csv. O cálculo usa a série mensal, não este resumo."
    },
    {
      "id": "pr_ongrid",
      "descricao": "Taxa de desempenho (PR) do sistema FV conectado à rede",
      "valor": "0.78",
      "unidade": "fração",
      "minimo": "0.7",
      "maximo": "0.85",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo (faixa usual de projeto)",
      "url": "",
      "data_acesso": "",
      "justificativa": "Perdas por temperatura, sujeira, cabos e inversor. Não há medição no local."
    },
    {
      "id": "pr_offgrid",
      "descricao": "Taxa de desempenho (PR) do sistema FV autônomo com bateria",
      "valor": "0.65",
      "unidade": "fração",
      "minimo": "0.55",
      "maximo": "0.75",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Menor que a do sistema na rede por incluir perdas do controlador e da carga e descarga da bateria."
    },
    {
      "id": "wp_modulo",
      "descricao": "Potência de um módulo FV comercial",
      "valor": "550",
      "unidade": "Wp",
      "minimo": "550",
      "maximo": "550",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Módulos de 550 Wp são comuns no varejo; usado só para arredondar o número de módulos."
    },
    {
      "id": "custo_fv_wp",
      "descricao": "Custo instalado do sistema FV conectado à rede, porte muito pequeno",
      "valor": "3.8",
      "unidade": "R$/Wp",
      "minimo": "2.45",
      "maximo": "4.5",
      "tipo": "dado parcial",
      "usado_no_calculo": "sim",
      "fonte": "Radar Solfácil (via Cenário Energia, 09/06/2026): média nacional residencial R$ 2,45/Wp; matéria da UAI (out/2026, vista só em resultado de busca): R$ 3.400 a R$ 4.200 por kWp em 2026",
      "url": "https://cenarioenergia.com.br/2026/06/09/preco-do-watt-pico-residencial-recua-7-em-um-ano-e-abre-janela-de-oportunidade-na-mmgd/",
      "data_acesso": "2026-11-23",
      "justificativa": "Para um sistema de cerca de 1 kWp os custos fixos de projeto e homologação pesam mais que na média, por isso adotamos R$ 3,80/Wp, dentro da faixa de R$ 3,40 a R$ 4,20 por kWp da matéria. Mínimo da faixa: média nacional."
    },
    {
      "id": "fator_compensacao",
      "descricao": "Fração do valor da tarifa efetivamente compensada pela geração FV (Fio B)",
      "valor": "0.85",
      "unidade": "fração",
      "minimo": "0.75",
      "maximo": "1.0",
      "tipo": "dado parcial",
      "usado_no_calculo": "sim",
      "fonte": "Lei 14.300/2022, art. 27 (Fio B: 60% em 2026, segundo matérias consultadas)",
      "url": "https://www2.camara.leg.br/legin/fed/lei/2022/lei-14300-6-janeiro-2022-792217-norma-pl.html",
      "data_acesso": "2026-11-23",
      "justificativa": "O escalonamento (15% em 2023 até 60% em 2026) foi confirmado em fontes secundárias; o texto da lei não foi lido. O peso do Fio B na tarifa B4a e a regra para iluminação pública não foram confirmados. Premissa: 15% do valor compensado se perde."
    },
    {
      "id": "om_fv_pct",
      "descricao": "Operação e manutenção anual do sistema FV (percentual do custo)",
      "valor": "0.01",
      "unidade": "fração/ano",
      "minimo": "0.005",
      "maximo": "0.02",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Limpeza e inspeção; não inclui troca de inversor (limitação declarada)."
    },
    {
      "id": "ef_ciclo_fv",
      "descricao": "Emissão de ciclo de vida da eletricidade FV (silício monocristalino, telhado)",
      "valor": "42.9",
      "unidade": "g CO2e/kWh",
      "minimo": "25.5",
      "maximo": "44.0",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "IEA PVPS Task 12, Fact Sheet, atualização 2021 (sistema residencial na Europa, 975 kWh/kWp por ano)",
      "url": "https://www.iea-pvps.org/wp-content/uploads/2022/11/Fact-Sheet-IEA-PVPS-T12-23-LCA-update-2022.pdf",
      "data_acesso": "2026-11-23",
      "justificativa": "Em local de maior irradiação o valor por kWh seria menor; usamos 42,9 como valor conservador."
    },
    {
      "id": "autonomia_noites",
      "descricao": "Autonomia da bateria sem sol (noites)",
      "valor": "2",
      "unidade": "noites",
      "minimo": "1.5",
      "maximo": "3",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo; a luminária Intelbras LSI 4800 anuncia até 3 noites em modo sensor",
      "url": "https://www.kabum.com.br/produto/475566/luminaria-solar-integrada-intelbras-lsi-4800-lm-4848040",
      "data_acesso": "2026-11-23",
      "justificativa": "Duas noites cobrem dias nublados seguidos em São Paulo."
    },
    {
      "id": "dod_bateria",
      "descricao": "Profundidade de descarga utilizável da bateria LiFePO4",
      "valor": "0.8",
      "unidade": "fração",
      "minimo": "0.7",
      "maximo": "0.9",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Valor usual de projeto para preservar a vida da bateria."
    },
    {
      "id": "preco_painel_wp",
      "descricao": "Preço do módulo FV avulso (sistema autônomo)",
      "valor": "3.0",
      "unidade": "R$/Wp",
      "minimo": "2.0",
      "maximo": "4.5",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Compra avulsa de módulo pequeno, sem instalação. Estimativa."
    },
    {
      "id": "preco_bateria_wh",
      "descricao": "Preço da bateria LiFePO4",
      "valor": "2.4",
      "unidade": "R$/Wh",
      "minimo": "1.4",
      "maximo": "3.5",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Ordem de grandeza de baterias LiFePO4 de 12,8 V no varejo brasileiro. Sem cotação."
    },
    {
      "id": "custo_controlador",
      "descricao": "Controlador de carga MPPT, sensor, cabos e caixa por ponto",
      "valor": "450",
      "unidade": "R$/ponto",
      "minimo": "300",
      "maximo": "700",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Estimativa."
    },
    {
      "id": "custo_adaptacao_poste",
      "descricao": "Adaptação do poste existente para painel e bateria (braço, caixa, reforço)",
      "valor": "600",
      "unidade": "R$/ponto",
      "minimo": "300",
      "maximo": "2000",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Reaproveita o poste existente. Se for preciso poste novo (cerca de 6 m, como o poste solar do mercado), o custo sobe para a faixa máxima."
    },
    {
      "id": "custo_instalacao_solar",
      "descricao": "Instalação do conjunto solar autônomo por ponto",
      "valor": "400",
      "unidade": "R$/ponto",
      "minimo": "250",
      "maximo": "700",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Estimativa."
    },
    {
      "id": "vida_bateria_anos",
      "descricao": "Vida útil da bateria LiFePO4 em ciclo diário",
      "valor": "8",
      "unidade": "anos",
      "minimo": "6",
      "maximo": "12",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Cerca de 3.000 ciclos a 80% de descarga; valor típico, não confirmado em ficha."
    },
    {
      "id": "om_solar_ponto",
      "descricao": "Manutenção anual do conjunto solar autônomo (sem a bateria)",
      "valor": "40",
      "unidade": "R$/ponto/ano",
      "minimo": "20",
      "maximo": "100",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Limpeza do painel e inspeção."
    },
    {
      "id": "ref_intelbras_preco",
      "descricao": "Referência: preço de varejo da luminária solar integrada Intelbras LSI 4800 (40 W, painel 21 Wp, bateria LiFePO4 9,6 V 12 Ah)",
      "valor": "1572.28",
      "unidade": "R$/un",
      "minimo": "1572.28",
      "maximo": "1572.28",
      "tipo": "dado confirmado",
      "usado_no_calculo": "nao",
      "fonte": "Loja Kabum (preço à vista no PIX)",
      "url": "https://www.kabum.com.br/produto/475566/luminaria-solar-integrada-intelbras-lsi-4800-lm-4848040",
      "data_acesso": "2026-11-23",
      "justificativa": "Não entra no cálculo. Serve de conferência: o painel (21 Wp) e a bateria (cerca de 115 Wh) dele são bem menores que o dimensionamento deste estudo, então o conjunto dimensionado custa mais."
    },
    {
      "id": "h_inicio_noite",
      "descricao": "Horas no início da noite a 100% da potência",
      "valor": "4",
      "unidade": "h",
      "minimo": "3",
      "maximo": "6",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Período de maior movimento na praça e nos pontos de ônibus."
    },
    {
      "id": "h_madrugada",
      "descricao": "Horas de madrugada em modo economia (nível base com reforço por presença)",
      "valor": "7",
      "unidade": "h",
      "minimo": "5",
      "maximo": "8",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "O restante da noite (12 h menos as outras faixas) fica a 100% ao amanhecer."
    },
    {
      "id": "nivel_base",
      "descricao": "Nível de luz base em modo economia",
      "valor": "0.3",
      "unidade": "fração",
      "minimo": "0.2",
      "maximo": "0.5",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "Comportamento do modo sensor da Intelbras LSI 4800: 30% de brilho, 100% ao detectar movimento",
      "url": "https://www.kabum.com.br/produto/475566/luminaria-solar-integrada-intelbras-lsi-4800-lm-4848040",
      "data_acesso": "2026-11-23",
      "justificativa": "Usado como referência de produto de mercado, não como norma de iluminação. A adequação do nível ao tipo de via deve ser conferida na NBR 5101."
    },
    {
      "id": "fracao_presenca",
      "descricao": "Fração do tempo da madrugada em que há presença detectada (luz a 100%)",
      "valor": "0.15",
      "unidade": "fração",
      "minimo": "0.05",
      "maximo": "0.3",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Sem contagem de pessoas. Será medida pelos sensores depois da instalação."
    },
    {
      "id": "p_aux_sensor",
      "descricao": "Consumo contínuo (24 h) do sensor e controlador por ponto",
      "valor": "1.0",
      "unidade": "W",
      "minimo": "0.5",
      "maximo": "3.0",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Sensor PIR, fotocélula e módulo de comunicação."
    },
    {
      "id": "custo_sensor_dimmer",
      "descricao": "Sensor de presença, fotocélula e driver dimerizável por ponto",
      "valor": "90",
      "unidade": "R$/ponto",
      "minimo": "50",
      "maximo": "200",
      "tipo": "premissa",
      "usado_no_calculo": "sim",
      "fonte": "Premissa do grupo",
      "url": "",
      "data_acesso": "",
      "justificativa": "Estimativa. Sem cotação."
    },
    {
      "id": "fe_sin",
      "descricao": "Fator médio de emissão de CO2 do SIN, média anual de 2025",
      "valor": "0.0461",
      "unidade": "tCO2/MWh",
      "minimo": "0.0385",
      "maximo": "0.1355",
      "tipo": "dado confirmado",
      "usado_no_calculo": "sim",
      "fonte": "MCTI, SIRENE, fatores de emissão para inventários corporativos (planilha Inventario_2026_janout.xlsx)",
      "url": "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/sirene/dados-e-ferramentas/fatores-de-emissao",
      "data_acesso": "2026-11-23",
      "justificativa": "0,0461 tCO2/MWh = 0,0461 kg CO2/kWh. É fator de CO2, não de CO2e. Faixa: mínimo 0,0385 (2023) e máximo 0,1355 (2014), da série oficial. O fator varia muito entre anos conforme a hidrologia."
    },
    {
      "id": "populacao_distrito",
      "descricao": "População do distrito de Capão Redondo, Censo 2022",
      "valor": "270767",
      "unidade": "pessoas",
      "minimo": "270767",
      "maximo": "270767",
      "tipo": "dado parcial",
      "usado_no_calculo": "nao",
      "fonte": "IBGE, Censo 2022, apresentado pelo site citypopulation.de",
      "url": "https://www.citypopulation.de/en/brazil/saopaulocity/35503081900__capão_redondo",
      "data_acesso": "2026-11-23",
      "justificativa": "Fonte secundária (o site cita o IBGE). Contexto do público potencialmente beneficiado; não entra nos cálculos."
    },
    {
      "id": "ilume_pontos_led_2021",
      "descricao": "Parque de iluminação pública de São Paulo já remodelado para LED em jul/2021",
      "valor": "512000",
      "unidade": "pontos",
      "minimo": "512000",
      "maximo": "512000",
      "tipo": "dado confirmado",
      "usado_no_calculo": "nao",
      "fonte": "Prefeitura de São Paulo (SMUL/ILUME), notícia de 28/07/2021: 512 mil pontos, 83% do parque, de mais de 600 mil pontos",
      "url": "https://prefeitura.sp.gov.br/licenciamento/w/noticias/315719",
      "data_acesso": "2026-11-23",
      "justificativa": "Dado de 2021, sem atualização encontrada. Mostra que ainda existem pontos fora do LED: o caso-modelo assume que a praça é um deles. O grupo deve conferir no GeoSampa."
    }
  ]
};
