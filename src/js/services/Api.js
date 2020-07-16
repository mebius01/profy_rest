import axios from 'axios'
import url from '../config/config'

// api/v1/ - categories
// api/v1/{pk=1} - category id
// api/v1/post/ - post re

const headers = {
  "Content-type": "application/json; charset=UTF-8"
};

const pk = '1'

class Api {
  constructor(url, headers) {
    this.url = url,
      this.headers = headers
  }

  async getCategories() {
    try {
      const response = await axios.get(`${this.url}/categories/`)
      return response
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  }
  async postCall(data) {
    try {
      const response = await axios.post(`${this.url}/post/`, data, this.headers)
      return response
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  }
  async getOneCategory(pk) {
    try {
      const response = await axios.get(`${this.url}/${pk}/`)
      return response
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  }

}
const api = new Api(url, headers);
export default api;


// api.getOneCategory(1).then((response) => {
//   console.log(response.status);
//   console.log(response.data);
// })