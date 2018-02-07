import React from 'react';
import { ColumnHeaderCell, Column } from '@blueprintjs/table';

export default class AbstractSortableColumn {
  constructor(name, propertyName, cellRenderer) {
    this.name = name;
    this.cellRenderer = cellRenderer;
    this.propertyName = propertyName;
  }

  getColumn(sortColumn, state) {
    const menuRenderer = this.renderMenu && this.renderMenu.bind(this, sortColumn);
    const columnHeaderCellRenderer = () => (
      <ColumnHeaderCell
        name={this.name}
        renderMenu={menuRenderer}
        menuIconName="chevron-down"
      />
    );

    return (
      <Column
        renderCell={this.cellRenderer(this.propertyName)(state.data, state.sortedIndexMap)}
        renderColumnHeader={columnHeaderCellRenderer}
        key={this.propertyName}
        name={this.name}
      />
    );
  }
}
