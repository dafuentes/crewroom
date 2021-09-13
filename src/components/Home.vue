<template>
  <div
    v-if="customError"
    class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    {{ customError }}
  </div>
  <div v-else>
    <div style="width: 1920px; height: 1080px; overflow: hidden">
      <splide :slides="slides" :options="primaryOptions">
        <splide-slide v-for="slide in slides" :key="slide.id">
          <img loading="lazy" width="1920" height="1080" :src="slide.image" />
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    error: Error,
    images: Array,
    restaurant: Object,
  },
  mounted() {
    this.slides = this.images;
    this.customError = this.error;
  },
  data() {
    return {
      slides: [],
      customError: null,
      polling: null,
      primaryOptions: {
        type: "fade",
        interval: 20000,
        rewind: true,
        autoplay: true,
        width: 1920,
        height: 1080,
        pagination: false,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    };
  },
  methods: {
    pollData() {
      const _that = this;
      this.polling = setInterval(() => {
        _that.loadContent(_that.restaurant);
      }, 600000);
    },
    async loadContent(info) {
      try {
        const { data } = await axios.get(
          `https://crewroom.mcdgente.com/api/images/${info.country}`
        );
        console.log(data);
        this.slides = [...data.data];
      } catch (error) {
        this.customError = error;
      }
    },
  },
  created() {
    this.pollData();
  },
};
</script>

<style>
</style>