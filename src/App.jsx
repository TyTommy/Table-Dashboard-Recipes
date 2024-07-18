import { Route, Routes } from "react-router-dom";
import Admin from "./routes/admin/Admin";
import Products from "./routes/products/Products";
import Users from "./routes/users/Users";
import "./App.css";
import Recipes from "./routes/recipes/Recipes";
import { useSelector } from "react-redux";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route path="product" element={<Products />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
