import CarreraForm from "./CarreraForm";

export default function CarreraModal({ open, onClose, onSubmit, carrera }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {carrera ? "Editar carrera" : "Nueva carrera"}
          </h2>

          <button onClick={onClose}>✕</button>
        </div>

        <CarreraForm carrera={carrera} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
