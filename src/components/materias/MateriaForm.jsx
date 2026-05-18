import { useState } from "react";

export default function MateriaForm({ materia, onSubmit }) {
  const [form, setForm] = useState({
    clave: materia?.clave || "",
    nombre: materia?.nombre || "",
    creditos: materia?.creditos || "",
    estado: materia?.estado ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      creditos: Number(form.creditos),
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Nueva materia</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Clave
          </label>

          <input
            type="text"
            name="clave"
            value={form.clave}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            placeholder="Ej: INF101"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nombre
          </label>

          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            placeholder="Nombre de la materia"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Créditos
          </label>

          <input
            type="number"
            step="0.1"
            name="creditos"
            value={form.creditos}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            placeholder="0"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="estado"
            checked={form.estado}
            onChange={handleChange}
          />

          <label className="text-sm text-slate-700">Materia activa</label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Guardar materia
          </button>
        </div>
      </form>
    </div>
  );
}
