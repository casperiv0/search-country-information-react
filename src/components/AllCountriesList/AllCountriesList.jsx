import React, { Component } from 'react';
import axios from 'axios';
import { Box, Image, Heading,Link } from '@chakra-ui/core';

import SearchField from './SearchField';
import SpinnerArea from './SpinnerArea';

const url = 'https://restcountries.eu/rest/v2/all';

export default class AllCountriesList extends Component {
  constructor() {
    super();

    this.state = {
      countries: [],
      loading: true,
    };
  }

  getCountries = (url) => {
    this.setState({
      loading: true,
    });
    axios
      .get(url)
      .then((res) => {
        this.setState({
          countries: res.data,
        });
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  searchCountry = (countryName) => {
    const filteredCountry = this.state.countries.filter(function(country)  {
      return country.name.toLowerCase() === countryName.toLowerCase();
    });
    
    this.setState({
      countries: filteredCountry,
    });
  };

  componentDidMount() {
    this.getCountries(url);

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  render() {
    const { countries, loading } = this.state;
    return (
      <>
        {/* Search Field */}
        <SearchField
          getCountries={this.getCountries}
          searchCountry={this.searchCountry}
        />

        {/* Grid with all Countries */}
        <div className='all-countries-grid'>
          {loading ? (
            <SpinnerArea />
          ) : (
            countries.map((country, index) => {
              return (
                <Link href={'/#/c/' + country.name} key={index}>
                  <Box maxW='sm' borderWidth='1px' rounded='lg'>
                    <Image src={country.flag} alt={country.name} />
                    <Box p="5">
                      <Box alignItems='baseline'>
                        <Box style={{ fontWeight: 'bold' }}>
                          <Heading>{country.name}</Heading>
                        </Box>
                        <Box mt='1'>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>
                              Population:{' '}
                            </span>{' '}
                            {country.population
                              .toString()
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                          </p>
                        </Box>
                        <Box mt='1'>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Region: </span>
                            {country.region}
                          </p>
                        </Box>
                        <Box mt='1'>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>
                              Capital:{' '}
                            </span>
                            {country.capital}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              );
            })
          )}
        </div>
      </>
    );
  }
}
