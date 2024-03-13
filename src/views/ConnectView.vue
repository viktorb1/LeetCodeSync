<script setup lang="ts">

// const code = new URLSearchParams(window.location.search).get('code') as string
// console.log(code, chrome)


chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab && tab.id) {
        const tabId = tab.id;
        const code = new URLSearchParams(window.location.search).get('code') as string

        chrome.runtime.sendMessage({
            message: "authorized-github",
            extra_data: {
                code
            }
        }, () => {
            chrome.tabs.remove(tabId)
        })

    }
  // }
});

</script>
<template>
    <h1 class="text-4xl">Link a new Github repository to sync with Leetcode</h1>
</template>

