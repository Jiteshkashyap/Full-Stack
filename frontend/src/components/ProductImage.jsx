export default function ProductForm({ onSubmit }) {
  const [image, setImage] = useState(null);

  return (
    <form className="space-y-4">
      <input type="text" placeholder="Product Name" />
      <input type="number" placeholder="Price" />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(URL.createObjectURL(e.target.files[0]))
        }
      />

      {image && (
        <img
          src={image}
          className="h-32 object-contain border rounded"
        />
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Product
      </button>
    </form>
  );
}
