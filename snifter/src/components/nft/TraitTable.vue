<template>
  <div>
    <div class="row" style="width: 100%">
      <va-input class="flex mb-2 md6" placeholder="Filter..." v-model="filter">
      </va-input>
    </div>

    <va-data-table :columns="columns" :items="traitItems" :filter="filter">
    </va-data-table>
  </div>
</template>

<script>
export default {
  name: "TraitTable",
  props: {
    traits: {
      type: Array,
      require: true,
    },
    totalSupply: {
      type: Number,
      require: true,
    },
  },
  computed: {
    traitItems() {
      var supply = this.totalSupply;
      if (supply === "0")
        supply = 10000;
      return this.traits.map((trait) => {
        return {
          type: trait.trait_type,
          value: trait.value,
          count: trait.trait_count,
          rarity: trait.trait_count / supply,
        };
      });
    },
  },
  data() {
    return {
      filter: "",
      columns: [
        { key: "type", sortable: true },
        { key: "value", sortable: true },
        { key: "count", sortable: true },
        { key: "rarity", sortable: true },
      ],
    };
  },
};
</script>

<style lang="css" scoped></style>
