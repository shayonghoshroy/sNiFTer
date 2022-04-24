<template>
  <div>
    <div class="row" style="width: 100%">
      <va-input
        class="flex mb-2 md6 text-input"
        placeholder="Filter..."
        v-model="filter"
      >
      </va-input>
    </div>

    <va-data-table :columns="columns" :items="traitItems" :filter="filter">
    </va-data-table>
  </div>
</template>

<script>
import {
  listNftTraits
} from "../../graphql/queries";

import { API } from "aws-amplify";

export default {
  name: "TraitTable",
  props: {
    id: {
      type: String,
      require: true,
    },
    totalSupply: {
      type: String,
      require: true,
    },
  },
  created() {
    this.getTraits()
    .then(() => { return; });
  },
  computed: {
    traitItems() {
      debugger;
      var supply = this.totalSupply;
      if (supply === "0") supply = 10000;
      return this.traits.map((trait) => {
        return {
          type: trait.trait_type,
          value: trait.value,
          count: trait.trait_count,
          rarity: (trait.trait_count / supply).toFixed(3),
        };
      });
    },
  },
  methods: {
    async getTraits() {
      // Query for NFT Traits
      const nftTraits = await API.graphql({
        query: listNftTraits,
        variables: {
          limit: 1000000,
          filter: {
            id: { beginsWith: this.id }
          }
        }
      });
      this.traits = nftTraits.data.listNftTraits.items;
      //console.log(this.id, this.traits);
    }
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
      traits: []
    };
  },
};
</script>

<style lang="css" scoped>
.text-input {
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
