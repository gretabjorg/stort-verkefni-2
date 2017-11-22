class Myndbandaleiga {

  // Hleður inn thumbnails: poster, title, date, undir hverju category fyrir sig.
  // TODO: Setja link á poster sem hleður inn öðrum glugga => media palyer.
  // TODO: Bua til videos ut fra videos.json

  load() {
    this.container = document.querySelector('main');
    this.categories = [];
    this.videos = [];
    this.loadVideos();
  }

  // Býr til category elements í HTML.

  createVideoCategory(title, videos) {
    const categoryDiv = document.createElement('div');
    const category = document.createElement('h2');
    const posterDiv = document.createElement('div');

    categoryDiv.className = 'video__category';
    posterDiv.className = 'video__posters';
    category.textContent = title;

    categoryDiv.appendChild(category);

    // TODO: Þarf að þýða video.created yfir í dagsetningu.

    for (const key in videos) {
      const video = videos[key];
      posterDiv.appendChild(this.createPoster(video.poster, video.title, video.created));
    }

    categoryDiv.appendChild(posterDiv);
    this.container.appendChild(categoryDiv);
  }

  // Býr til poster elements i HTML.

  createPoster(image, title, date) {
    const videoPoster = document.createElement('div');
    const posterImg = document.createElement('img');
    const videoTitle = document.createElement('span');
    const videoDate = document.createElement('span');

    videoPoster.className = 'video__poster';
    posterImg.className = 'poster__img';
    videoTitle.className = 'video__title';
    videoDate.className = 'video__date';

    posterImg.src = image;
    videoTitle.textContent = title;
    videoDate.textContent = date;

    videoPoster.appendChild(posterImg);
    videoPoster.appendChild(videoTitle);
    videoPoster.appendChild(videoDate);

    return videoPoster;
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

  parseVideosJson(e) {
    const request = e.target;
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.response);
      this.categories = data.categories;

      // Geymum video i this.videos array
      for (const videoKey in data.videos) {
        this.videos[data.videos[videoKey].id] = data.videos[videoKey];
      }

      // Buum til category i html fyrir hvert video category
      for (const i in data.categories) {
        const videoArray = [];
        for (const j in data.categories[i].videos) {
          videoArray.push(this.videos[data.categories[i].videos[j]]);
        }
        this.createVideoCategory(data.categories[i].title, videoArray);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const myndbond = new Myndbandaleiga();
  myndbond.load();
});
