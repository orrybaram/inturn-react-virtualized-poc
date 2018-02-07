import React from 'react';
import { EditableCell } from './';

export default name => (data, sortedIndexMap) => (rowIndex) => {
  const sortedRowIndex = sortedIndexMap[rowIndex];
  if (sortedRowIndex) {
    rowIndex = sortedRowIndex;
  }

  const value = data[rowIndex][name];
  return (
    <EditableCell value={value} />
  );
};
