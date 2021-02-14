<template>
  <b-row>
    <b-col lg="12" md="9">
      <Search />
    </b-col>
  </b-row>
</template>

<script>
import Search from "@/components/Search.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Search,
  },
  computed: {},
};
</script>
