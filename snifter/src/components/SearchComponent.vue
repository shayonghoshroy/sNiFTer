<template>
    <div class="searchComponent">
        <div class="search-wrapper">
            <va-button-dropdown
            :icon="searchTypes.at(searchIndex)[1]"
            :label="searchTypes.at(searchIndex)[0]">
                <va-list class="search-item-list">
                    <va-list-item class="search-item" v-for="(type, index) in searchTypes"
                    :key="index"
                    @click="searchIndex = index">
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
                <va-form class="search-input-form" v-if="searchIndex === 0">
                    <va-input
                        class="mb-4"
                        v-model="collectionSlug"
                        label="Collection Slug"
                        placeholder="Required"
                    />
                </va-form>
                <va-form class="search-input-form" v-else-if="searchIndex === 1">
                    <va-input
                        class="mb-4"
                        v-model="address"
                        label="Address"
                        placeholder="Required"
                    />
                    <va-input
                        class="mb-4"
                        v-model="tokenid"
                        :rules="[(v) => !isNaN(v)] || `Token ID must be a number`"
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

            <va-button 
            :disabled="disableSearch"
            @click="startSearch()">Search</va-button>
        </div>
    </div>
</template>

<script>
import { API } from "aws-amplify";
import { listNfts, listCollections } from "../graphql/queries";

export default {
    name: "SearchComponent",
    components: { },
    async created() {
        //this.getNFTs();
    },
    data() {
        return {
            tokenid: "",
            address: "",
            collectionSlug: "",
            nfts: [],
            collecitions: [],
            searchTypes: [["Collection", "collections"], ["Token", 'generating_tokens'], ["Owner", 'account_balance_wallet'], ["Creator", 'palette']],
            searchIndex: 0,
            requestCount: 0,
            disableSearch: false
        };
    },
    computed: {
        searchType() {
            return this.searchTypes[this.searchIndex][this.searchIndex];
        }
    },
    methods: {
        startSearch: async function() {
            this.disableSearch = true;
            if (this.searchIndex === 0) {
                console.log("Collection");
                await this.getCollection();
                if (this.collections.length === 0) {
                    var response = await this.fetchCollection();
                    if (response.ok) {
                        console.log("Success");
                        await this.getCollection();
                        
                        var event = {
                            'searchStatus': 'Failure',
                            'data': this.collections,
                            'searchType': 'collection'
                        }
                        if (this.collections.length > 0) {
                            event['searchStatus'] = 'Success';
                        }

                        this.$emit('getNFTs', event);
                    }
                }
                console.log(this.collections[0].stats);
            }

            // NFT or Contract Search
            else if (this.searchIndex === 1) {
                await this.getNFTs();
            }

            this.disableSearch = false;
        },
        getNFTs: async function() {
            this.requestCount += 1
            if (this.requestCount > 2) {
                this.requestCount = 0;
                return;
            }

            try {
                console.log("Starting Query");
                this.address = this.address.toLowerCase();
                debugger;
                if(this.tokenid=="") {
                    const nfts = await API.graphql({
                        query: listNfts,
                        variables: {
                        limit: 300,
                        filter: {address: {eq: this.address}}
                        },
                    });
                    this.nfts = nfts.data.listNfts.items;
                    this.$emit('getNFTs', this.nfts)
                }
                else{
                    const nfts = await API.graphql({
                        query: listNfts,
                        variables: {
                        limit: 300,
                        filter: {token_id: {eq: this.tokenid}, address: {eq: this.address}}
                        },
                    });
                    this.nfts = nfts.data.listNfts.items;
                    this.$emit('getNFTs', this.nfts)
                }

                var event = {};
                if(this.nfts.length === 0) {
                    debugger;
                    event = {
                        'searchStatus': "Fetching",
                        'nfts': []
                    }
                    debugger;
                    this.$emit('getNFTs', event);
                    var response = await this.fetchNFTs();
                    debugger;
                    if (response.status === 200)
                        await this.getNFTs();
                    else {
                        event = {
                            'searchStatus': 'Failed',
                            'nfts': []
                        }
                        this.requestCount = 0;
                        this.$emit('getNFTs', event);
                    }
                }

                else {
                    event = {
                        'searchStatus': 'Success',
                        'nfts': this.nfts
                    }
                    this.requestCount = 0;
                    this.$emit('getNFTs', event);
                }
            } 
            catch (e) {
                event = {
                            'searchStatus': 'Failed',
                            'nfts': []
                        }
                this.requestCount = 0;
                this.$emit('getNFTs', event);
                console.error(e);
            }
        },
        // Fetches NFT data from API
        fetchNFTs: async function() {
            var baseUrl = 'https://qjlxkgsn7g.execute-api.us-east-2.amazonaws.com/dev';

            // Token Search
            if (this.searchIndex === 1) {
                var endpoint = "/contract";
                
                var body = {'contract-addresses': [this.address]};
                if (this.tokenid !== '' && this.tokenid !== undefined) {
                    body['token-ids'] = [parseInt(this.tokenid)];
                }

                return await fetch(baseUrl + endpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                .then(response =>{
                    return response;
                })
                .then(data => data)
                .catch((error) => {
                    console.log('Error:', error.statusCode);
                });
            }
        },
        getCollection: async function() {
            this.requestCount += 1
            if (this.requestCount > 2) {
                this.requestCount = 0;
                return;
            }

            try {
                console.log("Starting Query");
                this.collectionSlug = this.collectionSlug.toLowerCase();
                debugger;
                const collection = await API.graphql({
                    query: listCollections,
                    variables: {
                        filter: {slug: {eq: this.collectionSlug}}
                    }
                });
                this.collections = collection.data.listCollections.items;
            } 
            catch (e) {
                console.error(e);
            }
        },
        fetchCollection: async function() {
            var baseUrl = 'https://qjlxkgsn7g.execute-api.us-east-2.amazonaws.com/dev';

            // Token Search
            if (this.searchIndex === 0) {
                var endpoint = "/collection";
                
                var body = {'collection-slug': this.collectionSlug};

                return await fetch(baseUrl + endpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                .then(response =>{
                    return response;
                })
                .then(data => data)
                .catch((error) => {
                    console.log('Error:', error.statusCode);
                });
            }
        }
    },
}
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
</style>