<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useAccessKeyAndRepos } from '../scripts/composables/useAccessKeyAndRepos';
import { connectionFailed } from '../scripts/utility';


const invalid = ref([false])
const showTooltip = ref(false)
const token_invalid = ref(false)
const any_invalid = computed(() => invalid.value.some(value => value === true) || token_invalid.value)
const my_modal = ref()
const { access_token, repos } = useAccessKeyAndRepos()


const saveToLocalStorage = async () => {
  await chrome.storage.local.set({
    "access_token": access_token.value,
    "repos": JSON.stringify(repos.value)
  })
}


const validateAndSaveData = async () => {
  const connectionFailure = await connectionFailed(access_token.value, repos.value)
  if (connectionFailure) {
    token_invalid.value = true
    showTooltip.value = true
  }

  for (const [i, repo] of repos.value.entries()) {
    const [owner, repo_name] = repo.split('/')
    if (!owner || !repo_name) {
      invalid.value[i] = true
    }
  }

  showTooltip.value = true
  setTimeout(resetInvalid, 5000)
  if (!any_invalid.value) {
    await saveToLocalStorage()
  }

}

const resetInvalid = () => {
  for (let i = 0; i < invalid.value.length; i++) {
    invalid.value[i] = false;
  }
  showTooltip.value = false
  token_invalid.value = false
}

watch(any_invalid, () => {
  if (!any_invalid.value) {
    showTooltip.value = false
  }
})

onMounted(() => {
  repos.value.push('')
})
</script>


<template>
  <div class="p-8 md:p-20 !text-base">
    <div class="flex justify-center w-full p-2 py-4 mb-6 rounded-lg bg-leetcode-green">
      <img src="@/assets/icon.svg" class="w-10 select-none" />
      <h1 class="font-[800] text-3xl text-[white] select-none">GITLEET</h1>
    </div>

    <div class="p-2" :class="{'hidden': access_token && repos.length}">
      <div role="alert" class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span><b>Warning:</b> You haven't filled out your settings yet. The extension won't work until you provide an
          access token and a repository below!</span>
      </div>
    </div>


    <div class="flex flex-col items-center justify-center mb-12">
      <h1 class="mt-8 mb-4 ml-8 text-4xl font-bold">
        Configure settings
      </h1>

      <div class="flex items-center justify-center">
        <input type="text" placeholder="Personal access token" :class="{ 'input-error': token_invalid }"
          class="max-w-xs mt-4 mb-4 mr-4 w-80 input input-bordered" @input="access_token = ($event.target as HTMLInputElement).value;" :value="access_token" />
        <div class="tooltip" data-tip="generate from github.com">
          <a href="https://github.com/settings/tokens/new" target="_blank">
            <button class="relative border-none btn btn-accent bg-leetcode-orange hover:bg-leetcode-orange">
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-xl" />
            </button>
          </a>
        </div>
      </div>

      <div class="flex justify-center" v-for="[index, repoName] of repos.entries()">
        <input type="text" placeholder="repo e.g. username/myrepo" class="mb-4 input input-bordered"
          :class="{ 'w-96': index === 0, 'w-80 mr-4': index !== 0, 'input-error': invalid[index] }" :value="repoName"
          @input="repos[index] = ($event.target as HTMLInputElement).value" />
        <div class="tooltip" data-tip="remove repo" v-if="index > 0">

          <button class="relative border-none btn btn-accent bg-leetcode-red hover:bg-leetcode-red"
            @click="repos.splice(index, 1); invalid.splice(index, 1); saveToLocalStorage()">
            <font-awesome-icon :icon="['fas', 'xmark']" class="text-xl" />
          </button>
        </div>


      </div>

      <div class="tooltip" data-tip="add another repo">

        <button
          class="rounded-md h-8 !min-h-8 mb-4 border-none w-96 btn btn-accent bg-leetcode-green hover:bg-leetcode-green"
          @click="repos.push(''); invalid.push(false)">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-xl" />
        </button>
      </div>

      <div :class="{ 'tooltip tooltip-bottom tooltip-open': showTooltip }" class="mb-12"
        :data-tip="(any_invalid) ? 'settings not saved, invalid repo or access key' : 'settings saved!'">
        <button class="btn btn-info w-96" @click="validateAndSaveData">
          <font-awesome-icon :icon="['fas', 'floppy-disk']" />
          SAVE
        </button>
      </div>

      <button class="btn" @click="my_modal.showModal()">Steps for Generating Access Token</button>
      <dialog class="modal" ref="my_modal">
        <div class="modal-box">
          <div class="mb-8">
            <h1 class="mb-8 text-3xl font-bold">Steps for generating access key:</h1>
            <p class="mb-4"><b class="text-leetcode-green">Step 1:</b> Visit <a class="italic"
                href="https://github.com/settings/tokens/new" target="_blank">https://github.com/settings/tokens/new</a>
            </p>
            <p class="mb-3"><b class="text-leetcode-orange">Step 2:</b> Enter "gitLeet" for the note, "No expiration"
              for the Expiration date and check "repo" under the "Select scopes" section</p>
            <p><b class="text-leetcode-red">Step 3:</b> Press "Generate token", copy the access token which starts with
              "ghp_"</p>
            <p></p>
          </div>
          <p class="pb-4 text-xs text-right">Press ESC key or click outside to close this modal</p>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
    







  </div>
</template>
