import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import Original from "./Original";
import Info from "./Informativa";
import User from "./User";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorito</Link>
        <Link to="/original">Original</Link>
        <Link to="/info">Informativa</Link>
        <Link to="/user">Usuario</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/original" element={<Original />} />
        <Route path="/info" element={<Info />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;