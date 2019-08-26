import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
    }
  }
`

export class Launches extends Component {
  render() {
    return (
      <div>
        <Query query={LAUNCHES_QUERY}>
          {(loading, error, data) => {
            if (loading) return <h4>Loading</h4>
            if (error) {
              console.error(error)
              return <h4>Error</h4>
            }
            return <h4>data...</h4>
          }}
        </Query>
        
      </div>
    )
  }
}

export default Launches
