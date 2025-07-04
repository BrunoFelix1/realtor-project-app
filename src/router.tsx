import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login     from "@/pages/auth";
import Home      from "@/pages/home";
import Layout    from "@/pages/layout";
import Customers from "./pages/customers";
import Visits    from "@/pages/visits";      //  ⬅️  NOVO  (crie src/pages/visits/index.tsx)
import Properties from "@/pages/properties";
import Rentals from "@/pages/rentals"; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/properties"
          element={
            <Layout>
              <Properties />
            </Layout>
          }
        />
        <Route
          path="/customers"
          element={
            <Layout>
              <Customers />
            </Layout>
          }
        />
        <Route
          path="/rentals"
          element={
            <Layout>
              <Rentals />
            </Layout>
          }
        />

        {/* ---------- NOVA ROTA ---------- */}
        <Route
          path="/visits"
          element={
            <Layout>
              <Visits />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
