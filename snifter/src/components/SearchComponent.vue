<template>
  <div class="searchComponent">
    <div class="search-wrapper">
      <va-button-dropdown
        :icon="searchTypes.at(searchIndex)[1]"
        :label="searchTypes.at(searchIndex)[0]"
      >
        <va-list class="search-item-list">
          <va-list-item
            class="search-item"
            v-for="(type, index) in searchTypes"
            :key="index"
            @click="searchIndex = index"
          >
            <va-list-item-section avatar>
              <va-icon :name="type[1]"></va-icon>
            </va-list-item-section>
            <va-list-item-section>
              <va-list-item-label>{{ type[0] }}</va-list-item-label>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </va-button-dropdown>
      <div>
        <va-form class="search-input-form" v-if="searchIndex === 1">
          <va-input
            class="mb-4"
            v-model="address"
            label="Address"
            placeholder="Required"
          />
          <va-input
            class="mb-4"
            v-model="tokenid"
            label="Token ID"
            placeholder="Optional"
          />
        </va-form>

        <va-form class="search-input-form" v-else>
          <va-input
            class="mb-4"
            v-model="address"
            label="Address"
            placeholder="Required"
          />
        </va-form>
      </div>

      <va-button @click="getNFTs()">Search</va-button>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listNfts } from "../graphql/queries";

export default {
  name: "SearchComponent",
  components: {},
  async created() {
    //this.getNFTs();
  },
  data() {
    return {
      tokenid: "",
      address: "",
      nfts: [],
      searchTypes: [
        ["Collection", "collections"],
        ["Token", "generating_tokens"],
        ["Owner", "account_balance_wallet"],
        ["Creator", "palette"],
      ],
      searchIndex: 0,
    };
  },
  methods: {
    getNFTs: async function () {
      try {
        if (this.tokenid == "") {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 300,
              filter: { address: { eq: this.address } },
            },
          });
          this.nfts = nfts.data.listNfts.items;
          this.$emit("getNFTs", this.nfts);
        } else {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 300,
              filter: {
                token_id: { eq: this.tokenid },
                address: { eq: this.address },
              },
            },
          });
          this.nfts = nfts.data.listNfts.items;
          this.$emit("getNFTs", this.nfts);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
}

.search-item-list {
  padding: 1em;
}

.search-item:hover {
  cursor: pointer;
  background-color: #6f36bc;
  transition: ease-in 0.1s;
}

.search-input-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-alert {
  color: white;
}

.va-input-wrapper {
  margin-bottom: 0 !important;
}

.va-alert__content {
  display: flex;
  flex-direction: row;
}

.post {
  background: #fff;
  padding: 1.5em;
}
.post h2 {
  font-size: 1.3em;
  padding-bottom: 0.25rem;
}
.post p {
  color: #888;
}
.container {
  justify-items: stretch;
  width: 83.5%;
}
.rounded-card {
  border-radius: 5px;
}
.is-purple {
  color: #6f36bc;
}
.is-white {
  color: #ffffff;
}
</style>
