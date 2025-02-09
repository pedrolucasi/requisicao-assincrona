const cepForm = document.querySelector('#cep'); 
const cepErrorForm = document.querySelector('#cepError')
const streetForm = document.querySelector('#street');
const numberForm = document.querySelector('#number');
const neighborhoodForm = document.querySelector('#neighborhood');
const stateForm = document.querySelector('#state');
const cityForm = document.querySelector('#city');

cepForm.addEventListener('blur', () => {
    const cep = cepForm.value.replace(/\D/g, ''); 

    if (cep.length===8) { 
        fetch(`https://viacep.com.br/ws/${cep}/json/`) 
        .then(response => response.json())
        .then(data => {
            if (data.erro) { 
                showCepError(); 
                clearFields();
            } else {
                fillFields(data); 
                hideCepError();
            }
        })
        .catch(() => { 
            showCepError();
            clearFields();
        });
    } else {
        showCepError(); 
    }
});

function fillFields(data) {
    streetForm.value = data.logradouro; 
    neighborhoodForm.value = data.bairro;
    cityForm.value = data.localidade;
    stateForm.value = data.uf;
}

function clearFields() { 
    streetForm.value = '';
    neighborhoodForm.value = '';
    cityForm.value = '';
    stateForm.value = '';
}

function showCepError () { 
    cepErrorForm.classList.remove('hidden');
    cepErrorForm.classList.add('input-cep-error');
}

function hideCepError () { 
    cepErrorForm.classList.add('hidden');
    cepErrorForm.classList.remove('input-cep-error');
}