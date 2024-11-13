<script setup></script>

<template>
  <div class="form">
    <p class="form__title">
      <slot name="title"></slot>
    </p>
    <form class="form__content">
      <slot name="default"></slot>
    </form>
  </div>
</template>

<style src="./BaseForm.scss"></style>
