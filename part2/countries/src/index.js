import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

const CountryProfile = ({country}) => {
  console.log(country)
  return (<div>
    <h2>{country.name}</h2>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
    <h3>Languages</h3>
    {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
    <img style={{ maxWidth: '200px'}} src={country.flag} alt='Flag' />
  </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);
  const [show, setShow] = useState(null);

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
  }, [])
  
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    const countriesFound = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
    setMatches(countriesFound)
  }

  const showCountry = (e) => {
    const countryText = e.target.previousSibling.innerText;
    const countryFound = countries.filter(country => country.name === countryText);
    setShow(countryFound[0]);
  }

  let result;
  if (show || matches.length === 1) {
    const country = show || matches[0];
        result = <CountryProfile country={country} />
  } else {
    if (matches.length > 10) {
      result = <p>Too many matches. Make search more specific</p> 
    } else if (matches.length >= 2 && matches.length <= 10) {
        result = matches.map(match => (  
          <div key={'div-'+match.alpha3Code}>
            <li key={match.alpha3Code}>{match.name}</li>
            <button key={'btn-'+match.alpha3Code} onClick={showCountry}>Show</button>
          </div>))
  
    } else {
      result = <p>Not found</p>
    }

  }
  return (
    <>
      <div>Find countries: <input type='text' value={search} onChange={handleSearch} /></div>
      <div>{search ? result : null}</div>
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));