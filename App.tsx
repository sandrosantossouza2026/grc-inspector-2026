import React, { useState, useEffect, useRef } from "react";

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

const timeline = [
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

const terceiros360 = [
  { nome: "TechSupply Ltda.", tipo: "Fornecedor TI", cpfcnpj: "12.345.678/0001-99", score: 92, risco: "BAIXO", pendencias: 0 },
  { nome: "Consult Partners S.A.", tipo: "Consultoria", cpfcnpj: "98.765.432/0001-11", score: 61, risco: "MÉDIO", pendencias: 3 },
  { nome: "DataHub Brasil", tipo: "Integração Dados", cpfcnpj: "45.123.678/0001-55", score: 34, risco: "ALTO", pendencias: 7 },
  { nome: "SecureNet Corp", tipo: "Segurança TI", cpfcnpj: "77.888.999/0001-22", score: 95, risco: "BAIXO", pendencias: 0 },
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

// ── TELA: DASHBOARD EXECUTIVO ──
function DashboardExecutivo() {
  const conformidadeData = [78, 82, 80, 85, 88, 90, 92];
  const alertasData = [22, 25, 19, 28, 21, 18, 18];
  const meses = ["Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", gap: "20px" }}>
        <div>
          <h2 style={{ fontSize: "38px", margin: 0 }}>Executive Overview</h2>
          <p style={{ color: "#94A3B8", fontSize: "15px", marginTop: "8px" }}>
            Centro Integrado de Inteligência, Compliance e Proteção Institucional
          </p>
        </div>
        <div style={{ background: "#111827", padding: "18px 24px", borderRadius: "18px", border: "1px solid #1E293B", flexShrink: 0 }}>
          <div style={{ color: "#94A3B8", fontSize: "13px", marginBottom: "6px" }}>Status Operacional</div>
          <div style={{ color: "#10B981", fontSize: "22px", fontWeight: "bold" }}>● Operacional 24x7</div>
        </div>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "30px" }}>
        {[
          { title: "Ativos Monitorados", value: 5000, suffix: "", color: "white" },
          { title: "Alertas Críticos", value: 18, suffix: "", color: "#EF4444" },
          { title: "Compliance BACEN", value: 92, suffix: "%", color: "#10B981" },
          { title: "Disponibilidade", value: 99, suffix: ".2%", color: "#10B981" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "13px", marginBottom: "12px" }}>{k.title}</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: k.color }}>
              <AnimatedNumber target={k.value} suffix={k.suffix} />
            </div>
          </div>
        ))}
      </div>
      {/* ── FIM KPIs ── */}

      {/* ── GRÁFICOS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>Conformidade BACEN (%)</span>
            <span style={{ color: "#10B981", fontSize: "13px" }}>Últimos 7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            {meses.map((m, i) => (
              <span key={i} style={{ color: "#94A3B8", fontSize: "11px" }}>{m}</span>
            ))}
          </div>
          <LineChart data={conformidadeData} color="#10B981" />
        </div>
        <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>Alertas por Mês</span>
            <span style={{ color: "#EF4444", fontSize: "13px" }}>Últimos 7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            {meses.map((m, i) => (
              <span key={i} style={{ color: "#94A3B8", fontSize: "11px" }}>{m}</span>
            ))}
          </div>
          <LineChart data={alertasData} color="#EF4444" />
        </div>
      </div>
      {/* ── FIM GRÁFICOS ── */}

      {/* ── ALERTAS ESTRATÉGICOS ── */}
      <div style={{ background: "#111827", padding: "28px", borderRadius: "20px", border: "1px solid #1E293B", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", margin: 0 }}>Alertas Estratégicos</h2>
          <span style={{ color: "#10B981", fontSize: "13px" }}>● Atualização em tempo real</span>
        </div>
        {alertas.map((a, i) => {
          const s = getSeverityStyle(a.severity);
          return (
            <div key={i} style={{ background: "#020617", padding: "18px 22px", borderRadius: "14px", marginBottom: i < alertas.length - 1 ? "12px" : 0, border: "1px solid #1E293B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "15px", marginBottom: "4px" }}>{a.title}</div>
                <div style={{ color: "#94A3B8", fontSize: "12px" }}>Fonte: {a.source}</div>
              </div>
              <div style={{ padding: "6px 14px", borderRadius: "999px", background: s.bg, color: s.color, fontWeight: "bold", fontSize: "12px", flexShrink: 0 }}>{a.severity}</div>
            </div>
          );
        })}
      </div>
      {/* ── FIM ALERTAS ESTRATÉGICOS ── */}

      {/* ── TIMELINE ── */}
      <div style={{ background: "#111827", padding: "28px", borderRadius: "20px", border: "1px solid #1E293B" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", margin: 0 }}>Timeline Operacional</h2>
          <span style={{ color: "#94A3B8", fontSize: "13px" }}>Últimos eventos correlacionados</span>
        </div>
        {timeline.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: i < timeline.length - 1 ? "12px" : 0, padding: "14px 18px", background: "#020617", borderRadius: "12px", border: "1px solid #1E293B" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, marginRight: "16px", flexShrink: 0 }} />
            <div style={{ width: "70px", color: "#94A3B8", fontSize: "13px" }}>{item.time}</div>
            <div style={{ fontSize: "14px" }}>{item.event}</div>
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
      const novoEvento = {
        id: counter++,
        tipo: nomes[Math.floor(Math.random() * nomes.length)],
        ativo: ativos[Math.floor(Math.random() * ativos.length)],
        hora,
        nivel: niveis[Math.floor(Math.random() * niveis.length)],
      };
      setEventos(prev => [novoEvento, ...prev.slice(0, 9)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2 style={{ fontSize: "38px", margin: 0 }}>Centro Operacional</h2>
          <p style={{ color: "#94A3B8", fontSize: "15px", marginTop: "8px" }}>Monitoramento contínuo 24x7 — eventos em tempo real</p>
        </div>
        <div style={{ background: "#EF444422", border: "1px solid #EF4444", borderRadius: "12px", padding: "10px 20px", color: "#EF4444", fontWeight: "bold" }}>
          ● AO VIVO
        </div>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs OPERACIONAIS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "28px" }}>
        {[
          { label: "Eventos / hora", val: 1247, color: "#3B82F6" },
          { label: "Ativos online", val: 4983, color: "#10B981" },
          { label: "Alertas abertos", val: 18, color: "#EF4444" },
          { label: "MTTR médio (min)", val: 12, color: "#F97316" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "10px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: k.color }}><AnimatedNumber target={k.val} /></div>
          </div>
        ))}
      </div>
      {/* ── FIM KPIs OPERACIONAIS ── */}

      {/* ── EVENTOS AO VIVO ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Feed de Eventos — Correlação Analítica</h2>
          <span style={{ color: "#10B981", fontSize: "12px" }}>Novo evento a cada 5s</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 160px 100px", gap: "0", marginBottom: "10px", padding: "0 16px" }}>
          {["Hora", "Evento", "Ativo", "Nível"].map((h, i) => (
            <div key={i} style={{ color: "#64748B", fontSize: "12px", fontWeight: "bold" }}>{h}</div>
          ))}
        </div>
        {eventos.map((e, i) => {
          const s = getSeverityStyle(e.nivel);
          return (
            <div key={e.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr 160px 100px", gap: "0", padding: "12px 16px", background: i === 0 ? "#10B98108" : "#020617", borderRadius: "10px", marginBottom: "6px", border: i === 0 ? "1px solid #10B98133" : "1px solid #1E293B", transition: "all 0.3s" }}>
              <div style={{ color: "#94A3B8", fontSize: "13px" }}>{e.hora}</div>
              <div style={{ fontSize: "14px" }}>{e.tipo}</div>
              <div style={{ color: "#64748B", fontSize: "13px", fontFamily: "monospace" }}>{e.ativo}</div>
              <div style={{ padding: "3px 10px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: "bold", width: "fit-content" }}>{e.nivel}</div>
            </div>
          );
        })}
      </div>
      {/* ── FIM EVENTOS AO VIVO ── */}

      {/* ── BARRAS DE CATEGORIA ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "18px", margin: "0 0 20px" }}>Alertas por Categoria</h2>
        {[
          { cat: "Fraude Financeira", qtd: 7, total: 18, color: "#EF4444" },
          { cat: "Acesso Privilegiado", qtd: 5, total: 18, color: "#F97316" },
          { cat: "Movimentação de Dados", qtd: 3, total: 18, color: "#EAB308" },
          { cat: "Autenticação", qtd: 2, total: 18, color: "#3B82F6" },
          { cat: "Outros", qtd: 1, total: 18, color: "#94A3B8" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px" }}>{item.cat}</span>
              <span style={{ fontSize: "13px", color: "#94A3B8" }}>{item.qtd} alertas</span>
            </div>
            <ProgressBar valor={(item.qtd / item.total) * 100} color={item.color} />
          </div>
        ))}
      </div>
      {/* ── FIM BARRAS DE CATEGORIA ── */}
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
      {/* ── HEADER ── */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "38px", margin: 0 }}>Compliance & GRC</h2>
        <p style={{ color: "#94A3B8", fontSize: "15px", marginTop: "8px" }}>Governança, Riscos e Conformidade — LGPD · BACEN · CMN · ISO 27001</p>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── SCORE DE MATURIDADE ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "24px" }}>
        <div style={{ background: "#111827", padding: "28px", borderRadius: "20px", border: "1px solid #1E293B", textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: "13px", marginBottom: "16px" }}>Score de Maturidade GRC</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="#1E293B" strokeWidth="12" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="#10B981" strokeWidth="12"
                strokeDasharray={`${(scoreMaturidade / 100) * 377} 377`}
                strokeLinecap="round" transform="rotate(-90 70 70)" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#10B981" }}>{scoreMaturidade}</div>
              <div style={{ fontSize: "11px", color: "#94A3B8" }}>/ 100</div>
            </div>
          </div>
          <div style={{ marginTop: "12px", color: "#10B981", fontWeight: "bold" }}>Nível: Gerenciado</div>
        </div>
        <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontWeight: "bold" }}>Evolução da Maturidade GRC</span>
            <span style={{ color: "#10B981", fontSize: "13px" }}>+29pts em 7 meses</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            {meses.map((m, i) => <span key={i} style={{ color: "#94A3B8", fontSize: "11px" }}>{m}</span>)}
          </div>
          <LineChart data={maturidadeData} color="#10B981" />
        </div>
      </div>
      {/* ── FIM SCORE DE MATURIDADE ── */}

      {/* ── NORMATIVOS ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "18px", margin: "0 0 20px" }}>Aderência por Normativo</h2>
        {complianceNormas.map((n, i) => (
          <div key={i} style={{ background: "#020617", borderRadius: "14px", padding: "18px 20px", marginBottom: i < complianceNormas.length - 1 ? "12px" : 0, border: "1px solid #1E293B" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "15px" }}>{n.title}</span>
                <span style={{ color: "#64748B", fontSize: "12px", marginLeft: "12px" }}>Última auditoria: {n.ultima}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: n.color }}>{n.valor}%</span>
                <div style={{ padding: "4px 12px", borderRadius: "999px", background: n.valor >= 90 ? "#10B98122" : "#F9731622", color: n.color, fontSize: "12px", fontWeight: "bold" }}>{n.status}</div>
              </div>
            </div>
            <ProgressBar valor={n.valor} color={n.color} />
          </div>
        ))}
      </div>
      {/* ── FIM NORMATIVOS ── */}
    </div>
  );
}

