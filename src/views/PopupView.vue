<script setup lang="ts">
// import { generateRandomState } from "../scripts/utility.ts"
// chrome.tabs.query({ active: true, currentWindow: true }, ([res]) => {
//   console.log("this is failing with", res.url)
//   // if (res && res.url.startsWith(import.meta.env.VITE_URL_PATH)) {
//     if (res && res.id) {
//       console.log("sending");
//       chrome.tabs.sendMessage(res.id, "clicked-action-button");
//     }
//   // }
// });
// import { connectionFailed } from '../scripts/utility';

import { ref, watch } from 'vue';
import { useAccessKeyAndRepos } from '../scripts/composables/useAccessKeyAndRepos';
import { connectionFailed } from '../scripts/utility';

const { access_token, repos } = useAccessKeyAndRepos()
let connection_status = ref<number[]>([])

const CONNECTION_STATUS = {
	FAIL: 0,
	UNKNOWN: 1,
	SUCCESS: 2,
}

watch(repos, () => {
  connection_status = ref(Array(repos.value.length).fill(CONNECTION_STATUS.UNKNOWN))
})

const checkConnection = async (index: number) => {
  const connectionFailure = await connectionFailed(access_token.value, repos.value, index)
  console.log(connectionFailure)
  if (connectionFailure) {
    connection_status.value[index] = CONNECTION_STATUS.FAIL
  } else {
    connection_status.value[index] = CONNECTION_STATUS.SUCCESS
  }

  setTimeout(() => connection_status.value[index] = CONNECTION_STATUS.UNKNOWN, 5000)
}
// const getUrlParams = (search) => {
//       const params = new URLSearchParams(search);
//       const result = {};
//       for (const [key, value] of params.entries()) {
//         result[key] = value;
//       }
//       return result;
//     },

</script>

<template>
  <main class="pb-8">
    <div class="flex flex-col items-center justify-center text-lg rounded-xl">
      <div class="flex justify-center w-full p-2 rounded-b-lg bg-leetcode-green">
        <img src="@/assets/icon.svg" class="w-10 select-none" />
        <h1 class="font-[800] text-3xl text-[white] select-none">GITLEET</h1>
      </div>
      <div class="flex flex-row justify-around w-full p-4">
        <div class="text-center">
          <p class="text-leetcode-green">Easy</p>
          <p class="text-3xl font-bold text-leetcode-green">888</p>
        </div>
        <div class="text-center">
          <p class="text-leetcode-orange">Medium</p>
          <p class="text-3xl font-bold text-leetcode-orange">888</p>
        </div>
        <div class="text-center">
          <p class="text-leetcode-red">Hard</p>
          <p class="text-3xl font-bold text-leetcode-red">888</p>
        </div>
      </div>
      <div class="mb-6">
      <div class="flex flex-col w-full mb-2 border-opacity-50" v-for="[index, repoName] of repos.entries()">
        <div class="flex flex-col justify-center p-2 mx-2 card bg-base-300 rounded-box">
          <div class="flex items-center justify-between px-2">
            <p class="m-2 break-all">{{ repoName }}</p>
            <div class="tooltip" data-tip="test connection">
            <button
              class="border-none btn btn-square rounded-xl btn-neutral" 
              :class="{'bg-leetcode-red hover:bg-leetcode-red text-[black]': connection_status[index] === 0,
               'bg-leetcode-green hover:bg-leetcode-green text-[black]': connection_status[index] === 2,}"
              
              @click="checkConnection(index)">
              <font-awesome-icon :icon="['fas', 'tower-broadcast']" class="text-xl" />
            </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <a href="settings.html" target="_blank">
        <button class="btn btn-info">
          Link your repositories
        </button>
      </a>
    </div>
  </main>
</template>

