<script>
import textAreaField from "./textAreaField.vue";
import { getUserPosts } from "../api/usersData";
import PostDetails from "./PostDetails.vue";
import Loader from "./loader/Loader.vue";

export default {
  name: "PostList",
  components: {
    textAreaField,
    PostDetails,
    Loader,
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
      posts: [],
      isGlobalLoading: false,
    };
  },
  methods: {
    toggleTextAreaField() {
      if (this.isPostDetailsVisible) {
        this.closePostDetails();
      }
      this.isTextAreaVisible = !this.isTextAreaVisible;
    },
    openPost(postId) {
      this.showGlobalLoader();
      if (this.isTextAreaVisible) {
        this.isTextAreaVisible = false;
        setTimeout(() => {
          this.openPostDetails(postId);
        }, 500);
      } else {
        this.openPostDetails(postId);
      }
    },
    openPostDetails(postId) {
      if (this.isPostDetailsVisible && this.selectedPost?.id === postId) {
        this.closePostDetails();
      } else {
        setTimeout(() => {
          this.selectedPost = this.posts.find((post) => post.id === postId);
          this.isPostDetailsVisible = true;
        }, 500);
      }

      setTimeout(() => {
        this.hideGlobalLoader();
      }, 200);
    },
    closePostDetails() {
      this.isPostDetailsVisible = false;
      this.selectedPost = null;
      this.hideGlobalLoader();
    },
    addPost(newPost) {
      this.posts.push(newPost);
      this.isTextAreaVisible = false;
      setTimeout(() => {
        this.selectedPost = newPost;
        this.isPostDetailsVisible = true;
      }, 300);
    },
    loadUserPosts() {
      this.isGlobalLoading = false;
      const posts = getUserPosts(this.userId);
      this.posts = this.filterPosts(posts);
    },
    filterPosts(posts) {
      return posts.filter((post) => post.title && post.title.trim());
    },
    showGlobalLoader() {
      this.isGlobalLoading = true;
    },
    hideGlobalLoader() {
      this.isGlobalLoading = false;
    },
  },
  mounted() {
    this.loadUserPosts();
  },
};
</script>

<template>
  <main class="section">
    <div class="tile is-parent">
      <div class="tile is-child box is-success">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button
            type="button"
            class="button is-link"
            :class="{ 'is-light': isTextAreaVisible }"
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
                    :class="{
                      'is-light':
                        isPostDetailsVisible && selectedPost.id === post.id,
                    }"
                    @click="openPost(post.id)"
                  >
                    {{
                      isPostDetailsVisible && selectedPost.id === post.id
                        ? "Close"
                        : "Open"
                    }}
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
        <Loader v-if="isGlobalLoading" />
      </transition>

      <transition name="fade-slide">
        <PostDetails
          v-if="isPostDetailsVisible && !isGlobalLoading"
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
