<template>
    <div>
        <va-card>
            <va-card-title>
                {{ sender }}
                <div v-if="this.user === this.sender && !this.isEditable && !isStatic" class="user-control">
                    <va-button-group>
                        <va-button @click="this.isEditable = true;" icon="edit"/>
                        <va-button @click="$emit('commentDeleted', { id })" icon="delete" />
                    </va-button-group>
                </div>
            </va-card-title>
            <va-card-content>
                <div class="comment-content">
                    <div v-if="!isEditable" class="rating">
                        <div class="rating-stars" v-for="n in parseInt(10)" :key="n">
                            <va-icon
                            :name="n <= latestRating ? 'star' : 'star_border'"
                            />
                        </div>
                    </div>
                    <div v-else class="rating">
                        <div class="rating-stars" v-for="n in parseInt(10)" :key="n">
                            <va-icon
                            v-if="!isEditable"
                            :name="n <= latestRating ? 'star' : 'star_border'"
                            />
                            <va-icon
                            v-else
                            :name="n <= latestRating ? 'star' : 'star_border'"
                            @click="latestRating = n"
                            />
                        </div>
                    </div>
                    <div class="message">
                        <p v-if="!isEditable" style="text-align: left;">{{ sanitizedMessage }}</p>
                        <div v-else>
                            <va-input
                            class="mb-4"
                            v-model="latestMessage"
                            :rules="[(v) => v.length <= 250 || `Comments must be 250 characters or less`]"
                            type="textarea"
                            style="width: 100%;"
                            />
                            <p style="text-align: left;">{{ latestMessage.length }} / 250</p>
                        </div>
                    </div>
                    <div class="comment-stub">
                        <div>
                            <va-icon
                            class="favorite-icon"
                            name="favorite_border"
                            />
                            {{ likes }}
                        </div>
                    </div>
                </div>
            </va-card-content>
            <va-card-actions v-if="isEditable" align="right">
                <va-button 
                style="text-align: right;"
                @click="latestMessage = message; isEditable = false;"
                >
                    Cancel
                </va-button>
                <va-button 
                style="text-align: right;"
                :disabled="disableCommentSubmit"
                @click="$emit('commentUpdated', { 'id': id, 'message': latestMessage, 'nft_rating': latestRating }); this.isEditable = false;"
                >
                    Update Review
                </va-button>
            </va-card-actions>
        </va-card>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        props: {
            id: {
                type: Number,
                required: true, 
            },
            sender: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            collection: {
                type: String,
                required: true,
            },
            nft_id: {
                type: String,
                required: true,
            },
            nft_rating: {
                type: Number,
                required: true,
            },
            likes: {
                type: Number,
                default: 0,
            },
            user: {
                type: String,
                default: ''
            },
            isStatic: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.latestMessage = this.message;
            this.latestRating = this.nft_rating;
        },
        data() {
            return {
                isEditable: false,
                latestMessage: "",
                latestRating: 0
            }
        },
        computed: {
            sanitizedMessage() {
                var message = this.message;
                var sanitizedMessage = "";
                if(message.length > 50) {
                    while(message.length > 0) {
                        sanitizedMessage += message.substring(0, 50) + "\n";
                        message = message.substring(50);
                    }
                }
                else sanitizedMessage = message;

                return sanitizedMessage.trim();
            },
            disableCommentSubmit() {
                return this.latestMessage.length > 250;
            }
        },
    }
</script>

<style lang="css" scoped>

.user-control {
    position: absolute;
    right: 0;
    top: 0;
    padding: var(--va-card-padding);
}

.comment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
}

.rating {
    display: flex;
    justify-content: center;
}

.favorite-icon:hover {
    cursor: pointer;
}

.message {
    width: 100%;
}

</style>
