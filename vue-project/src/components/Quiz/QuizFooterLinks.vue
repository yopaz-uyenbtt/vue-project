<template>
    <div>
        <button @click="changeName">
            {{ name }}
        </button>

        <ul>
            <li><a href="">Get a job</a></li>
            <li><a href="">Contact us</a></li>
        </ul>
    </div>
</template>

<script setup>
import { inject } from 'vue';

defineProps({ quiz: Object});

let {name, changeName} = inject('name');


</script>