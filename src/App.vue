<template>
  <div id="app">
    <b-container fluid>
      <main role="main">
        <router-view />
      </main>
      <footer-component></footer-component>
      <login-modal></login-modal>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FooterComponent from "./components/Footer.vue";
import LoginModal from "@/components/Login.vue";

export default {
  components: {
    FooterComponent,
    LoginModal,
  },
  computed: {
    ...mapGetters({
      selected: "getSelectedProductId",
    }),
  },
  mounted() {
    this.$store.dispatch("getProducts", 1);
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
  .container-fluid {
    padding: 2rem;
  }
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

#published-dates__outer_ {
  label {
    padding: 0.5rem 0.75rem !important;
  }
}
.multiselect__tags-wrap {
  display: none !important;
}
.filterButtons {
  margin: 3px 3px;
}
.filterButtons {
  &.createdOn {
    min-width: 290px;
  }
  &.time {
    padding-top: 3px;
  }
}

#orderList {
  .delivery-details-label {
    width: 50%;
  }
}
.multiselect__content-wrapper {
  width: 300px;
}

#date-time-label {
  padding-top: 7px;
  float: left;
}

#date-time {
  width: 100px;
}

.formFilters {
  margin: 5px 0px;
}

.multiselect__option {
  &.multiselect__option--highlight {
    background: #17a2b8 !important;
    &.multiselect__option--selected {
      background: #8d6e57 !important;
    }
  }
}

@media (max-width: 1336px) {
  #orderListdatePicker__outer_ {
    font-size: 13px;
  }
  .filterButtons.createdOn {
    min-width: 140px;
  }
}
@media (max-width: 965px) {
  #orderListdatePicker__outer_ {
    font-size: 11px !important;
    height: 43px !important;
  }
}
</style>
