import React from 'react';
import styled from 'react-emotion';
import { EditableCell } from '@blueprintjs/table';

const CenterAlign = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export default props => (
  <EditableCell {...props}>
    <CenterAlign>hehehe{props.children}</CenterAlign>
  </EditableCell>
);
