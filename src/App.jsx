import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";

export default function App() {
  const location = useLocation();

  return (
    <main className="theme-bg w-full h-screen">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<MovieDetail />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}
