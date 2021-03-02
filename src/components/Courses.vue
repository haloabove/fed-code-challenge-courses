<template>
  <b-col lg="9">
    <b-card
      bg-variant="dark"
      text-variant="white"
      title="Courses"
      tag="article"
      class="cart mb-2"
    >
      <b-overlay :show="busy" rounded="lg">
        <b-input-group size="sm" class="searchWrapper mb-2 mt-2">
          <b-form-input
            v-model="search"
            trim
            id="wordSearch"
            ref="wordSearch"
            placeholder="Please start Typing."
            @update="clearSearch"
            type="search"
          ></b-form-input>
          <b-button-group size="sm">
            <b-button
              squared
              type="submit"
              @click.prevent="preformSearch"
              class="ripple"
              size="sm"
              variant="info"
              id="searchWord"
              ><b-icon-search></b-icon-search>Search</b-button
            >
          </b-button-group>
        </b-input-group>
        <b-table></b-table>
      </b-overlay>
      <filters></filters>
    </b-card>

    <b-table
      dark
      id="coursesTable"
      ref="coursesTable"
      head-variant="dark"
      sticky-header
      class="table table-striped"
      sort-desc
      :fields="fields"
      :items="lessons"
      :bordered="true"
      :hover="true"
      :current-page="currentPage"
      :per-page="perPage"
      :busy="busy"
      small
      justify
      responsive
      tbody-tr-class="materials_table-row"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          v-if="cartItems.every((i) => i.index != row.index)"
          squared
          size="sm"
          variant="info"
          @click="addItem(row.item, row.index)"
          class="mr-1 addItemButton"
        >
          <b-icon icon="plus" font-scale="1.4" aria-hidden="true"></b-icon>
          <span class="sr-only">Add To Cart</span>
        </b-button>
        <b-button
          v-else
          squared
          size="sm"
          variant="danger"
          @click="removeItem(row.item, row.index)"
          class="mr-1 removeButton"
        >
          <b-icon icon="dash" font-scale="1.4" aria-hidden="true"></b-icon>
          <span class="sr-only">Remove To Cart</span>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      ref="materialPagination"
      variant="info"
      align="center"
      first-class="ripple"
      next-class="ripple"
      ellipsis-class="ripple"
      last-class="ripple"
      page-class="ripple"
      prev-class="ripple"
      v-model="currentPage"
      :total-rows="totalRowsLenght"
      :per-page="perPage"
      size="md"
      first-text="<<"
      prev-text="<"
      next-text=">"
      last-text=">>"
      ellipsis-text="..."
    ></b-pagination>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Filters from "@/components/Filters.vue";

export default {
  components: {
    Filters,
  },
  data() {
    return {
      selectedItems: [],
      tempSelection: {},
      tipData: { title: "<b-button @click='addToCart'>Add To Cart</b-button>" },
      fields: [
        {
          label: "Author",
          key: "author",
        },
        {
          label: "Description",
          key: "description",
        },
        {
          label: "Duration",
          key: "duration",
          sortable: true,
        },
        {
          label: "Name",
          key: "name",
        },
        {
          label: "Publish Date",
          key: "publishDate",
          sortable: true,
        },
        {
          label: "Actions",
          key: "actions",
        },
      ],
      search: "",
      currentPage: 1,
      productHeaders: [],
    };
  },
  computed: {
    ...mapGetters({
      perPage: "getPerPage",
      busy: "getBusy",
      lessons: "getFilteredLessons",
      cartItems: "getCartItems",
      loggedIn: "getLoggedIn",
    }),
    totalRowsLenght() {
      return this.lessons.length;
    },
  },
  methods: {
    ...mapActions([
      "clearUserInput",
      "addItemToCart",
      "removeItemFromCart",
      "setInput",
    ]),
    addItem(item, index) {
      if (this.loggedIn) {
        this.addItemToCart({ ...item, index });
      } else {
        this.tempSelection = { ...item, index };
        this.$root.$emit("bv::show::modal", "login-modal");
      }
    },
    removeItem(item, index) {
      this.removeItemFromCart({ ...item, index });
    },
    preformSearch() {
      this.setInput(this.search);
    },
    clearSearch(val) {
      if (val == "") this.clearUserInput();
    },
    showToast() {
      const h = this.$createElement;
      const id = `my-toast-${this.count++}`;
      const $closeButton = h(
        "b-button",
        {
          on: { click: () => this.$bvToast.hide(id) },
        },
        "Close"
      );

      // Create the toast
      this.$bvToast.toast([$closeButton], {
        id: id,
        title: `Login Successful`,
        noCloseButton: true,
        variant: "info",
        autoHideDelay: 2000,
      });
    },
  },
  watch: {
    loggedIn() {
      this.$root.$emit("bv::hide::modal", "login-modal");
      this.addItemToCart(this.tempSelection);
      this.showToast();
    },
  },
};
</script>