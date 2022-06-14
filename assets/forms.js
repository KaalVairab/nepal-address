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
                axios.get(`../../data/districtsByProvince/${getDistrictsByProvinceSelect.value}.json`)
                    .then(rspnse => {
                        console.log(rspnse)

                        let districts = JSON.stringify(rspnse.data)
                        createResultContainer(getDistrictsByProvinceForm, districts)
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

                axios.get(`../../data/municipalsByDistrict/${getMunicipalitiesSelect.value}.json`)
                    .then(rspnse => {
                        console.log(rspnse)

                        let municipals = JSON.stringify(rspnse.data)
                        createResultContainer(getMunicipalitiesForm, municipals)
                    })
            }
        })
    }
})



const createResultContainer = (form, data) => {
    let container = snippet(data)
    form.insertAdjacentHTML("afterend", container);
}


const snippet = (data) => {
    return (
        `<div class="py-5">
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


