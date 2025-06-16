// store/useProductStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Product = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string; // Optional notes field
}

interface ProductState {
  products: Product[]
  selectedProduct: Product | null; //Store the currently selected product for editing
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  editProduct: (product: Product) => void; 
  setSelectedProduct: (product: Product | null) => void;
  resetProducts: () => void; // Optional: to reset products if needed
}

const useProductStore = create<ProductState>()(devtools(
  (set) => ({
    products: JSON.parse(localStorage.getItem("products") || "[]"),
    selectedProduct: null,
    addProduct: (product) => 
      set((state) => {
        const updatedProducts = [...state.products, product];
        localStorage.setItem("products", JSON.stringify(updatedProducts)); // Save to localStorage
        return { products: updatedProducts };
      }),
    deleteProduct: (id) => 
      set((state) => {
        const updatedProducts = state.products.filter((product) => product.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedProducts)); // Save to localStorage
        return { products: updatedProducts };
      }),
    editProduct: (updatedProduct) =>
      set((state) => {
        const updatedProducts = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts)); // Save to localStorage
        return { products: updatedProducts };
      }),
    setSelectedProduct: (product) => set({selectedProduct: product }),
    resetProducts: () => {
      localStorage.removeItem("products"); // Remove products from localStorage
      set({ products: [] }); // Reset products state
    },
  })),
);

export default useProductStore;