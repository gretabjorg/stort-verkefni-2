/*eslint linebreak-style: ["error", "windows"]*/

class Myndbandaleiga {

  // Hleður inn thumbnails: poster, title, date, undir hverju category fyrir sig.
  // TODO: Bua til videos ut fra videos.json
  // TODO: láta controls takka virka á spilað video.

  load() {
    this.container = document.querySelector('main');
    this.categories = [];
    this.videos = [];
    this.loadVideos();
  }

  reiknaDagsetningu(milliseconds) {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    if (days < 7) {
      return `${days} dögu`;
    } else if (days < 30) {
      const weeks = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 7));
      if (weeks === 1) {
        return `${weeks} viku`;
      }
      return `${weeks} vikum`;
    } else if (days < 365) {
      const month = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 30));
      if (month === 1) {
        return `${month} mánuði`;
      }
      return `${month} mánuðum`;
    }
    const year = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 365));
    if (year === 1) {
      return `${year} ári`;
    }
    return `${year} árum`;
  }

  videoLength(time) {
    var hours = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    var ret = "";

    if (hours > 0) {
      ret += "" + hours + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
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

    for (const key in videos) {
      const video = videos[key];

      posterDiv.appendChild(this.createPoster(video.poster, video.title, 'Fyrir ' +
        this.reiknaDagsetningu(Date.now() - video.created) + ' síðan', this.videoLength(video.duration),
        video.id));
    }

    categoryDiv.appendChild(posterDiv);
    this.container.appendChild(categoryDiv);
  }

  // Býr til poster elements i HTML.

  createPoster(image, title, date, time, videoId) {
    const videoPoster = document.createElement('div');
    const posterImg = document.createElement('img');
    const videoTitle = document.createElement('span');
    const breakElement = document.createElement('br');
    const videoDate = document.createElement('span');
    const videoDuration = document.createElement('p');

    videoPoster.className = 'video__poster';
    posterImg.className = 'poster__img';
    videoTitle.className = 'video__title';
    videoDate.className = 'video__date';
    videoDuration.className = 'video__duration';

    posterImg.src = image;
    videoTitle.textContent = title;
    videoDate.textContent = date;
    videoDuration.textContent = time;

    videoPoster.appendChild(videoDuration);
    videoPoster.appendChild(posterImg);
    videoPoster.appendChild(videoTitle);
    videoPoster.appendChild(breakElement);
    videoPoster.appendChild(videoDate);

    const target = posterImg;
    const wrap = document.createElement('a');
    wrap.setAttribute('href', 'video.html?id=' + videoId);

    target.parentNode.replaceChild(wrap, target);
    wrap.appendChild(target);

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
