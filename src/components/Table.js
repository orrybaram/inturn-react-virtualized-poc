import React, { PureComponent } from 'react';
import { Grid, ScrollSync, AutoSizer, ArrowKeyStepper, Table, Column, ColumnSizer, MultiGrid } from 'react-virtualized';
import { css, cx } from 'react-emotion';
import 'react-virtualized/styles.css';

import Row from './Row';
import data from '../data.json';

const styles = {
  Cell: css`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: none;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
  `,
  FocusedCell: css`
    background-color: #e0e0e0;
    font-weight: bold;
  `,
};

export default class TableView extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fixedColumnCount: 4,
      fixedRowCount: 1,
      scrollToColumn: -1,
      scrollToRow: -1,
    };
  }

  onSelectCell = ({ scrollToColumn, scrollToRow }) => {
    this.setState({ scrollToColumn, scrollToRow });
  };

  rowGetter = ({ index }) => {
    return data[index];
  }

  rowRenderer = (props) => {
    return (
      <Row {...props} />
    );
  }

  indexCellRenderer = (props) => {

    return <this.defaultCellRenderer {...props} cellData={props.rowIndex + 1} />
  }

  defaultCellRenderer = (props) => {
    const isSelected = this.state.scrollToRow === props.rowIndex && this.state.scrollToColumn === props.columnIndex;

    const onClick = () => {
      this.onSelectCell({ scrollToColumn: props.columnIndex, scrollToRow: props.rowIndex });
    }

    return (
      <div onClick={onClick} className={isSelected ? styles.FocusedCell : 'nothing'}>
        {props.cellData}
      </div>
    );
  }

  render() {
    return (
      <ScrollSync>
        {({ onScroll, scrollTop }) => {
        return (
          <ArrowKeyStepper
            columnCount={10}
            isControlled={true}
            onScrollToChange={this.onSelectCell}
            mode={'cells'}
            rowCount={data.length}
            scrollToColumn={this.state.scrollToColumn}
            scrollToRow={this.state.scrollToRow}
          >
            {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
              <div>
                <p>
                  {`Most-recently-stepped column: ${scrollToColumn}, row: ${scrollToRow}`}
                </p>
                <div style={{ display: 'flex' }}>
                  <Table
                    width={300}
                    height={300}
                    onSectionRendered={onSectionRendered}
                    scrollToColumn={scrollToColumn}
                    scrollToRow={scrollToRow}
                    scrollToIndex={scrollToRow}
                    headerHeight={20}
                    rowHeight={30}
                    rowCount={data.length}
                    rowGetter={this.rowGetter}
                    rowRenderer={this.rowRenderer}
                    scrollTop={scrollTop}
                    onScroll={onScroll}
                  >
                    <Column
                      width={100}
                      headerRenderer={() => {
                        return <input type="checkbox" />
                      }}
                      cellRenderer={this.indexCellRenderer}
                    />
                    <Column
                      label='Name'
                      dataKey='name'
                      width={100}
                      cellRenderer={this.defaultCellRenderer}
                    />
                  </Table>


                  <div style={{ overflow: 'auto '}}>
                    <Table
                      width={1000}
                      height={300}
                      onSectionRendered={onSectionRendered}
                      scrollToColumn={scrollToColumn}
                      scrollToRow={scrollToRow}
                      scrollToIndex={scrollToRow}
                      headerHeight={20}
                      rowHeight={30}
                      rowCount={data.length}
                      rowGetter={this.rowGetter}
                      rowRenderer={this.rowRenderer}
                      scrollTop={scrollTop}
                      onScroll={onScroll}
                    >
                      <Column
                        width={200}
                        label='SKU'
                        dataKey='sku'
                        cellRenderer={this.defaultCellRenderer}
                      />
                      <Column
                        width={200}
                        label='Description'
                        dataKey='description'
                        cellRenderer={this.defaultCellRenderer}
                      />
                      <Column
                        width={200}
                        label='Description'
                        dataKey='description'
                        cellRenderer={this.defaultCellRenderer}
                      />
                      <Column
                        width={200}
                        label='Description'
                        dataKey='description'
                        cellRenderer={this.defaultCellRenderer}
                      />
                      <Column
                        width={200}
                        label='Description'
                        dataKey='description'
                        cellRenderer={this.defaultCellRenderer}
                      />
                      <Column
                        width={200}
                        label='Description'
                        dataKey='description'
                        cellRenderer={this.defaultCellRenderer}
                      />
                      <Column
                        width={200}
                        label='Description'
                        dataKey='description'
                        cellRenderer={this.defaultCellRenderer}
                      />
                      <Column
                        width={200}
                        label='Description'
                        dataKey='description'
                        cellRenderer={this.defaultCellRenderer}
                      />
                    </Table>
                  </div>
                </div>
              </div>
            )}
          </ArrowKeyStepper>
        )}}
      </ScrollSync>
    );
  }
}