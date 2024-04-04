<script setup>
import {ref } from 'vue'

const header = ref('Shopping List App')
const items = ref([
  {id:1, label:"10 party hats"},
  {id:1, label:"2 board games"},
  {id:1, label:"20 cups"}
])
</script>

<template>
  <main>
    <h3>{{ header }}</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item }}
      </li>
    </ul>
  </main>
</template>