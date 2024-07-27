import React from 'react';
const ProfesorCard = ({ profesor, onDelete }) => {
  return (
    <div className="profesor-card">
      <h2>{profesor.name}</h2>
      <p>Email: {profesor.mail}</p>
      <p>Alias: {profesor.alias}</p>
      <button className='btn'onClick={() => onDelete(profesor.name)}>Eliminar</button>
    </div>
  );
};
export default ProfesorCard;







