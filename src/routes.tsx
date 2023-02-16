import Cardapio from "pages/Cardapio";
import Prato from "pages/Prato";
import Sobre from "pages/Sobre";
import Inicio from "pages/Inicio";
import Menu from "components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaPadrao from "components/PaginaPadrao";
import Footer from "components/Footer";
import NotFound from "pages/NotFound";

export default function AppRouter() {
  return (
    <main className="container">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<PaginaPadrao />}>
            <Route index element={<Inicio />} />
            <Route path="cardapio" element={<Cardapio />} />
            <Route path="sobre" element={<Sobre />} />
          </Route>
          <Route path="prato/:id" element={<Prato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}
