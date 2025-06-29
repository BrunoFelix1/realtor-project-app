import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth";
import Home from "@/pages/home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
