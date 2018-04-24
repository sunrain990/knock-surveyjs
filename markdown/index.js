$(function() {
    var CkEditor_ModalEditor = {
        afterRender: function (modalEditor, htmlElement) {
            var editor = CKEDITOR.replace(htmlElement);
            editor.on('change', function () {
                modalEditor.editingValue = editor.getData();
            });
            editor.setData(modalEditor.editingValue);
            modalEditor.onValueUpdated = function (newValue) {
                editor.setData(newValue);
            }
        },
        destroy: function (modalEditor, htmlElement) {
            var instance = CKEDITOR.instances[htmlElement.id];
            if (instance) {
                instance.removeAllListeners();
                CKEDITOR.remove(instance);
            }
        }
    };
    SurveyEditor
        .SurveyPropertyModalEditor
        .registerCustomWidget("html", CkEditor_ModalEditor);
    SurveyEditor
        .SurveyPropertyModalEditor
        .registerCustomWidget("text", CkEditor_ModalEditor);

    var questionDef = SurveyEditor.SurveyQuestionEditorDefinition.definition.questionbase;

//Modify Question Editor. Remove title from general and add it as a tab.
    questionDef
        .tabs
        .push({name: "title", index: 1});
    SurveyEditor
        .defaultStrings
        .pe
        .tabs["title"] = "Title";
    var ind = questionDef
        .properties
        .indexOf("title");
    if (ind > -1)
        questionDef
            .properties
            .splice(ind, 1);

//Create showdown mardown converter
    var converter = new showdown.Converter();
    function doMarkdown(survey, options) {
        //convert the mardown text to html
        var str = converter.makeHtml(options.text);
        //remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        //set html
        options.html = str;
    }

    SurveyEditor
        .StylesManager
        .applyTheme("bootstrap");

    var editorOptions = {};
    var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

    editor
        .survey
        .onTextMarkdown
        .add(doMarkdown);
    editor
        .onDesignerSurveyCreated
        .add(function (editor, options) {
            options
                .survey
                .onTextMarkdown
                .add(doMarkdown);
        });
    editor
        .onTestSurveyCreated
        .add(function (editor, options) {
            options
                .survey
                .onTextMarkdown
                .add(doMarkdown);
        });
});