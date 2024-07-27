import React from 'react';
const Header = ({ onAddProfesorClick, onSearch, setSearchQuery }) => {
  return (
    <header className="app-header">
      <h1>Gestión de Profesores</h1>
      <div className="search-container">
      </div>
      <button className='btn' onClick={onAddProfesorClick}>Añadir Profesor</button>
    </header>
  );
};
export default Header;










