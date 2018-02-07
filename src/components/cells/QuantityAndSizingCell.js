import React from 'react';
import { Cell } from '../cells';

export default ({ onQuantityInputChange }) => name => (data, sortedIndexMap) => (rowIndex) => {
  const sortedRowIndex = sortedIndexMap[rowIndex];
  if (sortedRowIndex) {
    rowIndex = sortedRowIndex;
  }

  const availableQuantity = data[rowIndex].quantity;
  const purchaseQuantity = data[rowIndex].item_quantity;

  const onChange = (e) => {
    onQuantityInputChange(e, rowIndex);
  };

  return (
    <Cell interactive>
      <input style={{ width: 50 }} value={purchaseQuantity} onChange={onChange} />
      {availableQuantity}
    </Cell>
  );
};
