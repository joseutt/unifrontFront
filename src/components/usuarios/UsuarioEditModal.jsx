import { useState } from "react";
import { Save, X } from "lucide-react";
import Field from "./Field";
import { inputClass } from "./usuarioFormConfig";

const getInitialForm = (usuario) => ({
  nombre: usuario?.nombre || "",
  apellido_paterno: usuario?.apellido_paterno || "",
  apellido_materno: usuario?.apellido_materno || "",
  correo: usuario?.correo || "",
  telefono: usuario?.telefono || "",
  password: "",
});

export default function UsuarioEditModal({ usuario, guardando, onClose, onSubmit }) {
  const [form, setForm] = useState(() => getInitialForm(usuario));

  if (!usuario) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Editar usuario
            </h2>

            <p className="text-sm text-slate-500">
              {usuario.nombre} {usuario.apellido_paterno}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-2">
          <Field label="Nombre" required>
            <input
              className={inputClass}
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Apellido paterno" required>
            <input
              className={inputClass}
              name="apellido_paterno"
              value={form.apellido_paterno}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Apellido materno">
            <input
              className={inputClass}
              name="apellido_materno"
              value={form.apellido_materno}
              onChange={handleChange}
            />
          </Field>

          <Field label="Telefono">
            <input
              className={inputClass}
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />
          </Field>

          <Field label="Correo" required>
            <input
              className={inputClass}
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Nueva contrasena">
            <input
              className={inputClass}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Dejar vacia para conservar"
            />
          </Field>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={guardando}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0B245B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={18} />
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
