const userQuestions = () => [
  ...document.querySelectorAll('div[data-message-author-role="user"]'),
];
const gptAnswers = () => [...document.querySelectorAll(".markdown")];

window.addEventListener("load", () => {
  setTimeout(() => {
    waitForElement("nav > .flex-col > .flex-col", () => {
      const openedChats = document.querySelectorAll(
        "nav > .flex-col > .flex-col"
      );
      openedChats.forEach((chat) => {
        chat.addEventListener("click", async () => {
          await new Promise((resolve) => setTimeout(resolve, 250));
        });
      });
    });
  }, 2000);
});

setInterval(() => {
  try {
    addConfidenceScores();
  } catch (error) {
    console.error("Error in addConfidenceScores:", error);
  }
}, 1000);

const addConfidenceScores = () => {
  const questions = userQuestions();
  const answers = gptAnswers();
  const results = questions.map((question, index) => [
    question,
    answers[index],
  ]);
  results.forEach((questionAnswerPair, index) => {
    addConfidenceScoreToResult(
      questionAnswerPair[0],
      questionAnswerPair[1],
      index
    );
  });
};

const addConfidenceScoreToResult = async (question, answer, index) => {
  const resultLoadingId = `result-loading-${index}`;
  const confidenceScoreId = `result-confidence-score-${index}`;

  if (
    document.querySelector(`#${resultLoadingId}`) ||
    document.querySelector(`#${confidenceScoreId}`)
  ) {
    return;
  }

  const spinner = createSpinner(resultLoadingId);
  answer.insertAdjacentElement("afterend", spinner);

  try {
    const confidenceScore = await getConfidenceScore(question.innerText);
    const confidenceScoreElement = createConfidenceScoreElement(
        Math.round(confidenceScore * 10000) / 100,
      confidenceScoreId
    );
    setTimeout(() => {
      spinner.style.display = "none";
      answer.insertAdjacentElement("afterend", confidenceScoreElement);
    }, 3000);
  } catch (error) {
    console.error("Error in addConfidenceScoreToResult:", error);
  }
};

const createSpinner = (id) => {
  const spinner = document.createElement("object");
  spinner.type = "image/svg+xml";
  spinner.data = chrome.runtime.getURL("assets/spinner-animated.svg");
  spinner.id = id;
  spinner.setAttribute("width", "50");
  spinner.setAttribute("height", "50");

  return spinner;
};

const createConfidenceScoreElement = (score, id) => {
  const confidenceScoreElement = document.createElement("p");
  confidenceScoreElement.innerHTML = score + "%";

  // change color depending on score
  if (score >= 66) {
    confidenceScoreElement.style.backgroundColor = "#007f4d" //"#74aa9c";
  } else if (score >= 33) {
    confidenceScoreElement.style.backgroundColor = "#f4c40c";
  } else {
    confidenceScoreElement.style.backgroundColor = "#bc1c1c";
  }
  confidenceScoreElement.style.width = "fit-content";
  confidenceScoreElement.style.fontStyle = "bold";
  confidenceScoreElement.style.color = "white";
  confidenceScoreElement.style.borderRadius = "12px";
  confidenceScoreElement.style.padding = "2px 10px";
  confidenceScoreElement.id = id;
  return confidenceScoreElement;
};

const getConfidenceScore = async (prompt) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  };

  try {
    const response = await fetch(
      `https://hacknc-23-chadgpt-c7659b067b76.herokuapp.com/getConfidence`,
      settings
    )
      .then((res) => res.json())
      .then((data) => data["result"]);
    return response;
  } catch (e) {
    console.error("Error in getConfidenceScore:", e);
    throw e;
  }
};

const waitForElement = (selector, callback) => {
  const maxWaitTime = 5000;
  const speed = 100;

  const endTime = Date.now() + maxWaitTime;
  const interval = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(interval);
      callback(element);
    }
    if (Date.now() >= endTime) {
      clearInterval(interval);
    }
  }, speed);
};
