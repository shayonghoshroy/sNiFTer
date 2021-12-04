<template>
    <div class="searchComponent">
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
        <va-button @click="getNFTs(address,tokenid)">Search</va-button>
    </div>
    <div>
        <simple-grid-container class="container" columnWidth="300px">
            <div class="post" v-for="nft in nfts" :key="nft.id">
                <div class="row div">
                <div class="flex md6 lg4">
                    <router-link
                    :to="{ name: 'Nft', 
                        query: nft
                    }">
                        <va-card style="height: 300px; width: 250px">
                        <va-image
                            class="rounded-card"
                            :src="nft.image_url"
                            style="height: 200px"
                        />
                        <va-card-title>{{ nft.name }}</va-card-title>
                        <va-card-content
                            >{{ nft.name }} {{ nft.token_id }}
                        </va-card-content>
                        </va-card>
                    </router-link>
                </div>
                </div>
            </div>
        </simple-grid-container>
    </div>
</template>

<script>
import { API } from "aws-amplify";
import { listNfts } from "../graphql/queries";
export default {
    name: "SearchComponent",
    async created() {
        //this.getNFTs();
    },
    data() {
        return {
            tokenid: "",
            address: "",
            nfts: [],
        };
    },
    methods: {
        async getNFTs(address, tokenid) {
            try {
                console.log(tokenid);
                if(tokenid=="") {
                    console.log("no id")
                    const nfts = await API.graphql({
                        query: listNfts,
                        variables: {
                        limit: 300,
                        filter: {address: {eq: address}}
                        },
                    });
                    this.nfts = nfts.data.listNfts.items;
                }
                else{
                    console.log("yes ids");
                    const nfts = await API.graphql({
                        query: listNfts,
                        variables: {
                        limit: 300,
                        filter: {token_id: {eq: tokenid}, address: {eq: address}}
                        },
                    });
                    this.nfts = nfts.data.listNfts.items;
                }
            } catch (e) {
            console.error(e);
      }
    },
  },
}
</script>

<style scoped>
    .searchComponent {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1em;
        padding: 5px;
    }
    .va-input-wrapper {
        margin-bottom: 0 !important;
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
</style>