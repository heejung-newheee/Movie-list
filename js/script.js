window.addEventListener("DOMContentLoaded", ()=>{
    //로드시 리스팅
    listing();
    // 로드시 검색 input창 커서 위치
    focusing();
});

// GET
const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2NjNDc1OTdlZTYxZjYzNGIyY2Q2M2IzMjU4OWU4NCIsInN1YiI6IjY0NzA4ODVmNzI2ZmIxMDE0NGU2MTFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zwtwBOelR-_HKiWkX99qxzRAQ9gkpp8PTRKAg8pIhy0',
    },
};

// 영화 카드 리스팅
function listing(){
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', OPTIONS).then((response) => response.json()).then((response) => {        
        // console.log(response)
        let movies = response['results'];
        let cardWrap = document.querySelector(".card-wrap"); 
        let temp_html = ''; 

        movies.forEach((item)=>{
            let title = item['original_title'];
            let overview = item['overview'];
            let poster = item['poster_path'];
            let vote_avg = item['vote_average'];
            let _id = item['id'];
            temp_html += `<div class="card-list" id="${_id}" onclick="alertId(${_id})">
                                <img src="https://image.tmdb.org/t/p/original${poster}" class="card-img" />
                                <div class="card-info">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${overview}</p>
                                    <p class="card-avg"> Rating ${vote_avg}</p>
                                </div>
                            </div>`       
            cardWrap.innerHTML = temp_html;
        });
      
        // 검색 키워드 filter / forEach
        let searchBtn = document.getElementById("search-btn");        
        searchBtn.addEventListener("click", ()=>{
            // console.log('movies->',movies);
            let inputValue =  document.getElementById("search-input").value.toLowerCase();
            // console.log("inputValue => ",inputValue);

            // filter로 키워드 포함 배열 생성
            const matchMovies = movies.filter((item) => { 
                let titles = item.original_title.split(' ').join('').toLowerCase();
                inputValue = inputValue.split(' ').join('');
                return titles.includes(inputValue);
            });
            // console.log('matchmovies->',matchMovies);
            temp_html = ''; 
            
            matchMovies.forEach((item)=>{
                let title = item['original_title'];
                let overview = item['overview'];
                let poster = item['poster_path'];
                let vote_avg = item['vote_average'];
                let _id = item['id'];
                temp_html += `<div class="card-list" id="${_id}" onclick="alertId(${_id})">
                                    <img src="https://image.tmdb.org/t/p/original${poster}" class="card-img" />
                                    <div class="card-info">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${overview}</p>
                                        <p class="card-avg"> Rating ${vote_avg}</p>
                                    </div>
                                </div>`       
                cardWrap.innerHTML = temp_html;
            });
            if (matchMovies.length === 0) {
                alert("검색된 영화가 없습니다. 다시 검색해 주세요.");
                location.reload();
                focusing();
            }
        });

        // 키보드 enter 키 입력
        document.getElementById("search-input").addEventListener("keyup", function(e) {
            if (e.code === 'Enter') {
                document.getElementById("search-btn").click();
            }
        });    
    })
    .catch((err) => console.error(err));
}

// 검색창 cursor 위치
function focusing(){
    let input = document.getElementById("search-input")
    input.focus();
}

// 카드 클릭 시 영화 ID alert
let alertId = (_id) => alert(`영화 id : ${_id}`);

// home top 버튼
const topBtn = document.getElementById("top-btn"); 
topBtn.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: "smooth" });
});  

// home top 버튼 scroll 위치에따라 숨기기/보이기
window.addEventListener("scroll", ()=>{
    let scrollY = this.scrollY;
    // console.log(scrollY)
    if(scrollY <300){
      topBtn.style.opacity = 0;
    }else {
      topBtn.style.opacity = 1;
    }
  });
    
// 인기 순위 배열
// 모달