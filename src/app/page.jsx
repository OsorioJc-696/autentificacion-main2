"use client" 
import { useEffect, useState } from 'react';

function HomePage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Función para obtener productos de la API
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:8080/api/productos');
        const datos = await respuesta.json();
        setProductos(datos); // Establecer productos en el estado
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    // Llamar a la función para obtener productos
    obtenerProductos();
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto">
        <h1 className="text-white text-5xl">INICIO</h1>

        {/* Catálogo */}
        <div className="mt-8">
          <h2 className="text-3xl mb-4">Catálogo</h2>

          {/* Lista de productos en forma de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map((producto, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl mb-2">{producto.id}</h3>
                <p>{producto.alto}</p>
                <p>{producto.ancho}</p>
                <p>{producto.color}</p>
                <p>{producto.eficiencia_energetica}</p>
                <p>{producto.fotografia}</p>
                <p>{producto.garantia}</p>
                <p>{producto.marca}</p>
                <p>{producto.modelo}</p>
                <p>{producto.peso}</p>
                <p>{producto.profundidad}</p>
                <p>{producto.voltaje}</p>

                {/* Puedes agregar más detalles del producto según lo necesites */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
