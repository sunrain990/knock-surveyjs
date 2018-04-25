
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

function generate() {
    var generateEl = document.getElementById("itemsCount");
    var count = 2;
    if(generateEl) {
        var tmp = parseInt(generateEl.value);
        if(tmp) count = tmp;
    }
    if(count > 20) count = 20;
    var items = [];
    for(var i = 0; i < count; i ++) {
        var name = "itemName" + (i +1);
        var title = "Text title #" + (i + 1);
        var item = new Survey.MultipleTextItemModel(name, title);
        items.push(item);
    }
    survey.getQuestionByName("question1").items = items;
}

var survey = new Survey.Model({
    questions: [
        { type: "multipletext", name: "question1", title: "Auto Generated Items", colCount: 2,
            items: [{ name: "mostamount", title: "Item 1" },
                { name: "leastamount", title: "Item2" }]}
    ]
});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({model:survey});

