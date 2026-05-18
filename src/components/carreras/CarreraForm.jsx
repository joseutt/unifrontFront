import { useState } from "react";

import { Plus } from "lucide-react";

export default function CarreraFormCard({ onSubmit }) {
  const [form, setForm] = useState({
    clave: "",
    nombre: "",
    nivel: "LICENCIATURA",
    duracion_cuatrimestres: 9,
    estado: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    setForm({
      clave: "",
      nombre: "",
      nivel: "LICENCIATURA",
      duracion_cuatrimestres: 9,
      estado: true,
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Nueva carrera</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Clave
          </label>

          <input
            type="text"
            name="clave"
            value={form.clave}
            onChange={handleChange}
            placeholder="Ej. ISC"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nombre completo
          </label>

          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej. Ingeniería en Sistemas"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nivel
          </label>

          <select
            name="nivel"
            value={form.nivel}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option value="TSU">TSU</option>

            <option value="LICENCIATURA">Licenciatura</option>

            <option value="INGENIERIA">Ingeniería</option>

            <option value="MAESTRIA">Maestría</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Duración
          </label>

          <input
            type="number"
            name="duracion_cuatrimestres"
            value={form.duracion_cuatrimestres}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B245B] px-4 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Agregar carrera
        </button>
      </form>
    </div>
  );
}
