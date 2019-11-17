document.addEventListener('DOMContentLoaded', () => {
    let sightingForm = document.querySelector('#sightingForm');
    sightingForm.addEventListener('change', (event) => {
        console.log(`button was changed to ${event.target.value}`);
        selectedButton(event.target.value);

    })

    let researcherForm = document.querySelector('#researcherForm');
    researcherForm.addEventListener('change', (event) => {
        console.log(`drop was changed to ${event.target.value}`);
        getResearcherSighting(event.target.value);
    })
})
const selectedButton = (button) => {
    let value = button;
    let researcherForm = document.querySelector('#researcherForm');
    if (value === 'all') {
        researcherForm.style.visibility = 'hidden';
        getAllSighting();
    } else {
        makeDropDown();
        researcherForm.style.visibility = 'visible';

    }
}

const getAllSighting = async (event) => {
    response = await axios.get(`http://localhost:2591/sightings/`)
    let all = response.data.payload;
    console.log(all)
    let sightingOL = document.querySelector('#sightings');
    sightingOL.innerText = '';
    let vowels = ['A', 'E', 'I', 'O', 'U'];
    all.forEach((single) => {
        let listItem = document.createElement('li');

        if (vowels.includes(single.species_name[0])) {
            listItem.innerText = `An ${single.species_name} was spotted by ${single.researcher_name} in the ${single.category}.`;
        }
        else {
            listItem.innerText = `A ${single.species_name} was spotted by ${single.researcher_name} in the ${single.category}.`;

        }
        sightingOL.append(listItem);
    });
}

const makeDropDown = async () => {
    let sightingUL = document.querySelector('#sightings');
    sightingUL.innerText = '';

    let select = document.querySelector('#researchers');

    response = await axios.get(`http://localhost:2591/researchers/`)
    let researchers = response.data.payload;

    researchers.forEach((researcher) => {
        let option = document.createElement('option');
        option.setAttribute("value", `${researcher.id}`/*`${index}`*/)
        option.innerText = researcher.name;
        select.add(option)
    })
}
const getResearcherSighting = async (researcher_id) =>{
    let sightingOL = document.querySelector('#sightings');
    sightingOL.innerText = '';

response = await axios.get(`http://localhost:2591/sightings/researchers/${researcher_id}`);
let all = response.data.payload;
// console.log(all)
let vowels = ['A', 'E', 'I', 'O', 'U'];
    all.forEach((single) => {
        let listItem = document.createElement('li');

        if (vowels.includes(single.species_name[0])) {
            listItem.innerText = `An ${single.species_name} was spotted by ${single.researcher_name} in the ${single.category}.`;
        }
        else {
            listItem.innerText = `A ${single.species_name} was spotted by ${single.researcher_name} in the ${single.category}.`;

        }
        sightingOL.append(listItem);
    });
}





// dropperSelect.addEventListener("change", (e) => {
//     const holdGoingTo = e.target.options[e.target.selectedIndex].value;
//     // var text = e.target.options[e.target.selectedIndex].text; // saved for future display of Hold Name
//     swReloadFromUserChange(userId, holdGoingTo);
// });