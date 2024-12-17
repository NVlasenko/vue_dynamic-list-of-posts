<script>
export default {
  name: "addPost",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    isBodyError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "validate"],
};
</script>

<template>
  <div class="field" data-cy="BodyField">
    <label class="label" for="comment-body">Write Post Body</label>
    <div class="control">
      <textarea
        id="comment-body"
        name="body"
        placeholder="Post body"
        class="textarea"
        :class="{ 'is-danger': isBodyError }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('validate')"
      ></textarea>
    </div>
    <p v-if="isBodyError" class="help is-danger" data-cy="ErrorMessage">
      Body is required
    </p>
  </div>
</template>

<style scoped>
.textarea.is-danger {
  border-color: #ff3860;
  box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);
  background-color: none;
}
</style>
