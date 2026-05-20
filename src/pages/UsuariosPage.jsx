import { useEffect, useMemo, useState } from "react";
import UsuarioForm from "../components/usuarios/UsuarioForm";
import UsuariosDirectory from "../components/usuarios/UsuariosDirectory";
import UsuariosHeader from "../components/usuarios/UsuariosHeader";
import {
  alumnoInicial,
  contactoEmergenciaInicial,
  docenteInicial,
  procedenciaAcademicaInicial,
  seguroMedicoInicial,
  tutorInicial,
  usuarioInicial,
} from "../components/usuarios/usuarioFormConfig";
import { obtenerCarreras } from "../services/carrerasService";
import { obtenerPlanesEstudio } from "../services/planesEstudioService";
import {
  obtenerUsuarios,
  crearUsuarioPorRol,
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

  return "No se pudo crear el usuario.";
};

const tieneValores = (payload) => {
  return Object.values(payload).some(
    (value) => value !== "" && value !== false && value !== null,
  );
};

export default function UsuariosPage() {
  const [rol, setRol] = useState("ALUMNO");
  const [usuarioForm, setUsuarioForm] = useState(usuarioInicial);
  const [alumnoForm, setAlumnoForm] = useState(alumnoInicial);
  const [docenteForm, setDocenteForm] = useState(docenteInicial);
  const [tutorForm, setTutorForm] = useState(tutorInicial);
  const [contactosEmergenciaForm, setContactosEmergenciaForm] = useState([
    { ...contactoEmergenciaInicial, id: crypto.randomUUID() },
  ]);
  const [seguroMedicoForm, setSeguroMedicoForm] = useState(
    seguroMedicoInicial,
  );
  const [procedenciaAcademicaForm, setProcedenciaAcademicaForm] = useState(
    procedenciaAcademicaInicial,
  );
  const [usuarios, setUsuarios] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [usuariosResponse, carrerasResponse, planesResponse] =
        await Promise.all([
          obtenerUsuarios(),
          obtenerCarreras(),
          obtenerPlanesEstudio(),
        ]);

      setUsuarios(usuariosResponse);
      setCarreras(carrerasResponse);
      setPlanes(planesResponse);
    } catch (requestError) {
      console.error(requestError);
      setError("No se pudieron cargar los datos iniciales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;

    Promise.all([obtenerUsuarios(), obtenerCarreras(), obtenerPlanesEstudio()])
      .then(([usuariosResponse, carrerasResponse, planesResponse]) => {
        if (activo) {
          setUsuarios(usuariosResponse);
          setCarreras(carrerasResponse);
          setPlanes(planesResponse);
        }
      })
      .catch((requestError) => {
        console.error(requestError);

        if (activo) {
          setError("No se pudieron cargar los datos iniciales.");
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

  const planesDisponibles = useMemo(() => {
    if (!alumnoForm.id_carrera) {
      return planes;
    }

    return planes.filter(
      (plan) => plan.carrera?.id_carrera === Number(alumnoForm.id_carrera),
    );
  }, [planes, alumnoForm.id_carrera]);

  const usuariosRecientes = useMemo(() => {
    return [...usuarios]
      .sort((a, b) => Number(b.id_usuario) - Number(a.id_usuario))
      .slice(0, 12);
  }, [usuarios]);

  const handleUsuarioChange = (event) => {
    const { name, value } = event.target;

    setUsuarioForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlumnoChange = (event) => {
    const { name, value } = event.target;

    setAlumnoForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "id_carrera" ? { id_plan: "" } : {}),
    }));
  };

  const handleDocenteChange = (event) => {
    const { name, value } = event.target;

    setDocenteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTutorChange = (event) => {
    const { name, value } = event.target;

    setTutorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactoEmergenciaChange = (id, event) => {
    const { name, value, type, checked } = event.target;

    setContactosEmergenciaForm((prev) =>
      prev.map((contacto) => {
        if (contacto.id !== id) {
          if (name === "contacto_principal" && checked) {
            return {
              ...contacto,
              contacto_principal: false,
            };
          }

          return contacto;
        }

        return {
          ...contacto,
          [name]: type === "checkbox" ? checked : value,
        };
      }),
    );
  };

  const handleAgregarContactoEmergencia = () => {
    setContactosEmergenciaForm((prev) => [
      ...prev,
      {
        ...contactoEmergenciaInicial,
        id: crypto.randomUUID(),
        contacto_principal: prev.length === 0,
      },
    ]);
  };

  const handleEliminarContactoEmergencia = (id) => {
    setContactosEmergenciaForm((prev) => {
      const contactos = prev.filter((contacto) => contacto.id !== id);

      if (contactos.length > 0 && !contactos.some((c) => c.contacto_principal)) {
        return contactos.map((contacto, index) => ({
          ...contacto,
          contacto_principal: index === 0,
        }));
      }

      return contactos;
    });
  };

  const handleSeguroMedicoChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSeguroMedicoForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProcedenciaAcademicaChange = (event) => {
    const { name, value } = event.target;

    setProcedenciaAcademicaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setUsuarioForm(usuarioInicial);
    setAlumnoForm(alumnoInicial);
    setDocenteForm(docenteInicial);
    setTutorForm(tutorInicial);
    setContactosEmergenciaForm([
      { ...contactoEmergenciaInicial, id: crypto.randomUUID() },
    ]);
    setSeguroMedicoForm(seguroMedicoInicial);
    setProcedenciaAcademicaForm(procedenciaAcademicaInicial);
    setRol("ALUMNO");
  };

  const prepararAlumno = () => {
    const data = limpiarPayload(alumnoForm);

    return {
      ...data,
      id_carrera: Number(data.id_carrera),
      id_plan: Number(data.id_plan),
    };
  };

  const prepararTutor = () => {
    if (!tutorForm.nombre.trim()) {
      return undefined;
    }

    return limpiarPayload(tutorForm);
  };

  const prepararContactosEmergencia = () => {
    const contactos = contactosEmergenciaForm
      .filter((contacto) => contacto.nombre.trim())
      .map((contacto) => {
        const data = { ...contacto };
        delete data.id;

        return limpiarPayload(data);
      });

    if (contactos.length === 0) {
      return undefined;
    }

    if (!contactos.some((contacto) => contacto.contacto_principal)) {
      return contactos.map((contacto, index) => ({
        ...contacto,
        contacto_principal: index === 0,
      }));
    }

    return contactos;
  };

  const prepararSeguroMedico = () => {
    if (!tieneValores(seguroMedicoForm)) {
      return undefined;
    }

    return limpiarPayload(seguroMedicoForm);
  };

  const prepararProcedenciaAcademica = () => {
    if (!tieneValores(procedenciaAcademicaForm)) {
      return undefined;
    }

    const data = limpiarPayload(procedenciaAcademicaForm);

    if (data.promedio_general) {
      data.promedio_general = Number(data.promedio_general);
    }

    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje("");
    setError("");
    setGuardando(true);

    try {
      await crearUsuarioPorRol({
        rol,
        usuario: limpiarPayload(usuarioForm),
        alumno: rol === "ALUMNO" ? prepararAlumno() : undefined,
        docente: rol === "DOCENTE" ? limpiarPayload(docenteForm) : undefined,
        tutor: rol === "ALUMNO" ? prepararTutor() : undefined,
        contactosEmergencia:
          rol === "ALUMNO" ? prepararContactosEmergencia() : undefined,
        seguroMedico: rol === "ALUMNO" ? prepararSeguroMedico() : undefined,
        procedenciaAcademica:
          rol === "ALUMNO" ? prepararProcedenciaAcademica() : undefined,
      });

      setMensaje("Usuario creado correctamente.");
      resetForm();
      await cargarDatos();
    } catch (requestError) {
      console.error(requestError);
      setError(obtenerMensajeError(requestError));
    } finally {
      setGuardando(false);
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
      <UsuariosHeader total={usuarios.length} onRefresh={cargarDatos} />

      <div className="h-px w-full bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)]">
        <UsuarioForm
          rol={rol}
          usuarioForm={usuarioForm}
          alumnoForm={alumnoForm}
          docenteForm={docenteForm}
          tutorForm={tutorForm}
          contactosEmergenciaForm={contactosEmergenciaForm}
          seguroMedicoForm={seguroMedicoForm}
          procedenciaAcademicaForm={procedenciaAcademicaForm}
          carreras={carreras}
          planesDisponibles={planesDisponibles}
          mensaje={mensaje}
          error={error}
          guardando={guardando}
          onRolChange={setRol}
          onUsuarioChange={handleUsuarioChange}
          onAlumnoChange={handleAlumnoChange}
          onDocenteChange={handleDocenteChange}
          onTutorChange={handleTutorChange}
          onContactoEmergenciaChange={handleContactoEmergenciaChange}
          onAgregarContactoEmergencia={handleAgregarContactoEmergencia}
          onEliminarContactoEmergencia={handleEliminarContactoEmergencia}
          onSeguroMedicoChange={handleSeguroMedicoChange}
          onProcedenciaAcademicaChange={handleProcedenciaAcademicaChange}
          onReset={resetForm}
          onSubmit={handleSubmit}
        />

        <UsuariosDirectory usuarios={usuariosRecientes} />
      </div>
    </div>
  );
}
