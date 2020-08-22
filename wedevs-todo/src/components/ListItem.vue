<template>
  <li
    class="my-4 p-2 px-4 rounded-md"
    :class="isCompleted ? 'bg-gray-300 text-gray-700' : 'bg-blue-200 text-gray-900'"
  >
    <div v-if="!editing" class="flex justify-between items-center">
      <div class="flex justify-start items-center">
        <input
          class="mr-2 leading-tight"
          type="checkbox"
          @click.prevent="completeTodo"
          :checked="isCompleted ? 'checked' : ''"
        />
        <p :class="isCompleted ? 'line-through': ''" class="text-2xl">
          <span @click="editTodo" class="cursor-pointer">{{ todo.title }}</span>
        </p>
      </div>

      <span class="flex">
        <button
          @click="deleteTodo"
          type="button"
          title="delete"
          class="font-bold rounded-full w-8 h-8"
        >X</button>
      </span>
    </div>

    <todo-form v-else :populateWith="todo" @close="editTodo" />
  </li>
</template>

<script>
import TodoForm from "./TodoForm.vue";

export default {
  name: "ListItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TodoForm,
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    deleteTodo() {
      this.$emit("delete");
    },
    completeTodo() {
      this.$emit("complete");
    },
    editTodo() {
      if (!this.isCompleted) {
        this.$emit("edit");
        this.editing = !this.editing;
      }
    },
  },
};
</script>
