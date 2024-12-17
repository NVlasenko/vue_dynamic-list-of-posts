<script>
export default {
  name: "textAreaField",

  data() {
    return {
      title: "",
      body: "",
      isTitleError: false,
      isBodyError: false,
    };
  },
  methods: {
    validateInput() {
      this.isTitleError = !this.title.trim();
    },
    validateBody() {
      this.isBodyError = !this.body.trim();
    },
    handleSubmit(event) {
      event.preventDefault();
      this.validateInput();
      this.validateBody();

      if (!this.isTitleError && !this.isBodyError) {
        console.log("Post saved:", { title: this.title, body: this.body });
        this.title = "";
        this.body = "";
        this.isTitleError = false;
        this.isBodyError = false;
      }
    },
  },
};
</script>

<template>
  <div class="tile is-child box is-success">
    <p class="title">Create new post</p>
    <form @submit="handleSubmit">
      <div class="field" data-cy="NameField">
        <label class="label" for="comment-author-name-title">Title</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="title"
            @input="validateInput"
            type="text"
            name="title"
            id="comment-author-name-title"
            placeholder="Post title"
            class="input"
            :class="{ 'is-danger': isTitleError }"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user fa-heading"></i>
          </span>
          <span
            v-if="isTitleError"
            class="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p v-if="isTitleError" class="help is-danger" data-cy="ErrorMessage">
          Title is required
        </p>
      </div>

      <div class="field" data-cy="BodyField">
        <label class="label" for="comment-body">Write Post Body</label>
        <div class="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Post body"
            class="textarea"
            :class="{ 'is-danger': isBodyError }"
            v-model="body"
            @input="validateBody"
          ></textarea>
        </div>
        <p v-if="isBodyError" class="help is-danger" data-cy="ErrorMessage">
          Body is required
        </p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            type="submit"
            class="button is-link"
            :disabled="isBodyError || isTitleError"
          >
            Save
          </button>
        </div>
        <div class="control">
          <button
            type="reset"
            class="button is-link is-light"
            @click="title = ''; body = ''; isTitleError = false; isBodyError = false;"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input.is-danger,
.textarea.is-danger {
  border-color: #ff3860;
  box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);
}
</style>
