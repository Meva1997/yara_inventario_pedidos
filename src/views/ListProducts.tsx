import { useNavigate } from "react-router-dom"
import useProductStore, { type Product } from "../stores/useProductStore"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"

export default function ListProducts() {

  const products =  useProductStore((state) => state.products)
  const deleteProduct = useProductStore((state) => state.deleteProduct)
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct)
  const navigate = useNavigate()

  const handleEdit = (product: Product) => {
    setSelectedProduct(product) // Set the selected product for editing
    navigate("/agregar-producto")
  }

  const handleDelete = (id: string) => {
    deleteProduct(id); // Delete the product
    toast.success("Producto eliminado correctamente", {
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

  return (
    
    <>
      <section>
        <h2 className="text-2xl font-bold text-center text-gray-900">Lista de Productos</h2>
        <div className="mt-6">
          {products.length === 0 ? (
            <p className="text-center animate-pulse">No hay productos disponibles.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                
                <li key={product.id} className="h-full p-4 bg-white rounded-md shadow-xl">
                  <h3 className="text-lg"><span className="font-bold">Nombre del producto:</span> {product.name}</h3>
                  <p><span className="font-bold">Cantidad:</span> {product.quantity}</p>
                  <p><span className="font-bold">Precio Unitario: </span> ${product.unitPrice}</p>
                  <p><span className="font-bold">Total:</span> ${product.quantity * product.unitPrice}</p>
                  {product.notes && <p><span className="font-bold">Notas:</span> {product.notes}</p>}
                  <div className="flex items-center mt-4 justify-evenly">
                    <TrashIcon className="text-red-500 cursor-pointer w-7 hover:scale-110 md:w-10"
                      onClick={() => handleDelete(product.id)}
                    />
                    <PencilSquareIcon className="text-blue-500 cursor-pointer w-7 hover:scale-110 md:w-10"
                      onClick={() => handleEdit(product)}
                    />
                  </div>
                </li>
        
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

