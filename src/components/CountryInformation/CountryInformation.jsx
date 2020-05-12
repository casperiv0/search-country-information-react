import React, { Component } from 'react';
import axios from 'axios';
import { Link, Icon } from '@chakra-ui/core';

const url = 'https://restcountries.eu/rest/v2/name/';

export default class CountryInformation extends Component {
  constructor() {
    super();

    this.state = {
      country: {},
    };
  }

  getCountryData = (name) => {
    axios
      .get(url + name)
      .then((res) => {
          console.log(res.data);
          
        if (res.status === 200) {
          return this.setState({
            country: res.data,
          });
        }

        // Country not found
        console.log(res.data);
        return this.setState({
          message: 'There was an error getting the country!',
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCountryData(this.props.match.params.country);
  }

  render() {
    return (
      <div>
          <Link href="/" className="back-btn"> 
            <Icon  name="arrow-back" color="white.500"/> {" "}
          Back</Link>
      </div>
    );
  }
}
