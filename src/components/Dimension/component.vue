<template>
  <li
    :class="$mq"
    class="search-result_item"
  >

    <mq-layout
      mq="lg"
      class="item"
    >
      <span class="variant">{{ dimension.variant }}</span>
      <span class="HxWxL">{{ dimension.height }}x{{ dimension.width }}x{{ dimension.length }}</span>
      <span class="kerbWeight">{{ dimension.kerb_weight }}</span>
    </mq-layout>

    <mq-layout mq="sm">
      <div class="sm variant-row">
        <span class="sm_label">Variant</span>
        <span class="variant">{{ dimension.variant }}</span>
      </div>
      <div class="sm hxwxl-row">
        <span class="sm_label">HxWxL (cm)</span>
        <span class="HxWxL">{{ dimension.height }}x{{ dimension.width }}x{{ dimension.length }}</span>
      </div>
      <div class="sm kerb-row">
        <span class="sm_label">Kerb Weight (kg)</span>
        <span class="kerbWeight">{{ dimension.kerb_weight }}</span>
      </div>
    </mq-layout>

  </li>
</template>

<style lang="scss">
  .search-result_item {
    list-style: none;

    div.item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    span {
      width: 30%;

      &.variant {
        color: #c90918;
        width: 40%;
      }
    }

    .sm {
      display: flex;
      flex-flow: row nowrap;

      &_label {
        background-color: #000;
        color: #fff;
      }

      span {
        width: 50%;
        padding: 1rem;
      }
    }
  }
</style>

<script>
export default {
  props: {
    'dimension': {
      type: Object,
      required: true
    }
  }
}
</script>
