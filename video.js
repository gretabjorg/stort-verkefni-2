class Videospilari {

  load() {
    this.container = document.querySelector('main');

    this.loadVideos();
  }
  createVideosite(title, videos) {
    const videoDiv = document.createElement('div');
    const videoH2 = document.createElement('h2');
    const videosDiv = document.createElement('div');

    videoDiv.className = 'video__category';
    videosDiv.className = 'videos__category';
    videoH2.textContent = title;

    videoDiv.appendChild(videoH2);

    videoDiv.appendChild(videosDiv);
    this.container.appendChild(videoDiv);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const myndbond = new Videospilari();
  myndbond.load();
});
