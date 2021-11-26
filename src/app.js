document.addEventListener("DOMContentLoaded", () => {
    console.log("script loaded")

    document.querySelector('#add-animal-form').addEventListener('submit', function (event) {
        event.preventDefault()
        const newListItem = document.createElement('li')
        const form = event.target
        newListItem.textContent = `${event.target.commonName.value} - ${event.target.scientificName.value} - ${event.target.conservationStatus.value}`
        const list = document.getElementById('endangered-animals-list')
        list.appendChild(newListItem)
        this.reset()
    })
})