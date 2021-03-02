<template>
  <b-row>
    <footer class="mastfoot mt-auto navbar fixed-bottom">
      <span>Tim Jovchevski</span><span> {{ year }}</span>
    </footer>
  </b-row>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>