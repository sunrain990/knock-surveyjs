
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var survey = new Survey.Model({
    surveyId: '5af48e08-a0a5-44a5-83f4-1c90e8e98de1',
    surveyPostId: '3ce10f8b-2d8a-4ca2-a110-2994b9e697a1'
});

var resSurvey = new Survey.Model();
var isGettingResults = false;
resSurvey.onGetResult.add(function(s, options) {
    isGettingResults = false;
    if(!options.success) return;
    var javaScriptUsage = options.data.QuestionResult["Javascript"];
    var answersCount = options.data.AnswersCount;
    if(!javaScriptUsage) javaScriptUsage = 0;
    document.getElementById("response").textContent = answersCount;
    document.getElementById("javaScriptUsage").textContent = javaScriptUsage;

    var ranSurvey = parseInt(document.getElementById("ranAll").value);
    var selectJavascript = parseInt(document.getElementById("selectJavascript").value);
    if(answersCount < ranSurvey  && javaScriptUsage < selectJavascript) {
        $("#surveyElement").Survey({
            model: survey
        });
    } else {
        document.getElementById("surveyElement").innerHTML = "Sorry. The survey is closed.";
    }

});

function reRunSurvey() {
    if(isGettingResults) return;
    document.getElementById("surveyElement").innerHTML = "";
    document.getElementById("response").textContent = "Loading...";
    document.getElementById("javaScriptUsage").textContent = "Loading...";
    resSurvey.getResult('a15eee7a-9418-4eb4-9671-2009c8ff6b24', 'langs');
    isGettingResults = true;
}

reRunSurvey();
