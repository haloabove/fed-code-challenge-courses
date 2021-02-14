import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { all, resolve } from 'core-js/fn/promise'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemList: [],
    count: 0,
    perPage: 5,
    loading: false,
    userInput: '',
    currentPage: 1,
    cities: [],
    selectedCities: [],
    petTypes: [],
    selectedPetTypes: [],
  },
  getters: {
    getCityOptions: state => {
      return state.cities;
    },
    getSelectedCities: state => {
      return state.selectedCities;
    },
    getPetOptions: state => {
      return state.petTypes;
    },
    getSelectedPetTypes: state => {
      return state.selectedPetTypes;
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
    getItemList: state => {
      return state.itemList;
    },
    getAllWords: state => {
      return state.itemList;
    },
    getFilteredItems: state => {
      return state.itemList.filter(i => {
        let checkInSelectedPet = false;
        let checkInSelectedCity = false;

        if (state.selectedPetTypes.length > 0) {
          if (state.selectedPetTypes.some(t => {
            return (
              i.pets != null && i.pets.find((pet) => pet.type == t.name)
            )
          })) {
            checkInSelectedPet = true;
          }
        } else {
          checkInSelectedPet = true;
        }

        if (state.selectedCities.length > 0) {
          if (state.selectedCities.some(t => i.city == t.name)) {
            checkInSelectedCity = true;
          }
        } else {
          checkInSelectedCity = true;
        }

        return (i.city.toLowerCase().indexOf(state.userInput.toLowerCase()) > -1 ||
          i.name.toLowerCase().indexOf(state.userInput.toLowerCase()) > -1 ||
          i.age.toString().toLowerCase().indexOf(state.userInput.toLowerCase()) > -1 ||
          i.gender.toLowerCase().indexOf(state.userInput.toLowerCase()) > -1)
          && checkInSelectedCity
          && checkInSelectedPet
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
    setSelectedCities(state, payload) {
      state.selectedCities = payload;
    },
    setSelectedPets(state, payload) {
      state.selectedPetTypes = payload;
    },
    clearInput(state) {
      state.userInput = '';
    },
    setItems(state, payload) {
      state.itemList = payload;
    },
    setLoadingStatus(state, payload) {
      state.loading = payload;
    },
    setInputToStore(state, payload) {
      state.userInput = payload;
    },
    setPage(state, payload) {
      state.currentPage = payload;
    },
    clearSelectionFilters(state) {
      state.selectedCities = [];
      state.selectedPetTypes = [];
    },
    setFilterOptions(state, payload) {
      state.cities = [...new Set(payload.map(c => c.city))];
      let petTypes = [];
      payload.filter(i => i.pets !== null).forEach(items => {
        items.pets.forEach((pet) => {
          if (petTypes.filter(e => e.type === pet.type).length == 0) {
            petTypes.push({ type: pet.type });
          }
        })
      });
      state.petTypes = petTypes;
    }
  },
  actions: {
    setSelectedCities({ commit }, payload) {
      commit('setSelectedCities', payload);
    },
    setSelectedPetTypes({ commit }, payload) {
      commit('setSelectedPets', payload);
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
    async getProductsAndCategories({ commit, state }, payload) {
      commit('setLoadingStatus', true);


      let mel = "https://dorsavicodechallenge.azurewebsites.net/Melbourne";
      let syd = "https://dorsavicodechallenge.azurewebsites.net/Sydney";
      const getMel = axios.get(mel);
      const getSyd = axios.get(syd);

      axios.all([getMel, getSyd]).then(axios.spread((...responses) => {
        const responseMel = responses[0].data.map(item => {
          return {
            ...item,
            city: 'Melbourne'
          }
        });
        const responseSyd = responses[1].data.map(item => {
          return {
            ...item,
            city: 'Sydney'
          }
        });

        const itemsWithOrigin = [...responseMel, ...responseSyd];

        commit('setItems', itemsWithOrigin);
        commit('setFilterOptions', itemsWithOrigin);
      })).then(response => {
        commit('setLoadingStatus', false);
      }).catch(errors => {
        console.log(errors);
      });

    },
  }
})
