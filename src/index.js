let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) 
    {
      toyForm.style.display = 'block'
    } else 
    {
      toyForm.style.display = 'none'
    }
  })

  grabToys();
  createToy();
  addLike();

})

/*   ---------------------------------   */
//Add like to a toy
function addLike()
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
    // debugger
    const id = parseInt(event.target.parentElement.id);
    const likeCount = parseInt(event.target.previousElementSibling.textContent.split(" ")[0])+1;
    const url = "http://localhost:3000/toys/"+id
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

/*   ---------------------------------   */


/*   ---------------------------------   */
// Create a new toy

function createToy()
{
  const subButton = document.getElementsByClassName("add-toy-form");

  subButton[0].addEventListener('submit',function(event) 
  {
    event.preventDefault();

    const data = {name: document.getElementsByClassName("input-text")[0].value, image: document.getElementsByClassName("input-text")[1].value, likes:0}

    fetch("http://localhost:3000/toys",
    {method:"POST", 
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}  })
    .then(resp => resp.json())
    .then(newToy => 
    {
      const toyColl = document.getElementById("toy-collection");
      toyColl.innerHTML += addDiv(newToy);
    });
  });
}


/*   ---------------------------------   */


/*   ---------------------------------   */
// fetch all toys
function grabToys()
{
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => addToys(data));
}

function addToys(data)
{
  const toyColl = document.getElementById("toy-collection");
  data.forEach( datum =>{
    toyColl.innerHTML += addDiv(datum);
  });
}

function addDiv(data)
{
  return `
    <div class="card" id="${data.id}">
      <h2>${data.name}</h2>
      <img src="${data.image}" class="toy-avatar" />
      <p>${data.likes} Likes </p>
      <button class="like-btn">Like </button>
    </div>`;
} 
/*   ---------------------------------   */
