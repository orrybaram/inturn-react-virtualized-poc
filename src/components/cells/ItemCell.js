import React from 'react';
import { css } from 'react-emotion';
import Button from '../Button';
import Cell from '../cells/Cell';

const itemNameClass = css`
  display: inline-block;
  width: 60%;
`;

export default ({ onAddButtonClick }) => name => (data, sortedIndexMap) => (rowIndex) => {
  const originalIndex = rowIndex;
  const sortedRowIndex = sortedIndexMap[rowIndex];
  if (sortedRowIndex) {
    rowIndex = sortedRowIndex;
  }

  const name = data[rowIndex].name;
  const image = data[rowIndex].image;

  const onClick = idx => () => onAddButtonClick(idx);

  return (
    <Cell interactive>
      <Button isActive={data[rowIndex].isAdded} onClick={onClick(rowIndex)} />
      <span className={itemNameClass}>{name}</span>
      <img alt="" src={image} />
    </Cell>
  );
};
