
import { useState } from "react";
import useProductStore from "../stores/useProductStore";

export default function ProductFilter() {
  const [filter, setFilter] = useState("");
  const products = useProductStore((state) => state.products);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 shadow-md bg-gray-50 rounded-xl">
      <input
        type="text"
        className="w-full px-4 py-2 mb-6 border-2 border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="🔍 Filtrar productos por nombre"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron productos.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-blue-600">{product.name}</h3>
              <p className="text-sm text-gray-700">
                <strong>Cantidad:</strong> {product.quantity}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Precio Unitario:</strong> ${product.unitPrice}
              </p>
              <p className="text-sm font-semibold text-green-600">
                <strong>Total:</strong> ${product.total}
              </p>
              {product.notes && (
                <p className="text-sm text-gray-500">
                  <strong>Notas:</strong> {product.notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}