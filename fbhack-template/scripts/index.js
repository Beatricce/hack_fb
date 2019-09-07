let isOpen = false;
let nextSelector = '';
function openPopup(_nextSelector) {
    if (isOpen) {
        return;
    }

    nextSelector = _nextSelector;
    isOpen = true;

    $('#popup').fadeIn();
    $('#question-input').focus();
}

function closePopup() {
    $('#popup').fadeOut();
    $(`#${nextSelector}`).focus();
    isOpen = false;
    nextSelector = '';

    $('.answers-container').html('');
}

function submitQuestion() {
    const questionInput = document.getElementById('question-input');
    let question = questionInput.value;
    questionInput.value = '';

    console.log(formatSpaces(question));

    $.getJSON('./mock.json', function(data) {
        const answer = extractAnswer(data);
        addAnswer(answer, question);
    });
}

function formatSpaces(str) {
    return str.replace(/[ ]/g, '%20');
}

function extractAnswer(data) {
    return data.answer;
}

function addAnswer(answer, question) {
    $('.answers-container').append(
        ` <p class="chat__question-p"><a class="chat__question" href="javascript:void();" title="${question}">${question}</a></p>
         <p><a class="chat__answer" href="javascript:void();" title="${answer}">${answer}</a></p>`
    );
    const answers = $('.chat__answer');

    answers[answers.length - 1].focus();
}

function focusFirstQuestion() {
    $('.chat__question')[0].focus();
}