import api from "./api";

export const obtenerKardexPorMatricula = async (matricula) => {
  const response = await api.get("/kardex", {
    params: { matricula },
  });

  return response.data;
};

