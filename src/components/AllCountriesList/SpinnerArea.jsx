import React, { Component } from 'react';
import { Spinner } from '@chakra-ui/core';

export default class SpinnerArea extends Component {
  render() {
    return (
      <div className="spinner-area">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </div>
    );
  }
}
