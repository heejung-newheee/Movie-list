window.addEventListener("DOMContentLoaded", ()=>{
    listing();
    // 로드시 input창 커서 위치
    let input = document.getElementById("search-input").focus();
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
            cardWrap.innerHTML = temp_html;
        });

        cardWrap.addEventListener("click", function({target}){
            console.log("alert ID")
            if (target !== cardWrap) {
                if (target.className === "card-list") {
                  alert(`영화 id: ${target.id}`);
                } else {
                  alert(`영화 id: ${target.parentNode.id}`);
                }
            }
        });
        
        // 검색 키워드. filter || includes
        let searchBtn = document.getElementById("search-btn");
        searchBtn.addEventListener("click", function(){
            // input 값을 가져온다.    
            // row 데이터의 제목들과 비교한다.
            // 키워드가 들어간 영화만 listing 한다.
            let temp_html = '';  
            let inputValue =  document.getElementById("search-input").value.toLowerCase();
            console.log(inputValue);

            rows.forEach((a)=>{
                let title = a['original_title'];
                let overview = a['overview'];
                let poster = a['poster_path'];
                let vote_avg = a['vote_average'];
                let _id = a['id'];
                
                // 대소문자 관계없이 검색 가능
                let titleLower = title.toLowerCase();

                if(titleLower.includes(inputValue)){
                    temp_html +=`<div class="card-list" id="${_id}">
                                    <img src="https://image.tmdb.org/t/p/original${poster}" class="card-img" />
                                    <div class="card-info">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${overview}</p>
                                        <p class="card-avg">${vote_avg}</p>
                                    </div>
                                </div>`       
                    cardWrap.innerHTML = temp_html;
                } else {
                    alert("검색한 영화가 없습니다! 다시 검색해 주세요.");
                    if(window.confirm(message) === true){
                        window.location.href="index.html";  
                    }                                      
                }
            });
        });

        // 키보드 enter키 입력
        document.getElementById("search-input").addEventListener("keyup", function(e) {
            if (e.code === 'Enter') {
                document.getElementById("search-btn").click();
            }
        });
    
    })
    .catch((err) => console.error(err));
}
