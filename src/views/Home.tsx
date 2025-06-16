
import Budget from "../components/Budget";
import ProductFilter from "../components/ProductFilter";
import BudgetForm from "../components/BudgetForm";


export default function Home() {

  return (
    <>
     
     <BudgetForm />

      <section className="mt-10">
        {/* Presupuesto */}
        <Budget />

      </section>

      <section className="p-4 mt-10 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-2 text-2xl font-bold text-center text-blue-700">Productos</h2>
        
        <ProductFilter />
      </section>

      
    </>
  );
}
