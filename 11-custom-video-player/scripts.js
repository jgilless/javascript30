const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

function togglePlay () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton () {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip () {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleSlider () {
    video[this.name] = this.value;
}

function handleProgress () {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = ( e.offsetX / progress.offsetWidth ) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleSlider));
ranges.forEach(range => range.addEventListener('mousemove', handleSlider));

video.addEventListener('progress', handleProgress);

let progressMouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => progressMouseDown && scrub(e));
progress.addEventListener('mousedown', () => progressMouseDown = true);
progress.addEventListener('mouseup', () => progressMouseDown = false);
progress.addEventListener('mouseout', () => progressMouseDown = false);