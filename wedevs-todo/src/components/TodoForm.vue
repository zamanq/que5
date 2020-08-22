<template>
  <form @submit.prevent="submit" class="flex justify-center">
    <input
      class="w-1/3 my-2 p-2 rounded border border-gray-400 focus:border-blue-400 focus:outline-none"
      type="text"
      placeholder="What needs to be done?"
      v-model.trim="todo.title"
    />
  </form>
</template>

<script>
export default {
  name: "TodoForm",
  props: {
    populateWith: {
      type: Object,
      default: () => ({ empty: true }),
    },
  },
  data() {
    return {
      todo: {
        title: "",
      },
    };
  },
  methods: {
    clearForm() {
      this.todo = {
        title: "",
      };
    },
    submit() {
      if (this.todo.title !== "") {
        this.$emit("submit", this.todo);
        this.clearForm();
        this.close();
      }
    },
    close() {
      this.$emit("close");
    },
  },
  created() {
    if (!this.populateWith.empty) {
      this.todo = this.populateWith;
    }
  },
};
</script>
