/*eslint linebreak-style: ["error", "windows"]*/

class MyndbandaSyning {

  load() {
    this.container = document.querySelector('main');
    // video id er substrengur get strengs fra 4. staf
    this.videoId = parseInt(window.location.search.substr(4), 10);
    this.video = null;
    this.videoElement = null;
    this.loadVideos();
  }

  loadVideos() {
    const request = new XMLHttpRequest();

    request.open('GET', './videos.json', true);
    request.onload = this.parseVideosJson.bind(this);

    request.onerror = function() {
      console.error('Óþekkt villa');
      results.appendChild(document.createTextNode('Óþekkt villa'));
    }

    request.send();
  }

  playVideo(element) {
    element.play();
    // this.hideDiv(this.videoOverlay);
  }

  hideDiv(div) {
    div.classList.add('invisible');
  }

  createPlayer(title) {
    if (this.video) {
      // Teikna upp video player med HTML sem er skilgreint nu thegar i videos.html
      this.videoContainer = document.createElement('div');
      this.videoTitle = document.createElement('h2');
      this.videoOverlay = document.createElement('div');
      this.videoPlayer = document.createElement('div');
      this.videoElement = document.createElement('video');

      this.videoContainer.className = 'video__container';
      this.videoTitle.className = 'video__title';
      this.videoElement.className = 'video';
      this.videoOverlay.className = 'video__overlay';
      this.videoPlayer.className = 'video__player';

      this.videoTitle.textContent = title;

      this.videoContainer.appendChild(this.videoTitle);
      this.videoPlayer.appendChild(this.videoElement);
      this.videoElement.src = this.video.video;
      this.videoPlayer.appendChild(this.videoOverlay);
      this.videoContainer.appendChild(this.videoPlayer);


      const objectDiv = document.createElement('div');
      const objBack = document.createElement('img');
      const objPause = document.createElement('img');
      const objPlay = document.createElement('img');
      const objUnmute = document.createElement('img');
      const objMute = document.createElement('img');
      const objFullscreen = document.createElement('img');
      const objNext = document.createElement('img');

      objectDiv.className = 'valmynd';
      objBack.className = 'imgValmynd';
      objPause.className = 'imgValmynd';
      objPlay.className = 'play__button';
      objUnmute.className = 'imgValmynd';
      objMute.className = 'imgValmynd';
      objFullscreen.className = 'imgValmynd';
      objNext.className = 'imgValmynd';

      objBack.id = 'back__button';
      objPause.id = 'pause__button';
      objPlay.id = 'play__button';
      objUnmute.id = 'unmute__button';
      objMute.id = 'mute__button';
      objFullscreen.id = 'fullscreen__button';
      objNext.id = 'next__button';

      objBack.src = 'img/back.svg';
      objPause.src = 'img/pause.svg';
      objPlay.src = 'img/play.svg';
      objUnmute.src = 'img/unmute.svg';
      objMute.src = 'img/mute.svg';
      objFullscreen.src = 'img/fullscreen.svg';
      objNext.src = 'img/next.svg';

      objectDiv.appendChild(objBack);
      objectDiv.appendChild(objPause);
      this.videoOverlay.appendChild(objPlay);
      objectDiv.appendChild(objUnmute);
      objectDiv.appendChild(objMute);
      objectDiv.appendChild(objFullscreen);
      objectDiv.appendChild(objNext);

      this.videoElement.pause();

      this.videoOverlay.addEventListener('click', this.videoElement.play());

      this.container.appendChild(this.videoContainer);
      this.container.appendChild(objectDiv);
    } else {
      const errorContainer = document.createElement('div');
      const errorText = document.createElement('p');

      errorContainer.className = 'error';

      errorText.innerHTML = 'Myndband fannst ekki';

      errorContainer.appendChild(errorText);

      this.container.appendChild(errorContainer);
    }
    const tilbakaDiv = document.createElement('div');
    const linkur = document.createElement('a');

    tilbakaDiv.className = 'TilBaka';

    linkur.setAttribute('href', 'index.html');
    linkur.innerHTML = 'Til baka';
    tilbakaDiv.appendChild(linkur);

    this.container.appendChild(tilbakaDiv);
  }

  parseVideosJson(e) {
    const request = e.target;
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.response);
      this.playVideos = data.playVideos;

      // Geymum video i this.videos array
      for (const videoKey in data.videos) {
        if (data.videos[videoKey].id === this.videoId) {
          this.video = data.videos[videoKey];
        }
      }
    }
    this.createPlayer();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const myndbond = new MyndbandaSyning();
  myndbond.load();
});
