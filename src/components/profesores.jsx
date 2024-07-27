import React, { useState, useEffect } from 'react';
import Header from './headerProfesores';
import ProfesorCard from './profesorCard';
import AddProfesorModal from './addProfesorModal';
import Swal from 'sweetalert2';

const Profesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchProfesores();
  }, []);
  const fetchProfesores = (name = '') => {
    const url = name ? `http://localhost:3000/tenis/${name}` : 'http://localhost:3000/tenis';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data); 
        if (data && Array.isArray(data.data)) {
          setProfesores(data.data);
        } else {
          console.error('Unexpected data structure:', data);
          setProfesores([]);
        }
      })
      .catch(error => Swal.fire('Error', 'Error fetching profesores: ' + error.message, 'error'));
  };
  const handleAddProfesor = (profesor) => {
    fetch('http://localhost:3000/tenis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profesor),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.success) {
          setProfesores([...profesores, profesor]);
          Swal.fire('Éxito', 'Profesor añadido exitosamente', 'success');
        } else {
          Swal.fire('Error', 'Error al añadir el profesor: ' + (data.message || 'Unknown error'), 'error');
        }
      })
      .catch(error => Swal.fire('Error', 'Error al añadir el profesor: ' + error.message, 'error'));
  };
  const handleDeleteProfesor = (name) => {
    fetch(`http://localhost:3000/tenis/${name}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProfesores(profesores.filter(prof => prof.name !== name));
        Swal.fire('Éxito', 'Profesor eliminado exitosamente', 'success');
      })
      .catch(error => Swal.fire('Error', 'Error deleting profesor: ' + error.message, 'error'));
  };
  const handleSearch = () => {
    fetchProfesores(searchQuery);
  };
  console.log('Profesores en render:', profesores);
  
  return (
    <div>
      <Header onAddProfesorClick={() => setIsModalOpen(true)} onSearch={handleSearch} setSearchQuery={setSearchQuery} />
      <div className="profesor-cards">
        {Array.isArray(profesores) ? profesores.map(profesor => (
          <ProfesorCard key={profesor.id} profesor={profesor} onDelete={handleDeleteProfesor} />
        )) : <p>No hay profesores disponibles.</p>}
      </div>
      {isModalOpen && (
        <AddProfesorModal
          onClose={() => setIsModalOpen(false)}
          onAddProfesor={handleAddProfesor}
        />
      )}
    </div>
  );
};
export default Profesores;










