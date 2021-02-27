function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText).results;
}

var url = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple';

var questions = httpGet(url);
console.log(questions);

const questionBox = document.getElementById('questionBox');
var correctAnsers = [];

questions.forEach((item, index) => {
    var answers = [...item.incorrect_answers];
    answers.push(item.correct_answer);
    correctAnsers.push(item.correct_answer);
    // console.log(answers);
    shuffleAnswers(answers);

    var answersBox = ``;
    for (let i = 0; i < answers.length; i++) {
        answersBox += `
            <input type="radio" class="questions" name="question${index + 1}" id="question${index + 1}-${i}" value="${answers[i]}">
            <label class="labels labelForQuestion${index + 1}" for="question${index + 1}-${i}">${answers[i]}</label>
            <br>
        `;
    }

    questionBox.innerHTML += `
    <div>
        <h3>${index + 1}. ${item.question}</h3>
        <small class="mb-3">${item.category} (${item.difficulty})</small>
        <div>
            ${answersBox}
        </div>
    </div>
    `;
})

// shuffle answers
function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// get resutls
var score = 0;
var chosenAnswers = [];
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    Array.from(document.querySelectorAll('.questions')).forEach((item, index) => {
        if (item.checked == true) {
            chosenAnswers.push({
                question: Math.floor(index / 4) + 1,
                answer: item.value
            });
        }
    })

    // disable button once the user submits answers
    e.target.disabled = true;

    chosenAnswers.forEach(item => {
        if (correctAnsers[item.question - 1] == item.answer) {
            item.correct = true;
            score += 10;
        } else {
            item.correct = false;
        }
    })

    // show scores
    document.getElementById('scores').innerText = score;
    console.log(chosenAnswers);

    Array.from(document.querySelectorAll('.questions')).forEach((item, index) => {
        // deactivate all the items
        item.disabled = true;
    })

    chosenAnswers.forEach(item => {
        var thisQuestion = 'question' + item.question;
        var theseLabels = document.querySelectorAll('.labelForQuestion' + item.question);
        console.log(theseLabels);
        if (item.correct == true) {
            Array.from(theseLabels).forEach(label => {
                if (label.textContent == item.answer) {
                    label.style.color = 'green';
                }
            })
        } else {
            Array.from(theseLabels).forEach(label => {
                if (label.textContent == item.answer) {
                    label.style.color = 'red';
                }
            })
        }
    })

    document.querySelectorAll('.labels').forEach(item => {
        if (correctAnsers.indexOf(item.textContent.replaceAll('&', '&amp;')) != -1) {
            item.style.color = 'green';
        }
    })
})