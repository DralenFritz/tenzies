import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="die-type-nav">
      <NavLink 
        to="/numbers" 
        className={({ isActive }) => isActive ? "die-type-link die-type-link--active" : "die-type-link"}
      >
        Numbers
      </NavLink>
      <NavLink 
        to="/pips" 
        className={({ isActive }) => isActive ? "die-type-link die-type-link--active" : "die-type-link"}
      >
        Pips
      </NavLink>
    </nav>
  )
}