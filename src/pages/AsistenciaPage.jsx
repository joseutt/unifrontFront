import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  RefreshCw,
  Save,
  Users,
  XCircle,
} from "lucide-react";
import {
  guardarCapturaAsistencia,
  obtenerCapturaAsistencia,
  obtenerGruposAsistencia,
} from "../services/asistenciasService";

const getCellKey = (idCarga, fecha) => `${idCarga}-${fecha}`;

const obtenerMensajeError = (error) => {
  const detail = error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item.msg || item.loc?.join("."))
      .filter(Boolean)
      .join(" | ");
  }

  if (typeof detail === "string") {
    return detail;
  }

  return "No se pudo completar la operacion.";
};

const getFechaHoy = () => {
  const fecha = new Date();
  const fechaLocal = new Date(
    fecha.getTime() - fecha.getTimezoneOffset() * 60000,
  );

  return fechaLocal.toISOString().slice(0, 10);
};

const formatFecha = (fecha) => {
  if (!fecha) return "-";

  const [year, month, day] = fecha.split("-");

  if (!year || !month || !day) return fecha;

  return `${day}/${month}/${year}`;
};

const esFechaFutura = (fecha) => {
  return Boolean(fecha) && fecha > getFechaHoy();
};

const extraerValores = (captura) => {
  const valores = {};

  captura.alumnos?.forEach((alumno) => {
    alumno.asistencias?.forEach((asistencia) => {
      valores[getCellKey(alumno.id_carga, asistencia.fecha)] = Boolean(
        asistencia.asistencia,
      );
    });
  });

  return valores;
};

const getGrupoTitulo = (grupoMateria) => {
  return [grupoMateria?.grupo?.nombre, grupoMateria?.materia?.nombre]
    .filter(Boolean)
    .join(" - ");
};

const getGrupoMeta = (grupoMateria) => {
  return [
    grupoMateria?.periodo?.nombre,
    grupoMateria?.grupo?.turno,
    grupoMateria?.aula ? `Aula ${grupoMateria.aula}` : null,
  ]
    .filter(Boolean)
    .join(" | ");
};

const formatPorcentaje = (value) => {
  if (value === null || value === undefined) return "-";

  return `${Number(value).toFixed(1)}%`;
};

const calcularPromedioAlumno = (alumno, fechas, valores) => {
  if (!fechas.length) return null;

  const asistencias = fechas.reduce((total, fecha) => {
    return total + (valores[getCellKey(alumno.id_carga, fecha)] ? 1 : 0);
  }, 0);

  return (asistencias / fechas.length) * 100;
};

const contarAsistencias = (alumno, fechas, valores) => {
  return fechas.reduce((total, fecha) => {
    return total + (valores[getCellKey(alumno.id_carga, fecha)] ? 1 : 0);
  }, 0);
};

