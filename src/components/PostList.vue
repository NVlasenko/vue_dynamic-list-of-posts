 <script>
import textAreaField from "./textAreaField.vue";
import { getUserPosts, addUserPost } from "../api/usersData";
import PostDetails from "./PostDetails.vue";

export default {
  name: "PostList",
  components: {
    textAreaField,
    PostDetails,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isTextAreaVisible: false,
      isPostDetailsVisible: false,
      selectedPost: null,
      posts: this.filterPosts(getUserPosts(this.userId)),
    };
  },
  methods: {
    toggleTextAreaField() {
      this.isTextAreaVisible = !this.isTextAreaVisible;
    },
    openPost(postId) {
      this.selectedPost = this.posts.find((post) => post.id === postId);
      this.isPostDetailsVisible = true;
    },
    closePostDetails() {
      this.isPostDetailsVisible = false;
      this.selectedPost = null;
    },
    addPost(newPost) {
      this.posts.push(newPost);
      addUserPost(this.userId, newPost);
    },
    loadUserPosts() {
      const posts = getUserPosts(this.userId);
      this.posts = this.filterPosts(posts);
    },
    filterPosts(posts) {
      return posts.filter((post) => post.title && post.title.trim());
    },
  },
  mounted() {
    this.loadUserPosts();
  },
  watch: {
    posts: {
      handler(newPosts) {
        this.filteredPosts = this.filterPosts(newPosts);
      },
      deep: true,
    },
  },
};
</script> 


<!-- <template>
  <main class="section">
    <div class="tile is-parent">
      <div class="tile is-child box is-success">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button
            type="button"
            class="button is-link"
            @click="toggleTextAreaField"
          >
            {{ isTextAreaVisible ? "Close creation" : "Add New Post" }}
          </button>
        </div>

        <div v-if="posts.length">
          <table class="table is-fullwidth is-striped is-hoverable is-narrow">
            <thead>
              <tr class="has-background-link-light">
                <th class="has-text-black">ID</th>
                <th class="has-text-black">Title</th>
                <th class="has-text-right has-text-black">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="post in posts" :key="post.id">
                <td class="has-text-black">{{ post.id }}</td>
                <td class="has-text-black">{{ post.title }}</td>
                <td class="has-text-right is-vcentered has-text-black">
                  <button
                    type="button"
                    class="button is-link"
                    @click="openPost(post.id)"
                  >
                    Open
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="mt-2 has-text-centered">No posts yet.</p>
      </div>

      <transition name="fade-slide">
        <textAreaField
          v-if="isTextAreaVisible"
          @new-post="addPost"
          @cancel="toggleTextAreaField"
          :currentUserId="userId"
        />
      </transition>

      <transition name="fade-slide">
        <PostDetails
          v-if="isPostDetailsVisible"
          :post="selectedPost"
          :currentUserId="userId"
          @close="closePostDetails"
        />
      </transition>
    </div>
  </main>
</template> -->
<template>
  <main class="section">
    <div class="tile is-parent">
      <div class="tile is-child box is-success">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button
            type="button"
            class="button is-link"
            @click="toggleTextAreaField"
          >
            {{ isTextAreaVisible ? "Close creation" : "Add New Post" }}
          </button>
        </div>

        <div v-if="posts.length">
          <table class="table is-fullwidth is-striped is-hoverable is-narrow">
            <thead>
              <tr class="has-background-link-light">
                <th class="has-text-black">ID</th>
                <th class="has-text-black">Title</th>
                <th class="has-text-right has-text-black">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="post in posts" :key="post.id">
                <td class="has-text-black">{{ post.id }}</td>
                <td class="has-text-black">{{ post.title }}</td>
                <td class="has-text-right is-vcentered has-text-black">
                  <button
                    type="button"
                    class="button is-link"
                    @click="openPost(post.id)"
                  >
                    {{ isPostDetailsVisible && selectedPost.id === post.id ? "Close" : "Open" }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="mt-2 has-text-centered">No posts yet.</p>
      </div>

      <transition name="fade-slide">
        <textAreaField
          v-if="isTextAreaVisible"
          @new-post="addPost"
          @cancel="toggleTextAreaField"
          :currentUserId="userId"
        />
      </transition>

      <transition name="fade-slide">
        <PostDetails
          v-if="isPostDetailsVisible"
          :post="selectedPost"
          :currentUserId="userId"
          @close="closePostDetails"
        />
      </transition>
    </div>
  </main>
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