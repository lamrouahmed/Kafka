import Search from './Search/Search'
import Loading from './Loading/Loading'
import InfoCard from './InfoCard/InfoCard'
import styles from './app.module.scss'
import fetchCountries, { getCurrency, getFlag, getCapital } from './utils/fetchCountries'
import getPopulation from './utils/getPopulation'
import React, { useState, useEffect } from 'react'
import axios from 'axios';


function App() {

  const [countries, setCountries] = useState({population: [], currency: [], flag: [], capital: []});
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [autoComplete, setAutoComplete] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(true);

  useEffect(() => {
    fetchCountries().then(data => {
      setCountries({ ...countries, population: data });
      setIsLoading(false);
    });

  }, []);


  const handleSubmit = e => {
    e.preventDefault();

    if(autoComplete.length === 1 && (countries.population.findIndex(c => c.country.toLowerCase() === country.toLowerCase()) !== -1)) {
      let { country } = autoComplete.pop();
      setIsDataLoaded(false);
      Promise.all([getCurrency(country), getFlag(country), getCapital(country)]).then((res) => {
        setCountries({
          ...countries,
          currency: res[0].data.currency,
          flag: res[1].data.flag,
          capital: res[2].data.capital,
        });
        setIsDataLoaded(true);
        setSubmit(true);
         axios.post("http://localhost:3001/create", {
           country: {
             name: country,
             currency: res[0].data.currency,
             flag: res[1].data.flag,
             capital: res[2].data.capital,
           },
         });
      })
      .catch(e => {
        setCountries({
          ...countries,
          flag: "./unknown.png",
          capital: "???",
          currency: "???",
        });
        setSubmit(true);
      });

      //setIsDataLoaded(true);
      //setAutoComplete([]);
    }
  }

  const handleChange = e => {
    setSubmit(false);
    const {value} = e.target;
    const {population} = countries
    const selectedCountries = population.filter(p => (p.country.toLowerCase().startsWith(value.toLowerCase()) && value !== ''));
    setAutoComplete(selectedCountries);
    setCountry(value);
  }


  const fillInput = (e) => {
    setCountry(e);  
    setAutoComplete([autoComplete.find((c) => c.country === e)]);
  }
  

  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <Search
            onSearch={handleSubmit}
            onChange={handleChange}
            onClick={fillInput}
            autoComplete={autoComplete}
            value={country}
            loaded={isDataLoaded}
          />
        )}
        {submit && (
          <>
            <div className={styles.cards}>
              <InfoCard
                title="Country"
                value={country}
                image={countries.flag}
                color="#292e32"
                width="true"
              />
              <InfoCard
                title="Capital"
                value={countries.capital}
                image="./capital.png"
                color="#292e32"
              />
              <InfoCard
                title="Population"
                value={getPopulation(countries.population, country)}
                image="./population.png"
                color="#292e32"
              />
              <InfoCard
                title="Currency"
                value={countries.currency}
                image="./currency.png"
                color="#292e32"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
  
}

export default App;
