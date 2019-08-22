<template>
  <v-app id="app">
    <v-app-bar app class="bar">
      <v-toolbar-title class="headline text-uppercase">
        <span>MOVIE</span>
        <span class="font-weight-light">app</span>
      </v-toolbar-title>
      <v-row class="ml-12 mt-2 row" align="stretch" justify="start">
        <v-col cols="12" sm="4" lg="5" class="text-center nav">
          <router-link to="/">All movies</router-link>
        </v-col>
        <v-col cols="12" sm="4" lg="5" class="text-center nav">
          <router-link to="/about">Favourites</router-link>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
        <v-col cols="4" sm="4" lg="2">
            <v-text-field class="pt-4"
              v-model="searchParam"
              label="Type movie title">
            </v-text-field>
      </v-col>
      <v-col cols="4" sm="2" lg="2">
        <router-link :to="link()">
          <v-btn>Search</v-btn>
        </router-link>
      </v-col>
      <v-col cols="4" sm="4" lg="2">
        <router-link to="/yearSort">
        <v-btn>Movies sorted by year</v-btn>
        </router-link>
      </v-col>
      <v-col cols="4" sm="4" lg="2">
        <router-link to="/likesSort">
        <v-btn @click="sortValue='Likes'">Movies sorted by likes</v-btn>
        </router-link>
      </v-col>
      <v-btn icon @click="gridOn">
        <v-icon>grid_on</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view id="content"/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    searchParam: '',
  }),
  methods: {
    link() {
      return `/search/${this.searchParam}`;
    },
    gridOn() {
      this.$store.dispatch('gridOn');
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  height: 100%;
}
#content{
  height: 100%;
  margin-top: 60px;
  background-color: #8ee4af;;
}
a {
  display: block;
  height: 100%;
  text-decoration: none;
  color: black !important;
    :hover {
    font-weight: bolder;
  }
}
#app {
  height: 100%;
}
a:hover {
  font-weight: bolder;
}
a:active {
  font-weight: bolder;
}
.row {
  height: 100%;
}
.nav {
  height: 100%;
  color: black;
  background-color: #5cdb95;
}
.router-link-exact-active {
  font-weight: bolder;
  color: #05386b !important;

}
.bar {
  border-bottom: 3px solid #379683;
  background-color: #5cdb95;

}
</style>
