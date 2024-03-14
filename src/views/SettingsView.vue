`
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Repo, useAccessKeyAndRepos } from '../scripts/composables/useAccessKeyAndRepos';
import { connectionFailed } from '../scripts/utility';


const invalid = ref([false])
const showTooltip = ref(false)
const token_invalid = ref(false)
const any_invalid = computed(() => invalid.value.some(value => value === true) || token_invalid.value)
const my_modal = ref()
const include_difficulty_toggle = ref()
const use_separate_files_toggle = ref()
const { access_token, repos, startingValues } = useAccessKeyAndRepos()


const saveToLocalStorage = async () => {
  const resetRepos: Repo[] = repos.value.map(repo => ({
    ...repo,
    numberSynced: 0
  }));

  await chrome.storage.local.set({
    "access_token": access_token.value,
    "repos": JSON.stringify(resetRepos)
  })

  await chrome.storage.local.set({
    "number_easy": 0,
    "number_medium": 0,
    "number_hard": 0
  })

  await chrome.storage.local.set({
    "use_separate_files": include_difficulty_toggle.value.checked
  })

  await chrome.storage.local.set({
    "to": use_separate_files_toggle.value.checked
  })

  startingValues.value = {
    access_token: access_token.value,
    repos: repos.value
  }
}


const validateAndSaveData = async () => {
  const connectionFailure = await connectionFailed(access_token.value, repos.value)
  if (connectionFailure) {
    token_invalid.value = true
    showTooltip.value = true
  }

  for (const [i, repo] of repos.value.entries()) {
    const [owner, repo_name] = repo.repoName.split('/')
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

watch(repos, () => {
  if (!repos.value.length) {
    repos.value.push({
      repoName: '',
      numberSynced: 0,
      syncEasy: true,
      syncMedium: true,
      syncHard: true,
    })
  }
})

onMounted(async () => {
  const set_to_false = ((await chrome.storage.local.get('include_difficulty')).include_difficulty) === 'false';
  include_difficulty_toggle.value.checked = (set_to_false) ? false : true
  const set_to_false2 = ((await chrome.storage.local.get('use_separate_files')).use_separate_files) === 'false';
  use_separate_files_toggle.value.checked = (set_to_false2) ? false : true
})


const updateIncludeDifficulty = async () => {
  const include_difficulty: string = ((await chrome.storage.local.get('include_difficulty')).include_difficulty) || 'true'
  console.log(include_difficulty)
  await chrome.storage.local.set({
    include_difficulty: (include_difficulty == 'true') ? 'false' : 'true'
  })
}

const updateUseSeparateFiles = async () => {
  const use_separate_files: string = ((await chrome.storage.local.get('use_separate_files')).use_separate_files) || 'true'
  console.log(use_separate_files)
  await chrome.storage.local.set({
    use_separate_files: (use_separate_files == 'true') ? 'false' : 'true'
  })
}

</script>


<template>
  <div class="p-8 md:p-20 !text-base">
    <div class="flex justify-center w-full p-2 py-4 mb-6 rounded-lg bg-leetcode-green">
      <img src="@/assets/icon.svg" class="w-10 select-none" />
      <h1 class="font-bold text-3xl text-[white] select-none">LeetSync</h1>
    </div>

    <div class="hidden p-2" :class="{ 'block': !startingValues.access_token || !startingValues.repos.length }">
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
      <h1 class="mt-8 mb-4 text-4xl font-bold">
        Configure settings
      </h1>

      <div class="flex items-center justify-center">
        <input type="text" placeholder="Personal access token" :class="{ 'input-error': token_invalid }"
          class="max-w-xs mt-4 mb-4 mr-4 w-80 input input-bordered"
          @input="access_token = ($event.target as HTMLInputElement).value;" :value="access_token" />
        <div class="tooltip" data-tip="generate from github.com">
          <a href="https://github.com/settings/tokens/new" target="_blank">
            <button class="relative border-none btn btn-accent bg-leetcode-orange hover:bg-leetcode-orange">
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-xl" />
            </button>
          </a>
        </div>
      </div>

      <div class="flex justify-center" v-for="[index, repoObj] of repos.entries()">
        <div class="absolute mr-4 join">
          <div class="tooltip left-[-260px]" data-tip="toggle difficulties to sync">

            <button class="relative border-none btn btn-neutral join-item"
              :class="{ 'bg-leetcode-green hover:bg-leetcode-green text-[black]': repoObj.syncEasy }"
              @click="repoObj.syncEasy = !repoObj.syncEasy; saveToLocalStorage()">E</button>
            <button class="relative border-none btn btn-neutral join-item"
              :class="{ 'bg-leetcode-orange hover:bg-leetcode-orange text-[black]': repoObj.syncMedium }"
              @click="repoObj.syncMedium = !repoObj.syncMedium; saveToLocalStorage()">M</button>
            <button class="relative border-none btn btn-neutral join-item"
              :class="{ 'bg-leetcode-red hover:bg-leetcode-red text-[black]': repoObj.syncHard }"
              @click="repoObj.syncHard = !repoObj.syncHard; saveToLocalStorage()">H</button>
          </div>
        </div>

        <input type="text" placeholder="repo e.g. username/myrepo" class="z-10 mb-4 input input-bordered"
          :class="{ 'w-96': index === 0, 'w-80 mr-4': index !== 0, 'input-error': invalid[index] }"
          :value="repoObj.repoName" @input="repos[index].repoName = ($event.target as HTMLInputElement).value" />
        <div class="z-20 tooltip" data-tip="remove repo" v-if="index > 0">

          <button class="border-none btn btn-accent bg-leetcode-red hover:bg-leetcode-red"
            @click="repos.splice(index, 1); invalid.splice(index, 1); saveToLocalStorage()">
            <font-awesome-icon :icon="['fas', 'xmark']" class="text-xl" />
          </button>
        </div>


      </div>

      <div class="z-20 tooltip" data-tip="add another repo">

        <button
          class="rounded-md h-8 !min-h-8 mb-4 border-none w-96 btn btn-accent bg-leetcode-green hover:bg-leetcode-green"
          @click="repos.push({ repoName: '', numberSynced: 0, syncEasy: true, syncMedium: true, syncHard: true }); invalid.push(false)">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-xl" />
        </button>
      </div>

      <div :class="{ 'tooltip tooltip-bottom tooltip-open': showTooltip }" class="mb-4"
        :data-tip="(any_invalid) ? 'settings not saved, invalid repo or access key' : 'settings saved!'">
        <button class="btn btn-info w-96" @click="validateAndSaveData">
          <font-awesome-icon :icon="['fas', 'floppy-disk']" />
          SAVE
        </button>
      </div>

      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="mr-4 label-text">Include Difficulty in Github Folder Name</span>
          <input type="checkbox" class="toggle" checked @input="updateIncludeDifficulty" ref="include_difficulty_toggle" />
        </label>
      </div>

      <div class="mb-8 form-control">
        <label class="cursor-pointer label">
          <span class="mr-4 label-text">Create separate files for each submission</span>
          <input type="checkbox" class="toggle" checked @input="updateUseSeparateFiles" ref="use_separate_files_toggle" />
        </label>
      </div>
      
      <button class="btn" @click="my_modal.showModal()">Steps for Generating Access Token</button>
      <dialog class="modal" ref="my_modal">
        <div class="modal-box">
          <div class="mb-8">
            <h1 class="mb-8 text-3xl font-bold">Steps for generating access key:</h1>
            <p class="mb-4"><b class="text-leetcode-green">Step 1:</b> Visit <a class="italic"
                href="https://github.com/settings/tokens/new" target="_blank">https://github.com/settings/tokens/new</a>
            </p>
            <p class="mb-3"><b class="text-leetcode-orange">Step 2:</b> Enter <b>LeetSync</b> for the note, <b>No
                expiration</b>
              for the Expiration date and check <b>repo</b> under the <b>Select scopes</b> section</p>
            <p><b class="text-leetcode-red">Step 3:</b> Press <b>Generate token</b>, copy the access token which starts
              with
              <b>ghp_</b>
            </p>
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
