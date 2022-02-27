<template>
  <div class="counter">
    <a-button>-</a-button>
    <a-input v-model="count" type="tel" />
    <a-button>+</a-button>
  </div>
</template>

<script>
export default {
  name: 'ACounter',
  data() {
    return {
      count: 0,
    }
  },
}
</script>
