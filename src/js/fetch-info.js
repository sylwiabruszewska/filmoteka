import { API_KEY, BASE_URL } from './fetch-data';


async function fetchLibMovies(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data;
}