// ── TELA: TSCM ──
function TSCM() {
  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" }}>
        <div>
          <h2 style={{ fontSize: "38px", margin: 0 }}>TSCM</h2>
          <p style={{ color: "#94A3B8", fontSize: "15px", marginTop: "8px" }}>Technical Surveillance Counter-Measures — Contraespionagem Eletrônica</p>
        </div>
        <div style={{ background: "#10B98122", border: "1px solid #10B981", borderRadius: "12px", padding: "10px 20px", color: "#10B981", fontWeight: "bold" }}>
          Programa Ativo
        </div>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs TSCM ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "28px" }}>
        {[
          { label: "Varreduras em 2026", val: "23", color: "#10B981" },
          { label: "Ambientes Cobertos", val: "14", color: "#3B82F6" },
          { label: "Alertas Detectados", val: "1", color: "#EF4444" },
          { label: "Próxima Varredura", val: "05/06", color: "#F97316" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "10px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>
      {/* ── FIM KPIs TSCM ── */}

      {/* ── HISTÓRICO DE VARREDURAS ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", margin: "0 0 18px" }}>Histórico de Varreduras</h2>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: "0", padding: "0 16px", marginBottom: "10px" }}>
          {["Local", "Data", "Status", "Tipo"].map((h, i) => (
            <div key={i} style={{ color: "#64748B", fontSize: "12px", fontWeight: "bold" }}>{h}</div>
          ))}
        </div>
        {varredurasTSCM.map((v, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: "0", padding: "14px 16px", background: "#020617", borderRadius: "10px", marginBottom: "8px", border: "1px solid #1E293B" }}>
            <div style={{ fontSize: "14px" }}>{v.local}</div>
            <div style={{ color: "#94A3B8", fontSize: "13px" }}>{v.data}</div>
            <div style={{ padding: "3px 10px", borderRadius: "999px", background: v.status === "Limpo" ? "#10B98122" : "#EF444422", color: v.status === "Limpo" ? "#10B981" : "#EF4444", fontSize: "12px", fontWeight: "bold", width: "fit-content" }}>{v.status}</div>
            <div style={{ color: "#94A3B8", fontSize: "13px" }}>{v.tipo}</div>
          </div>
        ))}
      </div>
      {/* ── FIM HISTÓRICO DE VARREDURAS ── */}

      {/* ── COBERTURA ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "18px", margin: "0 0 18px" }}>Tipos de Varredura Realizados</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { tipo: "Eletromagnética", icon: "📡", descricao: "Detecção de sinais de RF e transmissores ocultos" },
            { tipo: "Física / Visual", icon: "🔍", descricao: "Inspeção manual de móveis, paredes e dispositivos" },
            { tipo: "Veicular", icon: "🚗", descricao: "Varredura em veículos da alta direção" },
            { tipo: "Ambiental Pós-obra", icon: "🏗️", descricao: "Inspeção após reformas em ambientes críticos" },
          ].map((t, i) => (
            <div key={i} style={{ background: "#020617", padding: "18px", borderRadius: "14px", border: "1px solid #1E293B" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{t.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "6px" }}>{t.tipo}</div>
              <div style={{ color: "#94A3B8", fontSize: "12px" }}>{t.descricao}</div>
            </div>
          ))}
        </div>
      </div>
      {/* ── FIM COBERTURA ── */}
    </div>
  );
}

// ── TELA: DFIR ──
function DFIR() {
  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "38px", margin: 0 }}>DFIR</h2>
        <p style={{ color: "#94A3B8", fontSize: "15px", marginTop: "8px" }}>Digital Forensics & Incident Response — Investigação e Resposta a Incidentes</p>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs DFIR ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "28px" }}>
        {[
          { label: "Casos em 2026", val: "41", color: "#3B82F6" },
          { label: "Em Investigação", val: "3", color: "#EF4444" },
          { label: "Taxa de Resolução", val: "94%", color: "#10B981" },
          { label: "Tempo Médio (h)", val: "18", color: "#F97316" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "10px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>
      {/* ── FIM KPIs DFIR ── */}

      {/* ── CASOS ABERTOS ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", margin: "0 0 18px" }}>Casos Registrados</h2>
        {casosDFIR.map((c, i) => {
          const s = getSeverityStyle(c.gravidade);
          const statusColor = c.status === "Em Investigação" ? "#EF4444" : c.status === "Contido" ? "#F97316" : "#10B981";
          return (
            <div key={i} style={{ background: "#020617", padding: "18px 20px", borderRadius: "14px", marginBottom: i < casosDFIR.length - 1 ? "10px" : 0, border: "1px solid #1E293B" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "monospace", color: "#64748B", fontSize: "12px" }}>{c.id}</span>
                    <div style={{ padding: "3px 10px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: "bold" }}>{c.gravidade}</div>
                    <div style={{ padding: "3px 10px", borderRadius: "999px", background: `${statusColor}22`, color: statusColor, fontSize: "11px", fontWeight: "bold" }}>{c.status}</div>
                  </div>
                  <div style={{ fontSize: "15px", marginBottom: "4px" }}>{c.descricao}</div>
                  <div style={{ color: "#64748B", fontSize: "12px" }}>Analista: {c.analista} · {c.data}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* ── FIM CASOS ABERTOS ── */}

      {/* ── CAPACIDADES FORENSES ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
        <h2 style={{ fontSize: "18px", margin: "0 0 18px" }}>Capacidades Forenses</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {[
            { cap: "Perícia em Endpoints", icon: "💻" },
            { cap: "Análise de Dispositivos Móveis", icon: "📱" },
            { cap: "Preservação de Evidências", icon: "🔒" },
            { cap: "Cadeia de Custódia Digital", icon: "📋" },
            { cap: "Análise de IoCs", icon: "🔎" },
            { cap: "Produção de Laudos Técnicos", icon: "📄" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#020617", padding: "16px", borderRadius: "12px", border: "1px solid #1E293B", textAlign: "center" }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>{c.icon}</div>
              <div style={{ fontSize: "13px", color: "#94A3B8" }}>{c.cap}</div>
            </div>
          ))}
        </div>
      </div>
      {/* ── FIM CAPACIDADES FORENSES ── */}
    </div>
  );
}

// ── TELA: INTELIGÊNCIA EXECUTIVA ──
function InteligenciaExecutiva() {
  const scoreRisco = 71;
  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "38px", margin: 0 }}>Inteligência Executiva</h2>
        <p style={{ color: "#94A3B8", fontSize: "15px", marginTop: "8px" }}>Inteligência Empresarial Estratégica — Análise de Ameaças e Riscos Institucionais</p>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── SCORE INSTITUCIONAL ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "24px" }}>
        <div style={{ background: "#111827", padding: "28px", borderRadius: "20px", border: "1px solid #1E293B", textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: "13px", marginBottom: "16px" }}>Score de Risco Institucional</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="#1E293B" strokeWidth="12" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="#F97316" strokeWidth="12"
                strokeDasharray={`${(scoreRisco / 100) * 377} 377`}
                strokeLinecap="round" transform="rotate(-90 70 70)" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#F97316" }}>{scoreRisco}</div>
              <div style={{ fontSize: "11px", color: "#94A3B8" }}>/ 100</div>
            </div>
          </div>
          <div style={{ marginTop: "12px", color: "#F97316", fontWeight: "bold" }}>Risco: Moderado</div>
        </div>
        <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B" }}>
          <h2 style={{ fontSize: "18px", margin: "0 0 18px" }}>Índice de Ameaças por Categoria</h2>
          {inteligenciaAmeacas.map((a, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px" }}>{a.categoria}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: a.cor, fontSize: "13px", fontWeight: "bold" }}>{a.tendencia}</span>
                  <span style={{ color: "#94A3B8", fontSize: "13px" }}>{a.nivel}</span>
                </div>
              </div>
              <ProgressBar valor={a.nivel} color={a.cor} />
            </div>
          ))}
        </div>
      </div>
      {/* ── FIM SCORE INSTITUCIONAL ── */}

      {/* ── BRIEFING EXECUTIVO ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Briefing Executivo — Junho 2026</h2>
          <span style={{ color: "#94A3B8", fontSize: "12px" }}>Atualizado em 01/06/2026</span>
        </div>
        {[
          { titulo: "Aumento de fraudes via engenharia social", nivel: "ALTO", resumo: "Identificado incremento de 34% em tentativas de phishing direcionado a colaboradores com acesso a sistemas financeiros." },
          { titulo: "Vulnerabilidade em VPN corporativa", nivel: "MÉDIO", resumo: "Versão atual apresenta CVE com score 7.8. Recomenda-se atualização urgente do firmware nos próximos 15 dias." },
          { titulo: "Risco regulatório — CMN 4.557", nivel: "MÉDIO", resumo: "Aderência atual em 78%. Plano de adequação em execução com prazo de conclusão em agosto/2026." },
        ].map((b, i) => {
          const s = getSeverityStyle(b.nivel);
          return (
            <div key={i} style={{ background: "#020617", padding: "18px 20px", borderRadius: "14px", marginBottom: i < 2 ? "10px" : 0, border: "1px solid #1E293B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{ padding: "3px 10px", borderRadius: "999px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: "bold" }}>{b.nivel}</div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>{b.titulo}</span>
              </div>
              <div style={{ color: "#94A3B8", fontSize: "13px", lineHeight: "1.5" }}>{b.resumo}</div>
            </div>
          );
        })}
      </div>
      {/* ── FIM BRIEFING EXECUTIVO ── */}
    </div>
  );
}

