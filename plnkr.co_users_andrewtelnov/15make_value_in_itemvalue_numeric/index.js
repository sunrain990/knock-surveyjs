Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

//
Survey.JsonObject.metaData.findProperty("itemvalue", "value").type = "number";

var editorOptions = { };
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);
editor.toolbox.replaceItem({
    name: "dropdown",
    isCopied: false,
    iconName: "icon-dropdown",
    title: "Dropdown",
    json: { "type": "dropdown",  choices: [{value: 1, text: "Item 1"}] }
});

editor.toolbox.replaceItem({
    name: "checkbox",
    isCopied: false,
    iconName: "icon-checkbox",
    title: "Checkbox",
    json: { "type": "checkbox",  choices: [{value: 1,score: 60, text: "Item 1"}] }
});

editor.toolbox.replaceItem({
    name: "radiogroup",
    isCopied: false,
    iconName: "icon-radiogroup",
    title: "Radiogroup",
    json: { "type": "radiogroup",  choices: [{value: 1, text: "Item 1"}] }
});    

