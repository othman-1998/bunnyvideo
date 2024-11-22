async function initShakaPlayer() {
const formatTimestamp = () => new Date().toISOString();

// Første video element
const video = document.getElementById('video');
const player = new shaka.Player(video);

player.addEventListener('error', (event) => {
console.error(`[${formatTimestamp()}] Shaka Player Error:`, event.detail);
});

video.addEventListener('loadedmetadata', () => {
console.log(`Video 1 varighed: ${video.duration} sekunder`);
});

try {
const videoUrl = 'https://vz-17fca31c-e5c.b-cdn.net/8a954696-1f72-4f3f-8c43-28187d42af1e/playlist.m3u8';

const startTime = Date.now();
console.log(`${formatTimestamp()} - Starter indlæsning af video...`);

await player.load(videoUrl);

const loadTime = Date.now() - startTime;
console.log(`${formatTimestamp()} - Videoen er indlæst og klar!`);
console.log(`Tid brugt på at indlæse video: ${loadTime} ms`);

// Overvåg progress for kun den første video
let hasLogged25Percent = false;
let hasLogged50Percent = false;
let hasLogged75Percent = false;
let hasLogged3Seconds = false;

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    const progress = video.currentTime / video.duration;

    if (!hasLogged3Seconds && currentTime >= 3) {
        hasLogged3Seconds = true;
        console.log("Video 1 har nået 3 sekunder!");
    }

    if (!hasLogged25Percent && progress >= 0.25) {
        hasLogged25Percent = true;
        console.log("Video 1 har nået 25%!");
    } else if (!hasLogged50Percent && progress >= 0.50) {
        hasLogged50Percent = true;
        console.log("video 1 har nået 50%");
    } else if(!hasLogged75Percent && progress >= 0.75) {
        hasLogged75Percent = true;
        console.log("video 1 har nået 75%");
    }
});
} catch (error) {
console.error(`${formatTimestamp()} - Fejl ved indlæsning af video:`, error);
}

}

document.addEventListener('DOMContentLoaded', initShakaPlayer);

