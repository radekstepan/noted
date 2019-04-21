import axios from 'axios';

const api = axios.create({
  baseURL: 'api'
});

const initialState = {
  loading: false,
  error: null,
  // Search results.
  q: '',
  page: 1,
  results: null,
  // Tags.
  tags: [],
  // Single doc.
  doc: null
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
    async search(params = {}) {
      // Clear search.
      if (!params.q) {
        if (!params.date) {
          // Default to today's month/day combination.
          params.date = new Date().toISOString().substr(5, 5);
        }
      }

      // Make sure we have int on initial search from URL.
      if (params.page) {
        params.page = parseInt(params.page, 10);
      }

      this.set({
        ...initialState,
        loading: true,
        ...params
      });

      // Make the API call.
      try {
        const {data: results} = await api.get('/search', {params});
        this.set({loading: false, results});
      } catch (err) {
        this.set({loading: false, error: err});
      }
    },

    async searchDoc(index, store) {
      const {elastic: {q, date, page}} = store;

      const {data: doc} = await api.get('/search/doc', {
        params: {
          q,
          date,
          page,
          index
        }
      });
      this.set({doc});
    },

    async getTags() {
      this.set({tags: [], loading: true});

      try {
        const {data: {total, tags}} = await api.get('/tags');
        this.set({loading: false, tags: total ? tags : []});
      } catch (err) {
        this.set({loading: false, error: `${err}`});
      }
    },

    closeDoc() {
      this.set({doc: null});
    }
  }
};

export default elastic;
