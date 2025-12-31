//console.log("It starts!");

/* =========================
   THEME TOGGLE
========================= */
const themeToggleBtn = document.getElementById("themeToggle");

// Load saved theme from localStorage if exists
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

// Toggle theme on click
themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);

    // Change button icon
    themeToggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";

    // Save preference
    localStorage.setItem("theme", newTheme);
});

//console.log("It starts!");
const navbar = document.getElementById("navbar");


const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");

// Update the all-cards title dynamically
const allCardsTitle = document.getElementById("all-cards-title");

// Count all cards
const totalCards = cardsData.length;

// Capitalize first letter if needed
allCardsTitle.textContent = `📚 All Emoji Cards [ ${totalCards} ] :`;

/* =========================
   CREATE CARD (USED EVERYWHERE)
========================= */
function createCard(card, index, removable = false) { // added index
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    // HEADER
    const header = document.createElement("div");
    header.className = "card-header";

    const emojiSmall = document.createElement("div");
    emojiSmall.className = "card-emoji";
    emojiSmall.textContent = card.emoji;

    const counterDiv = document.createElement("div");
    counterDiv.id="counterDiv"
    counterDiv.className = "card-counter";
    counterDiv.textContent = `[ ${index + 1} ]`; // counter [1], [2], [3]...

    const wordWrap = document.createElement("div");
    wordWrap.className = "card-word-wrap";

    const word = document.createElement("div");
    word.className = "card-word";
    word.textContent = card.word.charAt(0).toUpperCase() + card.word.slice(1);

    const ipa = document.createElement("div");
    ipa.className = "card-ipa";
    ipa.textContent = card.ipa;

    wordWrap.append(word, ipa);
    header.append(emojiSmall, wordWrap); // append counter in header

    // IMAGE TITLE (hidden by default)
    const imgTitle = document.createElement("div");
    imgTitle.className = "card-image-title";
    imgTitle.style.display = "none";
    imgTitle.textContent = "";

    const firstLine=document.createElement("hr")
    firstLine.className = "firstLine";


    // ASSEMBLE CARD HEADER
    cardDiv.append(counterDiv);
    cardDiv.append(header);

    // IMAGE WRAPPER
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "card-image";

    cardDiv.append(imgTitle);
    cardDiv.append(imageWrapper);

    // IMAGE
    const img = document.createElement("img");
    img.src = `cardsPng/${card.image}`;
    img.alt = card.word;

    const emojiBig = document.createElement("div");
    emojiBig.className = "emoji-fallback";
    emojiBig.textContent = card.emoji;

    img.onload = () => {
        imageWrapper.appendChild(img);
        const capitalizedImageTitle =
        card.word.charAt(0).toUpperCase() + card.word.slice(1);
        
        imgTitle.textContent = `🖼️ Image about " ${capitalizedImageTitle} " :`;
        imgTitle.style.display = "block";
    };

    img.onerror = () => {
        imageWrapper.appendChild(emojiBig);
        imgTitle.textContent = "";
        imgTitle.style.display = "none";
    };

    cardDiv.append(firstLine);

    
    // =========================
    // EXAMPLES CONTAINERS
    // =========================

    // Main Example
    const mainExampleDiv = document.createElement("div");
    mainExampleDiv.className = "main-example";

    const mainExampleTitle = document.createElement("div");
    mainExampleTitle.className = "example-title";
    mainExampleTitle.textContent = "French Example:";

    const mainExampleContent = document.createElement("div");
    mainExampleContent.className = "example-content";
    mainExampleContent.innerHTML = card.sentence && card.sentence.trim() ? card.sentence : "No example available.";

    mainExampleDiv.append(mainExampleTitle, mainExampleContent);

    // English Example
    const englishExampleDiv = document.createElement("div");
    englishExampleDiv.className = "english-example";

    const englishExampleTitle = document.createElement("div");
    englishExampleTitle.className = "example-title";
    englishExampleTitle.textContent = "English Example:";

    const englishExampleContent = document.createElement("div");
    englishExampleContent.className = "example-content";
    englishExampleContent.innerHTML = card.englishTr && card.englishTr.trim() ? card.englishTr : "No example available.";

    englishExampleDiv.append(englishExampleTitle, englishExampleContent);

    // Append below examples title
    cardDiv.append(mainExampleDiv);
    cardDiv.append(englishExampleDiv);

    // =========================
    // STORY TOGGLE BUTTON
    // =========================
    const storyButton = document.createElement("button");
    storyButton.className = "story-toggle-btn";
    storyButton.textContent = "Click to See The Story";

    // Story container (hidden by default)
    const storyContainer = document.createElement("div");
    storyContainer.className = "card-story-container";
    storyContainer.style.display = "none"; // initially hidden

    // Main Story
    const mainStoryDiv = document.createElement("div");
    mainStoryDiv.className = "main-story";

    const mainTitle = document.createElement("div");
    mainTitle.className = "story-title";
    mainTitle.textContent = card.mainStoryTitle && card.mainStoryTitle.trim() 
        ? card.mainStoryTitle 
        : "Main Story:";

    const mainContent = document.createElement("div");
    mainContent.className = "story-content";
    mainContent.textContent = card.mainStoryContent && card.mainStoryContent.trim() 
        ? card.mainStoryContent 
        : "No story available.";

    mainStoryDiv.append(mainTitle, mainContent);

    // English Story
    const englishStoryDiv = document.createElement("div");
    englishStoryDiv.className = "english-story";

    const englishTitle = document.createElement("div");
    englishTitle.className = "story-title";
    englishTitle.textContent = card.englishStoryTitle && card.englishStoryTitle.trim() 
        ? card.englishStoryTitle 
        : "English Story:";

    const englishContent = document.createElement("div");
    englishContent.className = "story-content";
    englishContent.textContent = card.englishStoryContent && card.englishStoryContent.trim() 
        ? card.englishStoryContent 
        : "No story available.";

    englishStoryDiv.append(englishTitle, englishContent);

    const spacePlace=document.createElement('br');

    // Append main and English stories to container
    storyContainer.append(mainStoryDiv, spacePlace, englishStoryDiv);

    // Toggle button click
    storyButton.addEventListener("click", () => {
        // Hide all other story containers first
        document.querySelectorAll(".card-story-container").forEach(container => {
            if (container !== storyContainer) {
                container.style.display = "none";
                // Reset their corresponding buttons text
                const btn = container.previousElementSibling;
                if (btn && btn.classList.contains("story-toggle-btn")) {
                    btn.textContent = "Click to See The Story";
                }
            }
        });

        // Toggle current story container
        if (storyContainer.style.display === "none") {
            storyContainer.style.display = "block";
            storyButton.textContent = "Hide The Story";
        } else {
            storyContainer.style.display = "none";
            storyButton.textContent = "Click to See The Story";
        }
    });

    // Append button and container
    cardDiv.append(storyButton);
    cardDiv.append(storyContainer);
    
    
    
    
    const containerScroll = document.createElement("div");
    containerScroll.className = "containerScroll";
    
    
    const topScroll = document.createElement("button");
    topScroll.className = "topScroll";
    topScroll.textContent = "⬆️ Top";
    containerScroll.append(topScroll);
    
    
    topScroll.addEventListener("click", () => {
    if (!navbar) return;

    navbar.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

    
    
    
    
    
    const cardScroll = document.createElement("button");
    cardScroll.className = "cardScroll";
    cardScroll.textContent = "🔼 Card";
    containerScroll.append(cardScroll);
    
    cardScroll.addEventListener("click", () => {
    
    if (!counterDiv) return;

    counterDiv.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
    
    
    
    cardDiv.append(containerScroll);
    
    

    if (removable) {
        const removeBtn = document.createElement("button");
        removeBtn.className = "download-btn";
        removeBtn.id = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => cardDiv.remove();
        cardDiv.append(removeBtn);
    }

    return cardDiv;
}

/* =========================
   MAIN CARDS RENDER
========================= */
cardsData.forEach((card, i) => {
    cardsContainer.append(createCard(card, i)); // pass index i
});

/* =========================
   SEARCH
========================= */
searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim().toLowerCase();
    searchInput.value = "";

    if (!value) return;

    const foundCards = cardsData.filter(card => {
        const mainWord = card.word.toLowerCase();
        const emojiMatch = card.emoji.includes(value);
        const englishClean = card.englishTr
            ? card.englishTr.replace(/<[^>]*>/g, "").toLowerCase()
            : "";
        return mainWord === value || emojiMatch || englishClean.includes(value);
    });

    searchResult.innerHTML = "";

    if (!foundCards.length) {
        showTempMessage("❌ This word or emoji was not found");
        return;
    }

    foundCards.forEach(card => {
        // Get index of card in the original array for consistent numbering
        const index = cardsData.indexOf(card);
        searchResult.append(createCard(card, index, true)); // pass index
    });
});

/* =========================
   TEMP MESSAGE
========================= */
function showTempMessage(text) {
    searchResult.innerHTML = "";

    const msg = document.createElement("div");
    msg.className = "temp-message";
    msg.textContent = text;

    searchResult.appendChild(msg);

    setTimeout(() => {
        if (searchResult.contains(msg)) {
            searchResult.innerHTML = "";
        }
    }, 4000);
}

/* =========================
   FOOTER YEAR
========================= */
document.getElementById("year").textContent = new Date().getFullYear();
