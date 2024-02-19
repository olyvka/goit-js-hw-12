export function createMarkup(arr) {
    return arr
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="container-additional-info">
          <div class="container-descr-inner">
            <p class="description">Likes</p>
            <span class="description-value">${likes}</span>
          </div>
          <div class="container-descr-inner">
            <p class="description">Views</p>
            <span class="description-value">${views}</span>
          </div>
          <div class="container-descr-inner">
            <p class="description">Comments</p>
            <span class="description-value">${comments}</span>
          </div>
          <div class="container-descr-inner">
            <p class="description">Downloads</p>
            <span class="description-value">${downloads}</span>
          </div>
        </div>
      </li>`
      )
      .join('');
  }