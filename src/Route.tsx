import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./views/Home"
import ProductForm from "./views/ProductForm"
import ListProducts from "./views/ListProducts"

export default function Router() {
  return (
    <>
      <BrowserRouter basename="/yara_inventario_pedidos">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home /> }  />
            <Route path="/agregar-producto" element={<ProductForm />} />
            <Route path="/productos" element={<ListProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
