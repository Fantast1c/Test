<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseField from '@/components/BaseField/BaseField.vue';
import BaseForm from '@/components/BaseForm/BaseForm.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';

import {
  PLACEHOLDER_NAME,
  PLACEHOLDER_COMPANY_NAME,
  ACCOUNT_CORPORATIVE_ID
} from '@/constants/registration.js'

const accountOptions = [
  { id: 'personal', name: 'Личный' },
  { id: 'corporative', name: 'Корпоративный' },
];

const rateOptions = [
  { id: 'base', name: 'Базовый (5$)', price: 5 },
  { id: 'extended', name: 'Расширенный (15$)', price: 15 },
  { id: 'vip', name: 'Вип (30$)', price: 30 },
];

const store = useStore();
const information = computed(() => store.getters.information);

const accountType = ref('personal');
const name = ref('');
const email = ref('');
const rate = ref('');
const userCount = ref('');

const rateOptionSelected = computed(
  () => rateOptions.find((item) => item.id === rate.value),
);

const isCorporativeType = computed(
  () => accountType.value === ACCOUNT_CORPORATIVE_ID,
);

const dynamicNamePlaceholder = computed(() => {
  return isCorporativeType.value ? PLACEHOLDER_COMPANY_NAME : PLACEHOLDER_NAME;
});

const isDisabledButton = computed(
  () =>
    !(accountType.value && name.value && email.value) ||
    (isCorporativeType.value && !(rate.value && userCount.value)),
);

function clearFields() {
  name.value = '';
  email.value = '';
  rate.value = '';
  userCount.value = '';
}

function onSubmit() {
  const commomData = {
    accountType: accountType.value,
    name: name.value,
    email: email.value,
  }

  const corporativeData = {
    ...commomData,
    rate: rateOptionSelected.value,
    userCount: userCount.value,
  }

  const data = isCorporativeType.value ? corporativeData : commomData;
  store.dispatch('setFields', data);

  clearFields();

  console.log(information.value);
}
</script>

<template>
  <BaseForm @submit.prevent="onSubmit">
    <template #title>Sign up</template>
    <BaseSelect
      v-model="accountType"
      :options="accountOptions"
      placeholder="Выберите тип аккаунта"
    />
    <BaseField
      v-model="name"
      :placeholder="dynamicNamePlaceholder"
    />
    <BaseField
      v-model="email"
      placeholder="email"
    />
    <BaseSelect
      v-show="isCorporativeType"
      v-model="rate"
      :options="rateOptions"
      placeholder="Выберите тариф"
    />
    <BaseField
      v-show="isCorporativeType"
      v-model="userCount"
      placeholder="Количество пользователей"
    />
    <BaseButton
      type="submit"
      :disabled="isDisabledButton"
    >
      Sign up
    </BaseButton>
  </BaseForm>
</template>@/constants/registration.js
