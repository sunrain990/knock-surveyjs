var editorOptions = { };
var editor = new SurveyEditor.SurveyEditor(null, editorOptions);
editor.onCanShowProperty.add(function(editor, options){
    options.canShow = options.property.name === "correctAnswer";
});
editor.onElementAllowOperations.add(function (editor, options) {
    var isEnabled = false;
    options.allowEdit = isEnabled;
    options.allowDelete = isEnabled;
    options.allowCopy = isEnabled;
    options.allowAddToToolbox = isEnabled;
    options.allowDragging = isEnabled;
    options.allowChangeType = isEnabled;
});
editor.render("editorElement");


                    