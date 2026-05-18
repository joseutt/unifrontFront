import { useEffect, useMemo, useState } from "react";
import MateriaHeader from "../components/materias/MateriaHeader";
import MateriaForm from "../components/materias/MateriaForm";
import MateriaListCard from "../components/materias/MateriaListCard";

import {
  obtenerMaterias,
  crearMateria,
  eliminarMateria,
} from "../services/materiasService";

import { obtenerCarreras } from "../services/carrerasService";

export default function MateriasPage() {
  const [materias, setMaterias] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [carreraFiltro, setCarreraFiltro] = useState("TODAS");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [materiasResponse, carrerasResponse] = await Promise.all([
        obtenerMaterias(),
        obtenerCarreras(),
      ]);

      setMaterias(materiasResponse);

      setCarreras(carrerasResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const materiasFiltradas = useMemo(() => {
    return materias.filter((materia) => {
      const coincideBusqueda =
        materia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        materia.clave.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCarrera =
        carreraFiltro === "TODAS" ||
        materia.carrera?.id_carrera === Number(carreraFiltro);

      return coincideBusqueda && coincideCarrera;
    });
  }, [materias, busqueda, carreraFiltro]);

  const handleCrear = async (formData) => {
    try {
      await crearMateria(formData);

      cargarDatos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (materia) => {
    const confirmar = window.confirm(`¿Eliminar materia ${materia.nombre}?`);

    if (!confirmar) return;

    try {
      await eliminarMateria(materia.id_materia);

      cargarDatos();
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
      <MateriaHeader total={materias.length} />

      <div className="h-px w-full bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Formulario */}
        <div className="xl:col-span-1">
          <MateriaForm carreras={carreras} onSubmit={handleCrear} />
        </div>

        {/* Tabla */}
        <div className="xl:col-span-2">
          <MateriaListCard
            materias={materiasFiltradas}
            carreras={carreras}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            carreraFiltro={carreraFiltro}
            setCarreraFiltro={setCarreraFiltro}
            onEliminar={handleEliminar}
          />
        </div>
      </div>
    </div>
  );
}
