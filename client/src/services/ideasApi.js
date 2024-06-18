import axios from 'axios';

class IdeasApi {
  // This project will use the Axios module to work with APIs instead of the fetch API. Apparently, Brad likes Axios more.
  constructor() {
    this._apiUrl = '/api/ideas';
  }

  getIdeas() {
    // In Axios, you use '.get' for a GET request, '.post' for a POST request, '.put' for a PUT request, and '.delete' for a DELETE request.
    return axios.get(this._apiUrl);
  }

  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }

  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  deleteIdea(id) {
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : ''
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username
      }
    });
  }
}

export default new IdeasApi(); // You can actually instantiate an instance in the export.