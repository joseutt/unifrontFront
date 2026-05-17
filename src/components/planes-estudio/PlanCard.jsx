import CuatrimestreCard from "./CuatrimestreCard";

export default function PlanCard({ cuatrimestre }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900">
          {cuatrimestre.nombre}
        </h3>

        <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {cuatrimestre.materias.length} materias
        </div>
      </div>

      <div className="space-y-3">
        {cuatrimestre.materias.map((materiaPlan) => (
          <CuatrimestreCard
            key={materiaPlan.id_plan_materia}
            materiaPlan={materiaPlan}
          />
        ))}
      </div>
    </div>
  );
}
