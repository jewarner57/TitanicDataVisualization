// Get a reference to the #titanic
const titanic = document.querySelector('#titanic')
const pageWrapper = document.querySelector('#pageWrapper')
const filterControls = document.querySelector('#filterControls')

// Set filter controls styles
filterControls.style.padding = '50px'

// Set page wrapper styles
pageWrapper.style.width = '100%'
pageWrapper.style.display = 'flex'
pageWrapper.style.flexDirection = 'row'
pageWrapper.style.justifyContent = 'center'

// Set some styles on the titanic
// display flex, justifyContent center, alignItems flex-end
titanic.style.margin = 'auto'
titanic.style.display = 'flex'
titanic.style.flexDirection = 'row'
titanic.style.flexWrap = 'wrap'
titanic.style.maxWidth = '50vw'

// Map over the data and make a new element for each passenger
const passengers = data.map(p => {
  return document.createElement('div')
})

let selectedFilters = []

// Get the select element and display the initial data
const selectElement = document.querySelector('#filterBy')
const filteredData = filterData('age', data)
selectElement.addEventListener('input', selectChanged)
displayData(filteredData)

// Get the button and add an event listener
const addFilterButton = document.querySelector('#addFilter')
const removeFilterButton = document.querySelector('#removeFilter')
const filterList = document.querySelector('#filterList')

filterList.style.display = 'flex'
filterList.style.flexDirection = 'column'

// Add a new filter select
addFilterButton.addEventListener('click', (e) => {
  let newFilter = selectElement.cloneNode(true)
  newFilter.value = ""
  filterList.appendChild(newFilter)

  newFilter.addEventListener('input', selectChanged)
})

removeFilterButton.addEventListener('click', (e) => {
  const elemToRemove = filterList.children[[...filterList.children].length - 1]
  filterList.removeChild(elemToRemove)
})

function selectChanged(e) {
  selectedFilters = [...filterList.children].map((elem) => {
    console.log(elem.value)
    return elem.value
  })

  // Filter the data for each of the filters
  let filteredData = data
  selectedFilters.forEach((filter) => {
    console.log(filter)
    filteredData = filterData(filter, filteredData)
  })

  displayData(filteredData)
}

function displayPassengerData(e) {
  console.log(e.target.passengerData)
}

/* Build the person list graphic */

function displayData(passengerData) {
  // Loop over each passenger and append them to the titanic
  passengers.forEach(p => {
    titanic.appendChild(p)
  })

  // Let's loop over each passenger and set some styles 
  passengers.forEach((p, i) => {
    const { fare, name, embarked, pclass, sex, survived, age } = passengerData[i].fields
    const embarkedColorMap = { 'S': '#4462b9', 'C': '#F76C5E', 'Q': '#F4CC48' }

    p.style.margin = '0.5px'
    p.style.width = '15px'
    p.style.height = '15px'
    p.style.backgroundColor = embarkedColorMap[embarked] || '#fff'
    p.style.borderRadius = sex === 'male' ? '0' : '50%'
    p.style.opacity = survived === 'Yes' ? '1' : '0.3'
    p.style.textAlign = 'center'
    p.style.padding = pclass === 1 ? '5px' : '7px'
    p.style.border = pclass === 1 ? '2px solid black' : ''

    p.passengerData = { fare, name, embarked, pclass, sex, survived, age }
    p.addEventListener('click', displayPassengerData)
  })
}

function filterData(filterBy, data) {
  // We spread data here to make a deep copy
  // so we don't change original data when sorting
  const filteredData = [...data]

  switch (filterBy) {
    case 'age':
      // Age: Oldest at the top
      filteredData.sort((a, b) => b.fields.age - a.fields.age)
      break;
    case 'fare':
      // Fares: Highest at the top
      filteredData.sort((a, b) => b.fields.fare - a.fields.fare)
      break;
    case 'sex':
      // Sex: Males at the top
      filteredData.sort((a, b) => a.fields.sex === 'male' ? -1 : 1)
      break;
    case 'embarked':
      // Embarked Location: Top to bottom: S, C, Q
      filteredData.sort((a, b) => {
        const embarkedColorMap = { 'S': 10, 'C': 20, 'Q': 30 }
        const aVal = embarkedColorMap[a.fields.embarked] || '40'
        const bVal = embarkedColorMap[b.fields.embarked] || '40'

        return aVal - bVal
      })
      break;
    case 'survived':
      // Survived: Survivors at the top
      filteredData.sort((a, b) => a.fields.survived === 'Yes' ? -1 : 1)
      break;
    case 'class':
      // Class top to bottom
      filteredData.sort((a, b) => {
        return Number(a.fields.pclass) - Number(b.fields.pclass)
      })
      break;
    default:
      break;
  }
  return filteredData
}