const tableSelector = document.querySelector('.table');
console.log(tableSelector);
const tableBodySelector = tableSelector.childNodes[3];
console.log(tableBodySelector);

function createEventElements(data){
    data.forEach((event, index) => { 
        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'row');
        thElement.innerText = index + 1;
        

        const firstTdElement = document.createElement('td');
        const date = event.scheduled.substring(0, 10);
        const time = event.scheduled.substring(11, 16);
        const dateAndTime = date + " " + time;
        firstTdElement.innerText = dateAndTime.replaceAll('-', '/')

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.name;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.attractions.join(', ');

        const fourthTdElement = document.createElement('td');

        const firstAnchor = document.createElement('a');
        firstAnchor.innerText = "ver reservas";
        firstAnchor.classList.add('btn');
        firstAnchor.classList.add('btn-dark');
        firstAnchor.href = 'reservas.html'

        const secondAnchor = document.createElement('a');
        secondAnchor.innerText = "editar";
        secondAnchor.classList.add('btn');
        secondAnchor.classList.add('btn-secondary');
        secondAnchor.href = 'editar-evento.html?id='+ event._id;


        const thirdAnchor = document.createElement('a');
        thirdAnchor.innerText = "excluir";
        thirdAnchor.classList.add('btn');
        thirdAnchor.classList.add('btn-danger');
        thirdAnchor.href = 'excluir-evento.html?id='+ event._id;


        trElement.appendChild(thElement);
        trElement.appendChild(firstTdElement);
        trElement.appendChild(secondTdElement);
        trElement.appendChild(thirdTdElement);

        fourthTdElement.appendChild(firstAnchor);
        fourthTdElement.appendChild(secondAnchor);
        fourthTdElement.appendChild(thirdAnchor);

        trElement.appendChild(fourthTdElement);


        tableBodySelector.appendChild(trElement);
     })
}


fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
  "method": "GET",
  "headers": {}
})
.then(response => {
  console.log(response);
  return response.json();
}).then(data => {
    console.log(data);
    createEventElements(data);
})
.catch(err => {
  console.error(err);
});



