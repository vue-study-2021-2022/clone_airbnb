<template>
  <header
    class="header width-full text-center height-100"
    :style="{ backgroundColor: 'lightgrey' }"
  >
    <nav class="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
