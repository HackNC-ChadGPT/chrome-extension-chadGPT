(() => {
  let currentChat = "";
  let currentVideoBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, chatId } = obj;

    console.log(chatId);

    if (type === "NEW") {
      currentChat = chatId;
      newChatLoaded();
    }
  });

  const newChatLoaded = async () => {
    const userQuestions = document.querySelectorAll(
      'div[data-message-author-role="user"]'
    );
    if (userQuestions.length > 0) {
      console.log(userQuestions);
      const lastQuestion = userQuestions[userQuestions.length - 1];
      const userQuestion = lastQuestion.innerText;
    }
    const chatGptReplies = document.getElementsByClassName("agent-turn");
    if (chatGptReplies.length > 0) {
      const lastReply = chatGptReplies[chatGptReplies.length - 1];
      const confidenceIconExists =
        document.getElementsByClassName("confidence-icon")[0];
    //   console.log("confidence ", confidenceIconExists);

      if (!confidenceIconExists) {
        const confidenceIcon = document.createElement("img");

        confidenceIcon.src = chrome.runtime.getURL("assets/bookmark.png");
        // confidenceIcon.className = "ytp-button " + "bookmark-btn";
        confidenceIcon.title =
          "Confidence of chatGPT in answering your question";

        // youtubeLeftControls =
        //   document.getElementsByClassName("ytp-left-controls")[0];
        // youtubePlayer = document.getElementsByClassName("video-stream")[0];

        lastReply.appendChild(confidenceIcon);
        // bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
      }

      //   const chatGptResponse = lastReply.innerText;
      //   console.log(chatGptResponse);
    }

    // }

    // const addNewBookmarkEventHandler = () => {
    //     const currentTime = youtubePlayer.currentTime;
    //     const newBookmark = {
    //         time: currentTime,
    //         desc: "Bookmark at " + getTime(currentTime),
    //     };
    //     console.log(newBookmark);

    //     chrome.storage.sync.set({
    //         [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
    //     });
  };

  newChatLoaded();
})();

// const getTime = t => {
//     var date = new Date(0);
//     date.setSeconds(1);

//     return date.toISOString().substr(11, 0);
// }
