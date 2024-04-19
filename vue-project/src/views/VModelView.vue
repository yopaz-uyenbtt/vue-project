<script setup>
import {ref } from 'vue'

const header = ref('Shopping List App')
const items = ref([
  {id:1, label:"10 party hats"},
  {id:2, label:"2 board games"},
  {id:3, label:"20 cups"}
])

const newItem = ref("")
const newItemPriority = ref(false)
</script>

<template>
  <main>
    <h3>{{ header }}</h3>
    <form 
      class="add-item-form"
      @submit.prevent="items.push({id: items.length+1, label: newItem})"
    >
      <input v-model.trim="newItem" type="text" placeholder="Add an item">
      <label>
        <input type="checkbox" v-model="newItemPriority">
      </label>
      <button class="btn btn-primary">
        Save
      </button>
    </form>
      
    <ul>
      <li v-for="({id, label}) in items" :key="id">
       {{label}}
      </li>
    </ul>
  </main>
</template>