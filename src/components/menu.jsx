//import React from 'react';
import PropTypes from 'prop-types';

function Menu({ onAddItemClick }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold">StockMaster</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                className="p-2 rounded-md bg-gray-300"
                onClick={onAddItemClick}
              >
                Adicionar Item
              </button>
              <button className="p-2 rounded-md bg-gray-300">
                Ver Itens
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  onAddItemClick: PropTypes.func.isRequired // Espera uma função chamada onAddItemClick
};

export default Menu;
