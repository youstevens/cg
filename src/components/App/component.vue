<template>
  <div class="container">
    <div class="header-block">
      <a
        href="http://www.google.com"
        class="header-block_link"
      >
        <img
          src="/assets/images/logo.png"
          class="header-block_logo"
        >
      </a>
    </div><!-- end of header-block -->

    <div class="body-block">
      <div class="introduction">
        <h1>Car Dimensions</h1>
        <p>Ever wanted to know the dimensions of a car? It's useful to determine if a car will fit into your garage, for parking and car park restrictions and to know if there is space in the car for all your daily needs. We have provided the dimensions for a wide range of makes and models by year for you to easily and quickly view all you need to know.</p>
      </div>

      <form class="search-dimensions">
        <h2>Search Dimensions</h2>
        <div class="search-dimensions_fields">
          <div class="search-dimensions_selects search-dimensions_field">
            <select
              v-model="make"
              class="search-dimensions_selectfield"
              @change="fetchModels()"
            >
              <option
                v-for="make in makes"
                :key="make.id"
                :value="make"
              >
                {{ make.name }}
              </option>
            </select>
            <select
              v-model="model"
              :disabled="!enableModelSelection"
              :class="{ opacity : !enableModelSelection }"
              class="search-dimensions_model search-dimensions_selectfield"
              @change="fetchYears()"
            >
              <option
                v-for="model in models"
                :key="model.id"
                :value="model"
              >
                {{ model.name }}
              </option>
            </select>
            <select
              v-model="year"
              :disabled="!enableYearSelection"
              :class="{ opacity : !enableYearSelection }"
              class="search-dimensions_selectfield"
              @change="submit"
            >
              <option
                v-for="year in years"
                :key="year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
          <button
            :disabled="!enableSubmit"
            :class="{ opacity : !enableSubmit }"
            class="search-dimensions_field submit"
            @click.prevent="click($event)"
          >
            Show Dimensions
          </button>
        </div>
      </form>

      <dimensions-component
        ref="dimensionsComponent"
        :make="make"
        :model="model"
        :year="parseInt(year)"
      />
    </div><!-- end of body-block -->

  </div>
</template>

<style lang="scss">
@import './style';
</style>

<script>
import axios from 'axios'
import DimensionsComponent from '../Dimensions/component.vue'

export default {
  components: {
    'dimensions-component': DimensionsComponent
  },
  data () {
    return {
      makes: [{'id': 0, 'name': 'Select Make*'}],
      make: {},
      models: [],
      model: {},
      years: [],
      year: '',

      enableModelSelection: false,
      enableYearSelection: false,
      enableSubmit: false
    }
  },
  created () {
    this.fetchMakes()
  },
  methods: {
    fetchMakes () {
      const self = this
      axios.get('https://vehicles.staging.autotraderau.io/api/v1/vehicles/makes?type=1')
        .then(response => {
          response.data.data.map((obj) => {
            self.makes.push(obj)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchModels () {
      const self = this
      self.reset()

      self.enableModelSelection = false
      self.enableYearSelection = false
      self.enableSubmit = false

      axios.get('https://vehicles.staging.autotraderau.io/api/v1/vehicles/makes/' + self.make.id + '/models')
        .then(response => {
          self.years = []
          self.models = response.data.data
          self.enableModelSelection = true
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchYears () {
      const self = this
      self.reset()
      self.years = []

      axios.get('https://vehicles.staging.autotraderau.io/api/v1/vehicles/makes/' + self.make.id + '/models/' + self.model.id + '/years')
        .then(response => {
          self.years = response.data.data
          self.enableYearSelection = true
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submit () {
      this.reset()
      this.enableSubmit = true
    },
    reset () {
      this.$refs.dimensionsComponent.resultFound = false
      this.$refs.dimensionsComponent.hasError = false
    },
    click () {
      this.$refs.dimensionsComponent.fetchDimensions()
    }
  }
}
</script>
