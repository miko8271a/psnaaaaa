import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProxyPage from "./pages/ProxyPage";
import GuidePage from "./pages/GuidePage";
import LoginPage from "./pages/LoginPage";
import SonyEmbedPage from "./pages/SonyEmbedPage";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "tab tab-active" : "tab";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden />
          <div>
            <p className="brand-kicker">PlayStation Network</p>
            <h1 className="brand-title">Proxy Login</h1>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proxy" element={<ProxyPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sony" element={<SonyEmbedPage />} />
        </Routes>
      </main>

      <nav className="tab-bar" aria-label="Main">
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>
        <NavLink to="/proxy" className={navClass}>
          Proxy
        </NavLink>
        <NavLink to="/login" className={navClass}>
          Sign in
        </NavLink>
        <NavLink to="/guide" className={navClass}>
          iOS setup
        </NavLink>
      </nav>
    </div>
  );
}
