import { ref, onMounted } from 'vue'

export interface Repo {
  repoName: string;
  numberSynced: number;
  syncEasy: boolean;
  syncMedium: boolean;
  syncHard: boolean;
}

export function useAccessKeyAndRepos() {
    const access_token = ref("")
    const repos = ref<Repo[]>([])
    const startingValues = ref({
      access_token: "",
      repos: [] as Repo[]
    })

    onMounted(async () => {
        const stored_access_token = (await chrome.storage.local.get("access_token")).access_token || "";
        console.log("WLEKJRLE", stored_access_token);
        
        const stored_repos_data = await chrome.storage.local.get("repos");
        const stored_repos = stored_repos_data.repos ? JSON.parse(stored_repos_data.repos) : [];
      
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

        startingValues.value = {
          access_token: access_token.value,
          repos: repos.value
        }
    })



    return {access_token, repos, startingValues}
}
