/* Dashboard de energia (SERS). Lê window.RESULTADOS (data/resultados.js),
   gerado por src/calcular.py, e desenha indicadores, gráficos e tabelas.
   Nenhum número é calculado aqui além de somas simples e formatação. */
(function () {
  'use strict';

  var R = window.RESULTADOS;
  var erro = document.getElementById('erro');

  function mostrarErro(msg) {
    erro.hidden = false;
    erro.textContent = msg;
  }

  if (!R) {
    mostrarErro('Não foi possível carregar data/resultados.js. Rode python src/calcular.py e abra a página de novo.');
    return;
  }

  var COR = { A0: '#64748b', A1: '#2563eb', A2: '#16a34a', A3: '#d97706' };
  var alts = R.alternativas;
  var porId = {};
  alts.forEach(function (a) { porId[a.id] = a; });
  var base = porId.A0;
  var dim = R.dimensionamento;

  /* ---------- formatação ---------- */
  function nf(v, casas) {
    casas = casas === undefined ? 1 : casas;
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(v);
  }
  function nfa(v) { return nf(v, Number.isInteger(v) ? 0 : 2); }
  function brl(v, casas) {
    return 'R$ ' + nf(v, casas === undefined ? 2 : casas);
  }
  function anos(v) {
    return v === null || v === undefined ? 'não se paga' : nf(v, 1) + ' anos';
  }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function prem(id) {
    for (var i = 0; i < R.premissas.length; i++) if (R.premissas[i].id === id) return R.premissas[i];
    return null;
  }
  var efFV = nfPrem('ef_ciclo_fv');
  function nfPrem(id) { return Number(prem(id).valor); }

  document.getElementById('gerado-em').textContent = R.gerado_em.split('-').reverse().join('/');

  /* ---------- indicadores (KPIs) ---------- */
  var seletor = document.getElementById('seletor');
  var kpis = document.getElementById('kpis');
  var descricao = document.getElementById('descricao-alt');
  var escolhida = 'A2';

  function faixaPayback(id) {
    var chave = 'payback_' + id.toLowerCase();
    var o = R.cenarios.otimista[chave], c = R.cenarios.conservador[chave];
    return 'limites: ' + (o === null ? 'não se paga' : nf(o, 1)) + ' a ' + (c === null ? 'não se paga' : nf(c, 1) + ' anos');
  }

  function desenharKpis() {
    var a = porId[escolhida];
    var cor = COR[a.id];
    var economiaMes = a.economia_rs_mes;
    var lista = [
      { r: 'Consumo de energia da rede', v: nf(a.rede_kwh_mes), u: 'kWh/mês',
        d: 'Situação atual: ' + nf(base.rede_kwh_mes) + ' kWh/mês. Carga das luminárias: ' + nf(a.carga_kwh_mes) + ' kWh/mês.' },
      { r: 'Economia de energia da rede', v: nf(a.economia_rede_pct), u: '%',
        d: nf(a.economia_rede_kwh_mes) + ' kWh/mês a menos que a situação atual.' },
      { r: 'Redução estimada de custos', v: (economiaMes < 0 ? '−' : '') + brl(Math.abs(economiaMes)), u: '/mês',
        d: 'Custo de operação: ' + brl(a.custo_operacao_rs_mes) + ' contra ' + brl(base.custo_operacao_rs_mes) + ' hoje' +
           (economiaMes < 0 ? ' (fica mais caro).' : '.') },
      { r: 'Participação de energia renovável', v: nf(a.participacao_renovavel_pct), u: '%',
        d: 'Parte da carga atendida por geração solar própria (' + nf(a.renovavel_kwh_mes) + ' kWh/mês).' },
      { r: 'Emissões evitadas estimadas', v: nf(a.emissoes_evitadas_kg_ano), u: 'kg CO₂/ano',
        d: 'Líquidas do ciclo de vida do FV: ' + nf(a.emissoes_evitadas_liquidas_kg_ano) + ' kg CO₂e/ano.' },
      { r: 'Tempo de funcionamento eficiente', v: nf(a.horas_modo_economia_dia), u: 'h/dia',
        d: 'Horas por noite em modo economia (dimerizado), de ' + nf(dim.horas_noite, 0) + ' h de funcionamento.' },
      { r: 'Investimento inicial', v: brl(a.capex_rs, 0), u: '',
        d: dim.pontos_total + ' pontos de luz (' + dim.pontos_praca + ' na praça e ' + dim.pontos_onibus + ' em pontos de ônibus).' },
      { r: 'Payback simples', v: a.payback_anos === null ? 'não se paga' : nf(a.payback_anos), u: a.payback_anos === null ? '' : 'anos',
        d: faixaPayback(a.id) + ' (cenários combinados).' }
    ];
    kpis.innerHTML = '';
    lista.forEach(function (k) {
      var c = el('div', { 'class': 'kpi' });
      c.style.setProperty('--cor', cor);
      c.innerHTML = '<div class="rotulo">' + esc(k.r) + '</div><div class="valor">' + esc(k.v) +
        (k.u ? '<span class="unidade">' + esc(k.u) + '</span>' : '') + '</div><div class="detalhe">' + esc(k.d) + '</div>';
      kpis.appendChild(c);
    });
    descricao.textContent = a.nome_completo + '. ' + a.descricao;
    Array.prototype.forEach.call(seletor.children, function (b) {
      var ativo = b.getAttribute('data-id') === escolhida;
      b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      b.style.background = ativo ? COR[b.getAttribute('data-id')] : '';
    });
  }

  alts.filter(function (a) { return a.id !== 'A0'; }).forEach(function (a) {
    var b = el('button', { type: 'button', 'data-id': a.id, 'aria-pressed': 'false' }, esc(a.nome) + (a.renovavel ? ' (renovável)' : ''));
    b.addEventListener('click', function () { escolhida = a.id; desenharKpis(); });
    seletor.appendChild(b);
  });
  desenharKpis();

  /* ---------- tabela comparativa ---------- */
  var linhasTabela = [
    ['Potência por ponto de luz (W)', 'potencia_ponto_w', 1],
    ['Energia por noite, 16 pontos (kWh)', 'energia_noite_kwh', 2],
    ['Consumo da carga (kWh/ano)', 'carga_kwh_ano', 0],
    ['Consumo da carga (kWh/mês)', 'carga_kwh_mes', 1],
    ['Compra líquida da rede (kWh/mês)', 'rede_kwh_mes', 1],
    ['Economia de energia da rede (kWh/mês)', 'economia_rede_kwh_mes', 1],
    ['Economia de energia da rede (%)', 'economia_rede_pct', 1],
    ['Participação de energia renovável (%)', 'participacao_renovavel_pct', 1],
    ['Horas por noite em modo economia (h/dia)', 'horas_modo_economia_dia', 1],
    ['Custo de energia (R$/mês)', 'custo_energia_rs_mes', 2],
    ['Manutenção (R$/mês)', 'custo_om_rs_mes', 2],
    ['Custo de operação (R$/mês)', 'custo_operacao_rs_mes', 2],
    ['Redução de custo (R$/mês)', 'economia_rs_mes', 2],
    ['Investimento inicial (R$)', 'capex_rs', 0],
    ['Payback simples', 'payback_anos', 'anos'],
    ['Saldo acumulado em 10 anos, sem desconto (R$)', 'economia_liquida_10anos_rs', 0],
    ['Emissões evitadas na operação (kg CO₂/ano)', 'emissoes_evitadas_kg_ano', 1],
    ['Emissões evitadas líquidas do ciclo de vida do FV (kg CO₂e/ano)', 'emissoes_evitadas_liquidas_kg_ano', 1],
    ['Mercúrio retirado de uso (mg)', 'mercurio_retirado_mg', 0]
  ];
  (function () {
    var t = document.getElementById('tabela');
    var h = '<thead><tr><th>Indicador</th>' + alts.map(function (a) {
      return '<th class="cab-' + a.id.toLowerCase() + '">' + esc(a.nome) + '</th>';
    }).join('') + '</tr></thead><tbody>';
    linhasTabela.forEach(function (l) {
      h += '<tr><td>' + esc(l[0]) + '</td>' + alts.map(function (a) {
        var v = a[l[1]];
        if (l[2] === 'anos') return '<td>' + (a.id === 'A0' ? '-' : anos(v)) + '</td>';
        return '<td>' + nf(v, l[2]) + '</td>';
      }).join('') + '</tr>';
    });
    t.innerHTML = h + '</tbody>';
  })();

  /* ---------- qualitativo ---------- */
  (function () {
    var c = document.getElementById('qualitativo');
    alts.forEach(function (a) {
      var d = el('article', { 'class': 'alt' });
      d.style.setProperty('--cor', COR[a.id]);
      d.innerHTML = '<h3>' + esc(a.nome_completo) + '</h3>' +
        '<h4>Viabilidade técnica</h4><p>' + esc(a.viabilidade) + '</p>' +
        '<h4>Impactos ambientais</h4><p>' + esc(a.impactos_ambientais) + '</p>' +
        '<h4>Benefícios</h4><ul>' + a.beneficios.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
        '<h4>Limitações</h4><ul>' + a.limitacoes.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>';
      c.appendChild(d);
    });
  })();

  /* ---------- sensibilidade ---------- */
  (function () {
    function par(v) {
      if (v[0] === null && v[1] === null) return 'não se paga';
      return [v[0] === null ? 'não se paga' : nf(v[0], 1), v[1] === null ? 'não se paga' : nf(v[1], 1)].join(' a ');
    }
    var t = document.getElementById('tab-sens');
    var h = '<thead><tr><th>Premissa variada</th><th>Faixa testada (mín. a máx.)</th><th>Payback A1 (anos, do mín. ao máx.)</th><th>Payback A2 (anos, do mín. ao máx.)</th><th>Payback A3 (anos, do mín. ao máx.)</th></tr></thead><tbody>';
    R.sensibilidade.slice(0, 10).forEach(function (s) {
      h += '<tr><td>' + esc(s.descricao) + '</td><td>' + nfa(s.minimo) + ' a ' + nfa(s.maximo) + ' ' + esc(s.unidade) +
        '</td><td>' + par(s.payback_a1) + '</td><td>' + par(s.payback_a2) + '</td><td>' + par(s.payback_a3) + '</td></tr>';
    });
    t.innerHTML = h + '</tbody>';

    var c = document.getElementById('tab-cenarios');
    var h2 = '<thead><tr><th>Cenário combinado</th><th>Payback A1 (anos)</th><th>Payback A2 (anos)</th><th>Payback A3 (anos)</th><th>Redução A2 (R$/mês)</th></tr></thead><tbody>';
    [['otimista', 'Limite otimista'], ['base', 'Base'], ['conservador', 'Limite conservador']].forEach(function (k) {
      var x = R.cenarios[k[0]];
      h2 += '<tr><td>' + k[1] + '</td><td>' + (x.payback_a1 === null ? 'não se paga' : nf(x.payback_a1, 1)) + '</td><td>' +
        (x.payback_a2 === null ? 'não se paga' : nf(x.payback_a2, 1)) + '</td><td>' +
        (x.payback_a3 === null ? 'não se paga' : nf(x.payback_a3, 1)) + '</td><td>' + nf(x.economia_rs_mes_a2, 2) + '</td></tr>';
    });
    c.innerHTML = h2 + '</tbody>';
  })();

  /* ---------- definições dos indicadores ---------- */
  (function () {
    var d = document.getElementById('defs');
    var itens = [
      ['Consumo de energia (kWh)', 'E = P × t / 1000, com P em watts e t em horas. A carga é a soma de ' + dim.pontos_total + ' pontos, ' + nf(dim.horas_noite, 0) + ' h por noite, ' + nf(dim.dias_ano, 0) + ' dias por ano. Mês = ano / 12.'],
      ['Compra líquida da rede (kWh/mês)', 'Carga menos a geração fotovoltaica aproveitada. Em A3 é zero, porque cada ponto tem painel e bateria próprios.'],
      ['Economia de energia da rede (%)', '1 menos a compra líquida da alternativa dividida pelo consumo da situação atual (A0).'],
      ['Redução estimada de custos (R$/mês)', '(Energia + manutenção de A0) menos (energia + manutenção da alternativa). Tarifa B4a da Enel SP: ' + brl(dim.tarifa_rs_kwh, 5) + ' por kWh (TUSD + TE; tributos e bandeira fora da premissa-base). Em A3 a manutenção inclui a reserva para trocar a bateria.'],
      ['Participação de energia renovável (%)', 'Geração solar própria aproveitada dividida pela carga. É uma conta de compensação: em A2 a rede continua fisicamente ligada.'],
      ['Emissões evitadas (kg CO₂/ano)', '(Compra da rede de A0 menos a da alternativa) × ' + nf(dim.fator_emissao_kg_kwh * 1000, 1) + ' kg CO₂/MWh (fator médio do SIN em 2025, MCTI). A versão líquida desconta ' + nf(efFV, 1) + ' g CO₂e por kWh solar (ciclo de vida do FV).'],
      ['Tempo de funcionamento eficiente (h/dia)', 'Horas por noite em que a luminária opera em modo economia (nível base de 30% com reforço quando há presença).'],
      ['Payback simples (anos)', 'Investimento dividido pela redução anual de custos, sem desconto e sem inflação. “Não se paga” quando a redução é negativa ou o prazo passa de 50 anos.']
    ];
    d.innerHTML = itens.map(function (i) { return '<dt>' + esc(i[0]) + '</dt><dd>' + esc(i[1]) + '</dd>'; }).join('');
  })();

  /* ---------- premissas e fontes ---------- */
  (function () {
    var t = document.getElementById('tab-premissas');
    var selo = { 'dado confirmado': ['confirmado', 'confirmado'], 'dado parcial': ['parcial', 'parcial'], 'premissa': ['premissa', 'premissa'] };
    var h = '<thead><tr><th>Item</th><th>Valor</th><th>Faixa</th><th>Tipo</th><th>Fonte</th><th>Justificativa</th></tr></thead><tbody>';
    R.premissas.forEach(function (p) {
      var s = selo[p.tipo];
      var fonte = esc(p.fonte);
      if (p.url) fonte = '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + fonte + '</a>';
      if (p.data_acesso) fonte += ' (acesso em ' + esc(p.data_acesso.split('-').reverse().join('/')) + ')';
      var faixa = p.minimo === p.maximo ? '-' : nf(Number(p.minimo), 3).replace(/,?0+$/, '') + ' a ' + nf(Number(p.maximo), 3).replace(/,?0+$/, '');
      h += '<tr><td>' + esc(p.descricao) + (p.usado_no_calculo === 'nao' ? ' <em>(contexto, fora do cálculo)</em>' : '') + '</td><td>' +
        esc(String(p.valor).replace('.', ',')) + ' ' + esc(p.unidade) + '</td><td>' + faixa + '</td><td><span class="selo ' + s[0] + '">' + s[1] +
        '</span></td><td>' + fonte + '</td><td>' + esc(p.justificativa) + '</td></tr>';
    });
    t.innerHTML = h + '</tbody>';
  })();

  /* ---------- nota ambiental ---------- */
  (function () {
    var a2 = porId.A2, a3 = porId.A3;
    var fe = prem('fe_sin');
    document.getElementById('nota-ambiental').textContent =
      'O fator médio de emissão do SIN em 2025 foi de ' + nf(dim.fator_emissao_kg_kwh * 1000, 1) + ' kg CO₂/MWh. Na série oficial do MCTI ele já foi de ' +
      nf(Number(fe.minimo) * 1000, 1) + ' kg CO₂/MWh (2023) e de ' + nf(Number(fe.maximo) * 1000, 1) + ' kg CO₂/MWh (2014), então o resultado depende do ano e da hidrologia. ' +
      'Com um fator baixo, os ganhos em CO₂ são de centenas de quilos por ano, não de toneladas, e a fabricação dos módulos solares (' + nf(efFV, 1) + ' g CO₂e/kWh) consome parte do ganho: ' +
      'em A2 as emissões evitadas caem de ' + nf(a2.emissoes_evitadas_kg_ano) + ' para ' + nf(a2.emissoes_evitadas_liquidas_kg_ano) + ' kg por ano. ' +
      'A pegada da bateria de A3 não foi quantificada e reduziria ainda mais o valor de ' + nf(a3.emissoes_evitadas_liquidas_kg_ano) + ' kg. ' +
      'Outro benefício ambiental é retirar ' + nf(porId.A1.mercurio_retirado_mg, 0) + ' mg de mercúrio das lâmpadas de sódio do caso-modelo.';
  })();

  /* ---------- gráficos ---------- */
  if (typeof Chart === 'undefined') {
    mostrarErro('Não foi possível carregar a biblioteca Chart.js (CDN). Os indicadores e as tabelas continuam disponíveis; os gráficos precisam de internet.');
    return;
  }

  Chart.defaults.font.family = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#374151';

  var nomes = alts.map(function (a) { return a.nome; });
  var cores = alts.map(function (a) { return COR[a.id]; });

  function eixoY(titulo, extra) {
    return Object.assign({ beginAtZero: true, title: { display: true, text: titulo }, ticks: { callback: function (v) { return nf(v, 0); } } }, extra || {});
  }
  function tooltipNum(casas) {
    return { callbacks: { label: function (c) { return c.dataset.label + ': ' + nf(c.parsed.y, casas === undefined ? 1 : casas); } } };
  }
  function graf(id, config) {
    try { return new Chart(document.getElementById(id), config); }
    catch (e) { mostrarErro('Falha ao desenhar o gráfico ' + id + ': ' + e.message); return null; }
  }
  var legenda = { position: 'bottom', labels: { boxWidth: 12 } };

  graf('g-consumo', {
    type: 'bar',
    data: {
      labels: nomes,
      datasets: [
        { label: 'Carga das luminárias', data: alts.map(function (a) { return a.carga_kwh_mes; }), backgroundColor: cores },
        { label: 'Compra líquida da rede', data: alts.map(function (a) { return a.rede_kwh_mes; }), backgroundColor: cores.map(function (c) { return c + '66'; }), borderColor: cores, borderWidth: 2 }
      ]
    },
    options: { maintainAspectRatio: false, scales: { y: eixoY('kWh/mês') }, plugins: { legend: legenda, tooltip: tooltipNum(1) } }
  });

  var origem = [
    ['Compra da rede', 'rede', '#64748b'],
    ['Economia pelo LED (eficiência)', 'eficiencia_led', '#2563eb'],
    ['Economia pela dimerização', 'dimerizacao', '#8b5cf6'],
    ['Substituída por energia solar', 'renovavel', '#16a34a']
  ];
  graf('g-origem', {
    type: 'bar',
    data: {
      labels: nomes,
      datasets: origem.map(function (o) {
        return { label: o[0], data: alts.map(function (a) { return a.decomposicao_kwh_mes[o[1]]; }), backgroundColor: o[2], stack: 'e' };
      })
    },
    options: { maintainAspectRatio: false, scales: { x: { stacked: true }, y: eixoY('kWh/mês', { stacked: true }) }, plugins: { legend: legenda, tooltip: tooltipNum(1) } }
  });

  graf('g-custo', {
    type: 'bar',
    data: {
      labels: nomes,
      datasets: [
        { label: 'Energia da rede', data: alts.map(function (a) { return a.custo_energia_rs_mes; }), backgroundColor: '#475569', stack: 'c' },
        { label: 'Manutenção', data: alts.map(function (a) { return a.custo_om_rs_mes; }), backgroundColor: '#94a3b8', stack: 'c' }
      ]
    },
    options: { maintainAspectRatio: false, scales: { x: { stacked: true }, y: eixoY('R$/mês', { stacked: true }) }, plugins: { legend: legenda, tooltip: tooltipNum(2) } }
  });

  var corComp = {
    'Luminárias LED': '#2563eb', 'Instalação': '#64748b', 'Sensores e dimerização': '#8b5cf6', 'Sistema fotovoltaico': '#16a34a',
    'Painéis FV': '#22c55e', 'Baterias': '#d97706', 'Controlador e cabos': '#f59e0b', 'Adaptação do poste': '#a16207'
  };
  var componentes = [];
  alts.forEach(function (a) {
    Object.keys(a.capex_detalhe_rs).forEach(function (k) { if (componentes.indexOf(k) < 0) componentes.push(k); });
  });
  graf('g-capex', {
    type: 'bar',
    data: {
      labels: nomes,
      datasets: componentes.map(function (k) {
        return { label: k, data: alts.map(function (a) { return a.capex_detalhe_rs[k] || 0; }), backgroundColor: corComp[k] || '#999', stack: 'i' };
      })
    },
    options: { maintainAspectRatio: false, scales: { x: { stacked: true }, y: eixoY('R$', { stacked: true }) }, plugins: { legend: legenda, tooltip: tooltipNum(0) } }
  });

  var anosEixo = [];
  for (var i = 0; i <= 15; i++) anosEixo.push(i);
  graf('g-payback', {
    type: 'line',
    data: {
      labels: anosEixo,
      datasets: alts.filter(function (a) { return a.id !== 'A0'; }).map(function (a) {
        return {
          label: a.nome, borderColor: COR[a.id], backgroundColor: COR[a.id], pointRadius: 2, tension: 0,
          data: anosEixo.map(function (t) { return a.economia_rs_ano * t - a.capex_rs; })
        };
      })
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { title: { display: true, text: 'anos após a instalação' } }, y: { title: { display: true, text: 'R$ acumulados' }, ticks: { callback: function (v) { return nf(v, 0); } } } },
      plugins: { legend: legenda, tooltip: tooltipNum(0) }
    }
  });

  graf('g-emissoes', {
    type: 'bar',
    data: {
      labels: nomes,
      datasets: [
        { label: 'Evitadas na operação', data: alts.map(function (a) { return a.emissoes_evitadas_kg_ano; }), backgroundColor: cores },
        { label: 'Líquidas do ciclo de vida do FV', data: alts.map(function (a) { return a.emissoes_evitadas_liquidas_kg_ano; }), backgroundColor: cores.map(function (c) { return c + '66'; }), borderColor: cores, borderWidth: 2 }
      ]
    },
    options: { maintainAspectRatio: false, scales: { y: eixoY('kg CO₂ ou CO₂e por ano') }, plugins: { legend: legenda, tooltip: tooltipNum(1) } }
  });

  var m = R.mensal;
  graf('g-mensal', {
    data: {
      labels: m.meses,
      datasets: [
        { type: 'bar', label: 'Geração do FV (A2)', data: m.geracao_a2_kwh, backgroundColor: '#16a34a' },
        { type: 'line', label: 'Consumo da carga (A2)', data: m.carga_a2_kwh, borderColor: '#111827', backgroundColor: '#111827', pointRadius: 3, tension: 0 }
      ]
    },
    options: { maintainAspectRatio: false, scales: { y: eixoY('kWh/mês') }, plugins: { legend: legenda, tooltip: tooltipNum(1) } }
  });
})();
