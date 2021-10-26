// Get a reference to the #titanic
const titanic = document.querySelector('#titanic')
const pageWrapper = document.querySelector('#pageWrapper')

// Set page wrapper styles
pageWrapper.style.width = '100%'

// Set some styles on the titanic
// display flex, justifyContent center, alignItems flex-end
titanic.style.margin = 'auto'
titanic.style.display = 'flex'
titanic.style.flexDirection = 'row'
titanic.style.flexWrap = 'wrap'
titanic.style.maxWidth = '400px'

// Map over the data and make a new element for each passenger
const passengers = data.map(p => {
  return document.createElement('div')
})

// Get the select element and add an event listener
const selectElement = document.querySelector('#filterBy')
let filterBy = selectElement.value
displayData(filterBy)

selectElement.addEventListener('input', (e) => {
  filterBy = e.target.value

  displayData(filterBy)
})

function displayData(filterBy) {

  // Loop over each passenger and append them to the titanic
  passengers.forEach(p => {
    titanic.appendChild(p)
  })

  // Let's loop over each passenger and set some styles 
  passengers.forEach((p, i) => {
    const { fare, name, embarked, pclass, sex, survived } = data[i].fields
    const embarkedColorMap = { 'S': '#324376', 'C': '#F76C5E', 'Q': '#F4CC48' }

    p.style.margin = '0.5px'
    p.style.width = '15px'
    p.style.height = '15px'
    p.style.backgroundColor = embarkedColorMap[embarked]
    p.style.borderRadius = sex === 'male' ? '0' : '50%'
    p.style.opacity = survived === 'Yes' ? '1' : '0.5'
  })
}