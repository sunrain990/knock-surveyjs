Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var editorOptions = { };
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);
editor.onElementDeleting.add(function(sender, options){
        var res = confirm("Do you want to delete: '" + options.element.name + "' ?");
        options.allowing = res;
    }
);