import { useState } from "react";

export default function SubCategoryForm({ defaultValue = "", onSubmit }) {
  const [name, setName] = useState(defaultValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name); // ✅ string, not object
      }}
      className="space-y-4"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="Sub-category name"
        required
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Save
      </button>
    </form>
  );
}
