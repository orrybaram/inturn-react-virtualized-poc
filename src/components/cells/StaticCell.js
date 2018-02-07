import React from 'react';
import { Cell } from '../cells';

export default name => (data, sortedIndexMap) => (rowIndex) => {
  const sortedRowIndex = sortedIndexMap[rowIndex];
  if (sortedRowIndex) {
    rowIndex = sortedRowIndex;
  }

  const value = data[rowIndex][name];
  return (
    <Cell>{value}</Cell>
  );
};
