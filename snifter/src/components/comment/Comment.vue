<template>
    <div>
        <va-card>
            <va-card-title>
                {{ sender }}
                <div v-if="this.user === this.sender" class="user-control">
                    <va-button-group>
                        <va-button icon="edit"/>
                        <va-button icon="delete" />
                    </va-button-group>
                </div>
            </va-card-title>
            <va-card-content>
                <div class="comment-content">
                    <div class="rating">
                        <div class="rating-stars" v-for="n in parseInt(10)" :key="n">
                            <va-icon
                            v-if="n <= nft_rating"
                            name="star"
                            />
                            <va-icon 
                            v-else
                            name="star_border"
                            />
                        </div>
                    </div>
                    <div class="message">
                        <p style="text-align: left;">{{ sanitizedMessage }}</p>
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

</style>
