import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getProducts, getCategories, addProduct, updateProduct, deleteProduct } from '../api/data';

// Configuración de la notificación tipo "Toast" (la que aparece en la esquina)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const Table = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(() => console.error("Error cargando categorías"));
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProducts(page, limit, search, category);
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTableData();
  }, [page, limit, search, category]);

  const updateURL = (newParams) => {
    const current = Object.fromEntries([...searchParams]);
    setSearchParams({ ...current, ...newParams });
  };

  // --- ACCIONES CRUD CON SWEETALERT2 ---

  
// --- NUEVO HANDLE ADD ---
  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Nuevo Producto',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nombre (Ej. Teclado)">
        <input id="swal-input2" class="swal2-input" type="number" step="0.01" placeholder="Precio (Ej. 29.99)">
        <input id="swal-input3" class="swal2-input" placeholder="Categoría (Ej. electronics)">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2ecc71',
      preConfirm: () => {
        const title = document.getElementById('swal-input1').value;
        const price = document.getElementById('swal-input2').value;
        const category = document.getElementById('swal-input3').value;
        
        if (!title || !price || !category) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return null;
        }
        return { title, price: parseFloat(price), category };
      }
    });

    if (!formValues) return;
    
    try {
      // Petición real a la API
      const newProduct = await addProduct(formValues);
      
      // Asegurarnos de que el nuevo producto tenga los datos que ingresamos 
      // (a veces DummyJSON no devuelve todo lo que mandamos en un POST falso)
      const completeProduct = { ...newProduct, ...formValues };
      
      setProducts([completeProduct, ...products]);
      Toast.fire({ icon: 'success', title: 'Registro creado exitosamente' });
    } catch (err) {
      Toast.fire({ icon: 'error', title: err.message });
    }
  };

  // --- NUEVO HANDLE DELETE ---
  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás el registro: "${title}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      // Si el ID es mayor a 194 (límite actual de DummyJSON), es un producto "falso" 
      // creado localmente, así que no llamamos a la API porque dará error 404.
      if (id <= 194) {
        await deleteProduct(id);
      }
      
      // Lo borramos del estado visual sí o sí
      setProducts(products.filter(p => p.id !== id));
      Toast.fire({ icon: 'success', title: 'Registro eliminado' });
    } catch (err) {
      Toast.fire({ icon: 'error', title: err.message });
    }
  };
  const handleEdit = async (product) => {
    const { value: newTitle } = await Swal.fire({
      title: 'Editar Producto',
      input: 'text',
      inputValue: product.title,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3498db',
    });

    if (!newTitle || newTitle === product.title) return;

    try {
      const updatedProduct = await updateProduct(product.id, { title: newTitle });
      setProducts(products.map(p => p.id === product.id ? { ...p, title: updatedProduct.title } : p));
      Toast.fire({ icon: 'success', title: 'Registro actualizado' });
    } catch (err) {
      Toast.fire({ icon: 'error', title: err.message });
    }
  };

  

  // --- ESTILOS EN LÍNEA MEJORADOS ---
  const styles = {
    container: {
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    input: {
      padding: '10px 15px',
      borderRadius: '6px',
      border: '1px solid #dcdde1',
      outline: 'none',
      width: '280px',
      transition: 'border-color 0.3s'
    },
    select: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #dcdde1',
      outline: 'none',
      backgroundColor: 'white',
    },
    buttonAdd: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'transform 0.1s, opacity 0.2s'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      marginTop: '10px',
      overflow: 'hidden',
      borderRadius: '8px',
      border: '1px solid #f1f2f6'
    },
    th: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      textAlign: 'left',
      color: '#2f3640',
      fontWeight: '600',
      borderBottom: '2px solid #e1e8ed'
    },
    td: {
      padding: '15px',
      borderBottom: '1px solid #f1f2f6',
      color: '#353b48',
      verticalAlign: 'middle'
    },
    actionBtn: (bgColor) => ({
      backgroundColor: bgColor,
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '8px',
      fontSize: '13px',
      fontWeight: '500'
    })
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '25px' }}>Base de Datos: Productos</h2>

      <div style={styles.headerRow}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => updateURL({ search: e.target.value, page: 1 })}
            style={styles.input}
          />
          
          <select 
            value={category} 
            onChange={(e) => updateURL({ category: e.target.value, page: 1, search: '' })}
            style={styles.select}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.slug || cat}>
                {cat.name || cat}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleAdd} style={styles.buttonAdd}>
          + Agregar Registro
        </button>
      </div>

      {loading && <p style={{ color: '#7f8fa6', fontStyle: 'italic' }}>Procesando datos...</p>}
      {error && <p style={{ color: '#e84118', fontWeight: 'bold' }}>{error}</p>}

      {!loading && !error && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Categoría</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="5" style={{ ...styles.td, textAlign: 'center', color: '#7f8fa6' }}>No se encontraron resultados.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td style={styles.td}>
                    <span style={{ backgroundColor: '#f1f2f6', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      #{product.id}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '500' }}>{product.title}</td>
                  <td style={{ ...styles.td, color: '#27ae60', fontWeight: '600' }}>${product.price}</td>
                  <td style={styles.td}>
                    <span style={{ backgroundColor: '#e1b12c20', color: '#e1b12c', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', textTransform: 'capitalize' }}>
                      {product.category}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(product)} style={styles.actionBtn('#3498db')}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(product.id, product.title)} style={styles.actionBtn('#e74c3c')}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* CONTROLES DE PAGINACIÓN */}
      <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#7f8fa6', fontSize: '14px' }}>
        <div>
          <label style={{ marginRight: '10px' }}>Registros por página:</label>
          <select 
            value={limit} 
            onChange={(e) => updateURL({ limit: e.target.value, page: 1 })} 
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #dcdde1', outline: 'none' }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            disabled={page <= 1} 
            onClick={() => updateURL({ page: page - 1 })}
            style={{ padding: '8px 15px', borderRadius: '6px', border: '1px solid #dcdde1', backgroundColor: page <= 1 ? '#f5f6fa' : 'white', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
          >
            ← Anterior
          </button>
          <span style={{ fontWeight: 'bold', color: '#2f3640' }}>Página {page}</span>
          <button 
            disabled={products.length < limit} 
            onClick={() => updateURL({ page: page + 1 })}
            style={{ padding: '8px 15px', borderRadius: '6px', border: '1px solid #dcdde1', backgroundColor: products.length < limit ? '#f5f6fa' : 'white', cursor: products.length < limit ? 'not-allowed' : 'pointer' }}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
};