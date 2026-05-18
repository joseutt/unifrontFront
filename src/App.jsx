import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlanesEstudioPage from "./pages/PlanesEstudioPage";
import CarrerasPage from "./pages/CarrerasPage";
import MateriasPage from "./pages/MateriasPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
