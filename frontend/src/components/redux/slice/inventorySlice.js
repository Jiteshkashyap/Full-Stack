import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategoryId: null,
  selectedSubCategoryId: null,
  selectedProduct: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    /* ================= LOAD FROM BACKEND ================= */
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    /* ================= SELECTION ================= */
    selectCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
      state.selectedSubCategoryId = null;
      state.selectedProduct = null;
    },

    selectSubCategory: (state, action) => {
      state.selectedSubCategoryId = action.payload;
      state.selectedProduct = null;
    },

    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    /* ================= CATEGORY CRUD ================= */
    addCategory: (state, action) => {
  state.categories = [...state.categories, action.payload];
},


    editCategory: (state, action) => {
      const cat = state.categories.find(
        (c) => c.id === action.payload.id
      );
      if (cat) cat.name = action.payload.name;
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },

    toggleCategoryStatus: (state, action) => {
      const cat = state.categories.find(
        (c) => c.id === action.payload
      );
      if (cat) cat.status = !cat.status;
    },

    /* ================= SUB CATEGORY CRUD ================= */
   addSubCategory: (state, action) => {
  const { categoryId, subCategory } = action.payload;

  state.categories = state.categories.map((cat) =>
    cat._id === categoryId
      ? {
          ...cat,
          subCategories: [...cat.subCategories, subCategory],
        }
      : cat
  );
},



    editSubCategory: (state, action) => {
      state.categories.forEach((cat) => {
        const sub = cat.subCategories?.find(
          (s) => s.id === action.payload.id
        );
        if (sub) sub.name = action.payload.name;
      });
    },

    deleteSubCategory: (state, action) => {
      state.categories.forEach((cat) => {
        cat.subCategories = cat.subCategories?.filter(
          (s) => s.id !== action.payload
        );
      });
    },
   selectProduct: (state, action) => {
  state.selectedProduct = action.payload;
},

    toggleSubCategoryStatus: (state, action) => {
      state.categories.forEach((cat) => {
        const sub = cat.subCategories?.find(
          (s) => s.id === action.payload
        );
        if (sub) sub.status = !sub.status;
      });
    },

    /* ================= PRODUCT CRUD ================= */
addProduct: (state, action) => {
  const { subCategoryId, product } = action.payload;

  state.categories = state.categories.map((cat) => ({
    ...cat,
    subCategories: cat.subCategories.map((sub) =>
      sub._id === subCategoryId
        ? { ...sub, products: [...sub.products, product] }
        : sub
    ),
  }));
},

    editProduct: (state, action) => {
      state.categories.forEach((cat) =>
        cat.subCategories?.forEach((sub) => {
          const prod = sub.products?.find(
            (p) => p.id === action.payload.id
          );
          if (prod) Object.assign(prod, action.payload);
        })
      );
    },

    deleteProduct: (state, action) => {
      state.categories.forEach((cat) =>
        cat.subCategories?.forEach((sub) => {
          sub.products = sub.products?.filter(
            (p) => p.id !== action.payload
          );
        })
      );
    },

    toggleProductStatus: (state, action) => {
  let updatedStatus = null;

  state.categories.forEach(cat =>
    cat.subCategories.forEach(sub => {
      const prod = sub.products?.find(
        p => p._id === action.payload
      );
      if (prod) {
        prod.status = !prod.status;
        updatedStatus = prod.status;
      }
    })
  );

  // 🔥 THIS WAS MISSING
  if (state.selectedProduct && state.selectedProduct._id === action.payload) {
    state.selectedProduct.status = updatedStatus;
  }
},


  },
});

export const {
  setCategories,
  selectCategory,
  selectSubCategory,
  selectProduct,
  addCategory,
  editCategory,
  deleteCategory,
  toggleCategoryStatus,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
  toggleSubCategoryStatus,
  addProduct,
  editProduct,
  deleteProduct,
  toggleProductStatus,
} = inventorySlice.actions;

export default inventorySlice.reducer;
