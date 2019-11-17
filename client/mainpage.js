document.addEventListener('DOMContentLoaded', () => {
    let sightingForm = document.querySelector('#sightingForm');
    sightingForm.addEventListener('change', (event) => {
        selectedButton(event.target.value);
    })

    let researcherForm = document.querySelector('#researcherForm');
    researcherForm.addEventListener('change', (event) => {
        getResearcherSighting(event.target.value);
    });
    loadAnimals();
    loadResearchers();
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
    let response = await axios.get(`http://localhost:2591/sightings/`)
    let all = response.data.payload;
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
    select.options.length = 0;
    let response = await axios.get(`http://localhost:2591/researchers/`)
    let researchers = response.data.payload;
    let stock = document.createElement('option');
    stock.setAttribute('selected', 'true');
    stock.setAttribute('disabled', 'disabled');
    stock.innerText = `Please Choose a Researcher`;
    select.add(stock)
    researchers.forEach((researcher) => {
        let option = document.createElement('option');
        option.innerText = '';
        option.setAttribute("value", `${researcher.id}`/*`${index}`*/)
        option.innerText = researcher.name;
        select.add(option)
    })

}
const getResearcherSighting = async (researcher_id) => {
    let sightingOL = document.querySelector('#sightings');
    sightingOL.innerText = '';

    let response = await axios.get(`http://localhost:2591/sightings/researchers/${researcher_id}`);
    let all = response.data.payload;
    let vowels = ['A', 'E', 'I', 'O', 'U'];
    all.forEach((single) => {
        let listItem = document.createElement('li');

        if (vowels.includes(single.species_name[0])) {
            listItem.innerText = `Spotted an ${single.species_name} in the ${single.category}.`;
        }
        else {
            listItem.innerText = `Spotted a ${single.species_name} in the ${single.category}.`;

        }
        sightingOL.append(listItem);
    });
}

const loadAnimals = async () => {
    let animalList = document.querySelector('#animals');
    let response = await axios.get(`http://localhost:2591/animals`);
    let animals = response.data.payload;
    let vowels = ['A', 'E', 'I', 'O', 'U'];
    animals.forEach((animal) => {
        let listItem = document.createElement('li');
        if (vowels.includes(animal.name[0])) {
            listItem.innerText = `An ${animal.name} named ${animal.nickname}.`;
        }
        else {
            listItem.innerText = `A ${animal.name} named ${animal.nickname}.`;
        }
        animalList.append(listItem)
    });
}

const loadResearchers = async () => {
    let researcherList = document.querySelector('#scientists');
    let response = await axios.get(`http://localhost:2591/researchers`);
    let researchers = response.data.payload;
    researchers.forEach((researcher) => {
        let listItem = document.createElement('li');
        let person =researcher.job_title.bold()
        listItem.innerHTML = `${person}: ${researcher.name}`;
        researcherList.append(listItem);
    })
}