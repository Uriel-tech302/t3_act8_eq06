import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();

  // Tu lógica original de items (asegúrate de que los nombres coincidan con los tuyos)
  const menuItems = [
    { id: 'inicio', text: 'INICIO', icon: '🏠', active: false },
    { id: 'tabla', text: 'TABLA DE DATOS', icon: '🗄️', active: true }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside style={{ 
      width: '250px', 
      backgroundColor: '#172033', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      height: '100vh',
      margin: 0
    }}>
      
      <div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '30px' }}>
          {menuItems.map((item, index) => (
            <li 
              key={index}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                backgroundColor: item.active ? '#3b82f6' : 'transparent',
                color: item.active ? 'white' : '#94a3b8',
                fontWeight: item.active ? 'bold' : '500',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px' }}>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div 
        onClick={handleLogout}
        style={{ 
          padding: '16px 24px', 
          backgroundColor: '#3b82f6', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          fontWeight: 'bold',
          color: 'white',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <span style={{ fontSize: '20px' }}>🚪</span>
        <span style={{ fontSize: '14px', letterSpacing: '0.5px' }}>EXIT</span>
      </div>
      
    </aside>
  );
};