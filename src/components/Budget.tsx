
import { useMemo, useState } from "react";
import useBudgetStore from "../stores/useBudgetStore";
import useProductStore from "../stores/useProductStore";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function Budget() {

  const budget = useBudgetStore((state) => state.budget);
  const products = useProductStore((state) => state.products);

  const [remaining, setRemaining] = useState(0);

  const restante = budget! - remaining; 

  useMemo(() => {
    if (budget && products.length > 0) {
      const totalSpent = products.reduce((acc, product) => acc + (product.quantity * product.unitPrice), 0);
      setRemaining(totalSpent);
    } else {
      setRemaining(0);
    }
  }, [budget, products]);

  const percentage = (remaining / (budget || 1)) * 100;

  const getColor = () => {
    if (percentage >= 100) return "red";
    if (percentage >= 75) return "orange";
    return "#3b82f6"; // Default blue color
  };

  return (

    <>
      <section className="max-w-5xl p-8 mx-auto mt-10 bg-white rounded-lg shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">Presupuesto</h2>

        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] flex justify-center items-center">
            <CircularProgressbar 
              value={remaining} 
              maxValue={budget || 1} 
              text={`${percentage.toFixed(0)}%`}
              styles={buildStyles({
                pathColor: getColor(),
                textColor: getColor(),
                trailColor: "#d6d6d6",
              })}
            />
          </div>

          <div className="flex flex-col items-center space-y-4 text-center">
            <p className="font-bold">
              <span className="text-xl font-bold text-red-600">Presupuesto Total:</span> ${budget}
            </p>
            <p className="font-bold">
              <span className="text-xl font-bold text-red-600">Gastado:</span> ${remaining}
            </p>
            <p className="font-bold">
              <span className="text-xl font-bold text-red-600">Restante:</span> ${restante}
            </p>
          </div>
        </div>
      </section>
    </>

  )
}
