//console.log("It starts!");

let currentlyPlayingVideo = null;

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
   CREATE VIDEO SECTION
========================= */
function createVideoSection(card) {
    if (!card.video || !card.video.trim()) return null;

    const videoWrapper = document.createElement("div");
    videoWrapper.className = "card-video";

    const video = document.createElement("video");
    video.src = card.video;
    video.controls = true;
    video.preload = "metadata";

    // Use card.image for poster, fallback to error.jpg
    video.poster = card.image && card.image.trim() ? `cardsPng/${card.image}` : 'cardsPng/error.jpg';

    video.addEventListener("play", () => {
        if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
            currentlyPlayingVideo.pause();
        }
        currentlyPlayingVideo = video;
    });

    // Remove video if it fails to load
    video.onerror = () => videoWrapper.remove();

    videoWrapper.appendChild(video);
    return videoWrapper;
}
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
// IMAGE TITLE (exists in DOM, hidden by default)
const imgTitle = document.createElement("div");
imgTitle.className = "card-image-title";
imgTitle.style.display = "none";
imgTitle.textContent = "";


    
    const firstLine=document.createElement("hr")
    firstLine.style.width="50%"
    firstLine.style.height="2px"
    firstLine.style.borderRadius="2px"
    firstLine.style.border="none"
    firstLine.style.backgroundColor="#00ACFF"
    

    
    

    // SENTENCE
    const sentenceDiv = document.createElement("div");
    sentenceDiv.className = "card-sentence";
    sentenceDiv.innerHTML = card.sentence && card.sentence.trim() ? card.sentence : "....";

    // ENGLISH
    const englishDiv = document.createElement("div");
    englishDiv.className = "card-sentence english-translation";
    englishDiv.innerHTML = card.englishTr && card.englishTr.trim() ? card.englishTr : "....";
    
    
    const secLine=document.createElement("hr")
    secLine.style.width="50%"
    secLine.style.height="2px"
    secLine.style.borderRadius="2px"
    secLine.style.border="none"
    secLine.style.backgroundColor="#00ACFF"
    


    // VIDEO TITLE
    const videoTitle = document.createElement("div");
    videoTitle.className = "card-video-title";
    videoTitle.textContent = ""; // empty by default

    // VIDEO
    let videoSection = null;
    if (card.video && card.video.trim()) {
        videoSection = document.createElement("div");
        videoSection.className = "card-video";

        const video = document.createElement("video");
        video.src = card.video;
        video.controls = true;
        video.preload = "metadata";
        video.poster = card.image && card.image.trim() ? `cardsPng/${card.image}` : 'cardsPng/error.jpg';

        video.addEventListener("play", () => {
            if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
                currentlyPlayingVideo.pause();
            }
            currentlyPlayingVideo = video;
        });

        // Only show title if video loads successfully
        video.addEventListener("loadedmetadata", () => {
            videoTitle.style.display="block"
            
            const capitalizedVidoTitle =
    card.word.charAt(0).toUpperCase() + card.word.slice(1);


            
            
            videoTitle.textContent = `🎥 Video about " ${capitalizedVidoTitle} " :`;
            secLine.style.display="block"
        });

        // Remove video and title if it fails to load
        video.onerror = () => {
            videoSection.remove();
            videoTitle.style.display="none"
            videoTitle.textContent = "";
            secLine.style.display="none"
        };

        videoSection.appendChild(video);
    }

    // ASSEMBLE CARD
    cardDiv.append(counterDiv);
    cardDiv.append(header);
    
    
    
    // IMAGE WRAPPER
const imageWrapper = document.createElement("div");
imageWrapper.className = "card-image";

// APPEND TITLE FIRST (IMPORTANT)
cardDiv.append(imgTitle);
cardDiv.append(imageWrapper);

// IMAGE
const img = document.createElement("img");
img.src = `cardsPng/${card.image}`;
img.alt = card.word;

const emojiBig = document.createElement("div");
emojiBig.className = "emoji-fallback";
emojiBig.textContent = card.emoji;

// IMAGE SUCCESS
img.onload = () => {
    imageWrapper.appendChild(img);
    const capitalizedImageTitle =
    card.word.charAt(0).toUpperCase() + card.word.slice(1);
    
    imgTitle.textContent = `🖼️ Image about " ${capitalizedImageTitle} " :`;
    imgTitle.style.display = "block";
};

// IMAGE FAIL
img.onerror = () => {
    imageWrapper.appendChild(emojiBig);

    imgTitle.textContent = "";
    imgTitle.style.display = "none";
};
    
    
    
    
    
    
    
    //cardDiv.append(imageWrapper);
    cardDiv.append(firstLine);
    
    
    
    
    const examplesTitle = document.createElement("div");
examplesTitle.className = "card-examples-title";
examplesTitle.style.display = "block";

const capitalizedWord =
    card.word.charAt(0).toUpperCase() + card.word.slice(1);


examplesTitle.textContent = `📜 " ${capitalizedWord} " in 2 Languages :`;
    cardDiv.append(examplesTitle);
    cardDiv.append(sentenceDiv);
    cardDiv.append(englishDiv);
    
    
    
    
    
    if (videoSection) {
        
        cardDiv.append(secLine);
        
        cardDiv.append(videoTitle); // append title
        cardDiv.append(videoSection); // append video below sentences
    }
    
    
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

        
        const spacePlace=document.createElement('br')
        
        

// Append main and English stories to container
storyContainer.append(mainStoryDiv,spacePlace, englishStoryDiv);

// Toggle button click
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

// Append button and container below video (or fallback position)
if (videoSection) {
    cardDiv.append(storyButton);
    cardDiv.append(storyContainer);
} else {
    cardDiv.append(storyButton);
    cardDiv.append(storyContainer);
}
    
    
    
    


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
