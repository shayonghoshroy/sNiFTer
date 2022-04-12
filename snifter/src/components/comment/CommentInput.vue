<template>
    <div>
        <va-input 
        class="mb-4"
        v-model="newComment"
        :rules="[(v) => v.length <= 250 || `Comments must be 250 characters or less`]"
        ref="input"
        type="textarea"
        maxlength="250"
        autosize
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newComment: value
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>