document.addEventListener("DOMContentLoaded", () => {
    console.log("script loaded")

    document.querySelector('#add-animal-form').addEventListener('submit', function (event) {
        event.preventDefault()
        const newListItem = document.createElement('li')
        const form = event.target
        newListItem.textContent = `${event.target.commonName.value} - ${event.target.scientificName.value} - ${event.target.conservationStatus.value}`
        const list = document.getElementById('endangered-animals-list')
        if (list.innerHTML === '') {
            createDeleteButton()
        }
        list.appendChild(newListItem)
        this.reset()
    })
})

const createDeleteButton = () => {
    const deleteButton = document.createElement('button')
    deleteButton.type = "button"
    deleteButton.innerHTML = "Delete All"
    document.querySelector('#endangered-animals-list').after(deleteButton)
    deleteButton.addEventListener('click', function () {
        const list = document.getElementById('endangered-animals-list')
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild)
        }
        document.querySelector('body').removeChild(this)
    })
}