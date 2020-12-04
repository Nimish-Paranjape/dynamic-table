import './App.css';
import React from 'react';
import UserTable from './containers/UserTable/UserTable';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <UserTable></UserTable>
      </div>
    );
  }
}

export default App;
