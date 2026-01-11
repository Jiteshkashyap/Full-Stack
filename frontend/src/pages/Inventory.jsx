import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import InventoryTree from "../components/InventoryTree";
import ProductDetails from "../components/ProductDetails";
import CrudModal from "../components/modals/CrudModal";
import AddCategoryForm from "../components/forms/AddCategoryForm";
import SubCategoryForm from "../components/forms/SubCategoryForm";
import AddProductForm from "../components/forms/AddProductForm";
import CategoryForm from "../components/forms/CatgeoryForms";
import ApiService from "../components/ApiServices/ApiService";

import {
  setCategories,
  addCategory,
  editCategory,
  selectCategory,
  selectSubCategory,
  deleteCategory,
  addSubCategory,
  editSubCategory,
  deleteProduct,
  deleteSubCategory,
  addProduct,
} from "../components/redux/slice/inventorySlice";

export default function Inventory() {
  const dispatch = useDispatch();

  const [modal, setModal] = useState({
    open: false,
    type: null,
    data: null,
  });
  
  const getId = (value) =>
  typeof value === "string" ? value : value?._id;


  const closeModal = () =>
    setModal({ open: false, type: null, data: null });

  //tree
  const buildInventoryTree = (categories, subCategories, products) => {
    return categories.map((cat) => ({
      id: cat._id,
      name: cat.name,
      status: cat.status,
      subCategories: subCategories
        .filter((sub) => sub.category?._id === cat._id)
        .map((sub) => ({
          id: sub._id,
          name: sub.name,
          status: sub.status,
          category: cat._id,
          products: products.filter(
            (p) =>
              p.category?._id === cat._id &&
              p.subCategory?._id === sub._id
          ),
        })),
    }));
  };

  
  useEffect(() => { async function loadInventory() {
      try {
        const [catRes, subRes, prodRes] = await Promise.all([
          ApiService.getAllCategories(),
          ApiService.getSubCategories(),
          ApiService.getAllProducts(),
        ]);

        const categories = catRes.data.data || [];
        const subCategories = subRes.data.data || [];
        const products = prodRes.data.data || [];

        const tree = buildInventoryTree(
          categories,
          subCategories,
          products
        );

        dispatch(setCategories(tree));
      } catch (err) {
        console.error("Failed to load inventory", err);
      }
    }

    loadInventory();
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">

      
      <div
  className="w-full lg:w-[360px] bg-white border-b lg:border-b-0 lg:border-r max-h-[40vh] lg:max-h-full overflow-y-auto
  "
>

        <InventoryTree openModal={setModal} />
      </div>

      
      <div className="flex-1 overflow-y-auto">

        <ProductDetails openModal={setModal} />
      </div>

   
      <CrudModal isOpen={modal.open} title={modal.type} onClose={closeModal}>
        {/* category */}
        {modal.type === "add-category" && (
          <AddCategoryForm
            onSubmit={async (name) => {
              const res = await ApiService.createCategory({name});

              dispatch(
  addCategory({
    id: res.data._id,
    name: res.data.name,
    status: res.data.status,
    subCategories: [],
  })
);


        dispatch(selectCategory(res.data._id));
              closeModal();
            }}
          />
        )}

        {modal.type === "edit-category" && (
          <CategoryForm
            defaultValue={modal.data.name}
            onSubmit={async (name) => {
              await ApiService.updateCategory(modal.data.id, { name });
              dispatch(editCategory({ id: modal.data.id, name }));
              closeModal();
            }}
          />
        )}

        {modal.type === "delete-category" && (
          <DeleteConfirm
            name={modal.data.name}
            onConfirm={async () => {
              await ApiService.deleteCategory(modal.data.id);
              dispatch(deleteCategory(modal.data.id));
              closeModal();
            }}
            onCancel={closeModal}
          />
        )}

        {/* sub-category */}
        {modal.type === "add-sub" && (
          <SubCategoryForm
            onSubmit={async (name) => {
              const res = await ApiService.createSubCategory(
                modal.data.id,
                { name }
              );

              dispatch(
  addSubCategory({
    categoryId: modal.data.id,
    subCategory: {
      id: res.data._id,
      name: res.data.name,
      status: res.data.status,
      products: [],
    },
  })
);


dispatch(selectCategory(modal.data.id));
dispatch(selectSubCategory(res.data._id));
              closeModal();
            }}
          />
        )}

        {modal.type === "edit-sub" && (
          <SubCategoryForm
            defaultValue={modal.data.name}
            onSubmit={async (name) => {
              await ApiService.updateSubCategory(
                modal.data.category,
                modal.data.id,
                { name }
              );
              dispatch(editSubCategory({ id: modal.data.id, name }));
              closeModal();
            }}
          />
        )}

        {modal.type === "delete-sub" && (
          <DeleteConfirm
            name={modal.data.name}
            onConfirm={async () => {
              await ApiService.deleteSubCategory(
                modal.data.category,
                modal.data.id
              );
              dispatch(deleteSubCategory(modal.data.id));
              closeModal();
            }}
            onCancel={closeModal}
          />
        )}

        {/* add-product */}
        {modal.type === "add-product" && (
          <AddProductForm
            categoryId={modal.data.categoryId}
            subCategoryId={modal.data.subCategoryId}
            onSubmit={async (formData) => {
              const res = await ApiService.createProduct(modal.data.categoryId,modal.data.subCategoryId,formData);
              const product = res.data.data || res.data;

              dispatch(
                addProduct({
                  subCategoryId: modal.data.subCategoryId,
                  product: {
                    _id: product._id,
                    productName: product.productName,
                    sku: product.sku,
                    unit: product.unit,
                    status: product.status,
                    description: product.description,
                    images: product.images || [],
                    
                  },
                })
              );

              closeModal();
            }}
          />
        )}
      {/* edit-product */}
        {modal.type === "edit-product" && (
  <AddProductForm
    mode="edit"
    initialData={modal.data}
    categoryId={modal.data.category?._id}
    subCategoryId={modal.data.subCategory?._id}
    onSubmit={async (formData) => {
      const res = await ApiService.updateProduct(
        getId(modal.data.category),
        getId(modal.data.subCategory),
        modal.data._id,
        formData
      );

      const updated = res.data.data || res.data;

      dispatch({
        type: "inventory/editProduct",
        payload: updated,
      });

      closeModal();
    }}
  />
         )}
         {/* delete-product */}
         {modal.type === "delete-product" && (
  <DeleteConfirm
    name={modal.data.productName}
    onConfirm={async () => {
      await ApiService.deleteProduct(modal.data.category._id,
            modal.data.subCategory._id,
            modal.data._id);
      dispatch(deleteProduct(modal.data._id));
      closeModal();
    }}
    onCancel={closeModal}
  />
        )}


      </CrudModal>
    </div>
  );
}


function DeleteConfirm({ name, onConfirm, onCancel }) {
  return (
    <div>
      <p className="mb-4">
        Are you sure you want to delete <b>{name}</b>?
      </p>
      <div className="flex gap-2">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Delete
        </button>
        <button
          className="border px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
