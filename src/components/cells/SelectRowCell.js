import React from 'react';
import styled, { css } from 'react-emotion';
import { Cell } from '../cells';

const RowIndex = css`
  opacity: 1;
  position: absolute;
`;

const CheckBox = css`
  opacity: 0;
  position: absolute;
`;

const CellWrapper = styled(Cell)`
  ${({ isSelected }) => isSelected && css`
    span {
      opacity: 0;
    }

    input {
      opacity: 1;
    }
  `}

  &:hover {
    span {
      opacity: 0;
    }

    input {
      opacity: 1;
    }
  }
`;


export default ({ onCheckboxChange }) => name => (selected, sortedIndexMap) => (rowIndex) => {
  const originalIndex = rowIndex;
  const sortedRowIndex = sortedIndexMap[rowIndex];
  if (sortedRowIndex) {
    rowIndex = sortedRowIndex;
  }

  const isSelected = selected.has(rowIndex);

  return (
    <CellWrapper isSelected={isSelected} interactive>
      <span className={RowIndex}>{Number(originalIndex) + 1}</span>
      <input
        onChange={onCheckboxChange(rowIndex)}
        checked={isSelected}
        className={CheckBox}
        type="checkbox"
      />
    </CellWrapper>
  );
};
