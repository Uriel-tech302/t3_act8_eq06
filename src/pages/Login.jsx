import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        })
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data); // Si todo sale bien, entramos al sistema
      } else {
        setError(data.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setError('Hubo un problema de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h2>
        
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej: emilys"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ej: emilyspass"
            style={styles.input}
          />
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f4f4f9' },
  form: { padding: '2.5rem', backgroundColor: '#fff', borderRadius: '8px', width: '340px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '1.2rem', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#333' },
  input: { padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  button: { width: '100%', padding: '0.7rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }
};

export default Login;