import axios from 'axios';

const api = axios.create({
  baseURL: 'http://0.0.0.0:9000/api'
});

const elastic = {
  state: {
    loading: false,
    results: {
      took: 28,
      total: 303,
      hits: [{
        id: '2db200059ac54',
        score: 21.675,
        path: '2018-02-22-note.txt',
        title: '22nd February 2018',
        body: [
          'Lorem <em>ipsum</em> like',
          'gypsum rhymes with <em>ipsum</em>'
        ]
      }, {
        id: 'ef0669a76b',
        score: 10.949,
        path: '2016-12-18-forehead.txt',
        title: '18th December 2016',
        body: [
          'Oh no <em>highlight</em> is there'
        ]
      }]
    }
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
    async search() {
      this.set({loading: true, results: null});

      const results = await api.get(`/search`, {
        params: {
          query: 'love'
        }
      });

      this.set({loading: false, results});
    }
  }
};

export default elastic;
