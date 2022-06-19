const getDistrictsByProvinceForm = document.getElementById('get_districts_by_province')
const getDistrictsByProvinceSelect = document.getElementById('get_districts_by_province_select')
const getDistrictsByProvinceSubmit = document.getElementById('get_districts_by_province_submit')

var validatorGetDistricts = FormValidation.formValidation(
    getDistrictsByProvinceForm,
    {
        fields: {
            'province': {
                validators: {
                    notEmpty: {
                        message: 'required !'
                    }
                }
            },
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '.border-danger',
                eleValidClass: ''
            })
        }
    }
);


getDistrictsByProvinceSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    if (validatorGetDistricts) {
        validatorGetDistricts.validate().then(function (status) {

            if (status == "Valid") {
                axios.get(`data/districtsByProvince/${getDistrictsByProvinceSelect.value}.json`)
                    .then(rspnse => {
                        console.log(rspnse)

                        let districts = JSON.stringify(rspnse.data)
                        createResultContainer(getDistrictsByProvinceForm, districts,`Districts of ${getDistrictsByProvinceSelect.value}`)
                    })
            }
        })
    }
})



const getMunicipalitiesForm = document.getElementById('get_municipalites_form')
const getMunicipalitiesSelect = document.getElementById('get_municipalities_by_district_select')
const getMunicipalitiesSubmit = document.getElementById('get_municipalites_form_submit')

var validatorMunicipalities = FormValidation.formValidation(
    getMunicipalitiesForm,
    {
        fields: {
            'district': {
                validators: {
                    notEmpty: {
                        message: 'required !'
                    }
                }
            },
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '.border-danger',
                eleValidClass: ''
            })
        }
    }
);


getMunicipalitiesSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    if (validatorMunicipalities) {
        validatorMunicipalities.validate().then(function (status) {

            if (status == "Valid") {

                axios.get(`../data/municipalsByDistrict/${getMunicipalitiesSelect.value}.json`)
                    .then(rspnse => {
                        console.log(rspnse)

                        let municipals = JSON.stringify(rspnse.data)
                        createResultContainer(getMunicipalitiesForm, municipals,`Municipals of ${getMunicipalitiesSelect.value}`)
                    })
            }
        })
    }
})


const getDistrictsProvincesForm = document.getElementById('get_districts_province')
const getDistrictsProvincesSelect = document.getElementById('get_districts_province_select')
const getDistrictsProvincesSubmit = document.getElementById('get_districts_province_submit')

var validatorGetDistrictsProvinces = FormValidation.formValidation(
    getDistrictsProvincesForm,
    {
        fields: {
            'select': {
                validators: {
                    notEmpty: {
                        message: 'required !'
                    }
                }
            },
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '.border-danger',
                eleValidClass: ''
            })
        }
    }
);


getDistrictsProvincesSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    if (validatorGetDistrictsProvinces) {
        validatorGetDistrictsProvinces.validate().then(function (status) {

            if (status == "Valid") {
                axios.get(`../data/${getDistrictsProvincesSelect.value}.json`)
                    .then(rspnse => {
                        console.log(`${getDistrictsProvincesSelect.value}`)

                        let data = JSON.stringify(rspnse.data)
                        createResultContainer(getDistrictsProvincesForm, data, `All ${getDistrictsProvincesSelect.value}`)
                    })
            }
        })
    }
})






const createResultContainer = (form, data,name) => {
    console.log(name)
    let container = snippet(data,name)
    form.insertAdjacentHTML("afterend", container);
}


const snippet = (data,name) => {
    return (
        `<div class="py-5">
        <em class="mb-4 d-block">${name} :</em>
        <div class="highlight">
        <button class="highlight-copy btn" onClick="copy(this)" data-bs-toggle="tooltip" title="Copy code">copy</button>
        <div class="highlight-code">
        <pre class="language-html">
        ${data}
        </pre>
        </div>
        </div>
        </div>`
    )
}


