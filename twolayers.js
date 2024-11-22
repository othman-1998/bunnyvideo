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
        const videoUrl = 'https://vz-17fca31c-e5c.b-cdn.net/d519e7a3-9904-41cd-97f3-40493e34e1e5/playlist.m3u8';

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

    // Andet video element
    // const video2 = document.getElementById('video2');
    // const player2 = new shaka.Player(video2);

    // player2.addEventListener('error', (event) => {
    //     console.error(`${formatTimestamp()} - Shaka Player Error:`, event.detail);
    // });

    // try {
    //     const videoUrl2 = 'https://vz-33a349bd-10a.b-cdn.net/39bc78fe-b6ec-4986-9707-89b253dd54fd/playlist.m3u8';
    //     console.log(`${formatTimestamp()} - Starter indlæsning af video2...`);
    //     await player2.load(videoUrl2);
    //     console.log(`${formatTimestamp()} - Video2 er indlæst og klar!`);
    // } catch (error) {
    //     console.error(`${formatTimestamp()} - Fejl ved indlæsning af video2:`, error);
    // }
}

document.addEventListener('DOMContentLoaded', initShakaPlayer);


// se om vi kan lave en demo med html5 video og på den måde sammenligne det 
// se om vi kan load videoen med dt samme


// få tog videoen til at fylde 3mb 
// skab bunny projekt og et alm html video projekt og se hastigheden 
// kig network og se om jeg kan få den til at vise en video så hurtigt muligt 
