import React, { useState } from "react";

const alerts = [
  {
    title: "Movimentação suspeita de dados",
    severity: "CRÍTICO",
    source: "Endpoint Financeiro",
  },
  {
    title: "Acesso privilegiado fora do padrão",
    severity: "ALTO",
    source: "VPN Corporativa",
  },
  {
    title: "Possível fraude transacional",
    severity: "MÉDIO",
    source: "Sistema Antifraude",
  },
];

const kpis = [
  { title: "Ativos e Processos Monitorados", value: "2.734", color: "white" },
  { title: "Alertas Críticos", value: "18", color: "#EF4444" },
  { title: "Compliance BACEN", value: "92%", color: "#10B981" },
  { title: "Integridade Operacional", value: "Moderado", color: "#F97316" },
];

const complianceItems = [
  { title: "LGPD", status: "Conforme", color: "#10B981" },
  { title: "BACEN", status: "92%", color: "#10B981" },
  { title: "CMN", status: "Monitorado", color: "#F97316" },
  { title: "Logs Auditáveis", status: "Ativo", color: "#10B981" },
  { title: "TSCM", status: "Operacional", color: "#10B981" },
  { title: "Disponibilidade", status: "99.2%", color: "#10B981" },
];

const timeline = [
  { time: "19:42", event: "Tentativa de acesso privilegiado", color: "#EF4444" },
  { time: "18:15", event: "Correlação antifraude identificada", color: "#F97316" },
  { time: "16:22", event: "Varredura TSCM concluída", color: "#10B981" },
];

const navItems = [
  "Dashboard Executivo",
  "Centro Operacional",
  "Compliance & GRC",
  "TSCM",
  "DFIR",
  "Inteligência Executiva",
];

function getSeverityStyle(severity: string) {
  if (severity === "CRÍTICO")
    return { bg: "#EF444422", color: "#EF4444" };
  if (severity === "ALTO")
    return { bg: "#F9731622", color: "#F97316" };
  return { bg: "#EAB30822", color: "#EAB308" };
}

