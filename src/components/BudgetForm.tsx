import { useState, type FormEvent } from "react";
import {toast} from "react-toastify"
import useBudgetStore from "../stores/useBudgetStore";
import useProductStore from "../stores/useProductStore";


export default function BudgetForm() {

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const budget = useBudgetStore((state) => state.budget);
  const setBudget = useBudgetStore((state) => state.setBudget)
  const resetBudget = useBudgetStore((state) => state.resetBudget); // Reset budget function
  const resetProducts = useProductStore((state) => state.resetProducts); // Reset products function


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numericValue = parseFloat(inputValue);

    if(isNaN(numericValue) || numericValue <= 0) {
      setError("Por favor, ingresa un número válido mayor que cero.");
      return;
    }

    setError("");
    setInputValue("");
    setBudget((budget || 0) + numericValue);
    toast.success(`Presupuesto actualizado: $${(budget || 0) + numericValue}`, {
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

  const handleResetApp = () => {
    resetBudget();
    resetProducts();
    toast.success("La aplicación ha sido reiniciada correctamente.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="flex justify-center mx-auto my-5">
        <button
            type="button"
            onClick={handleResetApp}
            className="px-2 text-white bg-red-500 border-2 border-red-700 rounded-lg cursor-pointer hover:bg-red-700"
          >
            Reiniciar Aplicación
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-extrabold text-center text-blue-700">Ingresa tu Presupuesto</h1>
        <input
          type="number"
          className="my-2 text-center border border-blue-600 rounded-lg outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="px-2 text-white bg-blue-500 border-2 border-blue-700 rounded-lg cursor-pointer hover:bg-blue-700"
        >
          Guardar
        </button>
        {error && (
          <p className="px-2 mt-2 text-center text-white bg-red-500 border-2 border-red-700 rounded-lg">
            {error}
          </p>
        )}
        
      </form>
    </>
  );
}
