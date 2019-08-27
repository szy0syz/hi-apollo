import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Launches from './components/Launches';

import './App.css';
import logo from './logo.jpg';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <img
          src={logo}
          alt="logo"
          style={{ width: 300, display: 'block', margin: 'auto' }}
        ></img>
      </div>
      <Launches />
    </ApolloProvider>
  );
}

export default App;
