<template>
  <div class="flex flex-col mt-20 mx-4">
    <h1 class="text-center text-4xl font-bold my-4 mb-12 text-blue-600">weDevs TODO</h1>
    <todo-form @submit="addTodo" />
    <div
      :class="todos.length > 0 || completed.length > 0 ? 'w-1/3 mx-auto p-5 mt-5 bg-gray-200 rounded-md' : 'w-1/3 mx-auto p-5 mt-5'"
    >
      <div v-if="isAll">
        <ul id="todo-list">
          <list-item
            v-for="(todo, i) in todos"
            :key="i"
            :todo="todo"
            @delete="deleteTodo(i)"
            @complete="completeTodo(i)"
            @edit="saveTodos"
          />
        </ul>
        <ul id="completed-list">
          <list-item
            v-for="(todo, i) in completed"
            :key="i"
            :todo="todo"
            :isCompleted="true"
            @delete="deleteTodo({ i, isCompleted: true })"
          />
        </ul>
      </div>
      <div v-else>
        <ul id="todo-list" v-if="isActive">
          <list-item
            v-for="(todo, i) in todos"
            :key="i"
            :todo="todo"
            @delete="deleteTodo(i)"
            @complete="completeTodo(i)"
            @edit="saveTodos"
          />
        </ul>
        <ul id="completed-list" v-if="isComplete">
          <list-item
            v-for="(todo, i) in completed"
            :key="i"
            :todo="todo"
            :isCompleted="true"
            @delete="deleteTodo({ i, isCompleted: true })"
          />
        </ul>
      </div>
      <div
        class="flex justify-between items-center"
        v-if="todos.length > 0 || completed.length > 0"
      >
        <span v-if="todos.length > 0">{{todos.length}} {{todos.length > 1 ? 'items' : 'item'}} left</span>
        <div>
          <button type="button" class="px-2 mr-1 rounded-md" @click="isAll = true">All</button>
          <button type="button" class="px-2 mr-1 rounded-md" @click="toggleTodo">Active</button>
          <button type="button" class="px-2 rounded-md" @click="toggleCompleteTodo">Completed</button>
        </div>
        <span
          class="cursor-pointer"
          @click="deleteCompleted"
        >{{completed.length > 0 ? 'Clear completed' : ''}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import TodoForm from "./TodoForm.vue";
import ListItem from "./ListItem.vue";

export default {
  name: "TodoList",
  components: {
    TodoForm,
    ListItem,
  },
  data() {
    return {
      isAll: true,
      isActive: false,
      isComplete: false,
    };
  },
  computed: {
    ...mapState(["todos", "completed"]),
  },
  mounted() {
    this.checkStorage();
  },
  methods: {
    ...mapActions([
      "addTodo",
      "deleteTodo",
      "deleteCompleted",
      "completeTodo",
      "checkStorage",
      "saveTodos",
    ]),
    toggleTodo() {
      this.isActive = true;
      this.isAll = false;
      this.isComplete = false;
    },
    toggleCompleteTodo() {
      this.isActive = false;
      this.isAll = false;
      this.isComplete = true;
    },
  },
};
</script>
