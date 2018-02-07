import React, { PureComponent } from 'react';
import { ScrollSync, ArrowKeyStepper, Table, Column } from 'react-virtualized';
import styled, { css } from 'react-emotion';
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

const ExpandedRow = styled('div')`
  height: 0;
  overflow: auto;
  background: #f1f1f1;
  ${({ isExpanded }) => isExpanded && css`
    height: 40px;
  `}
`;

const Hack = styled('div')`
  z-index: 100;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  will-change: transform;
`;

export default class TableView extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fixedColumnCount: 4,
      fixedRowCount: 1,
      scrollToColumn: -1,
      scrollToRow: -1,
      data,
      expandedRows: new Set(),
    };

    this.table1 = null;
    this.table2 = null;
  }

  onSelectCell = ({ scrollToColumn, scrollToRow }) => {
    this.setState({ scrollToColumn, scrollToRow });
  };

  rowGetter = ({ index }) => {
    return this.state.data[index];
  }

  rowRenderer = (props) => {
    console.log('rendered');
    return (
      <Row
        {...props}
        collapsedRow={
          <ExpandedRow isExpanded={this.state.expandedRows.has(props.index)}>hihihi</ExpandedRow>
        }
      />
    );
  }

  onSizeButtonClick = (rowIndex) => {
    return () => {
      const newExpandedRows = new Set(this.state.expandedRows);

      if (newExpandedRows.has(rowIndex)) {
        newExpandedRows.delete(rowIndex);
      } else {
        newExpandedRows.add(rowIndex);
      }

      this.table1.forceUpdate();
      this.table2.forceUpdate();
      this.table1.recomputeRowHeights();
      this.table2.recomputeRowHeights();

      this.setState({
        expandedRows: newExpandedRows,
      });
    }
  }

  itemCellRenderer = (props) => {
    const itemCell = () => {
      return (
        <div>
          <span>{this.state.data[props.rowIndex].name}</span>
          <img src={this.state.data[props.rowIndex].image} />
          <button onClick={this.onSizeButtonClick(props.rowIndex)}>sizes</button>
        </div>
      )
    }

    return <this.defaultCellRenderer {...props} cellData={itemCell()} />
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

  getRowHeight = ({ index }) => {
    if(this.state.expandedRows.has(index)) {
      return 60;
    }

    return 30;
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
            rowCount={this.state.data.length}
            scrollToColumn={this.state.scrollToColumn}
            scrollToRow={this.state.scrollToRow}
          >
            {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
              <div>
                <Hack />
                <p>
                  {`Most-recently-stepped column: ${scrollToColumn}, row: ${scrollToRow}`}
                </p>
                <div style={{ display: 'flex' }}>
                  <Table
                    ref={(ref) => { this.table1 = ref; }}
                    width={300}
                    height={300}
                    onSectionRendered={onSectionRendered}
                    scrollToColumn={scrollToColumn}
                    scrollToRow={scrollToRow}
                    scrollToIndex={scrollToRow}
                    headerHeight={20}
                    rowHeight={this.getRowHeight}
                    rowCount={this.state.data.length}
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
                      width={100}
                      cellRenderer={this.itemCellRenderer}
                    />
                  </Table>


                  <div style={{ overflow: 'auto '}}>
                    <Table
                      ref={(ref) => { this.table2 = ref; }}
                      width={1600}
                      height={300}
                      onSectionRendered={onSectionRendered}
                      scrollToColumn={scrollToColumn}
                      scrollToRow={scrollToRow}
                      scrollToIndex={scrollToRow}
                      headerHeight={20}
                      rowHeight={this.getRowHeight}
                      rowCount={this.state.data.length}
                      rowGetter={this.rowGetter}
                      rowRenderer={this.rowRenderer}
                      scrollTop={scrollTop}
                      onScroll={onScroll}
                    >
                      <Column />
                      <Column />
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