function cnpjMask(mascara, input) {
  const vetMask = mascara.split('')
  const cnpjNum = input.value.replace(/\D/g, '')
  const cursor = input.selectionStart
  const tecla = (window.event) ? event.keyCode : event.which

  for (let i = 0; i < cnpjNum.length; i++) {
    vetMask.splice(vetMask.indexOf('_'), 1, cnpjNum[i])
  }

  input.value = vetMask.join('')

  if ((tecla != 37) && (cursor === 2 || cursor === 6 || cursor === 10 || cursor === 15)) {
    input.setSelectionRange(cursor + 1, cursor + 1)
  } else {
    input.setSelectionRange(cursor, cursor)
  }
}

function isCnpj(cnpj) {
  let numeros = cnpj.split('-')[0].replace(/[.|\/]/g, '')
  let digitos = cnpj.split('-')[1]

  var peso = 2;
  var resultado = 0;
  for (let i = numeros.length - 1; i >= 0; i--) {
    resultado += numeros[i] * peso;
    peso = (peso >= 9) ? 2 : (peso + 1)
  }
  modulo = resultado % 11;
  resultado = (modulo < 2 ? 0 : (11 - modulo))
  if (resultado != digitos[0])
    return false

  peso = 2;
  resultado = 0;
  var num = (numeros + '' + digitos[0])
  for (let i = num.length - 1; i >= 0; i--) {
    resultado += num[i] * peso;
    peso = (peso >= 9) ? 2 : (peso + 1)
  }
  modulo = resultado % 11;
  resultado = (modulo < 2 ? 0 : (11 - modulo))
  console.log('sd: ' + resultado)
  if (resultado != digitos[1])
    return false

  return true
}

function cpfMask(mascara, input) {
  const vetMask = mascara.split('')
  const numCpf = input.value.replace(/\D/g, '')
  const cursor = input.selectionStart
  const tecla = (window.event) ? event.keyCode : event.which
  for (let i = 0; i < numCpf.length; i++) {
    vetMask.splice(vetMask.indexOf('_'), 1, numCpf[i])
  }

  input.value = vetMask.join('')

  if ((tecla != 37) && (cursor === 3 || cursor === 7 || cursor === 11)) {
    input.setSelectionRange(cursor + 1, cursor + 1)
  } else {
    input.setSelectionRange(cursor, cursor)
  }

}

function isCpf(cpf = 0) {
  console.log(cpf)
  cpf = cpf.replace(/\.|-/g, '');
  let soma = 0;

  for (var i = 0; i < cpf.length - 2; i++) {
    soma += cpf[i] * ((cpf.length - 1) - i);
  }
  soma = (soma * 10) % 11;
  if (soma == 10 || soma == 11)
    soma = 0;
  console.log('pd: ' + soma)
  if (soma != cpf[9])
    return false

  soma = 0;
  for (var i = 0; i < cpf.length - 1; i++) {
    soma += cpf[i] * ((cpf.length) - i);
  }
  soma = (soma * 10) % 11;
  if (soma == 10 || soma == 11)
    soma = 0;

  console.log('sd: ' + soma)
  if (soma != cpf[10])
    return false

  return true;
}

function telMask(mascara, input) {
  const vetMask = mascara.split('')
  const numTel = input.value.replace(/\D/g, '')
  const cursor = input.selectionStart
  const tecla = (window.event) ? event.keyCode : event.which

  for (let i = 0; i < numTel.length; i++) {
    vetMask.splice(vetMask.indexOf('_'), 1, numTel[i])
  }

  input.value = vetMask.join('')

  if ((tecla != 37) && (cursor === 1 || cursor === 3 || cursor === 9)) {
    input.setSelectionRange(cursor + 1, cursor + 1)
  } else {
    input.setSelectionRange(cursor, cursor)
  }
}

function addModal(cnpj) {
  const modals = document.querySelectorAll('div.modal');

  // for (const modal in modals) {
  //   // modals[modal].style.top =  '-100%';
  //   // console.log(modals[modal].style)
  // }

  const modal = document.getElementById(cnpj);

  modal.style.top = '25%';
}

function removeModal(cnpj) {
  const modal = document.getElementById(cnpj);
  modal.style.top = '-100%';
}



const fields = document.querySelectorAll('[required]')

function validateField(field) {
  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: 'Por favor, preencha este campo'
      },
      email: {
        valueMissing: 'O email é obrigatório',
        typeMismatch: 'Por favor, preencha um email válido'
      }
    }

    return messages[field.type][typeError]
  }

  function verifyErrors() {
    let foundError = false;

    for(let error in field.validity) {
      if(field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }
    return foundError;
  }

  function setCustomMesage(message) {
    const spanError = field.parentNode.querySelector('span.error')
    if(message) {
      spanError.innerHTML = message;
    } else {
      spanError.innerHTML = '';
    }
  }

  return function() {
    const error = verifyErrors()

    if (error) {
      const message = customMessage(error)

      field.style.borderColor = 'red'
      setCustomMesage(message)
    } else {
      field.style.borderColor = 'green';
      setCustomMesage()
    }
  }
}

function customValidate(event) {
  const field = event.target
  const validation = validateField(field)
  
  validation()
}

for(field of fields) {
  field.addEventListener('invalid', event => {
    event.preventDefault()

    customValidate(event)
  })
  field.addEventListener('blur', customValidate)
} 

function dataIsValid() {
  const cnpjField = document.querySelector('div.create #cnpj')
  const cpfField = document.querySelector('div.create #cpf')

  if(!isCnpj(cnpjField.value)){
    console.log('cnj')
    alert('Por favor, digite um CNPJ válido!')
    return false
  }

  if(!isCpf(cpfField.value)) {
    window.alert('Por favor, digite um CPF válido!')
    return false
  }

  return true
}

document.querySelector('form')
.addEventListener('submit', event => {
  
  if(!dataIsValid())
    return event.preventDefault()
})