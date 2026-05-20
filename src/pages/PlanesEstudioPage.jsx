import { useEffect, useMemo, useState } from "react";
import PlanSelector from "../components/planes-estudio/PlanSelector";
import PlanCard from "../components/planes-estudio/PlanCard";
import PlanHeader from "../components/planes-estudio/PlanHeader";
import EmptyState from "../components/planes-estudio/EmptyState";
import { obtenerPlanesEstudio } from "../services/planesEstudioService";

export default function PlanesEstudioPage() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  useEffect(() => {
    let activo = true;

    obtenerPlanesEstudio()
      .then((response) => {
        if (activo) {
          setPlanes(response);

          if (response.length > 0) {
            setPlanSeleccionado(response[0].id_plan);
          }
        }
      })
      .catch((error) => {
        console.error("Error cargando planes:", error);
      })
      .finally(() => {
        if (activo) {
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const planActual = useMemo(() => {
    return planes.find((plan) => plan.id_plan === Number(planSeleccionado));
  }, [planes, planSeleccionado]);

  const cuatrimestresOrdenados = useMemo(() => {
    if (!planActual?.cuatrimestres) return [];

    return [...planActual.cuatrimestres].sort(
      (a, b) => a.id_cuatrimestre - b.id_cuatrimestre,
    );
  }, [planActual]);

  const crearPlan = () => {
    console.log("Crear nuevo plan");
  };

  const editarPlan = (plan) => {
    console.log("Editar plan", plan);
  };

  const eliminarPlan = (plan) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar el plan ${plan.nombre_plan}?`,
    );

    if (!confirmar) return;

    console.log("Eliminar plan", plan);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PlanHeader onCrearPlan={crearPlan} totalPlanes={planes.length} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Plan de estudios
          </h1>

          <p className="mt-1 text-slate-500">Mapa curricular por carrera</p>
        </div>

        <div className="flex items-center gap-3">
          {planActual && (
            <>
              <button
                onClick={() => editarPlan(planActual)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Editar
              </button>

              <button
                onClick={() => eliminarPlan(planActual)}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                Eliminar
              </button>
            </>
          )}

          <PlanSelector
            planes={planes}
            value={planSeleccionado}
            onChange={setPlanSeleccionado}
          />
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {!planActual ? (
        <EmptyState />
      ) : (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {planActual.nombre_plan}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {planActual.carrera.nombre}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    planActual.vigente
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {planActual.vigente ? "Vigente" : "No vigente"}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Inicio: {planActual.fecha_inicio}
                </span>
              </div>
            </div>
          </div>

          {cuatrimestresOrdenados.length === 0 ? (
            <EmptyState mensaje="Este plan todavía no tiene cuatrimestres." />
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
              {cuatrimestresOrdenados.map((cuatrimestre) => (
                <PlanCard
                  key={cuatrimestre.id_cuatrimestre}
                  cuatrimestre={cuatrimestre}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
