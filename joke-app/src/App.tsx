import {
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";

import Home from "./Home";
import Favorites from "./Favorites";
import Original from "./Original";
import Info from "./Informativa";
import User from "./User";
import Login from "./login";
import Register from "./Registro";
import Logout from "./Logout";

const HIDDEN_NAV_ROUTES = ["/", "/login", "/registro", "/logout"];

function NavBar() {
  const location = useLocation();
  const hide = HIDDEN_NAV_ROUTES.includes(location.pathname);

  if (hide) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #0a0a0f;
          color: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          height: 64px;
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .navbar-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #f8fafc;
          text-decoration: none;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navbar-brand::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #6366f1;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(99,102,241,0.7);
          animation: brandPulse 3s infinite;
        }

        @keyframes brandPulse {
          0%, 100% {
            box-shadow: 0 0 8px rgba(99,102,241,0.7);
          }

          50% {
            box-shadow: 0 0 16px rgba(99,102,241,1);
          }
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .navbar-links a {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }

        .navbar-links a:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.06);
        }

        .navbar-links a.active {
          color: #f8fafc;
          background: rgba(99,102,241,0.15);
        }

        .nav-icon {
          font-size: 14px;
          opacity: 0.8;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-logout {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: rgba(239,68,68,0.8);
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          color: #fca5a5;
          background: rgba(239,68,68,0.14);
          border-color: rgba(239,68,68,0.35);
        }

        .page-content {
          padding-top: 64px;
          min-height: 100vh;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0 16px;
            height: 56px;
          }

          .navbar-links a {
            padding: 6px 10px;
            font-size: 12.5px;
          }

          .navbar-links a span:not(.nav-icon) {
            display: none;
          }

          .btn-logout span:not(:first-child) {
            display: none;
          }

          .btn-logout {
            padding: 7px 10px;
          }

          .page-content {
            padding-top: 56px;
          }
        }
      `}</style>

      <nav className="navbar">
        <Link to="/home" className="navbar-brand">
          Estudiantes
        </Link>

        <ul className="navbar-links">
          <NavLink to="/home" icon="🏠" label="Home" />
          <NavLink to="/favorites" icon="⭐" label="Favoritos" />
          <NavLink to="/original" icon="🎨" label="Original" />
          <NavLink to="/info" icon="ℹ️" label="Informativa" />
          <NavLink to="/user" icon="👤" label="Usuario" />
        </ul>

        <div className="navbar-right">
          <Link to="/logout" className="btn-logout">
            <span>↩</span>
            <span>Salir</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

function NavLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: string;
  label: string;
}) {
  const location = useLocation();

  return (
    <li>
      <Link
        to={to}
        className={location.pathname.startsWith(to) ? "active" : ""}
      >
        <span className="nav-icon">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

function App() {
  return (
    <HashRouter>
      <NavBar />

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/original" element={<Original />} />
          <Route path="/info" element={<Info />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;