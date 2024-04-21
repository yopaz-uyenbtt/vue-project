<script setup>
import {ref } from 'vue'

const header = ref('Shopping List App')
const editing = ref(false)
const items = ref([
  // {id:1, label:"10 party hats"},
  // {id:2, label:"2 board games"},
  // {id:3, label:"20 cups"}
])

const newItem = ref("")
const newItemPriority = ref(false)
const saveItem = ()=>{
  items.value.push({id: items.value.length+1, label: newItem.value})
  newItem.value = ""
}
const doEdit = (e)=> {
  editing.value = e
  newItem.value = ""
}
</script>

<template>
  <main>
    <div class="header">
      <h3>{{ header }}</h3>
      <button v-if="editing" class="btn" @click="doEdit(false)">
        Cancel
      </button>
      <button v-else class="btn btn-primary"  @click="doEdit(true)">
        Add item
      </button>
    </div>
    <form 
      class="add-item-form"
      v-if="editing"
      @submit.prevent="saveItem"
    >
      <input v-model.trim="newItem" type="text" placeholder="Add an item">
      <label>
        <input type="checkbox" v-model="newItemPriority">
      </label>
      <button
       v-bind:disabled="newItem.length === 0"
       class="btn btn-primary">
        Save
      </button>
    </form>
      
    <ul>
      <li v-for="({id, label}) in items" :key="id">
       {{label}}
      </li>
    </ul>

    <p v-if="!items.length">Nothing to see here</p>
  </main>
</template>