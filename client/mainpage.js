document.addEventListener('DOMContentLoaded', () => {
    let sightingForm = document.querySelector('#sightingForm');
        sightingForm.addEventListener('change', (event) => {
        console.log(`button was changed to ${event.target.value}`)
    })

    let researcherForm = document.querySelector('#researcherForm');
researcherForm.addEventListener('change', (event) => {
    console.log(`drop was changed to ${event.target.value}`)
})
})


const getResearcherSighting = async () =>{
    response = await axios.get(``)

}





// dropperSelect.addEventListener("change", (e) => {
//     const holdGoingTo = e.target.options[e.target.selectedIndex].value;
//     // var text = e.target.options[e.target.selectedIndex].text; // saved for future display of Hold Name
//     swReloadFromUserChange(userId, holdGoingTo);
// });