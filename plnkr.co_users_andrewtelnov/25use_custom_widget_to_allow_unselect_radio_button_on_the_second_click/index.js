Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var widget = {
    name: "emptyRadio",
    isFit : function(question) {
        return question.getType() === 'radiogroup';
    },
    isDefaultRender: true,
    afterRender: function(question, el) {
        var $el = $(el);
        $el.find("input:radio").click(function(event){
            var UnCheck = "UnCheck",
                $clickedbox = $(this),
                radioname = $clickedbox.prop("name"),
                $group = $('input[name|="'+ radioname + '"]'),
                doUncheck = $clickedbox.hasClass(UnCheck),
                isChecked = $clickedbox.is(':checked');
            if(doUncheck){
                $group.removeClass(UnCheck);
                $clickedbox.prop('checked', false);
                question.value = null;
            }
            else if(isChecked){
                $group.removeClass(UnCheck);
                $clickedbox.addClass(UnCheck);
            }
        });
    },
    willUnmount: function(question, el) {
    }
};

Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");


var json = { questions: [
    { type: "radiogroup", name: "car", title: "What car are you driving?", isRequired: true,
        colCount: 4, choices: ["None", "Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"] }
]};

window.survey = new Survey.Model(json);


survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({
    model: survey
});

