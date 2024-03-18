import TurndownService from 'turndown';
import { languageToFileExtension } from './utility';
import { Octokit } from '@octokit/rest';
import { Repo } from './composables/useAccessKeyAndRepos';


const codeStart = async () => {
    const turndownService = new TurndownService();
    const description_html = await fetchDescriptionHTML()
    const description_markdown = turndownService.turndown(description_html);
    const extractedCode = document.querySelectorAll('.flexlayout__tab')[3].querySelector('code')!.textContent

    const submission_number = window.location.href.split('/')[6];

    const {questionFrontendId, title, titleSlug, difficulty} = await fetchTitleHTML();
    console.log(questionFrontendId, title, titleSlug, difficulty)
    console.log(description_markdown, extractedCode)

    const extractedText: string[] = []
    const spans = document.querySelectorAll(".rounded-sd span") as NodeListOf<HTMLSpanElement>
    spans.forEach(span => extractedText.push(span.textContent as string))
    console.log(extractedText)
    const code_language = extractedText[4].split(' ').pop() as string
    const code_extension = languageToFileExtension[code_language]

    const access_token: string = (await chrome.storage.local.get("access_token")).access_token || "";    
    const repos = JSON.parse((await chrome.storage.local.get("repos")).repos) as Repo[]
    console.log(repos)
    const octokit = new Octokit({
        auth: access_token
      });

      createFolderAndFile();
      
      async function createFolderAndFile() {
        for (const [index, {repoName}] of repos.entries()) {
            if (!repos[index][`sync${difficulty}` as keyof Repo]) continue

            try {
                const uppercaseTitleSlug = titleSlug.replace(/-/g, "_").split('_')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join('_');

                const include_difficulty = ((await chrome.storage.local.get('include_difficulty')).include_difficulty) || 'true'
                const use_separate_files = ((await chrome.storage.local.get('use_separate_files')).use_separate_files) || 'true'
                console.log("use separate files", ((await chrome.storage.local.get('use_separate_files')).use_separate_files))

                const [owner, repo_name] = repoName.split('/')
                let folderName = `${questionFrontendId.toString().padStart(4, '0')}_${difficulty.toUpperCase()}_${uppercaseTitleSlug}`
                if (include_difficulty === 'false') folderName = `${questionFrontendId.toString().padStart(4, '0')}_${uppercaseTitleSlug}`
                let fileName = `${submission_number}_${questionFrontendId.toString().padStart(4, '0')}_${uppercaseTitleSlug}${code_extension}`
                if (use_separate_files === 'false') fileName = `${questionFrontendId.toString().padStart(4, '0')}_${uppercaseTitleSlug}${code_extension}`
                const description = `## [${questionFrontendId}. ${uppercaseTitleSlug.replace(/_/g, " ")} - ${difficulty.toUpperCase()}](${window.location.href})\n\n` + description_markdown
                
                const readmeExists = await octokit.repos.getContent({
                    owner: owner,
                    repo: repo_name,
                    path: `${folderName}/README.md`
                }).catch(() => undefined);

                const fileExists = await octokit.repos.getContent({
                    owner: owner,
                    repo: repo_name,
                    path: `${folderName}/${fileName}`
                }).catch(() => {})

                console.log(fileExists)

                let sha = ""
                if (fileExists && fileExists.data && ('sha' in fileExists.data))
                    sha = fileExists.data.sha 

                let folderSha = ""
                if (readmeExists && readmeExists.data && ('sha' in readmeExists.data))
                    folderSha = readmeExists.data.sha 

                
                if (!readmeExists && description) {
                    await octokit.repos.createOrUpdateFileContents({
                        owner: owner,
                        repo: repo_name,
                        path: `${folderName}/README.md`,
                        message: `Add README.md for submission #${submission_number} - LeetCodeSync`,
                        content: btoa(description),
                        branch: 'main'
                    });
                }

                if (extractedCode) {
                    let params = {
                        owner: owner,
                        repo: repo_name,
                        path: `${folderName}/${fileName}`,
                        message: `Time: ${extractedText[0]} ${extractedText[1]} (${extractedText[3]}), Space: ${extractedText[5]} ${extractedText[6]} (${extractedText[8]}) - LeetCodeSync`,
                        content: btoa(extractedCode),
                        branch: 'main'
                    } as any

                    if (sha) params.sha = sha
                    
                    const response = await octokit.repos.createOrUpdateFileContents(params);
                    
                    if (response.status < 400 && !folderSha) {
                        const number_easy = Number((await chrome.storage.local.get("number_easy")).number_easy);
                        const number_medium = Number((await chrome.storage.local.get("number_medium")).number_medium);
                        const number_hard = Number((await chrome.storage.local.get("number_hard")).number_hard);
    
                        await chrome.storage.local.set({
                            "number_easy": difficulty === "Easy" ? number_easy + 1 : number_easy,
                            "number_medium": difficulty === "Medium" ? number_medium + 1 : number_medium,
                            "number_hard": difficulty === "Hard" ? number_hard + 1 : number_hard
                          })
    
                          repos[index].numberSynced += 1
    
                          await chrome.storage.local.set({
                            "repos": JSON.stringify(repos)
                          })
                    }
                }



                console.log(`File created: ${fileName}`);
              } catch (error) {
                console.error('Error:', error);
              }
            }
        }

}



const fetchDescriptionHTML = async () => {
    const graphqlQuery = `
    query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            content
        }
    }`;
    const variables = {
        titleSlug: window.location.href.split('/')[4]
    };

    const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operationName: "questionContent",
                query: graphqlQuery,
                variables: variables
            }),
        });

    const responseData = await response.json();
    return responseData.data.question.content
}

const fetchTitleHTML = async () => {
    const graphqlQuery = `
    query questionTitle($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionFrontendId
          title
          titleSlug
          difficulty
        }
      }`;
    const variables = {
        titleSlug: window.location.href.split('/')[4]
    };

    const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operationName: "questionTitle",
                query: graphqlQuery,
                variables: variables
            }),
        });

    const responseData = await response.json();
    return responseData.data.question
}


function handleSubmission() {
    const accepted = document.querySelector('[data-e2e-locator="submission-result"]')?.textContent || ''

    if (accepted === "Accepted") {
        setTimeout(codeStart, 300)
    } else {
        setTimeout(handleSubmission, 1000);
    }
}



chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "triggerSyncCode") {
        // Put your code here to be triggered
        console.log("Code triggered in content script!");
        handleSubmission();
        // For example, you can inject code into the page or perform other actions
    }
});
