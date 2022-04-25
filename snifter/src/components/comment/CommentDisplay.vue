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
import { listMessages } from "../../graphql/queries";
import {  createMessage, deleteMessage, updateMessage } from "../../graphql/mutations";
import { API, Auth } from "aws-amplify";

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

            // Check if user is signed in
            try {
                const userResult = await Auth.currentAuthenticatedUser();
                this.user = userResult.username;
            } catch(e) {
                void(0);
            }

            // Load comments for NFT
            await this.getComments();
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
                // Reactive length of new comment
                return this.newComment.length;
            },
            nftReviews() {
                // Sort reviews by most recent
                var comments = this.comments;
                return comments.sort((a, b) => ( a.id < b.id ) ? 1 : -1);
            },
            disableCommentInput() {
                return this.user === '';
            },
            disableCommentSubmit() {
                return this.newComment.length > 250;
            },
            userCommentExists() {
                // Determine if a user has a comment for this nft
                return this.comments.filter((comment) => this.user !== '' && comment.sender === this.user).length > 0;
            },
            existingUserComment() {
                // Determine what the users comment is, if one exists
                return this.comments.filter((comment) => this.user !== '' && comment.sender === this.user)[0];
            }
        },
        watch: {
        },
        methods: {
            getAverageRating() {
                /**
                 * Calculate the average rating for the nft
                 */
                var summation = 0;
                for(var i = 0; i < this.comments.length; i++) {
                    summation += this.comments[i].nft_rating;
                }
                return summation > 0 ? Math.floor(summation / this.comments.length) : 0;
            },
            handleUserLoggedIn() {
                /**
                 * Reroute to signin page if not logged in
                 */
                if(this.user === '') this.$router.push("/user");
            },
            setRating(rating) {
                this.newRating = rating;
            },
            clearComment() {
                this.handleUserLoggedIn();
                if(this.user === '') return;

                this.newComment = '';
                this.newRating = 0;
            },
            async getComments() {
                // Query for comments
                const result = await API.graphql({
                    query: listMessages,
                    variables: { 
                        filter: {'nft_id': {'eq': this.nft_id}}
                     },
                });
                var comments = result.data.listMessages.items;
                comments.forEach(comment => {
                    this.comments.push(comment);
                });
            },
            createComment(byPassCommentExists = false) {
                // Reroute if user is not logged in and do nothing
                this.handleUserLoggedIn();
                if(this.user === '') return;

                // Determine if user already has a comment or not
                var exists = this.userCommentExists;
                if(!exists || byPassCommentExists) {
                    // If not, create the comment
                    var id = Date.now();
                    var sender = this.user;
                    var message = this.newComment.substring(0, 250);
                    var collection = this.collection;
                    var nft_id = this.nft_id;
                    var nft_rating = this.newRating;

                    var createdComment = {
                        id,
                        sender,
                        message,
                        collection,
                        nft_id,
                        nft_rating
                    };

                    // Ensure user is logged in
                    if(sender && sender !== '') {
                        // Save comment
                        this.saveComment(createdComment)
                        .then(() => {
                            // Add comment to local list
                            this.comments.splice(0, 0, createdComment);
                            // Clear input
                            this.clearComment();
                            // Show toast and emit rating change to NFT page
                            this.$vaToast.init({ message: 'Review Added', color: 'success' });
                            this.$emit("ratingChange");
                        });
                    }
                }
                else {
                    // Otherwise show the overwrite modal
                    this.$refs['confirmReviewChange'].show();
                }
            },
            async saveComment(comment) {
                /*
                * Save a new comment
                */
                const newComment = comment;
                const result = await API.graphql({
                    query: createMessage,
                    variables: { input: newComment },
                });
                console.log(result);
            },
            deleteComment(id, suppressToast = false) {
                /**
                 * Delete user's comment
                 */
                for(var i = 0; i < this.comments.length; i++) {
                    // Find matching comment
                    if(this.comments[i].id === id['id']) {
                        // Remove 1 comment at the ith index
                        this.removeComment(id)
                        .then(() => {
                            // Index may have changed by now
                            var currentIndex = this.comments.findIndex((comment) => comment['id'] === id['id'] );
                            // Remove comment locally
                            this.comments.splice(currentIndex, 1);
                            // Display success to user
                            if(!suppressToast)
                                this.$vaToast.init({ message: 'Review Deleted', color: 'danger' });
                            // Emit rating change to NFT
                            this.$emit("ratingChange");
                        });
                        break;
                    }
                }
            },
            async removeComment(commentId) {
                // Query to delete comment
                const result = await API.graphql({
                    query: deleteMessage,
                    variables: { input: commentId },
                });

                console.log(result);
            },
            updateComment(event) {
                /**
                 * Update comment locally and in database
                 */
                var id = event.id;
                var message = event.message;
                var nft_rating = event.nft_rating;

                for(var i = 0; i < this.comments.length; i++) {
                    // Find matching comment
                    if(this.comments[i].id == id) {

                        // Update comment data
                        var comment = this.comments[i];
                        comment.message = message;
                        comment.nft_rating = nft_rating;

                        // Change comment in db
                        this.changeComment(comment)
                        .then(() => {
                            // Delete existing comment, and insert new comment at same index
                            this.comments.splice(i, 1);
                            this.comments.splice(i, 0, comment);
                            this.$emit('ratingChange');
                        });
                        break;
                    }
                }

                this.$emit('ratingChange');
            },
            async changeComment(comment) {
                const result = await API.graphql({
                    query: updateMessage,
                    variables: {input: comment}
                });
                console.log(result);
            },
            overWriteComment() {
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
