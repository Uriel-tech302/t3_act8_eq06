import React from 'react';

export const Navbar = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : {
    firstName: 'Emily',
    lastName: 'Johnson',
    image: 'https://dummyjson.com/icon/emilys/128' 
  };

  return (
    <nav style={{ 
      height: '70px', 
      backgroundColor: 'white', 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      padding: '0 40px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', // Sombra elegante
      zIndex: 10 // Asegura que la sombra se vea por encima del fondo
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#1e293b' }}>
            {user.firstName} {user.lastName}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
            Administrador
          </span>
        </div>
        <img 
          src={user.image} 
          alt="Perfil" 
          style={{ 
            width: '45px', 
            height: '45px', 
            borderRadius: '50%', 
            border: '2px solid #e2e8f0', 
            objectFit: 'cover' 
          }} 
        />
      </div>

    </nav>
  );
};