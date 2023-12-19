async function getData() {
    try {
        const response = await fetch('http://localhost:8000/omeka/api/items')
        if (!response.ok) {
            throw new Error("La réponse n'a pas pu être retourné")
        }

        return response.json()
    } catch (error) {
        console.error('Un problème serveur est survenu :', error)

        return null
    }
}

async function showItems() {
    const items = await getData()

    if (items) {
        creationItemsInHtml(items)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showItems()
})

/**
 * @param { Object } items 
 */
function creationItemsInHtml(items) {
    const row = d3.select('.row')
    setInformations(row, items)
}

function setInformations(row, items) {
    const cards = row.selectAll('.row')
        .data(items)
        .enter()
        .append('div')
        .attr('class', 'card border-secondary mb-3 mx-5')
        .attr('style', 'max-width: 18rem;')

    cards.append('div')
        .attr('class', 'card-header')
        .text((item) => item['o:title'])
        
    const cardBody = cards.append('div')
        .attr('class', 'card-body text-secondary')

    cardBody.append('img')
        .attr('class', 'card-img-top')
        .attr('src', (item) => item['o:media'])

    cardBody.append('p')
        .attr('class', 'card-text')
        .text((item) => 'Identifiant ' + item['o:id'])
}

  