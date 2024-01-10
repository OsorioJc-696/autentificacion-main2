"use client"
import { useEffect, useState } from 'react';

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProductData, setNewProductData] = useState({
    id: '',
    alto: '',
    ancho: '',
    color: '',
    eficiencia_energetica: '',
    fotografia: '',
    garantia: '',
    marca: '',
    modelo: '',
    peso: '',
    profundidad: '',
    voltaje: '',
  });

  useEffect(() => {
    // Carga de usuarios
    fetch('http://localhost:8080/api/usuarios')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });

    // Carga de productos
    fetch('http://localhost:8080/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleEdit = (userId, userData) => {
    setEditingUserId(userId);
    setUpdatedUserData(userData);
  };

  const handleSave = (userId) => {
    fetch(`http://localhost:8080/api/usuarios/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    })
    .then(response => {
      if (response.ok) {
        console.log(`Usuario con ID ${userId} actualizado con éxito`);
        return response.json();
      } else {
        throw new Error('Error al actualizar el usuario');
      }
    })
    .then(updatedUser => {
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      setEditingUserId(null);
    })
    .catch(error => {
      console.error('Error al actualizar el usuario:', error);
    });
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleInputChange = (e, field) => {
    setUpdatedUserData(prevData => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:8080/api/usuarios/${userId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } else {
        throw new Error('Error al eliminar el usuario');
      }
    })
    .catch(error => {
      console.error('Error al eliminar el usuario:', error);
    });
  };

  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleSaveProduct = () => {
    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Nuevo producto agregado con éxito');
        return response.json();
      } else {
        throw new Error('Error al agregar el nuevo producto');
      }
    })
    .then(newProduct => {
      setProducts(prevProducts => [...prevProducts, newProduct]);
      setAddingProduct(false);
      setNewProductData({
        id: '',
        alto: '',
        ancho: '',
        color: '',
        eficiencia_energetica: '',
        fotografia: '',
        garantia: '',
        marca: '',
        modelo: '',
        peso: '',
        profundidad: '',
        voltaje: '',
      });
    })
    .catch(error => {
      console.error('Error al agregar el nuevo producto:', error);
    });
  };

  const handleCancelProduct = () => {
    setAddingProduct(false);
    setNewProductData({
      id: '',
      alto: '',
      ancho: '',
      color: '',
      eficiencia_energetica: '',
      fotografia: '',
      garantia: '',
      marca: '',
      modelo: '',
      peso: '',
      profundidad: '',
      voltaje: '',
    });
  };

  const handleInputChangeProduct = (e, field) => {
    setNewProductData(prevData => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const renderRow = (user) => {
    if (editingUserId === user.id) {
      return (
        <tr key={user.id}>
          <td className="border px-4 py-2">{user.id}</td>
          <td className="border px-4 py-2">
            <input 
              type="text" 
              value={updatedUserData.username || user.username}
              onChange={(e) => handleInputChange(e, 'username')}
            />
          </td>
          <td className="border px-4 py-2">
            <input 
              type="email" 
              value={updatedUserData.email || user.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
          </td>
          <td className="border px-4 py-2">
            <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2" onClick={() => handleSave(user.id)}>Guardar</button>
            <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={handleCancel}>Cancelar</button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={user.id}>
          <td className="border px-4 py-2">{user.id}</td>
          <td className="border px-4 py-2">{user.username}</td>
          <td className="border px-4 py-2">{user.email}</td>
          <td className="border px-4 py-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(user.id, { username: user.username, email: user.email })}>Editar</button>
            <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={() => handleDelete(user.id)}>Eliminar</button>
          </td>
        </tr>
      );
    }
  };

  const renderProductRow = (product) => (
    <tr className='' key={product.id}>
      <td className="border px-4 py-2">{product.id}</td>
      <td className="border px-4 py-2">{product.alto}</td>
      <td className="border px-4 py-2">{product.ancho}</td>
      <td className="border px-4 py-2">{product.color}</td>
      <td className="border px-4 py-2">{product.eficiencia_energetica}</td>
      <td className="border px-4 py-2">{product.fotografia}</td>
      <td className="border px-4 py-2">{product.garantia}</td>
      <td className="border px-4 py-2">{product.marca}</td>
      <td className="border px-4 py-2">{product.modelo}</td>
      <td className="border px-4 py-2">{product.peso}</td>
      <td className="border px-4 py-2">{product.profundidad}</td>
      <td className="border px-4 py-2">{product.voltaje}</td>
      <td className="border px-4 py-2">
        {/* Agrega botones de acciones para los productos si es necesario */}
      </td>
    </tr>
  );

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-5 ">
        <h1 className="text-white text-5xl text-center">Logueado</h1>
        
        <div className="">
          <h2 className="text-white text-2xl mb-2">Usuarios Registrados:</h2>
          <div className='mx-auto flex justify-center text-center'>
            
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {users.map(user => (
              <div key={user.id} className="bg-white p-4 rounded shadow">
                <div className=''>
                <p className="text-black">ID: {user.id}</p>
                <p className="text-black">Nombre de Usuario: {user.username}</p>
                <p className="text-black">Correo Electrónico: {user.email}</p>
                </div>
                
                {editingUserId === user.id ? (
                  <div className="mt-2">
                    <input 
                      type="text" 
                      value={updatedUserData.username || user.username}
                      onChange={(e) => handleInputChange(e, 'username')}
                      className="border p-2 w-full"
                    />
                    <input 
                      type="email" 
                      value={updatedUserData.email || user.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                      className="border p-2 mt-2 w-full"
                    />
                    <div className="mt-2 mx-auto flex">
                      <div className=''>
                      <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2" onClick={() => handleSave(user.id)}>
                        Guardar
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={handleCancel}>
                        Cancelar
                      </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(user.id, { username: user.username, email: user.email })}>
                      Editar
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={() => handleDelete(user.id)}>
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          </div>
        </div>

        <div className="my-8  ">
          <h2 className="text-white text-2xl mb-4">Productos Registrados:</h2>

          <div className=" my-5">
         
          {addingProduct ? (
            <div className='mx-auto flex justify-center '>
              <div className="bg-white p-4 rounded shadow flex flex-col">
                <h3 className="text-black text-xl mb-2">Agregar Nuevo Producto:</h3>
                <input 
                  type="text" 
                  value={newProductData.id}
                  onChange={(e) => handleInputChangeProduct(e, 'id')}
                  placeholder="ID"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={newProductData.alto}
                  onChange={(e) => handleInputChangeProduct(e, 'alto')}
                  placeholder="Alto"
                  className="border p-2 w-full mb-2"
                />
                <input

                  type="text"
                  value={newProductData.ancho}
                  onChange={(e) => handleInputChangeProduct(e, 'ancho')}
                  placeholder="Ancho"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type='text'
                  value={newProductData.color}
                  onChange={(e) => handleInputChangeProduct(e, 'color')}
                  placeholder="Color"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type='text'
                  value={newProductData.eficiencia_energetica}
                  onChange={(e) => handleInputChangeProduct(e, 'eficiencia_energetica')}
                  placeholder="Eficiencia Energética"
                  className="border p-2 w-full mb-2"
                />
                <input

                  type='text'
                  value={newProductData.fotografia}
                  onChange={(e) => handleInputChangeProduct(e, 'fotografia')}
                  placeholder="Fotografía"
                  className="border p-2 w-full mb-2"
                />
                <input
                type='text'
                  value={newProductData.garantia}
                  onChange={(e) => handleInputChangeProduct(e, 'garantia')}
                  placeholder="Garantía"
                  className="border p-2 w-full mb-2"
                />
                <input

                  type='text'
                  value={newProductData.marca}
                  onChange={(e) => handleInputChangeProduct(e, 'marca')}
                  placeholder="Marca"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type='text'
                  value={newProductData.modelo}
                  onChange={(e) => handleInputChangeProduct(e, 'modelo')}
                  placeholder="Modelo"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type='text'
                  value={newProductData.peso}
                  onChange={(e) => handleInputChangeProduct(e, 'peso')}
                  placeholder="Peso"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type='text'
                  value={newProductData.profundidad}
                  onChange={(e) => handleInputChangeProduct(e, 'profundidad')}
                  placeholder="Profundidad"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type='text'
                  value={newProductData.voltaje}
                  onChange={(e) => handleInputChangeProduct(e, 'voltaje')}
                  placeholder="Voltaje"
                  className="border p-2 w-full mb-2"
                />


                {/* Agrega otros inputs según las propiedades del producto */}
                <div className="flex mt-2 justify-center">
                  <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2" onClick={handleSaveProduct}>
                    Guardar
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={handleCancelProduct}>
                    Cancelar
                  </button>
                </div>
              </div>
              </div>
            ) : (
              <div className="text-center">
              
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md " onClick={handleAddProduct}>
                Agregar Nuevo Producto
              </button>
              </div>
            )}
          </div>

          {/* Lista de productos */}
          <div className='mx-auto flex flex-col'>
          
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded shadow">
                <p className="text-black">ID: {product.id}</p>
                <p className="text-black">Alto: {product.alto}</p>
                <p className="text-black">Ancho: {product.ancho}</p>
                <p className="text-black">Color: {product.color}</p>
                <p className="text-black">Eficiencia Energética: {product.eficiencia_energetica}</p>
                <p className="text-black">Fotografía: {product.fotografia}</p>
                <p className="text-black">Garantía: {product.garantia}</p>
                <p className="text-black">Marca: {product.marca}</p>
                <p className="text-black">Modelo: {product.modelo}</p>
                <p className="text-black">Peso: {product.peso}</p>
                <p className="text-black">Profundidad: {product.profundidad}</p>
                <p className="text-black">Voltaje: {product.voltaje}</p>

                {/* Agrega más líneas para mostrar otras propiedades del producto */}
                <div className="flex mt-2 justify-center">
                  {/* Agrega botones de acciones para los productos si es necesario */}
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </div>
              </div>

            ))}

          </div>

          </div>
        </div>

      </div>
    </section>
  );
  }
  
  export default DashboardPage;
  