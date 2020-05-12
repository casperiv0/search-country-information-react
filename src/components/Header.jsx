import React, { Component } from 'react';
import { Heading, Link, Icon } from '@chakra-ui/core';

export default class Header extends Component {
  render() {
    return (
      <div className="header-grid">
          <Heading>Find Country Information</Heading>
          <div>
          <Link
            target='_blank'
            color='teal.500'
            href='https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca'>
            Idea Credits
            <Icon name='external-link' mx='2px' />
          </Link> <br/>
          <Link target='_blank' color='teal.500' href='https://github.com/Dev-CasperTheGhost/search-country-information-react'>
            Source Code
            <Icon name='external-link' mx='2px' />
          </Link>
          </div>
      </div>
    );
  }
}
