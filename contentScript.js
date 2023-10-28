(() => {
  let currentChat = "";
  let numberOfReplies = 0;
  var dict = {};

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, chatId } = obj;

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
    //   console.log(userQuestions);
      const lastQuestion = userQuestions[userQuestions.length - 1];
      const userQuestion = lastQuestion.innerText;
    }
    const chatGptReplies = document.getElementsByClassName("agent-turn");
    if (chatGptReplies.length > 0) {
      numberOfReplies = chatGptReplies.length;
      const lastReply = chatGptReplies[chatGptReplies.length - 1];
      //   const confidenceScoreExists =
      //     document.getElementsByClassName("confidence-icon").length ===
      //     chatGptReplies.length;
      console.log("lastReply", lastReply);
      var id = lastReply.querySelectorAll("[data-message-id]")[0].dataset.messageId;
      console.log("dict", dict);

      if (!(id in dict)) {
        const confidenceScoreExists =
          document.getElementsByClassName("confidence-icon")[0];

        if (!confidenceScoreExists) {
          const confidenceScore = document.createElement("p");
          dict[id] = 2.0;
          confidenceScore.innerHTML = "2.0%";
          confidenceScore.style.backgroundColor = "#ffbbcc";
          confidenceScore.style.borderRadius = "100%";
          confidenceScore.style.width = "fit-content";
          confidenceScore.style.padding = "4px";

          // confidenceScore.src = chrome.runtime.getURL("assets/bookmark.png");
          // confidenceScore.className = "confidence-icon";
          // confidenceScore.title =
          //   "Confidence of chatGPT in answering your question";

          lastReply.appendChild(confidenceScore);
          // bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
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

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      setTimeout(() => newChatLoaded(), 1000);
      // newChatLoaded();
    }
  });

  newChatLoaded();
})();
