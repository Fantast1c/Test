<script setup>
import { computed, shallowRef } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseField from '@/components/BaseField/BaseField.vue';
import BaseForm from '@/components/BaseForm/BaseForm.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';

const PLACEHOLDER_NAME = 'Имя';
const PLACEHOLDER_COMPANY_NAME = 'Имя компании';
const ACCOUNT_CORPORATIVE_ID = 'corporative';

const store = useStore();

const fields = computed(() => store.getters.getFields);
const updateFields = (key, value) => {
  store.dispatch('updateFields', { key, value });
};

const accountOptions = shallowRef([
  { id: 'personal', name: 'Личный' },
  { id: 'corporative', name: 'Корпоративный' },
]);

const rateOptions = shallowRef([
  { id: 'base', name: 'Базовый (5$)', price: 5 },
  { id: 'extended', name: 'Расширенный (15$)', price: 15 },
  { id: 'vip', name: 'Вип (30$)', price: 30 },
]);

const rateName = computed(
  () => rateOptions.value.find((item) => item.id === fields.value.rate)?.name,
);

const ratePrice = computed(
  () => rateOptions.value.find((item) => item.id === fields.value.rate)?.price,
);

const isCorporativeType = computed(
  () => fields.value.accountType === ACCOUNT_CORPORATIVE_ID,
);

const dynamicNamePlaceholder = computed(() => {
  return isCorporativeType.value ? PLACEHOLDER_COMPANY_NAME : PLACEHOLDER_NAME;
});

const isDisabledButton = computed(
  () =>
    !(fields.value.accountType && fields.value.name && fields.value.email) ||
    (isCorporativeType.value && !(fields.value.rate && fields.value.userCount)),
);

function onSubmit() {
  const personalData = `
    Имя: ${fields.value.name},
    Email: ${fields.value.email}
  `;

  const corporativeData = `
    Имя компании: ${fields.value.name},
    Email: ${fields.value.email},
    Тариф: ${rateName.value},
    Стоимость: ${fields.value.userCount * ratePrice.value}$
  `;

  isCorporativeType.value
    ? console.log(corporativeData)
    : console.log(personalData);

  // clearFields();
}
</script>

<template>
  <BaseForm @submit.prevent="onSubmit">
    <template #title>Sign up</template>
    <BaseSelect
      v-model="fields.accountType"
      :options="accountOptions"
      placeholder="Выберите тип аккаунта"
      @select="updateFields('accountType', fields.accountType)"
    />
    <BaseField
      v-model="fields.name"
      :placeholder="dynamicNamePlaceholder"
      @input="updateFields('name', fields.name)"
    />
    <BaseField
      v-model="fields.email"
      placeholder="email"
      @input="updateFields('email', fields.email)"
    />
    <BaseSelect
      v-show="isCorporativeType"
      v-model="fields.rate"
      :options="rateOptions"
      placeholder="Выберите тариф"
      @select="updateFields('rate', fields.rate)"
    />
    <BaseField
      v-show="isCorporativeType"
      v-model="fields.userCount"
      placeholder="Количество пользователей"
      @input="updateFields('userCount', fields.userCount)"
    />
    <BaseButton
      type="submit"
      :disabled="isDisabledButton"
    >
      Sign up
    </BaseButton>
  </BaseForm>
</template>
