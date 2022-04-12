<template>
    <div>
        <div>
            <va-card>
                <va-card-title>
                    Thread
                </va-card-title>
                <va-card-content>
                    <va-input 
                    class="mb-4"
                    v-model="newComment"
                    :rules="[(v) => v.length <= 250 || `Comments must be 250 characters or less`]"
                    ref="input"
                    type="textarea"
                    maxlength="250"
                    autosize
                    />
                    <div class="rating">
                        <div class="rating-star" v-for="i in parseInt(10)" :key="i"
                        @click="setRating(i)"
                        >
                            <va-icon
                            :name="i <= newRating ? 'star' : 'star_border'"
                            />
                        </div>
                    </div>
                    <p style="text-align: left;">{{ newCommentLength }} / 250</p>
                </va-card-content>
                <va-card-actions align="right">
                    <va-button @click="clearComment">Clear</va-button>
                    <va-button 
                    :disabled="disableCommentSubmit"
                    @click="createComment">Post</va-button>
                </va-card-actions>
            </va-card>
        </div>
        <div v-for="comment in comments" :key="comment">
            <Comment
            :id="comment.id"
            :sender="comment.sender"
            :message="comment.message"
            :collection="comment.collection"
            :nft_id="comment.nft_id"
            :nft_rating="comment.nft_rating"
            :likes="comment.likes"
            :user="user"
            @commentDeleted="deleteComment"
            />
        </div>
    </div>
</template>

<script>
import Comment from "./Comment.vue";
import { Auth } from "aws-amplify";

    export default {
        name: "CommentDisplay",
        components: {
            Comment,
        },
        props: {
            nft_id: {
                type: String,
                required: true,
            },
            collection: {
                type: String,
                required: true,
            }
        },
        async mounted() {
            try {
                const userResult = await Auth.currentAuthenticatedUser();
                this.user = userResult.username;
            } catch(e) {
                void(0);
            }
        },
        data() {
            return {
                comments: [],
                newComment: "",
                newRating: 0,
                user: "",
            }
        },
        computed: {
            newCommentLength() {
                return this.newComment.length;
            },
            disableCommentInput() {
                return this.user === '';
            },
            disableCommentSubmit() {
                return this.newComment.length > 250;
            }
        },
        watch: {
        },
        methods: {
            getAverageRating() {
                var summation = 0;
                for(var i = 0; i < this.comments.length; i++) {
                    summation += this.comments[i].nft_rating;
                }
                return summation > 0 ? Math.floor(summation / this.comments.length) : 0;
            },
            handleUserLoggedIn() {
                if(this.user === '') this.$router.push("/user");
            },
            setRating(rating) {
                this.newRating = rating;
            },
            clearComment() {
                this.handleUserLoggedIn();

                this.newComment = '';
                this.newRating = 0;
            },
            createComment() {
                this.handleUserLoggedIn();

                console.log(this.user);

                var id = Date.now();
                var sender = this.user;
                var message = this.newComment.substring(0, 250);
                var collection = this.collection;
                var nft_id = this.nft_id;
                var nft_rating = this.newRating;
                var likes = 0;

                var createdComment = {
                    id,
                    sender,
                    message,
                    collection,
                    nft_id,
                    nft_rating,
                    likes
                };

                this.comments.splice(0, 0, createdComment);
                this.clearComment();
                this.$vaToast.init({ message: 'Comment Added', color: 'success' });
                this.$emit("ratingChange");
            },
            deleteComment(id) {
                console.log(id);

                for(var i = 0; i < this.comments.length; i++) {
                    if(this.comments[i].id === id['id']) {
                        // Remove 1 comment at the ith index
                        this.comments.splice(i, 1);
                        this.$vaToast.init({ message: 'Comment Deleted', color: 'danger' });
                        break;
                    }
                }
                this.$emit("ratingChange");
            }
        },
    }
</script>

<style lang="css" scoped>

.rating {
    display: flex;
}

.rating-star:hover {
    cursor: pointer;
}

</style>
