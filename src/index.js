

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


function renderCards(toysObj) {
  toysObj.forEach((toys) => createCard(toys))
}


function createCard(toys) {
const toyCollection = document.getElementById('toy-collection')
const toyName = document.createElement('h2')
const toyImg = document.createElement('img')
const toyLikes = document.createElement('p')
const likeButton = document.createElement('button')
const toyCard = document.createElement('div')

toyCard.className = "card"
toyName.textConent = toys['name']
toyImg.src = toys['image']
toyImg.className = "toy-avatar"
toyLikes.textContent = `${toys.likes} likes`
likeButton.textContent = "Like!"

toyCollection.appendChild(toyCard);
toyCard.appendChild(toyName);
toyCard.appendChild(toyImg);
toyCard.appendChild(toyLikes);
toyCard.appendChild(likeButton);

likeButton.addEventListener('click', (e) => {
  toys.likes++
  toyLikes.textContent = `${toys.likes} likes`
  postNewLikes(`http://localhost:3000/toys/${toys.id}`, {likes: parseInt(toys.likes)})
  
  
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
  const configurationObject = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(body)
}
return fetch(url, configurationObject)
}


const postNewLikes = (url, body) => {
  const configurationObject = {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(body)
}
return fetch(url, configurationObject)
}