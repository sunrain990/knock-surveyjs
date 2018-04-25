Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapCss.panel.container = "sv_p_container panelborder";

var surveyJSON = { showQuestionNumbers: "off",
    pages: [
        { name:"page1",
            elements: [
                {type: "paneldynamic", name: "items", title: "Items", keyName: "name",
                    showQuestionNumbers: "none", templateTitle: "item #{panelIndex}", templateElements: [
                    { type: "text",  name: "name", title: "Name:", isRequired: true},
                    { type: "text",  name: "cost", inputType: "number", title: "Item Cost:", isRequired: true, startWithNewLine: false},
                    { type: "text",  name: "vendor", title: "Vendor:", isRequired: true},
                    { type: "text",  name: "quantity", inputType: "number", title: "Quantity:", isRequired: true, startWithNewLine: false},
                    { type: "text",  name: "link", title: "Link:", isRequired: true},
                    { type: "text",  name: "total", title: "Total Item Cost:", readOnly: true, startWithNewLine: false}
                ], minPanelCount: 1, panelAddText: "Add another  item", panelRemoveText: "Remove item"},
                {type: "panel", title: "Totals",
                    elements :[
                        { type: "text",  name: "totalQuantity", title: "Total  Quantity:", readOnly: true},
                        { type: "text",  name: "totalCost", title: "Total Cost:", readOnly: true, startWithNewLine: false},
                    ]}
            ]}
    ]
};
survey = new Survey.Model(surveyJSON);
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

var isUpdatingValues = false;
survey.onValueChanged.add(function(survey, options){
    if(isUpdatingValues) return;
    if(options.name != "items") return;
    isUpdatingValues = true;
    var items = options.value;
    if(items && Array.isArray(items)) {
        var totalQuantity = 0;
        var totalCost = 0;
        for(var i = 0; i < items.length; i ++) {
            var quantity = parseInt(items[i].quantity);
            if(!quantity) quantity = 0;
            var cost = parseInt(items[i].cost);
            if(!cost) cost = 0;
            totalQuantity += quantity;
            items[i].total = quantity * cost;
            totalCost += items[i].total;
        }
        survey.setValue("items", items);
        survey.setValue("totalQuantity", totalQuantity);
        survey.setValue("totalCost", totalCost);
    }
    isUpdatingValues = false;
});

survey.data = {totalQuantity: 0, totalCost: 0, items: [{total: 0}] };

$("#surveyElement").Survey({
    model: survey
});
