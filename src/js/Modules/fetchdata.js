// fetchData.js

export async function fetchStarWarsData(category) {
  let endpoint = '';
  switch (category) {
    case 'films':
      endpoint = 'https://swapi.py4e.com/api/films/';
      break;
    case 'people':
      endpoint = 'https://swapi.py4e.com/api/people/';
      break;
    case 'planets':
      endpoint = 'https://swapi.py4e.com/api/planets/';
      break;
    case 'vehicles':
      endpoint = 'https://swapi.py4e.com/api/vehicles/';
      break;
    default:
      throw new Error('Unknown category');
  }

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const jsonData = await response.json();
  return jsonData.results; // SWAPI typically returns results in `results`
}