export default function AsistenciaPage() {
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionadoId, setGrupoSeleccionadoId] = useState("");
  const [parcialSeleccionadoId, setParcialSeleccionadoId] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(getFechaHoy);
  const [capturaRefreshKey, setCapturaRefreshKey] = useState(0);
  const [captura, setCaptura] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingCaptura, setLoadingCaptura] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cargarGrupos = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await obtenerGruposAsistencia();
      const existeSeleccionActual = response.some(
        (grupo) =>
          String(grupo.id_grupo_materia) === String(grupoSeleccionadoId),
      );
      const siguienteGrupoId = existeSeleccionActual
        ? grupoSeleccionadoId
        : response[0]?.id_grupo_materia || "";

      setGrupos(response);
      setGrupoSeleccionadoId(siguienteGrupoId);

      if (siguienteGrupoId) {
        setLoadingCaptura(true);

        if (String(siguienteGrupoId) === String(grupoSeleccionadoId)) {
          setCapturaRefreshKey((prev) => prev + 1);
        }
      } else {
        setCaptura(null);
        setFormValues({});
        setParcialSeleccionadoId("");
        setLoadingCaptura(false);
      }
    } catch (requestError) {
      console.error(requestError);
      setError(obtenerMensajeError(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;

    obtenerGruposAsistencia()
      .then((response) => {
        if (!activo) return;

        const primerGrupoId = response[0]?.id_grupo_materia || "";

        setGrupos(response);
        setGrupoSeleccionadoId(primerGrupoId);

        if (primerGrupoId) {
          setLoadingCaptura(true);
        }
      })
      .catch((requestError) => {
        console.error(requestError);

        if (activo) {
          setError(obtenerMensajeError(requestError));
        }
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

  useEffect(() => {
    if (!grupoSeleccionadoId || !fechaSeleccionada) {
      return;
    }

    let activo = true;

    obtenerCapturaAsistencia(
      grupoSeleccionadoId,
      fechaSeleccionada,
      parcialSeleccionadoId,
    )
      .then((response) => {
        if (!activo) return;

        setCaptura(response);
        setFormValues(extraerValores(response));

        if (!parcialSeleccionadoId && response.parcial_seleccionado_id) {
          setParcialSeleccionadoId(response.parcial_seleccionado_id);
        }
      })
      .catch((requestError) => {
        console.error(requestError);

        if (activo) {
          setError(obtenerMensajeError(requestError));
        }
      })
      .finally(() => {
        if (activo) {
          setLoadingCaptura(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [
    grupoSeleccionadoId,
    parcialSeleccionadoId,
    fechaSeleccionada,
    capturaRefreshKey,
  ]);

  const resumen = useMemo(() => {
    const totalAlumnos = captura?.alumnos?.length || 0;
    const totalClases = captura?.fechas?.length || 0;
    const presentesHoy =
      captura?.alumnos?.filter(
        (alumno) => formValues[getCellKey(alumno.id_carga, fechaSeleccionada)],
      ).length || 0;
    const alumnosEnRiesgo =
      captura?.alumnos?.filter((alumno) => {
        const promedio = calcularPromedioAlumno(
          alumno,
          captura?.fechas || [],
          formValues,
        );

        return promedio !== null && promedio < 80;
      }).length || 0;

    return {
      totalAlumnos,
      totalClases,
      presentesHoy,
      alumnosEnRiesgo,
    };
  }, [captura, fechaSeleccionada, formValues]);

  const handleChangeAsistencia = (idCarga, fecha, value) => {
    setFormValues((prev) => ({
      ...prev,
      [getCellKey(idCarga, fecha)]: value,
    }));
  };

  const handleMarcarFecha = (value) => {
    if (!captura) return;

    if (esFechaFutura(fechaSeleccionada)) {
      setError("No puedes capturar asistencia de dias futuros.");
      return;
    }

    setFormValues((prev) => {
      const next = { ...prev };

      captura.alumnos.forEach((alumno) => {
        next[getCellKey(alumno.id_carga, fechaSeleccionada)] = value;
      });

      return next;
    });
  };

  const handleGuardar = async () => {
    if (!captura || saving || !fechaSeleccionada) return;

    setMensaje("");
    setError("");

    if (esFechaFutura(fechaSeleccionada)) {
      setError("No puedes capturar asistencia de dias futuros.");
      return;
    }

    const fechasGuardables = (captura.fechas || []).filter(
      (fecha) => !esFechaFutura(fecha),
    );

    const asistencias = captura.alumnos.flatMap((alumno) =>
      fechasGuardables.map((fecha) => ({
        id_carga: alumno.id_carga,
        fecha,
        asistencia: Boolean(formValues[getCellKey(alumno.id_carga, fecha)]),
      })),
    );

    try {
      setSaving(true);

      const response = await guardarCapturaAsistencia(
        captura.grupo_materia.id_grupo_materia,
        parcialSeleccionadoId || captura.parcial_seleccionado_id,
        fechaSeleccionada,
        asistencias,
      );

      setCaptura(response);
      setFormValues(extraerValores(response));
      setMensaje("Asistencia guardada correctamente.");
    } catch (requestError) {
      console.error(requestError);
      setError(obtenerMensajeError(requestError));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-[var(--background)] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Asistencia</h1>

          <p className="mt-1 text-slate-500">
            Controla la asistencia de tus materias y grupos activos.
          </p>
        </div>

        <button
          type="button"
          onClick={cargarGrupos}
          disabled={loadingCaptura || saving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={18} />
          Actualizar
        </button>
      </div>

      {mensaje && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Grupos activos
              </h2>
              <p className="text-sm text-slate-500">Solo tus materias</p>
            </div>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
              {grupos.length}
            </span>
          </div>

          {grupos.length === 0 ? (
            <div className="px-5 py-8 text-sm text-slate-500">
              No tienes grupos activos para asistencia.
            </div>
          ) : (
            <div className="max-h-[calc(100vh-260px)] divide-y divide-slate-100 overflow-y-auto">
              {grupos.map((grupoMateria) => {
                const seleccionado =
                  String(grupoSeleccionadoId) ===
                  String(grupoMateria.id_grupo_materia);

                return (
                  <button
                    type="button"
                    key={grupoMateria.id_grupo_materia}
                    onClick={() => {
                      setError("");
                      setMensaje("");
                      setLoadingCaptura(true);

                      if (
                        String(grupoSeleccionadoId) ===
                        String(grupoMateria.id_grupo_materia)
                      ) {
                        setCapturaRefreshKey((prev) => prev + 1);
                        return;
                      }

                      setGrupoSeleccionadoId(grupoMateria.id_grupo_materia);
                    }}
                    className={`w-full px-5 py-4 text-left transition ${
                      seleccionado
                        ? "bg-blue-50 text-blue-900"
                        : "bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          seleccionado
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <BookOpen size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold leading-snug">
                          {grupoMateria.materia?.nombre || "Materia sin nombre"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {grupoMateria.grupo?.nombre || "Grupo sin nombre"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {getGrupoMeta(grupoMateria)}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {captura?.parciales?.length > 0 && (
            <div className="border-t border-slate-200 px-5 py-4">
              <label
                htmlFor="parcial-asistencia"
                className="text-sm font-semibold text-slate-700"
              >
                Parcial
              </label>
              <select
                id="parcial-asistencia"
                value={
                  parcialSeleccionadoId ||
                  captura.parcial_seleccionado_id ||
                  ""
                }
                onChange={(event) => {
                  setMensaje("");
                  setError("");
                  setLoadingCaptura(true);
                  setParcialSeleccionadoId(event.target.value);
                }}
                className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {captura.parciales.map((parcial) => (
                  <option key={parcial.id_parcial} value={parcial.id_parcial}>
                    {parcial.nombre || `Parcial ${parcial.id_parcial}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </aside>

        <section className="space-y-4">
          {loadingCaptura && (
            <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
            </div>
          )}

          {!loadingCaptura && captura && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Alumnos
                    </p>
                    <Users size={18} className="text-blue-600" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {resumen.totalAlumnos}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Dias del parcial
                    </p>
                    <CalendarCheck size={18} className="text-blue-600" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {resumen.totalClases}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Presentes
                    </p>
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {resumen.presentesHoy}
                  </p>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-red-600">
                      Menos de 80%
                    </p>
                    <AlertCircle size={18} className="text-red-600" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-red-700">
                    {resumen.alumnosEnRiesgo}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {getGrupoTitulo(captura.grupo_materia)}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {getGrupoMeta(captura.grupo_materia)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <input
                      type="date"
                      value={fechaSeleccionada}
                      max={getFechaHoy()}
                      onChange={(event) => {
                        const nuevaFecha = event.target.value;

                        setMensaje("");
                        setError("");

                        if (esFechaFutura(nuevaFecha)) {
                          setError(
                            "No puedes capturar asistencia de dias futuros.",
                          );
                          return;
                        }

                        setLoadingCaptura(true);
                        setFechaSeleccionada(nuevaFecha);
                      }}
                      className="h-10 rounded-md border border-slate-300 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleMarcarFecha(true)}
                        disabled={
                          saving ||
                          captura.alumnos.length === 0 ||
                          esFechaFutura(fechaSeleccionada)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <CheckCircle2 size={18} />
                        Todos
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMarcarFecha(false)}
                        disabled={
                          saving ||
                          captura.alumnos.length === 0 ||
                          esFechaFutura(fechaSeleccionada)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <XCircle size={18} />
                        Ninguno
                      </button>

                      <button
                        type="button"
                        onClick={handleGuardar}
                        disabled={
                          saving ||
                          captura.alumnos.length === 0 ||
                          esFechaFutura(fechaSeleccionada)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Save size={18} />
                        {saving ? "Guardando..." : "Guardar"}
                      </button>
                    </div>
                  </div>
                </div>

                {captura.alumnos.length === 0 ? (
                  <div className="px-5 py-12 text-center text-sm text-slate-500">
                    Este grupo aun no tiene alumnos activos.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="sticky left-0 z-10 w-72 bg-slate-50 px-5 py-4 text-left text-sm font-semibold text-slate-600">
                            Alumno
                          </th>
                          <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                            Matricula
                          </th>
                          <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                            Estatus
                          </th>
                          {captura.fechas.map((fecha) => (
                            <th
                              key={fecha}
                              className={`px-5 py-4 text-center text-sm font-semibold ${
                                fecha === fechaSeleccionada
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-slate-600"
                              }`}
                            >
                              <span className="block whitespace-nowrap">
                                {formatFecha(fecha)}
                              </span>
                            </th>
                          ))}
                          <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                            Promedio parcial
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {captura.alumnos.map((alumno) => {
                          const promedio = calcularPromedioAlumno(
                            alumno,
                            captura.fechas,
                            formValues,
                          );
                          const esRiesgo = promedio !== null && promedio < 80;
                          const asistencias = contarAsistencias(
                            alumno,
                            captura.fechas,
                            formValues,
                          );

                          return (
                            <tr
                              key={alumno.id_carga}
                              className={`border-t border-slate-100 ${
                                esRiesgo ? "bg-red-50/80" : "bg-white"
                              }`}
                            >
                              <td
                                className={`sticky left-0 z-10 px-5 py-4 ${
                                  esRiesgo ? "bg-red-50" : "bg-white"
                                }`}
                              >
                                <p
                                  className={`font-semibold ${
                                    esRiesgo ? "text-red-800" : "text-slate-900"
                                  }`}
                                >
                                  {alumno.alumno?.nombre || "Alumno sin nombre"}
                                </p>
                                <p className="text-sm text-slate-500">
                                  Control:{" "}
                                  {alumno.alumno?.numero_control || "Sin dato"}
                                </p>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {alumno.alumno?.matricula || "Sin matricula"}
                              </td>

                              <td className="px-5 py-4">
                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                  {alumno.estatus || "SIN ESTATUS"}
                                </span>
                              </td>

                              {captura.fechas.map((fecha) => {
                                const key = getCellKey(alumno.id_carga, fecha);
                                const checked = Boolean(formValues[key]);
                                const editable = !esFechaFutura(fecha);

                                return (
                                  <td
                                    key={fecha}
                                    className={`px-5 py-4 text-center ${
                                      fecha === fechaSeleccionada
                                        ? "bg-blue-50/60"
                                        : ""
                                    }`}
                                  >
                                    <label
                                      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white transition ${
                                        editable
                                          ? "cursor-pointer hover:border-blue-300"
                                          : "cursor-not-allowed opacity-70"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        disabled={!editable || saving}
                                        onChange={(event) =>
                                          handleChangeAsistencia(
                                            alumno.id_carga,
                                            fecha,
                                            event.target.checked,
                                          )
                                        }
                                        aria-label={`Asistencia de ${
                                          alumno.alumno?.nombre || "alumno"
                                        } en ${formatFecha(fecha)}`}
                                        className="sr-only"
                                      />
                                      {checked ? (
                                        <CheckCircle2
                                          size={20}
                                          className="text-emerald-600"
                                        />
                                      ) : (
                                        <XCircle
                                          size={20}
                                          className="text-slate-300"
                                        />
                                      )}
                                    </label>
                                  </td>
                                );
                              })}

                              <td className="px-5 py-4 text-center">
                                <span
                                  className={`inline-flex min-w-20 justify-center rounded-md px-3 py-1 text-sm font-bold ${
                                    esRiesgo
                                      ? "bg-red-100 text-red-700"
                                      : "bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  {formatPorcentaje(promedio)}
                                </span>
                                <p className="mt-1 text-xs font-medium text-slate-400">
                                  {asistencias}/{captura.fechas.length}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {!loadingCaptura && !captura && grupos.length > 0 && (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">
              Selecciona un grupo para iniciar la asistencia.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
