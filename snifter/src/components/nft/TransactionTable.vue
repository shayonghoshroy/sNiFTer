<template>
  <div>
    <div class="row">
      <va-input class="flex mb-2 md6" placeholder="Filter..." v-model="filter">
      </va-input>
    </div>

    <va-data-table
      :columns="columns"
      :items="nftEvents"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="filteredTransactions = $event.items"
    >
      <template #bodyAppend>
        <tr style="width: 100%">
          <td colspan="5" class="table-example--pagination">
            <va-pagination
              style="width: 100%"
              v-model="currentPage"
              input
              :pages="pages"
            />
          </td>
        </tr>
      </template>
    </va-data-table>
  </div>
</template>

<script>
export default {
  name: "TransactionTable",
  props: {
    nftEvents: {
      type: Array,
      require: true,
    },
  },
  async created() {
    this.filteredTransactions = this.nftEventItems;
    console.log(this.filteredTransactions);
  },
  computed: {
    nftEventItems() {
      console.log("Transactions", this.nftEvents);
      var events = this.nftEvents;
      if (events.length === 0) return [];
      var items = events.map((nftEvent) => {
        console.log(nftEvent.event);
        return {
          event: nftEvent.event,
          price: nftEvent.price,
          from: nftEvent.from_account ? nftEvent.from_account['address'] : "-",
          to: nftEvent.to_account ? nftEvent.to_account['address'] : "-",
          created_date: nftEvent.created_date ? nftEvent.created_date : "-",
        };
      });
      return items;
    },
    pages() {
      var pages =
        this.perPage &&
        this.perPage !== 0 &&
        this.filteredTransactions?.length > 0
          ? Math.ceil(this.filteredTransactions.length / this.perPage)
          : this.filteredTransactions.length;
      console.log("PAGES", pages, this.filteredTransactions.length);
      return pages;
    },
  },
  data() {
    return {
      filter: "",
      columns: [
        { key: "event", sortable: true },
        { key: "price", sortable: true },
        { key: "from", sortable: true },
        { key: "to", sortable: true },
        { key: "created_date", sortable: true },
      ],
      perPage: 20,
      currentPage: 1,
      filteredTransactions: [],
    };
  },
};
</script>
<style lang="css" scoped></style>
