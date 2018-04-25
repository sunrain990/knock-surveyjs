
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var survey = new Survey.Model( { questions: [
    {name:"name", type:"text", title: "Please enter your name:", placeHolder:"Jon Snow", isRequired: true},
    {name:"birthdate", type:"text", inputType:"date", title: "Your birthdate:", isRequired: true},
    {name:"color", type:"text", inputType:"color", title: "Your favorite color:"},
    {name:"email", type:"text", inputType:"email", title: "Your e-mail:", placeHolder:"jon.snow@nightwatch.org", isRequired: true, validators: [{type:"email"}]}
]});
survey.onComplete.add(function(result, options) {
    //document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);

    //save data and call that we are saving the data
    options.showDataSaving();//you may pass a text parameter to show your own text
    //Fake the saving function
    setTimeout(function() {
        var wasError = document.getElementById("chShowError").checked;
        if(wasError) {
            options.showDataSavingError(); //you may pass a text parameter to show your own text
        } else {
            options.showDataSavingSuccess(); //you may pass a text parameter to show your own text
            //Or you may clear all messages
            //options.showDataSavingClear();
        }
    }, 3000);
});

$("#surveyElement").Survey({model:survey});