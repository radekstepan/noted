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
  // Lists.
  results: null,
  today: null,
  tags: null,
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
    async getDashboard() {
      this.set({...initialState, loading: true});

      try {
        const [today, tags] = await Promise.all([
          api.get('/today'),
          api.get('/tags')
        ]);

        this.set({
          loading: false,
          today: today.data.total ? today.data.docs : null,
          tags: tags.data.total ? Object.entries(tags.data.tags.reduce((tags, doc) => {
            doc.tags.forEach(tag => {
              if (!tags[tag]) {
                tags[tag] = [];
              }
              tags[tag].push(doc);
            });
            return tags;
          }, {})).sort(([a], [b]) => a < b ? -1 : 1) : null
        });
      } catch (err) {
        this.set({loading: false, error: `${err}`});
      }
    },

    async search(params = {}) {
      // Clear search.
      if (!params.q) {
        return;
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
        this.set({
          loading: false,
          error: JSON.stringify(err.response.data.error, null, 2)
        });
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

    async getDoc(id) {
      const {data: doc} = await api.get(`/doc/${id}`);
      this.set({doc});
    },

    closeDoc() {
      this.set({doc: null});
    }
  }
};

export default elastic;
