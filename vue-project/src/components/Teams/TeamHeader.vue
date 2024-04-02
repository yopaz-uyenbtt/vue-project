<script setup>
import {useTeamStore} from "@/stores/TeamStore"

let team = useTeamStore();
</script>
<template>
    <header class="flex justify-between">
        <div>
            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded disable:bg-gray-400"
             :disabled="team.members.length == team.spots"> Add Member {{ team.spotsRemaining }} Spots
            </button>
        </div>

        <div>
            <div class="inline-flex items-center text-3xl relative">
                <!-- <img src="/smiley.png" alt="" class="mr-2"> -->
                <h3>{{ team.name }}Team</h3>
            </div>
        </div>
    </header>
</template>