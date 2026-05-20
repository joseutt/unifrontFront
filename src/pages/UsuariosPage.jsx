import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAlert from "../components/usuarios/FormAlert";
import UsuarioDetalleModal from "../components/usuarios/UsuarioDetalleModal";
import UsuarioEditModal from "../components/usuarios/UsuarioEditModal";
import UsuariosDirectory from "../components/usuarios/UsuariosDirectory";
import UsuariosHeader from "../components/usuarios/UsuariosHeader";
import {
  actualizarUsuario,
  eliminarUsuario,
  obtenerDetalleUsuario,
  obtenerUsuarios,
} from "../services/usuariosService";

const limpiarPayload = (payload) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== ""),
  );
};

const obtenerMensajeError = (error) => {
  const detail = error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item.msg || item.loc?.join("."))
      .filter(Boolean)
      .join(" | ");
  }

  if (typeof detail === "string") {
    return detail;
  }

  return "No se pudo completar la operacion.";
};

export default function UsuariosPage() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [detalleLoading, setDetalleLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("TODOS");
  const [usuarioDetalle, setUsuarioDetalle] = useState(null);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setUsuarios(await obtenerUsuarios());
    } catch (requestError) {
      console.error(requestError);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;

    obtenerUsuarios()
      .then((response) => {
        if (activo) {
          setUsuarios(response);
        }
      })
      .catch((requestError) => {
        console.error(requestError);

        if (activo) {
          setError("No se pudieron cargar los usuarios.");
        }
      })
      .finally(() => {
        if (activo) {
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const usuariosFiltrados = useMemo(() => {
    const busquedaNormalizada = busqueda.trim().toLowerCase();

    return usuarios
      .filter((usuario) => {
        const textoUsuario = [
          usuario.nombre,
          usuario.apellido_paterno,
          usuario.apellido_materno,
          usuario.correo,
          usuario.telefono,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const coincideBusqueda =
          busquedaNormalizada === "" ||
          textoUsuario.includes(busquedaNormalizada);

        const roles = usuario.roles?.map((role) => role.nombre) || [];
        const coincideRol =
          rolFiltro === "TODOS" ||
          (rolFiltro === "SIN_ROL" && roles.length === 0) ||
          roles.includes(rolFiltro);

        return coincideBusqueda && coincideRol;
      })
      .sort((a, b) => Number(b.id_usuario) - Number(a.id_usuario));
  }, [usuarios, busqueda, rolFiltro]);

  const handleVerDetalle = async (usuario) => {
    setMensaje("");
    setError("");
    setDetalleLoading(true);

    try {
      setUsuarioDetalle(await obtenerDetalleUsuario(usuario));
    } catch (requestError) {
      console.error(requestError);
      setError("No se pudo cargar el detalle del usuario.");
    } finally {
      setDetalleLoading(false);
    }
  };

  const handleEditarUsuario = async (formData) => {
    setMensaje("");
    setError("");
    setGuardando(true);

    try {
      await actualizarUsuario(usuarioEditando.id_usuario, limpiarPayload(formData));
      setMensaje("Usuario actualizado correctamente.");
      setUsuarioEditando(null);
      await cargarUsuarios();
    } catch (requestError) {
      console.error(requestError);
      setError(obtenerMensajeError(requestError));
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminarUsuario = async (usuario) => {
    const confirmar = window.confirm(
      `Deseas borrar a ${usuario.nombre} ${usuario.apellido_paterno}?`,
    );

    if (!confirmar) return;

    setMensaje("");
    setError("");

    try {
      await eliminarUsuario(usuario.id_usuario);
      setMensaje("Usuario eliminado correctamente.");
      await cargarUsuarios();
    } catch (requestError) {
      console.error(requestError);
      setError(obtenerMensajeError(requestError));
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
      <UsuariosHeader
        total={usuarios.length}
        onRefresh={cargarUsuarios}
        onCreate={() => navigate("/usuarios/nuevo")}
      />

      <div className="h-px w-full bg-slate-200" />

      {mensaje && <FormAlert type="success">{mensaje}</FormAlert>}
      {error && <FormAlert type="error">{error}</FormAlert>}
      {detalleLoading && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          Cargando detalle del usuario...
        </div>
      )}

      <UsuariosDirectory
        usuarios={usuariosFiltrados}
        busqueda={busqueda}
        rolFiltro={rolFiltro}
        onBusquedaChange={setBusqueda}
        onRolFiltroChange={setRolFiltro}
        onVer={handleVerDetalle}
        onEditar={setUsuarioEditando}
        onEliminar={handleEliminarUsuario}
      />

      <UsuarioDetalleModal
        detalle={usuarioDetalle}
        onClose={() => setUsuarioDetalle(null)}
      />

      <UsuarioEditModal
        key={usuarioEditando?.id_usuario || "sin-edicion"}
        usuario={usuarioEditando}
        guardando={guardando}
        onClose={() => setUsuarioEditando(null)}
        onSubmit={handleEditarUsuario}
      />
    </div>
  );
}
