<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="../assets/logo.png"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Configuración
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="save">
        <div class="rounded-md">
          <div class="my-4">
            <label>País</label>
            <div class="grid grid-cols-4 gap-4 mt-4">
              <!-- Active: "ring-2 ring-indigo-500" -->
              <label
                v-for="pais in countries"
                :key="pais.id"
                class="
                  group
                  relative
                  border
                  rounded-md
                  py-3
                  px-4
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-medium
                  uppercase
                  hover:bg-gray-50
                  focus:outline-none
                  sm:flex-1
                  bg-white
                  shadow-sm
                  text-gray-900
                  cursor-pointer
                "
                :class="[country == pais.slug ? 'ring-2 ring-mc' : '']"
              >
                <input
                  type="radio"
                  name="size-choice"
                  v-model="country"
                  :value="pais.slug"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <p id="size-choice-0-label">{{ pais.slug }}</p>

                <!--
                          Active: "border", Not Active: "border-2"
                          Checked: "border-indigo-500", Not Checked: "border-transparent"
                        -->
                <div
                  class="absolute -inset-px rounded-md pointer-events-none"
                  :class="[country == pais.slug ? 'border border-mc' : '']"
                  aria-hidden="true"
                ></div>
              </label>
            </div>
          </div>
          <div>
            <label for="location">Número de Locación</label>
            <input
              id="location"
              name="location"
              type="text"
              required
              v-model="location"
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                focus:outline-none
                focus:ring-mc
                focus:border-mc
                focus:z-10
                sm:text-sm
                text-center
                mt-4
              "
              placeholder="GT03"
            />
          </div>
        </div>
        <div v-if="error">
          <p class="font-bold text-red-400">{{ error }}</p>
        </div>
        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-black
              bg-mc
              hover:bg-yellow-500
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
            "
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      country: null,
      location: null,
    };
  },
  props: {
    error: Error,
    countries: Array,
  },
  methods: {
    save() {
      const data = { country: this.country, location: this.location };
      this.$emit("save-configuration", data);
    },
  },
};
</script>

<style>
</style>