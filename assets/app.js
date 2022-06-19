
import './forms.js'

window.addEventListener('load', (event) => {
    // GET DISTRICTS BY PROVINCE
    let options = document.getElementById("select2_input")
    axios.get('../data/provinces.json')
        .then(rspnse => {

            rspnse.data.provinces.map(data => {

                let opt = `<option value=${data}> ${data} </option>`
                options.insertAdjacentHTML("afterend", opt);
            })
        })

    // GET MUNICIPALITIES / RURAL MUNICIPALITIES BY DISTRICT

    let optionsDistrict = document.getElementById('options_district')

    axios.get('../data/districts.json')
        .then(rspnse => {
            rspnse.data.districts.map(data => {

                let opt = `<option value=${data}> ${data} </option>`
                optionsDistrict.insertAdjacentHTML("afterend", opt);
            })
        })
});

