import React, { useState, useEffect } from "react";

// ── CREDENCIAIS DE ACESSO ──
const USUARIOS = [
  { usuario: "admin", senha: "grc2026", nome: "Administrador", cliente: "GRC Inspector" },
  { usuario: "basa", senha: "basa2026", nome: "Banco da Amazônia", cliente: "BASA" },
  { usuario: "demo", senha: "demo2026", nome: "Demonstração", cliente: "Cliente Demo" },
];

// ── DADOS GLOBAIS ──
const navItems = [
  "Dashboard Executivo",
  "Centro Operacional",
  "Compliance & GRC",
  "TSCM",
  "DFIR",
  "Inteligência Executiva",
  "GRC 360°",
];

const alertas = [
  { title: "Movimentação suspeita de dados", severity: "CRÍTICO", source: "Endpoint Financeiro" },
  { title: "Acesso privilegiado fora do padrão", severity: "ALTO", source: "VPN Corporativa" },
  { title: "Possível fraude transacional", severity: "MÉDIO", source: "Sistema Antifraude" },
];

const timelineItems = [
  { time: "19:42", event: "Tentativa de acesso privilegiado", color: "#EF4444" },
  { time: "18:15", event: "Correlação antifraude identificada", color: "#F97316" },
  { time: "16:22", event: "Varredura TSCM concluída", color: "#10B981" },
  { time: "14:10", event: "Atualização de regras de correlação", color: "#3B82F6" },
  { time: "11:55", event: "Log de auditoria gerado", color: "#8B5CF6" },
];

const complianceNormas = [
  { title: "LGPD", valor: 96, status: "Conforme", color: "#10B981", ultima: "01/06/2026" },
  { title: "BACEN Res. 4.658", valor: 92, status: "Conforme", color: "#10B981", ultima: "28/05/2026" },
  { title: "CMN 4.557", valor: 78, status: "Monitorado", color: "#F97316", ultima: "25/05/2026" },
  { title: "Marco Civil", valor: 100, status: "Conforme", color: "#10B981", ultima: "01/06/2026" },
  { title: "ISO 27001", valor: 84, status: "Em adequação", color: "#F97316", ultima: "20/05/2026" },
  { title: "COBIT 2019", valor: 88, status: "Conforme", color: "#10B981", ultima: "30/05/2026" },
];

const varredurasTSCM = [
  { local: "Sala do Conselho", data: "30/05/2026", status: "Limpo", tipo: "Eletromagnética + Física" },
  { local: "Diretoria Executiva", data: "28/05/2026", status: "Limpo", tipo: "Radiofrequência" },
  { local: "Sala de Reuniões A", data: "25/05/2026", status: "Alerta", tipo: "Dispositivo detectado" },
  { local: "Auditório Principal", data: "22/05/2026", status: "Limpo", tipo: "Eletromagnética" },
  { local: "Veículo Diretoria", data: "20/05/2026", status: "Limpo", tipo: "Varredura veicular" },
];

const casosDFIR = [
  { id: "DFIR-2026-041", descricao: "Exfiltração de dados cadastrais", gravidade: "CRÍTICO", status: "Em Investigação", data: "01/06/2026", analista: "João M." },
  { id: "DFIR-2026-039", descricao: "Acesso remoto não autorizado", gravidade: "ALTO", status: "Contido", data: "29/05/2026", analista: "Maria S." },
  { id: "DFIR-2026-035", descricao: "Malware em endpoint financeiro", gravidade: "ALTO", status: "Encerrado", data: "25/05/2026", analista: "Carlos R." },
  { id: "DFIR-2026-031", descricao: "Fraude transacional identificada", gravidade: "MÉDIO", status: "Encerrado", data: "20/05/2026", analista: "Ana P." },
];

const inteligenciaAmeacas = [
  { categoria: "Fraude Financeira", nivel: 87, tendencia: "↑", cor: "#EF4444" },
  { categoria: "Phishing Corporativo", nivel: 64, tendencia: "→", cor: "#F97316" },
  { categoria: "Acesso Privilegiado Indevido", nivel: 71, tendencia: "↑", cor: "#EF4444" },
  { categoria: "Vazamento de Dados", nivel: 45, tendencia: "↓", cor: "#10B981" },
  { categoria: "Engenharia Social", nivel: 52, tendencia: "→", cor: "#F97316" },
];

// ── GRC 360° DADOS ──
const colaboradores360 = [
  { nome: "Carlos Mendes", cargo: "Analista Financeiro Sênior", cpf: "***.***.456-78", score: 91, risco: "BAIXO", pendencias: 0, alertas: [] },
  { nome: "Fernanda Lima", cargo: "Gerente de TI", cpf: "***.***.123-90", score: 74, risco: "MÉDIO", pendencias: 2, alertas: ["Alteração cadastral recente", "Acesso fora do horário"] },
  { nome: "Roberto Souza", cargo: "Diretor Comercial", cpf: "***.***.789-01", score: 58, risco: "ALTO", pendencias: 4, alertas: ["Processo judicial em curso", "Exposição em lista restritiva", "Mudança de endereço 3x/48h"] },
];

const terceiros360 = [
  { nome: "TechSupply Ltda.", tipo: "Fornecedor TI", cnpj: "12.345.678/0001-99", score: 92, risco: "BAIXO", pendencias: 0, alertas: [] },
  { nome: "Consult Partners S.A.", tipo: "Consultoria", cnpj: "98.765.432/0001-11", score: 61, risco: "MÉDIO", pendencias: 3, alertas: ["Sócio com restrição SERASA", "Processo trabalhista ativo"] },
  { nome: "DataHub Brasil", tipo: "Integração de Dados", cnpj: "45.123.678/0001-55", score: 34, risco: "ALTO", pendencias: 7, alertas: ["CNPJ irregular", "Sócios em lista PEP", "Dívida ativa federal"] },
  { nome: "SecureNet Corp", tipo: "Segurança TI", cnpj: "77.888.999/0001-22", score: 95, risco: "BAIXO", pendencias: 0, alertas: [] },
];

