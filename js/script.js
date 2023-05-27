window.addEventListener("DOMContentLoaded", function(){
    listing();
});

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2NjNDc1OTdlZTYxZjYzNGIyY2Q2M2IzMjU4OWU4NCIsInN1YiI6IjY0NzA4ODVmNzI2ZmIxMDE0NGU2MTFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zwtwBOelR-_HKiWkX99qxzRAQ9gkpp8PTRKAg8pIhy0',
    },
};

function listing(){
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options).then((response) => response.json()).then((response) => {        
        console.log(response)
        let rows = response['results'];
        let temp_html = '';  
        let cardWrap = document.querySelector(".card-wrap"); 
        rows.forEach((a)=>{
            let title = a['original_title'];
            let overview = a['overview'];
            let poster = a['poster_path'];
            let vote_avg = a['vote_average'];
            let _id = a['id'];
            temp_html += `<div class="card-list" id="${_id}">
                                <img src="https://image.tmdb.org/t/p/original${poster}" class="card-img" />
                                <div class="card-info">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${overview}</p>
                                    <p class="card-avg">${vote_avg}</p>
                                </div>
                            </div>`
            // $('.card-wrap').append(temp_html);
            
            cardWrap.innerHTML = temp_html;
        });
        // let cardList = document.querySelector('.card-warp');
        cardWrap.addEventListener("click", function({target}){
            console.log("at")
            if (target !== cardWrap) {
                if (target.className === "movie-card") {
                  alert(`영화 id: ${target.id}`);
                } else {
                  alert(`영화 id: ${target.parentNode.id}`);
                }
            }
        });    

    })
    .catch((err) => console.error(err));
}


function idAlert(){
    console.log("!!!!!!!!!!!!");
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options).then((response) => response.json()).then((response) => {
        rows = data['result'];
        

    })
}
