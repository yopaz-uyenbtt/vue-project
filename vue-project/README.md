## Có 2 cách chính để tương tác với Vue
#### 1. Options API (Vue2)
Xác định logic của các thành phần trong component bằng cách sử dụng data, methods, mounted...

```javascript
<script>
export default {
  // reactive state
  data() {
    return {
      count: 0
    }
  },

  // functions that mutate state and trigger updates
  methods: {
    increment() {
      this.count++
    }
  },

  // lifecycle hooks
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template> 
```

#### 2. Composition API (từ Vue 3)
Xác định logic của các thành phần trong component bằng cách sử dụng import API function, thường sử dụng với thẻ *\<script setup\>*

```javascript
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>


