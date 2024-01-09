        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTYzYjdjMWU5ZTIyZDAwM2ZjNjc5OWZlNjhmZWIxZCIsInN1YiI6IjY1OGViOWUxY2EwZTE3MDhmNGJhNzVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h4S8wIqJ0DxjJ9506Hrj3F5AfsavVajdG9cVybz_RnM'
            }
        }

        fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const rows = response['results'];

                rows.forEach(data => {
                    const title = data['title']
                    const id = data['id']
                    const overview = data['overview']
                    const vote = data['vote_average']
                    const path = data['poster_path']
                    console.log(response)

                    let temp_html = `
                    <div class="card mb-3" style="max-width: 540px;" id="card-${id}">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://image.tmdb.org/t/p/w500${path}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${overview}</p>
                                    <p class="card-text"><small class="text-body-secondary">평점:${vote}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>`

                    //1. 바닐라 JS로 api 연동, html 붙여넣기
                    let cardElement = document.getElementById('card');
                    cardElement.innerHTML += temp_html;

                });

                //2. card id값 지정함. 하나씩 돌려가며 alert event id 띄우기!!
                const idd = document.getElementById('card')
                const xx = document.getElementsByClassName('card mb-3')


                for (let i = 0; i < xx.length; i++) {
                    const click = (event) => {

                        let idd = event.currentTarget.id;
                        let idx = idd.split('-');
                        let id = idx[1]
                        alert('id: ' + id)
                    }
                    xx[i].addEventListener('click', click)
                };

                //3. input(검색창) 내용을 포함한 영화제목만을 웹페이지에 띄우기
                //영화제목 class="card-title", class로 해당내용 찾기

                let movietitles = document.getElementsByClassName('card-title');
                //요소 중 innerHTML에 영화제목이 포함되어있음.
                for (let i = 0; i < movietitles.length; i++) {
                    let title = movietitles[i].innerHTML;
                }
                //영화제목만을 띄우는 배열 만듬! 이제 얘랑 search 창에 쓴거랑 일치하면
                //button을 눌렀을때 결과값을 출력하기(화면에있는거 claer하고 붙여넣는방식으로)
                const input = document.getElementById('savevalue')
                const button = document.getElementById('button')
                let savevalue = ''

                function save() {
                    savevalue = input.value;
                    return savevalue;
                }

                function result() {
                    let searchValue = save()
                    let cardcontainer = document.getElementById('card');

                    cardcontainer.innerHTML = ''

                    rows.forEach(a => {
                        let title = a['title'].toLowerCase();
                        let id = a['id'];
                        let overview = a['overview'];
                        let vote = a['vote_average'];
                        let path = a['poster_path'];

                        if (title.includes(searchValue.toLowerCase())) {
                            
                            let temp_html = `
                    <div class="card mb-3" style="max-width: 540px;" id="card-${id}">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://image.tmdb.org/t/p/w500${path}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${overview}</p>
                                    <p class="card-text"><small class="text-body-secondary">평점:${vote}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>`
                                ;

                            cardcontainer.innerHTML += temp_html;
                        } 
                    });
                    alert(savevalue + "를 검색합니다.")

                }
                button.addEventListener('click', result) //버튼 누르면 검색창에 있는 값이 savevalue로 저장

                //4. 헤더 클릭하면 첫화면으로 돌아가기
                let header = document.getElementById('header')

                function reset(){
                
                    let inputs = document.getElementById('savevalue')
                
                    rows.forEach(a => {
                    let title = a['title']
                    let id = a['id']
                    let overview = a['overview']
                    let vote = a['vote_average']
                    let path = a['poster_path']

                    let temp_html = `
                    <div class="card mb-3" style="max-width: 540px;" id="card-${id}">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://image.tmdb.org/t/p/w500${path}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${overview}</p>
                                    <p class="card-text"><small class="text-body-secondary">평점:${vote}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>`
                    let cardElement = document.getElementById('card');
                    cardElement.innerHTML += temp_html;
                    
                    inputs.innerHTML = ''

                });  
                
                alert('첫화면으로 돌아갑니다.')
                
                }

                header.addEventListener('click',reset)
            })



