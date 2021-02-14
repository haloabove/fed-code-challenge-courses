<template>
  <div id="app">
    <b-container>
      <header class="masthead mb-auto">
        <div class="inner">
          <b-navbar class="nav nav-masthead justify-content-center">
            <b-link to="/">Home</b-link>
            <b-link to="/about">About</b-link>
            <b-link to="/contact">Contact</b-link>
          </b-navbar>
        </div>
      </header>

      <main role="main" class="inner cover">
        <router-view />
      </main>

      <footer class="mastfoot mt-auto">
        <Footer />
      </footer>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Footer,
  },
  computed: {
    ...mapGetters({
      selected: "getSelectedProductId",
    }),
  },
  mounted() {
    this.$store.dispatch("getProductsAndCategories", 1);
  },
};
</script>
<style lang="scss">
@import "assets/scss/custom-vars.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  background-color: #80808052;
  a {
    margin: 1rem auto;
  }
  .logo {
    width: 100%;
  }
}
.nav {
  padding: 30px;

  a {
    font-size: 2rem;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #3b626e;
    }
  }
}
</style>
