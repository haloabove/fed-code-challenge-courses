<template>
  <b-col lg="3">
    <b-card
      bg-variant="dark"
      text-variant="white"
      title="Cart"
      tag="article"
      class="cart mb-2"
    >
      <b-card-text v-if="courses.length > 0">
        <b-list-group id="cart-items">
          <b-list-group-item
            variant="secondary"
            v-for="(course, index) in courses"
            :key="index"
            :class="index"
            ><div>
              {{ course.name }} by author {{ course.author }}, duration ({{
                course.duration
              }})
            </div>
            <b-button variant="danger" @click="removeItem(course)"
              >Remove Item</b-button
            >
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
      <b-card-text v-else id="cart-empty">
        Cart Is Empty, please select an item from the list.
      </b-card-text>
    </b-card>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      courses: "getCartItems",
    }),
  },
  methods: {
    removeItem(item) {
      this.$store.dispatch("removeItemFromCart", item);
    },
  },
};
</script>