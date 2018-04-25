Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.JsonObject.metaData.addClass("itemvalue_matrixrow", ["tag"], function() { return new Survey.ItemValue(null); }, "itemvalue");
Survey.JsonObject.metaData.findProperty("matrixdropdown", "rows").type = "itemvalue_matrixrow";


var editorOptions = {};
var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);
editor.text = JSON.stringify({
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "matrixdropdown",
                    "choices": [
                        1,
                        2,
                        3,
                        4,
                        5
                    ],
                    "columns": [
                        {
                            "name": "Column 1"
                        },
                        {
                            "name": "Column 2"
                        },
                        {
                            "name": "Column 3"
                        }
                    ],
                    "name": "question1",
                    "rows": [
                        {
                            "value": "Row 1",
                            "text": "213213",
                            "tag": "2313232"
                        },
                        "Row 2"
                    ]
                }
            ]
        }
    ]
});