import { Link } from "react-router";
import { useAuth } from "../context/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useMovements } from "../hooks/useMovements";
import { useUsers } from "../hooks/useUsers";

const LOW_STOCK_THRESHOLD = 5;

const StatCard = ({
  label,
  value,
  to,
  accent,
}: {
  label: string;
  value: number | undefined;
  to: string;
  accent?: boolean;
}) => (
  <Link
    to={to}
    className="rounded-lg border border-gray-200 bg-white p-5 transition hover:border-gray-300"
  >
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`mt-1 text-3xl font-bold ${
        accent ? "text-red-600" : "text-gray-900"
      }`}
    >
      {value ?? "–"}
    </p>
  </Link>
);

export const Home = () => {
  const { user } = useAuth();
  const isAdmin = !!user?.isAdmin;

  const activeProducts = useProducts({ status: "active", limit: 1 });
  const lowStock = useProducts({
    status: "active",
    maxStock: LOW_STOCK_THRESHOLD,
    limit: 1,
  });
  const movements = useMovements({ limit: 1 });
  const users = useUsers({ status: "active", limit: 1 }, isAdmin);

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">
        Hola, {user?.name}
      </h1>
      <p className="mb-6 text-sm text-gray-500">Resumen general</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Productos activos"
          value={activeProducts.data?.total}
          to="/products"
        />
        <StatCard
          label={`Bajo stock (≤ ${LOW_STOCK_THRESHOLD})`}
          value={lowStock.data?.total}
          to="/products"
          accent={(lowStock.data?.total ?? 0) > 0}
        />
        <StatCard
          label="Movimientos registrados"
          value={movements.data?.total}
          to="/movements"
        />
        {isAdmin && (
          <StatCard
            label="Usuarios activos"
            value={users.data?.total}
            to="/users"
          />
        )}
      </div>
    </>
  );
};
