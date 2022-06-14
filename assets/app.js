
import './forms.js'

window.addEventListener('load', (event) => {
    // GET DISTRICTS BY PROVINCE
    let options = document.getElementById("select2_input")
    axios.get('../../data/province.json')
        .then(rspnse => {

            rspnse.data.data.map(data => {

                let opt = `<option value=${data}> ${data} </option>`
                options.insertAdjacentHTML("afterend", opt);
            })
        })

    // GET MUNICIPALITIES / RURAL MUNICIPALITIES BY DISTRICT

    let optionsDistrict = document.getElementById('options_district')

    axios.get('../../data/districts.json')
        .then(rspnse => {
            rspnse.data.data.map(data => {

                let opt = `<option value=${data}> ${data} </option>`
                optionsDistrict.insertAdjacentHTML("afterend", opt);
            })
        })
});



// 
function copyData(id) {



    console.log(id)
    let data = document.getElementById(id).innerText

    console.log(data)
}