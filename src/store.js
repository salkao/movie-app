import Vue from 'vue';
import Vuex from 'vuex';
import vueAxios from 'vue-axios';
import axios from 'axios';
import { _orderBy } from 'lodash';
import { _find } from 'lodash';
const firebase = require("firebase");

Vue.use(Vuex);
Vue.use(vueAxios, axios);

export default new Vuex.Store({
  state: {
    movies: {},
    grid: false,
    favourites: [],
    sort: 'likes',
  },
  mutations: {
    SAVE_MOVIES(state, movies) {
      state.movies = movies;
    },
    GRID_ON(state) {
      state.grid = !state.grid;
    },
    LIKE_MOVIE(state, id) {
      const db = firebase.firestore();
      console.log(id);
      const movie = _.find(state.movies, (movie) => movie.id === id);
      console.log(movie);
      movie.likes += 1;
      db.collection("likes").doc(movie.id).set({
        likes: movie.likes
      });
    },
    DISLIKE_MOVIE(state, id) {
      const db = firebase.firestore();
      const movie = _.find(state.movies, (movie) => movie.id === id);
      movie.dislikes += 1;
      db.collection("dislikes").doc(movie.id).set({
        dislikes: movie.dislikes
      });
    },
    ADD_TO_FAVOURITES(state, movie) {
      state.favourites.push(movie);
    },
    SORT_BY_LIKES(state) {
      state.movies = _.orderBy(state.movies, movie => movie.likes, 'desc');
    },
    SORT_BY_RELEASE_YEAR(state) {
      console.log('release sort');
      state.movies =_.orderBy(state.movies, movie => movie.releaseDate, 'asc');
    },
    CHANGE_SORT(state, sortBy) {
      state.sort = sortBy;
    },
  },
  actions: {
    getMovies({ commit }) {
      return axios.get('https://output.jsbin.com/wokedotuki.json')
        .then((response) => {
          const db = firebase.firestore();
          // parsing data
          const obj = response.data.data;
          const movies = [];
          for (const key in obj) {
            const e = obj[key];
            e.id = key;
            const likesTable = db.collection("likes").doc(e.id);
            likesTable.get().then((doc) => {
              if(doc.exists) {
                e.likes = doc.data().likes;
              } else {
                e.likes = 0;
              }
            });
            const dislikesTable = db.collection("dislikes").doc(e.id);
            dislikesTable.get().then((doc) => {
              if(doc.exists) {
                e.dislikes = doc.data().dislikes;
              } else {
                e.dislikes = 0;
              }
            });
            movies.push(e);
          }
          commit('SAVE_MOVIES', movies);
        });
    },
    gridOn({ commit }) {
      commit('GRID_ON');
    },
    likeMovie({ commit }, id) {
      commit('LIKE_MOVIE', id);
    },
    dislikeMovie({ commit }, id) {
      commit('DISLIKE_MOVIE', id);
    },
    addToFavourites({ commit }, movie) {
      commit('ADD_TO_FAVOURITES', movie);
    },
    sortByLikes({ commit }) {
      commit('SORT_BY_LIKES');
    },
    sortByReleaseYear({ commit }) {
      commit('SORT_BY_RELEASE_YEAR');
    },
    changeSort({ commit }, sortBy) {
      commit('CHANGE_SORT', sortBy);
    },
  },
  getters: {
    movies: state => state.movies,
    grid: state => state.grid,
    sort: state => state.sort,
  },
});
