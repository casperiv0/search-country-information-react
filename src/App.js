import React, { Component } from 'react';
import { CSSReset, ThemeProvider, theme } from '@chakra-ui/core';
import { HashRouter as Router, Route } from "react-router-dom";
import AllCountriesList from './components/AllCountriesList/AllCountriesList';
import CountryInformation from './components/CountryInformation/CountryInformation';

import Header from "./components/Header"

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};

class App extends Component {

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <Header />
          <Router basename="/">
            <Route exact path="/"  component={AllCountriesList} />
          </Router>
          <Router basename="/c">
          <Route path="/:country" component={CountryInformation} />
          </Router>
        </ThemeProvider>
      </div>
    );
  }

}

export default App;
