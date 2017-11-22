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
    // TODO: Lesa inn videos.json
    // TODO: Setja link á poster sem hleður inn öðrum glugga => media palyer.
    // TODO: Bua til videos ut fra videos.json

    value: function load() {
      this.container = document.querySelector('main');

      var videosNytt = [{
        'poster': './videos/small.png',
        'title': 'Lego!',
        'date': 1509804047011
      }, {
        'poster': './videos/bunny.png',
        'title': 'Big Bunny',
        'date': 1507804047011
      }];
      this.createVideoCategory('Nýleg myndbönd', videosNytt);

      var videosKennsla = [{
        'poster': './videos/small.png',
        'title': 'Lego!',
        'date': 1509804047011
      }, {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband',
        'date': 1505904047011
      }, {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband með löngum texta sem fer í tvær línur',
        'date': 1504904047011
      }];
      this.createVideoCategory('Kennslumyndbönd', videosKennsla);

      var videosSkemmti = [{
        'poster': './videos/bunny.png',
        'title': 'Big Bunny',
        'date': 1507804047011
      }, {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband',
        'date': 1505904047011
      }, {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband með löngum texta sem fer í tvær línur',
        'date': 1504904047011
      }];
      this.createVideoCategory('Skemmtimyndbönd', videosSkemmti);
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
        posterDiv.appendChild(this.createPoster(video.poster, video.title, video.date));
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
      videoPoster.appendChild(videoDate);

      return videoPoster;
    }
  }]);

  return Myndbandaleiga;
}();

document.addEventListener('DOMContentLoaded', function () {
  var myndbond = new Myndbandaleiga();
  myndbond.load();
});

//# sourceMappingURL=script-compiled.js.map