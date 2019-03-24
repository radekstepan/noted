import axios from 'axios';

const api = axios.create({
  baseURL: 'api'
});

const initialState = {
  loading: false,
  error: null,
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
      // TODO limit too many files uploaded.
      if (files.length > 100) {
        return;
      }

      const data = new FormData();
      files.forEach((file, i) => data.append(`files[${i}]`, file));

      try {
        await api.post('/upload', data);
      } catch (err) {
        console.warn(err);
      }
    }
  }
};

export default files;
