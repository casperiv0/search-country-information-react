import React, { Component } from "react";
import axios from "axios";
import { Heading, Image, List, ListItem } from "@chakra-ui/react";
import SpinnerArea from "../AllCountriesList/SpinnerArea";
import { Link } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons/dist/esm/ArrowBack";

const url = "https://restcountries.eu/rest/v2/name/";

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
          return this.setState({
            message: "There was an error getting the country!",
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
      <div>
        <Link href="/search-country-information-react/#/" className="back-btn">
          <ArrowBackIcon name="arrow-back" color="white.500" />
          Back
        </Link>

        {country.name ? (
          <div className="country-information-grid">
            <div>
              <Image src={country.flag} alt={country.name} />
            </div>

            <div>
              <Heading>{country.name}</Heading>

              <div className="information-grid">
                <div>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Native Name: </span>
                    {country.nativeName}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Capital: </span>
                    {country.capital}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Population: </span>
                    {country.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Region: </span>
                    {country.region}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Sub Region: </span>
                    {country.subregion}
                  </p>
                </div>

                <div>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Top Level Domain: </span>
                    {country.topLevelDomain[0]}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Alpha2Code: </span>
                    {country.alpha2Code}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Alpha3Code: </span>
                    {country.alpha3Code}
                  </p>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Currencies: </span>
                    <List spacing="3">
                      {country.currencies.map((currency, index) => {
                        return <ListItem key={index}>{currency.name}</ListItem>;
                      })}
                    </List>
                  </div>
                </div>
              </div>
              <div className="languages">
                <span style={{ fontWeight: "bold" }}>Languages: </span>
                <div className="languages-grid">
                  {country.languages.map((lang, index) => {
                    return (
                      <div className="lang-item" key={index}>
                        {lang.name} ({lang.nativeName})
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SpinnerArea />
        )}
      </div>
    );
  }
}
