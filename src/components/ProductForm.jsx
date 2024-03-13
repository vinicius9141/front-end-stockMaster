import { useState } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes aqui
import { firestore } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';


function ProductForm({ onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity)
    };

    try {
      // Adicionando o produto ao Firestore
      await firestore.collection('products').add(product);
      // Chamando a função fornecida para lidar com a adição do produto (pode ser uma notificação ou outra ação)
      onAddProduct(product);
      // Limpando os campos do formulário após a adição do produto
      setProductName('');
      setProductPrice('');
      setProductQuantity('');
      toast.success('Produto adicionado com sucesso ')
    } catch (error) {
      toast.error('Erro ao salvar o produto no Firestore:');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={handleNameChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={handlePriceChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productQuantity" className="block text-gray-700 font-bold mb-2">Product Quantity:</label>
        <input
          type="number"
          id="productQuantity"
          value={productQuantity}
          onChange={handleQuantityChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
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
            transition: Bounce
          />
    </form>
  );
}

// Defina a validação de tipo para a propriedade onAddProduct usando PropTypes
ProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired // Aqui validamos que onAddProduct é uma função e é obrigatória
};

export default ProductForm;
