import { Routes, Route, Navigate } from "react-router";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { Movements } from "./components/Movements";
import { Users } from "./components/Users";
import { Account } from "./components/Account";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/movements" element={<Movements />} />
          <Route path="/account" element={<Account />} />
          <Route element={<AdminRoute />}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
