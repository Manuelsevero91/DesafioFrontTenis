import React, { useState } from 'react';
import Swal from 'sweetalert2';
const AddProfesorModal = ({ onClose, onAddProfesor }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [alias, setAlias] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfesor = { name, mail, alias };
    fetch('http://localhost:3000/tenis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfesor),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then(data => {
        onAddProfesor(data.data);
        onClose();
        Swal.fire('Éxito', 'Profesor añadido exitosamente', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 >Añadir Profesor</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength="30"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              maxLength="50"
            />
          </div>
          <div>
            <label>Alias</label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              required
              maxLength="50"
            />
          </div>
          <button type="submit">Añadir</button>
        </form>
      </div>
    </div>
  );
};
export default AddProfesorModal;














