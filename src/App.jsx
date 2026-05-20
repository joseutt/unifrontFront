import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlanesEstudioPage from "./pages/PlanesEstudioPage";
import CarrerasPage from "./pages/CarrerasPage";
import MateriasPage from "./pages/MateriasPage";
import ConstanciaEstudios from "./pages/ConstanciaEstudios";
import DocumentosAlumnoPage from "./pages/DocumentosAlumnoPage";
import UsuariosAltaPage from "./pages/UsuariosAltaPage";
import UsuariosPage from "./pages/UsuariosPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import ConstanciaTerminacion from "./pages/ConstanciaTerminacion";
import ActaExamenExtraordinario from "./pages/ActaExamenExtraordinario";
import ActaExamenTituloSuficiencia from "./pages/ActaExamenTituloSuficiencia";
import ReciboDocumentosOriginales from "./pages/ReciboDocumentosOriginales";


/* Temporales */
function AlumnosPage() {
  return <div className="p-6 text-2xl font-bold">Página de alumnos</div>;
}

function CapturaPage() {
  return <div className="p-6 text-2xl font-bold">Página de captura</div>;
}

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
                <AlumnosPage />
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
                <CapturaPage />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
