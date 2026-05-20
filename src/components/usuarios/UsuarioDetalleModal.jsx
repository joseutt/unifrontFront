import { X } from "lucide-react";

function DetailItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-slate-900">
        {value ?? "Sin registrar"}
      </dd>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-4 border-t border-slate-200 px-6 py-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      {children}
    </section>
  );
}

function EmptyText({ children = "Sin registros." }) {
  return <p className="text-sm text-slate-500">{children}</p>;
}

export default function UsuarioDetalleModal({ detalle, onClose }) {
  if (!detalle) return null;

  const { usuario, alumno, docente, expediente_alumno: expediente } = detalle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Expediente del usuario
            </h2>
            <p className="text-sm text-slate-500">ID #{usuario.id_usuario}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <Section title="Usuario">
          <dl className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <DetailItem label="Nombre" value={usuario.nombre} />
            <DetailItem label="Apellido paterno" value={usuario.apellido_paterno} />
            <DetailItem label="Apellido materno" value={usuario.apellido_materno} />
            <DetailItem label="Correo" value={usuario.correo} />
            <DetailItem label="Telefono" value={usuario.telefono} />
            <DetailItem label="Estado" value={usuario.estado} />
          </dl>
        </Section>

        {alumno && (
          <Section title="Alumno">
            <dl className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <DetailItem label="Matricula" value={alumno.matricula} />
              <DetailItem label="Numero de control" value={alumno.numero_control} />
              <DetailItem label="Estatus" value={alumno.estatus} />
              <DetailItem label="Carrera" value={alumno.carrera?.nombre} />
              <DetailItem label="Plan" value={alumno.plan?.nombre_plan} />
              <DetailItem label="CURP" value={alumno.curp} />
              <DetailItem label="Fecha nacimiento" value={alumno.fecha_nacimiento} />
              <DetailItem label="Fecha ingreso" value={alumno.fecha_ingreso} />
              <DetailItem label="Correo contacto" value={alumno.correo_contacto} />
            </dl>
          </Section>
        )}

        {docente && (
          <Section title="Docente">
            <dl className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <DetailItem label="Numero empleado" value={docente.numero_empleado} />
              <DetailItem label="Especialidad" value={docente.especialidad} />
              <DetailItem label="Grado academico" value={docente.grado_academico} />
              <DetailItem label="Fecha ingreso" value={docente.fecha_ingreso} />
              <DetailItem label="Estado" value={docente.estado ? "Activo" : "Inactivo"} />
            </dl>
          </Section>
        )}

        {expediente && (
          <>
            <Section title="Tutores">
              {expediente.tutores.length === 0 ? (
                <EmptyText />
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {expediente.tutores.map((tutor) => (
                    <div
                      key={tutor.id_tutor}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <p className="font-semibold text-slate-900">{tutor.nombre}</p>
                      <p className="text-sm text-slate-500">
                        {tutor.parentesco || "Sin parentesco"} -{" "}
                        {tutor.telefono || "Sin telefono"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {tutor.correo || "Sin correo"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            <Section title="Contactos de emergencia">
              {expediente.contactos_emergencia.length === 0 ? (
                <EmptyText />
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {expediente.contactos_emergencia.map((contacto) => (
                    <div
                      key={contacto.id_contacto}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900">
                          {contacto.nombre}
                        </p>
                        {contacto.contacto_principal && (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Principal
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">
                        {contacto.parentesco || "Sin parentesco"} -{" "}
                        {contacto.telefono || "Sin telefono"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {contacto.direccion || "Sin direccion"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            <Section title="Seguro y procedencia">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold text-slate-900">Seguro medico</h4>
                  {expediente.seguros_medicos.length === 0 ? (
                    <EmptyText />
                  ) : (
                    expediente.seguros_medicos.map((seguro) => (
                      <dl key={seguro.id_seguro} className="mt-3 space-y-2">
                        <DetailItem
                          label="Tiene seguro"
                          value={seguro.tiene_seguro ? "Si" : "No"}
                        />
                        <DetailItem label="Institucion" value={seguro.institucion} />
                        <DetailItem label="Poliza" value={seguro.numero_poliza} />
                      </dl>
                    ))
                  )}
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold text-slate-900">
                    Procedencia academica
                  </h4>
                  {expediente.procedencia_academica ? (
                    <dl className="mt-3 space-y-2">
                      <DetailItem
                        label="Escuela"
                        value={expediente.procedencia_academica.escuela_procedencia}
                      />
                      <DetailItem
                        label="Nivel"
                        value={expediente.procedencia_academica.nivel_academico}
                      />
                      <DetailItem
                        label="Promedio"
                        value={expediente.procedencia_academica.promedio_general}
                      />
                    </dl>
                  ) : (
                    <EmptyText />
                  )}
                </div>
              </div>
            </Section>

            <Section title="Documentos">
              {expediente.documentos_alumno.length === 0 ? (
                <EmptyText />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                          Tipo
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                          Archivo
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                          Validado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {expediente.documentos_alumno.map((documento) => (
                        <tr
                          key={documento.id_documento}
                          className="border-t border-slate-100"
                        >
                          <td className="px-4 py-3 text-sm text-slate-700">
                            {documento.tipo_documento?.nombre}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            {documento.nombre_archivo}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            {documento.validado ? "Si" : "No"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
