import { Users } from "lucide-react";

export default function UsuariosDirectory({ usuarios }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Directorio</h2>

          <p className="text-sm text-slate-500">Ultimos usuarios registrados</p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Users size={20} />
        </span>
      </div>

      {usuarios.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-slate-500">
          Sin usuarios registrados.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Usuario
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Rol
                </th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id_usuario} className="border-t border-slate-100">
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-900">
                      {usuario.nombre} {usuario.apellido_paterno}
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      {usuario.correo}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {usuario.roles?.length > 0 ? (
                        usuario.roles.map((role) => (
                          <span
                            key={role.id_rol}
                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                          >
                            {role.nombre}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          Sin rol
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
