<template>
  <div v-if="contracts">
    <va-list v-for="(contract, index) in contracts" :key="index">
      <div class="contract-information">

        <va-divider inset />

        <va-list-item>
          <div class="va-table-responsive">
            <table class="va-table va-table--striped">
              <tbody>
                <tr>
                  <th class="table-row-header">Address</th>
                  <td>{{ contract.address }}</td>
                </tr>
                <tr>
                  <th class="table-row-header">Payout Address</th>
                  <td>{{ contract.payout_address }}</td>
                </tr>
                <tr>
                  <th class="table-row-header">Contract Type</th>
                  <td>{{ contract.asset_contract_type }}</td>
                </tr>
                <tr>
                  <th class="table-row-header">Created Date</th>
                  <td>{{ contract.created_date || "Unknown" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </va-list-item>
      </div>
    </va-list>
  </div>
</template>

<script>
export default {
  name: "ContractInfo",
  props: {
    contracts: {
      type: Array,
      default: null,
    },
    imageHeight: {
      type: Number,
      default: 200,
    },
    imageWidth: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    contractStats() {
      console.log(this.contract[0]);
      return this.contract[0];
    },
    cleanContractDescription() {
      const link = /\[(.*?)\]\((.*?)\)/gim;
      const linkNames = /\*\*(.*)\*\*/gim;
      return this.contracts[0].description
        .replaceAll(link, "")
        .replaceAll(linkNames, "");
    },
    contractLinks() {
      const link = /\[(.*?)\]\((.*?)\)/gim;
      var contractDescription = this.contracts[0].description;
      if (contractDescription === null || contractDescription === undefined)
        return [];
      return [...contractDescription.matchAll(link)];
    },
  },
};
</script>

<style lang="css" scoped>
.va-table-responsive {
  width: 100%;
}
.va-table {
  width: 100%;
}
.external-link:hover {
  cursor: pointer;
}
.table-row-header {
  border: none;
}
.contract-information {
  word-wrap: normal;
  overflow: wrap;
}
</style>
