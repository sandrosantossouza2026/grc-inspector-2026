import React from "react";

export default function App() {
  const alerts = [
    {
      title: "Movimentação suspeita de dados",
      severity: "CRÍTICO",
      source: "Endpoint Financeiro"
    },
    {
      title: "Acesso privilegiado fora do padrão",
      severity: "ALTO",
      source: "VPN Corporativa"
    },
    {
      title: "Possível fraude transacional",
      severity: "MÉDIO",
      source: "Sistema Antifraude"
    }
  ];

  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        fontFamily: "Arial"
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "280px",
          background: "#0F172A",
          padding: "30px",
          borderRight: "1px solid #1E293B"
        }}
      >

<div
  style={{
    textAlign: "center",
    marginBottom: "40px"
  }}
>
<img
  src="/logo-grc.png"
  alt="GRC Solutions"
  style={{
    width: "240px",
    maxWidth: "100%",
    filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.3))"
  }}
/>

  <div
    style={{
      marginTop: "10px",
      color: "#94A3B8",
      fontSize: "14px"
    }}
  >
    Intelligence Platform
  </div>
</div>

        {[
          "Dashboard Executivo",
          "Centro Operacional",
          "Compliance & GRC",
          "TSCM",
          "DFIR",
          "Inteligência Executiva"
        ].map((item, index) => (

          <div
            key={index}
            style={{
              padding: "18px",
              marginBottom: "15px",
              borderRadius: "14px",
              background:
                index === 0
                  ? "#10B98122"
                  : "#111827",
              cursor: "pointer",
              border:
                index === 0
                  ? "1px solid #10B981"
                  : "1px solid #1E293B"
            }}
          >
            {item}
          </div>

        ))}
      </div>

      {/* CONTEÚDO */}

      <div
        style={{
          flex: 1,
          padding: "40px"
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px"
          }}
        >

          <div>

            <h2
              style={{
                fontSize: "42px",
                marginBottom: "10px"
              }}
            >
              Executive Overview
            </h2>

            <p
              style={{
                color: "#94A3B8",
                fontSize: "18px"
              }}
            >
              Centro Integrado de Inteligência, Compliance e Proteção Institucional
            </p>

          </div>

          <div
            style={{
              background: "#111827",
              padding: "25px",
              borderRadius: "18px",
              border: "1px solid #1E293B"
            }}
          >

            <div
              style={{
                color: "#94A3B8",
                marginBottom: "10px"
              }}
            >
              Status Operacional
            </div>

            <div
              style={{
                color: "#10B981",
                fontSize: "28px",
                fontWeight: "bold"
              }}
            >
              Operacional 24x7
            </div>

          </div>

        </div>

        {/* KPIs */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "40px"
          }}
        >

          {[
            {
              title: "Ativos e Processos Monitorados",
              value: "2.734",
              color: "white"
            },
            {
              title: "Alertas Críticos",
              value: "18",
              color: "#EF4444"
            },
            {
              title: "Compliance BACEN",
              value: "92%",
              color: "#10B981"
            },
            {
              title: "Integridade Operacional",
              value: "Moderado",
              color: "#F97316"
            }
          ].map((kpi, index) => (

            <div
              key={index}
              style={{
                background: "#111827",
                padding: "30px",
                borderRadius: "20px",
                border: "1px solid #1E293B"
              }}
            >

              <div
                style={{
                  color: "#94A3B8",
                  marginBottom: "15px"
                }}
              >
                {kpi.title}
              </div>

              <div
                style={{
                  fontSize: "38px",
                  fontWeight: "bold",
                  color: kpi.color
                }}
              >
                {kpi.value}
              </div>

            </div>

          ))}

        </div>

        {/* ALERTAS */}

        <div
          style={{
            background: "#111827",
            padding: "30px",
            borderRadius: "24px",
            border: "1px solid #1E293B"
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px"
            }}
          >

            <h2
              style={{
                fontSize: "28px"
              }}
            >
              Alertas Estratégicos
            </h2>

            <div
              style={{
                color: "#10B981"
              }}
            >
              Atualização em tempo real
            </div>

          </div>

          {alerts.map((alert, index) => (

            <div
              key={index}
              style={{
                background: "#020617",
                padding: "25px",
                borderRadius: "18px",
                marginBottom: "20px",
                border: "1px solid #1E293B",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <div>

                <div
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px"
                  }}
                >
                  {alert.title}
                </div>

                <div
                  style={{
                    color: "#94A3B8"
                  }}
                >
                  Fonte: {alert.source}
                </div>

              </div>

              <div
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background:
                    alert.severity === "CRÍTICO"
                      ? "#EF444422"
                      : alert.severity === "ALTO"
                      ? "#F9731622"
                      : "#EAB30822",
                  color:
                    alert.severity === "CRÍTICO"
                      ? "#EF4444"
                      : alert.severity === "ALTO"
                      ? "#F97316"
                      : "#EAB308",
                  fontWeight: "bold"
                }}
              >
                {alert.severity}
              </div>

            </div>

          ))}

        </div>
{/* TIMELINE OPERACIONAL */}

