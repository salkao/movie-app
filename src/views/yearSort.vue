<template>
  <v-container fluid>
      <v-layout v-if="!grid" align-center justify-space-between column fill-height>
        <v-flex id="row"
          xs12
          v-for="(movie, index) in movies"
          :key="movie.title">
          <v-hover v-slot:default="{ hover }">
            <v-card class="card"
              @click="viewMoveDetails(movie, index)"
              :elevation="hover ? 24 : 1">
              <v-img
                :src="movie.cover"
                class="white--text"
                height="200px"
                width="850px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-card-title
                  class="fill-height align-end"
                  v-text="movie.title">
                </v-card-title>
              </v-img>
            <v-card-actions>
              <h5 class="pa-1 text-center">Rating: {{ movie.rating }}</h5>
            </v-card-actions>
          </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
      <v-layout v-else="" row>
        <v-flex id="row"
          s4 class="lg5-custom"
          v-for="(movie, index) in movies"
          :key="movie.title"
          >
          <v-hover
            v-slot:default="{ hover }">
          <v-card
            class="card"
            @click="viewMoveDetails(movie, index)"
            :elevation="hover ? 24 : 1">
            <v-img
              :src="movie.cover"
              class="white--text"
              height="380px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
              <v-card-title
                class="fill-height align-end"
                v-text="movie.title">
              </v-card-title>
            </v-img>
            <v-card-actions>
              <div class="text-center">
                <h5 class="pa-1">Rating: {{ movie.rating }}</h5>
              </div>
            </v-card-actions>
          </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { isEmpty } from 'lodash';
import { orderBy } from 'lodash';

export default {
  methods: {
    viewMoveDetails(movie) {
      this.$router.push(`/movies/${movie.id}`);
    },
  },
  created() {
    if (_.isEmpty(this.$store.getters.movies)) {
      this.$store.dispatch('getMovies');
    }
  },
  computed: {
    movies() {
        this.$store.dispatch('sortByReleaseYear');
      return this.$store.getters.movies;
    },
    grid() {
      return this.$store.getters.grid;
    },
  },
};
</script>

<style lang="scss" scoped>
#row {
  margin: 6.9px;
}
@media (min-width: 1264px) and (max-width: 1903px) {
    .flex.lg5-custom {
        width: 19%;
        max-width: 19%;
        flex-basis: 19%;
    }
}
.card:hover {
  opacity: 0.8;
}
</style>
