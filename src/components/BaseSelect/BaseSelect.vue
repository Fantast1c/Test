<script setup>
import { ref, toRef, computed } from 'vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

const props = defineProps({
  /** @value */
  modelValue: {
    type: [String, Number, Object, Array],
    default: null,
  },

  /**
   * Список опций.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Добавляет placeholder для селекта.
   */
  placeholder: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:model-value']);

const model = toRef(props, 'modelValue');
const isActive = ref(false);

const option = computed(
  () => props.options.find((item) => item.id === model.value) || '',
);

const field = computed(() => option.value.name || props.placeholder);

function isCheckedOption(id) {
  return id === option.value.id;
}

function select(item) {
  emit('update:model-value', item.id);
}

function open() {
  if (isActive.value) {
    close();
    return;
  }

  isActive.value = true;
}

function close() {
  isActive.value = false;
}
</script>

<template>
  <div
    :tabindex="0"
    class="select"
    :class="{ 'select--active': isActive }"
    @click="open"
    @blur="close"
    @keyup.enter.prevent="open"
    @keyup.escape.prevent="close"
  >
    <div class="select__body">
      <p
        class="select__field"
        :class="{ 'select__field--placeholder': !model }"
      >
        {{ field }}
      </p>
      <SvgIcon
        name="dropdown"
        class="select__dropdown-icon"
      />
    </div>
    <Transition class="select__content-wrapper">
      <ul
        v-show="isActive"
        class="select__content"
      >
        <li
          v-for="item in props.options"
          :key="item.id"
          class="select__option"
          @click="select(item)"
        >
          {{ item.name }}
          <SvgIcon
            v-show="isCheckedOption(item.id)"
            name="check"
            class="select__check"
          />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" src="./BaseSelect.scss"></style>
