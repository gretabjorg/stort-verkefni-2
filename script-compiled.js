'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Myndbandaleiga = function () {
  function Myndbandaleiga() {
    _classCallCheck(this, Myndbandaleiga);
  }

  _createClass(Myndbandaleiga, [{
    key: 'load',


    // Hleður inn thumbnails: poster, title, date, undir hverju category fyrir sig.
    // TODO: Setja link á poster sem hleður inn öðrum glugga => media palyer.
    // TODO: Bua til videos ut fra videos.json

    value: function load() {
      this.container = document.querySelector('main');
      this.categories = [];
      this.videos = [];
      this.loadVideos();
    }
  }, {
    key: 'reiknaDagsetningu',
    value: function reiknaDagsetningu(milliseconds) {
      var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

      if (days < 7) {
        return days + ' dögum';
      } else if (days < 30) {
        var weeks = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 7));
        if (weeks === 1) {
          return weeks + ' viku';
        } else {
          return weeks + ' vikum';
        }
      } else if (days < 365) {
        var month = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 30));
        if (month === 1) {
          return month + ' mánuði';
        } else {
          return month + ' mánuðum';
        }
      } else {
        var year = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 365));
        if (year === 1) {
          return year + ' ári';
        } else {
          return year + ' árum';
        }
      }
    }

    // Býr til category elements í HTML.

  }, {
    key: 'createVideoCategory',
    value: function createVideoCategory(title, videos) {
      var categoryDiv = document.createElement('div');
      var category = document.createElement('h2');
      var posterDiv = document.createElement('div');

      categoryDiv.className = 'video__category';
      posterDiv.className = 'video__posters';
      category.textContent = title;

      categoryDiv.appendChild(category);

      for (var key in videos) {
        var video = videos[key];

        posterDiv.appendChild(this.createPoster(video.poster, video.title, 'Fyrir ' + this.reiknaDagsetningu(Date.now() - video.created) + ' síðan'));
        console.log(Date.now() - video.created);
      }

      categoryDiv.appendChild(posterDiv);
      this.container.appendChild(categoryDiv);
    }

    // Býr til poster elements i HTML.

  }, {
    key: 'createPoster',
    value: function createPoster(image, title, date) {
      var videoPoster = document.createElement('div');
      var posterImg = document.createElement('img');
      var videoTitle = document.createElement('span');
      var breakElement = document.createElement('br');
      var videoDate = document.createElement('span');

      videoPoster.className = 'video__poster';
      posterImg.className = 'poster__img';
      videoTitle.className = 'video__title';
      videoDate.className = 'video__date';

      posterImg.src = image;
      videoTitle.textContent = title;
      videoDate.textContent = date;

      videoPoster.appendChild(posterImg);
      videoPoster.appendChild(videoTitle);
      videoPoster.appendChild(breakElement);
      videoPoster.appendChild(videoDate);

      var target = posterImg;
      var wrap = document.createElement('a');
      wrap.setAttribute('href', 'video.html');

      target.parentNode.replaceChild(wrap, target);
      wrap.appendChild(target);

      return videoPoster;
    }
  }, {
    key: 'loadVideos',
    value: function loadVideos() {
      var request = new XMLHttpRequest();

      request.open('GET', './videos.json', true);
      request.onload = this.parseVideosJson.bind(this);

      request.onerror = function () {
        console.error('Óþekkt villa');
        results.appendChild(document.createTextNode('Óþekkt villa'));
      };

      request.send();
    }
  }, {
    key: 'parseVideosJson',
    value: function parseVideosJson(e) {
      var request = e.target;
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.response);
        this.categories = data.categories;

        // Geymum video i this.videos array
        for (var videoKey in data.videos) {
          this.videos[data.videos[videoKey].id] = data.videos[videoKey];
        }

        // Buum til category i html fyrir hvert video category
        for (var i in data.categories) {
          var videoArray = [];
          for (var j in data.categories[i].videos) {
            videoArray.push(this.videos[data.categories[i].videos[j]]);
          }
          this.createVideoCategory(data.categories[i].title, videoArray);
        }
      }
    }
  }]);

  return Myndbandaleiga;
}();

document.addEventListener('DOMContentLoaded', function () {
  var myndbond = new Myndbandaleiga();
  myndbond.load();
});

//# sourceMappingURL=script-compiled.js.map