import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { all, resolve } from 'core-js/fn/promise'
import itemList from './assets/data/data.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    lessons: [],
    authorsList: [],
    selectedAuthors: '',
    publishedDatesList: [],
    selectedPublishedDates: '',
    userInput: '',
    currentPage: 1,
    count: 0,
    perPage: 5,
    loading: false,
    cartItems: [],
    username: 'admin',
    password: 'admin'
  },
  getters: {
    getLoggedIn: state => {
      return state.loggedIn;
    },
    getLessons: state => {
      return state.itemList;
    },
    getAuthorsList: state => {
      return state.authorsList;
    },
    getSelectedAuthors: state => {
      return state.selectedAuthors;
    },
    getPublishedDatesList: state => {
      return state.publishedDatesList;
    },
    getSelectedPublishedDates: state => {
      return state.selectedPublishedDates;
    },
    getPerPage: state => {
      return state.perPage;
    },
    getUserInput: state => {
      return state.userInput;
    },
    getBusy: state => {
      return state.loading
    },
    getCartItems: state => {
      return state.cartItems;
    },
    getFilteredLessons: state => {
      return state.lessons.filter(i => {
        let checkInSelectedDate = true;
        let checkInSelectedAuthor = true;
        if (state.selectedAuthors.length > 0)
          checkInSelectedAuthor = state.selectedAuthors.some(t => i.author != null && i.author == t.name);

        if (state.selectedPublishedDates.length > 0)
          checkInSelectedDate = state.selectedPublishedDates == i.formattedPublishDate;


        return (i.author.toLowerCase().indexOf(state.userInput.toLowerCase()) > -1
          || i.description.toLowerCase().indexOf(state.userInput.toLowerCase()) > -1)
          && checkInSelectedDate
          && checkInSelectedAuthor
      })
    },
    getTotal: state => {
      return state.count;
    },
    getCurrentPage: state => {
      return state.currentPage;
    },
  },
  mutations: {
    setSelectedAuthors(state, payload) {
      state.selectedAuthors = payload;
    },
    setSelectedPublishedDates(state, payload) {
      state.selectedPublishedDates = payload;
    },
    setLessons(state, payload) {
      state.lessons = payload.map(item => {
        let date = item.publishDate.split('/');

        if (date[1] > 12) {
          Vue.moment.defaultFormat = "MM.DD.YYYY";
        } else {
          Vue.moment.defaultFormat = "DD.MM.YYYY";
        }

        let z = Vue.moment(item.publishDate, Vue.moment.defaultFormat)

        return {
          ...item,
          formattedPublishDate: z.format("YYYY-MM-DD"),
        }
      });
    },
    setLoadingStatus(state, payload) {
      state.loading = payload;
    },
    setFilterDatesList(state) {
      state.publishedDatesList = state.lessons.map(a => a.formattedPublishDate);
    },
    setAuthorsList(state, payload) {
      state.authorsList = payload.map(a => a.author);
    },
    clearSelectionFilters(state) {
      state.selectedAuthors = '';
      state.selectedPublishedDates = '';
    },
    clearInput(state) {
      state.userInput = '';
    },
    setInputToStore(state, payload) {
      state.userInput = payload;
    },
    setPage(state, payload) {
      state.currentPage = payload;
    },
    addToCart(state, payload) {
      if (state.cartItems.find(i => i.index == payload.index)) {
        return;
      }
      state.cartItems.push(payload);
    },
    removeFromCart(state, payload) {
      state.cartItems = state.cartItems.filter(item => item.index != payload.index);
    },
    checkInput(state, payload) {
      if (payload.username == state.username && payload.password == state.password)
        state.loggedIn = true;
    }
  },
  actions: {
    async getProducts({ commit }, payload) {
      commit('setLoadingStatus', true);

      const myPromise = new Promise((resolve, reject) => {
        let courses = itemList.find((e) => e.lessons);
        resolve(courses.lessons)
      });

      myPromise
        .then(result => {
          commit('setLessons', result);
          commit('setFilterDatesList', result);
          commit('setAuthorsList', result);
        })
        .then(() => { commit('setLoadingStatus', false) })
        .catch(err => { console.log(err) });
    },
    setSelectedDates({ commit }, payload) {
      commit('setSelectedPublishedDates', payload);
    },
    setSelectedAuthors({ commit }, payload) {
      commit('setSelectedAuthors', payload);
    },
    clearUserInput({ commit }, payload) {
      commit('clearInput', payload);
    },
    setInput({ commit }, payload) {
      commit('setInputToStore', payload);
    },
    clearFilters({ commit }) {
      commit("clearSelectionFilters");
    },
    addItemToCart({ commit }, payload) {
      commit('addToCart', payload)
    },
    removeItemFromCart({ commit }, payload) {
      commit('removeFromCart', payload);
    },
    checkUsernameAndPass({ commit }, payload) {
      commit('checkInput', payload);
    }
  }
})
