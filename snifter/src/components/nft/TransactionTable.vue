<template>
    <div v-if="transactions">
        <div v-for="">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'TransactionTable',
        props: {
            transactions: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>