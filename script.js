async function loadRandomText() {
  const mainText = document.getElementById("mainText");
  const ghostText = document.getElementById("ghostText");

  try {
    const res = await fetch("texts.json");
    const texts = await res.json();

    if (!Array.isArray(texts) || texts.length === 0) {
      throw new Error("texts.json is empty or invalid.");
    }

    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedText = texts[randomIndex];

    mainText.textContent = selectedText;
    ghostText.textContent = selectedText;

    startSlowJitter();
  } catch (err) {
    mainText.textContent = "Unable to load text.";
    ghostText.textContent = "Unable to load text.";
    console.error(err);
  }
}

function startSlowJitter() {
  const wrap = document.querySelector(".text-wrap");
  const ghost = document.getElementById("ghostText");

  setInterval(() => {
    const x = (Math.random() - 0.5) * 0.9;
    const y = (Math.random() - 0.5) * 0.6;
    wrap.style.transform = `translate(${x}px, ${y}px)`;
  }, 1400);

  setInterval(() => {
    const gx = 0.25 + (Math.random() - 0.5) * 0.5;
    const gy = -0.15 + (Math.random() - 0.5) * 0.4;
    ghost.style.transform = `translate(${gx}px, ${gy}px)`;
  }, 1800);
}

loadRandomText();