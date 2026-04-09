import React from 'react';
import { Lightbulb, Moon, Sun } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = ({ toggleTheme, isDark }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Lightbulb size={28} color="var(--primary-color)" />
          <h1 className="navbar-title">IdeaBoard</h1>
        </div>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
