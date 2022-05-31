<template>
  <div id="container">
    <Header/>
    <RouterView />
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';

  export default {
    components: {
      Header, Footer
    }
  };
</script>

<style>
  @import "../styles/reset.css";
  @import "../styles/variables.css";
  @import "../styles/fonts.css";
  @import "../styles/style.css";
</style>