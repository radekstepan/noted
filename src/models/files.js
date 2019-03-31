import axios from 'axios';
import whilst from 'p-whilst';

const BATCH_SIZE = 100;

const api = axios.create({
  baseURL: 'api'
});

const initialState = {
  show: false,
  uploading: false,
  error: null,
  count: 0
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
    },

    showModal(state) {
      return {
        ...state,
        show: true
      };
    },

    closeModal() {
      return {
        ...initialState,
        show: false
      };
    }
  },
  effects: {
    async upload(files) {
      this.set({...initialState, show: true, uploading: true});

      try {
        let i = 0;
        await whilst(() => i < files.length, async () => {
          const data = new FormData();
          files
            .slice(i, i + BATCH_SIZE)
            .forEach((file, i) => data.append(`files[${i}]`, file));

          await api.post('/upload', data);
          i += BATCH_SIZE;
        });
        this.set({uploading: false, count: files.length});
      } catch (err) {
        let error = `${err}`;
        if (err.response && err.response.data.error) {
          error = err.response.data.error;
        }
        this.set({uploading: false, error});
      }
    }
  }
};

export default files;
