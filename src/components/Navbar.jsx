import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Navbar = () => {
  const navigate = useNavigate();
  
  // Usuario simulado (Tu compañera lo conectará después)
  const user = { 
    username: 'Usuario de Prueba', 
    role: 'Administrador',
    image: 'https://dummyjson.com/icon/emilys/128' 
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tendrás que volver a ingresar tus credenciales.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0984e3',
      cancelButtonColor: '#d63031',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '12px 30px', 
      backgroundColor: '#2d3436', 
      color: '#f5f6fa',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem', letterSpacing: '0.5px' }}>
        <span style={{ color: '#74b9ff' }}>Dev</span>System
      </h2>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        
        {/* Contenedor del Perfil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span style={{ fontWeight: '600', fontSize: '14px' }}>{user.username}</span>
            <span style={{ fontSize: '12px', color: '#b2bec3' }}>{user.role}</span>
          </div>
          <img 
            src={user.image} 
            alt="Perfil" 
            style={{ 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              backgroundColor: '#dfe6e9', 
              border: '2px solid #74b9ff',
              objectFit: 'cover'
            }} 
          />
        </div>

        {/* Botón de Salida */}
        <button 
          onClick={handleLogout} 
          style={{ 
            backgroundColor: '#d63031', 
            color: 'white', 
            border: 'none', 
            padding: '8px 18px', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '13px' 
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};