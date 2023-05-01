import axios from 'axios';
import { BASE_URL, API_KEY } from './const';

function settingUrl(query, page) {
  return {
    key: API_KEY,
    q: query,
    page: page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
}

export default async function getImages(query, page) {
  const params = new URLSearchParams(settingUrl(query, page));
  const res = await axios.get(`${BASE_URL}?${params}`);
  return res.data;
}

// export class ImagesAPI {
//   constructor() {
//     this.query = null;
//     this.page = 1;
//   }
//   settingUrl() {
//     return {
//       key: API_KEY,
//       q: this.query,
//       page: this.page,
//       per_page: 12,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     };
//   }
//   async getImages(query) {
//     const params = new URLSearchParams(this.settingUrl());
//     const res = await axios.get(`${BASE_URL}?${params}`);
//     return res.data;
//   }
// }