const fornecedores360 = [
  { nome: "Infratech Serviços", tipo: "Infraestrutura", cnpj: "33.444.555/0001-66", score: 88, risco: "BAIXO", pendencias: 0, alertas: [] },
  { nome: "Limpeza Total Ltda.", tipo: "Facilities", cnpj: "11.222.333/0001-44", score: 67, risco: "MÉDIO", pendencias: 1, alertas: ["Certidão vencida"] },
  { nome: "Print Express S.A.", tipo: "Impressão/Documentos", cnpj: "55.666.777/0001-88", score: 42, risco: "ALTO", pendencias: 5, alertas: ["Irregularidade fiscal", "Processo administrativo", "Sócio com restrição"] },
];

// ── HELPERS ──
function getSeverityStyle(s: string) {
  if (s === "CRÍTICO") return { bg: "#EF444422", color: "#EF4444" };
  if (s === "ALTO") return { bg: "#F9731622", color: "#F97316" };
  if (s === "MÉDIO") return { bg: "#EAB30822", color: "#EAB308" };
  return { bg: "#10B98122", color: "#10B981" };
}

function getRiscoStyle(r: string) {
  if (r === "ALTO") return { bg: "#EF444422", color: "#EF4444" };
  if (r === "MÉDIO") return { bg: "#F9731622", color: "#F97316" };
  return { bg: "#10B98122", color: "#10B981" };
}

// ── COMPONENTE: TICKER ANIMADO ──
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(interval); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(interval);
  }, [target]);
  return <span>{value.toLocaleString("pt-BR")}{suffix}</span>;
}

// ── COMPONENTE: MINI GRÁFICO DE LINHA SVG ──
function LineChart({ data, color }: { data: number[]; color: string }) {
  const w = 300, h = 80;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 10) - 5;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / (max - min || 1)) * (h - 10) - 5;
        return <circle key={i} cx={x} cy={y} r="4" fill={color} />;
      })}
    </svg>
  );
}

// ── COMPONENTE: BARRA DE PROGRESSO ──
function ProgressBar({ valor, color }: { valor: number; color: string }) {
  return (
    <div style={{ background: "#1E293B", borderRadius: "999px", height: "8px", width: "100%" }}>
      <div style={{ width: `${valor}%`, background: color, height: "8px", borderRadius: "999px", transition: "width 1s ease" }} />
    </div>
  );
}

