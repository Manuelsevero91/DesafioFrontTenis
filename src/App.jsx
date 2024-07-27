import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profesores from './components/profesores';
import AddProfesorModal from './components/addProfesorModal';
import './App.css';
import './Styles/HeaderProfesores.css';
import './Styles/Profesores.css';
import './Styles/ProfesorCard.css';
import './Styles/AddProfesorModal.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profesores />} />
        <Route path="/addProfesor" element={<AddProfesorModal />} />
      </Routes>
    </Router>
  );
};
export default App;







