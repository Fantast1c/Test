export default {
  state() {
    return {
      fields: {
        accountType: '',
        name: '',
        email: '',
        rate: '',
        userCount: '',
      },
    };
  },

  mutations: {
    SET_FIELDS(state, { key, value }) {
      state.fields[key] = value;
    },
  },

  actions: {
    updateFields({ commit }, payload) {
      commit('SET_FIELDS', payload);
    },
  },

  getters: {
    getFields(state) {
      return state.fields;
    },
  },
};
