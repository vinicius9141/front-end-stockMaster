import PropTypes from 'prop-types'; // Importe PropTypes aqui
import ProductItem from './ProductItem';

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

// Defina a validação de tipo para a propriedade products usando PropTypes
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired // Aqui validamos que products é um array de objetos, onde cada objeto tem as propriedades id, name e price, todas obrigatórias
};

export default ProductList;
