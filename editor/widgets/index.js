var editorOptions = {};
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);
editor.text = JSON.stringify({
    elements: [
        {
            type: "textwithbutton",
            name: "q1",
            placeHolder: "put some text here",
            buttonText: "Custom button text"

        }
    ]
});
