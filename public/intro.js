

async function loadIntro() {
  let currentLanguage = localStorage.getItem('language') || 'en';
  try {
    const response = await fetch("public/json/script.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jsonData = await response.json();

    const langData = jsonData[currentLanguage];
    const UIData = langData.ui; 
    
    document.querySelector("#navbar-title").textContent = UIData.navbar.title;
    document.querySelector("#navbar-resources a").textContent = UIData.navbar.resources;
    document.querySelector("#navbar-about a").textContent = UIData.navbar.about;
   const languageSelector = document.getElementById("language-selector"); 
   languageSelector.value = currentLanguage; 

   languageSelector.addEventListener("change", (e) => {
    currentLanguage = e.target.value; 
    localStorage.setItem('language', currentLanguage);
    location.reload();
   })
    
    const introStep = langData.script[0];
    const container = document.getElementById("intro-container");
    
    introStep.body.forEach(b => {
      const p = document.createElement("p");
      p.textContent = b.text;
      container.appendChild(p);
    });
    
    const startBtn = document.createElement("button");
    startBtn.textContent = introStep.buttons[0].text;
    startBtn.id = "start-btn";
    startBtn.addEventListener("click", () => {
      window.location.href = "experience.html";
    });
    container.appendChild(startBtn);
  } catch (error) {
    console.error("Failed to load intro:", error);
  }
}

window.addEventListener("DOMContentLoaded", loadIntro);