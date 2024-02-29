<script setup>
 import Quiz from "@/components/Quiz/Quiz.vue"
</script>

<template>
  <main>
    <Quiz :quiz="{ name: 'My First Quiz', question: []}" /> 
  </main>
</template>

