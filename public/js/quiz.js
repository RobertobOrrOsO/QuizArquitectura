const container = document.querySelector('#father');

let counter = 0;
let j = 0;

// FUNCIÓN BORRADORA

function removeBody(){
    document.getElementById("father").querySelectorAll("*").forEach(el => el.remove())
}


// LEER LAS PREGUNTAS DE LA DB

function showQuestions() {
    fetch('/showQuestions')
        .then(response => response.json())
        .then(data => {
            // console.log(printData(data.result));
            printData(data.result)
        })
        .catch(err => console.log(err))
}

function printData(elAll){

    // PREGUNTA
    if( j < elAll.length) {
        
        let createQuestion = document.createElement('p')
        createQuestion.textContent = elAll[j].q
        createQuestion.setAttribute('class', 'question')
        container.appendChild(createQuestion)

    // RESPUESTAS
    for(let i = 0; i < elAll[j].a.length; i++) {
        let createAnswer = document.createElement('button')
        createAnswer.textContent = elAll[j].a[i]
        createAnswer.setAttribute('class', 'answer')
        createAnswer.setAttribute('value', i)
        container.appendChild(createAnswer)

        createAnswer.addEventListener('click', () => {
            if(elAll[j].ok == i) {
                console.log('Respuesta correcta')
                createAnswer.classList.remove('answer')
                createAnswer.classList.add('answerOk')
                counter++
                j++
                removeBody()
                showQuestions()
            }else{
                console.log('Respuesta incorrecta')
                createAnswer.classList.remove('answer')
                createAnswer.classList.add('answerKo')
                j++
                removeBody()
                showQuestions()
            }
        })
        }
    }else{
        removeBody()
        seeResults(elAll.length, counter)
        console.log('Esto es todo amigos!!!')
    }
}


// VER RESULTADOS

function seeResults(elAllLength, counter) {

    let score = document.createElement('p')
    score.textContent = '¡Bravo! hemos llegado al final del quiz.'
    score.setAttribute('class', 'question')
    container.appendChild(score);

    let yourScore = document.createElement('p')
    yourScore.textContent = 'Has acertado ' + counter + ' de ' + elAllLength + ' preguntas.'
    yourScore.setAttribute('class', 'question')
    container.appendChild(yourScore)

    let goToInit = document.createElement('a')
    goToInit.textContent = 'Intentar de nuevo'
    goToInit.setAttribute('class', 'boton')
    goToInit.setAttribute('href', 'index.html')
    goToInit.setAttribute('type', 'button')
    container.appendChild(goToInit)
}

showQuestions()









// const father = document.getElementById("father");

// let i = 0;

// let contenedor = []; //Array vacío donde poner los p, label e input creados

// const printQuestion = ( question ) => {
//     if (i < questions.length) {

//         let pQuestion = document.createElement("p");
//         pQuestion.textContent = question.q;
//         pQuestion.setAttribute("class", "question");
//         father.appendChild(pQuestion);

//         contenedor.push(pQuestion);

//         for (let j = 0; j < question.a.length; j++){

//             let labelAnswer = document.createElement("label");
//             labelAnswer.textContent = question.a[j];
//             labelAnswer.setAttribute("for", "boton" + [i] + [j]);
//             labelAnswer.setAttribute("class", "answer");
//             father.appendChild(labelAnswer);

//             contenedor.push(labelAnswer);

//             let inputAnswer = document.createElement("input");
//             inputAnswer.textContent = oneQuestion.a[j];
//             inputAnswer.setAttribute("type", "radio");
//             // inputAnswer.setAttribute("name", "name" + [i]);
//             // inputAnswer.setAttribute("value", [i]+[j]);
//             inputAnswer.setAttribute("id", "boton" + [i] + [j]); //Tiene que coincidir con el valor "for" de label
//             inputAnswer.setAttribute("class", "answer");
//             inputAnswer.setAttribute("class", "input");
//             father.appendChild(inputAnswer);

//             contenedor.push(inputAnswer);

//             labelAnswer.addEventListener("click", () => {
//                 if( j === oneQuestion.ok){
//                     labelAnswer.setAttribute("class", "answerOk");
//                     setTimeout(() => {
//                         borrarQuestion(contenedor);
//                     }, 500);
//                     setTimeout(() => {
//                         printQuestion(questions[++i]);
//                     }, 700);
//                 }
//                 else{
//                     setTimeout(() => {
//                         labelAnswer.setAttribute("class", "answerKo");
//                     }, 500);
//                     setTimeout(() => {
//                         labelAnswer.setAttribute("class", "answer");
//                     }, 1500);
//                 }
//             })
//         }

//     }else{
//         let finalText = document.createElement("p");
//         finalText.textContent = "¡Bravo!, este test es bastante sencillo y aunque con él no ganamos nada, al menos hemos aprendido un poquito de la historia de la arquitectura.";
//         finalText.setAttribute("class", "question");
//         father.appendChild(finalText);

//         let botonInicio = document.createElement("a")
//             botonInicio.textContent = "Inicio";
//             botonInicio.setAttribute("class", "boton");
//             botonInicio.setAttribute("href", "index.html")
//             father.appendChild(botonInicio);
//         }
// }

// printQuestion(questions[i]);

// function borrarQuestion (contenedor){
//     for (let i = 0; i < contenedor.length; i++) {
//     contenedor[i].remove()
//     }
// }