import { useEffect, useState } from "react";
import CarreraHeader from "../components/carreras/CarreraHeader";
import CarreraForm from "../components/carreras/CarreraForm";
import CarreraListCard from "../components/carreras/CarreraListCard";
import {
  obtenerCarreras,
  crearCarrera,
  eliminarCarrera,
} from "../services/carrerasService";

export default function CarrerasPage() {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCarreras();
  }, []);

  const cargarCarreras = async () => {
    try {
      setLoading(true);
      const response = await obtenerCarreras();
      setCarreras(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async (formData) => {
    try {
      await crearCarrera(formData);
      cargarCarreras();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditar = (carrera) => {
    setCarreraSeleccionada(carrera);
    setOpenModal(true);
  };

  const handleEliminar = async (carrera) => {
    const confirmar = window.confirm(`¿Eliminar carrera ${carrera.nombre}?`);

    if (!confirmar) return;

    try {
      await eliminarCarrera(carrera.id_carrera);
      cargarCarreras();
    } catch (error) {
      console.error(error);
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
    <div className="space-y-6 p-6">
      <CarreraHeader total={carreras.length} />

      <div className="h-px w-full bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Formulario */}
        <div className="xl:col-span-1">
          <CarreraForm onSubmit={handleCrear} />
        </div>

        {/* Tabla */}
        <div className="xl:col-span-2">
          <CarreraListCard
            carreras={carreras}
            onEliminar={handleEliminar}
            onEditar={handleEditar}
          />
        </div>
      </div>
    </div>
  );
}
