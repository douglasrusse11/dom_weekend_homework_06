document.addEventListener("DOMContentLoaded", () => {
    console.log("script loaded")
    document.querySelector('#add-animal-form').addEventListener('submit', handleSubmit)
})

const handleSubmit = (event) => {
    event.preventDefault()
    const newListItem = createListItem(event.target)
    const list = document.getElementById('endangered-animals-list')
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
    list.appendChild(listItem)
}

const addListFeatures = function () {
    createDeleteButton()
    createSort()
}

const createDeleteButton = () => {
    const deleteButton = document.createElement('button')
    deleteButton.type = "button"
    deleteButton.innerHTML = "Delete All"
    document.querySelector('#endangered-animals-list').after(deleteButton)
    deleteButton.addEventListener('click', handleDeleteAll)
}

const handleDeleteAll = () => {
    const list = document.getElementById('endangered-animals-list')
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild)
        }
        document.querySelector('body').removeChild(event.target)
        document.querySelector('body').removeChild(document.getElementById('list-sort'))
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
    sort.addEventListener('change', function () {
        const list = document.querySelector('#endangered-animals-list')
        const listItems = Array.from(list.childNodes)
        console.log('sorting')
        switch (event.target.value) {
            case 'commonNameAsc':
                listItems.sort(sortFunction(0))
                break;
            case 'commonNameDesc':
                listItems.reverse(sortFunction(0))
                break;
            case 'scientificNameAsc':
                listItems.sort(sortFunction(1))
                break;
            case 'scientificNameDesc':
                listItems.reverse(sortFunction(1))
                break;
            case 'conservationStatusAsc':
                listItems.sort(sortFunction(2))
                break;
            case 'conservationStatusDesc':
                listItems.reverse(sortFunction(2))
                break;
            }
        list.textContent = ''
        listItems.forEach(item => list.appendChild(item))
        })

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