import axios from "axios";

const fetchCountries = async () => {
  const response = await axios.get(
    'https://countriesnow.space/api/v0.1/countries/population'
  );
  const fetchedCurrencies = await response.data;
  return fetchedCurrencies.data;
};

const getCurrency = async (country) => {
   const response = await axios.post(
     "https://countriesnow.space/api/v0.1/countries/currency",
     { "country": country }
   );
   const currency = await response.data;
   return currency;
}


const getFlag = async (country) => {
  const response = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/flag/images",
    { "country" : country }
  );
  const flag = await response.data;
  return flag;
}


const getCapital = async (country) => {
  const response = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/capital",
    {"country": country}
  );
  const capital = await response.data;
  return capital;
}

export default fetchCountries;
export { getFlag, getCurrency, getCapital };


