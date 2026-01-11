import { useState, useEffect } from "react";

export default function AddProductForm({
  mode = "create",
  initialData = {},
  categoryId,
  subCategoryId,
  onSubmit,
}) {
  const [form, setForm] = useState({
    productName: "",
    brand: "",
    sku: "",
    unit: "",
    description: "",
    status: true,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        productName: initialData.productName || "",
        brand: initialData.brand || "",
        sku: initialData.sku || "",
        unit: initialData.unit || "",
        description: initialData.description || "",
        status: initialData.status ?? true,
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 

    setLoading(true); 

    try {
      const formData = new FormData();
      formData.append("category", categoryId);
      formData.append("subCategory", subCategoryId);

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach((img) => formData.append("images", img));

      await onSubmit(formData); 
    } catch (err) {
      console.error("Product submit failed", err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* GRID FIELDS */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Product Name"
          name="productName"
          value={form.productName}
          onChange={handleChange}
          required
        />

        <Input
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
        />

        <Input
          label="SKU"
          name="sku"
          value={form.sku}
          onChange={handleChange}
        />

        <Input
          label="Unit"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="pcs / kg"
        />
      </div>

      
      <div>
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
          rows={3}
        />
      </div>

     
      {mode === "edit" && initialData.images?.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Existing Images</p>
          <div className="flex gap-2 flex-wrap">
            {initialData.images.map((img) => (
              <img
                key={img._id}
                src={img.url}
                className="h-16 w-16 object-cover rounded border"
                alt=""
              />
            ))}
          </div>
        </div>
      )}

      
      <div>
        <label className="text-sm text-gray-600">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
          className="block w-full text-sm mt-1"
        />
      </div>

     
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded text-sm text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? mode === "edit"
              ? "Updating..."
              : "Saving..."
            : mode === "edit"
            ? "Update Product"
            : "Save Product"}
        </button>
      </div>
    </form>
  );
}



function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full mt-1 border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
