window.addEventListener('load', (event) => {

    let options = document.getElementById("select2_input")
    axios.get('../../data/all-address.json')
        .then(rspnse => {

            let data = rspnse.data.province

            let listProvince = Object.keys(data)
            console.log(listProvince)

            listProvince.map(data => {

                let html = `<option value=${data}> ${data} </option>`
                options.insertAdjacentHTML("afterend", html);
            })
        })
});

// Define form element
const form = document.getElementById('kt_docs_formvalidation_select2');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var validator = FormValidation.formValidation(
    form,
    {
        fields: {
            'select2_input': {
                validators: {
                    notEmpty: {
                        message: 'Select2 input is required'
                    }
                }
            },
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

// Revalidate Select2 input. For more info, plase visit the official plugin site: https://select2.org/
$(form.querySelector('[name="select2_input"]')).on('change', function () {
    // Revalidate the field when an option is chosen
    validator.revalidateField('select2_input');
});


// Submit button handler
const submitButton = document.getElementById('kt_docs_formvalidation_select2_submit');
submitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (validator) {
        validator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                submitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                submitButton.disabled = true;

                let province = document.getElementById('get_districts_by_province_select').value

                let axiosReturnData
                axios.get('../../data/all-address.json')
                    .then(rspnse => {

                        axiosReturnData = rspnse


                    }).catch(err => {
                        axiosReturnData = err.response
                    }).then(() => {

                        // Remove loading indication
                        submitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        submitButton.disabled = false;

                        console.log(axiosReturnData)
                        if (axiosReturnData.status == "200") {
                                    

                            document.getElementById('result_container').classList.remove('d-none')


                            let result = document.getElementById('result')

                            let data = Object.entries(axiosReturnData.data.province)


                            for (let i = 0; i < data.length; i++) {
                                if
                                    (data[i].find(d => d == province)) {
                                    console.log(data[i][1])

                                    result.innerHTML = JSON.stringify(data[i][1], null, 2)
                                }



                            }
                        } else if (axiosReturnData.status != 200) {
                            Swal.fire({
                                text: axiosReturnData.statusText,
                                icon: "error"
                            })
                        }
                    })

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                // setTimeout(function () {
                //     // Remove loading indication
                //     submitButton.removeAttribute('data-kt-indicator');

                //     // Enable button
                //     submitButton.disabled = false;

                //     // Show popup confirmation
                //     Swal.fire({
                //         text: "Form has been successfully submitted!",
                //         icon: "success",
                //         buttonsStyling: false,
                //         confirmButtonText: "Ok, got it!",
                //         customClass: {
                //             confirmButton: "btn btn-primary"
                //         }
                //     });

                //     //form.submit(); // Submit form
                // }, 2000);
            }
        });
    }
});



const copyData = (id) => {
    console.log(id)

    // let data = document.getElementById(id).innerText

    // console.log(data)
}