// ── COMPONENTE: BOTÃO PDF ──
function BotaoPDF({ titulo, conteudo }: { titulo: string; conteudo: string }) {
  const [gerando, setGerando] = useState(false);

  const gerarPDF = () => {
    setGerando(true);
    setTimeout(() => {
      const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>${titulo}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #1e293b; }
    .header { border-bottom: 3px solid #10B981; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
    .logo-area { }
    .logo-title { font-size: 24px; font-weight: bold; color: #020617; }
    .logo-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
    .badge { background: #10B98122; color: #059669; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: bold; border: 1px solid #10B981; }
    h1 { font-size: 22px; color: #020617; margin: 0 0 6px; }
    h2 { font-size: 16px; color: #334155; border-left: 4px solid #10B981; padding-left: 12px; margin: 28px 0 14px; }
    .meta { font-size: 12px; color: #94a3b8; margin-bottom: 30px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 20px 0; }
    .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
    .kpi-label { font-size: 11px; color: #94a3b8; margin-bottom: 6px; }
    .kpi-value { font-size: 22px; font-weight: bold; color: #0f172a; }
    .alerta { background: #fff8f8; border: 1px solid #fecaca; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alerta-critico { border-color: #ef4444; }
    .alerta-alto { border-color: #f97316; background: #fff7ed; }
    .badge-critico { background: #fee2e2; color: #ef4444; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    .badge-alto { background: #ffedd5; color: #f97316; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    .badge-medio { background: #fefce8; color: #ca8a04; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    .compliance { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
    .conforme { color: #10b981; font-weight: bold; }
    .monitorado { color: #f97316; font-weight: bold; }
    .footer { margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; }
    .destaque { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin: 16px 0; }
    .destaque-title { font-weight: bold; color: #065f46; font-size: 13px; margin-bottom: 8px; }
    .destaque-item { font-size: 12px; color: #374151; margin-bottom: 4px; padding-left: 12px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; font-size: 12px; color: #64748b; text-align: left; }
    td { border: 1px solid #e2e8f0; padding: 10px 12px; font-size: 13px; }
    tr:nth-child(even) td { background: #f8fafc; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-area">
      <div class="logo-title">GRC Inspector — Intelligence Platform</div>
      <div class="logo-sub">Centro Integrado de Inteligência, Compliance e Proteção Institucional</div>
    </div>
    <div class="badge">● Operacional 24x7</div>
  </div>

  <h1>${titulo}</h1>
  <div class="meta">Gerado em: ${new Date().toLocaleString("pt-BR")} &nbsp;|&nbsp; GRC Inspector © 2026 &nbsp;|&nbsp; Documento Confidencial</div>

  <div class="kpi-grid">
    <div class="kpi"><div class="kpi-label">Ativos Monitorados</div><div class="kpi-value">3.428</div></div>
    <div class="kpi"><div class="kpi-label">Alertas Críticos</div><div class="kpi-value" style="color:#ef4444">18</div></div>
    <div class="kpi"><div class="kpi-label">Compliance BACEN</div><div class="kpi-value" style="color:#10b981">92%</div></div>
    <div class="kpi"><div class="kpi-label">Disponibilidade</div><div class="kpi-value" style="color:#10b981">99.2%</div></div>
    <div class="kpi"><div class="kpi-label">Score Maturidade GRC</div><div class="kpi-value" style="color:#10b981">84/100</div></div>
    <div class="kpi"><div class="kpi-label">Status Operacional</div><div class="kpi-value" style="color:#10b981;font-size:16px">Operacional 24x7</div></div>
  </div>

  <div class="destaque">
    <div class="destaque-title">⚠ Destaques de Monitoramento — Últimas 48h</div>
    <div class="destaque-item">• 3.428 ativos e processos monitorados em tempo real</div>
    <div class="destaque-item">• 27 transações financeiras suspeitas identificadas (contas abertas há menos de 24h)</div>
    <div class="destaque-item">• 3 alterações de endereço do mesmo correntista nas últimas 48 horas — risco elevado de fraude cadastral</div>
  </div>

  <h2>Alertas Estratégicos</h2>
  <div class="alerta alerta-critico"><span>Movimentação suspeita de dados — Fonte: Endpoint Financeiro</span><span class="badge-critico">CRÍTICO</span></div>
  <div class="alerta alerta-alto"><span>Acesso privilegiado fora do padrão — Fonte: VPN Corporativa</span><span class="badge-alto">ALTO</span></div>
  <div class="alerta"><span>Possível fraude transacional — Fonte: Sistema Antifraude</span><span class="badge-medio">MÉDIO</span></div>

  <h2>Conformidade Regulatória</h2>
  <table>
    <tr><th>Normativo</th><th>Aderência</th><th>Status</th><th>Última Auditoria</th></tr>
    <tr><td>LGPD</td><td>96%</td><td class="conforme">Conforme</td><td>01/06/2026</td></tr>
    <tr><td>BACEN Res. 4.658</td><td>92%</td><td class="conforme">Conforme</td><td>28/05/2026</td></tr>
    <tr><td>CMN 4.557</td><td>78%</td><td class="monitorado">Monitorado</td><td>25/05/2026</td></tr>
    <tr><td>Marco Civil</td><td>100%</td><td class="conforme">Conforme</td><td>01/06/2026</td></tr>
    <tr><td>ISO 27001</td><td>84%</td><td class="monitorado">Em adequação</td><td>20/05/2026</td></tr>
    <tr><td>COBIT 2019</td><td>88%</td><td class="conforme">Conforme</td><td>30/05/2026</td></tr>
  </table>

  <h2>Timeline Operacional — Últimos Eventos</h2>
  <table>
    <tr><th>Hora</th><th>Evento</th></tr>
    <tr><td>19:42</td><td>Tentativa de acesso privilegiado</td></tr>
    <tr><td>18:15</td><td>Correlação antifraude identificada</td></tr>
    <tr><td>16:22</td><td>Varredura TSCM concluída</td></tr>
    <tr><td>14:10</td><td>Atualização de regras de correlação</td></tr>
    <tr><td>11:55</td><td>Log de auditoria gerado</td></tr>
  </table>

  <div class="footer">
    <span>GRC Inspector © 2026 — Intelligence Platform</span>
    <span>Documento Confidencial — Uso Interno</span>
    <span>Gerado automaticamente pela plataforma</span>
  </div>
</body>
</html>`;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `GRC-Inspector-Relatorio-${new Date().toISOString().slice(0,10)}.html`;
      a.click();
      URL.revokeObjectURL(url);
      setGerando(false);
    }, 1200);
  };

  return (
    <button
      onClick={gerarPDF}
      disabled={gerando}
      style={{ padding: "12px 24px", borderRadius: "12px", border: "1px solid #10B981", background: gerando ? "#10B98133" : "#10B98122", color: "#10B981", fontWeight: "bold", fontSize: "14px", cursor: gerando ? "not-allowed" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "8px" }}
    >
      {gerando ? "⏳ Gerando..." : "⬇ Baixar Relatório"}
    </button>
  );
}

// ── TELA: LOGIN ──
function TelaLogin({ onLogin }: { onLogin: (nome: string, cliente: string) => void }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = () => {
    setErro("");
    setCarregando(true);
    setTimeout(() => {
      const encontrado = USUARIOS.find(u => u.usuario === usuario && u.senha === senha);
      if (encontrado) {
        onLogin(encontrado.nome, encontrado.cliente);
      } else {
        setErro("Usuário ou senha incorretos.");
        setCarregando(false);
      }
    }, 800);
  };

  return (
    <div style={{ background: "#020617", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 20px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img src="/logo-grc.png" alt="GRC Solutions" style={{ width: "220px", maxWidth: "100%", filter: "drop-shadow(0 0 16px rgba(16,185,129,0.4))" }} />
          <div style={{ marginTop: "10px", color: "#94A3B8", fontSize: "14px" }}>Intelligence Platform</div>
        </div>

        {/* Card de login */}
        <div style={{ background: "#0F172A", borderRadius: "24px", border: "1px solid #1E293B", padding: "36px" }}>
          <h2 style={{ color: "white", fontSize: "22px", margin: "0 0 6px", textAlign: "center" }}>Acesso Seguro</h2>
          <p style={{ color: "#64748B", fontSize: "13px", textAlign: "center", margin: "0 0 28px" }}>Centro Integrado de Monitoramento e Inteligência</p>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#94A3B8", fontSize: "13px", display: "block", marginBottom: "8px" }}>Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Digite seu usuário"
              style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ color: "#94A3B8", fontSize: "13px", display: "block", marginBottom: "8px" }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Digite sua senha"
              style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {erro && (
            <div style={{ background: "#EF444422", border: "1px solid #EF4444", borderRadius: "10px", padding: "10px 14px", color: "#EF4444", fontSize: "13px", marginBottom: "16px" }}>
              {erro}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={carregando || !usuario || !senha}
            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: carregando || !usuario || !senha ? "#1E293B" : "#10B981", color: carregando || !usuario || !senha ? "#64748B" : "white", fontWeight: "bold", fontSize: "15px", cursor: carregando || !usuario || !senha ? "not-allowed" : "pointer", transition: "all 0.2s" }}
          >
            {carregando ? "Autenticando..." : "Entrar"}
          </button>

          <div style={{ marginTop: "20px", padding: "14px", background: "#020617", borderRadius: "12px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#64748B", fontSize: "11px", marginBottom: "6px" }}>Credenciais de demonstração:</div>
            <div style={{ color: "#94A3B8", fontSize: "12px" }}>Usuário: <span style={{ color: "#10B981" }}>admin</span> &nbsp;|&nbsp; Senha: <span style={{ color: "#10B981" }}>grc2026</span></div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px", color: "#334155", fontSize: "12px" }}>
          GRC Inspector © 2026 — Acesso restrito a usuários autorizados
        </div>
      </div>
    </div>
  );
}

// ── TELA: DASHBOARD EXECUTIVO ──
function DashboardExecutivo() {
  const conformidadeData = [78, 82, 80, 85, 88, 90, 92];
  const alertasData = [22, 25, 19, 28, 21, 18, 18];
  const meses = ["Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px", gap: "20px" }}>
        <div>
          <h2 style={{ fontSize: "36px", margin: 0 }}>Executive Overview</h2>
          <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "8px" }}>Centro Integrado de Inteligência, Compliance e Proteção Institucional</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
          <BotaoPDF titulo="Relatório Executivo GRC Inspector" conteudo="" />
          <div style={{ background: "#111827", padding: "16px 22px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "5px" }}>Status Operacional</div>
            <div style={{ color: "#10B981", fontSize: "20px", fontWeight: "bold" }}>● Operacional 24x7</div>
          </div>
        </div>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { title: "Ativos Monitorados", value: 3428, suffix: "", color: "white" },
          { title: "Alertas Críticos", value: 18, suffix: "", color: "#EF4444" },
          { title: "Compliance BACEN", value: 92, suffix: "%", color: "#10B981" },
          { title: "Disponibilidade", value: 99, suffix: ".2%", color: "#10B981" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "10px" }}>{k.title}</div>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: k.color }}><AnimatedNumber target={k.value} suffix={k.suffix} /></div>
          </div>
        ))}
      </div>
      {/* ── FIM KPIs ── */}

      {/* ── DESTAQUES DE MONITORAMENTO ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #F9731633", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>⚠ Destaques de Monitoramento — Últimas 48h</h2>
          <span style={{ color: "#F97316", fontSize: "12px" }}>Requer atenção</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
          <div style={{ background: "#020617", padding: "18px", borderRadius: "14px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "11px", marginBottom: "8px" }}>Ativos e Processos Monitorados</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "white", marginBottom: "6px" }}><AnimatedNumber target={3428} /></div>
            <div style={{ color: "#10B981", fontSize: "12px" }}>● Monitoramento ativo em tempo real</div>
          </div>
          <div style={{ background: "#020617", padding: "18px", borderRadius: "14px", border: "1px solid #EF444433" }}>
            <div style={{ color: "#94A3B8", fontSize: "11px", marginBottom: "8px" }}>Transações Financeiras Suspeitas</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#EF4444", marginBottom: "6px" }}><AnimatedNumber target={27} /></div>
            <div style={{ color: "#EF4444", fontSize: "12px" }}>⚠ Contas abertas há menos de 24h</div>
          </div>
          <div style={{ background: "#020617", padding: "18px", borderRadius: "14px", border: "1px solid #F9731633" }}>
            <div style={{ color: "#94A3B8", fontSize: "11px", marginBottom: "8px" }}>Alterações Cadastrais Suspeitas</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#F97316", marginBottom: "6px" }}><AnimatedNumber target={3} /></div>
            <div style={{ color: "#F97316", fontSize: "12px" }}>⚠ Mesmo correntista — 48h</div>
          </div>
        </div>
      </div>
      {/* ── FIM DESTAQUES ── */}

      {/* ── GRÁFICOS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
        <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>Conformidade BACEN (%)</span>
            <span style={{ color: "#10B981", fontSize: "12px" }}>Últimos 7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            {meses.map((m, i) => <span key={i} style={{ color: "#94A3B8", fontSize: "11px" }}>{m}</span>)}
          </div>
          <LineChart data={conformidadeData} color="#10B981" />
        </div>
        <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>Alertas por Mês</span>
            <span style={{ color: "#EF4444", fontSize: "12px" }}>Últimos 7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            {meses.map((m, i) => <span key={i} style={{ color: "#94A3B8", fontSize: "11px" }}>{m}</span>)}
          </div>
          <LineChart data={alertasData} color="#EF4444" />
        </div>
      </div>
      {/* ── FIM GRÁFICOS ── */}

      {/* ── ALERTAS ESTRATÉGICOS ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "18px", border: "1px solid #1E293B", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Alertas Estratégicos</h2>
          <span style={{ color: "#10B981", fontSize: "12px" }}>● Atualização em tempo real</span>
        </div>
        {alertas.map((a, i) => {
          const s = getSeverityStyle(a.severity);
          return (
            <div key={i} style={{ background: "#020617", padding: "16px 20px", borderRadius: "12px", marginBottom: i < alertas.length - 1 ? "10px" : 0, border: "1px solid #1E293B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "14px", marginBottom: "4px" }}>{a.title}</div>
                <div style={{ color: "#94A3B8", fontSize: "12px" }}>Fonte: {a.source}</div>
              </div>
              <div style={{ padding: "5px 13px", borderRadius: "999px", background: s.bg, color: s.color, fontWeight: "bold", fontSize: "12px", flexShrink: 0 }}>{a.severity}</div>
            </div>
          );
        })}
      </div>
      {/* ── FIM ALERTAS ESTRATÉGICOS ── */}

      {/* ── TIMELINE ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "18px", border: "1px solid #1E293B" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Timeline Operacional</h2>
          <span style={{ color: "#94A3B8", fontSize: "12px" }}>Últimos eventos correlacionados</span>
        </div>
        {timelineItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: i < timelineItems.length - 1 ? "10px" : 0, padding: "12px 16px", background: "#020617", borderRadius: "10px", border: "1px solid #1E293B" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, marginRight: "14px", flexShrink: 0 }} />
            <div style={{ width: "60px", color: "#94A3B8", fontSize: "12px" }}>{item.time}</div>
            <div style={{ fontSize: "13px" }}>{item.event}</div>
          </div>
        ))}
      </div>
      {/* ── FIM TIMELINE ── */}
    </div>
  );
}

// ── TELA: CENTRO OPERACIONAL ──
function CentroOperacional() {
  const [eventos, setEventos] = useState([
    { id: 1, tipo: "Login suspeito", ativo: "SRV-FIN-01", hora: "19:58", nivel: "CRÍTICO" },
    { id: 2, tipo: "Transferência atípica", ativo: "APP-CORE-02", hora: "19:54", nivel: "ALTO" },
    { id: 3, tipo: "Varredura de portas", ativo: "FW-BORDA-01", hora: "19:51", nivel: "MÉDIO" },
    { id: 4, tipo: "Autenticação MFA falhou", ativo: "AD-DC-01", hora: "19:47", nivel: "ALTO" },
    { id: 5, tipo: "Exportação em massa", ativo: "DB-CRED-01", hora: "19:40", nivel: "CRÍTICO" },
  ]);

  useEffect(() => {
    const nomes = ["Acesso remoto", "Desvio comportamental", "Alteração cadastral", "Tentativa de bypass", "Log truncado"];
    const ativos = ["SRV-TI-03", "VPN-EXT-01", "APP-PIX-01", "FW-INT-02", "DB-LOG-01"];
    const niveis = ["CRÍTICO", "ALTO", "MÉDIO"];
    let counter = 6;
    const interval = setInterval(() => {
      const now = new Date();
      const hora = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      setEventos(prev => [{
        id: counter++,
        tipo: nomes[Math.floor(Math.random() * nomes.length)],
        ativo: ativos[Math.floor(Math.random() * ativos.length)],
        hora,
        nivel: niveis[Math.floor(Math.random() * niveis.length)],
      }, ...prev.slice(0, 9)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "36px", margin: 0 }}>Centro Operacional</h2>
          <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "8px" }}>Monitoramento contínuo 24x7 — eventos em tempo real</p>
        </div>
        <div style={{ background: "#EF444422", border: "1px solid #EF4444", borderRadius: "12px", padding: "10px 18px", color: "#EF4444", fontWeight: "bold", fontSize: "14px" }}>● AO VIVO</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Eventos / hora", val: 1247, color: "#3B82F6" },
          { label: "Ativos online", val: 3428, color: "#10B981" },
          { label: "Alertas abertos", val: 18, color: "#EF4444" },
          { label: "MTTR médio (min)", val: 12, color: "#F97316" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "8px" }}>{k.label}</div>
            <div style={{ fontSize: "26px", fontWeight: "bold", color: k.color }}><AnimatedNumber target={k.val} /></div>
          </div>
        ))}
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "17px", margin: 0 }}>Feed de Eventos — Correlação Analítica</h2>
          <span style={{ color: "#10B981", fontSize: "12px" }}>Novo evento a cada 5s</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 150px 90px", padding: "0 14px", marginBottom: "8px" }}>
          {["Hora", "Evento", "Ativo", "Nível"].map((h, i) => (
            <div key={i} style={{ color: "#64748B", fontSize: "11px", fontWeight: "bold" }}>{h}</div>
          ))}
        </div>
        {eventos.map((e, i) => {
          const s = getSeverityStyle(e.nivel);
          return (
            <div key={e.id} style={{ display: "grid", gridTemplateColumns: "70px 1fr 150px 90px", padding: "10px 14px", background: i === 0 ? "#10B98108" : "#020617", borderRadius: "8px", marginBottom: "5px", border: i === 0 ? "1px solid #10B98133" : "1px solid #1E293B" }}>
              <div style={{ color: "#94A3B8", fontSize: "12px" }}>{e.hora}</div>
              <div style={{ fontSize: "13px" }}>{e.tipo}</div>
              <div style={{ color: "#64748B", fontSize: "12px", fontFamily: "monospace" }}>{e.ativo}</div>
              <div style={{ padding: "2px 8px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: "bold", width: "fit-content" }}>{e.nivel}</div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "17px", margin: "0 0 18px" }}>Alertas por Categoria</h2>
        {[
          { cat: "Fraude Financeira", qtd: 7, total: 18, color: "#EF4444" },
          { cat: "Acesso Privilegiado", qtd: 5, total: 18, color: "#F97316" },
          { cat: "Movimentação de Dados", qtd: 3, total: 18, color: "#EAB308" },
          { cat: "Autenticação", qtd: 2, total: 18, color: "#3B82F6" },
          { cat: "Outros", qtd: 1, total: 18, color: "#94A3B8" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "13px" }}>{item.cat}</span>
              <span style={{ fontSize: "12px", color: "#94A3B8" }}>{item.qtd} alertas</span>
            </div>
            <ProgressBar valor={(item.qtd / item.total) * 100} color={item.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TELA: COMPLIANCE & GRC ──
function ComplianceGRC() {
  const maturidadeData = [55, 62, 67, 71, 75, 80, 84];
  const meses = ["Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const scoreMaturidade = 84;
  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "36px", margin: 0 }}>Compliance & GRC</h2>
        <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "8px" }}>Governança, Riscos e Conformidade — LGPD · BACEN · CMN · ISO 27001</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ background: "#111827", padding: "26px", borderRadius: "20px", border: "1px solid #1E293B", textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: "13px", marginBottom: "14px" }}>Score de Maturidade GRC</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="130" height="130" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="#1E293B" strokeWidth="12" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="#10B981" strokeWidth="12"
                strokeDasharray={`${(scoreMaturidade / 100) * 377} 377`}
                strokeLinecap="round" transform="rotate(-90 70 70)" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: "bold", color: "#10B981" }}>{scoreMaturidade}</div>
              <div style={{ fontSize: "10px", color: "#94A3B8" }}>/ 100</div>
            </div>
          </div>
          <div style={{ marginTop: "10px", color: "#10B981", fontWeight: "bold", fontSize: "14px" }}>Nível: Gerenciado</div>
        </div>
        <div style={{ background: "#111827", padding: "22px", borderRadius: "20px", border: "1px solid #1E293B" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>Evolução da Maturidade GRC</span>
            <span style={{ color: "#10B981", fontSize: "12px" }}>+29pts em 7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            {meses.map((m, i) => <span key={i} style={{ color: "#94A3B8", fontSize: "11px" }}>{m}</span>)}
          </div>
          <LineChart data={maturidadeData} color="#10B981" />
        </div>
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "17px", margin: "0 0 18px" }}>Aderência por Normativo</h2>
        {complianceNormas.map((n, i) => (
          <div key={i} style={{ background: "#020617", borderRadius: "12px", padding: "16px 18px", marginBottom: i < complianceNormas.length - 1 ? "10px" : 0, border: "1px solid #1E293B" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>{n.title}</span>
                <span style={{ color: "#64748B", fontSize: "11px", marginLeft: "10px" }}>Última auditoria: {n.ultima}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px", fontWeight: "bold", color: n.color }}>{n.valor}%</span>
                <div style={{ padding: "3px 10px", borderRadius: "999px", background: n.valor >= 90 ? "#10B98122" : "#F9731622", color: n.color, fontSize: "11px", fontWeight: "bold" }}>{n.status}</div>
              </div>
            </div>
            <ProgressBar valor={n.valor} color={n.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TELA: TSCM ──
function TSCM() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "36px", margin: 0 }}>TSCM</h2>
          <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "8px" }}>Technical Surveillance Counter-Measures — Contraespionagem Eletrônica</p>
        </div>
        <div style={{ background: "#10B98122", border: "1px solid #10B981", borderRadius: "12px", padding: "10px 18px", color: "#10B981", fontWeight: "bold" }}>Programa Ativo</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Varreduras em 2026", val: "23", color: "#10B981" },
          { label: "Ambientes Cobertos", val: "14", color: "#3B82F6" },
          { label: "Alertas Detectados", val: "1", color: "#EF4444" },
          { label: "Próxima Varredura", val: "05/06", color: "#F97316" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "8px" }}>{k.label}</div>
            <div style={{ fontSize: "26px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "17px", margin: "0 0 16px" }}>Histórico de Varreduras</h2>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", padding: "0 14px", marginBottom: "8px" }}>
          {["Local", "Data", "Status", "Tipo"].map((h, i) => <div key={i} style={{ color: "#64748B", fontSize: "11px", fontWeight: "bold" }}>{h}</div>)}
        </div>
        {varredurasTSCM.map((v, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", padding: "12px 14px", background: "#020617", borderRadius: "8px", marginBottom: "6px", border: "1px solid #1E293B" }}>
            <div style={{ fontSize: "13px" }}>{v.local}</div>
            <div style={{ color: "#94A3B8", fontSize: "12px" }}>{v.data}</div>
            <div style={{ padding: "2px 8px", borderRadius: "999px", background: v.status === "Limpo" ? "#10B98122" : "#EF444422", color: v.status === "Limpo" ? "#10B981" : "#EF4444", fontSize: "11px", fontWeight: "bold", width: "fit-content" }}>{v.status}</div>
            <div style={{ color: "#94A3B8", fontSize: "12px" }}>{v.tipo}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "17px", margin: "0 0 16px" }}>Tipos de Varredura</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { tipo: "Eletromagnética", icon: "📡", descricao: "Detecção de sinais de RF e transmissores ocultos" },
            { tipo: "Física / Visual", icon: "🔍", descricao: "Inspeção manual de móveis, paredes e dispositivos" },
            { tipo: "Veicular", icon: "🚗", descricao: "Varredura em veículos da alta direção" },
            { tipo: "Ambiental Pós-obra", icon: "🏗️", descricao: "Inspeção após reformas em ambientes críticos" },
          ].map((t, i) => (
            <div key={i} style={{ background: "#020617", padding: "16px", borderRadius: "12px", border: "1px solid #1E293B" }}>
              <div style={{ fontSize: "22px", marginBottom: "6px" }}>{t.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "13px", marginBottom: "4px" }}>{t.tipo}</div>
              <div style={{ color: "#94A3B8", fontSize: "12px" }}>{t.descricao}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TELA: DFIR ──
function DFIR() {
  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "36px", margin: 0 }}>DFIR</h2>
        <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "8px" }}>Digital Forensics & Incident Response — Investigação e Resposta a Incidentes</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Casos em 2026", val: "41", color: "#3B82F6" },
          { label: "Em Investigação", val: "3", color: "#EF4444" },
          { label: "Taxa de Resolução", val: "94%", color: "#10B981" },
          { label: "Tempo Médio (h)", val: "18", color: "#F97316" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "8px" }}>{k.label}</div>
            <div style={{ fontSize: "26px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "17px", margin: "0 0 16px" }}>Casos Registrados</h2>
        {casosDFIR.map((c, i) => {
          const s = getSeverityStyle(c.gravidade);
          const statusColor = c.status === "Em Investigação" ? "#EF4444" : c.status === "Contido" ? "#F97316" : "#10B981";
          return (
            <div key={i} style={{ background: "#020617", padding: "16px 18px", borderRadius: "12px", marginBottom: i < casosDFIR.length - 1 ? "8px" : 0, border: "1px solid #1E293B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontFamily: "monospace", color: "#64748B", fontSize: "11px" }}>{c.id}</span>
                <div style={{ padding: "2px 8px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: "bold" }}>{c.gravidade}</div>
                <div style={{ padding: "2px 8px", borderRadius: "999px", background: `${statusColor}22`, color: statusColor, fontSize: "11px", fontWeight: "bold" }}>{c.status}</div>
              </div>
              <div style={{ fontSize: "14px", marginBottom: "4px" }}>{c.descricao}</div>
              <div style={{ color: "#64748B", fontSize: "11px" }}>Analista: {c.analista} · {c.data}</div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "17px", margin: "0 0 16px" }}>Capacidades Forenses</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
          {[
            { cap: "Perícia em Endpoints", icon: "💻" },
            { cap: "Análise de Dispositivos Móveis", icon: "📱" },
            { cap: "Preservação de Evidências", icon: "🔒" },
            { cap: "Cadeia de Custódia Digital", icon: "📋" },
            { cap: "Análise de IoCs", icon: "🔎" },
            { cap: "Produção de Laudos Técnicos", icon: "📄" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#020617", padding: "14px", borderRadius: "10px", border: "1px solid #1E293B", textAlign: "center" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{c.icon}</div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>{c.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TELA: INTELIGÊNCIA EXECUTIVA ──
function InteligenciaExecutiva() {
  const scoreRisco = 71;
  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "36px", margin: 0 }}>Inteligência Executiva</h2>
        <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "8px" }}>Inteligência Empresarial Estratégica — Análise de Ameaças e Riscos Institucionais</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ background: "#111827", padding: "26px", borderRadius: "20px", border: "1px solid #1E293B", textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: "13px", marginBottom: "14px" }}>Score de Risco Institucional</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="130" height="130" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="#1E293B" strokeWidth="12" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="#F97316" strokeWidth="12"
                strokeDasharray={`${(scoreRisco / 100) * 377} 377`}
                strokeLinecap="round" transform="rotate(-90 70 70)" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: "bold", color: "#F97316" }}>{scoreRisco}</div>
              <div style={{ fontSize: "10px", color: "#94A3B8" }}>/ 100</div>
            </div>
          </div>
          <div style={{ marginTop: "10px", color: "#F97316", fontWeight: "bold", fontSize: "14px" }}>Risco: Moderado</div>
        </div>
        <div style={{ background: "#111827", padding: "22px", borderRadius: "20px", border: "1px solid #1E293B" }}>
          <h2 style={{ fontSize: "17px", margin: "0 0 16px" }}>Índice de Ameaças por Categoria</h2>
          {inteligenciaAmeacas.map((a, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "13px" }}>{a.categoria}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: a.cor, fontSize: "13px", fontWeight: "bold" }}>{a.tendencia}</span>
                  <span style={{ color: "#94A3B8", fontSize: "12px" }}>{a.nivel}</span>
                </div>
              </div>
              <ProgressBar valor={a.nivel} color={a.cor} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "17px", margin: 0 }}>Briefing Executivo — Junho 2026</h2>
          <span style={{ color: "#94A3B8", fontSize: "12px" }}>Atualizado em 01/06/2026</span>
        </div>
        {[
          { titulo: "Aumento de fraudes via engenharia social", nivel: "ALTO", resumo: "Incremento de 34% em tentativas de phishing direcionado a colaboradores com acesso a sistemas financeiros." },
          { titulo: "Vulnerabilidade em VPN corporativa", nivel: "MÉDIO", resumo: "Versão atual apresenta CVE com score 7.8. Recomenda-se atualização urgente do firmware nos próximos 15 dias." },
          { titulo: "Risco regulatório — CMN 4.557", nivel: "MÉDIO", resumo: "Aderência atual em 78%. Plano de adequação em execução com prazo de conclusão em agosto/2026." },
        ].map((b, i) => {
          const s = getSeverityStyle(b.nivel);
          return (
            <div key={i} style={{ background: "#020617", padding: "16px 18px", borderRadius: "12px", marginBottom: i < 2 ? "8px" : 0, border: "1px solid #1E293B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ padding: "2px 8px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: "bold" }}>{b.nivel}</div>
                <span style={{ fontWeight: "bold", fontSize: "13px" }}>{b.titulo}</span>
              </div>
              <div style={{ color: "#94A3B8", fontSize: "12px", lineHeight: "1.5" }}>{b.resumo}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TELA: GRC 360° ──
function GRC360() {
  const [aba, setAba] = useState<"colaboradores" | "terceiros" | "fornecedores">("colaboradores");
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const dados = aba === "colaboradores" ? colaboradores360 : aba === "terceiros" ? terceiros360 : fornecedores360;
  const filtrados = dados.filter((t: any) =>
    t.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abas = [
    { key: "colaboradores", label: "Colaboradores", total: colaboradores360.length, alto: colaboradores360.filter(c => c.risco === "ALTO").length },
    { key: "terceiros", label: "Terceiros", total: terceiros360.length, alto: terceiros360.filter(c => c.risco === "ALTO").length },
    { key: "fornecedores", label: "Fornecedores", total: fornecedores360.length, alto: fornecedores360.filter(c => c.risco === "ALTO").length },
  ];

  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "36px", margin: 0 }}>GRC 360°</h2>
          <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: "8px" }}>Avaliação Contínua — Colaboradores · Terceiros · Fornecedores</p>
        </div>
        <div style={{ background: "#3B82F622", border: "1px solid #3B82F6", borderRadius: "12px", padding: "10px 18px", color: "#3B82F6", fontWeight: "bold" }}>Módulo Ativo</div>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Total Monitorados", val: colaboradores360.length + terceiros360.length + fornecedores360.length, color: "#3B82F6" },
          { label: "Score Médio", val: 74, color: "#10B981" },
          { label: "Risco Alto", val: colaboradores360.filter(c => c.risco === "ALTO").length + terceiros360.filter(c => c.risco === "ALTO").length + fornecedores360.filter(c => c.risco === "ALTO").length, color: "#EF4444" },
          { label: "Dossiês Gerados", val: 43, color: "#8B5CF6" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "8px" }}>{k.label}</div>
            <div style={{ fontSize: "26px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>
      {/* ── FIM KPIs ── */}

      {/* ── ABAS ── */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {abas.map(a => (
          <button
            key={a.key}
            onClick={() => { setAba(a.key as any); setBusca(""); setSelecionado(null); }}
            style={{ flex: 1, padding: "14px 16px", borderRadius: "14px", border: aba === a.key ? "1px solid #3B82F6" : "1px solid #1E293B", background: aba === a.key ? "#3B82F622" : "#111827", color: aba === a.key ? "#3B82F6" : "#94A3B8", fontWeight: aba === a.key ? "bold" : "normal", cursor: "pointer", fontSize: "14px", transition: "all 0.2s" }}
          >
            {a.label}
            {a.alto > 0 && (
              <span style={{ marginLeft: "8px", background: "#EF444433", color: "#EF4444", borderRadius: "999px", padding: "2px 8px", fontSize: "11px" }}>{a.alto} alto</span>
            )}
          </button>
        ))}
      </div>
      {/* ── FIM ABAS ── */}

      {/* ── LISTA ── */}
      <div style={{ background: "#111827", padding: "22px", borderRadius: "18px", border: "1px solid #1E293B" }}>
        <input
          type="text"
          placeholder={`Buscar ${aba}...`}
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "13px", marginBottom: "14px", boxSizing: "border-box", outline: "none" }}
        />
        {filtrados.map((t: any, i: number) => {
          const r = getRiscoStyle(t.risco);
          const isOpen = selecionado === t.nome;
          return (
            <div
              key={i}
              onClick={() => setSelecionado(isOpen ? null : t.nome)}
              style={{ background: "#020617", padding: "16px 18px", borderRadius: "12px", marginBottom: "10px", border: isOpen ? "1px solid #3B82F6" : "1px solid #1E293B", cursor: "pointer", transition: "border 0.2s" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "3px" }}>{t.nome}</div>
                  <div style={{ color: "#64748B", fontSize: "12px" }}>
                    {t.cargo ? `${t.cargo} · CPF ${t.cpf}` : `${t.tipo} · CNPJ ${t.cnpj}`}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div>
                    <div style={{ color: "#94A3B8", fontSize: "10px", textAlign: "right" }}>Score</div>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: t.score >= 80 ? "#10B981" : t.score >= 60 ? "#F97316" : "#EF4444" }}>{t.score}</div>
                  </div>
                  <div style={{ padding: "4px 10px", borderRadius: "999px", background: r.bg, color: r.color, fontSize: "11px", fontWeight: "bold" }}>{t.risco}</div>
                </div>
              </div>

              {/* ── DETALHE EXPANDIDO ── */}
              {isOpen && (
                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #1E293B" }}>
                  {t.alertas.length > 0 && (
                    <div style={{ background: "#EF444411", border: "1px solid #EF444433", borderRadius: "10px", padding: "12px 14px", marginBottom: "12px" }}>
                      <div style={{ color: "#EF4444", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>⚠ Alertas Identificados</div>
                      {t.alertas.map((a: string, j: number) => (
                        <div key={j} style={{ color: "#FCA5A5", fontSize: "12px", marginBottom: "3px" }}>• {a}</div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    {[
                      { label: "Pendências", val: `${t.pendencias}`, alert: t.pendencias > 0 },
                      { label: "Cadastro Federal", val: "Regular", alert: false },
                      { label: "Lista Restritiva", val: t.risco === "ALTO" ? "Encontrado" : "Negativo", alert: t.risco === "ALTO" },
                      { label: "Exposição Pública", val: t.risco === "ALTO" ? "Alta" : "Baixa", alert: t.risco === "ALTO" },
                      { label: "Dados Jurídicos", val: t.pendencias > 0 ? "Ações em curso" : "Nenhuma ação", alert: t.pendencias > 0 },
                      { label: "Recomendação", val: t.risco === "ALTO" ? "Due diligence aprofundada" : "Monitoramento padrão", alert: t.risco === "ALTO" },
                    ].map((d, j) => (
                      <div key={j} style={{ background: "#0F172A", padding: "10px 12px", borderRadius: "8px" }}>
                        <div style={{ color: "#64748B", fontSize: "10px", marginBottom: "3px" }}>{d.label}</div>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: d.alert ? "#EF4444" : "#10B981" }}>{d.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "10px", padding: "9px 12px", background: "#3B82F611", borderRadius: "8px", border: "1px solid #3B82F633", color: "#3B82F6", fontSize: "12px" }}>
                    📄 Clique para gerar dossiê completo (Nacional/Internacional)
                  </div>
                </div>
              )}
              {/* ── FIM DETALHE EXPANDIDO ── */}
            </div>
          );
        })}
      </div>
      {/* ── FIM LISTA ── */}
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ──
export default function App() {
  const [logado, setLogado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [activeNav, setActiveNav] = useState(0);

  const handleLogin = (nome: string, cliente: string) => {
    setNomeUsuario(nome);
    setNomeCliente(cliente);
    setLogado(true);
  };

  const handleLogout = () => {
    setLogado(false);
    setNomeUsuario("");
    setNomeCliente("");
    setActiveNav(0);
  };

  if (!logado) return <TelaLogin onLogin={handleLogin} />;

  const renderTela = () => {
    switch (activeNav) {
      case 0: return <DashboardExecutivo />;
      case 1: return <CentroOperacional />;
      case 2: return <ComplianceGRC />;
      case 3: return <TSCM />;
      case 4: return <DFIR />;
      case 5: return <InteligenciaExecutiva />;
      case 6: return <GRC360 />;
      default: return <DashboardExecutivo />;
    }
  };

  return (
    <div style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", display: "flex", flexDirection: "column" }}>

      {/* ── LAYOUT PRINCIPAL ── */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width: "300px", background: "#0F172A", padding: "30px 20px", borderRight: "1px solid #1E293B", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src="/logo-grc.png" alt="GRC Solutions" style={{ width: "270px", maxWidth: "100%", filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.3))" }} />
            <div style={{ marginTop: "6px", color: "#94A3B8", fontSize: "12px" }}>Intelligence Platform</div>
          </div>

          {/* Info do usuário */}
          <div style={{ background: "#111827", borderRadius: "12px", padding: "12px 14px", marginBottom: "20px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#64748B", fontSize: "11px", marginBottom: "3px" }}>Sessão ativa</div>
            <div style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>{nomeUsuario}</div>
            <div style={{ color: "#10B981", fontSize: "11px" }}>{nomeCliente}</div>
          </div>

          <nav style={{ flex: 1 }}>
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveNav(index)}
                style={{ padding: "14px 16px", marginBottom: "8px", borderRadius: "12px", background: activeNav === index ? "#10B98122" : "#111827", cursor: "pointer", border: activeNav === index ? "1px solid #10B981" : "1px solid #1E293B", fontSize: "14px", transition: "all 0.2s", color: activeNav === index ? "white" : "#94A3B8" }}
              >
                {item}
              </div>
            ))}
          </nav>

          {/* Botão sair */}
          <button
            onClick={handleLogout}
            style={{ marginTop: "16px", padding: "12px", borderRadius: "12px", border: "1px solid #1E293B", background: "#020617", color: "#64748B", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}
          >
            Sair da sessão
          </button>
        </div>
        {/* ── FIM SIDEBAR ── */}

        {/* ── CONTEÚDO PRINCIPAL ── */}
        <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
          {renderTela()}
        </div>
        {/* ── FIM CONTEÚDO PRINCIPAL ── */}

      </div>
      {/* ── FIM LAYOUT PRINCIPAL ── */}

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid #1E293B", background: "#0F172A", color: "#94A3B8", fontSize: "12px", textAlign: "center", padding: "14px 20px" }}>
        GRC Inspector © 2026 — Intelligence Platform
      </div>
      {/* ── FIM FOOTER ── */}

    </div>
  );
}
