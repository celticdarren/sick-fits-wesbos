import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

class Signup extends Component {
  state = {
    name: '',
    password: '',
    email: ''
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Mutation
        mutation={SIGN_UP_MUTATION}
        variables={this.state}
      >
        {(signup, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await signup();
                console.log(res);
                this.setState({ name: '', email: '', password: '' })
              }}
            >
              <fieldset
                disabled={loading}
                aria-busy={loading}
              >
                <h2>Signup for an account </h2>
                <Error error={error}/>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor='name'>
                  Name
                  <input
                    type='text'
                    name='name'
                    placeholder='name'
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor='password'>Password
                  <input
                    type='text'
                    name='password'
                    placeholder='password'
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type='Submit'> Sign up !</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    );
  }
}

export default Signup;