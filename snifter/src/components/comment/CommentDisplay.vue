<template>
    <div>
        <div>
            <va-card>
                <va-card-title>
                    Reviews
                </va-card-title>
                <va-card-content>
                    <va-input 
                    class="mb-4"
                    v-model="newComment"
                    :rules="[(v) => v.length <= 250 || `Comments must be 250 characters or less`]"
                    ref="input"
                    type="textarea"
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
                    <va-button 
                    :class="'comment-button'"
                    gradient
                    @click="clearComment">Clear</va-button>
                    <va-button
                    :class="'comment-button'"
                    gradient
                    :disabled="disableCommentSubmit"
                    @click="createComment(false)">Post</va-button>
                    <va-modal 
                    ref="confirmReviewChange" 
                    size="large"
                    :message="'Are you sure? Your review will be placed back at the top of the list, but your previous review will be deleted!'" 
                    stateful 
                    no-outside-dismiss
                    hide-default-actions
                    >
                        <template #header>
                            <h1>{{ user }}</h1>
                        </template>
                        <slot>
                            <div class="modal-content">
                                <div>
                                    <p>From:</p>
                                    <div>
                                        <Comment
                                        :id="existingUserComment.id"
                                        :sender="existingUserComment.sender"
                                        :message="existingUserComment.message"
                                        :collection="existingUserComment.collection"
                                        :nft_id="existingUserComment.nft_id"
                                        :nft_rating="existingUserComment.nft_rating"
                                        :likes="existingUserComment.likes"
                                        :user="user"
                                        :isStatic="true"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>To:</p>
                                    <div>
                                        <Comment
                                        :id="existingUserComment.id"
                                        :sender="existingUserComment.sender"
                                        :message="newComment"
                                        :collection="existingUserComment.collection"
                                        :nft_id="existingUserComment.nft_id"
                                        :nft_rating="newRating"
                                        :likes="existingUserComment.likes"
                                        :user="user"
                                        :isStatic="true"
                                        />
                                    </div>
                                </div>
                            </div>
                        </slot>
                        <template #footer>
                            <div>
                                <va-button @click="this.$refs['confirmReviewChange'].hide()">Cancel</va-button>
                                <va-button
                                @click="overWriteComment">
                                    Post
                                </va-button>
                            </div>
                        </template>
                    </va-modal>
                </va-card-actions>
            </va-card>
        </div>
        <div v-if="showComments">
            <div v-for="comment in nftReviews" :key="comment">
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
                @commentUpdated="updateComment"
                />
            </div>
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
                showComments: true,
            }
        },
        computed: {
            newCommentLength() {
                return this.newComment.length;
            },
            nftReviews() {
                return this.comments;
            },
            disableCommentInput() {
                return this.user === '';
            },
            disableCommentSubmit() {
                return this.newComment.length > 250;
            },
            userCommentExists() {
                return this.comments.filter((comment) => comment.sender === this.user).length > 0;
            },
            existingUserComment() {
                return this.comments.filter((comment) => comment.sender === this.user)[0];
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
            createComment(byPassCommentExists = false) {
                this.handleUserLoggedIn();

                debugger;
                var exists = this.userCommentExists;
                if(!exists || byPassCommentExists) {
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
                    this.$vaToast.init({ message: 'Review Added', color: 'success' });
                    this.$emit("ratingChange");
                }
                else {
                    this.$refs['confirmReviewChange'].show();
                }
            },
            deleteComment(id, suppressToast = false) {
                console.log(id);
                debugger;
                console.log(this.comments);
                for(var i = 0; i < this.comments.length; i++) {
                    if(this.comments[i].id === id['id']) {
                        // Remove 1 comment at the ith index
                        this.comments.splice(i, 1);
                        if(!suppressToast)
                            this.$vaToast.init({ message: 'Review Deleted', color: 'danger' });
                        break;
                    }
                }
                this.$emit("ratingChange");
            },
            updateComment(event) {
                console.log(event);
                var id = event.id;
                var message = event.message;
                var nft_rating = event.nft_rating;
                console.log(nft_rating);

                for(var i = 0; i < this.comments.length; i++) {
                    if(this.comments[i].id == id) {
                        var comment = this.comments[i];
                        comment.message = message;
                        comment.nft_rating = nft_rating;
                        this.comments.splice(i, 1);
                        this.comments.splice(i, 1, comment);
                        console.log(this.comments[i]);
                        break;
                    }
                }

                this.$emit('ratingChange');
            },
            overWriteComment() {
                debugger;
                var existingComment = this.existingUserComment;
                this.createComment(true);
                this.deleteComment({ id: existingComment.id }, true);
                this.$refs['confirmReviewChange'].hide();
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

.va-button:hover {
    background-color: white;
    color: black;
}

.modal-content {
    display: flex;
    padding: 10px;
}

</style>
