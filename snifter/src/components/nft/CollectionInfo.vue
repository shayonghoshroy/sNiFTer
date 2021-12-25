<template>
     <div v-if="collection">
        <div class="collection-information">
            <va-list>
                <va-list-item>
                    <va-list-item-section avatar>
                        <img :src="collection.image_url">
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
                                <va-icon class="external-link"
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
            </va-list>
        </div>
    </div>
</template>
<script>
export default {
    name: "CollectionInfo",
    props: {
        collection: {
            type: Object,
            required: true
        }
    }

}
</script>
<style lang="css" scoped>
    
</style>