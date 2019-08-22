<template>
  <v-app id="content">
    <v-container class="a pt-6">
      <v-card
        class="mx-auto c"
        width="650px"
        elevation="24"
        max-height="100%"
        >
        <v-img
          class="white--text"
          height="1000px"
          :src="movie.cover">
        </v-img>
        <h1 class="text-center fontClass mt-2">{{ movie.title }}</h1>
          <v-card-text class="ml-3 fontClass cardText">
          <v-container fluid>
            <v-layout align-start justify-start row class="text-center">
              <v-flex lg4 s12>
                <div>
                  Release date: {{ movie.releaseDate | date}}
                </div>
              </v-flex>
              <v-flex lg4 s12>
                <div>
                  Release country: {{ movie.releaseCountry }}
                </div>
              </v-flex>
              <v-flex lg4 m12>
                <div>
                  Rating: {{ movie.rating }}
                  <a :href="imdbLink()" target="_blank">
                    <img src="../assets/IMDb-icon.png" alt="IMDb" height="18px" width="30px">
                  </a>
                </div>
              </v-flex>
            </v-layout>
            <v-layout id="actions" align-center justify-center>
              <v-flex xs12 lg7>
                <v-btn @click="likeMovie" class="ma-2" text icon color="blue lighten-2">
                  <v-icon>thumb_up</v-icon>
                  <h4 class="mx-auto">{{ movie.likes }}</h4>
                </v-btn>
                <v-btn class="ma-2" text icon color="red lighten-2">
                  <v-icon>thumb_down</v-icon>
                </v-btn>
                <v-btn outlined @click="addToFavourites">add to favourites</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { isEmpty } from 'lodash';
import { findIndex } from 'lodash';
import { find } from 'lodash';
const firebase = require("firebase");

export default {
  data() {
    return {
      db: firebase.firestore(),
    };
  },
  methods: {
    imdbLink() {
      return `http://imdb.com/title/${this.movie.id}`;
    },
    likeMovie() {
      this.$store.dispatch('likeMovie', this.$route.params.id);
      console.log(this.movie.likes);
    },
    saveToDb(movie) {
      // var db = firebase.firestore();
      this.db.collection("favourites").doc(movie.id).set({
        id: movie.id,
        title: movie.title,
        cover: movie.cover,
        releaseDate: firebase.firestore.Timestamp.fromDate(new Date(movie.releaseDate)),
        releaseCountry: movie.releaseCountry,
        rating: movie.rating
      });
    },
    addToFavourites() {
      let movieObject = this.movie;
      if (_.findIndex(this.$store.getters.favourites, (f) => f.id === movieObject.id) !== -1) {
        return;
      }
      this.saveToDb(this.movie);
      this.$store.dispatch('addToFavourites', movieObject);
    },
  },
  computed: {
    movie() {
      return _.find(this.$store.getters.movies, (movie) => movie.id === this.$route.params.id);
    },
  },
  filters: {
    date: (value) => {
      const date = new Date(value);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`;
    },
  },
  beforeCreate() {
    if (_.isEmpty(this.$store.getters.movies)) {
      this.$store.dispatch('getMovies');
    }
  },
};
</script>

<style scoped>
* {
  padding-bottom: 0;
}
  #content{
    height: 100% !important;
  }
  .fontClass{
    font-family: 'Noto Sans KR', sans-serif;
  }
  #actions {
    bottom: 0;
  }
  .cardText {
    color: #1976d2 !important;
  }
  .a{
    padding-bottom: 20px;
    height: 100%;
  }
  .theme--light.v-card {
    background-color: #edf5e1 !important;
  }
</style>
