import api from "./api";

export const obtenerGruposCaptura = async () => {
  const response = await api.get("/calificaciones/captura/grupos");

  return response.data;
};

export const obtenerCapturaGrupo = async (grupoMateriaId) => {
  const response = await api.get(
    `/calificaciones/captura/grupos/${grupoMateriaId}`,
  );

  return response.data;
};

export const guardarCapturaCalificaciones = async (
  grupoMateriaId,
  calificaciones,
) => {
  const response = await api.post("/calificaciones/captura", {
    grupo_materia_id: grupoMateriaId,
    calificaciones,
  });

  return response.data;
};

export const obtenerBoletaFinal = async ({ alumnoId, periodoId }) => {
  const response = await api.get("/calificaciones/boleta-final", {
    params: {
      alumno_id: alumnoId,
      periodo_id: periodoId,
    },
  });

  return response.data;
};
