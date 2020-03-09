
fetchAllToys();

function fetchAllToys(){
 const toyContainer = document.getElementById("toy-collection")



  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(function(toys){
    toys.forEach(toy => {

      toyContainer.innerHTML += renderSingleToy(toy)
    });
  })
}

//I want to iterate over the toys, to get each toy
//then attach render single toy to the toy container

function renderSingleToy(toy){
  return `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}

function addAToy(){
  
}