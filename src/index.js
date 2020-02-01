let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        createToy(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
fetchAllToys();
likesIncrease();
})


function createToy(toys) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toys.name.value,
        "image": toys.image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
        let divCollect = document.querySelector('#toy-collection')
        const newToyDiv = renderSingleToys(obj_toy);
      
        divCollect.innerHTML += newToyDiv;

        toys.image.value = "";
        toys.name.value = ""
      });
}


function fetchAllToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(allToys => renderAllToys(allToys));
}

function renderAllToys(allToys) {

  const toysContainer = document.getElementById("toy-collection");

  allToys.forEach(toy => {
    toysContainer.innerHTML += renderSingleToys(toy);
  });
}



function renderSingleToys(toys) {
  // Create a pokemon card with divs/buttons etc, the id is how we figure out which pokemon has been clicked
  return `
      <div class="card" id="${toys.id}">
          <div class="toy-frame">
            <h1 class="center-text">${toys.name}</h1>
            <div class="toys-image">
              <img data-id="${toys.id}" src="${toys.image}" class="toy-avatar">
            </div>
            <div class="toys-likes" id="${toys.id}" >
              <p class="like-text">${toys.likes}</p>
              <button class="like-btn">Like <3</button>
          </div>
        </div>`;
}





function likesIncrease()
{
  const toyColl = document.getElementById("toy-collection");
  // debugger
  toyColl.addEventListener('click',handleclick);
}
function handleclick(event)
{
  // event.preventDefault();
  if (event.target.tagName === "BUTTON")
  {
   
    const id = parseInt(event.target.parentElement.id);
    const likeCount = parseInt(event.target.previousElementSibling.textContent.split(" ")[0])+1;
    const url = `http://localhost:3000/toys/${id}`
    fetch(url,
    {method:"PATCH", 
    body: JSON.stringify({"likes": likeCount}),
    headers: {"Content-Type": "application/json"}  })
    .then(resp => {
      if (resp.status === 200)
      {
        event.target.previousElementSibling.textContent = `${likeCount} likes `
      }
    });
  }
}
