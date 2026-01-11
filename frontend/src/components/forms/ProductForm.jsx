import { useState } from "react";
export default function ProductForm({ onSubmit }) {
  const [name, setName] = useState("");
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(name); }}>
      <input className="border w-full mb-2 p-2" onChange={e => setName(e.target.value)} />
      <button className="bg-blue-600 text-white w-full py-2">Save</button>
    </form>
  );
}
