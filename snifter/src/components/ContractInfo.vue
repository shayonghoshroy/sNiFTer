<template>
    <div v-if="contracts">
        <va-list v-for="(contract, index) in contracts"
            :key="index">
            <div class="contract-information">
                <va-list-item>
                    <va-list-item-section avatar>
                        <img :src="contract.image_url" :height="imageHeight" :width="imageWidth">
                    </va-list-item-section>

                    <va-list-item-section>
                        <va-list-item-label>
                            {{ contract.name }}
                        </va-list-item-label>

                        <va-list-item-label caption>
                            {{ contract.symbol }}
                        </va-list-item-label>
                    </va-list-item-section>

                    <va-list-item-section icon>
                        <div class="external-link">
                            <a :href="contract.external_link" target="blank">
                                <va-icon class="external-link"
                                    name="link"
                                    color="#6f36bc"
                                ></va-icon>
                            </a>
                        </div>
                    </va-list-item-section>
                </va-list-item>

                <va-list-item>
                    <p>{{ cleanContractDescription }}</p>
                </va-list-item>

                <va-list-item v-for="(linkObject, index) in contractLinks" :key="index">
                    <va-list-item-section>
                        <a :href="linkObject[2]" target="_blank" rel="noopener noreferrer">{{ linkObject[1].replaceAll('**', '') }}</a>
                    </va-list-item-section>
                </va-list-item>

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
                                    <td>{{ contract.created_date || 'Unknown' }}</td>
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
            default: null
        },
        imageHeight: {
            type: Number,
            default: 200
        },
        imageWidth: {
            type: Number,
            default: 200
        }
    },
    computed: {
        contractStats() {
            console.log(this.contract[0]);
            return this.contract[0];
        },
        cleanContractDescription() {
            const link = /\[(.*?)\]\((.*?)\)/gim;
            const linkNames = /\*\*(.*)\*\*/gim;

            return this.contracts[0].description.replaceAll(link, '').replaceAll(linkNames, '');
        },
        contractLinks() {
            const link = /\[(.*?)\]\((.*?)\)/gim;
            
            var contractDescription = this.contracts[0].description;
            if (contractDescription === null || contractDescription === undefined)
                return [];
            
            return [...contractDescription.matchAll(link)];
        }
    }
}
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