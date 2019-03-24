import axios from 'axios';

import store from '.';

const api = axios.create({
  baseURL: 'api'
});

const initialState = {
  loading: false,
  error: null,
  q: '',
  page: 1,
  results: null,
  doc: null
};

const files = {
  state: {
    ...initialState
  },
  reducers: {
    set(state, obj) {
      return {
        ...state,
        ...obj
      };
    }
  },
  effects: {
    async upload(files) {
      console.log(files);
    }
  }
};

export default files;
