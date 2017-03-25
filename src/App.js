import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class App extends Component {
  render() {

    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        <button onClick={() => this.props.fetchName('Anna')}>Ask for Anna</button>
      </main>
    );
  }
}

export default graphql(
  gql`
    query names ($name: String!) {
      people (name: $name) {
        id
        name
      }
    }`, {
    options: (props) => ({
      variables: {
        name: "Alfonso",
      },
    }),
    props({ data }) {
      return {
        data,
        fetchName(newName) {
          return data.fetchMore({
            variables: {
              name: newName,
            },
            updateQuery(prev, { queryVariables }) {
              if (newName !== queryVariables.name) {
                console.error(`newName: (${newName}) !== queryVariables.name (${queryVariables.name})`)
              }
            },
          })
        }
      };
    },
  })(App)
