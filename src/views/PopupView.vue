<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useAccessKeyAndRepos } from '../scripts/composables/useAccessKeyAndRepos';
import { connectionFailed } from '../scripts/utility';

const number_easy = ref(0);
const number_medium = ref(0);
const number_hard = ref(0)

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

onMounted(async () => {
  number_easy.value = Number((await chrome.storage.local.get("number_easy")).number_easy) || 0;
  number_medium.value = Number((await chrome.storage.local.get("number_medium")).number_medium) || 0;
  number_hard.value = Number((await chrome.storage.local.get("number_hard")).number_hard) || 0;
})

</script>

<template>
  <main class="pb-8">
    <div class="flex flex-col items-center justify-center text-lg rounded-xl">
      <div class="flex justify-center w-full p-2 rounded-b-lg bg-leetcode-green">
        <h1 class="font-bold text-3xl text-[white] select-none">LeetCodeSync</h1>
      </div>
      <div class="flex flex-row justify-around w-full p-4">
        <div class="text-center">
          <p class="select-none text-leetcode-green">Easy</p>
          <p class="text-3xl font-bold select-none text-leetcode-green">{{number_easy}}</p>
        </div>
        <div class="text-center">
          <p class="select-none text-leetcode-orange">Medium</p>
          <p class="text-3xl font-bold select-none text-leetcode-orange">{{ number_medium }}</p>
        </div>
        <div class="text-center">
          <p class="select-none text-leetcode-red">Hard</p>
          <p class="text-3xl font-bold select-none text-leetcode-red">{{  number_hard }}</p>
        </div>
      </div>
      <div class="mb-6">
      <div class="flex flex-col w-full mb-2 border-opacity-50" v-for="[index, repoObj] of repos.entries()">
        <div class="flex flex-col justify-center p-2 mx-2 card bg-base-300 rounded-box">
          <div class="flex items-center justify-between px-2">
            <p class="font-bold break-all">{{ repoObj.numberSynced }}</p>
            <p class="m-2 break-all">{{ repoObj.repoName }}</p>
            <div class="tooltip" data-tip="test connection">
            <button
              class="border-none rounded-xl btn btn-square btn-neutral" 
              :class="{'bg-leetcode-red hover:bg-leetcode-red text-[black]': connection_status[index] === 0,
               'bg-leetcode-green hover:bg-leetcode-green text-[black]': connection_status[index] === 2,}"
              
              @click="checkConnection(index)">
              <font-awesome-icon :icon="['fas', 'tower-broadcast']" class="text-lg" />
            </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <a href="settings.html" target="_blank">
        <button class="btn btn-info">
          Link your repository
        </button>
      </a>
    </div>
  </main>
</template>