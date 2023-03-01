function fetchCategories() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showCategories(data.data))
}
let showCategories = (data) => {
    // console.log(data)
    let { news_category } = data;
    let categoriesContainer = document.getElementById('categories-container');
    // console.log(news_category)
    news_category.forEach(singleCategory => {
        let { category_id, category_name } = singleCategory;
        // console.log(category_id)
        let categoryName = document.createElement('p');
        categoryName.innerHTML = `
            <a href = "#" class = "nav-link" onclick="loadSingleNews('${category_id}', '${category_name}')">${category_name}</a>
        `;
        categoriesContainer.appendChild(categoryName)
    });
    // loadSingleNews(categoryId)
}

let loadSingleNews = (categoryId, categoryName)=>{
    // console.log(categoryId)
    let url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url).then(res => res.json()).then(data => countSingleNews(data, categoryName))
    // console.log(url)
}

let countSingleNews = (categoryDetail, categoryName)=>{
    let newsCount = document.getElementById('news-count');
    newsCount.innerHTML = `
        ${categoryDetail.data.length}
    `
    let newsName = document.getElementById('news-name')
    newsName.innerHTML = `
        ${categoryName}
    `
    let newsDisplay = document.getElementById('news-display');
    newsDisplay.innerHTML = ''
    categoryDetail.data.forEach(singleData => {
        // console.log(singleData)
        let {_id, thumbnail_url, title, details, total_view, author} = singleData;
        let newsDiv = document.createElement('div')
        newsDiv.innerHTML = `
        <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 d-flex flex-column justify-content-between">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 300)}...</p>
                  </div>
                  <div class = "d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                    <img class= "rounded-circle" alt="..." height = "40px" width="40px" src="${author.img}" alt="">
                    <div class = "">
                      <p class = "m-0 p-0">${author.name ? author.name : "Not available" }</p>
                      <p class = "m-0 p-0">${author.published_date}</p>
                    </div>
                    </div>
                    <div>
                      <p><span class = "me-1"><i class="fa-solid fa-eye"></i></span>${total_view ? total_view : '0'}</p>
                    </div>
                    <div>
                      <a class="text-decoration-none text-success" onclick = "loadNewsDetail('${_id}')" href = "#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">see more...</a>
                    </div>
                </div>
              </div>
          </div>
            `
            newsDisplay.appendChild(newsDiv)
    })
    // console.log(categoryDetail.data)
}

let loadNewsDetail = (newsId)=>{
  let url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url).then(res => res.json()).then(data => showNewsDetail(data.data))
  // console.log(url)
}

let showNewsDetail = (fullNews)=>{
  console.log(fullNews[0])
  let {thumbnail_url, title, others_info, details, author, total_view} = fullNews[0]
  document.getElementById("modal-body").innerHTML = `
  <div class= "card mb-3">

  <div class="row g-0">
    <div class="col-md-12">
      <img src=${thumbnail_url} class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-12 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${title} <span class="badge text-bg-warning">
        ${others_info.is_trending ? "Trending" : "Not trending"}</span></h5>
        <p class="card-text">
          ${details}
        </p>
        
      </div>
      <div class="card-footer border-0 bg-body d-flex justify-content-between">
        <div class="d-flex gap-2">
        <img src=${
          author.img
        } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
        <div>
        <p class="m-0 p-0">${author.name ? author.name : "Not available"}</p>
        <p class="m-0 p-0">${author.published_date}</p>
        </div>
        
        </div>
        <div class="d-flex align-items-center">
            <i class="fas fa-eye"></i>
            
            <p class="m-0 p-0">${total_view}</p>
        </div>
        <div>
            <i class="fas fa-star"></i>
        
        </div>
        
      </div>
    </div>
  </div>
  </div>
  `
}