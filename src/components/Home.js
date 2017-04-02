// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Label, Grid, Divider } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <Grid container column={1}>
    <Grid.Column>
      <Segment raised>
        <Label as='a' color='priamry' ribbon>Bank of Rapperswil</Label>
        { isAuthenticated
          ? <div>
              <h1>Welcome back!</h1>
              <Link className="ui button primary fluid" to="/dashboard">View Dashboard</Link>
            </div>
          : <div>
              <h1>Welcome to the bank of your trust</h1>
              <Link className="ui button primary fluid" to="/login">Login</Link>
              <Divider horizontal>Or</Divider>
              <Link className="ui button secondary fluid" to="/signup">Sign up now</Link>
            </div>
        }
      </Segment>
    </Grid.Column>
  </Grid>
)

export default Home
