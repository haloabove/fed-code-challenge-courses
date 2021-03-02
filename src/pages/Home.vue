<template>
  <b-row>
    <cart></cart>
    <courses></courses>
  </b-row>
</template>
<script>
import Courses from "../components/Courses.vue";
import Cart from "../components/Cart.vue";

export default {
  components: {
    Courses,
    Cart,
  },
};
</script>
