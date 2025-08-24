const scenarioSelect = document.getElementById("scenario");
const inputField = document.getElementById("inputValue");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");

function addMessage(content, type = "bot") {
  const msg = document.createElement("div");
  msg.classList.add(type === "bot" ? "bot-message" : "user-message");
  msg.innerHTML = content;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getUnit() {
  return scenarioSelect.selectedOptions[0].dataset.unit;
}

sendBtn.addEventListener("click", () => {
  const scenario = scenarioSelect.value;
  const value = parseFloat(inputField.value);
  const unit = getUnit();

  if (isNaN(value) || value <= 0) {
    addMessage("Please enter a valid positive number.", "bot");
    return;
  }

  addMessage(`${value} ${unit}`, "user");

  let response = "Your answer is:<br>";

  switch (scenario) {
    case "savings":
      response += `Save ₹${value} daily → 1 Year: ₹${value * 365}, 5 Years: ₹${value * 365 * 5}`;
      break;
    case "calories":
      response += `Walk ${value} min → Burn ${value * 5} cal/day, ${(value * 5 * 365).toLocaleString()} cal/year`;
      break;
    case "carbon":
      response += `Avoid ${value} km → Save ${(value * 120)}g CO₂/day, ${((value * 120 * 365) / 1000).toFixed(2)} kg/year`;
      break;
    case "screen":
      response += `Reduce ${value} hours → Gain ${(value * 365)} hrs/year (~${(value * 365 / 24).toFixed(1)} days)`;
      break;
    case "water":
      response += `Save ${value} L/day → ${(value * 365).toLocaleString()} L/year`;
      break;
    case "plastic":
      response += `Avoid ${value} bottles/day → ${(value * 365).toLocaleString()} bottles/year`;
      break;
    case "sleep":
      response += `Sleep ${value} extra hrs → ${(value * 365).toLocaleString()} hrs/year`;
      break;
    case "reading":
      response += `Read ${value} min/day → ${(value * 365 / 60).toFixed(1)} hrs/year`;
      break;
    case "coffee":
      response += `Skip ${value} cups/day → Save ₹${value * 50 * 365}/year & reduce caffeine`;
      break;
    case "junk":
      response += `Skip ${value} junk packs/day → Avoid ${(value * 300).toLocaleString()} cal/year`;
      break;
  }

  setTimeout(() => addMessage(response, "bot"), 600);
});
