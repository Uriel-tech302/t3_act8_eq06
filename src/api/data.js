const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async (page = 1, limit = 10, search = '', category = '') => {
  try {
    const skip = (page - 1) * limit;
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `${BASE_URL}/search?q=${search}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Error de conexión con el servidor');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Error al obtener el catálogo de categorías');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Fallo en la inserción de datos');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Fallo en la actualización del registro');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Fallo al eliminar el registro');
    return await response.json();
  } catch (error) {
    throw error;
  }
};