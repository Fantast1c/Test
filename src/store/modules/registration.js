import { ACCOUNT_CORPORATIVE_ID } from '@/constants/registration.js'

export default {
  state() {
    return {
      fields: null,
    }
  },

  mutations: {
    SET_FIELDS(state, data) {
      state.fields = data;
    },
  },
  actions: {
    setFields({commit}, payload) {
      commit('SET_FIELDS', payload);
    }
  },
  getters: {
    information: (state) => {
      return state.fields.accountType === ACCOUNT_CORPORATIVE_ID
        ?`Имя компании: ${state.fields.name}, Email: ${state.fields.email}, Тариф: ${state.fields.rate?.name}, Стоимость: ${state.fields.userCount * state.fields.rate?.price}$`
        : `Имя: ${state.fields.name}, Email: ${state.fields.email}`

    }
  },
};
