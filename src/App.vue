<template>
  <div id="app">
    <div v-if="showLoading">
      <loading />
    </div>
    <div v-else>
      <div v-if="showConfiguration">
        <configuration
          :countries="listCountries"
          :error="messageError"
          @save-configuration="saveConfiguration"
        />
      </div>
      <div v-else>
        <home
          :restaurant="infoRestaurant"
          :error="messageError"
          :images="images"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "./components/Loading";
import Configuration from "./components/Configuration";
import Home from "./components/Home";
export default {
  name: "App",
  components: {
    Loading,
    Configuration,
    Home,
  },
  data() {
    return {
      showLoading: true,
      showConfiguration: true,
      infoRestaurant: null,
      listCountries: [],
      images: [],
      messageError: null,
    };
  },
  async mounted() {
    const _that = this;
    const info = this.readConfig();
    if (info) {
      this.infoRestaurant = info;
      this.loadContent(info);
      setTimeout(() => {
        _that.showLoading = false;
        _that.showConfiguration = false;
      }, 2000);
    } else {
      try {
        const { data } = await axios.get(
          "https://crewroom.mcdgente.com/api/countries"
        );
        this.listCountries = data.data;
        this.showConfiguration = true;
        this.showLoading = false;
      } catch (error) {
        this.showLoading = false;
        this.messageError = error;
      }
    }
  },
  methods: {
    readConfig: function () {
      const resultConfig = window.electron.readConfig();
      const currentLocation = JSON.parse(resultConfig);
      return currentLocation;
    },
    saveConfiguration(data) {
      const _that = this;
      this.showLoading = true;
      const result = window.electron.saveConfig(data);
      if (result.status) {
        const info = this.readConfig();
        this.infoRestaurant = info;
        this.loadContent(info);
        setTimeout(() => {
          _that.showLoading = false;
          _that.showConfiguration = false;
        }, 2000);
      } else {
        this.showLoading = false;
        this.messageError = result.data;
      }
    },
    async loadContent(info) {
      try {
        const { data } = await axios.get(
          `https://crewroom.mcdgente.com/api/images/${info.country}`
        );
        console.log(data);
        this.images = data.data;
      } catch (error) {
        this.showLoading = false;
        this.messageError = error;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
