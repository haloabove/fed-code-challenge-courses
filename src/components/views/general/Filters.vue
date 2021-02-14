<template>
  <b-form name="filters" class="formFilters">
    <b-row no-gutters class>
      <b-col class="filterButtons">
        <multiselect
          :loading="isBusy"
          :searchable="false"
          v-model="selectedCities"
          :options="mapedCities"
          :close-on-select="false"
          :show-labels="false"
          :multiple="true"
          track-by="value"
          label="name"
          placeholder="Location"
        >
          <template slot="selection" slot-scope="{ values, isOpen }">
            <span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} Location</span
            >
          </template>
        </multiselect>
      </b-col>
      <b-col class="filterButtons">
        <multiselect
          :loading="isBusy"
          :searchable="false"
          v-model="selectedPetTypes"
          :close-on-select="false"
          :show-labels="false"
          :multiple="true"
          track-by="value"
          label="name"
          :options="mapedPetOptions"
          placeholder="Pet Type"
        >
          <template slot="selection" slot-scope="{ values, isOpen }">
            <span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} Pet Type</span
            >
          </template>
        </multiselect>
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
    busy() {
      return this.$store.getters["getBuisy"];
    },
    isBusy() {
      this.busy ? (this.loading = true) : (this.loading = false);

      return this.loading;
    },
    mapedPetOptions() {
      return this.$store.getters["getPetOptions"].map((pets, index) => {
        return {
          name: pets.type,
          value: index,
        };
      });
    },
    mapedCities() {
      return this.$store.getters["getCityOptions"].map((option, index) => {
        return {
          name: option,
          value: index,
        };
      });
    },
    selectedCities: {
      get() {
        return this.$store.getters["getSelectedCities"];
      },
      set(val) {
        this.$store.dispatch("setSelectedCities", val);
      },
    },
    selectedPetTypes: {
      get() {
        return this.$store.getters["getSelectedPetTypes"];
      },
      set(val) {
        this.$store.dispatch("setSelectedPetTypes", val);
      },
    },
  },
  methods: {
    clearFilters() {
      this.$store.dispatch("clearFilters");
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__tags-wrap {
  display: none !important;
}
.filterButtons {
  margin: 3px 3px;
  width: 145px;
}
.filterButtons.createdOn {
  min-width: 290px;
}
.filterButtons.time {
  padding-top: 3px;
}
#orderList .delivery-details-label {
  width: 50%;
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
.multiselect__option.multiselect__option--highlight.multiselect__option--selected {
  background: #8d6e57 !important;
}
.multiselect__option.multiselect__option--highlight {
  background: #17a2b8 !important;
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