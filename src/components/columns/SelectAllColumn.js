import React from 'react';
import { ColumnHeaderCell, Column } from '@blueprintjs/table';

export default class SelectAllColumn {
  constructor(name, cellRenderer, columnProps) {
    this.name = name;
    this.cellRenderer = cellRenderer;
    this.onSelectAll = columnProps.onSelectAll;
  }

  getColumn(_, state) {
    const columnHeaderCellRenderer = () => (
      <ColumnHeaderCell
        name={<input type="checkbox" onChange={this.onSelectAll} />}
      />
    );

    return (
      <Column
        renderCell={this.cellRenderer(this.name)(state.selected, state.sortedIndexMap)}
        renderColumnHeader={columnHeaderCellRenderer}
        key={this.name}
        name={this.name}
      />
    );
  }
}
