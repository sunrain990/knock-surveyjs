
Survey.defaultStandardCss.progressBar = "bar-green";
Survey.defaultStandardCss.progress = "progress";

window.survey = new Survey.Model({
    title: "Software developer survey.",
    pages: [
        { title: "What operating system do you use?",
            questions: [
                {type:"checkbox", name:"opSystem", title: "OS", hasOther: true, isRequired: true,
                    choices:["Windows", "Linux", "Macintosh OSX"]}
            ]
        },
        {   title: "What language(s) are you currently using?",
            questions: [
                {type:"checkbox", name:"langs",title:"Plese select from the list",
                    colCount: 4, isRequired: true,
                    choices:["Javascript", "Java", "Python", "CSS", "PHP", "Ruby", "C++", "C",
                        "Shell", "C#", "Objective-C", "R", "VimL", "Go", "Perl", "CoffeeScript",
                        "TeX", "Swift", "Scala", "Emacs List", "Haskell", "Lua", "Clojure",
                        "Matlab", "Arduino", "Makefile", "Groovy", "Puppet", "Rust", "PowerShell"]
                }
            ]},
        { title: "Please enter your name and e-mail",
            questions: [
                {type: "text", name: "name", title: "Name:"},
                {type: "text", name: "email", title: "Your e-mail"}]
        }]
});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});
survey.showProgressBar = "bottom";


$("#surveyElement").Survey({model:survey});

