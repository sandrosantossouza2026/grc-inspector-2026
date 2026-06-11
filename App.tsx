import React, { useState, useEffect } from "react";

// ── CREDENCIAIS DE ACESSO ──
const USUARIOS = [
  { usuario: "admin", senha: "grc2026", nome: "Administrador", cliente: "GRC Inspector" },
  { usuario: "basa", senha: "basa2026", nome: "Banco da Amazônia", cliente: "BASA" },
  { usuario: "demo", senha: "demo2026", nome: "Demonstração", cliente: "Cliente Demo" },
];

// ── HOOK: DETECTA MOBILE ──
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return isMobile;
}

// ── DADOS GLOBAIS ──
const navItems = [
  "Dashboard Executivo",
  "Centro Operacional",
  "Compliance & GRC",
  "TSCM",
  "DFIR",
  "Inteligência Executiva",
  "GRC 360°",
  "360° Terrorismo & CO",
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

// ── TICKER ANIMADO ──
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

// ── GRÁFICO DE LINHA ──
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

// ── BARRA DE PROGRESSO ──
function ProgressBar({ valor, color }: { valor: number; color: string }) {
  return (
    <div style={{ background: "#1E293B", borderRadius: "999px", height: "8px", width: "100%" }}>
      <div style={{ width: `${valor}%`, background: color, height: "8px", borderRadius: "999px", transition: "width 1s ease" }} />
    </div>
  );
}

// ── BOTÃO PDF ──
function BotaoPDF() {
  const [gerando, setGerando] = useState(false);
  const gerarPDF = () => {
    setGerando(true);
    setTimeout(() => {
      const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/><title>Relatório GRC Inspector</title>
<style>
  body{font-family:Arial,sans-serif;margin:40px;color:#1e293b}
  .header{border-bottom:3px solid #10B981;padding-bottom:20px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:center}
  .logo-title{font-size:22px;font-weight:bold}.logo-sub{font-size:12px;color:#64748b;margin-top:4px}
  .badge{background:#10B98122;color:#059669;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid #10B981}
  h1{font-size:20px;color:#020617;margin:0 0 4px}h2{font-size:15px;color:#334155;border-left:4px solid #10B981;padding-left:10px;margin:24px 0 12px}
  .meta{font-size:11px;color:#94a3b8;margin-bottom:28px}
  .kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:16px 0}
  .kpi{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px}
  .kpi-label{font-size:10px;color:#94a3b8;margin-bottom:4px}.kpi-value{font-size:20px;font-weight:bold;color:#0f172a}
  .destaque{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:14px 0}
  .destaque-title{font-weight:bold;color:#065f46;font-size:12px;margin-bottom:6px}
  .destaque-item{font-size:12px;color:#374151;margin-bottom:3px;padding-left:10px}
  .alerta{background:#fff8f8;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center}
  table{width:100%;border-collapse:collapse;margin:10px 0}th{background:#f8fafc;border:1px solid #e2e8f0;padding:8px 10px;font-size:11px;color:#64748b;text-align:left}
  td{border:1px solid #e2e8f0;padding:8px 10px;font-size:12px}tr:nth-child(even) td{background:#f8fafc}
  .footer{margin-top:40px;border-top:1px solid #e2e8f0;padding-top:14px;display:flex;justify-content:space-between;font-size:10px;color:#94a3b8}
  .conforme{color:#10b981;font-weight:bold}.monitorado{color:#f97316;font-weight:bold}
  .badge-critico{background:#fee2e2;color:#ef4444;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:bold}
  .badge-alto{background:#ffedd5;color:#f97316;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:bold}
  .badge-medio{background:#fefce8;color:#ca8a04;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:bold}
</style></head><body>
<div class="header">
  <div><div class="logo-title">GRC Inspector — Intelligence Platform</div><div class="logo-sub">Centro Integrado de Inteligência, Compliance e Proteção Institucional</div></div>
  <div class="badge">● Operacional 24x7</div>
</div>
<h1>Relatório Executivo GRC Inspector</h1>
<div class="meta">Gerado em: ${new Date().toLocaleString("pt-BR")} &nbsp;|&nbsp; GRC Inspector © 2026 &nbsp;|&nbsp; Documento Confidencial</div>
<div class="kpi-grid">
  <div class="kpi"><div class="kpi-label">Ativos Monitorados</div><div class="kpi-value">3.428</div></div>
  <div class="kpi"><div class="kpi-label">Alertas Críticos</div><div class="kpi-value" style="color:#ef4444">18</div></div>
  <div class="kpi"><div class="kpi-label">Compliance BACEN</div><div class="kpi-value" style="color:#10b981">92%</div></div>
  <div class="kpi"><div class="kpi-label">Disponibilidade</div><div class="kpi-value" style="color:#10b981">99.2%</div></div>
  <div class="kpi"><div class="kpi-label">Score Maturidade GRC</div><div class="kpi-value" style="color:#10b981">84/100</div></div>
  <div class="kpi"><div class="kpi-label">Status</div><div class="kpi-value" style="color:#10b981;font-size:14px">Operacional 24x7</div></div>
</div>
<div class="destaque">
  <div class="destaque-title">⚠ Destaques de Monitoramento — Últimas 48h</div>
  <div class="destaque-item">• 3.428 ativos e processos monitorados em tempo real</div>
  <div class="destaque-item">• 27 transações financeiras suspeitas (contas abertas há menos de 24h)</div>
  <div class="destaque-item">• 3 alterações de endereço do mesmo correntista nas últimas 48 horas</div>
</div>
<h2>Alertas Estratégicos</h2>
<div class="alerta"><span>Movimentação suspeita de dados — Endpoint Financeiro</span><span class="badge-critico">CRÍTICO</span></div>
<div class="alerta"><span>Acesso privilegiado fora do padrão — VPN Corporativa</span><span class="badge-alto">ALTO</span></div>
<div class="alerta"><span>Possível fraude transacional — Sistema Antifraude</span><span class="badge-medio">MÉDIO</span></div>
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
<h2>Timeline Operacional</h2>
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
  <span>Gerado automaticamente</span>
</div>
</body></html>`;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `GRC-Inspector-Relatorio-${new Date().toISOString().slice(0, 10)}.html`;
      a.click();
      URL.revokeObjectURL(url);
      setGerando(false);
    }, 1200);
  };
  return (
    <button onClick={gerarPDF} disabled={gerando}
      style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #10B981", background: gerando ? "#10B98133" : "#10B98122", color: "#10B981", fontWeight: "bold", fontSize: "13px", cursor: gerando ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
      {gerando ? "⏳ Gerando..." : "⬇ Relatório"}
    </button>
  );
}

// ── TELA: LOGIN ──
function TelaLogin({ onLogin }: { onLogin: (nome: string, cliente: string) => void }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const isMobile = useIsMobile();

  const handleLogin = () => {
    setErro("");
    setCarregando(true);
    setTimeout(() => {
      const encontrado = USUARIOS.find(u => u.usuario === usuario && u.senha === senha);
      if (encontrado) { onLogin(encontrado.nome, encontrado.cliente); }
      else { setErro("Usuário ou senha incorretos."); setCarregando(false); }
    }, 800);
  };

  return (
    <div style={{ background: "#020617", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <img src="/logo-grc.png" alt="GRC Solutions" style={{ width: isMobile ? "180px" : "220px", maxWidth: "100%", filter: "drop-shadow(0 0 16px rgba(16,185,129,0.4))" }} />
          <div style={{ marginTop: "10px", color: "#94A3B8", fontSize: "13px" }}>Intelligence Platform</div>
        </div>
        <div style={{ background: "#0F172A", borderRadius: "24px", border: "1px solid #1E293B", padding: isMobile ? "24px" : "36px" }}>
          <h2 style={{ color: "white", fontSize: "20px", margin: "0 0 4px", textAlign: "center" }}>Acesso Seguro</h2>
          <p style={{ color: "#64748B", fontSize: "13px", textAlign: "center", margin: "0 0 24px" }}>Centro Integrado de Monitoramento e Inteligência</p>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ color: "#94A3B8", fontSize: "12px", display: "block", marginBottom: "6px" }}>Usuário</label>
            <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Digite seu usuário"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#94A3B8", fontSize: "12px", display: "block", marginBottom: "6px" }}>Senha</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Digite sua senha"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          </div>
          {erro && <div style={{ background: "#EF444422", border: "1px solid #EF4444", borderRadius: "10px", padding: "10px 14px", color: "#EF4444", fontSize: "13px", marginBottom: "14px" }}>{erro}</div>}
          <button onClick={handleLogin} disabled={carregando || !usuario || !senha}
            style={{ width: "100%", padding: "13px", borderRadius: "10px", border: "none", background: carregando || !usuario || !senha ? "#1E293B" : "#10B981", color: carregando || !usuario || !senha ? "#64748B" : "white", fontWeight: "bold", fontSize: "15px", cursor: carregando || !usuario || !senha ? "not-allowed" : "pointer" }}>
            {carregando ? "Autenticando..." : "Entrar"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px", color: "#334155", fontSize: "11px" }}>
          GRC Inspector © 2026 — Acesso restrito a usuários autorizados
        </div>
      </div>
    </div>
  );
}

// ── SIDEBAR ──
function Sidebar({ activeNav, setActiveNav, nomeUsuario, nomeCliente, onLogout, isMobile, menuAberto, setMenuAberto }:
  { activeNav: number; setActiveNav: (i: number) => void; nomeUsuario: string; nomeCliente: string; onLogout: () => void; isMobile: boolean; menuAberto: boolean; setMenuAberto: (v: boolean) => void }) {

  const conteudo = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/logo-grc.png" alt="GRC Solutions" style={{ width: isMobile ? "180px" : "240px", maxWidth: "100%", filter: "drop-shadow(0 0 10px rgba(16,185,129,0.3))" }} />
        <div style={{ marginTop: "6px", color: "#94A3B8", fontSize: "11px" }}>Intelligence Platform</div>
      </div>
      <div style={{ background: "#111827", borderRadius: "10px", padding: "10px 12px", marginBottom: "16px", border: "1px solid #1E293B" }}>
        <div style={{ color: "#64748B", fontSize: "10px", marginBottom: "2px" }}>Sessão ativa</div>
        <div style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>{nomeUsuario}</div>
        <div style={{ color: "#10B981", fontSize: "11px" }}>{nomeCliente}</div>
      </div>
      <nav style={{ flex: 1 }}>
        {navItems.map((item, index) => (
          <div key={index} onClick={() => { setActiveNav(index); if (isMobile) setMenuAberto(false); }}
            style={{ padding: "13px 14px", marginBottom: "6px", borderRadius: "10px", background: activeNav === index ? "#10B98122" : "#111827", cursor: "pointer", border: activeNav === index ? "1px solid #10B981" : "1px solid #1E293B", fontSize: "13px", color: activeNav === index ? "white" : "#94A3B8", transition: "all 0.2s" }}>
            {item}
          </div>
        ))}
      </nav>
      <button onClick={onLogout}
        style={{ marginTop: "12px", padding: "11px", borderRadius: "10px", border: "1px solid #1E293B", background: "#020617", color: "#64748B", fontSize: "12px", cursor: "pointer" }}>
        Sair da sessão
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {menuAberto && (
          <div onClick={() => setMenuAberto(false)}
            style={{ position: "fixed", inset: 0, background: "#00000088", zIndex: 40 }} />
        )}
        <div style={{ position: "fixed", left: menuAberto ? 0 : "-280px", top: 0, bottom: 0, width: "270px", background: "#0F172A", borderRight: "1px solid #1E293B", padding: "20px 16px", zIndex: 50, transition: "left 0.3s ease", overflowY: "auto" }}>
          {conteudo}
        </div>
      </>
    );
  }

  return (
    <div style={{ width: "280px", background: "#0F172A", padding: "24px 18px", borderRight: "1px solid #1E293B", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
      {conteudo}
    </div>
  );
}

// ── TOPBAR MOBILE ──
function TopBar({ menuAberto, setMenuAberto, titulo }: { menuAberto: boolean; setMenuAberto: (v: boolean) => void; titulo: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: "#0F172A", borderBottom: "1px solid #1E293B", position: "sticky", top: 0, zIndex: 30 }}>
      <button onClick={() => setMenuAberto(!menuAberto)}
        style={{ background: "#111827", border: "1px solid #1E293B", borderRadius: "8px", color: "white", fontSize: "18px", width: "36px", height: "36px", cursor: "pointer", flexShrink: 0 }}>
        ☰
      </button>
      <img src="/logo-grc.png" alt="GRC" style={{ height: "28px", filter: "drop-shadow(0 0 6px rgba(16,185,129,0.3))" }} />
      <span style={{ color: "#94A3B8", fontSize: "12px", marginLeft: "auto" }}>{titulo}</span>
    </div>
  );
}

// ── GRID RESPONSIVO ──
function Grid({ cols, gap = 14, children }: { cols: number; gap?: number; children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const effectiveCols = isMobile ? Math.min(2, cols) : cols;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${effectiveCols}, 1fr)`, gap, marginBottom: gap }}>
      {children}
    </div>
  );
}

// ── GRID RESPONSIVO 1 COLUNA NO MOBILE ──
function Grid1Mobile({ cols, gap = 20, children }: { cols: number; gap?: number; children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${cols}, 1fr)`, gap, marginBottom: gap }}>
      {children}
    </div>
  );
}

// ── CARD BASE ──
function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#111827", padding: "20px", borderRadius: "18px", border: "1px solid #1E293B", ...style }}>
      {children}
    </div>
  );
}

// ── TELA: DASHBOARD EXECUTIVO ──
function DashboardExecutivo() {
  const isMobile = useIsMobile();
  const conformidadeData = [78, 82, 80, 85, 88, 90, 92];
  const alertasData = [22, 25, 19, 28, 21, 18, 18];
  const meses = ["Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  return (
    <div>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: "12px", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: isMobile ? "24px" : "34px", margin: 0 }}>Executive Overview</h2>
          <p style={{ color: "#94A3B8", fontSize: "13px", marginTop: "6px", marginBottom: 0 }}>Centro Integrado de Inteligência, Compliance e Proteção Institucional</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <BotaoPDF />
          <div style={{ background: "#111827", padding: "12px 16px", borderRadius: "12px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "11px", marginBottom: "3px" }}>Status</div>
            <div style={{ color: "#10B981", fontSize: "14px", fontWeight: "bold" }}>● Operacional 24x7</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <Grid cols={4} gap={12}>
        {[
          { title: "Ativos Monitorados", value: 3428, suffix: "", color: "white" },
          { title: "Alertas Críticos", value: 18, suffix: "", color: "#EF4444" },
          { title: "Compliance BACEN", value: 92, suffix: "%", color: "#10B981" },
          { title: "Disponibilidade", value: 99, suffix: ".2%", color: "#10B981" },
        ].map((k, i) => (
          <Card key={i}>
            <div style={{ color: "#94A3B8", fontSize: "11px", marginBottom: "8px" }}>{k.title}</div>
            <div style={{ fontSize: "26px", fontWeight: "bold", color: k.color }}><AnimatedNumber target={k.value} suffix={k.suffix} /></div>
          </Card>
        ))}
      </Grid>

      {/* DESTAQUES */}
      <Card style={{ border: "1px solid #F9731633", marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <h2 style={{ fontSize: "16px", margin: 0 }}>⚠ Destaques — Últimas 48h</h2>
          <span style={{ color: "#F97316", fontSize: "11px" }}>Requer atenção</span>
        </div>
        <Grid cols={3} gap={12}>
          {[
            { label: "Ativos Monitorados", val: 3428, suffix: "", cor: "white", sub: "● Monitoramento ativo", subcor: "#10B981", border: "#1E293B" },
            { label: "Transações Suspeitas", val: 27, suffix: "", cor: "#EF4444", sub: "⚠ Contas abertas < 24h", subcor: "#EF4444", border: "#EF444433" },
            { label: "Alterações Cadastrais", val: 3, suffix: "", cor: "#F97316", sub: "⚠ Mesmo correntista 48h", subcor: "#F97316", border: "#F9731633" },
          ].map((d, i) => (
            <div key={i} style={{ background: "#020617", padding: "14px", borderRadius: "12px", border: `1px solid ${d.border}` }}>
              <div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>{d.label}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", color: d.cor, marginBottom: "4px" }}><AnimatedNumber target={d.val} suffix={d.suffix} /></div>
              <div style={{ color: d.subcor, fontSize: "11px" }}>{d.sub}</div>
            </div>
          ))}
        </Grid>
      </Card>

      {/* GRÁFICOS */}
      <Grid1Mobile cols={2} gap={16}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>Conformidade BACEN (%)</span>
            <span style={{ color: "#10B981", fontSize: "11px" }}>7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            {meses.map((m, i) => <span key={i} style={{ color: "#94A3B8", fontSize: "10px" }}>{m}</span>)}
          </div>
          <LineChart data={conformidadeData} color="#10B981" />
        </Card>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>Alertas por Mês</span>
            <span style={{ color: "#EF4444", fontSize: "11px" }}>7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            {meses.map((m, i) => <span key={i} style={{ color: "#94A3B8", fontSize: "10px" }}>{m}</span>)}
          </div>
          <LineChart data={alertasData} color="#EF4444" />
        </Card>
      </Grid1Mobile>

      {/* ALERTAS */}
      <Card style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <h2 style={{ fontSize: "16px", margin: 0 }}>Alertas Estratégicos</h2>
          <span style={{ color: "#10B981", fontSize: "11px" }}>● Tempo real</span>
        </div>
        {alertas.map((a, i) => {
          const s = getSeverityStyle(a.severity);
          return (
            <div key={i} style={{ background: "#020617", padding: "14px 16px", borderRadius: "10px", marginBottom: i < alertas.length - 1 ? "8px" : 0, border: "1px solid #1E293B", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
              <div>
                <div style={{ fontSize: "13px", marginBottom: "3px" }}>{a.title}</div>
                <div style={{ color: "#94A3B8", fontSize: "11px" }}>Fonte: {a.source}</div>
              </div>
              <div style={{ padding: "4px 10px", borderRadius: "999px", background: s.bg, color: s.color, fontWeight: "bold", fontSize: "11px", flexShrink: 0 }}>{a.severity}</div>
            </div>
          );
        })}
      </Card>

      {/* TIMELINE */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <h2 style={{ fontSize: "16px", margin: 0 }}>Timeline Operacional</h2>
          <span style={{ color: "#94A3B8", fontSize: "11px" }}>Últimos eventos</span>
        </div>
        {timelineItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: i < timelineItems.length - 1 ? "8px" : 0, padding: "10px 14px", background: "#020617", borderRadius: "8px", border: "1px solid #1E293B" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: item.color, marginRight: "12px", flexShrink: 0 }} />
            <div style={{ width: "50px", color: "#94A3B8", fontSize: "11px" }}>{item.time}</div>
            <div style={{ fontSize: "12px" }}>{item.event}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── TELA: CENTRO OPERACIONAL ──
function CentroOperacional() {
  const isMobile = useIsMobile();
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
      setEventos(prev => [{ id: counter++, tipo: nomes[Math.floor(Math.random() * nomes.length)], ativo: ativos[Math.floor(Math.random() * ativos.length)], hora, nivel: niveis[Math.floor(Math.random() * niveis.length)] }, ...prev.slice(0, 9)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: isMobile ? "22px" : "32px", margin: 0 }}>Centro Operacional</h2>
          <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: "4px", marginBottom: 0 }}>Monitoramento contínuo 24x7</p>
        </div>
        <div style={{ background: "#EF444422", border: "1px solid #EF4444", borderRadius: "10px", padding: "8px 14px", color: "#EF4444", fontWeight: "bold", fontSize: "12px" }}>● AO VIVO</div>
      </div>
      <Grid cols={4} gap={12}>
        {[
          { label: "Eventos / hora", val: 1247, color: "#3B82F6" },
          { label: "Ativos online", val: 3428, color: "#10B981" },
          { label: "Alertas abertos", val: 18, color: "#EF4444" },
          { label: "MTTR médio (min)", val: 12, color: "#F97316" },
        ].map((k, i) => (
          <Card key={i}>
            <div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: k.color }}><AnimatedNumber target={k.val} /></div>
          </Card>
        ))}
      </Grid>
      <Card style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <h2 style={{ fontSize: "15px", margin: 0 }}>Feed de Eventos</h2>
          <span style={{ color: "#10B981", fontSize: "11px" }}>Novo evento a cada 5s</span>
        </div>
        {eventos.map((e, i) => {
          const s = getSeverityStyle(e.nivel);
          return (
            <div key={e.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: i === 0 ? "#10B98108" : "#020617", borderRadius: "8px", marginBottom: "5px", border: i === 0 ? "1px solid #10B98133" : "1px solid #1E293B", flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <div style={{ color: "#94A3B8", fontSize: "11px", minWidth: "50px" }}>{e.hora}</div>
              <div style={{ fontSize: "13px", flex: 1 }}>{e.tipo}</div>
              {!isMobile && <div style={{ color: "#64748B", fontSize: "11px", fontFamily: "monospace", minWidth: "100px" }}>{e.ativo}</div>}
              <div style={{ padding: "2px 8px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "10px", fontWeight: "bold", flexShrink: 0 }}>{e.nivel}</div>
            </div>
          );
        })}
      </Card>
      <Card>
        <h2 style={{ fontSize: "15px", margin: "0 0 14px" }}>Alertas por Categoria</h2>
        {[
          { cat: "Fraude Financeira", qtd: 7, total: 18, color: "#EF4444" },
          { cat: "Acesso Privilegiado", qtd: 5, total: 18, color: "#F97316" },
          { cat: "Movimentação de Dados", qtd: 3, total: 18, color: "#EAB308" },
          { cat: "Autenticação", qtd: 2, total: 18, color: "#3B82F6" },
          { cat: "Outros", qtd: 1, total: 18, color: "#94A3B8" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "12px" }}>{item.cat}</span>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>{item.qtd}</span>
            </div>
            <ProgressBar valor={(item.qtd / item.total) * 100} color={item.color} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── TELA: COMPLIANCE & GRC ──
function ComplianceGRC() {
  const isMobile = useIsMobile();
  const maturidadeData = [55, 62, 67, 71, 75, 80, 84];
  const meses = ["Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const score = 84;
  return (
    <div>
      <h2 style={{ fontSize: isMobile ? "22px" : "32px", margin: "0 0 6px" }}>Compliance & GRC</h2>
      <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: 0, marginBottom: "20px" }}>LGPD · BACEN · CMN · ISO 27001</p>
      <Grid1Mobile cols={2} gap={16}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "12px" }}>Score de Maturidade GRC</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="120" height="120" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="#1E293B" strokeWidth="12" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="#10B981" strokeWidth="12"
                strokeDasharray={`${(score / 100) * 377} 377`} strokeLinecap="round" transform="rotate(-90 70 70)" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10B981" }}>{score}</div>
              <div style={{ fontSize: "10px", color: "#94A3B8" }}>/ 100</div>
            </div>
          </div>
          <div style={{ marginTop: "10px", color: "#10B981", fontWeight: "bold", fontSize: "13px" }}>Nível: Gerenciado</div>
        </Card>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>Evolução Maturidade</span>
            <span style={{ color: "#10B981", fontSize: "11px" }}>+29pts</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            {meses.map((m, i) => <span key={i} style={{ color: "#94A3B8", fontSize: "10px" }}>{m}</span>)}
          </div>
          <LineChart data={maturidadeData} color="#10B981" />
        </Card>
      </Grid1Mobile>
      <Card>
        <h2 style={{ fontSize: "15px", margin: "0 0 14px" }}>Aderência por Normativo</h2>
        {complianceNormas.map((n, i) => (
          <div key={i} style={{ background: "#020617", borderRadius: "10px", padding: "14px 16px", marginBottom: i < complianceNormas.length - 1 ? "8px" : 0, border: "1px solid #1E293B" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>{n.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px", fontWeight: "bold", color: n.color }}>{n.valor}%</span>
                <div style={{ padding: "2px 8px", borderRadius: "999px", background: n.valor >= 90 ? "#10B98122" : "#F9731622", color: n.color, fontSize: "10px", fontWeight: "bold" }}>{n.status}</div>
              </div>
            </div>
            <ProgressBar valor={n.valor} color={n.color} />
            <div style={{ color: "#64748B", fontSize: "10px", marginTop: "4px" }}>Última auditoria: {n.ultima}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── TELA: TSCM ──
function TSCM() {
  const isMobile = useIsMobile();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: isMobile ? "22px" : "32px", margin: 0 }}>TSCM</h2>
          <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: "4px", marginBottom: 0 }}>Technical Surveillance Counter-Measures</p>
        </div>
        <div style={{ background: "#10B98122", border: "1px solid #10B981", borderRadius: "10px", padding: "8px 14px", color: "#10B981", fontWeight: "bold", fontSize: "12px" }}>Ativo</div>
      </div>
      <Grid cols={4} gap={12}>
        {[
          { label: "Varreduras 2026", val: "23", color: "#10B981" },
          { label: "Ambientes", val: "14", color: "#3B82F6" },
          { label: "Alertas", val: "1", color: "#EF4444" },
          { label: "Próxima", val: "05/06", color: "#F97316" },
        ].map((k, i) => (
          <Card key={i}>
            <div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </Card>
        ))}
      </Grid>
      <Card style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", margin: "0 0 14px" }}>Histórico de Varreduras</h2>
        {varredurasTSCM.map((v, i) => (
          <div key={i} style={{ background: "#020617", padding: "12px 14px", borderRadius: "8px", marginBottom: "6px", border: "1px solid #1E293B" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={{ fontSize: "13px", fontWeight: "bold" }}>{v.local}</span>
              <div style={{ padding: "2px 8px", borderRadius: "999px", background: v.status === "Limpo" ? "#10B98122" : "#EF444422", color: v.status === "Limpo" ? "#10B981" : "#EF4444", fontSize: "10px", fontWeight: "bold" }}>{v.status}</div>
            </div>
            <div style={{ color: "#64748B", fontSize: "11px" }}>{v.data} · {v.tipo}</div>
          </div>
        ))}
      </Card>
      <Card>
        <h2 style={{ fontSize: "15px", margin: "0 0 14px" }}>Tipos de Varredura</h2>
        <Grid cols={2} gap={10}>
          {[
            { tipo: "Eletromagnética", icon: "📡", descricao: "Detecção de sinais RF e transmissores" },
            { tipo: "Física / Visual", icon: "🔍", descricao: "Inspeção de móveis, paredes e dispositivos" },
            { tipo: "Veicular", icon: "🚗", descricao: "Varredura em veículos da alta direção" },
            { tipo: "Pós-obra", icon: "🏗️", descricao: "Inspeção após reformas em ambientes críticos" },
          ].map((t, i) => (
            <div key={i} style={{ background: "#020617", padding: "14px", borderRadius: "10px", border: "1px solid #1E293B" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{t.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "3px" }}>{t.tipo}</div>
              <div style={{ color: "#94A3B8", fontSize: "11px" }}>{t.descricao}</div>
            </div>
          ))}
        </Grid>
      </Card>
    </div>
  );
}

// ── TELA: DFIR ──
function DFIR() {
  const isMobile = useIsMobile();
  return (
    <div>
      <h2 style={{ fontSize: isMobile ? "22px" : "32px", margin: "0 0 4px" }}>DFIR</h2>
      <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: 0, marginBottom: "20px" }}>Digital Forensics & Incident Response</p>
      <Grid cols={4} gap={12}>
        {[
          { label: "Casos 2026", val: "41", color: "#3B82F6" },
          { label: "Em Investigação", val: "3", color: "#EF4444" },
          { label: "Taxa de Resolução", val: "94%", color: "#10B981" },
          { label: "Tempo Médio (h)", val: "18", color: "#F97316" },
        ].map((k, i) => (
          <Card key={i}>
            <div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </Card>
        ))}
      </Grid>
      <Card style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", margin: "0 0 14px" }}>Casos Registrados</h2>
        {casosDFIR.map((c, i) => {
          const s = getSeverityStyle(c.gravidade);
          const sc = c.status === "Em Investigação" ? "#EF4444" : c.status === "Contido" ? "#F97316" : "#10B981";
          return (
            <div key={i} style={{ background: "#020617", padding: "14px 16px", borderRadius: "10px", marginBottom: i < casosDFIR.length - 1 ? "8px" : 0, border: "1px solid #1E293B" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
                <span style={{ fontFamily: "monospace", color: "#64748B", fontSize: "10px" }}>{c.id}</span>
                <div style={{ padding: "1px 7px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "10px", fontWeight: "bold" }}>{c.gravidade}</div>
                <div style={{ padding: "1px 7px", borderRadius: "999px", background: `${sc}22`, color: sc, fontSize: "10px", fontWeight: "bold" }}>{c.status}</div>
              </div>
              <div style={{ fontSize: "13px", marginBottom: "3px" }}>{c.descricao}</div>
              <div style={{ color: "#64748B", fontSize: "10px" }}>{c.analista} · {c.data}</div>
            </div>
          );
        })}
      </Card>
      <Card>
        <h2 style={{ fontSize: "15px", margin: "0 0 14px" }}>Capacidades Forenses</h2>
        <Grid cols={3} gap={10}>
          {[
            { cap: "Perícia em Endpoints", icon: "💻" },
            { cap: "Dispositivos Móveis", icon: "📱" },
            { cap: "Preservação de Evidências", icon: "🔒" },
            { cap: "Cadeia de Custódia", icon: "📋" },
            { cap: "Análise de IoCs", icon: "🔎" },
            { cap: "Laudos Técnicos", icon: "📄" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#020617", padding: "12px", borderRadius: "8px", border: "1px solid #1E293B", textAlign: "center" }}>
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{c.icon}</div>
              <div style={{ fontSize: "11px", color: "#94A3B8" }}>{c.cap}</div>
            </div>
          ))}
        </Grid>
      </Card>
    </div>
  );
}

// ── TELA: INTELIGÊNCIA EXECUTIVA ──
function InteligenciaExecutiva() {
  const isMobile = useIsMobile();
  const scoreRisco = 71;
  return (
    <div>
      <h2 style={{ fontSize: isMobile ? "22px" : "32px", margin: "0 0 4px" }}>Inteligência Executiva</h2>
      <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: 0, marginBottom: "20px" }}>Análise de Ameaças e Riscos Institucionais</p>
      <Grid1Mobile cols={2} gap={16}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "12px" }}>Score de Risco Institucional</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="120" height="120" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="#1E293B" strokeWidth="12" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="#F97316" strokeWidth="12"
                strokeDasharray={`${(scoreRisco / 100) * 377} 377`} strokeLinecap="round" transform="rotate(-90 70 70)" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#F97316" }}>{scoreRisco}</div>
              <div style={{ fontSize: "10px", color: "#94A3B8" }}>/ 100</div>
            </div>
          </div>
          <div style={{ marginTop: "10px", color: "#F97316", fontWeight: "bold", fontSize: "13px" }}>Risco: Moderado</div>
        </Card>
        <Card>
          <h2 style={{ fontSize: "14px", margin: "0 0 14px" }}>Índice de Ameaças</h2>
          {inteligenciaAmeacas.map((a, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px" }}>{a.categoria}</span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ color: a.cor, fontSize: "12px" }}>{a.tendencia}</span>
                  <span style={{ color: "#94A3B8", fontSize: "11px" }}>{a.nivel}</span>
                </div>
              </div>
              <ProgressBar valor={a.nivel} color={a.cor} />
            </div>
          ))}
        </Card>
      </Grid1Mobile>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
          <h2 style={{ fontSize: "15px", margin: 0 }}>Briefing Executivo — Junho 2026</h2>
          <span style={{ color: "#94A3B8", fontSize: "11px" }}>01/06/2026</span>
        </div>
        {[
          { titulo: "Aumento de fraudes via engenharia social", nivel: "ALTO", resumo: "Incremento de 34% em tentativas de phishing direcionado a colaboradores com acesso a sistemas financeiros." },
          { titulo: "Vulnerabilidade em VPN corporativa", nivel: "MÉDIO", resumo: "CVE com score 7.8. Recomenda-se atualização urgente do firmware nos próximos 15 dias." },
          { titulo: "Risco regulatório — CMN 4.557", nivel: "MÉDIO", resumo: "Aderência em 78%. Plano de adequação em execução com prazo em agosto/2026." },
        ].map((b, i) => {
          const s = getSeverityStyle(b.nivel);
          return (
            <div key={i} style={{ background: "#020617", padding: "14px 16px", borderRadius: "10px", marginBottom: i < 2 ? "8px" : 0, border: "1px solid #1E293B" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                <div style={{ padding: "2px 8px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "10px", fontWeight: "bold" }}>{b.nivel}</div>
                <span style={{ fontWeight: "bold", fontSize: "12px" }}>{b.titulo}</span>
              </div>
              <div style={{ color: "#94A3B8", fontSize: "12px", lineHeight: "1.5" }}>{b.resumo}</div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ── TELA: GRC 360° ──
function GRC360() {
  const isMobile = useIsMobile();
  const [aba, setAba] = useState<"colaboradores" | "terceiros" | "fornecedores">("colaboradores");
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const dados = aba === "colaboradores" ? colaboradores360 : aba === "terceiros" ? terceiros360 : fornecedores360;
  const filtrados = dados.filter((t: any) => t.nome.toLowerCase().includes(busca.toLowerCase()));
  const abas = [
    { key: "colaboradores", label: "Colaboradores", alto: colaboradores360.filter(c => c.risco === "ALTO").length },
    { key: "terceiros", label: "Terceiros", alto: terceiros360.filter(c => c.risco === "ALTO").length },
    { key: "fornecedores", label: "Fornecedores", alto: fornecedores360.filter(c => c.risco === "ALTO").length },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: isMobile ? "22px" : "32px", margin: 0 }}>GRC 360°</h2>
          <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: "4px", marginBottom: 0 }}>Avaliação Contínua — Colaboradores · Terceiros · Fornecedores</p>
        </div>
        <div style={{ background: "#3B82F622", border: "1px solid #3B82F6", borderRadius: "10px", padding: "8px 14px", color: "#3B82F6", fontWeight: "bold", fontSize: "12px" }}>Ativo</div>
      </div>

      <Grid cols={4} gap={12}>
        {[
          { label: "Total Monitorados", val: colaboradores360.length + terceiros360.length + fornecedores360.length, color: "#3B82F6" },
          { label: "Score Médio", val: 74, color: "#10B981" },
          { label: "Risco Alto", val: colaboradores360.filter(c => c.risco === "ALTO").length + terceiros360.filter(c => c.risco === "ALTO").length + fornecedores360.filter(c => c.risco === "ALTO").length, color: "#EF4444" },
          { label: "Dossiês Gerados", val: 43, color: "#8B5CF6" },
        ].map((k, i) => (
          <Card key={i}>
            <div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </Card>
        ))}
      </Grid>

      {/* ABAS */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {abas.map(a => (
          <button key={a.key} onClick={() => { setAba(a.key as any); setBusca(""); setSelecionado(null); }}
            style={{ flex: 1, padding: isMobile ? "10px 6px" : "12px 14px", borderRadius: "12px", border: aba === a.key ? "1px solid #3B82F6" : "1px solid #1E293B", background: aba === a.key ? "#3B82F622" : "#111827", color: aba === a.key ? "#3B82F6" : "#94A3B8", fontWeight: aba === a.key ? "bold" : "normal", cursor: "pointer", fontSize: isMobile ? "11px" : "13px" }}>
            {a.label}
            {a.alto > 0 && <span style={{ marginLeft: "5px", background: "#EF444433", color: "#EF4444", borderRadius: "999px", padding: "1px 6px", fontSize: "10px" }}>{a.alto}</span>}
          </button>
        ))}
      </div>

      <Card>
        <input type="text" placeholder={`Buscar ${aba}...`} value={busca} onChange={e => setBusca(e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "13px", marginBottom: "12px", boxSizing: "border-box", outline: "none" }} />
        {filtrados.map((t: any, i: number) => {
          const r = getRiscoStyle(t.risco);
          const isOpen = selecionado === t.nome;
          return (
            <div key={i} onClick={() => setSelecionado(isOpen ? null : t.nome)}
              style={{ background: "#020617", padding: "14px 16px", borderRadius: "10px", marginBottom: "8px", border: isOpen ? "1px solid #3B82F6" : "1px solid #1E293B", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: "bold", fontSize: "13px", marginBottom: "2px" }}>{t.nome}</div>
                  <div style={{ color: "#64748B", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.cargo ? `${t.cargo}` : `${t.tipo}`}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#94A3B8", fontSize: "9px" }}>Score</div>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: t.score >= 80 ? "#10B981" : t.score >= 60 ? "#F97316" : "#EF4444" }}>{t.score}</div>
                  </div>
                  <div style={{ padding: "3px 8px", borderRadius: "999px", background: r.bg, color: r.color, fontSize: "10px", fontWeight: "bold" }}>{t.risco}</div>
                </div>
              </div>
              {isOpen && (
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #1E293B" }}>
                  {t.alertas.length > 0 && (
                    <div style={{ background: "#EF444411", border: "1px solid #EF444433", borderRadius: "8px", padding: "10px 12px", marginBottom: "10px" }}>
                      <div style={{ color: "#EF4444", fontSize: "11px", fontWeight: "bold", marginBottom: "4px" }}>⚠ Alertas</div>
                      {t.alertas.map((a: string, j: number) => <div key={j} style={{ color: "#FCA5A5", fontSize: "11px", marginBottom: "2px" }}>• {a}</div>)}
                    </div>
                  )}
                  <Grid cols={3} gap={8}>
                    {[
                      { label: "Pendências", val: `${t.pendencias}`, alert: t.pendencias > 0 },
                      { label: "Cadastro Federal", val: "Regular", alert: false },
                      { label: "Lista Restritiva", val: t.risco === "ALTO" ? "Encontrado" : "Negativo", alert: t.risco === "ALTO" },
                      { label: "Exposição Pública", val: t.risco === "ALTO" ? "Alta" : "Baixa", alert: t.risco === "ALTO" },
                      { label: "Dados Jurídicos", val: t.pendencias > 0 ? "Ações em curso" : "Nenhuma", alert: t.pendencias > 0 },
                      { label: "Recomendação", val: t.risco === "ALTO" ? "Due diligence" : "Monitoramento", alert: t.risco === "ALTO" },
                    ].map((d, j) => (
                      <div key={j} style={{ background: "#0F172A", padding: "8px 10px", borderRadius: "6px" }}>
                        <div style={{ color: "#64748B", fontSize: "9px", marginBottom: "2px" }}>{d.label}</div>
                        <div style={{ fontSize: "11px", fontWeight: "bold", color: d.alert ? "#EF4444" : "#10B981" }}>{d.val}</div>
                      </div>
                    ))}
                  </Grid>
                  <div style={{ marginTop: "8px", padding: "8px 10px", background: "#3B82F611", borderRadius: "6px", border: "1px solid #3B82F633", color: "#3B82F6", fontSize: "11px" }}>
                    📄 Gerar dossiê completo (Nacional/Internacional)
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ── DADOS: TERRORISMO & CRIME ORGANIZADO ──
const alertasTerrorismo = [
  { nome: "Roberto Souza", doc: "CPF ***789-01", tipo: "PF", cargo: "Diretor Comercial", vinculo: "PCC", nivel: "CRÍTICO", data: "01/06/2026" },
  { nome: "DataHub Brasil Ltda.", doc: "CNPJ 45.123.678/0001-55", tipo: "PJ", cargo: "Integração de Dados", vinculo: "PCC", nivel: "CRÍTICO", data: "29/05/2026" },
  { nome: "Logística Rápida S.A.", doc: "CNPJ 78.901.234/0001-11", tipo: "PJ", cargo: "Transporte", vinculo: "CV", nivel: "ALTO", data: "27/05/2026" },
  { nome: "Marcos Vinicius Lima", doc: "CPF ***321-88", tipo: "PF", cargo: "Sócio", vinculo: "CV", nivel: "ALTO", data: "25/05/2026" },
  { nome: "Print Express S.A.", doc: "CNPJ 55.666.777/0001-88", tipo: "PJ", cargo: "Impressão/Documentos", vinculo: "PCC", nivel: "MÉDIO", data: "22/05/2026" },
  { nome: "Carla Mendonça", doc: "CPF ***112-33", tipo: "PF", cargo: "Representante Comercial", vinculo: "CV", nivel: "MÉDIO", data: "19/05/2026" },
];

const timelineTerrorismo = [
  { hora: "Hoje 14:32", texto: "Novo vínculo PCC confirmado: DataHub Brasil adicionado à base restritiva", cor: "#EF4444" },
  { hora: "Hoje 11:15", texto: "Alteração societária suspeita detectada em Logística Rápida S.A.", cor: "#F97316" },
  { hora: "Ontem 19:44", texto: "Correspondência com lista COAF: 3 novos CPFs identificados como PEPs", cor: "#EF4444" },
  { hora: "Ontem 16:02", texto: "Transação atípica acima de R$ 500k sem lastro — Print Express", cor: "#F97316" },
  { hora: "Ontem 09:30", texto: "Atualização da base: +12 registros adicionados (PCC: 8, CV: 4)", cor: "#10B981" },
  { hora: "2 dias atrás", texto: "Relatório de inteligência: 5 fornecedores em risco elevado", cor: "#EF4444" },
];

const redFlagsCGU = [
  {
    num: "01", titulo: "Estrutura Societária", ativo: true,
    itens: [
      { texto: "Mudanças frequentes de sócios sem justificativa", flag: true },
      { texto: "Dificuldade em identificar beneficiário final", flag: true },
      { texto: "Empresa recém-constituída (< 12 meses)", flag: true },
      { texto: "Múltiplos CNPJs no mesmo endereço", flag: false },
      { texto: "Sem website ou presença digital", flag: false },
    ]
  },
  {
    num: "02", titulo: "Operações Financeiras", ativo: true,
    itens: [
      { texto: "Fluxos financeiros complexos ou circulares", flag: true },
      { texto: "Inconsistência de valores com mercado", flag: true },
      { texto: "Uso excessivo de dinheiro em espécie", flag: false },
      { texto: "Transferências internacionais sem justificativa", flag: false },
      { texto: "Inconsistências contábeis", flag: false },
    ]
  },
  {
    num: "03", titulo: "Atividade Operacional", ativo: false,
    itens: [
      { texto: "Falta de infraestrutura compatível", flag: false },
      { texto: "Sede em endereço residencial", flag: false },
      { texto: "Volume incompatível com estrutura", flag: false },
      { texto: "CNAE incompatível com atividades", flag: false },
      { texto: "Sem histórico para contratos relevantes", flag: false },
    ]
  },
  {
    num: "04", titulo: "Relacionamentos Comerciais", ativo: true,
    itens: [
      { texto: "Ligado a pessoas investigadas", flag: true },
      { texto: "Relutância em fornecer documentação", flag: true },
      { texto: "Intermediários sem justificativa", flag: false },
      { texto: "Transações atípicas para o setor", flag: false },
    ]
  },
  {
    num: "05", titulo: "Comportamento Organizacional", ativo: false,
    itens: [
      { texto: "Sem programa de integridade", flag: false },
      { texto: "Resistência a cláusulas de compliance", flag: false },
      { texto: "Urgência incomum para fechar negócio", flag: false },
      { texto: "Inclusão em listas CEIS, CNEP, OFAC", flag: false },
      { texto: "Mídias negativas / múltiplos processos", flag: false },
    ]
  },
  {
    num: "06", titulo: "Indicadores Adicionais", ativo: false,
    itens: [
      { texto: "Setor vulnerável (combustível, logística)", flag: false },
      { texto: "Empresa detida por offshores", flag: false },
      { texto: "Autuações por órgãos de fiscalização", flag: false },
      { texto: "Atuação em área de fronteira ou conflito", flag: false },
    ]
  },
];

// ── TELA: TERRORISMO & CRIME ORGANIZADO ──
function Terrorismo360() {
  const isMobile = useIsMobile();
  const [busca, setBusca] = useState("");
  const [filtroVinculo, setFiltroVinculo] = useState("Todos");
  const [consultado, setConsultado] = useState<typeof alertasTerrorismo[0] | null>(null);
  const [buscando, setBuscando] = useState(false);

  const filtrados = alertasTerrorismo.filter(a => {
    const matchBusca = a.nome.toLowerCase().includes(busca.toLowerCase()) || a.doc.includes(busca);
    const matchVinculo = filtroVinculo === "Todos" || a.vinculo === filtroVinculo;
    return matchBusca && matchVinculo;
  });

  const handleConsultar = () => {
    if (!busca) return;
    setBuscando(true);
    setTimeout(() => {
      const found = alertasTerrorismo.find(a =>
        a.nome.toLowerCase().includes(busca.toLowerCase()) || a.doc.includes(busca)
      );
      setConsultado(found || null);
      setBuscando(false);
    }, 900);
  };

  const nPCC = alertasTerrorismo.filter(a => a.vinculo === "PCC").length;
  const nCV = alertasTerrorismo.filter(a => a.vinculo === "CV").length;
  const nCritico = alertasTerrorismo.filter(a => a.nivel === "CRÍTICO").length;

  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: isMobile ? "20px" : "32px", margin: 0 }}>
          GRC 360° <span style={{ color: "#EF4444" }}>— Terrorismo & Crime Organizado</span>
        </h2>
        <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: "6px", marginBottom: "8px" }}>
          Base de dados integrada · PCC · CV · Organizações Criminosas Transnacionais
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#EF444422", border: "1px solid #EF4444", borderRadius: "8px", padding: "6px 14px", color: "#EF4444", fontWeight: "bold", fontSize: "11px" }}>
          ⚠ PCC e CV designados como organizações terroristas — Departamento de Estado dos EUA · Mai/2026
        </div>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs ── */}
      <Grid cols={isMobile ? 2 : 5} gap={12}>
        <Card><div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>Alertas Críticos Ativos</div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#EF4444" }}>{nCritico}</div></Card>
        <Card><div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>Vínculos PCC</div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#EF4444" }}>{nPCC}</div></Card>
        <Card><div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>Vínculos CV</div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#F97316" }}>{nCV}</div></Card>
        <Card><div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>Entidades Monitoradas</div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#F97316" }}>138</div></Card>
        <Card><div style={{ color: "#94A3B8", fontSize: "10px", marginBottom: "6px" }}>Consultas (30d)</div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#3B82F6" }}>412</div></Card>
      </Grid>
      {/* ── FIM KPIs ── */}

      {/* ── BUSCA ATIVA ── */}
      <Card style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: isMobile ? "wrap" : "nowrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou CNPJ..."
            value={busca}
            onChange={e => { setBusca(e.target.value); setConsultado(null); }}
            onKeyDown={e => e.key === "Enter" && handleConsultar()}
            style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "13px", outline: "none", minWidth: "160px" }}
          />
          <select
            value={filtroVinculo}
            onChange={e => setFiltroVinculo(e.target.value)}
            style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #1E293B", background: "#020617", color: "#94A3B8", fontSize: "12px", outline: "none" }}
          >
            <option>Todos</option>
            <option>PCC</option>
            <option>CV</option>
          </select>
          <button
            onClick={handleConsultar}
            disabled={buscando || !busca}
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: buscando || !busca ? "#1E293B" : "#EF4444", color: buscando || !busca ? "#64748B" : "white", fontWeight: "bold", fontSize: "12px", cursor: buscando || !busca ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}
          >
            {buscando ? "Consultando..." : "🔍 Consultar Base"}
          </button>
        </div>

        {/* ── RESULTADO DA CONSULTA ── */}
        {consultado && (
          <div style={{ marginTop: "14px", background: "#020617", border: "1px solid #EF444466", borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "2px" }}>{consultado.nome}</div>
                <div style={{ color: "#64748B", fontSize: "12px" }}>{consultado.doc} · {consultado.cargo}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#EF4444" }}>91</div>
                <div style={{ fontSize: "10px", color: "#94A3B8" }}>Score de Risco</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
              <div style={{ padding: "3px 10px", borderRadius: "999px", background: "#EF444422", color: "#EF4444", border: "1px solid #EF444444", fontSize: "11px", fontWeight: "bold" }}>
                ● {consultado.vinculo} — Vínculo Confirmado
              </div>
              <div style={{ padding: "3px 10px", borderRadius: "999px", ...getSeverityStyle(consultado.nivel), fontSize: "11px", fontWeight: "bold" }}>{consultado.nivel}</div>
              <div style={{ padding: "3px 10px", borderRadius: "999px", background: "#8B5CF622", color: "#8B5CF6", border: "1px solid #8B5CF644", fontSize: "11px", fontWeight: "bold" }}>Lista COAF</div>
              <div style={{ padding: "3px 10px", borderRadius: "999px", background: "#3B82F622", color: "#3B82F6", border: "1px solid #3B82F644", fontSize: "11px", fontWeight: "bold" }}>Investigado PF</div>
            </div>
            <Grid cols={isMobile ? 2 : 3} gap={8}>
              {[
                { label: "Beneficiário Final", val: "Não identificado", alert: true },
                { label: "Cadastro Federal", val: "Irregular", alert: true },
                { label: "Lista Restritiva", val: "OFAC + COAF", alert: true },
                { label: "Constituição", val: "8 meses (recente)", alert: true },
                { label: "Ações Judiciais", val: "7 em curso", alert: true },
                { label: "Recomendação", val: "Bloquear imediatamente", alert: true },
              ].map((d, i) => (
                <div key={i} style={{ background: "#0F172A", borderRadius: "8px", padding: "8px 10px" }}>
                  <div style={{ color: "#64748B", fontSize: "10px", marginBottom: "2px" }}>{d.label}</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", color: d.alert ? "#EF4444" : "#10B981" }}>{d.val}</div>
                </div>
              ))}
            </Grid>
          </div>
        )}

        {busca && !buscando && consultado === null && (
          <div style={{ marginTop: "12px", padding: "12px 14px", background: "#10B98111", border: "1px solid #10B98133", borderRadius: "8px", color: "#10B981", fontSize: "12px" }}>
            ✓ Nenhum vínculo encontrado na base para "{busca}" — registro não consta em PCC ou CV
          </div>
        )}
      </Card>
      {/* ── FIM BUSCA ── */}

      {/* ── ALERTAS + TIMELINE ── */}
      <Grid1Mobile cols={2} gap={16}>

        {/* ── ALERTAS ── */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>Alertas — Base PCC/CV</span>
            <span style={{ color: "#EF4444", fontSize: "11px", fontWeight: "bold" }}>● Atualização contínua</span>
          </div>
          {filtrados.map((a, i) => {
            const s = getSeverityStyle(a.nivel);
            return (
              <div key={i} style={{ background: "#020617", border: "1px solid #1E293B", borderRadius: "10px", padding: "12px 14px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "2px" }}>{a.nome}</div>
                  <div style={{ color: "#64748B", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.doc} · {a.data}</div>
                </div>
                <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                  <div style={{ padding: "2px 8px", borderRadius: "999px", background: a.vinculo === "PCC" ? "#EF444422" : "#F9731622", color: a.vinculo === "PCC" ? "#EF4444" : "#F97316", border: `1px solid ${a.vinculo === "PCC" ? "#EF444444" : "#F9731644"}`, fontSize: "10px", fontWeight: "bold" }}>{a.vinculo}</div>
                  <div style={{ padding: "2px 8px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "10px", fontWeight: "bold" }}>{a.nivel}</div>
                </div>
              </div>
            );
          })}
          {filtrados.length === 0 && (
            <div style={{ color: "#64748B", fontSize: "12px", textAlign: "center", padding: "20px 0" }}>Nenhum alerta encontrado</div>
          )}
        </Card>
        {/* ── FIM ALERTAS ── */}

        {/* ── TIMELINE ── */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>Timeline — Eventos de Risco</span>
            <span style={{ color: "#94A3B8", fontSize: "11px" }}>Últimas 72h</span>
          </div>
          {timelineTerrorismo.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", paddingBottom: "10px", marginBottom: "10px", borderBottom: i < timelineTerrorismo.length - 1 ? "1px solid #1E293B" : "none" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.cor, marginTop: "4px", flexShrink: 0 }} />
              <div>
                <div style={{ color: "#64748B", fontSize: "10px", marginBottom: "2px" }}>{t.hora}</div>
                <div style={{ fontSize: "12px", lineHeight: "1.4" }}>{t.texto}</div>
              </div>
            </div>
          ))}
        </Card>
        {/* ── FIM TIMELINE ── */}

      </Grid1Mobile>
      {/* ── FIM ALERTAS + TIMELINE ── */}

      {/* ── RED FLAGS CGU-ICC ── */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>Red Flags — CGU-ICC · Crime Organizado</span>
          <span style={{ color: "#F97316", fontSize: "11px" }}>⚠ 3 grupos com alertas ativos</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: "10px" }}>
          {redFlagsCGU.map((rf, i) => (
            <div key={i} style={{ background: rf.ativo ? "#EF444408" : "#020617", border: `1px solid ${rf.ativo ? "#EF444466" : "#1E293B"}`, borderRadius: "10px", padding: "14px" }}>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: rf.ativo ? "#EF4444" : "#64748B", marginBottom: "4px" }}>{rf.num}</div>
              <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "8px" }}>{rf.titulo}</div>
              <ul style={{ listStyle: "none" }}>
                {rf.itens.map((item, j) => (
                  <li key={j} style={{ fontSize: "11px", color: item.flag ? "#FCA5A5" : "#64748B", paddingLeft: "12px", position: "relative", marginBottom: "3px" }}>
                    <span style={{ position: "absolute", left: 0, color: item.flag ? "#EF4444" : "#334155" }}>•</span>
                    {item.texto}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
      {/* ── FIM RED FLAGS CGU-ICC ── */}

    </div>
  );
}
// ── FIM TELA TERRORISMO ──

// ── APP PRINCIPAL ──
export default function App() {
  const [logado, setLogado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [activeNav, setActiveNav] = useState(0);
  const [menuAberto, setMenuAberto] = useState(false);
  const isMobile = useIsMobile();

  const handleLogin = (nome: string, cliente: string) => { setNomeUsuario(nome); setNomeCliente(cliente); setLogado(true); };
  const handleLogout = () => { setLogado(false); setNomeUsuario(""); setNomeCliente(""); setActiveNav(0); };

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
      case 7: return <Terrorismo360 />;
      default: return <DashboardExecutivo />;
    }
  };

  return (
    <div style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", display: "flex", flexDirection: "column" }}>

      {/* TOPBAR MOBILE */}
      {isMobile && <TopBar menuAberto={menuAberto} setMenuAberto={setMenuAberto} titulo={navItems[activeNav]} />}

      {/* LAYOUT PRINCIPAL */}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} nomeUsuario={nomeUsuario} nomeCliente={nomeCliente} onLogout={handleLogout} isMobile={isMobile} menuAberto={menuAberto} setMenuAberto={setMenuAberto} />

        {/* CONTEÚDO */}
        <div style={{ flex: 1, padding: isMobile ? "16px" : "32px 36px", overflowY: "auto", minWidth: 0 }}>
          {renderTela()}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #1E293B", background: "#0F172A", color: "#94A3B8", fontSize: "11px", textAlign: "center", padding: "12px 20px" }}>
        GRC Inspector © 2026 — Intelligence Platform
      </div>

    </div>
  );
}
