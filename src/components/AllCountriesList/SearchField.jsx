import React, { Component } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Grid,
  Select,
  InputRightAddon,
  InputGroup,
} from '@chakra-ui/core';

export default class SearchField extends Component {
  constructor() {
    super();

    this.state = {
      country: [],
      countryName: '',
    };
  }

  handleSearchInput = (e) => {
    this.setState({
      countryName: e.target.value,
    });
  };

  searchCountry = (event) => {
    event.preventDefault();
    const { countryName } = this.state;
    this.props.searchCountry(countryName);
  };

  handleSelect = (e) => {
    const region = e.target.value;
    let url = `http://restcountries.eu/rest/v2/region/${region}`;
    if (region === 'all') {
      url = 'http://restcountries.eu/rest/v2/all';
    }
    this.props.getCountries(url);
  };

  clearInput = () => {
    this.setState({
      countryName: '',
    });
    this.props.getCountries('http://restcountries.eu/rest/v2/all');
  };

  render() {
    const { countryName } = this.state;
    return (
      <form className='search-container' onSubmit={this.searchCountry}>
        <FormControl>
          <Grid templateColumns='75% 25%' gap='4'>
            <div>
              <FormLabel>Enter Country</FormLabel>
              <InputGroup>
                <Input
                  type='text'
                  id='country'
                  rounded='0'
                  value={countryName}
                  onChange={this.handleSearchInput}
                />
                <InputRightAddon
                  onClick={this.clearInput}
                  children='Clear'
                  style={{ cursor: 'pointer' }}
                />
              </InputGroup>
            </div>
            <div>
              <FormLabel>Filter by Region</FormLabel>
              <Select onChange={this.handleSelect}>
                <option defaultValue value='all'>
                  All
                </option>
                <option value='asia'>Asia</option>
                <option value='africa'>Africa</option>
                <option value='americas'>America</option>
                <option value='europe'>Europe</option>
                <option value='oceania'>Oceania</option>
              </Select>
            </div>
          </Grid>
        </FormControl>
        <FormControl style={{ marginTop: '20px' }}>
          <Button type='submit'>Search</Button>
        </FormControl>
      </form>
    );
  }
}
