import React, { Component } from 'react';
import {
  Table,
  RenderMode,
  SelectionModes,
  Utils,
} from '@blueprintjs/table';

import {
  NumberSortableColumn,
  SelectAllColumn,
  TextSortableColumn,
} from './columns';

import {
  EditablePriceCell,
  ItemCell,
  QuantityAndSizingCell,
  SelectRowCell,
  StaticCell,
} from './cells';

import data from '../data.json';

const transformedData = data.map((item) => {
  item.total_price = '$0.00';
  item.item_quantity = 0;
  return item;
});

class TableView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: new Set(),
      data: transformedData,
      columns: [
        new SelectAllColumn('selectAll', SelectRowCell({ onCheckboxChange: this.onCheckboxChange, selected: new Set() }), { onSelectAll: this.onSelectAll }),
        new TextSortableColumn('Item', 'name', ItemCell({ onAddButtonClick: this.onAddButtonClick })),
        new NumberSortableColumn('Qty & Sizing', 'quantity', QuantityAndSizingCell({ onQuantityInputChange: this.onQuantityInputChange })),
        new TextSortableColumn('Unit Price', 'unit_price', EditablePriceCell),
        new TextSortableColumn('Total Price', 'total_price', EditablePriceCell),
        new TextSortableColumn('SKU', 'sku', StaticCell),
        new TextSortableColumn('Style', 'style', StaticCell),
        new TextSortableColumn('Classification', 'classification', StaticCell),
        new TextSortableColumn('Division', 'division', StaticCell),
        new TextSortableColumn('Description', 'description', StaticCell),
      ],
      sortedIndexMap: [],
    };
  }

  componentDidMount() {
    const newColumns = [...this.state.columns];
    newColumns[0] = new SelectAllColumn(
      'selectAll',
      SelectRowCell({ onCheckboxChange: this.onCheckboxChange, selected: this.state.selected }),
      { onSelectAll: this.onSelectAll },
    );

    this.setState({
      columns: newColumns,
    });
  }

  onQuantityInputChange = (e, rowIndex) => {
    const newData = [...this.state.data];
    const quantity = e.target.value;
    const price = newData[rowIndex].unit_price.substring(1);

    newData[rowIndex].item_quantity = quantity;
    newData[rowIndex].total_price = `$${(quantity * price).toFixed(2)}`;

    this.setState({
      data: newData,
    });
  }

  onAddButtonClick = (rowIndex) => {
    const newData = [...this.state.data];
    newData[rowIndex].isAdded = !this.state.data[rowIndex].isAdded;

    this.setState({
      data: newData,
    });
  }

  onSelectAll = (e) => {
    const isAllSelected = e.target.checked;
    const newSelected = new Set(this.state.selected);

    if (!isAllSelected) {
      newSelected.clear();
      return this.setState({
        selected: newSelected,
      });
    }

    this.state.data.forEach((row, index) => {
      newSelected.add(index);
    });

    this.setState({
      selected: newSelected,
    });
  }

  onCheckboxChange = rowIndex => (e) => {
    const isChecked = e.target.checked;
    const nextSelected = new Set(this.state.selected);

    if (isChecked) nextSelected.add(rowIndex);
    else nextSelected.delete(rowIndex);

    this.setState({ selected: nextSelected });
  }


  getColumnWidths = () => {
    const columnWidths = this.state.columns.map(col => null);
    columnWidths[0] = 40;
    columnWidths[1] = 300;
    columnWidths[3] = 80;
    columnWidths[4] = 80;
    return columnWidths;
  }

  sortColumn = (name, comparator) => {
    const { data } = this.state;
    const sortedIndexMap = Utils.times(data.length, i => i);
    sortedIndexMap.sort((a, b) => comparator(data[a][name], data[b][name]));

    this.setState({ sortedIndexMap });
  };

  render() {
    const columns = this.state.columns.map(col => col.getColumn(this.sortColumn, this.state));

    return (
      <div className="row" style={{ position: 'absolute', height: '80%', width: '100%' }}>
        Rows selected: {this.state.selected.size}

        <Table
          columnWidths={this.getColumnWidths()}
          defaultRowHeight={40}
          enableFocus
          fillBodyWithGhostCells
          isRowResizable={false}
          numFrozenColumns={3}
          numRows={this.state.data.length}
          selectionModes={SelectionModes.NONE}
          renderMode={RenderMode.BATCH_ON_UPDATE}
        >
          {columns}
        </Table>
      </div>
    );
  }
}

export default TableView;
