export const Sidebar = () => {
  // Arreglo para mapear las opciones fácilmente
  const menuItems = [
    { icon: '📦', text: 'Inventario de Productos', active: true },
    { icon: '📊', text: 'Reporte de Ventas', active: false },
    { icon: '👥', text: 'Gestión de Usuarios', active: false },
    { icon: '⚙️', text: 'Configuración', active: false }
  ];

  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: '#f8f9fa', 
      padding: '25px 15px', 
      minHeight: 'calc(100vh - 70px)',
      borderRight: '1px solid #e1e8ed',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{ 
        marginBottom: '20px', 
        paddingLeft: '10px', 
        fontSize: '12px', 
        color: '#a4b0be', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        letterSpacing: '1px' 
      }}>
        Menú Principal
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => (
          <li key={index} style={{ 
            padding: '12px 15px', 
            backgroundColor: item.active ? '#e3f2fd' : 'transparent', 
            color: item.active ? '#0984e3' : '#2f3542', 
            borderRadius: '8px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: item.active ? 'bold' : '500',
            borderLeft: item.active ? '4px solid #0984e3' : '4px solid transparent',
            transition: 'all 0.2s ease-in-out'
          }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '14px' }}>{item.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};