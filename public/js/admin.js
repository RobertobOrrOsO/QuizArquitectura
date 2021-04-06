const main = document.querySelector('main');
const btnInsert = document.querySelector('#btnInsert');

// FETCH LEER PREGUNTAS

function readQuestions(){
  fetch('/readQuestion')
  .then(response => response.json())
  .then(data =>{
    console.log('1', data.data);
    data.data.map(el => printQuestions(el))
  })
}







// PINTAR PREGUNTAS

function printQuestions (el){
  let question = document.createElement('p');
  question.textContent = el.q;
  question.setAttribute('id', question);
  question.setAttribute('class', question);
  main.appendChild(question);

  let btnUpdate = document.createElement('button');
  btnUpdate.textContent = 'Editar';
  btnUpdate.setAttribute('type', 'button');
  btnUpdate.setAttribute('class', 'boton');
  main.appendChild(btnUpdate);

  btnUpdate.addEventListener('click', () => {
    editAnswer(el);
  })

  let qDelete = document.createElement('button');
  qDelete.textContent = 'Eliminar';
  qDelete.setAttribute('type', 'button');
  qDelete.setAttribute('class', 'boton');
  main.appendChild(qDelete);

  qDelete.addEventListener('click', () => {
    deleteQuestion(el);
  })
}

// INVOCAMOS AL ABRIR EL DOCUMENTO

readQuestions()








// FUNCIÓN BORRAR DOM

function removeBody(){
  document.querySelector('main').querySelectorAll('*').forEach(el => el.remove())
}








// CREAR PREGUNTAS EN FRONT

btnInsert.addEventListener('click', createQuestion)

function createQuestion(){

  removeBody()

  // PREGUNTA

  let qInput = document.createElement('input');
  qInput.setAttribute('placeholder', 'Escribir pregunta');
  qInput.setAttribute('class', ''); ///////////////////////////////////////
  main.appendChild(qInput);

  // RESPUESTAS

  let aInput01 = document.createElement('input');
  aInput01.setAttribute('placeholder', 'Respuesta 1');
  aInput01.setAttribute('class', ''); /////////////////////////////////
  main.appendChild(aInput01);

  let aInput02 = document.createElement('input');
  aInput02.setAttribute('placeholder', 'Respuesta 2');
  aInput02.setAttribute('class', ''); ///////////////////////////////////
  main.appendChild(aInput02);

  let aInput03 = document.createElement('input');
  aInput03.setAttribute('placeholder', 'Respuesta 3');
  aInput03.setAttribute('class', ''); ///////////////////////////////////
  main.appendChild(aInput03);

  let aInput04 = document.createElement('input');
  aInput04.setAttribute('placeholder', 'Respuesta 4');
  aInput04.setAttribute('class', ''); ///////////////////////////////////
  main.appendChild(aInput04);

// SELECTOR

  let okSelector = document.createElement('select');
  okSelector.setAttribute('id', 'select');
  main.appendChild(okSelector);
  
      let ok01 = document.createElement('option');
      ok01.textContent = '1';
      ok01.setAttribute('value', 0);
      ok01.setAttribute('id', 'ok01');
      okSelector.appendChild(ok01);

      let ok02 = document.createElement('option');
      ok02.textContent = '2';
      ok02.setAttribute('value', 1);
      ok02.setAttribute('id', 'ok02');
      okSelector.appendChild(ok02);

      let ok03 = document.createElement('option');
      ok03.textContent = '3';
      ok03.setAttribute('value', 2);
      ok03.setAttribute('id', 'ok03');
      okSelector.appendChild(ok03);

      let ok04 = document.createElement('option');
      ok04.textContent = '4';
      ok04.setAttribute('value', 3);
      ok04.setAttribute('id', 'ok04');
      okSelector.appendChild(ok04);

// BOTÓN ENVIAR PREGUNTAS

  let submitBtn = document.createElement('button');
  submitBtn.textContent = 'Crear';
  submitBtn.setAttribute = ('id', 'submitBtn');
  submitBtn.setAttribute = ('class', 'boton')
  main.appendChild(submitBtn);

  // BOTÓN VOLVER

  let returnBtn = document.createElement('button');
  returnBtn.textContent = 'Volver';
  returnBtn.setAttribute = ('id', 'returnBtn');
  returnBtn.setAttribute = ('class', 'boton');
  main.appendChild(returnBtn);

  // ACCIONES BOTONES

  submitBtn.addEventListener('click', () => {
    submitQuestion(qInput.value, aInput01.value, aInput02.value, aInput03.value, aInput04.value, Number(okSelector.value))

    createQuestion()
  })

  returnBtn.addEventListener('click', () => {
    removeBody();
    readQuestions();
  })
}