// ── TELA: GRC 360° ──
function GRC360() {
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<typeof terceiros360[0] | null>(null);

  const filtrados = terceiros360.filter(t =>
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    t.tipo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" }}>
        <div>
          <h2 style={{ fontSize: "38px", margin: 0 }}>GRC 360°</h2>
          <p style={{ color: "#94A3B8", fontSize: "15px", marginTop: "8px" }}>Due Diligence · Background Check · Análise Reputacional de Terceiros</p>
        </div>
        <div style={{ background: "#3B82F622", border: "1px solid #3B82F6", borderRadius: "12px", padding: "10px 20px", color: "#3B82F6", fontWeight: "bold" }}>
          Módulo Ativo
        </div>
      </div>
      {/* ── FIM HEADER ── */}

      {/* ── KPIs ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Terceiros Monitorados", val: "127", color: "#3B82F6" },
          { label: "Score Médio", val: "76", color: "#10B981" },
          { label: "Risco Alto", val: "8", color: "#EF4444" },
          { label: "Dossiês Gerados", val: "43", color: "#8B5CF6" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111827", padding: "20px", borderRadius: "16px", border: "1px solid #1E293B" }}>
            <div style={{ color: "#94A3B8", fontSize: "12px", marginBottom: "10px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>
      {/* ── FIM KPIs ── */}

      {/* ── BUSCA E LISTA ── */}
      <div style={{ background: "#111827", padding: "24px", borderRadius: "20px", border: "1px solid #1E293B", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Consulta de Terceiros</h2>
        </div>
        <input
          type="text"
          placeholder="Buscar por nome ou tipo..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #1E293B", background: "#020617", color: "white", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box", outline: "none" }}
        />
        {filtrados.map((t, i) => {
          const r = getRiscoStyle(t.risco);
          return (
            <div
              key={i}
              onClick={() => setSelecionado(selecionado?.nome === t.nome ? null : t)}
              style={{ background: "#020617", padding: "16px 20px", borderRadius: "14px", marginBottom: "10px", border: selecionado?.nome === t.nome ? "1px solid #3B82F6" : "1px solid #1E293B", cursor: "pointer", transition: "border 0.2s" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px", marginBottom: "4px" }}>{t.nome}</div>
                  <div style={{ color: "#64748B", fontSize: "12px" }}>{t.tipo} · CNPJ {t.cpfcnpj}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div>
                    <div style={{ color: "#94A3B8", fontSize: "11px", textAlign: "right" }}>Score</div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: t.score >= 80 ? "#10B981" : t.score >= 60 ? "#F97316" : "#EF4444" }}>{t.score}</div>
                  </div>
                  <div style={{ padding: "5px 12px", borderRadius: "999px", background: r.bg, color: r.color, fontSize: "12px", fontWeight: "bold" }}>{t.risco}</div>
                </div>
              </div>

              {/* ── DETALHE EXPANDIDO ── */}
              {selecionado?.nome === t.nome && (
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #1E293B" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    {[
                      { label: "Pendências Regulatórias", val: `${t.pendencias}`, alert: t.pendencias > 0 },
                      { label: "Cadastro Federal", val: "Regular", alert: false },
                      { label: "Lista Restritiva", val: "Negativo", alert: false },
                      { label: "Exposição Pública", val: t.risco === "ALTO" ? "Alta" : "Baixa", alert: t.risco === "ALTO" },
                      { label: "Dados Jurídicos", val: t.pendencias > 0 ? "Ações em curso" : "Nenhuma ação", alert: t.pendencias > 0 },
                      { label: "Recomendação", val: t.risco === "ALTO" ? "Due diligence aprofundada" : "Monitoramento padrão", alert: t.risco === "ALTO" },
                    ].map((d, j) => (
                      <div key={j} style={{ background: "#0F172A", padding: "12px 14px", borderRadius: "10px" }}>
                        <div style={{ color: "#64748B", fontSize: "11px", marginBottom: "4px" }}>{d.label}</div>
                        <div style={{ fontSize: "13px", fontWeight: "bold", color: d.alert ? "#EF4444" : "#10B981" }}>{d.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "12px", padding: "10px 14px", background: "#3B82F611", borderRadius: "10px", border: "1px solid #3B82F633", color: "#3B82F6", fontSize: "12px" }}>
                    📄 Clique para gerar dossiê completo (Nacional/Internacional) — relatório PDF disponível em instantes
                  </div>
                </div>
              )}
              {/* ── FIM DETALHE EXPANDIDO ── */}
            </div>
          );
        })}
      </div>
      {/* ── FIM BUSCA E LISTA ── */}
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ──
export default function App() {
  const [activeNav, setActiveNav] = useState(0);

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
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img src="/logo-grc.png" alt="GRC Solutions" style={{ width: "270px", maxWidth: "100%", filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.3))" }} />
            <div style={{ marginTop: "8px", color: "#94A3B8", fontSize: "13px" }}>Intelligence Platform</div>
          </div>
          <nav>
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveNav(index)}
                style={{ padding: "16px 18px", marginBottom: "10px", borderRadius: "14px", background: activeNav === index ? "#10B98122" : "#111827", cursor: "pointer", border: activeNav === index ? "1px solid #10B981" : "1px solid #1E293B", fontSize: "15px", transition: "all 0.2s" }}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
        {/* ── FIM SIDEBAR ── */}

        {/* ── CONTEÚDO PRINCIPAL ── */}
        <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
          {renderTela()}
        </div>
        {/* ── FIM CONTEÚDO PRINCIPAL ── */}

      </div>
      {/* ── FIM LAYOUT PRINCIPAL ── */}

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid #1E293B", background: "#0F172A", color: "#94A3B8", fontSize: "13px", textAlign: "center", padding: "16px 20px" }}>
        GRC Inspector © 2026 — Intelligence Platform
      </div>
      {/* ── FIM FOOTER ── */}

    </div>
  );
}
