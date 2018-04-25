//Add a property a text property into all questions types and into page
Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
function showDescription(element) {
    document.getElementById("questionDescriptionText").innerHTML = element.popupdescription;
    $("#questionDescriptionPopup").modal();
}

function doAfterRender(survey, options) {
    //Return if there is no description to show in popup
    if (!options.question.popupdescription)
        return;

    //Add a button;
    var btn = document.createElement("button");
    btn.className = "btn btn-info btn-xs";
    btn.innerHTML = "More Info";
    var question = options.question;
    btn.onclick = function () {
        showDescription(question);
    }
    var header = options
        .htmlElement
        .querySelector("h5");
    var span = document.createElement("span");
    span.innerHTML = "  ";
    header.appendChild(span);
    header.appendChild(btn);
}

var editorOptions = {};
var editor = new SurveyEditor.SurveyEditor(null, editorOptions);
//For survey in designer
editor.onDesignerSurveyCreated.add(function(editor, options){
    options.survey.onAfterRenderQuestion.add(doAfterRender);
});

editor.onTestSurveyCreated.add(function(editor, options){
    options.survey.onAfterRenderQuestion.add(doAfterRender);
});


editor.render("editorElement");
var json = {
    title: "Software developer survey.",
    pages: [
        {
            title: "What operating system do you use?",
            popupdescription: "Select the operating system you are currently using.",
            questions: [
                {
                    type: "checkbox",
                    name: "opSystem",
                    title: "OS",
                    hasOther: true,
                    isRequired: true,
                    popupdescription: "If you do not use any of the listed operating system, please select 'others' and type your operating system name.",
                    choices: ["Windows", "Linux", "Macintosh OSX"]
                }
            ]
        }, {
            title: "What language(s) are you currently using?",
            popupdescription: "Select all programming languages you have been using for the last six months.",
            questions: [
                {
                    type: "checkbox",
                    name: "langs",
                    title: "Plese select from the list",
                    popupdescription: "Select all programming languages you have been using for the last six months.",
                    colCount: 4,
                    isRequired: true,
                    choices: [
                        "Javascript",
                        "Java",
                        "Python",
                        "CSS",
                        "PHP",
                        "Ruby",
                        "C++",
                        "C",
                        "Shell",
                        "C#",
                        "Objective-C",
                        "R",
                        "VimL",
                        "Go",
                        "Perl",
                        "CoffeeScript",
                        "TeX",
                        "Swift",
                        "Scala",
                        "Emacs List",
                        "Haskell",
                        "Lua",
                        "Clojure",
                        "Matlab",
                        "Arduino",
                        "Makefile",
                        "Groovy",
                        "Puppet",
                        "Rust",
                        "PowerShell"
                    ]
                }
            ]
        }, {
            title: "Please enter your name and e-mail",
            popupdescription: "We will not share this information with any third-party organization.",
            questions: [
                {
                    type: "text",
                    name: "name",
                    title: "Name:",
                    popupdescription: "Please, type your name as 'Given Name' 'Family Name'."
                }, {
                    type: "text",
                    name: "email",
                    title: "Your e-mail",
                    popupdescription: "Please, make sure you do not misspell your e-mail."
                }
            ]
        }
    ]
};

editor.text = JSON.stringify(json);
