# <img src="https://raw.githubusercontent.com/viktorb1/LeetSync/main/src/assets/icon_color.svg" width="40"> LeetSync - Sync your Leetcode solutions to Github

**LeetSync** is a lightweight chrome extension that lets you automatically sync your LeetCode solutions to Github. It is easy to use, and it works on the modern updated LeetCode UI. Unlike other Leetcode syncing solutions, **LeetSync** uses a user-generated access token to access to your Github account (much more secure than exposing a secret).

## Options

- Ability to sync to multiple repositories in the same account.
- Ability to sync only Easy/Medium/Hard questions
- Ability to customize whether difficulty appears in the Github folder name
- Ability to create separate files in Github for each Leetcode submission

## Developer Information

This project is written in TypeScript and uses Vue.js for the frontend work. It is compiled with Vite. Most of the processing occurs in the `content-script.ts` file.

To manually compile the chrome extension and install it in your browser,

1. `cd` into the folder containing the LeetSync repository
2. Type `npm run build`
3. Go to *chrome://extensions* on your browser and enable *Developer Mode*.  
4. Select "Load Unpacked" and select the `dist/` folder to install