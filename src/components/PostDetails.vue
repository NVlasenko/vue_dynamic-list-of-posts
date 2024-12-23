<script>
import { deleteUserPost } from "../api/usersData";

export default {
  name: "PostDetails",
  props: {
    post: {
      type: Object,
      required: true,
    },
    currentUserId: {
      type: String,
      required: true,
    },
  },
  methods: {
    deletePost(postId) {
      deleteUserPost(this.currentUserId, postId);
      this.$emit("post-deleted", postId);
    },
    editPost(postId) {
      console.log(`Editing post with ID ${postId}`);
    },
  },
};
</script>

<template>
  <div class="tile is-parent is-8-desktop Sidebar Sidebar--open">
    <div v-if="post" class="tile is-child box is-success">
      <div class="content">
        <div
          class="is-flex is-justify-content-space-between is-align-items-center"
        >
          <h2>#{{ post.id }}: {{ post.title }}</h2>
          <div class="is-flex">
            <span
              class="icon is-small is-right is-clickable"
              @click="editPost(post.id)"
            >
              <i class="fas fa-pen-to-square"></i>
            </span>
            <span
              class="icon is-small is-right has-text-danger is-clickable ml-3"
              @click="deletePost(post.id)"
            >
              <i class="fas fa-trash"></i>
            </span>
          </div>
        </div>
        <p data-cy="PostBody">{{ post.body }}</p>
      </div>
      <div class="block">
        <div class="block">
          <p class="title is-4" data-cy="NoCommentsMessage">No comments yet</p>
        </div>
        <button
          data-cy="WriteCommentButton"
          type="button"
          class="button is-link"
        >
          Write a comment
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button.is-link {
  height: 50%;
  line-height: normal;
  padding: 0.5em 1em;
  max-height: 3rem;
  display: inline-flex;
  align-items: center;
}
</style>
