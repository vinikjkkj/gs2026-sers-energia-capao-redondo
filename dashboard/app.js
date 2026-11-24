// Dashboard de energia (SERS). Aluno: Vinícius Alves de Souza, RM 575576.
// Lê window.RESULTADOS (data/resultados.js, gerado por src/calcular.py); aqui só se formata e se desenha.
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

  // paleta Okabe-Ito: A0 < A1 < A2 < A3 em luminosidade; as mesmas cores estão em style.css
  var COR = { A0: '#475569', A1: '#0072B2', A2: '#009E73', A3: '#E69F00' };
  var COR_FORTE = { A0: '#334155', A1: '#00598a', A2: '#00725a', A3: '#8a5a00' };
  var FONTE_TEXTO = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

  function icone(caminhos) {
    return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + caminhos + '</svg>';
  }
  var ICONES = {
    energia: icone('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>'),
    economia: icone('<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>'),
    custo: icone('<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11"/><path d="M15 9.2c-.4-1-1.4-1.6-3-1.6-1.8 0-3 .9-3 2.1 0 3 6 1.5 6 4.4 0 1.2-1.2 2.1-3 2.1-1.6 0-2.7-.7-3.1-1.8"/>'),
    renovavel: icone('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    co2: icone('<path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 9.2 4.5 4.5 0 0 0 7 18z"/>'),
    tempo: icone('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    investimento: icone('<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14.5" r="1"/>'),
    payback: icone('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>')
  };
  var alts = R.alternativas;
  var porId = {};
  alts.forEach(function (a) { porId[a.id] = a; });
  var base = porId.A0;
  var dim = R.dimensionamento;

  // formatação
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

  // indicadores (KPIs)
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
      { i: 'energia', r: 'Consumo de energia da rede', v: nf(a.rede_kwh_mes), u: 'kWh/mês',
        d: 'Situação atual: ' + nf(base.rede_kwh_mes) + ' kWh/mês. Carga das luminárias: ' + nf(a.carga_kwh_mes) + ' kWh/mês.' },
      { i: 'economia', r: 'Economia de energia da rede', v: nf(a.economia_rede_pct), u: '%',
        d: nf(a.economia_rede_kwh_mes) + ' kWh/mês a menos que a situação atual.' },
      { i: 'custo', r: 'Redução estimada de custos', v: (economiaMes < 0 ? '−' : '') + brl(Math.abs(economiaMes)), u: '/mês',
        d: 'Custo de operação: ' + brl(a.custo_operacao_rs_mes) + ' contra ' + brl(base.custo_operacao_rs_mes) + ' hoje' +
           (economiaMes < 0 ? ' (fica mais caro).' : '.') },
      { i: 'renovavel', r: 'Participação de energia renovável', v: nf(a.participacao_renovavel_pct), u: '%',
        d: 'Parte da carga atendida por geração solar própria (' + nf(a.renovavel_kwh_mes) + ' kWh/mês).' },
      { i: 'co2', r: 'Emissões evitadas estimadas', v: nf(a.emissoes_evitadas_kg_ano), u: 'kg CO₂/ano',
        d: 'Líquidas do ciclo de vida do FV: ' + nf(a.emissoes_evitadas_liquidas_kg_ano) + ' kg CO₂e/ano.' },
      { i: 'tempo', r: 'Tempo de funcionamento eficiente', v: nf(a.horas_modo_economia_dia), u: 'h/dia',
        d: 'Horas por noite em modo economia (dimerizado), de ' + nf(dim.horas_noite, 0) + ' h de funcionamento.' },
      { i: 'investimento', r: 'Investimento inicial', v: brl(a.capex_rs, 0), u: '',
        d: dim.pontos_total + ' pontos de luz (' + dim.pontos_praca + ' na praça e ' + dim.pontos_onibus + ' em pontos de ônibus).' },
      { i: 'payback', r: 'Payback simples', v: a.payback_anos === null ? 'não se paga' : nf(a.payback_anos), u: a.payback_anos === null ? '' : 'anos',
        d: faixaPayback(a.id) + ' (cenários combinados).' }
    ];
    kpis.innerHTML = '';
    lista.forEach(function (k) {
      var c = el('div', { 'class': 'kpi' });
      c.style.setProperty('--cor', cor);
      c.style.setProperty('--cor-suave', cor + '24');
      c.style.setProperty('--cor-forte', COR_FORTE[a.id]);
      c.innerHTML = '<div class="kpi-topo"><span class="kpi-icone">' + ICONES[k.i] + '</span><span class="rotulo">' + esc(k.r) + '</span></div>' +
        '<div class="valor">' + esc(k.v) + (k.u ? '<span class="unidade">' + esc(k.u) + '</span>' : '') + '</div>' +
        '<div class="detalhe">' + esc(k.d) + '</div>';
      kpis.appendChild(c);
    });
    descricao.textContent = a.nome_completo + '. ' + a.descricao;
    Array.prototype.forEach.call(seletor.children, function (b) {
      var ativo = b.getAttribute('data-id') === escolhida;
      b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      b.tabIndex = ativo ? 0 : -1;
    });
  }

  alts.filter(function (a) { return a.id !== 'A0'; }).forEach(function (a) {
    var b = el('button', { type: 'button', 'data-id': a.id, 'aria-pressed': 'false' },
      '<span class="seg-ponto" style="background:' + COR[a.id] + '"></span><span class="seg-nome">' + esc(a.nome) + '</span>' +
      (a.renovavel ? '<span class="seg-selo">renovável</span>' : ''));
    b.addEventListener('click', function () { escolhida = a.id; desenharKpis(); });
    b.addEventListener('keydown', function (ev) {
      var passo = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
      if (!passo) return;
      var irmaos = Array.prototype.slice.call(seletor.children);
      var destino = irmaos[(irmaos.indexOf(b) + passo + irmaos.length) % irmaos.length];
      destino.click();
      destino.focus();
      ev.preventDefault();
    });
    seletor.appendChild(b);
  });
  desenharKpis();

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
    var t = document.getElementById('tabela-comparativa');
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

  (function () {
    var c = document.getElementById('cartoes-qualitativo');
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


  // gráficos (Chart.js)
  if (typeof Chart === 'undefined') {
    mostrarErro('Não foi possível carregar a biblioteca Chart.js (CDN). Os indicadores e as tabelas continuam disponíveis; os gráficos precisam de internet.');
    return;
  }

  // espera as fontes carregarem (no máximo 2 s) para o canvas usar a mesma família do resto da página
  var fontesProntas = document.fonts && document.fonts.ready
    ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 2000); })])
    : Promise.resolve();
  fontesProntas.then(desenharGraficos);

  function desenharGraficos() {
    Chart.defaults.font.family = FONTE_TEXTO;
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#334155';
    Chart.defaults.borderColor = 'rgba(15, 23, 42, 0.08)';
    Chart.defaults.animation.duration = 600;

    // rótulos em várias linhas ("A2", "LED + FV", "na rede") para não girar o texto
    function quebrar(nome) {
      var palavras = nome.split(' ');
      var linhas = [palavras.shift()];
      var atual = '';
      palavras.forEach(function (p) {
        if (atual && (atual + ' ' + p).length > 9) { linhas.push(atual); atual = p; }
        else { atual = atual ? atual + ' ' + p : p; }
      });
      if (atual) linhas.push(atual);
      return linhas;
    }
    var estreito = window.innerWidth < 640;
    var rotulos = alts.map(function (a) { return estreito ? a.nome : quebrar(a.nome); });
    var cores = alts.map(function (a) { return COR[a.id]; });
    var suaves = cores.map(function (c) { return c + '66'; });

    function eixoY(titulo, extra) {
      return Object.assign({
        beginAtZero: true,
        border: { display: false },
        title: { display: true, text: titulo, font: { weight: '500' } },
        ticks: { callback: function (v) { return nf(v, 0); } }
      }, extra || {});
    }
    var eixoX = { grid: { display: false }, ticks: { maxRotation: estreito ? 50 : 0, minRotation: estreito ? 50 : 0, autoSkip: false, font: { size: estreito ? 12 : 14 } } };

    function dica(formatar, titulo) {
      return {
        backgroundColor: '#0f172a', titleColor: '#ffffff', bodyColor: '#e2e8f0',
        padding: 12, cornerRadius: 10, boxPadding: 4, usePointStyle: true,
        titleFont: { weight: '600', size: 14 }, bodyFont: { size: 14 },
        callbacks: {
          title: titulo || function (itens) { return alts[itens[0].dataIndex].nome; },
          label: function (c) { return ' ' + c.dataset.label + ': ' + formatar(c.parsed.y); }
        }
      };
    }
    var legenda = {
      position: 'bottom',
      labels: { usePointStyle: true, pointStyle: 'rectRounded', boxWidth: 10, boxHeight: 10, padding: 14, font: { size: 14 } }
    };
    function opcoes(extra) {
      return Object.assign({ maintainAspectRatio: false, interaction: { mode: 'index', intersect: false } }, extra);
    }
    function graf(id, config) {
      try { return new Chart(document.getElementById(id), config); }
      catch (e) { mostrarErro('Falha ao desenhar o gráfico ' + id + ': ' + e.message); return null; }
    }

    var kwhMes = function (v) { return nf(v, 1) + ' kWh/mês'; };
    var rsMes = function (v) { return brl(v, 2) + '/mês'; };
    var rs0 = function (v) { return brl(v, 0); };
    var kgAno = function (v) { return nf(v, 1) + ' kg CO₂/ano'; };

    graf('g-consumo', {
      type: 'bar',
      data: {
        labels: rotulos,
        datasets: [
          { label: 'Carga das luminárias', data: alts.map(function (a) { return a.carga_kwh_mes; }), backgroundColor: cores, borderRadius: 6 },
          { label: 'Compra líquida da rede', data: alts.map(function (a) { return a.rede_kwh_mes; }), backgroundColor: suaves, borderColor: cores, borderWidth: 2, borderRadius: 6 }
        ]
      },
      options: opcoes({ scales: { x: eixoX, y: eixoY('kWh/mês') }, plugins: { legend: legenda, tooltip: dica(kwhMes) } })
    });

    var origem = [
      ['Compra da rede', 'rede', '#64748b'],
      ['Economia pelo LED (eficiência)', 'eficiencia_led', '#56B4E9'],
      ['Economia pela dimerização', 'dimerizacao', '#CC79A7'],
      ['Substituída por energia solar', 'renovavel', '#D55E00']
    ];
    graf('g-origem', {
      type: 'bar',
      data: {
        labels: rotulos,
        datasets: origem.map(function (o) {
          return { label: o[0], data: alts.map(function (a) { return a.decomposicao_kwh_mes[o[1]]; }), backgroundColor: o[2], borderColor: '#ffffff', borderWidth: 1, stack: 'e' };
        })
      },
      options: opcoes({ scales: { x: Object.assign({ stacked: true }, eixoX), y: eixoY('kWh/mês', { stacked: true }) }, plugins: { legend: legenda, tooltip: dica(kwhMes) } })
    });

    graf('g-custo', {
      type: 'bar',
      data: {
        labels: rotulos,
        datasets: [
          { label: 'Energia da rede', data: alts.map(function (a) { return a.custo_energia_rs_mes; }), backgroundColor: '#334155', borderColor: '#ffffff', borderWidth: 1, stack: 'c' },
          { label: 'Manutenção', data: alts.map(function (a) { return a.custo_om_rs_mes; }), backgroundColor: '#94a3b8', borderColor: '#ffffff', borderWidth: 1, stack: 'c' }
        ]
      },
      options: opcoes({ scales: { x: Object.assign({ stacked: true }, eixoX), y: eixoY('R$/mês', { stacked: true }) }, plugins: { legend: legenda, tooltip: dica(rsMes) } })
    });

    var corComp = {
      'Luminárias LED': '#0072B2', 'Instalação': '#94a3b8', 'Sensores e dimerização': '#CC79A7', 'Sistema fotovoltaico': '#009E73',
      'Painéis FV': '#66c2a5', 'Baterias': '#E69F00', 'Controlador e cabos': '#A67C00', 'Adaptação do poste': '#8C510A'
    };
    var componentes = [];
    alts.forEach(function (a) {
      Object.keys(a.capex_detalhe_rs).forEach(function (k) { if (componentes.indexOf(k) < 0) componentes.push(k); });
    });
    graf('g-capex', {
      type: 'bar',
      data: {
        labels: rotulos,
        datasets: componentes.map(function (k) {
          return { label: k, data: alts.map(function (a) { return a.capex_detalhe_rs[k] || 0; }), backgroundColor: corComp[k] || '#999999', borderColor: '#ffffff', borderWidth: 1, stack: 'i' };
        })
      },
      options: opcoes({ scales: { x: Object.assign({ stacked: true }, eixoX), y: eixoY('R$', { stacked: true }) }, plugins: { legend: legenda, tooltip: dica(rs0) } })
    });

    // saldo acumulado = economia anual x anos - investimento (payback simples, sem desconto)
    var anosEixo = [];
    for (var i = 0; i <= 15; i++) anosEixo.push(i);
    var formas = { A1: 'circle', A2: 'rectRot', A3: 'triangle' };
    graf('g-payback', {
      type: 'line',
      data: {
        labels: anosEixo,
        datasets: alts.filter(function (a) { return a.id !== 'A0'; }).map(function (a) {
          return {
            label: a.nome, borderColor: COR[a.id], backgroundColor: COR[a.id], borderWidth: 3, pointStyle: formas[a.id], pointRadius: 4, pointHoverRadius: 6, tension: 0,
            data: anosEixo.map(function (t) { return a.economia_rs_ano * t - a.capex_rs; })
          };
        })
      },
      options: opcoes({
        scales: {
          x: { grid: { display: false }, title: { display: true, text: 'anos após a instalação', font: { weight: '500' } } },
          y: eixoY('R$ acumulados', { beginAtZero: false })
        },
        plugins: {
          legend: legenda,
          tooltip: dica(rs0, function (itens) {
            var n = Number(itens[0].label);
            return n === 0 ? 'Na instalação' : 'Após ' + n + (n === 1 ? ' ano' : ' anos');
          })
        }
      })
    });

    graf('g-emissoes', {
      type: 'bar',
      data: {
        labels: rotulos,
        datasets: [
          { label: 'Evitadas na operação', data: alts.map(function (a) { return a.emissoes_evitadas_kg_ano; }), backgroundColor: cores, borderRadius: 6 },
          { label: 'Líquidas do ciclo de vida do FV', data: alts.map(function (a) { return a.emissoes_evitadas_liquidas_kg_ano; }), backgroundColor: suaves, borderColor: cores, borderWidth: 2, borderRadius: 6 }
        ]
      },
      options: opcoes({ scales: { x: eixoX, y: eixoY('kg CO₂ ou CO₂e por ano') }, plugins: { legend: legenda, tooltip: dica(kgAno) } })
    });

    var m = R.mensal;
    graf('g-mensal', {
      data: {
        labels: m.meses,
        datasets: [
          { type: 'bar', label: 'Geração do FV (A2)', data: m.geracao_a2_kwh, backgroundColor: COR.A2, borderRadius: 6 },
          { type: 'line', label: 'Consumo da carga (A2)', data: m.carga_a2_kwh, borderColor: '#0f172a', backgroundColor: '#0f172a', borderWidth: 3, pointRadius: 4, tension: 0 }
        ]
      },
      options: opcoes({
        scales: { x: { grid: { display: false } }, y: eixoY('kWh/mês') },
        plugins: { legend: legenda, tooltip: dica(kwhMes, function (itens) { return itens[0].label; }) }
      })
    });
  }
})();
