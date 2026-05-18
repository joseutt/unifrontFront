import MateriaForm from "./MateriaForm";

export default function MateriaModal({ open, onClose, onSubmit, materia }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {materia ? "Editar materia" : "Nueva materia"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <MateriaForm materia={materia} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