// PINTAR NUEVAS PREGUNTAS EN FRONT

function submitQuestion(elQ, elA01, elA02, elA03, elA04, elOk){
  fetch('/saveQuestion', {
      method: 'POST',
      body: JSON.stringify({
        q: elQ,
        a: [elA01, elA02, elA03, elA04],
        ok: elOk
      }),
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 400){
      alert(data.alert)
    }
    else{
      alert(data.alert)
      // window.location.href = data.url
      console.log(data.url)
    }
  })
  .catch(err => console.log('Algo no va bien.', err))
}








// EDITAR PREGUNTAS

function editAnswer(el){

  removeBody()

  // PREGUNTA

  let qInput = document.createElement('input');
  qInput.setAttribute('value', el.q);
  qInput.setAttribute('class', ''); ///////////////////////////////////
  main.appendChild(qInput);

  // RESPUESTAS

  let aInput01 = document.createElement('input');
  aInput01.setAttribute('value', el.a[0]);
  aInput01.setAttribute('class', ''); ////////////////////////////////
  main.appendChild(aInput01);

  let aInput02 = document.createElement('input');
  aInput02.setAttribute('value', el.a[1]);
  aInput02.setAttribute('class', ''); ////////////////////////////////
  main.appendChild(aInput02);

  let aInput03 = document.createElement('input');
  aInput03.setAttribute('value', el.a[2]);
  aInput03.setAttribute('class', ''); ////////////////////////////////
  main.appendChild(aInput03);  

  let aInput04 = document.createElement('input');
  aInput04.setAttribute('value', el.a[3]);
  aInput04.setAttribute('class', ''); ////////////////////////////////
  main.appendChild(aInput04);

  // SELECTOR

  let okSelector = document.createElement('select');
  okSelector.setAttribute('id', 'select');
  main.appendChild(okSelector);

      let ok01 = document.createElement('option');
      ok01.textContent = '1';
      ok01.setAttribute('value', 0);
      ok01.setAttribute('id', 'ok01');
      okSelector.appendChild(ok01);

      let ok02 = document.createElement('option');
      ok02.textContent = '2';
      ok02.setAttribute('value', 1);
      ok02.setAttribute('id', 'ok02');
      okSelector.appendChild(ok02);      

      let ok03 = document.createElement('option');
      ok03.textContent = '3';
      ok03.setAttribute('value', 2);
      ok03.setAttribute('id', 'ok03');
      okSelector.appendChild(ok03);

      let ok04 = document.createElement('option');
      ok04.textContent = '4';
      ok04.setAttribute('value', 3);
      ok04.setAttribute('id', 'ok04');
      okSelector.appendChild(ok04);

  // BOTÓN ENVIAR PREGUNTAS

  let submitBtn = document.createElement('button');
  submitBtn.textContent = 'Guardar cambios';
  submitBtn.setAttribute = ('id', 'submitBtn');
  submitBtn.setAttribute = ('class', 'boton')
  main.appendChild(submitBtn);

    // BOTÓN VOLVER

    let returnBtn = document.createElement('button');
    returnBtn.textContent = 'Volver';
    returnBtn.setAttribute = ('id', 'returnBtn');
    returnBtn.setAttribute = ('class', 'boton');
    main.appendChild(returnBtn);
  
    // ACCIONES BOTONES
  
    submitBtn.addEventListener('click', () => {
      editDBAnswer(qInput.value, aInput01.value, aInput02.value, aInput03.value, aInput04.value, Number(okSelector.value), el._id) /// SE PONE ID PORQUE ES EL ELEMENTO DIFERENCIADOR Y ÚNICO
    })
  
    returnBtn.addEventListener('click', () => {
      removeBody();
      readQuestions();
    })
}

function editDBAnswer(elQ, elA01, elA02, elA03, elA04, elOk, id){
  fetch('/editQuestion', {
    method: 'PUT',
    body: JSON.stringify({
      q: elQ,
      a: [elA01, elA02, elA03, elA04],
      ok: elOk,
      _id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 400){
      alert(data.data) ////////////////////NO ACABO DE ENTENDER ESTE DATA.DATA??????????????????????????
      console.log(data)
    }
    else {
      alert(data.data)
      window.location.href = data.url // "admin.html"
    }
  })
  .catch(err => console.log('Algo no va bien.', err))
}








// BORRAR PREGUNTAS

function deleteQuestion(question){
  console.log('3', question.q)
  fetch('/deleteQuestion', {
    method: 'DELETE',
    body: JSON.stringify({q: question.q}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if(data.status== 400){
      alert(data.data)
      console.log('1', data)
    }
    else {
      alert(data.data)
      window.location.href = data.url ///////////////////////////////////////////
    }
  })
  .catch(err => console.log('Algo no va bien.', err))
}