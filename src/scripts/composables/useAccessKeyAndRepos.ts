import { ref, onMounted } from 'vue'

export function useAccessKeyAndRepos() {
    const access_token = ref("")
    const repos = ref<string[]>([])

    onMounted(async () => {
        const stored_access_token = (await chrome.storage.local.get("access_token")).access_token
        console.log("WLEKJRLE", stored_access_token)
        const stored_repos = JSON.parse((await chrome.storage.local.get("repos")).repos)
        console.log(stored_repos)
        console.log(typeof(stored_repos))
    
        if (stored_repos) {
         console.log(stored_repos)
          repos.value = stored_repos
        }
        if (stored_access_token) {
            console.log("yes this is running like it should")
          access_token.value = stored_access_token
        }
    })

    return {access_token, repos}
}
