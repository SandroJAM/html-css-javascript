class Validator {
  
  constructor() {
    this.validations = [
        'data-min-length',
    ]
  }

  // Iniciar a validação de todos os campos
  validate(form) {

  // Pegar os inputs
  let inputs = form.getElementsByTagName('input');
  // console.log(inputs);
  // Transformar um HTMLCollection -> Array
  let inputsArray = [...inputs];
  // console.log(inputsArray);
  // Loop nos inputs e validação mediante ao que for encontrado
  inputsArray.forEach(function(input) {
    // console.log(input);
    // Loop em todas as validações existentes
      for(let i = 0; this.validations.length > i; i++) {
        // Verifica se a validação atual existe no input
        if(input.getAttribute(this.validations[i]) !=null) {
          // console.log(input.getAttribute(this.validations[i]));
          // console.log('Achou Validação');

          // Transformar data-min-length no metodo minlength
          // Limpando a String para virar um método
          let method = this.validations[i].replace('data-', ''). replace('-', '');
          // Valor do input - Atributo da validação
          let value = input.getAttribute(this.validations[i]);
          // Invocar o método
          this[method](input, value);
        }
      }
    }, this);
  }

  // Verifica se um input tem um número mínimo de caracteres

  minlength(input, minValue) {
    // console.log(input);
    // console.log(minValue);
    let inputLength = input.value.length;
    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
    if(inputLength < minValue) {
      this.printMessage(input, errorMessage);
      // console.log(errorMessage);
    }
  }

  // Método para imprimir mensagem de erro na tela

  printMessage(input, msg){
    let template = document.querySelector('.error-validation').cloneNode(true);
    template.textContent = msg;
    let inputParent = input.parentNode; // Achar local para mensagem - Input não aceita HTML
    template.classList.remove('template');
    inputParent.appendChild(template); 
  }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator();

// evento que dispara as validações

submit.addEventListener('click', function(e) {
  
    e.preventDefault();
  // console.log('funcionou');
  validator.validate(form);
});