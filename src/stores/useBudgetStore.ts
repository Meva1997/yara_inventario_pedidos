import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BudgetState {
  budget: number | null;
  setBudget: (budget: number) => void;
  resetBudget: () => void;
}

const useBudgetStore = create<BudgetState>()(devtools(
  (set) => ({
    budget: JSON.parse(localStorage.getItem("budget") || "null"), // Load budget from localStorage
    setBudget: (budget) => {
      localStorage.setItem("budget", JSON.stringify(budget)); // Save budget to localStorage
      set({ budget });
    },
    resetBudget: () => {
      localStorage.removeItem("budget"); // Remove budget from localStorage
      set({ budget: null });
    },
}))
);

export default useBudgetStore;