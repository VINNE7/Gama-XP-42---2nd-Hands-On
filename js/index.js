function orderEvents(events) {
    return events.sort((event1, event2) => { return new Date(event1.scheduled) - new Date(event2.scheduled) })
}

function removePastEvents(events) {
    return events.filter((event) => {
        return new Date() - new Date(event.scheduled) < 0;
    })
}

function renderEvents(removedPastEvents) {
    const splicedEvents = removedPastEvents.slice(0, 3);
    console.log(splicedEvents);

    splicedEvents.forEach(splicedEvent => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('evento');
        articleElement.classList.add('card');
        articleElement.classList.add('p-5');
        articleElement.classList.add('m-3');

        const h2Element = document.createElement('h2');
        const eventName = splicedEvent.name;
        const eventDate = splicedEvent.scheduled.substring(0,10).replaceAll('-','/');
        h2Element.innerText = eventName + " - " + eventDate;
        // h2Element.innerText = splicedEvent.name + " - " + splicedEvent.scheduled.substring(0,10).replaceAll('-', '/');

        const h4Element = document.createElement('h4');
        h4Element.innerText = splicedEvent.attractions.join(', ');

        const pElement = document.createElement('p');
        pElement.innerText = splicedEvent.description;

        const anchorElement = document.createElement('a');
        anchorElement.classList.add('btn');
        anchorElement.classList.add('btn-primary');
        anchorElement.innerText = "reservar ingresso";

        const articlesContainer = document.querySelector('#events-container');

        articleElement.append(h2Element, h4Element, pElement, anchorElement);

        articlesContainer.append(articleElement);
    })

}

const arrowGetEvents = async () => {
    try {
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events');
        console.log(response);

        const data = await response.json();
        // console.log(data);
        return data;


    } catch (error) {
        console.error(error);
    }
}

async function main() {
    try {
        const events = await arrowGetEvents();
        console.log(events);
        const orderedEvents = orderEvents(events);
        const removedPastEvents = removePastEvents(orderedEvents);
        console.log(removedPastEvents);
        renderEvents(removedPastEvents);
    } catch (error) {
        console.error(error);
    }
}

main();


// async function getEvents(){
//     try{
//         const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events')
//         console.log(response);

//         }catch(error){

//     }
// }

