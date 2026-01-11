import { useSelector, useDispatch } from "react-redux";
import { toggleProductStatus } from "../components/redux/slice/inventorySlice";
import ApiService from "./ApiServices/ApiService";

export default function ProductDetails({ openModal }) {
  const dispatch = useDispatch();
  const { selectedProduct, categories } = useSelector(
    (state) => state.inventory
  );
    
  const getId = (value) =>
  typeof value === "string" ? value : value?._id;

  if (!selectedProduct) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a product to view details
      </div>
    );
  }

  let categoryName = "-";
  let subCategoryName = "-";

  categories.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      if (sub.products.find((p) => p._id === selectedProduct._id)) {
        categoryName = cat.name;
        subCategoryName = sub.name;
      }
    });
  });

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {selectedProduct.productName}
        </h1>

        <div className="flex gap-2">
  
  <button
    className="px-4 py-2 border rounded-md text-sm"
    onClick={() =>
      openModal({
        open: true,
        type: "edit-product",
        data: selectedProduct,
      })
    }
  >
    Edit
  </button>

  
  <button
    className="px-4 py-2 border border-red-500 text-red-600 rounded-md text-sm"
    onClick={() => {
       {
        openModal({
          open: true,
          type: "delete-product",
          data: selectedProduct,
        });
      }
    }}
  >
    Delete
  </button>

  
  <button
  className="px-4 py-2 border rounded-md text-sm"
  onClick={async () => {
    try {
      const formData = new FormData();
      formData.append("status", !selectedProduct.status);

      await ApiService.updateProduct(
        getId(selectedProduct.category),
        getId(selectedProduct.subCategory),
        selectedProduct._id,
        formData
      );

      // update redux after backend 
      dispatch(toggleProductStatus(selectedProduct._id));
    } catch (err) {
      console.log(err)
    }
  }}
>
  {selectedProduct.status ? "Deactivate" : "Activate"}
</button>


</div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          <Section title="Primary Details">
            <Row label="Name" value={selectedProduct.productName} />
            <Row label="SKU" value={selectedProduct.sku || "-"} />
            <Row label="Unit" value={selectedProduct.unit || "-"} />
            <Row label="Brand" value={selectedProduct.brand || "-"} />
            <Row label="Description" value={selectedProduct.description || "-"} />
            <Row label="Category" value={categoryName} />
            <Row label="Sub Category" value={subCategoryName} />
          </Section>
        </div>

        <div>
         <div className="border rounded-lg p-4 flex justify-center max-w-sm mx-auto lg:max-w-none">
            {selectedProduct.images?.length ? (
              <img
                src={selectedProduct.images[0].url}
                className="h-40 object-contain"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
