import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth";
import Home from "@/pages/home";
import Layout from "@/pages/layout";

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
      </Routes>
    </BrowserRouter>
  );
}
