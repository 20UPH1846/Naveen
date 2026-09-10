// Get name from URL
const urlParams = new URLSearchParams(window.location.search);
const personName = urlParams.get('name') || 'My Beloved';
document.getElementById('personName').textContent = personName;
document.title = `💕 A Surprise for ${personName}`;

// Music button: clicking it should take the visitor straight to YouTube
// and play the song there — no download, no in-page synth audio.
const musicToggle = document.getElementById('musicToggle');
const SONG_URL = 'https://www.youtube.com/watch?v=U3lyojCm6jA'; // Maruvaarthai - Sid Sriram

musicToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openSongOnYouTube();
});

// Touch event for mobile
musicToggle.addEventListener('touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openSongOnYouTube();
});

// Prevent double-touch issues
musicToggle.addEventListener('touchend', function(e) {
    e.preventDefault();
});

function openSongOnYouTube() {
    musicToggle.classList.add('playing');
    window.open(SONG_URL, '_blank', 'noopener,noreferrer');
    // Reset the visual "playing" pulse after a moment since playback
    // happens on the YouTube tab, not on this page.
    setTimeout(() => musicToggle.classList.remove('playing'), 1500);
}

// Create floating hearts in background
function createFloatingHearts() {
    const bgAnimation = document.getElementById('bgAnimation');
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        bgAnimation.appendChild(heart);
    }
}

// Create floating hearts in container
function createContainerHearts() {
    const container = document.getElementById('floatingHearts');
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-icon';
        heart.textContent = '💕';
        heart.style.left = Math.random() * 90 + 5 + '%';
        heart.style.top = Math.random() * 90 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (5 + Math.random() * 3) + 's';
        container.appendChild(heart);
    }
}

// Share functionality
function shareThis() {
    const url = window.location.href;
    const text = `💕 I received this beautiful surprise... Open it with your heart: ${url}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'A Beautiful Surprise',
            text: text,
            url: url
        }).catch(err => {
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
                copyUrlToClipboard();
            }
        });
    } else {
        copyUrlToClipboard();
    }
}

function copyUrlToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('✨ Link copied! Share it with someone special! 💕');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Share this link: ' + url);
    });
}

// Download poem
function downloadPoem() {
    const poem = document.getElementById('poemText').textContent;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(poem));
    element.setAttribute('download', 'love_poem_' + personName + '.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Prevent body scroll when music button active
document.addEventListener('touchmove', function(e) {
    if (musicToggle.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createContainerHearts();
});

