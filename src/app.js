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
        createDeleteButton()
    }
    list.appendChild(listItem)
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
}