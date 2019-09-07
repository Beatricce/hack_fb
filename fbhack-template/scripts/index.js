let isOpen = false;
let nextSelector = '';
function openPopup(_nextSelector) {
    if (isOpen) {
        return;
    }

    nextSelector = _nextSelector;

    $('#popup').fadeIn(function() {
        $('#question-input').focus();
        isOpen = true;
    });
}

function closePopup() {
    $('#popup').fadeOut(function() {
        $(`#${nextSelector}`).focus();
        isOpen = false;
        nextSelector = '';

        $('.answers-container').html('');
    });
}

function submitQuestion() {
    const questionInput = document.getElementById('question-input');
    let question = questionInput.value;
    questionInput.value = '';

    $.getJSON('./mock.json', function(data) {
        const answer = extractAnswer(data);
        addAnswer(answer);
    });
}

function extractAnswer(data) {
    return data.answer;
}

function addAnswer(answer) {
    $('.answers-container').append(
        `<p><a class="answer" href="#">${answer}</a></p>`
    );
    const answers = $('.answer');

    answers[answers.length - 1].focus();
}