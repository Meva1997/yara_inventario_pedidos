import {useForm} from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import {toast} from "react-toastify"
import useProductStore from "../stores/useProductStore";
import useBudgetStore from "../stores/useBudgetStore";
import Budget from "../components/Budget";


type ProductFormData = {
  name: string,
  quantity: number,
  unitPrice: number
  notes?: string // Campo opcional para notas
}

export default function ProductForm() {

  const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm<ProductFormData>();
  const addProduct = useProductStore((state) => state.addProduct)
  const editProduct = useProductStore((state) => state.editProduct)
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);
  const budget = useBudgetStore((state) => state.budget);
  const products = useProductStore((state) => state.products);

  const totalSpent = products.reduce((acc, product) => acc + (product.quantity * product.unitPrice), 0);
  const remainingBudget = budget! - totalSpent;

  useEffect(() => {
    // Si hay un producto seleccionado, precargar los datos en el formulario
    if (selectedProduct) {
      setValue("name", selectedProduct.name);
      setValue("quantity", selectedProduct.quantity);
      setValue("unitPrice", selectedProduct.unitPrice);
      setValue("notes", selectedProduct.notes || ""); // Cargar notas si existen
    }
  }, [selectedProduct, setValue]);

  const onSubmit = (data: ProductFormData) => {

    const newTotal = data.quantity * data.unitPrice; // Calcula el total del producto
    const oldTotal = selectedProduct ? selectedProduct.total : 0; // Si hay un producto seleccionado, usa su total, de lo contrario es 0

    const adjustedRemainingBudget = remainingBudget + oldTotal; // Ajusta el presupuesto restante sumando el total del producto existente (si lo hay)

    if(adjustedRemainingBudget < newTotal){
      toast.error("El total del producto excede el presupuesto disponible", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const newProduct = {
      id: selectedProduct ? selectedProduct.id : uuidv4(), // Si hay un producto seleccionado, usa su ID, de lo contrario genera uno nuevo
      name: data.name,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      total: data.quantity * data.unitPrice,
      notes: data.notes || "" // Usa las notas del formulario, si existen
    }

    if(selectedProduct) {
      // Si hay un producto seleccionado, actualiza el producto existente
      editProduct(newProduct);
      setSelectedProduct(null); // Limpia el producto seleccionado después de editar
      toast.success("Producto actualizado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    } else {
      // Si no hay un producto seleccionado, agrega un nuevo producto
      addProduct(newProduct);
      toast.success("Producto agregado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // Reinicia el formulario
    reset()
  }

  return (
    
    <>
      <section className="p-4 bg-white rounded shadow">
        <h2 className="mb-2 text-lg font-bold text-blue-700 md:text-center">Agregar Producto</h2>
        <form className="grid grid-cols-1 gap-4 md:max-w-2xl md:mx-auto " onSubmit={handleSubmit(onSubmit)}>
          <input 
            className="p-2 border rounded" 
            placeholder="Nombre" 
            {...register("name", {
              required: "EL nombre es obligatorio"
            })} 
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
          <input className="p-2 border rounded" type="number" placeholder="Cantidad de productos" 
            {...register("quantity", {
              required: "La cantidad es obligatoria",
              min: {
                value: 1,
                message: "La cantidad debe ser al menos 1"
              }
            })}
          />

          {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input 
                className="p-2 pl-8 border rounded" 
                type="number" 
                placeholder="Precio unitario" 
                {...register("unitPrice", {
                  required: "El precio unitario es obligatorio",
                  min: {
                    value: 1,
                    message: "El precio unitario debe ser al menos 1"
                  }
                })}
              />
            </div>
            {errors.unitPrice && (
              <p className="text-red-500">{errors.unitPrice.message}</p>
            )}

          <textarea 
            className="p-2 border rounded" 
            placeholder="Notas (opcional)" 
            {...register("notes")}
          ></textarea>

          <button
            className="py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-300 md:w-1/2 md:mx-auto"
            type="submit"
          >
            {selectedProduct ? "Guardar Cambios" : "Agregar"}
          </button>

          {!budget && (
            <p className="text-red-500">Por favor, establece un presupuesto antes de agregar productos.</p>
          )}
          {remainingBudget <= 0 && (
            <p className="text-red-500">El presupuesto se ha agotado. Por favor, ajusta el presupuesto o elimina productos.</p>
          )}

        </form>
      </section>

      <section>
        <Budget />
      </section>
    </>
  )
}
