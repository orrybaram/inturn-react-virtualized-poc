import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import AbstractSortableColumn from './AbstractSortableColumn';

export default class TextSortableColumn extends AbstractSortableColumn {
  compare(a, b) {
    return a.toString().localeCompare(b);
  }

  renderMenu(sortColumn) {
    const sortAsc = () => sortColumn(this.propertyName, (a, b) => this.compare(a, b));
    const sortDesc = () => sortColumn(this.propertyName, (a, b) => this.compare(b, a));
    return (
      <Menu>
        <MenuItem iconName="sort-asc" onClick={sortAsc} text="Sort Asc" />
        <MenuItem iconName="sort-desc" onClick={sortDesc} text="Sort Desc" />
      </Menu>
    );
  }
}
