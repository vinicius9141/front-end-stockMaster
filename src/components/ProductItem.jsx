import{ useState } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes aqui
import { firestore } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';

function ProductItem({ product }) {
  const [addQuantity, setAddQuantity] = useState(0);
  const [removeQuantity, setRemoveQuantity] = useState(0);

  const handleAddQuantity = async () => {
    try {
      await firestore.collection('products').doc(product.id).update({
        quantity: product.quantity + addQuantity
      });
      toast.success('Quantidade adicionada com sucesso');
      setAddQuantity(0);
    } catch (error) {
      toast.error('Erro ao adicionar quantidade');
    }
  };

  const handleRemoveQuantity = async () => {
    try {
      await firestore.collection('products').doc(product.id).update({
        quantity: Math.max(product.quantity - removeQuantity, 0)
      });
      toast.success('Quantidade removida com sucesso');
      setRemoveQuantity(0);
    } catch (error) {
      toast.error('Erro ao remover quantidade:');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await firestore.collection('products').doc(product.id).delete();
      toast.success('Produto excluído com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir o produto:');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">Price: ${product.price}</p>
        <p className="text-gray-600">Quantidade {product.quantity}</p>
      </div>
      <div className="flex items-center flex-col justify-center content-center">
        <div className="mr-4 flex items-center">
          <input
            type="number"
            value={addQuantity}
            onChange={(e) => setAddQuantity(parseInt(e.target.value))}
            className="border rounded px-2 py-1 mr-2 w-[6rem]"
          />
          <button onClick={handleAddQuantity} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
            Adicionar
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={removeQuantity}
            onChange={(e) => setRemoveQuantity(parseInt(e.target.value))}
            className="border rounded px-2 py-1 mr-2 w-[6rem]"
          />
          <button onClick={handleRemoveQuantity} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
            Remover
          </button>
        </div>
      </div>
      <button onClick={handleDeleteProduct} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
            Excluir Produto
          </button>
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
    </div>
  );
}

// Defina a validação de tipo para a propriedade product usando PropTypes
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired // Aqui validamos que product é um objeto com as propriedades name, price, e quantity, todas são obrigatórias
};

export default ProductItem;
