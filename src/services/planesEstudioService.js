import api from "./api";

export const obtenerPlanesEstudio = async () => {
  const response = await api.get("/planes-estudio");

  return response.data;
};
