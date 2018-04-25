var storageName = "TestSurvey";
var editorOptions = { };
//Create the Survey Editor with the default options
editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);
//Show state in the toolbar, for example: Saving/Saved/Loading etc.
editor.showState = true;
//Call saveSurveyFunc automatically on changing in Editor, adding/removing/editing questions/pages etc.
//The default value is false. A use must click the "Save" button, that will be displayed in the toolbar
editor.isAutoSave = true;
//Callback function, Editor calls it when you must save changes.
editor.saveSurveyFunc = function(saveNo, callback) {
    window.localStorage.setItem(storageName, editor.text);
    !!callback && callback(saveNo, true);
};
//Load the survey definition from a storage
editor.text = window.localStorage.getItem(storageName) || "";
