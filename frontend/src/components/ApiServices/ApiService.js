import axios from "axios";
import { get } from "mongoose";

const BASE_URL = "http://localhost:8000";

class ApiServices {

  adminLogin(formData) {
    return axios.post(BASE_URL + "/api/admin/login", formData);
  }

  getToken() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: token,
      },
    };
  }

  adminDashboard() {
    return axios.get(
      BASE_URL + "/api/admin/dashboard",
      this.getToken()
    );
  }



    /* ================= CATEGORY ================= */

  createCategory(data) {
    return axios.post(
      BASE_URL + "/api/category/create",
      data,
      this.getToken()
    );
  }

  getAllCategories() {
    return axios.get(
      BASE_URL + "/api/category/getAll",
      this.getToken()
    );
  }

  updateCategory(id, data) {
    return axios.put(
      `${BASE_URL}/api/category/${id}/update`,
      data,
      this.getToken()
    );
  }

  deleteCategory(id) {
    return axios.delete(
      `${BASE_URL}/api/category/${id}/delete`,
      this.getToken()
    );
  }
  /* ================= SUB CATEGORY ================= */

// Create Sub-Category
createSubCategory(categoryId, data) {
  return axios.post(
    `${BASE_URL}/api/subCategory/categories/${categoryId}/subcategories/create`,
    data,
    this.getToken()
  );
}

// Get Sub-Categories by Category
getSubCategories(categoryId) {
  return axios.get(
    `${BASE_URL}/api/subCategory/categories/${categoryId}/subcategories/list`,
    this.getToken()
  );
}

// Update Sub-Category
updateSubCategory(categoryId, subCategoryId, data) {
  return axios.put(
    `${BASE_URL}/api/subCategory/categories/${categoryId}/subcategories/${subCategoryId}/update`,
    data,
    this.getToken()
  );
}

// Delete Sub-Category
deleteSubCategory(categoryId, subCategoryId) {
  return axios.delete(
    `${BASE_URL}/api/subCategory/categories/${categoryId}/subcategories/${subCategoryId}/delete`,
    this.getToken()
  );
}

// Create Product
createProduct(categoryId, subCategoryId, formData) {
  return axios.post(
    `${BASE_URL}/api/product/categories/${categoryId}/subcategories/${subCategoryId}/products`,
    formData,this.getToken() ,   {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
updateProduct(categoryId, subCategoryId, productId, data) {
  return axios.put(
    `${BASE_URL}/api/product/categories/${categoryId}/subcategories/${subCategoryId}/Products/${productId}/update`,
    data,
    this.getToken(),
     {
      
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}


// Get All Products (by Sub-Category)
getProducts(categoryId, subCategoryId) {
  return axios.get(
    `${BASE_URL}/api/product/categories/${categoryId}/subcategories/${subCategoryId}/allProducts`,
    this.getToken()
  );
}

getAllProducts() {
  return axios.get(`${BASE_URL}/api/product/all`, this.getToken());
}

// Get Single Product
getProductById(categoryId, subCategoryId, productId) {
  return axios.get(
    `${BASE_URL}/api/product/categories/${categoryId}/subcategories/${subCategoryId}/Products/${productId}`,
    this.getToken()
  );
}




// Delete Product
deleteProduct(categoryId, subCategoryId, productId) {
  return axios.delete(
    `${BASE_URL}/api/product/categories/${categoryId}/subcategories/${subCategoryId}/Products/${productId}/delete`,
    this.getToken()
  );
}

}



export default new ApiServices();
