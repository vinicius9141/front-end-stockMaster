import { useEffect, useState } from 'react';
import { firestore } from './firebase/firebase';
import './index.css';
import 'tailwindcss/tailwind.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from "./components/ProductForm.jsx";
import ProductList from './components/ProductList';
import PropTypes from 'prop-types'; // Importe PropTypes

function App() {
  const [products, setProducts] = useState([]);
  const [menuOption, setMenuOption] = useState('add'); // Estado para controlar a opção do menu

  useEffect(() => {
    const unsubscribe = firestore.collection('products').onSnapshot(snapshot => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      await firestore.collection('products').add(product);
      toast.success('Produto Salvo!');
    } catch (error) {
      console.error('Erro ao salvar o produto no Firestore:', error);
      toast.error('Erro ao salvar o produto');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Menu de navegação */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold">StockMaster</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    className={`p-2 rounded-md ${
                      menuOption === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                    }`}
                    onClick={() => setMenuOption('add')}
                  >
                    Adicionar Item
                  </button>
                  <button
                    className={`p-2 rounded-md ${
                      menuOption === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                    }`}
                    onClick={() => setMenuOption('view')}
                  >
                    Ver Itens
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Renderiza o formulário ou a lista de produtos com base na opção do menu */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {menuOption === 'add' ? (
              <ProductForm onAddProduct={handleAddProduct} />
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </div>
      </main>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </div>
  );
}

// Defina PropTypes para os componentes ProductForm e ProductList
ProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired // Espera uma função chamada onAddProduct
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired // Espera um array chamado products
};

export default App;
