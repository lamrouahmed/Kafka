const getPopulation = (countries, country) => countries.find((c) => c.country.toLowerCase() === country.toLowerCase()).populationCounts.at(-1).value;


export default getPopulation;