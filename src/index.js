let addToy = false
const toysUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", ()=>{
  //add functions 
  getToys()
  createToy()
  updateLikes()


  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', e => {
        event.preventDefault()
        createToy(e.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

});



//fetch toys - gave a "quick-fix" from vs code to make async? Idk if this will work fine or no
function getToys() {
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(allToys => {
    const toyCollection = document.getElementById("toy-collection")

    toyCollection.innerHTML = allToys.map(toys => renderToy(toys)).join("")
  })
};


//render
function renderToy(toy) {
  return `<div class="card" id="${toy.id}">
  <h2>${toy.name}</h2>
  <img data-id="${toy.id}" src=${toy.image} class="toy-avatar" />
  <p data-id="${toy.id}">${toy.likes} Likes </p>
  <button data-id="${toy.id}" class="like-btn">Like <3</button>
</div>`
}

//likes
function updateLikes(){
  const toyCollection = document.getElementById("toy-collection")
  

  toyCollection.addEventListener('click', function(e){
  const likeButton = e.target.className === "like-btn"

  if (likeButton) {
    
    const id = e.target.parentElement.id
    const like = e.target.previousElementSibling
    let count = parseInt(e.target.previousElementSibling.innerText)
    like.innerText = `${++count} likes`

    
    fetch(toysUrl + '/' + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({
        "likes": count
      })
    }) 
    .then(res => res.json())
    // .then(console.log(e.target.parentElement.id))
  }
})
}

// create toy
function createToy() {
  const toyForm = document.querySelector(".add-toy-form")

  toyForm.addEventListener("submit", function(e) {
    e.preventDefault();

  //form values
  const name = document.getElementById("input-name").value
  const image = document.getElementById("input-img").value


  const data = {
    "name": name,
    "image": image,
    "likes": 0
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(res => res.json())
  .then(toy => {
    const newToyDiv = renderToy(toy)
    const toyCollection = document.getElementById("toy-collection")

    toyCollection.innerHTML += newToyDiv;
  });
});
}
