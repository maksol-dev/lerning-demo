const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTImeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//music song
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Jacinto D',
    },
    {
        name:'jacinto-2',
        displayName:'Seven NAtion Army (Remix)',
        artist:'Jacinto Design',
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight, Disco Queen',
        artist:'HR',
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
        artist:'Metrix/Jactico Design',
    }
];

// Condition Check PLaying
let isPlaying = false;

//play section
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
}
 
// pause section
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
  
} 

// play and Pause Test
playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()));


//Update DoM
function loadSong(song) {
 title.textContent = song.displayName;
 artist.textContent  = song.artist;
 music.src = `music/${song.name}.mp3`;
 image.src = `img/${song.name}.jpg`;    
}
//current song
let songIndex = 0;

// previous Song
function prevSong(){
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}
// next Song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }  
    loadSong(songs[songIndex]);
    playSong();
}
// on-Load -Select First Song

loadSong(songs[songIndex]);


// update Progress bar For time
function updateProgressBar(e){
    if(isPlaying){
        const { duration, currentTime  } = e.srcElement;

        // update Progress Bar WIdth
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // calculate Display Duration
        const durationMinutes = Math.floor(duration / 60);
       
        let durationSeconds = Math.floor(duration %  60);
        if (durationSeconds <10 ) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        //Delay NAN Switching 
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate Display Duration
        const currentMinutes = Math.floor(currentTime / 60);
        
        let currentSeconds = Math.floor(currentTime %  60);
        if (currentSeconds <10 ) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTImeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// set progress Bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration ;
}

//event >listener
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);

