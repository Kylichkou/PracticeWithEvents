/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    // попробовать сделать так, чтоюы создать элемент и каждый раз вставлять его на страницу после обработчиков событий 
    // for(let i = 0;i<movieDB.movies.length ;i++ ){
    //     let a = movieDB.movies[i].toLowerCase();
        
    //     let b;
    //     b +=a;
    //     b[0].toUpperCase();
    //     console.log(b);
        
    // }
    
    const adv = document.querySelectorAll(".promo__adv img"),
          promoBg = document.querySelector(".promo__bg"), 
          genre = promoBg.querySelector(".promo__genre"),
          movieList = document.querySelector(".promo__interactive-list"),
          addForm = document.querySelector("form.add"),
          addInput = addForm.querySelector(".adding__input"),
          checkbox = addForm.querySelector("[type='checkbox']");
    

      // обработчики событий 
    // 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
    // новый фильм добавляется в список. Страница не должна перезагружаться.
    // Новый фильм должен добавляться в movieDB.movies.
    // Для получения доступа к значению input - обращаемся к нему как input.value;
    // P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
    addForm.addEventListener("submit", (event) =>{
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm.trim()){

            if( newFilm.length>21){
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if(favorite){
                console.log("Добавляем любимый фильм");
            }
            // 2-ая задача
        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        createMovieList(movieDB.movies, movieList);
        
    // addForm.reser();
        }
        event.target.reset();
    });
    // adv.forEach(img => {
    //     img.remove();
    // });
    
    const deleteAdv = (arr) =>{
        arr.forEach(function(img) {
        img.remove();
    });
    };
    
    // Привыкаем к стрелочным функциям
    
    
   const makeChanges = () =>{
    genre.textContent = "драма";
    promoBg.style.cssText = "background: url('../img/bg.jpg') center center / cover no-repeat";
   };

   


const sortArr = (arr) =>{
    arr.sort();
};


   function createMovieList(films, parent){
    parent.innerHTML = "";
     sortArr(films);
    // console.log(promoBg);
    films.forEach((film, i) => {
        parent.innerHTML += `
        <li class="promo__interactive-item">${i+1} ${film}
            <div class="delete"></div>
        </li>
        `;
    });
    document.querySelectorAll(".delete").forEach((btn,i)=>{
        btn.addEventListener("click",()=>{
            btn.parentElement.remove();
            movieDB.movies.splice(i,1);
           
            createMovieList(films, parent);
        });
    });
  }
  deleteAdv(adv);
  makeChanges();
  createMovieList(movieDB.movies, movieList);
    
});