import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar los datos del usuario en la memoria del navegador
        localStorage.setItem('user', JSON.stringify(data));
        // Redirigir al Dashboard si todo sale bien
        navigate('/dashboard');
      } else {
        setError(data.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError('Hubo un problema de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Logo de Fitness Center */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}></div>
          <h1 style={styles.logoTitle}>FITNESS CENTER</h1>
          <p style={styles.logoSubtitle}>ALPHA FITNESS GYM</p>
        </div>

        <h2 style={styles.title}>Iniciar sesión</h2>

        {/* Input Usuario */}
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Usuario</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}></span>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: emilys"
              style={styles.input}
            />
          </div>
        </div>

        {/* Input Contraseña */}
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}></span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ej: emilyspass"
              style={styles.input}
            />
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && <p style={styles.errorText}>{error}</p>}

        {/* Botón Entrar */}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#050b24', // Fondo azul muy oscuro del mockup
    backgroundImage: 'radial-gradient(circle, #081747 0%, #030717 100%)', // Simula el degradado de fondo
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    boxSizing: 'border-box',
  },
  form: {
    padding: '2.5rem 2rem',
    backgroundColor: 'rgba(10, 15, 30, 0.85)', // Fondo oscuro semitransparente para la tarjeta
    borderRadius: '12px',
    width: '360px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: '1.5rem',
  },
  logoIcon: {
    fontSize: '2.5rem',
    color: '#38bdf8', // Azul celeste deportivo
    marginBottom: '0.2rem',
  },
  logoTitle: {
    color: '#ffffff',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: 0,
  },
  logoSubtitle: {
    color: '#38bdf8',
    fontSize: '0.75rem',
    letterSpacing: '1px',
    margin: '2px 0 0 0',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 'normal',
  },
  inputGroup: {
    marginBottom: '1.5rem',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#a1a1aa', // Gris claro
    fontSize: '0.9rem',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #4b5563', // Línea inferior estilo Figma
    paddingBottom: '5px',
  },
  icon: {
    marginRight: '10px',
    color: '#6b7280',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.4rem 0',
    backgroundColor: 'transparent', // Sin fondo en el input
    border: 'none',
    outline: 'none',
    color: '#ffffff', // Texto blanco al escribir
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #4b5563', // Botón delineado como en Figma
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    letterSpacing: '1px',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default Login;