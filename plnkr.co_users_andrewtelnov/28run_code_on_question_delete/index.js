Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

function doOnQuestionRemoved(survey, options) {
    alert('You have deleted question: ' + options.question.name)
}


var editorOptions = { };
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

editor.survey.onQuestionRemoved.add(doOnQuestionRemoved);

editor.onDesignerSurveyCreated.add(function(editor, options){
    survey.onQuestionRemoved.add(doOnQuestionRemoved);
});