<div
  style={{
    marginTop: "40px",
    background: "#111827",
    padding: "30px",
    borderRadius: "24px",
    border: "1px solid #1E293B"
  }}
>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px"
    }}
  >

    <h2
      style={{
        fontSize: "28px"
      }}
    >
      Timeline Operacional
    </h2>

    <div
      style={{
        color: "#94A3B8"
      }}
    >
      Últimos eventos correlacionados
    </div>

  </div>

  {[
    {
      time: "19:42",
      event: "Tentativa de acesso privilegiado",
      severity: "#EF4444"
    },
    {
      time: "18:15",
      event: "Correlação antifraude identificada",
      severity: "#F97316"
    },
    {
      time: "16:22",
      event: "Varredura TSCM concluída",
      severity: "#10B981"
    }
  ].map((item, index) => (

    <div
      key={index}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        padding: "18px",
        background: "#020617",
        borderRadius: "16px",
        border: "1px solid #1E293B"
      }}
    >

      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "999px",
          background: item.severity,
          marginRight: "20px"
        }}
      />

      <div
        style={{
          width: "90px",
          color: "#94A3B8"
        }}
      >
        {item.time}
      </div>

      <div>
        {item.event}
      </div>

    </div>

  ))}

</div>
      </div>
{/* COMPLIANCE & RISK CENTER */}

<div
  style={{
    marginTop: "40px",
    background: "#111827",
    padding: "30px",
    borderRadius: "24px",
    border: "1px solid #1E293B"
  }}
>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px"
    }}
  >

    <h2
      style={{
        fontSize: "28px"
      }}
    >
      Compliance & Risk Center
    </h2>

    <div
      style={{
        color: "#10B981"
      }}
    >
      Governança e conformidade contínua
    </div>

  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px"
    }}
  >

    {[
      {
        title: "LGPD",
        status: "Conforme",
        color: "#10B981"
      },
      {
        title: "BACEN",
        status: "92%",
        color: "#10B981"
      },
      {
        title: "CMN",
        status: "Monitorado",
        color: "#F97316"
      },
      {
        title: "Logs Auditáveis",
        status: "Ativo",
        color: "#10B981"
      },
      {
        title: "TSCM",
        status: "Operacional",
        color: "#10B981"
      },
      {
        title: "Disponibilidade",
        status: "99.2%",
        color: "#10B981"
      }
    ].map((item, index) => (

      <div
        key={index}
        style={{
          background: "#020617",
          padding: "25px",
          borderRadius: "18px",
          border: "1px solid #1E293B"
        }}
      >

        <div
          style={{
            color: "#94A3B8",
            marginBottom: "15px"
          }}
        >
          {item.title}
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: item.color
          }}
        >
          {item.status}
        </div>

      </div>

    ))}

        </div>

</div>
      
      {/* FOOTER */}

      <div
        style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #1E293B",
          color: "#94A3B8",
          fontSize: "14px",
          textAlign: "center"
        }}
      >
        GRC Inspector © 2026 — Intelligence Platform
      </div>

    </div>
  );
}
