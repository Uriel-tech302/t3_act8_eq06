import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute'; // <-- Importamos nuestro guardia

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir la ruta raíz al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* El Login siempre debe ser de acceso público */}
        <Route path="/login" element={<Login />} />
        
        {/* --- ZONA PROTEGIDA --- */}
        {/* Todo lo que pongas dentro de este bloque exigirá haber iniciado sesión */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;