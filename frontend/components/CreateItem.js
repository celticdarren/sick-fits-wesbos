import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
  $title: String!
  $description: String!
  $image: String
  $largeImage: String
  $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'New title',
    description: 'This is the desc',
    image: 'test.jpg',
    largeImage: 'biggerTest.jpg',
    price: 1000
  }

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { loading, error }) => (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            const response = await createItem();
            Router.push({
              pathname: '/item',
              query: { id: response.data.createItem.id }
            })
          }}>
            <Error error={error}/>
            <fieldset disabled={loading}
                      aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="text"
                  name="price"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="text"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>

    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };