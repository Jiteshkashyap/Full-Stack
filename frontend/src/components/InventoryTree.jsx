import { useSelector, useDispatch } from "react-redux";
import {
  selectCategory,
  selectSubCategory,
  selectProduct,
  toggleCategoryStatus,
  toggleSubCategoryStatus,
} from "../components/redux/slice/inventorySlice";

import ApiService from "../components/ApiServices/ApiService";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";

export default function InventoryTree({ openModal }) {
  const dispatch = useDispatch();

  const {
    categories,
    selectedCategoryId,
    selectedSubCategoryId,
    selectedProduct,
  } = useSelector((state) => state.inventory);


  const handleCategoryToggle = async (category) => {
    try {
      await ApiService.updateCategory(category.id, {
        status: !category.status,
      });
      dispatch(toggleCategoryStatus(category.id));
    } catch (err) {
      console.error("Category status update failed", err);
    }
  };

  
  const handleSubCategoryToggle = async (categoryId, sub) => {
    try {
      await ApiService.updateSubCategory(categoryId, sub.id, {
        status: !sub.status,
      });
      dispatch(toggleSubCategoryStatus(sub.id));
    } catch (err) {
      console.error("SubCategory status update failed", err);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
     
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h2 className="font-semibold">Inventory</h2>
        <button
          onClick={() => openModal({ open: true, type: "add-category" })}
          className="text-blue-600 text-sm"
        >
          + Add Category
        </button>
      </div>

    {/* tree */}
      <div className="p-2">
        {Array.isArray(categories) &&
          categories.map((category) => {
            const openCat = category.id === selectedCategoryId;

            return (
              <div key={category.id}>
                {/* CATEGORY */}
                <Row
                  open={openCat}
                  label={category.name}
                  inactive={!category.status}
                  onClick={() =>
                    dispatch(selectCategory(category.id))
                  }
                  onEdit={() =>
                    openModal({
                      open: true,
                      type: "edit-category",
                      data: category,
                    })
                  }
                  onDelete={() =>
                    openModal({
                      open: true,
                      type: "delete-category",
                      data: category,
                    })
                  }
                  onToggle={() => handleCategoryToggle(category)}
                />

                {/*  ADD SUB CATEGORY  */}
                {openCat && category.status && (
                  <button
                    className="ml-6 mt-1 text-xs text-blue-600 hover:underline"
                    onClick={() =>
                      openModal({
                        open: true,
                        type: "add-sub",
                        data: category,
                      })
                    }
                  >
                    + Add Sub-Category
                  </button>
                )}

                {/* SUB-CATEGORIES */}
                {openCat &&
                  Array.isArray(category.subCategories) &&
                  category.subCategories.map((sub) => {
                    const openSub =
                      sub.id === selectedSubCategoryId;

                    return (
                      <div key={sub.id} className="ml-6">
                        <Row
                          open={openSub}
                          label={sub.name}
                          inactive={!sub.status}
                          onClick={() =>
                            dispatch(selectSubCategory(sub.id))
                          }
                          onEdit={() =>
                            openModal({
                              open: true,
                              type: "edit-sub",
                              data: sub,
                            })
                          }
                          onDelete={() =>
                            openModal({
                              open: true,
                              type: "delete-sub",
                              data: sub,
                            })
                          }
                          onToggle={() =>
                            handleSubCategoryToggle(
                              category.id,
                              sub
                            )
                          }
                        />

                        {/*  ADD PRODUCT*/}
                        {openSub && sub.status && (
                          <button
                            className="ml-6 mt-1 text-xs text-green-600 hover:underline"
                            onClick={() =>
                              openModal({
                                open: true,
                                type: "add-product",
                                data: {
                                  categoryId: category.id,
                                  subCategoryId: sub.id,
                                },
                              })
                            }
                          >
                            + Add Product
                          </button>
                        )}

                        {/* PRODUCTS */}
                        {openSub &&
                          Array.isArray(sub.products) &&
                          sub.products.map((product) => {
                            if (!product) return null;

                            return (
                              <div
                                key={product._id}
                                onClick={() =>
                                  product.status &&
                                  dispatch(selectProduct(product))
                                }
                                className={`ml-6 px-3 py-2 rounded cursor-pointer text-sm ${
                                  selectedProduct?._id === product._id
                                    ? "bg-purple-100 text-purple-700"
                                    : "hover:bg-gray-100"
                                }`}
                              >
                                {product.productName}
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}


function Row({
  open,
  label,
  inactive,
  onClick,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <div
      onClick={onClick}
      className=" group flex items-center gap-2 px-3 py-3 rounded cursor-pointer hover:bg-gray-100 text-sm"
 >
      {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}

      <span className={`flex-1 ${inactive ? "text-gray-400" : ""}`}>
        {label}
      </span>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="text-xs text-blue-600"
        >
          {inactive ? "Activate" : "Deactivate"}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Pencil size={14} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 size={14} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
