import { createStore } from 'vuex';

import registration from '@/store/modules/registration.js';

export const store = createStore({
  modules: {
    registration,
  },
});
