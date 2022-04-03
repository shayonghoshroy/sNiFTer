<template>
    <div>
        <va-list fit>
            <va-list-item
            v-for="(entity, index) in entityList"
            :key="index"
            class="entity-item">
                <va-list-item-section avatar>
                    <va-avatar>
                        <img :src="entity.image_url">
                    </va-avatar>
                </va-list-item-section>

                <va-list-item-section>
                    <va-list-item-label>
                        {{ entity.type }}
                    </va-list-item-label>
                    <va-list-item-label>
                        {{ entity.name }}
                    </va-list-item-label>
                </va-list-item-section>
            </va-list-item>
        </va-list>
    </div>
</template>

<script>
export default {
    name: 'EntityCardList',
    props: {
        entities: {
            type: Array,
            required: true,
        }
    },
    computed: {
        entityList() {
            return this.entities;
        }
    },
}
</script>

<style lang="css" scoped>
.entity-item:hover {
    background-color: gray;
    color: white;
}
</style>