export default function App() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── LAYOUT PRINCIPAL (sidebar + conteúdo) ── */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <div
          style={{
            width: "300px",
            background: "#0F172A",
            padding: "30px 20px",
            borderRight: "1px solid #1E293B",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src="/logo-grc.png"
              alt="GRC Solutions"
              style={{
                width: "270px",
                maxWidth: "100%",
                filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.3))",
              }}
            />
            <div style={{ marginTop: "8px", color: "#94A3B8", fontSize: "13px" }}>
              Intelligence Platform
            </div>
          </div>

          {/* Navegação */}
          <nav>
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveNav(index)}
                style={{
                  padding: "16px 18px",
                  marginBottom: "10px",
                  borderRadius: "14px",
                  background: activeNav === index ? "#10B98122" : "#111827",
                  cursor: "pointer",
                  border: activeNav === index ? "1px solid #10B981" : "1px solid #1E293B",
                  fontSize: "15px",
                  transition: "all 0.2s",
                }}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
        {/* ── FIM SIDEBAR ── */}

        {/* ── CONTEÚDO PRINCIPAL ── */}
        <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>

          {/* ── HEADER ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "40px",
              gap: "20px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "42px", marginBottom: "10px", margin: 0 }}>
                Executive Overview
              </h2>
              <p style={{ color: "#94A3B8", fontSize: "16px", marginTop: "10px" }}>
                Centro Integrado de Inteligência, Compliance e Proteção Institucional
              </p>
            </div>

            <div
              style={{
                background: "#111827",
                padding: "20px 25px",
                borderRadius: "18px",
                border: "1px solid #1E293B",
                flexShrink: 0,
              }}
            >
              <div style={{ color: "#94A3B8", marginBottom: "8px", fontSize: "14px" }}>
                Status Operacional
              </div>
              <div style={{ color: "#10B981", fontSize: "24px", fontWeight: "bold" }}>
                Operacional 24x7
              </div>
            </div>
          </div>
          {/* ── FIM HEADER ── */}

          {/* ── KPIs ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {kpis.map((kpi, index) => (
              <div
                key={index}
                style={{
                  background: "#111827",
                  padding: "28px",
                  borderRadius: "20px",
                  border: "1px solid #1E293B",
                }}
              >
                <div style={{ color: "#94A3B8", marginBottom: "14px", fontSize: "14px" }}>
                  {kpi.title}
                </div>
                <div style={{ fontSize: "36px", fontWeight: "bold", color: kpi.color }}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>
          {/* ── FIM KPIs ── */}

          {/* ── ALERTAS ESTRATÉGICOS ── */}
          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "24px",
              border: "1px solid #1E293B",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <h2 style={{ fontSize: "26px", margin: 0 }}>Alertas Estratégicos</h2>
              <div style={{ color: "#10B981", fontSize: "14px" }}>
                Atualização em tempo real
              </div>
            </div>

            {alerts.map((alert, index) => {
              const style = getSeverityStyle(alert.severity);
              return (
                <div
                  key={index}
                  style={{
                    background: "#020617",
                    padding: "22px 25px",
                    borderRadius: "16px",
                    marginBottom: index < alerts.length - 1 ? "16px" : 0,
                    border: "1px solid #1E293B",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "17px", marginBottom: "6px" }}>
                      {alert.title}
                    </div>
                    <div style={{ color: "#94A3B8", fontSize: "13px" }}>
                      Fonte: {alert.source}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      background: style.bg,
                      color: style.color,
                      fontWeight: "bold",
                      fontSize: "13px",
                      flexShrink: 0,
                    }}
                  >
                    {alert.severity}
                  </div>
                </div>
              );
            })}
          </div>
          {/* ── FIM ALERTAS ESTRATÉGICOS ── */}

          {/* ── TIMELINE OPERACIONAL ── */}
          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "24px",
              border: "1px solid #1E293B",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <h2 style={{ fontSize: "26px", margin: 0 }}>Timeline Operacional</h2>
              <div style={{ color: "#94A3B8", fontSize: "14px" }}>
                Últimos eventos correlacionados
              </div>
            </div>

            {timeline.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: index < timeline.length - 1 ? "16px" : 0,
                  padding: "16px 20px",
                  background: "#020617",
                  borderRadius: "14px",
                  border: "1px solid #1E293B",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    background: item.color,
                    marginRight: "18px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ width: "80px", color: "#94A3B8", fontSize: "14px" }}>
                  {item.time}
                </div>
                <div style={{ fontSize: "15px" }}>{item.event}</div>
              </div>
            ))}
          </div>
          {/* ── FIM TIMELINE OPERACIONAL ── */}

          {/* ── COMPLIANCE & RISK CENTER ── */}
          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "24px",
              border: "1px solid #1E293B",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <h2 style={{ fontSize: "26px", margin: 0 }}>Compliance & Risk Center</h2>
              <div style={{ color: "#10B981", fontSize: "14px" }}>
                Governança e conformidade contínua
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {complianceItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#020617",
                    padding: "22px",
                    borderRadius: "16px",
                    border: "1px solid #1E293B",
                  }}
                >
                  <div style={{ color: "#94A3B8", marginBottom: "10px", fontSize: "13px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "26px", fontWeight: "bold", color: item.color }}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ── FIM COMPLIANCE & RISK CENTER ── */}

        </div>
        {/* ── FIM CONTEÚDO PRINCIPAL ── */}

      </div>
      {/* ── FIM LAYOUT PRINCIPAL ── */}

      {/* ── FOOTER ── */}
      <div
        style={{
          borderTop: "1px solid #1E293B",
          background: "#0F172A",
          color: "#94A3B8",
          fontSize: "13px",
          textAlign: "center",
          padding: "16px 20px",
        }}
      >
        GRC Inspector © 2026 — Intelligence Platform
      </div>
      {/* ── FIM FOOTER ── */}

    </div>
  );
}
