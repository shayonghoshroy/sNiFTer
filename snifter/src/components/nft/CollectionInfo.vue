<template>
  <div v-if="collection" class="collection-wrapper">
    <div class="collection-information">
      <va-list>
        <va-list-item>
          <va-list-item-section avatar>
            <img
              :src="collection.image_url"
              :height="imageHeight"
              :width="imageWidth"
            />
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
          <p>{{ cleanCollectionDescription }}</p>
        </va-list-item>

        <va-list-item
          v-for="(linkObject, index) in collectionLinks"
          :key="index"
        >
          <va-list-item-section>
            <a
              :href="linkObject[2]"
              target="_blank"
              rel="noopener noreferrer"
              >{{ linkObject[1].replaceAll("**", "") }}</a
            >
          </va-list-item-section>
        </va-list-item>

        <slot name="contractInfo"></slot>

        <va-accordion v-model="showTraits">
          <va-collapse header="Traits">
            <div v-if="collection && stats">
              <TraitTable
                :id="collection.slug"
                :totalSupply="stats.total_supply"
              />
            </div>
          </va-collapse>
        </va-accordion>

        <va-divider inset />

        <div v-if="stats" class="collection-stats">
          <va-list-item>
            <div class="va-table-responsive">
              <table class="va-table va-table--striped">
                <tbody>
                  <!-- General Sales Data -->
                  <tr>
                    <th class="table-row-header">Floor Price</th>
                    <td>{{ stats['floor_price'] }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Total Volume</th>
                    <td>{{ stats['total_volume'] }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Average Price</th>
                    <td>{{ stats['average_price'] }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Market Cap</th>
                    <td>{{ stats.market_cap }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Total Sales</th>
                    <td>{{ stats.total_sales }}</td>
                  </tr>
                  <!-- General Ownership Data -->
                  <tr>
                    <th class="table-row-header">Total Supply</th>
                    <td>{{ stats.total_supply }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Number of Owners</th>
                    <td>{{ stats['num_owners'] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </va-list-item>

          <!-- Time Related Sales Data -->
          <va-list-item>
            <va-collapse
              class="stat-collapse"
              v-model="showStats[0]"
              header="Thirty Day Stats"
            >
              <table class="va-table va-table--striped">
                <tbody>
                  <!-- General Sales Data -->
                  <tr>
                    <th class="table-row-header">Volume</th>
                    <td>{{ stats.thirty_day_volume }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Change</th>
                    <td
                    :style="stats.thirty_day_change < 0 ? 'color: red;' : 'color: green;'"
                    ><b>{{ stats.thirty_day_change }}</b></td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Sales</th>
                    <td>{{ stats.thirty_day_sales }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Average Price</th>
                    <td>{{ stats.thirty_day_average_price }}</td>
                  </tr>
                </tbody>
              </table>
            </va-collapse>
          </va-list-item>
          <va-list-item>
            <va-collapse
              class="stat-collapse"
              v-model="showStats[1]"
              header="Weekly Stats"
            >
              <table class="va-table va-table--striped">
                <tbody>
                  <!-- General Sales Data -->
                  <tr>
                    <th class="table-row-header">Volume</th>
                    <td>{{ stats.seven_day_volume }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Change</th>
                    <td
                    :style="stats.seven_day_change < 0 ? 'color: red;' : 'color: green;'"
                    >{{ stats.seven_day_change }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Sales</th>
                    <td>{{ stats.seven_day_sales }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Average Price</th>
                    <td>{{ stats.seven_day_average_price }}</td>
                  </tr>
                </tbody>
              </table>
            </va-collapse>
          </va-list-item>
          <va-list-item>
            <va-collapse
              class="stat-collapse"
              v-model="showStats[2]"
              header="Daily Stats"
            >
              <table class="va-table va-table--striped">
                <tbody>
                  <!-- General Sales Data -->
                  <tr>
                    <th class="table-row-header">Volume</th>
                    <td>{{ stats.one_day_volume }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Change</th>
                    <td
                    :style="stats.one_day_change < 0 ? 'color: red;' : 'color: green;'"
                    >{{ stats.one_day_change }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Sales</th>
                    <td>{{ stats.one_day_sales }}</td>
                  </tr>
                  <tr>
                    <th class="table-row-header">Average Price</th>
                    <td>{{ stats.one_day_average_price }}</td>
                  </tr>
                </tbody>
              </table>
            </va-collapse>
          </va-list-item>
        </div>
      </va-list>
    </div>
  </div>
</template>
<script>
import TraitTable from "../nft/TraitTable";
import { getCollectionStatsDirectly } from "../../services/nftScraperService";
export default {
  name: "CollectionInfo",
  components: {
    TraitTable,
  },
  props: {
    collection: {
      type: Object,
      required: true,
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
    cleanCollectionDescription() {
      const link = /\[(.*?)\]\((.*?)\)/gim;
      const linkNames = /\*\*(.*)\*\*/gim;
      return this.collection.description
        .replaceAll(link, "")
        .replaceAll(linkNames, "");
    },
    collectionLinks() {
      const link = /\[(.*?)\]\((.*?)\)/gim;
      var collectionDescription = this.collection.description;
      if (collectionDescription === null || collectionDescription === undefined)
        return [];
      return [...collectionDescription.matchAll(link)];
    },
    stats() {
      if(this.latestStats) {
        return this.latestStats;
      }
      return null;
    }
  },
  async created() {
    debugger;
    var stats = await getCollectionStatsDirectly(this.collection.slug);
    var latestStats = {};
    for(var [key, val] of Object.entries(stats['stats'])) {
      if(key === "floor_price" && !val) {
        val = "Not Supplied";
      } else {
        latestStats[key] = val.toFixed(3);
      }
    }
    this.latestStats = latestStats;
    this.statsLoaded = true;
    this.$emit('totalSupply', {'total_supply': parseInt(this.latestStats.total_supply)});
  },
  methods: {
  },
  data() {
    return {
      showStats: [false, false, false],
      showTraits: [false],
      latestStats: null,
    };
  },
};
</script>
<style lang="css" scoped>
.collection-wrapper {
  padding: 2em;
}
.collection-information {
  width: 100%;
}
.va-table-responsive {
  width: 100%;
}
.va-table {
  width: 100%;
}
.stat-collapse {
  width: 100%;
}
</style>
