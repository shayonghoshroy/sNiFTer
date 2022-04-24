<template>
  <div>
    <div class="row">
      <va-input class="flex mb-2 md6" placeholder="Filter..." v-model="filter">
      </va-input>
    </div>

    <va-data-table
      :columns="columns"
      :items="nftEventItems"
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
  },
  computed: {
    nftEventItems() {
      // Format events for table
      var events = this.nftEvents;
      if (events.length === 0) return [];
      var items = events.map((nftEvent) => {
        // Convert created date from ISO string to formatted date string
        var createdDate = nftEvent.created_date;
        createdDate = new Date(createdDate).toGMTString();
        createdDate = createdDate.substring(0, createdDate.indexOf("GMT")).trim();

        return {
          event: nftEvent.event,
          price: nftEvent.price,
          from: nftEvent.from,
          to: nftEvent.to,
          created_date: createdDate
        };
      });
      // Sort by created date
      return items.sort((a, b) => (Date.parse(a.created_date) < Date.parse(b.created_date) ? 1: -1));
    },
    pages() {
      // Determine how many pages in table
      var pages =
        this.perPage &&
        this.perPage !== 0 &&
        this.filteredTransactions?.length > 0
          ? Math.ceil(this.filteredTransactions.length / this.perPage)
          : this.filteredTransactions.length;

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
