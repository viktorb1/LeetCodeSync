<script setup lang="ts">
// chrome.tabs.query({ active: true, currentWindow: true }, ([res]) => {
//   console.log("this is failing with", res.url)
//   // if (res && res.url.startsWith(import.meta.env.VITE_URL_PATH)) {
//     if (res && res.id) {
//       console.log("sending");
//       chrome.tabs.sendMessage(res.id, "clicked-action-button");
//     }
//   // }
// });
</script>

<template>
  <main>
    <div class="flex flex-col text-lg items-center justify-center rounded-xl">
      <div
        class="bg-leetcode-green p-2 rounded-b-lg w-full flex justify-center"
      >
        <img src="@/assets/icon.svg" class="w-10 select-none" />
        <h1 class="font-[800] text-3xl text-[white] select-none">GITLEET</h1>
      </div>
      <div class="flex flex-row justify-around p-4 w-full">
        <div class="text-center">
          <p class="text-leetcode-green">Easy</p>
          <p class="text-leetcode-green font-bold text-3xl">888</p>
        </div>
        <div class="text-center">
          <p class="text-leetcode-orange">Medium</p>
          <p class="text-leetcode-orange font-bold text-3xl">888</p>
        </div>
        <div class="text-center">
          <p class="text-leetcode-red">Hard</p>
          <p class="text-leetcode-red font-bold text-3xl">888</p>
        </div>
      </div>
      <div class="flex flex-col w-full border-opacity-50">
  <div class="flex flex-col justify-center card bg-base-300 rounded-box p-2 mb-6 mx-2">
    <div class="flex justify-between items-center px-2">
    <p>viktorb1/leetcode</p>
    <button class="btn btn-square rounded-xl btn-success bg-leetcode-orange hover:bg-leetcode-orange border-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    </div>
  </div>
</div>
<a href="connect.html" target="_blank">
  <button class="btn btn-info">
          Link new repository
  </button>
</a>

    </div>
  </main>
</template>
