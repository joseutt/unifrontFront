import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { loginRequest } from "../services/authService";
import { useAuth } from "../context/authStore";
import { useNavigate } from "react-router-dom";
import { consumeSessionExpiredMessage } from "../services/session";

const getDefaultPath = (user) => {
  const roles = user?.roles?.map((role) => role.nombre) || [];
  const isOnlyAlumno =
    roles.includes("ALUMNO") && roles.every((role) => role === "ALUMNO");

  return isOnlyAlumno ? "/alumno/boleta-final" : "/dashboard";
};

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(() => consumeSessionExpiredMessage());
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setNotice("");

    try {
      setLoading(true);

      const data = await loginRequest(email, password);

      login(data.access_token, data.user);

      navigate(getDefaultPath(data.user));
    } catch (err) {
      console.error(err);

      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[var(--primary)] p-4 rounded-2xl text-white mb-4">
            <GraduationCap size={32} />
          </div>

          <h1 className="text-4xl font-display text-[var(--primary)]">
            Unifront
          </h1>

          <p className="text-sm text-gray-500 mt-2">Sistema universitario</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Correo</label>

            <input
              type="email"
              placeholder="correo@universidad.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Contraseña</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          {notice && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {notice}
            </div>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[var(--primary)] py-3 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
