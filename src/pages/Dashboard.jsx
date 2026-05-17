import StatsCard from "../components/StatsCard";
import { Users, GraduationCap, BookOpen, ClipboardCheck } from "lucide-react";

function Dashboard() {
  return (
    <div className="flex bg-[var(--background)] min-h-screen">
      <main className="flex-1 p-8">
        <div className="mb-10">
          <h1 className="text-5xl font-display text-[var(--primary)]">
            Panel general
          </h1>

          <p className="text-gray-500 mt-2">
            Resumen institucional del cuatrimestre actual
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <StatsCard
            title="Alumnos activos"
            value="21"
            subtitle="24 totales"
            icon={Users}
          />

          <StatsCard
            title="Egresados"
            value="1"
            subtitle="Generación vigente"
            icon={GraduationCap}
          />

          <StatsCard
            title="Promedio general"
            value="8.65"
            subtitle="Escala 0–10"
            icon={ClipboardCheck}
          />

          <StatsCard
            title="Carreras"
            value="4"
            subtitle="Programas activos"
            icon={BookOpen}
          />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl border p-6">
            <h2 className="font-display text-3xl mb-8">Alumnos por carrera</h2>

            {[
              "Ing. en Sistemas Computacionales",
              "Lic. en Administración",
              "Lic. en Derecho",
              "Lic. en Psicología",
            ].map((career) => (
              <div key={career} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>{career}</span>
                  <span>6 alumnos</span>
                </div>

                <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full w-1/4 bg-[var(--primary)]" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-display text-3xl mb-8">Cuadro de honor</h2>

            <div className="space-y-6">
              {[
                ["Isabella Pérez Torres", "9.6"],
                ["Santiago Rodríguez", "9.5"],
                ["Andrea Vargas", "8.9"],
                ["Leonardo Castillo", "8.8"],
              ].map(([name, score], index) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-gray-400">202310{index}</p>
                    </div>
                  </div>

                  <div className="bg-[var(--secondary)] px-3 py-1 rounded-lg">
                    {score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
