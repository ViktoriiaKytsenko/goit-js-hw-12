// js/pixabay-api.js
import axios from 'axios';

const API_KEY = '50447683-96da9a4ff1c3a2668348e0aa0';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
