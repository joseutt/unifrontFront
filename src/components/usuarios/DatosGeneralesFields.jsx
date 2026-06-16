import Field from "./Field";
import { inputClass } from "./usuarioFormConfig";

export default function DatosGeneralesFields({ form, onChange }) {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Datos generales
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nombre">
          <input
            className={inputClass}
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            required
          />
        </Field>

        <Field label="Apellido paterno">
          <input
            className={inputClass}
            name="apellido_paterno"
            value={form.apellido_paterno}
            onChange={onChange}
            required
          />
        </Field>

        <Field label="Apellido materno">
          <input
            className={inputClass}
            name="apellido_materno"
            value={form.apellido_materno}
            onChange={onChange}
          />
        </Field>

        <Field label="Teléfono">
          <input
            className={inputClass}
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            required
          />
        </Field>

        <Field label="Correo Institucional">
          <input
            className={inputClass}
            type="email"
            name="correo"
            value={form.correo}
            onChange={onChange}
            required
          />
        </Field>

        <Field label="Contraseña">
          <input
            className={inputClass}
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
          />
        </Field>
      </div>
    </section>
  );
}
