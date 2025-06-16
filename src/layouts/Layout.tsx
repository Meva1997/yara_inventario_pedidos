import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-lg font-bold text-red-500 scale-105"
      : "text-lg font-bold text-white hover:scale-105 hover:text-red-500 transition-transform";

  return (
    <>
      <header className="flex flex-col items-center px-4 py-5 text-white bg-blue-700 justify-evenly md:flex-row">
        <h1 className="text-2xl font-bold text-center">Administra tus productos</h1>

        <button
          className="mt-3 md:hidden md:mt-0"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <nav
          className={`flex-col md:flex-row md:flex gap-6 items-center mt-4 md:mt-0 transition-all duration-300 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <NavLink to="/" className={getNavLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/agregar-producto" className={getNavLinkClass}>
            Agregar Producto
          </NavLink>
          <NavLink to="/productos" className={getNavLinkClass}>
            Productos
          </NavLink>
        </nav>
      </header>

      <main className="max-w-5xl p-6 mx-auto">
        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}
