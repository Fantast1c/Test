<script setup>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

const input = defineModel({
  type: String,
  default: '',
});

const props = defineProps({
  /**
   * Добавляет placeholder для инпута.
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Максимальная длина элемента инпута.
   */
  maxlength: {
    type: [Number, String],
    default: Infinity,
  },
});

function clearInput() {
  input.value = '';
}
</script>

<template>
  <label class="field">
    <input
      v-model="input"
      :maxlength="props.maxlength"
      :placeholder="props.placeholder"
      class="field__input"
    />
    <button
      v-show="input"
      type="button"
      class="field__icon-body"
      @click="clearInput"
    >
      <SvgIcon
        name="cros"
        class="field__icon"
      />
    </button>
  </label>
</template>

<style lang="scss" src="./BaseField.scss"></style>
