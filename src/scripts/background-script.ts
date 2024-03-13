chrome.runtime.onMessage.addListener(async (data) => {
    if (typeof data === 'object' && data.message == "authorized-github") {
        // const { code } = data.extra_data
        // const access_token = "testing"
        // chrome.storage.local.set({access_token: access_token})
        console.log("hello")
    }
});

export {};