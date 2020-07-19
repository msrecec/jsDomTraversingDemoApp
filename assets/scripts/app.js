const addMovieButton = document.querySelector('header button'); //ADD MOVIE BUTTON
const addMovieModal = document.getElementById('add-modal'); //ADD MOVIE FORM
const backdrop = document.getElementById('backdrop'); //BACKDROP
const cancelMovieModal = addMovieModal.querySelector('div button'); //CANCEL MOVIE BUTTON
const addMovieModalButton = cancelMovieModal.nextElementSibling;
const movieFormContent = addMovieModal
  .querySelector('div')
  .getElementsByTagName('input'); //FORM CONTENT
const entryText = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');
const deleteModalCancel = deleteMovieModal.querySelector('button');
const deleteModalConfirm = deleteModalCancel.nextElementSibling;

let moviePom;

const removeEntryText = () => {
  entryText.style.display = 'none';
};
const addEntryText = () => {
  entryText.style.display = 'block';
};

/*
const renderNewMovieElement = (movie) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.setAttribute('id', movie.id);
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${movie.imgUrl}" alt="${movie.title}">
    </div>
    <div class="movie-element__info">
      <h2>${movie.title}</h2>
      <p>${movie.rating}/5 stars</p>
    </div>
  `;
  return newMovieElement;
};
*/

//both of these work !
const renderNewMovieElement = (movie) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.setAttribute('id', movie.id);
  newMovieElement.className = 'movie-element';

  const newMovieElementImgDiv = document.createElement('div');
  newMovieElementImgDiv.className = 'movie-element__image';
  const newMovieElementImg = document.createElement('img');
  newMovieElementImg.setAttribute('src', movie.imgUrl);
  newMovieElementImg.setAttribute('alt', movie.title);

  const newMovieElementInfo = document.createElement('div');
  newMovieElementInfo.className = 'movie-element__info';
  const newMovieElementInfoH2 = document.createElement('h2');
  newMovieElementInfoH2.textContent = movie.title;
  const newMovieElementInfoP = document.createElement('p');
  newMovieElementInfoP.textContent = `${movie.rating}/5 stars`;

  newMovieElementImgDiv.append(newMovieElementImg);
  newMovieElement.append(newMovieElementImgDiv);

  newMovieElementInfo.append(newMovieElementInfoH2);
  newMovieElementInfo.append(newMovieElementInfoP);
  newMovieElement.append(newMovieElementInfo);

  return newMovieElement;
}

const addMovie = () => {
  if (addMovieModal.className.includes('visible')) {
    for (movieForm of movieFormContent) {
      movieForm.value = '';
    }
    addMovieModal.classList.remove('visible');
  } else {
    addMovieModal.classList.add('visible');
  }
};

const addBackdrop = () => {
  if (backdrop.className.includes('visible')) {
    backdrop.classList.remove('visible');
  } else {
    backdrop.classList.add('visible');
  }
};

const backdropHandler = () => {
  if (addMovieModal.className.includes('visible')) {
    addMovie();
  } else {
    deleteMovieModalAlert();
  }
  addBackdrop();
  moviePom = null;
};

const addMovieHandler = () => {
  addMovie();
  addBackdrop();
  moviePom = null;
};

deleteMovieModalAlert = () => {
  if (deleteMovieModal.className.includes('visible')) {
    deleteMovieModal.classList.remove('visible');
  } else {
    deleteMovieModal.classList.add('visible');
  }
};

const deleteMovieModalAlertHandler = () => {
  deleteMovieModalAlert();
  addBackdrop();
};

const removeMovieButton = (movie) => {
  deleteMovieModalAlertHandler();
  moviePom = movie;
};

const removeMovieButtonHandler = () => {
  const parentElement = moviePom.parentElement;
  moviePom.removeEventListener('click', removeMovieButton);
  parentElement.removeChild(moviePom);
  if (parentElement.children.length === 0) {
    addEntryText();
  }
  deleteMovieModalAlert();
  addBackdrop();
  moviePom = null;
};

const addMovieButtonHandler = () => {
  const movieTitle = movieFormContent[0].value;
  const movieImgUrl = movieFormContent[1].value;
  const movieRating = movieFormContent[2].value;

  if (
    movieTitle === '' ||
    movieImgUrl === '' ||
    movieRating.toString() === '' ||
    movieRating < 1 ||
    movieRating > 5
  ) {
    alert('Something went wrong!');
    return;
  }

  const movie = {
    id: Math.random().toString(),
    title: movieTitle,
    imgUrl: movieImgUrl,
    rating: movieRating,
  };
  addMovieHandler();
  removeEntryText();
  const newMovie = renderNewMovieElement(movie);
  newMovie.addEventListener('click', removeMovieButton.bind(null, newMovie));
  movieList.append(newMovie);
};

addMovieButton.addEventListener('click', addMovieHandler);
backdrop.addEventListener('click', backdropHandler);
cancelMovieModal.addEventListener('click', addMovieHandler);
addMovieModalButton.addEventListener('click', addMovieButtonHandler);
deleteModalCancel.addEventListener('click', deleteMovieModalAlertHandler);
deleteModalConfirm.addEventListener('click', removeMovieButtonHandler);
