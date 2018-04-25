Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

function updateElement(question, htmlElement) {
    if(!question || !htmlElement) return;
    htmlElement.className += " custom_question";
}

function onQuestionAfterRender(survey, options) {
    updateElement(options.question, options.htmlElement);
    options.question.htmlElement = options.htmlElement;
}


function onElementChanged(editor, options) {
    if(options.newElement) {
        updateElement(options.newElement, options.newElement.htmlElement);
    }
    if(options.oldElement) {
        updateElement(options.oldElement, options.oldElement.htmlElement);
    }
}

var editorOptions = { };
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

editor.survey.onAfterRenderQuestion.add(onQuestionAfterRender);
editor.survey.onSelectedElementChanged.add(onElementChanged);

editor.onDesignerSurveyCreated.add(function(editor, options){
    options.survey.onAfterRenderQuestion.add(onQuestionAfterRender);
    options.survey.onSelectedElementChanged.add(onElementChanged);
});
