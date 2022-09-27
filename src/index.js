

let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(toysObj => renderCards(toysObj))


function renderCards(toysArr) {
    toysArr.forEach((toy) => createCard(toy))
}


function createCard(toy) {
const toyCollection = document.getElementById('toy-collection')
const toyName = document.createElement('h2')
const toyImg = document.createElement('img')
const toyLikes = document.createElement('p')
const likeButton = document.createElement('button')
const toyCard = document.createElement('div')

toyCard.className = "card"
toyName.textContent = toy.name
toyImg.src = toy.image
toyImg.className = "toy-avatar"
toyLikes.textContent = `${toy.likes} likes`
likeButton.textContent = "Like!"

toyCollection.appendChild(toyCard);
toyCard.appendChild(toyName);
toyCard.appendChild(toyImg);
toyCard.appendChild(toyLikes);
toyCard.appendChild(likeButton);

likeButton.addEventListener('click', (e) => {
  toyLikes.textContent = `${++toy.likes} likes`
  postNewLikes(`http://localhost:3000/toys/${toy.id}`, {likes: parseInt(toy.likes)})
  
  
})
}

document.getElementsByClassName('submit')[0].addEventListener('click', (e) =>{
  e.preventDefault()
 createNewToy(e)
})


function createNewToy() {
  const form = document.getElementsByTagName('form')[0]
  const newToyName = document.getElementsByClassName('input-text')[0]
  const newToyImg = document.getElementsByClassName('input-text')[1]
  if (newToyName.value.length.trim() === 0 || newToyImg.value.length.trim() === 0) {
    console.log("Add data dum-dum")
    return;
  }
  const newToyObj = {
    name: newToyName.value,
    image: newToyImg.value,
    likes: 0
  }
  createCard(newToyObj)
  postNewToy(`http://localhost:3000/toys`, newToyObj)
  form.reset()
}


const postNewToy = (url, body) => {
//   const configurationObject = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: JSON.stringify(body)
// }
  const configurationObject = getConfig("POST", body)
  return fetch(url, configurationObject)
}


const postNewLikes = (url, body) => {
  const configurationObject = getPatchConfig("PATCH", body)
  return fetch(url, configurationObject)
}

// setting config to a dynamic function
const getConfig = (verb, body) => {
  const configurationObject = {
    method: verb,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  }
}
