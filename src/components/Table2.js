/** @flow */
import React, { PureComponent } from 'react';
import { Grid, ScrollSync, AutoSizer, Table, ColumnSizer } from 'react-virtualized';


import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import data from '../data.json';
import styles from '../static/styles/Table';

const transformedData = data.map((item) => {
  item.total_price = '$0.00';
  item.item_quantity = 0;
  return item;
});

const FROZEN_COLUMNS_COUNT = 3;

const columns = [
  { displayName: 'ID', name: 'id' },
  { displayName: 'Item', name: 'name' },
  { displayName: 'Qty & Sizing', name: 'quantity' },
  { displayName: 'Unit Price', name: 'unit_price' },
  { displayName: 'Total Price', name: 'total_price' },
  { displayName: 'SKU', name: 'sku' },
  { displayName: 'Style', name: 'style' },
  { displayName: 'Classification', name: 'classification' },
  { displayName: 'Division', name: 'division' },
  { displayName: 'Description', name: 'description' },
];

export default class GridExample extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: new Set(),
      data: transformedData,
      sortedIndexMap: [],
      columnWidth: 75,
      columnCount: columns.length,
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: transformedData.length,
      columns,
    };
  }

  renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) {
      return null;
    }

    return (
      <div className={styles.cell} key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  }

  renderHeaderCell = ({ columnIndex, key, style }) => {
    if (columnIndex < 1) {
      return null;
    }

    return (
      <div className={styles.headerCell} key={key} style={style}>
        {this.state.columns[columnIndex].displayName}
      </div>
    );
  }

  renderHeaderCornerCell = ({ columnIndex, key, style }) => {
    if (columnIndex < 1) {
      return (
        <div className={styles.cell} key={key} style={style}>
          <input type="checkbox" />
        </div>
      );
    }

    return (
      <div className={styles.headerCell} key={key} style={style}>
        {this.state.columns[columnIndex].displayName}
      </div>
    );
  }

  renderFrozenColumns = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) {
      return (
        <div className={styles.cell} key={key} style={style}>
          <input type="checkbox" />
        </div>
      );
    }

    return (
      <div className={styles.cell} key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  }


  render() {
    const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
    } = this.state;

    return (
      <div>
        <ScrollSync>
          {({
            onScroll,
            scrollLeft,
            scrollTop,
          }) => {
            return (
              <div className={styles.GridRow}>
                <div
                  className={styles.LeftSideGridContainer}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    backgroundColor: 'green',
                  }}
                >
                  <Grid
                    cellRenderer={this.renderHeaderCornerCell}
                    className={styles.HeaderGrid}
                    width={columnWidth * FROZEN_COLUMNS_COUNT}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    rowCount={1}
                    columnCount={FROZEN_COLUMNS_COUNT}
                  />
                </div>

                <div
                  className={styles.LeftSideGridContainer}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: rowHeight,
                    backgroundColor: 'red',
                  }}
                >
                  <Grid
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this.renderFrozenColumns}
                    columnWidth={columnWidth}
                    columnCount={FROZEN_COLUMNS_COUNT}
                    className={styles.LeftSideGrid}
                    height={height - scrollbarSize()}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={columnWidth * FROZEN_COLUMNS_COUNT}
                  />
                </div>

                <div className={styles.GridColumn}>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <ColumnSizer
                        columnMaxWidth={1000}
                        columnMinWidth={100}
                        columnCount={columnCount}
                        key="GridColumnSizer"
                        width={width}
                      >
                        {({adjustedWidth, columnWidth, registerChild}) => (
                          <div>
                            <div
                              style={{
                                backgroundColor: 'yellow',
                                height: rowHeight,
                                width: adjustedWidth - scrollbarSize(),
                              }}
                            >
                              <Grid
                                className={styles.HeaderGrid}
                                columnWidth={columnWidth}
                                columnCount={columnCount - FROZEN_COLUMNS_COUNT}
                                height={rowHeight}
                                overscanColumnCount={overscanColumnCount}
                                cellRenderer={this.renderHeaderCell}
                                rowHeight={rowHeight}
                                rowCount={1}
                                scrollLeft={scrollLeft}
                                width={adjustedWidth - scrollbarSize()}
                              />
                            </div>
                            <div
                              style={{
                                backgroundColor: 'pink',
                                height,
                                width,
                              }}
                            >
                              <Grid
                                className={styles.BodyGrid}
                                columnWidth={columnWidth}
                                columnCount={columnCount - FROZEN_COLUMNS_COUNT}
                                height={height}
                                onScroll={onScroll}
                                overscanColumnCount={overscanColumnCount}
                                overscanRowCount={overscanRowCount}
                                cellRenderer={this.renderBodyCell}
                                rowHeight={rowHeight}
                                rowCount={rowCount}
                                width={adjustedWidth}
                              />
                            </div>
                          </div>
                        )}
                      </ColumnSizer>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </div>
    );
  }
}
