import { NavLink, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";
import { useLogout } from "../hooks/useLogout";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium ${
    isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
  }`;

export const Layout = () => {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-6 py-3">
          <div className="flex flex-wrap items-center gap-1">
            <NavLink to="/home" className={linkClass}>
              Inicio
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              Productos
            </NavLink>
            <NavLink to="/movements" className={linkClass}>
              Movimientos
            </NavLink>
            {user?.isAdmin && (
              <NavLink to="/users" className={linkClass}>
                Usuarios
              </NavLink>
            )}
          </div>
          <div className="flex items-center gap-4">
            <NavLink
              to="/account"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              {user?.email}
            </NavLink>
            <button
              onClick={logout}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
