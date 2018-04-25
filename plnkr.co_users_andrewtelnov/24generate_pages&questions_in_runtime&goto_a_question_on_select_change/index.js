'use strict';
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var survey = new Survey.Model();

var questionCount = 20;
var i = 0;
while(i < questionCount) {
    var questionInPage = randomInteger(1, 5);
    var page = survey.addNewPage("page" + (survey.pageCount + 1));
    for(var j = 0; j < questionInPage && i < questionCount; j ++, i ++) {
        page.addNewQuestion("text", "question" + (i + 1));
    }
}

var selectEl = document.getElementById("questionNumber");
for(var i = 0; i < questionCount; i ++) {
    var option = document.createElement("option");
    option.value = i + 1;
    option.text = i + 1;
    selectEl.add(option);
}

function currentPageChanged(survey, options) {
    if(!selectEl) return;
    selectEl.value = survey.currentPageNo + 1;
}

ReactDOM.render(<Survey.Survey model={survey} onCurrentPageChanged={currentPageChanged} />, document.getElementById("surveyElement"));

window.gotoQuestion = function(questionIndex) {
    questionIndex --;
    var questions = survey.getAllQuestions();
    var question = null;
    //Can't use index directly, since some questions may be invisible
    for(var i = 0; i < questions.length; i ++) {
        if(questions[i].visibleIndex == questionIndex) {
            question = questions[i];
            break;
        }
    }
    //if found select the needed page and focus the question
    if(question) {
        survey.currentPage = survey.getPageByQuestion(question);
        question.focus();
    }
}