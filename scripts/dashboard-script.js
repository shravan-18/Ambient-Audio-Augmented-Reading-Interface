const books = {
    book1: {
        title: "Book 1",
        chapters: [
            { title: "Chapter 1", page: "This is the content of Chapter 1 of Book 1." },
            { title: "Chapter 2", page: "This is the content of Chapter 2 of Book 1." }
        ]
    },
    book2: {
        title: "Book 2",
        chapters: [
            { title: "Chapter 1", page: "This is the content of Chapter 1 of Book 2." },
            { title: "Chapter 2", page: "This is the content of Chapter 2 of Book 2." }
        ]
    }
};

let currentBook = null;
let currentChapterIndex = 0;
function openBook(bookId) {
    currentBook = books[bookId];
    currentChapterIndex = 0;
    showChapter();
    document.getElementById('bookModal').style.display = 'flex';
    loadProgress(bookId);
}
function showChapter() {
    const chapter = currentBook.chapters[currentChapterIndex];
    document.getElementById('book-title').innerText = currentBook.title;
    document.getElementById('chapter-title').innerText = chapter.title;
    document.getElementById('page-content').innerText = chapter.page;
    const prevButton = document.querySelector('.controls button:first-of-type');
    prevButton.style.display = currentChapterIndex === 0 ? 'none' : 'inline-block';
    const nextButton = document.querySelector('.controls button:last-of-type');
    nextButton.style.display = currentChapterIndex === currentBook.chapters.length - 1 ? 'none' : 'inline-block';
}
/*
let speechSynthesisUtterance = null;
function readChapter() {
    const chapterText = "Hello! This is a test for text-to-speech functionality."; // Hardcoded for testing

    // Check if the browser supports speech synthesis
    if (!window.speechSynthesis) {
        console.error("Speech Synthesis API not supported by this browser.");
        alert("Your browser does not support text-to-speech functionality.");
        return;
    }

    // Cancel any existing speech synthesis (if a user clicks multiple times)
    if (speechSynthesisUtterance) {
        window.speechSynthesis.cancel();
    }

    // Create a new SpeechSynthesisUtterance
    speechSynthesisUtterance = new SpeechSynthesisUtterance(chapterText);
    speechSynthesisUtterance.lang = 'en-US'; // Set language
    speechSynthesisUtterance.volume = 1;      // Volume (0 to 1)
    speechSynthesisUtterance.pitch = 1;       // Pitch (0 to 2)
    speechSynthesisUtterance.rate = 1;        // Rate (0.1 to 10)

    // Attempt to set the voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speechSynthesisUtterance.voice = voices[0]; // Use the first available voice
    } else {
        console.warn("No voices available. Using default system voice.");
    }

    console.log("Starting to speak...");

    // Start speaking the text
    window.speechSynthesis.speak(speechSynthesisUtterance);

    // Log when speech ends
    speechSynthesisUtterance.onend = () => {
        console.log("Speech has finished.");
    };

    // Log any errors
    speechSynthesisUtterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
    };
}

// Load voices when the page is loaded
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded.");
};
*/
function closeModal() {
    document.getElementById('bookModal').style.display = 'none';

    // Stop any ongoing speech when the modal is closed
    if (speechSynthesisUtterance) {
        window.speechSynthesis.cancel();
    }
}
function previousPage() {
    if (currentChapterIndex > 0) {
        currentChapterIndex--;
        showChapter();
        saveProgress();
    }
}
function nextPage() {
    if (currentChapterIndex < currentBook.chapters.length - 1) {
        currentChapterIndex++;
        showChapter();
        saveProgress();
    }
}
function saveProgress() {
    const progress = ((currentChapterIndex + 1) / currentBook.chapters.length) * 100;
    localStorage.setItem(currentBook.title + '_progress', progress);
    document.getElementById(currentBook.title.toLowerCase().replace(' ', '') + '-progress').innerText = `progress ${progress.toFixed(0)}%`;
}
function loadProgress(bookId) {
    const storedProgress = localStorage.getItem(books[bookId].title + '_progress');
    if (storedProgress) {
        document.getElementById(bookId + '-progress').innerText = `progress ${parseFloat(storedProgress).toFixed(0)}%`;
    }
}
