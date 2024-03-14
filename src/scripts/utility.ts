import { Octokit } from '@octokit/rest';
import { Repo } from './composables/useAccessKeyAndRepos';

export const generateRandomState = () => {
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }


export const connectionFailed = async (access_token: string, repos: Repo[], index:number = 0) => {
  const octokit = new Octokit({
    auth: access_token
  });
  const [owner, repo_name] = repos[index].repoName.split('/')
  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo_name}`)
    console.log(response)
    return false;
  } catch (error) {
    return true;
  }
}


export const languageToFileExtension: Record<string, string> = {
  "C++": ".cpp",
  "Java": ".java",
  "Python": ".py",
  "Python3": ".py",
  "C": ".c",
  "C#": ".cs",
  "JavaScript": ".js",
  "TypeScript": ".ts",
  "PHP": ".php",
  "Swift": ".swift",
  "Kotlin": ".kt",
  "Dart": ".dart",
  "Go": ".go",
  "Ruby": ".rb",
  "Scala": ".scala",
  "Rust": ".rs",
  "Racket": ".rkt",
  "Erlang": ".erl",
  "Elixir": ".ex"
};
