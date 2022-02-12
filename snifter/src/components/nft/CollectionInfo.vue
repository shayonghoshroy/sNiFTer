<template>
     <div v-if="collection">
        <div class="collection-information">
            <va-list>
                <va-list-item>
                    <va-list-item-section avatar>
                        <img :src="collection.image_url" :height="imageHeight" :width="imageWidth">
                    </va-list-item-section>

          <va-list-item-section>
            <va-list-item-label>
              {{ collection.name }}
            </va-list-item-label>

            <va-list-item-label caption>
              {{ collection.slug }}
            </va-list-item-label>
          </va-list-item-section>

          <va-list-item-section v-if="collection.external_url" icon>
            <div class="external-link">
              <a :href="collection.external_url" target="blank">
                <va-icon
                  class="external-link"
                  name="link"
                  color="#6f36bc"
                ></va-icon>
              </a>
            </div>
          </va-list-item-section>
        </va-list-item>

                <va-list-item>
                    <p>{{ collection.description }}</p>
                </va-list-item>

                <TraitTable 
                    v-if="collection.traits"
                    :traits="collection.traits"
                    :totalSupply="10000"
                  />
                
                <va-divider inset />

                <va-list-item>
                    <div class="va-table-responsive">
                        <table class="va-table va-table--striped">
                            <tbody>
                                <!-- General Sales Data -->
                                <tr>
                                    <th class="table-row-header">Floor Price</th>
                                    <td>{{ collection.stats.floor_price }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Total Volume</th>
                                    <td>{{ collection.stats.total_volume }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Average Price</th>
                                    <td>{{ collection.stats.average_price }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Market Cap</th>
                                    <td>{{ collection.stats.market_cap }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Total Sales</th>
                                    <td>{{ collection.stats.total_sales }}</td>
                                </tr>
                                <!-- General Ownership Data -->
                                <tr>
                                    <th class="table-row-header">Total Supply</th>
                                    <td>{{ collection.stats.total_supply }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Number of Owners</th>
                                    <td>{{ collection.stats.num_owners }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </va-list-item>

                <!-- Time Related Sales Data -->
                <va-list-item>
                    <va-collapse
                    v-model="showStats[0]"
                    header="Thirty Day Stats">
                        <table class="va-table va-table--striped">
                            <tbody>
                                <!-- General Sales Data -->
                                <tr>
                                    <th class="table-row-header">Volume</th>
                                    <td>{{ collection.stats.thirty_day_volume }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Change</th>
                                    <td>{{ collection.stats.thirty_day_change }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Sales</th>
                                    <td>{{ collection.stats.thirty_day_sales }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Average Price</th>
                                    <td>{{ collection.stats.thirty_day_average_price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </va-collapse>
                </va-list-item>
                <va-list-item>
                    <va-collapse
                    v-model="showStats[1]"
                    header="Weekly Stats">
                        <table class="va-table va-table--striped">
                            <tbody>
                                <!-- General Sales Data -->
                                <tr>
                                    <th class="table-row-header">Volume</th>
                                    <td>{{ collection.stats.seven_day_volume }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Change</th>
                                    <td>{{ collection.stats.seven_day_change }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Sales</th>
                                    <td>{{ collection.stats.seven_day_sales }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Average Price</th>
                                    <td>{{ collection.stats.seven_day_average_price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </va-collapse>
                </va-list-item>
                <va-list-item>
                    <va-collapse
                    v-model="showStats[2]"
                    header="Daily Stats">
                        <table class="va-table va-table--striped">
                            <tbody>
                                <!-- General Sales Data -->
                                <tr>
                                    <th class="table-row-header">Volume</th>
                                    <td>{{ collection.stats.one_day_volume }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Change</th>
                                    <td>{{ collection.stats.one_day_change }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Sales</th>
                                    <td>{{ collection.stats.one_day_sales }}</td>
                                </tr>
                                <tr>
                                    <th class="table-row-header">Average Price</th>
                                    <td>{{ collection.stats.one_day_average_price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </va-collapse>
                </va-list-item>
            </va-list>
        </div>
    </div>
</template>
<script>
import TraitTable from "../nft/TraitTable";

export default {
    name: "CollectionInfo",
    components: {
        TraitTable
    },
    props: {
        collection: {
            type: Object,
            required: true
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
    methods: {
        created() {
            console.log(this.collection.stats);
        }
    },
    data() {
        return {
            showStats: [false, false, false]
        }
    }
}
</script>
<style lang="css" scoped>
</style>
