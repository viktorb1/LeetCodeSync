chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log("this is running like it should")
        console.log(details)
        let count = 0;

        chrome.webRequest.onCompleted.addListener(() => {
            count += 1
            if (count == 4)
                setTimeout(() => chrome.tabs.sendMessage(details.tabId, {action: "triggerSyncCode"}), 300)
                
        },
        {urls: ["https://leetcode.com/graphql/"]}
        )
      },
      {urls: ["https://leetcode.com/problems/*/submit/"]},
      );