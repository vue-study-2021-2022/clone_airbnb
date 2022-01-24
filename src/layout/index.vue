<template>
  <section class="layout-container">
    <Header />
    <section class="content text-center height-500">
      <router-view />
    </section>
    <Footer />
  </section>
</template>

<script>
import Header from '@/layout/components/header'
import Footer from '@/layout/components/footer'
export default {
  name: 'Layout',
  components: { Footer, Header },
}
</script>
