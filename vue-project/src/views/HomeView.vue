<script setup>
import { ref, watch } from "vue";

import {useStorage} from "@/composables/useStorage"

let food = useStorage('food', 'tacos');
let age = useStorage('age', 10);

let obj = useStorage('obj', { one: 'one '});

setTimeout(() => {
  obj.value = {'changed' : 'entirely'};
}, 3000)
</script>

<template>
  <main>
    <p>
      What is your favorite food? <input type="text" v-model="food">
    </p>

    <p>
      How old are yoou? <input type="text" v-model="age">
    </p>

</main>
</template>

