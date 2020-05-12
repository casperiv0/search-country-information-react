import React, { Component } from 'react';
import axios from 'axios';
import { Link, Icon, Heading, Image, ListItem } from '@chakra-ui/core';

const url = 'https://restcountries.eu/rest/v2/name/';

export default class CountryInformation extends Component {
  constructor() {
    super();

    this.state = {
      country: [],
    };
  }

  getCountryData = (name) => {
    axios
      .get(url + name)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          this.setState({
            country: res.data[0],
          });
        } else {
          // Country not found
          console.log(res.data);
          return this.setState({
            message: 'There was an error getting the country!',
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCountryData(this.props.match.params.country);
  }

  render() {
    const { country } = this.state;
    return (
      <div style={{ marginTop: '20px' }}>
        <Link href='/' className='back-btn'>
          <Icon name='arrow-back' color='white.500' />
          Back
        </Link>

        {country.name ? (
          <div className='country-information-grid'>
            <div>
              <Image src={country.flag} alt={country.name} />
            </div>

            <div>
              <Heading>{country.name}</Heading>

              <div className='information-grid'>
                <div>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Native Name: </span>
                    {country.nativeName}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Capital: </span>
                    {country.capital}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Population: </span>
                    {country.population
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Region: </span>
                    {country.region}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Sub Region: </span>
                    {country.subregion}
                  </p>
                </div>



                <div>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Top Level Domain: </span>
                    {country.topLevelDomain[0]}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Alpha2Code: </span>
                    {country.alpha2Code}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Alpha3Code: </span>
                    {country.alpha3Code}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Languages: </span>
                    {country.languages.map((lang, index) => {
                      return <ListItem key={index}>
                          {lang.name} ({lang.nativeName})
                      </ListItem>
                    })}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Currencies: </span>
                    {country.currencies.map((currency, index) => {
                      return <ListItem key={index}>
                        {currency.name}
                      </ListItem>
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}
