<template>
    <div>
        <div class="row" style="width: 100%;">
            <va-input
            class="flex mb-2 md6"
            placeholder="Filter..."
            v-model="filter"
            >
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
                <va-pagination
                v-model="currentPage"
                input
                :pages="pages"
                />
            </template>
        </va-data-table>
    </div>
</template>

<script>
export default {
    name: 'TransactionTable',
    props: {
        nftEvents: {
            type: Array,
            require: true
        }
    },
    computed: {
        nftEventItems() {
            return this.nftEvents.map((nftEvent) => {
                return {
                    event: nftEvent.event_type === 'successful' ? 'Sale' : nftEvent.event_type.toUpperCase().replace('_', ' '),
                    price: nftEvent.total_price !== 0 ? nftEvent.total_price : nftEvent.bid_amount,
                    from: nftEvent.from_account? nftEvent.from_account : "-",
                    to: nftEvent.to_account? nftEvent.to_account : '-',
                    created_date: nftEvent.created_date? nftEvent.created_date: '-'
                };
            });
        },
        pages() {
            return (this.perPage && this.perPage !== 0 && this.filteredTransactions?.length > 0)
                ? Math.ceil(this.filteredTransactions.length / this.perPage)
                : this.filteredTransactions.length
        }
    },
    data() {
        return {
            filter: '',
            columns: [
                { key: 'event', sortable: true },
                { key: 'price', sortable: true },
                { key: 'from', sortable: true },
                { key: 'to', sortable: true },
                { key: 'created_date', sortable: true }
            ],
            perPage: 50,
            currentPage: 1,
            filteredTransactions: this.nftEventItems.slice(0, 50)
        }
    },
}
</script>

<style lang="css" scoped>

</style>