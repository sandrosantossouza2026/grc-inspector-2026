import React from "react";
export default function App() {
  const alerts = [
    {
      title: "Movimentação suspeita de dados",
      severity: "Crítico",
      source: "Endpoint Financeiro",
    },
    {
      title: "Acesso privilegiado fora do padrão",
      severity: "Alto",
      source: "VPN Corporativa",
    },
    {
      title: "Possível fraude transacional",
      severity: "Médio",
      source: "Sistema Antifraude",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      
      {/* SIDEBAR */}
      <div className="w-72 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          GRC Inspector
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Intelligence Platform
        </p>

        <div className="mt-10 space-y-4">

          <div className="bg-emerald-500/20 text-cyan-400 p-4 rounded-xl">
            Dashboard Executivo
          </div>

          <div className="hover:bg-slate-800 p-4 rounded-xl cursor-pointer">
            Centro Operacional
          </div>

          <div className="hover:bg-slate-800 p-4 rounded-xl cursor-pointer">
            Compliance & GRC
          </div>

          <div className="hover:bg-slate-800 p-4 rounded-xl cursor-pointer">
            TSCM
          </div>

          <div className="hover:bg-slate-800 p-4 rounded-xl cursor-pointer">
            DFIR
          </div>

          <div className="hover:bg-slate-800 p-4 rounded-xl cursor-pointer">
            Inteligência Executiva
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-4xl font-bold">
              Executive Overview
            </h2>

            <p className="text-slate-400 mt-2">
              Centro Integrado de Inteligência, Compliance e Proteção Institucional
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl">
            <div className="text-slate-400 text-sm">
              Status Operacional
            </div>

            <div className="text-cyan-400 text-2xl font-bold mt-2">
              Operacional 24x7
            </div>
          </div>
        </div>

        {/* KPIS */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-sm">
              Ativos Monitorados
            </div>

            <div className="text-4xl font-bold mt-3">
              5.000
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-sm">
              Alertas Críticos
            </div>

            <div className="text-4xl font-bold mt-3 text-red-400">
              18
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-sm">
              Compliance BACEN
            </div>

            <div className="text-4xl font-bold mt-3 text-cyan-400">
              92%
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-sm">
              Integridade Operacional
            </div>

            <div className="text-4xl font-bold mt-3 text-orange-400">
              Moderado
            </div>
          </div>
        </div>

        {/* ALERTAS */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Alertas Estratégicos
            </h2>

            <span className="text-cyan-400 text-sm">
              Atualização em tempo real
            </span>
          </div>

          <div className="space-y-4">

            {alerts.map((alert, index) => (

              <div
                key={index}
                className="bg-[#020617] border border-slate-800 rounded-xl p-5 flex justify-between"
              >

                <div>
                  <div className="text-lg font-semibold">
                    {alert.title}
                  </div>

                  <div className="text-slate-400 mt-2 text-sm">
                    Fonte: {alert.source}
                  </div>
                </div>

                <div>

                  <div className={`
                    px-4 py-2 rounded-full text-sm font-bold

                    ${alert.severity === "Crítico"
                      ? "bg-red-500/20 text-red-400"
                      : alert.severity === "Alto"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}>
                    {alert.severity}
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}