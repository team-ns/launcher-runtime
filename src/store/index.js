import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    load: false,
    login: "",
    text: "",
    error: false,
    ok: false,
    maxRam: 2048,
    download: {
      totalSize: 0,
      currentSize: 0
    },
    settings: {
      gameDir: "",
      saveData: false,
      ram: 1024
    },
    profiles: []
  },
  mutations: {
    error: (state, payload) => {
      state.error = true;
      state.text = payload;
    },
    ok: (state, payload) => {
      state.ok = true;
      state.text = payload;
    },
    load: (state, payload) => {
      state.load = true;
      state.text = payload;
    },
    loaded: state => {
      state.load = false;
      state.text = "";
    },
    close: state => {
      state.load = false;
      state.error = false;
      state.ok = false;
      state.text = "";
    },
    settings: (state, payload) => {
      state.settings = payload;
    },
    profiles: (state, payload) => {
      state.profiles = payload;
    }
  },
  getters: {
    downloadStatus: state => {
      return (state.download.currentSize * 100) / state.download.totalSize;
    },
    hasMessage: state => {
      return state.ok || state.error;
    },
    loading: state => {
      return state.load;
    },
    messageColor: state => {
      if (state.error) {
        return "red darken-1";
      } else if (state.ok) {
        return "green darken-1";
      }
      return null;
    }
  },
  actions: {},
  modules: {}
});
