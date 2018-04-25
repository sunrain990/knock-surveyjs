Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.JsonObject.metaData.findProperty("questionbase", "name").readOnly = true;


var editorOptions = { };
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);