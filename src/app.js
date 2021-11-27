let list
let listItems

document.addEventListener("DOMContentLoaded", () => {
    console.log("script loaded")
    document.querySelector('#add-animal-form').addEventListener('submit', handleSubmit)
    list = document.querySelector('#endangered-animals-list')
    listItems = []
    animals.forEach(animal => {
        const listItem = createListItem(animal)
        addListItem(list, listItem)
    })
})

const handleSubmit = (event) => {
    event.preventDefault()
    const newListItem = createListItem(event.target)
    addListItem(list, newListItem)
    event.target.reset()
}

const createListItem = function (form) {
    const newListItem = document.createElement('li')
    newListItem.textContent = `${form.commonName.value} - ${form.scientificName.value} - ${form.conservationStatus.value}`
    return newListItem
}

const addListItem = function (list, listItem) {
    if (list.innerHTML === '') {
        addListFeatures()
    }
    listItems.push(listItem)
    list.appendChild(listItem)
}

const addListFeatures = function () {
    createDeleteButton()
    createSort()
    createFilter()
}

const createDeleteButton = () => {
    const deleteButton = document.createElement('button')
    deleteButton.type = "button"
    deleteButton.innerHTML = "Delete All"
    document.querySelector('#endangered-animals-list').after(deleteButton)
    deleteButton.addEventListener('click', handleDeleteAll)
}

const handleDeleteAll = () => {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild)
        }
        listItems = []
        document.querySelector('body').removeChild(event.target)
        document.querySelector('body').removeChild(document.getElementById('list-sort'))
        document.querySelector('body').removeChild(document.getElementById('list-filter'))
        document.querySelector('body').removeChild(document.querySelector('hr'))
}

const createSort = function () {
    const sort = document.createElement('select')
    const options = {
        '': "Sort by:",
        'commonNameAsc': "Common Name [A-Z]",
        'commonNameDesc': "Common Name [Z-A]",
        'scientificNameAsc': "Scientific Name [A-Z]",
        'scientificNameDesc': "Scientific Name [Z-A]",
        'conservationStatusAsc': "Conservation Status [A-Z]",
        'conservationStatusDesc': "Conservation Status [Z-A]"
    }
    for (key in options) {
        const newOption = document.createElement('option')
        newOption.value = key
        newOption.textContent = options[key]
        if (newOption.value == '') {
            newOption.disabled = true
            newOption.selected = true
        }
        sort.appendChild(newOption)
    }
    sort.id = "list-sort"
    document.querySelector('h1').after(sort)
    sort.after(document.createElement('hr'))
    sort.addEventListener('change', handleSortChange)
}
    
const handleSortChange = function (event) {
        const currentListItems = Array.from(list.childNodes)
        switch (event.target.value) {
            case 'commonNameAsc':
                currentListItems.sort(sortFunction(0))
                break;
            case 'commonNameDesc':
                currentListItems.reverse(sortFunction(0))
                break;
            case 'scientificNameAsc':
                currentListItems.sort(sortFunction(1))
                break;
            case 'scientificNameDesc':
                currentListItems.reverse(sortFunction(1))
                break;
            case 'conservationStatusAsc':
                currentListItems.sort(sortFunction(2))
                break;
            case 'conservationStatusDesc':
                currentListItems.reverse(sortFunction(2))
                break;
            }
        list.textContent = ''
        currentListItems.forEach(item => list.appendChild(item))
        }


const sortFunction = function(index) {
    return (item1, item2) => {
        const a = item1.innerHTML.split('-')[index].trim().toLowerCase()
        const b = item2.innerHTML.split('-')[index].trim().toLowerCase()
        if (a < b) {
            return -1
        } else if (a == b) {
            return 0
        } else {
            return 1
        }
    }
}

const createFilter = function () {
    const filter = document.createElement('select')
    const options = {
        '': "Filter by Conservation Status:",
        'all': "All",
        'critical': "Critically Endangered",
        'endangered': "Endangered",
        'vulnerable': "Vulnerable"
    }
    for (key in options) {
        const newOption = document.createElement('option')
        newOption.value = key
        newOption.textContent = options[key]
        if (newOption.value == '') {
            newOption.disabled = true
            newOption.selected = true
        }
        filter.appendChild(newOption)
    }
    filter.id = "list-filter"
    document.querySelector('#list-sort').after(filter)
    filter.addEventListener('change', handleFilterChange)
}
    
const handleFilterChange = function () {
    let newListItems = []
    switch (event.target.value) {
        case "all":
            newListItems = listItems
            break;
        case "critical":
            newListItems = listItems.filter(item => {
                return item.innerHTML.split('-')[2].trim() === "Critically Endangered"
            })
            break;
        case "endangered":
            newListItems = listItems.filter(item => {
                return item.innerHTML.split('-')[2].trim() === "Endangered"
            })
            break;
        case "vulnerable":
            newListItems = listItems.filter(item => {
                return item.innerHTML.split('-')[2].trim() === "Vulnerable"
            })
            break;
        }
        list.textContent = ''
        newListItems.forEach(item => list.appendChild(item))
}

const amurLeopard = {
    commonName: {value: "Amur Leopard"},
    scientificName: {value: "Panthera pardus orientalis"},
    conservationStatus: {value: "Critically Endangered"}
}

const javanRhino = {
    commonName: {value: "Javan Rhino"},
    scientificName: {value: "Rhinoceros sondaicus"},
    conservationStatus: {value: "Critically Endangered"}
}

const bonobo = {
    commonName: {value: "Bonobo"},
    scientificName: {value: "Pan paniscus"},
    conservationStatus: {value: "Endangered"}
}

const greenTurtle = {
    commonName: {value: "Green Turtle"},
    scientificName: {value: "Chelonia mydas"},
    conservationStatus: {value: "Endangered"}
}

const dugong = {
    commonName: {value: "Dugong"},
    scientificName: {value: "Dugong dugon"},
    conservationStatus: {value: "Vulnerable"}
}

const polarBear = {
    commonName: {value: "Polar Bear"},
    scientificName: {value: "Ursus maritimus"},
    conservationStatus: {value: "Vulnerable"}
}

animals = [amurLeopard, javanRhino, bonobo, greenTurtle, dugong, polarBear]
