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
  results: null
};

const elastic = {
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
    async search(params) {
      // Clear search.
      if (!params.q) {
        return this.set({...initialState});
      }

      this.set({
        ...initialState,
        loading: true,
        ...params
      });

      // Modify URL.
      store.router.effects.navigate(`/`, params);

      // Make the API call.
      try {
        const {data: results} = await api.get(`/search`, {params});
        this.set({loading: false, results});
      } catch (err) {
        this.set({loading: false, error: `${err}`});
      }
    }
  }
};

export default elastic;
