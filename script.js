const scenes = [
  {
    image: "images/kairova.jpg",
    alt: "A ruined landscape in Kairova",
    title: "Destination: Kairova",
    text: "Awayzo arrives in Kairova expecting to document a normal expedition. Instead, the environment feels unstable, and parts of the world are beginning to crumble.",
    evidence: "The ground is cracking, structures are failing, and the normal systems of Kairova are becoming unreliable.",
    prompt: "What should you do first?",
    choices: [
      ["Ignore the warning signs", "The evidence suggests something is wrong. Ignoring it would make the problem harder to understand."],
      ["Observe and record the changes", "Correct. The first step is to pay attention to the evidence before making a decision."],
      ["Leave without investigating", "You might stay safe, but you would not learn what is causing the problem."]
    ]
  },
  {
    image: "images/awayzo.jpg",
    alt: "Awayzo preparing for the expedition",
    title: "Character: Awayzo",
    text: "Awayzo is the central character of the expedition. They are trying to understand the situation while continuing forward even though the world around them is becoming less stable.",
    evidence: "Awayzo has limited information, so careful observation and problem-solving are more useful than guessing.",
    prompt: "Which approach will help Awayzo most?",
    choices: [
      ["Look for clues and compare them", "Correct. Comparing clues can help Awayzo build a clearer picture of the problem."],
      ["Assume the first explanation is correct", "Not quite. The first explanation may not match all of the evidence."],
      ["Stop collecting information", "That would make it harder to understand what is happening."]
    ]
  },
  {
    image: "images/discovery.jpg",
    alt: "Evidence showing the world beginning to crumble",
    title: "Discovery: What Is Happening?",
    text: "After studying the evidence, Awayzo realizes that the crumbling world is connected to a larger problem. The clues do not explain everything, but they point toward a pattern.",
    evidence: "Multiple signs of instability appear in different places. Together, they suggest that the problem is bigger than one damaged area.",
    prompt: "How should you use the new information?",
    choices: [
      ["Connect the clues into a larger explanation", "Correct. The new evidence helps Awayzo refine the original understanding of the problem."],
      ["Treat every clue as unrelated", "That makes the evidence harder to use because several clues point toward the same problem."],
      ["Delete the earlier observations", "Earlier observations are still useful when testing a new explanation."]
    ]
  },
  {
    image: "images/outcome.jpg",
    alt: "Awayzo moving forward after discovering the problem",
    title: "Outcome: Respond and Move Forward",
    text: "Awayzo now has enough information to respond. The goal is not to fix everything instantly, but to make a thoughtful decision based on what was discovered.",
    evidence: "The expedition shows that observation, analysis, and action work together. What Awayzo learned can guide the next step.",
    prompt: "What is the strongest final response?",
    choices: [
      ["Use the evidence to choose a careful next step", "Correct. A good response is based on what was observed and learned."],
      ["Act without considering the evidence", "That could create a new problem because the decision would be based on a guess."],
      ["Pretend the problem never happened", "The evidence shows that the problem is real and needs a response."]
    ]
  }
];

let currentScene = 0;

const title = document.getElementById("sceneTitle");
const text = document.getElementById("sceneText");
const evidence = document.getElementById("evidenceText");
const sceneImage = document.getElementById("sceneImage");
const prompt = document.getElementById("actionPrompt");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const sceneNumber = document.getElementById("sceneNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sceneButtons = document.querySelectorAll(".scene-btn");

function renderScene() {
  const scene = scenes[currentScene];

  title.textContent = scene.title;
  text.textContent = scene.text;
  evidence.textContent = scene.evidence;
  sceneImage.src = scene.image;
  sceneImage.alt = scene.alt;
  prompt.textContent = scene.prompt;
  sceneNumber.textContent = String(currentScene + 1).padStart(2, "0");
  feedback.textContent = "";

  choices.innerHTML = "";

  scene.choices.forEach(([label, response]) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = label;

    button.addEventListener("click", () => {
      feedback.textContent = response;
    });

    choices.appendChild(button);
  });

  sceneButtons.forEach((button, index) => {
    button.classList.toggle("active", index === currentScene);
    button.setAttribute("aria-current", index === currentScene ? "page" : "false");
  });

  prevBtn.disabled = currentScene === 0;
  nextBtn.textContent = currentScene === scenes.length - 1 ? "Restart ↻" : "Next →";
}

function goToScene(index) {
  currentScene = Math.max(0, Math.min(index, scenes.length - 1));
  renderScene();
  document.querySelector(".report-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

sceneButtons.forEach((button, index) => {
  button.addEventListener("click", () => goToScene(index));
});

prevBtn.addEventListener("click", () => {
  if (currentScene > 0) {
    goToScene(currentScene - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentScene === scenes.length - 1) {
    goToScene(0);
  } else {
    goToScene(currentScene + 1);
  }
});

document.getElementById("beginBtn").addEventListener("click", () => {
  document.querySelector(".report-card").scrollIntoView({ behavior: "smooth" });
});

renderScene();
