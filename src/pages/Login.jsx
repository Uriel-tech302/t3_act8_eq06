import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoGimnasio from '../assets/fondo-azul.jpg'; 
import logoGym from '../assets/logo-pesas.png'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* El logo ahora está flotando fuera del formulario */}
        <div style={styles.logoContainer}>
          <img src={logoGym} alt="Logo Pesas" style={styles.logoImage} />
        </div>

        <h2 style={styles.title}>Iniciar sesión</h2>

        {/* Input Usuario */}
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Persona</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>👤</span>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Input Contraseña */}
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>🔒</span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

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
    backgroundColor: '#020617', 
    backgroundImage: `url(${fondoGimnasio})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: 0,
    boxSizing: 'border-box',
    overflow: 'hidden', 
  },
  form: {
    position: 'relative', // ¡Clave! Permite que los elementos absolutos se guíen por este cuadro
    padding: '6rem 2.5rem 2.5rem', // Mucho más espacio arriba (6rem) para que el logo no tape las letras
    marginTop: '60px', // Empujamos el cuadro un poco abajo para que el logo gigante no choque con el techo
    backgroundColor: '#0f172a', 
    borderRadius: '16px',
    width: '360px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    border: '2px solid #38bdf8', 
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute', // Saca al logo del orden normal
    top: '-90px', // ¡Lo empuja hacia arriba para que sobresalga del borde azul!
    left: '50%',
    transform: 'translateX(-50%)', // Lo mantiene perfectamente centrado
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  logoImage: {
    width: '260px', // ¡Ahora sí, gigante! Puedes subirlo a 300px o bajarlo si prefieres
    height: 'auto',
    filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.5))', // Sombra al logo para que resalte más
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#f8fafc',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: '1.2rem',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: '#f1f5f9',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #334155', 
    backgroundColor: '#1e293b', 
    padding: '10px 12px',
    borderRadius: '6px',
  },
  icon: {
    marginRight: '12px',
    color: '#94a3b8',
    fontSize: '1.1rem',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1e293b', 
    color: '#f1f5f9',
    border: '1px solid #334155',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    marginTop: '0.5rem',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default Login;