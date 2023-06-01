window.addEventListener("DOMContentLoaded", () => listing());

// GET
const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2NjNDc1OTdlZTYxZjYzNGIyY2Q2M2IzMjU4OWU4NCIsInN1YiI6IjY0NzA4ODVmNzI2ZmIxMDE0NGU2MTFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zwtwBOelR-_HKiWkX99qxzRAQ9gkpp8PTRKAg8pIhy0',
    },
};

// 영화 카드 목록
function listing(){
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', OPTIONS).then((response) => response.json()).then((response) => {       
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
    })
    .catch((err) => console.error(err));
}

// 카드 클릭 시 ID alert
let alertId = (_id) => alert(`영화 id : ${_id}`);

// 영화 검색
let searchBtn = document.getElementById("search-btn");   
searchBtn.addEventListener("click", () => {        
    let inputValue = document.getElementById("search-input").value.replace(/ /g,"").toLowerCase(); 
    let cardList = document.querySelectorAll(".card-list");     
    const matchMovies = [...cardList].filter((item) => { 
        let titles = item.querySelector(".card-title").textContent.replace(/ /g,"").toLowerCase();
        return titles.includes(inputValue);
    });      
    [...cardList].forEach((item)=>{
        if(matchMovies.includes(item)){
            item.classList.remove("hide");
        }else {
            item.classList.add("hide");
        }
    });

    // 검색 영화 결과 없을 시 
    if (matchMovies.length === 0) {
        alert("검색된 영화가 없습니다. 다시 검색해 주세요.");
        location.reload();
    }

    // 검색어가 없을 시 
    if(inputValue.length === 0) {
        alert("검색어를 입력해 주세요");
    }
});

// 키보드 enter
document.getElementById("search-input").addEventListener("keyup", function(e) {
    if (e.code === 'Enter') {
        e.preventDefault();
    }
});  

// home top 버튼
const topBtn = document.getElementById("top-btn"); 
topBtn.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: "smooth" });
});  

// home top 버튼 scroll 300 이상일때만 보여주기
window.addEventListener("scroll", ()=>{
    let scrollY = this.scrollY;
    // console.log(scrollY)
    if(scrollY <300){
      topBtn.style.opacity = 0;
    }else {
      topBtn.style.opacity = 1;
    }
});
