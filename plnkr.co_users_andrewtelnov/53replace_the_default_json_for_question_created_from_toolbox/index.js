var editorOptions = {};
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

var boolItem = editor.toolbox.getItemByName("boolean");
boolItem.json = {type: "boolean", defaultValue: "true"};