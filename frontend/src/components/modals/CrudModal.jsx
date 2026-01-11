import { X } from "lucide-react";

export default function CrudModal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
  className=" bg-white rounded-lg w-full max-w-lg mx-4 p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
