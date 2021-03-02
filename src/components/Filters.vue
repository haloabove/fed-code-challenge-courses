<template>
  <b-form name="filters" class="formFilters">
    <b-row no-gutters class>
      <b-col class="filterButtons">
        <multiselect
          :loading="isBusy"
          :searchable="false"
          v-model="selectedAuthors"
          :options="mapedAutorList"
          :close-on-select="false"
          :show-labels="false"
          :multiple="true"
          track-by="value"
          label="name"
          placeholder="Authors"
          class="authors"
        >
          <template slot="selection" slot-scope="{ values, isOpen }">
            <span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} Authors</span
            >
          </template>
        </multiselect>
      </b-col>
      <b-col class="filterButtons">
        <b-form-datepicker
          id="published-dates"
          v-model="selectedPublishDates"
          :date-disabled-fn="disabledDates"
          class="publishDates"
        ></b-form-datepicker>
      </b-col>
      <b-col class="filterButtons text-right">
        <b-button
          squared
          variant="danger"
          :class="btnClass"
          @click.prevent="clearFilters"
          class="clearFilters ripple"
        >
          Clear Filters
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Filters",
  data() {
    return {
      dateTime: "",
      btnClass: "btn btn-primary btn-sm",
      loading: false,
    };
  },
  computed: {
    ...mapGetters([
      "getAuthorsList",
      "getSelectedAuthors",
      "getPublishedDatesList",
      "getSelectedPublishedDates",
      "getBusy",
    ]),
    isBusy() {
      this.getBusy ? (this.loading = true) : (this.loading = false);

      return this.loading;
    },
    mapedAutorList() {
      return this.getAuthorsList.map((author, index) => {
        return {
          name: author,
          value: index,
        };
      });
    },
    selectedAuthors: {
      get() {
        return this.getSelectedAuthors;
      },
      set(val) {
        this.$store.dispatch("setSelectedAuthors", val);
      },
    },
    selectedPublishDates: {
      get() {
        return this.getSelectedPublishedDates;
      },
      set(val) {
        this.$store.dispatch("setSelectedDates", val);
      },
    },
  },
  methods: {
    disabledDates(ymd, date) {
      return !this.getPublishedDatesList.includes(ymd);
    },
    clearFilters() {
      this.$store.dispatch("clearFilters");
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
