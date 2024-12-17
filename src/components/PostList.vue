<script>
import textAreaField from "./textAreaField.vue";

export default {
  name: "PostList",
  components: {
    textAreaField,
  },
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      isTextAreaVisible: false,
    };
  },
  methods: {
    toggleTextAreaField() {
      this.isTextAreaVisible = !this.isTextAreaVisible;
    },
    openPost(postId) {
      this.$emit("open-post", postId);
    },
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
            @click="toggleTextAreaField"
          >
            {{ isTextAreaVisible ? "Close New Post" : "Add New Post" }}
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
        <p v-else class="mt-2 has-text-centered">
          No posts yet.
        </p>
      </div>

      <transition  name="fade-slide">
        <textAreaField v-if="isTextAreaVisible" />
      </transition>
    </div>
  </main>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.button.is-link {
  height: 50%;
  line-height: normal;
  padding: 0.5em 1em;
  max-height: 3rem;
  display: inline-flex;
  align-items: center;
}
</style>
