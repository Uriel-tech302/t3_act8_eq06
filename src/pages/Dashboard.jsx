import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Table } from '../components/Table'; // Verifica que esta ruta sea la tuya

export const Dashboard = () => {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', // Ocupa el 100% del alto de la pantalla
      width: '100vw',  // Ocupa el 100% del ancho
      backgroundColor: '#f5f5f5', // El gris clarito de tu Figma
      overflow: 'hidden', // Evita que la página entera haga scroll
      margin: 0,
      padding: 0
    }}>
      
      {/* Columna Izquierda: Menú fijo */}
      <div style={{ flexShrink: 0 }}>
        <Sidebar />
      </div>
      
      {/* Columna Derecha: Todo lo demás */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden' 
      }}>
        
        {/* Barra Superior Fija */}
        <Navbar />
        
        {/* Área de la Tabla (Esta es la única parte que hará scroll) */}
        <main style={{ 
          flex: 1, 
          padding: '40px', 
          overflowY: 'auto' // Si hay muchos productos, el scroll solo sale aquí
        }}>
          
          {/* Contenedor blanco estilo tarjeta para la tabla */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px', // Bordes más redondeados y bonitos
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', // Sombra muy suave
            minHeight: '100%' 
          }}>
            
            {/* Aquí va tu componente de tabla real */}
            <Table />
            
          </div>
          
        </main>
      </div>
      
    </div>
  );
};