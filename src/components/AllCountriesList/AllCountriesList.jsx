import React, { Component } from 'react';
import axios from 'axios';
import { Box, Image, Heading, Link, Button } from '@chakra-ui/core';

import SearchField from './SearchField';
import SpinnerArea from './SpinnerArea';

const url = 'https://restcountries.eu/rest/v2/all';

export default class AllCountriesList extends Component {
  constructor() {
    super();

    this.state = {
      countries: [],
      maxCountriesPerPage: [],
      loading: true,
      maxCountriesPerPageIndex: 20,
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
          maxCountriesPerPage: res.data.slice(
            0,
            this.state.maxCountriesPerPageIndex
          ),
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
    const filteredCountry = this.state.countries.filter(function (country) {
      return country.name.toLowerCase().includes(countryName.toLowerCase());
    });

    this.setState({
      maxCountriesPerPage: filteredCountry,
    });
  };

  loadMore = () => {
    const newIndex = this.state.maxCountriesPerPageIndex + 20;
    this.setState({
      maxCountriesPerPageIndex: newIndex,
      maxCountriesPerPage: [...this.state.countries].slice(0, newIndex),
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
    const { maxCountriesPerPage, loading } = this.state;
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
            maxCountriesPerPage.map((country, index) => {
              return (
                <Link
                  href={'/search-country-information-react/#/c/' + country.name}
                  key={index}>
                  <Box maxW='sm' borderWidth='1px' rounded='lg'>
                    <Image src={country.flag} alt={country.name} />
                    <Box p='5'>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            mb='20'
            mt='20'
            style={{ width: '250px' }}
            onClick={this.loadMore}>
            Load more
          </Button>
        </div>
      </>
    );
  }
}
