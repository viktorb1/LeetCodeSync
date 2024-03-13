import { Octokit } from '@octokit/rest';


export const generateRandomState = () => {
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }


export const connectionFailed = async (access_token: string, repos: string[], index:number = 0) => {
  const octokit = new Octokit({
    auth: access_token
  });
  const [owner, repo_name] = repos[index].split('/')
  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo_name}`)
    console.log(response)
    return false;
  } catch (error) {
    return true;
  }
}