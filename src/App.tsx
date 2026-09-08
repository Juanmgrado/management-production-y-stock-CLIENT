import { Routes, Route } from "react-router";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Products } from "./components/Products";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
