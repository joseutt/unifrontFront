import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlanesEstudioPage from "./pages/PlanesEstudioPage";
import CarrerasPage from "./pages/CarrerasPage";
import MateriasPage from "./pages/MateriasPage";
import ConstanciaEstudios from "./pages/ConstanciaEstudios";
import DocumentosAlumnoPage from "./pages/DocumentosAlumnoPage";
import AlumnosGruposPage from "./pages/AlumnosGruposPage";
import AsistenciaPage from "./pages/AsistenciaPage";
import CapturaCalificacionesPage from "./pages/CapturaCalificacionesPage";
import UsuariosAltaPage from "./pages/UsuariosAltaPage";
import UsuariosPage from "./pages/UsuariosPage";
import ReportesFundamentalesPage from "./pages/ReportesFundamentalesPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import ConstanciaTerminacion from "./pages/ConstanciaTerminacion";
import ActaExamenExtraordinario from "./pages/ActaExamenExtraordinario";
import ActaExamenTituloSuficiencia from "./pages/ActaExamenTituloSuficiencia";
import BoletaFinal from "./pages/BoletaFinal";
import ReciboDocumentosOriginales from "./pages/ReciboDocumentosOriginales";
import RegistroReinscripcionAlumnos from "./pages/RegistroReinscripcionAlumnos";
import PromediosGrupo from "./pages/PromediosGrupos";
import RezagoCarreras from "./pages/RezagoCarreras";
import Kardex from "./pages/Kardex"

function CuadroHonorPage() {
  return (
    <div className="p-6 text-2xl font-bold">Página de cuadro de honor</div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Carreras */}
        <Route
          path="/carreras"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CarrerasPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Materias */}
        <Route
          path="/materias"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MateriasPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Planes */}
        <Route
          path="/planes-estudio"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PlanesEstudioPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Alumnos */}
        <Route
          path="/alumnos"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AlumnosGruposPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Captura */}
        <Route
          path="/captura"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CapturaCalificacionesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Asistencia */}
        <Route
          path="/asistencia"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AsistenciaPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Cuadro honor */}
        <Route
          path="/cuadro-honor"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CuadroHonorPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Constancia estudios */}
        {/* Usuarios */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UsuariosPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/nuevo"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UsuariosAltaPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Reportes fundamentales */}
        <Route
          path="/reportes-fundamentales"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ReportesFundamentalesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Constancias */}
        <Route
          path="/constancia-estudios"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ConstanciaEstudios />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Constancia Terminacion */}
        <Route
          path="/constancia-terminacion"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ConstanciaTerminacion />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Documentos alumnos */}
        <Route
          path="/documentos-alumno"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DocumentosAlumnoPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Acta examen extraordinario */}
        <Route
          path="/acta-examen-extraordinario"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ActaExamenExtraordinario />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Acta examen titulo suficiencia */}
        <Route
          path="/acta-examen-titulo-suficiencia"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ActaExamenTituloSuficiencia />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Recibo documentos originales */}
        <Route
          path="/recibo-documentos-originales"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ReciboDocumentosOriginales />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Registro reinscripcion alumnos */}
        <Route
          path="/registro-reinscripcion-alumnos"
          element={
            <ProtectedRoute>
              <MainLayout>
                <RegistroReinscripcionAlumnos />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Boleta final */}
        <Route
          path="/boleta-final"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BoletaFinal />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Documentos alumnos */}
        <Route
          path="/documentos-alumno/:alumnoId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DocumentosAlumnoPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Promedios  */}
        <Route
          path="/promedios"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PromediosGrupo />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Rezago de alumnos por carrera */}
        <Route 
          path="/rezago"
          element={
            <ProtectedRoute>
              <MainLayout>
                <RezagoCarreras/>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Kardex*/}
        <Route 
          path="/kardex"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Kardex/>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
