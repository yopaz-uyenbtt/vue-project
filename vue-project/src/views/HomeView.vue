<script setup>
import TheWelcome from '../components/TheWelcome.vue';
import { ref } from 'vue';

let message = ref("Hello, World!")

setTimeout(() => {
  message.value = "I Have Been Changed";
}, 2000);

let doSomething = () => {
  alert("Doing it now");
}
  // data() { 
  //   return {
  //     message: "Hello World",
  //   };

  // },

  // mounted() {
  //   alert("I have been mounted")
  // },

</script>

<template>
  <main>
    <TheWelcome />

    <p>{{ message }}</p>

    <p>
      <button @click="doSomething">Click me</button>
    </p>
  </main>
</template>
