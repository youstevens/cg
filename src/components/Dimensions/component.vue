<template>
  <section>
    <div
      :class="{ showError : hasError }"
      class="search-result-not-found-wrapper hideError"
    >
      <div
        class="search-result-not-found"
      >
        {{ errorMessage }}
      </div>
    </div>

    <div
      :class="{ show : resultFound }"
      class="search-result-wrapper hide"
    >
      <div
        class="search-result"
      >
        <div class="search-result_overview">
          <h1>{{ year }} {{ make.name }} {{ model.name }} Car Dimensions</h1>
          <p>The dimensions shown below are the height, width and length of each variant for the {{ make.name }} {{ model.name }} {{ year }}. Accessories not included. The height, measured from the ground to the top of the car, ranges from {{ minHeight }}cm to {{ maxHeight }}cm depending on the variant. The width ranges from {{ minWidth }}cm to {{ maxWidth }}cm. The length ranges from {{ minLength }}cm to {{ maxLength }}cm.</p>
        </div>
        <div class="search-result_stats">
          <mq-layout mq="lg">
            <div class="search-result_heading">
              <div class="search-result_variant-label">Variant</div>
              <div class="search-result_HxWxL-label">HxWxL (cm)</div>
              <div class="search-result_kerbWeight-label">Kerb Weight (kg)</div>
            </div>
          </mq-layout>
          <ul>
            <dimension-component
              v-for="(dimension, index) in dimensions"
              :key="index"
              :dimension="dimension"
            />
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import './style';
</style>

<script>
import axios from 'axios'
import DimensionComponent from '../Dimension/component.vue'

export default {
  components: {
    'dimension-component': DimensionComponent
  },
  props: {
    'make': {
      type: Object,
      required: true
    },
    'model': {
      type: Object,
      required: true
    },
    'year': {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      resultFound: false,
      hasError: false,
      errorMessage: '',

      dimensions: [],
      dimension: {},
      minHeight: '',
      maxHeight: '',
      minWidth: '',
      maxWidth: '',
      minLength: '',
      maxLength: ''
    }
  },
  methods: {
    fetchDimensions () {
      const self = this
      const url = encodeURI('https://vehicles.staging.autotraderau.io/api/v1/dimensions?make=' + self.make.name + '&model=' + self.model.name + '&year=' + self.year + '&cleanse=true')

      axios.get(url)
        .then(response => {
          const result = response.data.data
          const maxs = result.maximums
          const mins = result.minimums

          self.dimensions = result.dimensions

          self.minHeight = mins.height
          self.minWidth = mins.width
          self.minLength = mins.length

          self.maxHeight = maxs.height
          self.maxWidth = maxs.width
          self.maxLength = maxs.length

          self.resultFound = true
        })
        .catch(function (error) {
          console.log(error)
          if (error.response.status === 400) {
            self.hasError = true
            self.errorMessage = `We were unable to find ${self.year} ${self.make.name} ${self.model.name} Car Dimensions. Please try a different make, mode and year`
          }
        })
    }
  }
}
</script>
