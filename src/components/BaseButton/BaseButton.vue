<script setup>
const props = defineProps({
  /*
   * Свойство, отвечающее за атрибут type.
   */
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'submit', 'reset'].includes(value);
    },
  },

  /*
   *Свойство, отвечающее за атрибут disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="button"
  >
    <slot />
  </button>
</template>

<style lang="scss" src="./BaseButton.scss"></style>
