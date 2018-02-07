import React, { Component } from 'react';
import TableView from '../components/Table';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%', position: 'relative', margin: 50 }}>
        <TableView />
      </div>
    );
  }
}

export default App;
