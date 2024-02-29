<script setup>
  import {useFlash} from "@/composables/useFlash"

  let { flash } = useFlash();
</script>

<template>
  <main>
    <p>
      <button @click="flash('Yay!', 'It works on the about page', 'info')">Click me</button>
    </p>
  </main>
</template>
