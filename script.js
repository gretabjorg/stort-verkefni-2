class Myndbandaleiga {

  // Hleður inn thumbnails: poster, title, date, undir hverju category fyrir sig.
  // TODO: Lesa inn videos.json
  // TODO: Setja link á poster sem hleður inn öðrum glugga => media palyer.
  // TODO: Bua til videos ut fra videos.json

  load() {
    this.container = document.querySelector('main');

    const videosNytt = [{
        'poster': './videos/small.png',
        'title': 'Lego!',
        'date': 1509804047011
      },
      {
        'poster': './videos/bunny.png',
        'title': 'Big Bunny',
        'date': 1507804047011
      }
    ];
    this.createVideoCategory('Nýleg myndbönd', videosNytt);

    const videosKennsla = [{
        'poster': './videos/small.png',
        'title': 'Lego!',
        'date': 1509804047011
      },
      {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband',
        'date': 1505904047011
      },
      {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband með löngum texta sem fer í tvær línur',
        'date': 1504904047011
      }
    ];
    this.createVideoCategory('Kennslumyndbönd', videosKennsla);

    const videosSkemmti = [{
        'poster': './videos/bunny.png',
        'title': 'Big Bunny',
        'date': 1507804047011
      },
      {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband',
        'date': 1505904047011
      },
      {
        'poster': './videos/16-9.png',
        'title': 'Prufu myndband með löngum texta sem fer í tvær línur',
        'date': 1504904047011
      }
    ];
    this.createVideoCategory('Skemmtimyndbönd', videosSkemmti);
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
      posterDiv.appendChild(this.createPoster(video.poster, video.title, video.date));
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
}

document.addEventListener('DOMContentLoaded', () => {
  const myndbond = new Myndbandaleiga();
  myndbond.load();
});
