import React from "react";

export default function App() {
  return (
    <div
      style={{
        background: "#020617",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "48px", color: "#10B981" }}>
        GRC Inspector
      </h1>

      <p style={{ marginTop: "20px", fontSize: "22px" }}>
        Plataforma Integrada de Inteligência e Compliance
      </p>

      <div
        style={{
          marginTop: "40px",
          background: "#111827",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h2>Dashboard Executivo</h2>

        <p style={{ marginTop: "20px" }}>
          ✔ Monitoramento Integrado
        </p>

        <p>✔ Compliance Digital</p>

        <p>✔ Inteligência Analítica</p>

        <p>✔ Proteção Institucional</p>
      </div>
    </div>
  );
}
