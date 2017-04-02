// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Grid } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <Grid centered>
    <Grid.Column>
      <h1>Bank of Rapperswil</h1>
      <Segment>
        { isAuthenticated
          ? <div>
              <p>Willkommen zurück!</p>
              <Link className="ui button" to="/dashboard">Zum Dashboard</Link>
            </div>
          : <div>
              <Link className="ui button" to="/login">Einloggen</Link>
              <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
              <Link className="ui button" to="/signup">Registrieren</Link>
            </div>
        }
      </Segment>
    </Grid.Column>
  </Grid>
)

export default Home
