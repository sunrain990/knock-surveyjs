$.fn.surveyEdit = function () {
    var customerID = 0;
    var questionId = 0;
    var self = this;
    var $questionEles = $(this.find("#questions li"));
    var $questionArea = $(this.find("#questionArea"));
    var surveyInfo;
    var isNewSurvey = true;
    var current = {
        currentTab:null,
        currentPage:null,
    };

    var quesList = [];
    var validationList = [];
    var emptyNameMsg =' exists empty ID for question.';


    var bindingSort = function () {
        settingQuestionNumber();
    }

    var initialDraggable = function () {
        $(".sortableQuestionArea.active").sortable({
            stop: bindingSort,
            delay: 200
        });

        $(".sortableQuestionArea.active").disableSelection();

        $questionEles.draggable({
            connectToSortable: ".sortableQuestionArea.active",
            helper: function (event, ui) {
                var type = $(event.currentTarget).attr("type");
                var temp = questionTemplate[type];
                var dom = [];
                dom.push(temp);
                return $(dom.join(''));
            },
            delay: 200,
            start: function (event, ui) {
                var questionArea = $(".ui-draggable-dragging");
                questionArea.find(".panel-body").css("display", "none");
                questionArea.find(".panel-title .text-right").css("display", "none");
            },
            stop: function (event, ui) {

                var questionArea = $(".ui-draggable-dragging");
                questionArea.attr("style", "");

                questionArea.find(".panel-body").css("display", "block");
                questionArea.find(".panel-title .text-right").css("display", "block");

                //binding value
                setVal(questionArea);

                //binding delete function
                deleteQuestionBinding(questionArea);

                //binding save function
                saveQuestionBinding(questionArea);

                //bingding add choice
                addChoiceBinding(questionArea);
                refreshChoice(questionArea);

                //binding add Row
                addRowBinding(questionArea);
                refreshRowValues(questionArea);

                //binding add Column
                addColumnBinding(questionArea);
                refreshColumns(questionArea);

                //binding add Item
                addItemBinding(questionArea);
                refreshItems(questionArea);

                //binding add Rate
                addRateBinding(questionArea);
                refreshRateValues(questionArea);

                //give question number
                settingQuestionNumber();
                autoSetCustomerId(questionArea);

                initialDraggable();
            }
        });
    }

    var initialUpdate = function () {
        if (surveyInfo.uuid) {
            self.parent().find("#surveyName").val(surveyInfo.name);
            self.parent().find("#surveyTitle").val(surveyInfo.survey.title);
            self.parent().find("#surveyType").val(surveyInfo.nType);
            self.parent().find("#surveyDescription").val(surveyInfo.desc);
            BindingPage();
            var dependenceArea = $("body").find("#dependenceContainer");
            dependenceArea.find(".dependences").attr("dependences", JSON.stringify(surveyInfo.survey.triggers));
            refreshDependences(dependenceArea);
            $("body").find(".pageList").find("a").first().trigger('click');
            // $("body").find(".pageList").find("li").first().find('a').addClass('active');
            $("body").find(".pageArea").find(".tab-pane").first().addClass("active");
            isNewSurvey = false;
            $('body').find('.pageList').append('<a class="nav-link" id="addPageDialogLabelTab" data-toggle="tab" role="tab" href=""><i class="fa fa-plus"></i></a>');
            $("#addPageDialogLabelTab").click(function () {
                current.currentTab = $('.pageList a.nav-link.active');
                $("#addPageDialog").modal("show");
            });
        }
    }

    var BindingPage = function () {

        if (surveyInfo && surveyInfo.survey.pages) {
            var num = 1;
            $("body").find(".pageList").find("a").remove();
            $("body").find(".pageArea").find("#page1").remove();
            surveyInfo.survey.pages.forEach(function (value, key) {
                var pageName = "page" + num;
                if (num == 1) {
                    self.find(".pageList").append("<a class='nav-link active' data-toggle='tab' href='#" + pageName + "' role='tab'>" + value.name + "</a>");
                } else {
                    self.find(".pageList").append("<a class='nav-link' data-toggle='tab' href='#" + pageName + "' role='tab'>" + value.name + "</a>");
                }
                self.find(".tab-content").append("<div data-pagename=" + value.name + " id=" + pageName + " class='sortableQuestionArea tab-pane'></div>");
                num++;
                if (value.questions) {
                    value.questions.forEach(function (v, k) {
                        bindingQuestions(pageName, v);
                    });
                }

            });
            $(".pageArea").find("[data-save=0]").attr("data-save", 1);

        }
    };

    var deleteQuesionBinding = function (questionArea) {
        questionArea.find(".question-button-delete").click(function () {
            $(this).parents(".questionArea").remove();
            settingQuestionNumber();
        });

    };

    $("#addPageDialogLabelTab").click(function () {
        current.currentTab = $('.pageList a.nav-link.active');
        $("#addPageDialog").modal("show");
    });

    $("#renamePageDialog").on('show.bs.modal', function () {
        // $('#newPageName').val(current.currentPage);
    });

    function htmlDecode(input) {
        return $("<div>").html(input).text();
    }

    function bindingQuestions(pageName, v) {
        // add questions
        $("#" + pageName).append(questionTemplate[v.type]);
        v.html = htmlDecode(v.html);

        var targetQuestion = $("#" + pageName).find(".questionArea:last-child").attr("questiondata", JSON.stringify(v));

        saveQuestionBinding(targetQuestion);

        //binding value
        setVal(targetQuestion);

        //binding delete function
        deleteQuesionBinding(targetQuestion);

        //binding save function
        saveQuestionBinding(targetQuestion);

        //bingding add choice
        addChoiceBinding(targetQuestion);
        refreshChoice(targetQuestion);

        //binding add Row
        addRowBinding(targetQuestion);
        refreshRowValues(targetQuestion);
        //binding add Column
        addColumnBinding(targetQuestion);
        refreshColumns(targetQuestion);
        //binding add Item
        addItemBinding(targetQuestion);
        refreshItems(targetQuestion);
        //binding add Rate
        addRateBinding(targetQuestion);
        refreshRateValues(targetQuestion);
        //give question number
        settingQuestionNumber();

        initialDraggable();
    }

    function getQuestionCount(){
        var currentId = 1;
        var questions = $(".questionArea");
        if (questions && questions != undefined){
            currentId = questions.length;
        }
        return currentId;
    }

    function setVal($questionArea) {
        customerID++;
        questionId = getQuestionCount();

        var questiondata = $.parseJSON($questionArea.attr("questiondata"));

        function bindingAttr(key, value) {
            $questionArea.find("." + key).attr(key, JSON.stringify(value));
        }

        function bindingAttrScore(key, value){
            $questionArea.find("." + key).attr(key, JSON.stringify(value));
        }

        function bindingVal(key, value) {
            if (key == "html") {
                $questionArea.find(".Html").val(value.toString());
            } else {
                $questionArea.find("." + key).val(value.toString());
            }
        }

        function bindingTitle(key, value) {
            $questionArea.find("." + key).val(value);
            $questionArea.find(".questionDisplayTitle").html(value);
        }

        function bindingCheckbox(key,value) {
            if(value === "true" || value === true){
                $questionArea.find("." + key).attr("checked", true);
            }else {
                $questionArea.find("." + key).attr("checked", false);
            }
        }

        var questionMapping = {
            choices: bindingAttr,
            choicescores: bindingAttrScore,
            columns: bindingAttr,
            items: bindingAttr,
            rateValues: bindingAttr,
            title: bindingTitle,
            rows: bindingAttr,
            visible: bindingCheckbox,
            isRequired: bindingCheckbox
        }

        for (var key in questiondata) {
            if (questionMapping[key]) {
                questionMapping[key](key, questiondata[key]);
            } else {
                bindingVal(key, questiondata[key]);
            }
        }
    }

    function deleteQuestionBinding(questionArea) {
        questionArea.find(".question-button-delete").click(function () {
            $(this).parents(".questionArea").remove();
            settingQuestionNumber();
        });

    };

    function saveQuestionBinding(questionArea) {
        questionArea.find(".questionProp").hide();
        var saveBtn = $(questionArea.find(".question-button-save"));
        saveBtn.attr("data-save", 0);

        questionArea.find("input").on("input", function (e) {
            if (saveBtn.data("save") === 1) {
                saveBtn.attr("data-save", 0);
            } else {
                // console.log(e);
            }
        });
        questionArea.find("select").on("change", function (e) {
            if (saveBtn.data("save") === 1) {
                saveBtn.attr("data-save", 0);
            } else {
                // console.log(e);
            }
        });
        questionArea.find("textarea").on("input", function (e) {
            if (saveBtn.data("save") === 1) {
                saveBtn.attr("data-save", 0);
            } else {
                // console.log(e);
            }
        });
        questionArea.find(".question-button-discard").click(function () {
            questionArea.find(".questionDisplay").show();
            questionArea.find(".questionProp").hide();
        });

        questionArea.find(".question-button-edit").click(function () {
            // questionArea.find(".questionDisplay").hide();
            questionArea.find(".questionProp").show();
        });


        questionArea.find(".question-button-save").click(function () {
            var questionArea = $(this).parents(".questionArea");
            questionArea.find(".questionDisplay").show();
            questionArea.find(".questionProp").hide();

            // var questiontitle= '<span class="data-bind" key="'+questionArea.find(".title").val() +'"></span>';
            var questiontitle = questionArea.find(".title").val();
            var questionData = {
                inputType: questionArea.find(".inputType").val(),
                type: questionArea.attr("questionType"),
                choices: questionArea.find(".choices").length != 0 ? JSON.parse(questionArea.find(".choices").attr("choices")) : undefined,
                choicescores: questionArea.find(".choices").length != 0 ? JSON.parse(questionArea.find(".choices").attr("choicescores")) : undefined, 
                choicesOrder: questionArea.find(".choicesOrder").val(),
                colCount: questionArea.find(".colCount").val(),
                hasOther: questionArea.find(".hasOther").val() == "true" ? true : false,
                hasComment: questionArea.find(".hasComment").val() == "true" ? true : false,
                isRequired: questionArea.find(".isRequired").is(":checked"),
                name: questionArea.find(".name").val(),
                visibleIf: questionArea.find(".visibleIf").val(),
                otherText: questionArea.find(".otherText").val(),
                title: questiontitle,
                visible: questionArea.find(".visible").is(":checked"),
                rows: questionArea.find(".rows").length != 0 ? JSON.parse(questionArea.find(".rows").attr("rows")) : undefined,
                columns: questionArea.find(".columns").length != 0 ? JSON.parse(questionArea.find(".columns").attr("columns")) : undefined,
                html: questionArea.find(".Html").val(),
                items: questionArea.find(".items").length != 0 ? JSON.parse(questionArea.find(".items").attr("items")) : undefined,
                rateValues: questionArea.find(".rateValues").length != 0 ? JSON.parse(questionArea.find(".rateValues").attr("rateValues")) : undefined,
            };

            questionArea.attr("questionData", JSON.stringify(questionData));
            questionArea.find(".questionDisplayTitle").html(questionArea.find(".title").val().replace(/</g, '&lt;'));
            $(this).attr("data-save", 1);
        });
    };

    function addChoiceBinding(questionArea) {
        questionArea.find(".addChoice").click(function () {
            var questionArea = $(this).parents(".questionArea");
            var key = questionArea.find(".choiceKey").val();
            var choice = {
                value: questionArea.find(".choiceValue").val(),
                text: key
            };
            var choicescore = {
                value: questionArea.find(".choiceValue").val(),
                score: questionArea.find(".choicescore").val(),
                level: questionArea.find(".scorelevel").val(),
                multiplier: questionArea.find(".scoremuliplier").val()
            };
            if (choice.value.length != 0 && choice.text.length != 0){
                questionArea.find(".choiceValue").val("");
                questionArea.find(".choiceKey").val("");
                questionArea.find(".choicescore").val("");
                questionArea.find(".scorelevel").val("");
                questionArea.find(".scoremuliplier").val("");
                var choiceValues = questionArea.find(".choices").attr("choices");
                var choiceData = [];
                if (choiceValues != "") {
                    choiceData = JSON.parse(choiceValues);
                }
                choiceData.push(choice);

                var choicescores = questionArea.find(".choices").attr("choicescores");
                var scoreData = [];
                if (choicescores != ""){
                    scoreData = JSON.parse(choicescores);
                }
                scoreData.push(choicescore);
                questionArea.find(".choices").attr("choices", JSON.stringify(choiceData));
                questionArea.find(".choices").attr("choicescores", JSON.stringify(scoreData));
                refreshChoice(questionArea,choice, choicescore);
            }
        });
    };

    function refreshChoice(questionArea,addedChoice, choiceScore) {
        if (questionArea.find(".choices").length > 0) {
            var choiceData = JSON.parse(questionArea.find(".choices").attr("choices"));
            var choiceScoreData = JSON.parse(questionArea.find(".choicescores").attr("choicescores"));
            var currentTableRowLength = questionArea.find(".choiceContent").children().length;
            if (addedChoice){
                if ( currentTableRowLength ===  1) {
                    //add first choice
                    var choiceContent = questionArea.find(".choiceContent").append("<tr><td>" + addedChoice.value + "</td><td>" + addedChoice.text + "</td><td>" + choiceScore.score + "</td><td>" + choiceScore.level + "</td><td>" + choiceScore.multiplier + "</td><td><button type='button' class='btn removeChoice btn-action' key='" + addedChoice.value + "'>remove</button></td></tr>");
                } else {
                    questionArea.find(".choiceContent").children().children().last().append("<button class='btn down-row btn-action' data-key='"+currentTableRowLength+"'><i class='fa fa-arrow-down'></i></button>");
                    var choiceContent = questionArea.find(".choiceContent").append("<tr><td>" + addedChoice.value + "</td><td>" + addedChoice.text + "</td><td>" + choiceScore.score + "</td><td>" + choiceScore.level + "</td><td>" + choiceScore.multiplier + "</td><td><button type='button' class='btn removeChoice btn-action' key='" + addedChoice.value + "'>remove</button><button class='btn up-row btn-action' data-key='"+currentTableRowLength+"'><i class='fa fa-arrow-up'></i></button></td></tr>");
                }
                removeChoiceButton(choiceContent,questionArea);
                _reorderingChoices(questionArea);
            } else {
                // questionArea.find(".choiceContent").html('<tr><td><input type="text" class="form-control input-md choiceValue"/></td><td><input type="text" class="form-control input-md choiceKey"/></td><td><button type="button" class="btn orange-btn margin-top-btn addChoice">Add Choice</button></td></tr>');
                var renderChoiceData = [];
                if (choiceScoreData && choiceScoreData != undefined && choiceScoreData.length > 0){
                    for (var i=0; i < choiceData.length; i++){
                        for (var j=0; j < choiceScoreData.length; j++){
                            if (choiceData[i].value == choiceScoreData[j].value){
                                var scoreChoice = {
                                    value: choiceData[i].value,
                                    text: choiceData[i].text,
                                    score: choiceScoreData[j].score,
                                    level: choiceScoreData[j].level,
                                    multiplier: choiceScoreData[j].multiplier
                                };
                                renderChoiceData.push(scoreChoice);
                                break;
                            }
                        }
                    }
                }
                if (renderChoiceData.length == 0){
                    renderChoiceData = choiceData;
                }
                $.each(renderChoiceData, function (key, value) {
                    var upBtn = "<button class='btn up-row btn-action' data-key='"+key+"'><i class='fa fa-arrow-up'></i></button>";
                    var downBtn = "<button class='btn down-row btn-action' data-key='"+key+"'><i class='fa fa-arrow-down'></i></button>";
                    if (key === 0 ){
                        var choiceContent = questionArea.find(".choiceContent").append("<tr><td>" + value.value + "</td><td>" + value.text + "</td><td>" + value.score + "</td><td>" + value.level + "</td><td>" + value.multiplier + "</td><td><button type='button' class='btn removeChoice btn-action' key='" + value.value + "'>remove</button>"+downBtn+"</td></tr>");
                    } else if (key === choiceData.length - 1 ) {
                        var choiceContent = questionArea.find(".choiceContent").append("<tr><td>" + value.value + "</td><td>" + value.text + "</td><td>" + value.score + "</td><td>" + value.level + "</td><td>" + value.multiplier + "</td><td><button type='button' class='btn removeChoice btn-action' key='" + value.value + "'>remove</button>"+upBtn+"</td></tr>");
                    } else {
                        var choiceContent = questionArea.find(".choiceContent").append("<tr><td>" + value.value + "</td><td>" + value.text + "</td><td>" + value.score + "</td><td>" + value.level + "</td><td>" + value.multiplier + "</td><td><button type='button' class='btn removeChoice btn-action' key='" + value.value + "'>remove</button>"+upBtn+downBtn+"</td></tr>");
                    }
                    // var choiceContent = questionArea.find(".choiceContent").append("<tr><td>" + value.value + "</td><td>" + value.text + "</td><td><button type='button' class='btn removeChoice' key='" + value.value + "'>remove</button></td></tr>");
                    removeChoiceButton(choiceContent,questionArea);
                });
            }
            _reorderingFunctionBinding(questionArea,'.choiceContent');
        }
    }

    function _reorderingFunctionBinding(questionArea,selector) {
        //bind up and down
        if (selector===".choiceContent") {
            questionArea.find(".up-row").click(function () {
                var result = _reorderingChoices(questionArea,$(this).attr("data-key"),-1);
                questionArea.find(selector).append(result);
            });
            questionArea.find(".down-row").click(function () {
                var result = _reorderingChoices(questionArea,$(this).attr("data-key"),1);
                questionArea.find(selector).append(result);
            });
        } else if (selector===".itemContent") {
            questionArea.find(".up-row").click(function () {
                var result = _reorderingItems(questionArea,$(this).attr("data-key"),-1);
                questionArea.find(selector).append(result);
            });
            questionArea.find(".down-row").click(function () {
                var result = _reorderingItems(questionArea,$(this).attr("data-key"),1);
                questionArea.find(selector).append(result);
            });
        } else if (selector===".rateContent"){
            questionArea.find(".up-row").click(function () {
                var result = _reorderingRates(questionArea,$(this).attr("data-key"),-1);
                questionArea.find(selector).append(result);
            });
            questionArea.find(".down-row").click(function () {
                var result = _reorderingRates(questionArea,$(this).attr("data-key"),1);
                questionArea.find(selector).append(result);
            });
        }
        //bind add
        addChoiceBinding(questionArea)
    }


    function _reorderingChoices(questionArea, index , action) {
        var trContainer= questionArea.find(".choiceContent");
        if (index === undefined){
            //reorder because of action
        }else {
            //reorder because of ordering
            var indexToMove = parseInt(index)+1;
            var targetIndex = parseInt(index) +  action + 1;
            var data = trContainer.children();
            var target = data.splice(indexToMove,1);
            data.splice(targetIndex,0,target[0]);
            trContainer.children().append(data);
            trContainer.append(data);
        }
        var updatedChoices = []
        $.each(trContainer.children(),function (k,v) {
            if (k!==0){
                var temp = {
                    value:v.children[0].textContent,
                    text:v.children[1].textContent
                }
                updatedChoices.push(temp);
            }
        });
        questionArea.find(".choices").attr("choices", JSON.stringify(updatedChoices));
        _reRenderChoiceActionBTn(questionArea,'.choiceContent');
    }

    function _reRenderChoiceActionBTn(questionArea,classSelector) {
        var trContainer= questionArea.find(classSelector);
        trContainer.find(".up-row").remove();
        trContainer.find(".down-row").remove();
        var currentChoiceLength = trContainer.children().length - 1;
        $.each(trContainer.children(),function (key,val) {
            var upBtn =  document.createElement("button");
            upBtn.className = "btn up-row btn-action";
            upBtn.innerHTML = "<i class='fa fa-arrow-up'></i>";
            upBtn.setAttribute("data-key",key-1);
            var downBtn = document.createElement("button");
            downBtn.className = "btn down-row btn-action";
            downBtn.innerHTML = "<i class='fa fa-arrow-down'></i>";
            downBtn.setAttribute("data-key",key-1);
            if (currentChoiceLength === 0 || currentChoiceLength ===1){
                return
            } else {
                if (key === 0 ){
                    return
                } else if (key === 1 ){
                    val.lastElementChild.appendChild(downBtn);
                } else if (key === trContainer.children().length - 1 ) {
                    val.lastElementChild.appendChild(upBtn);
                } else {
                    val.lastElementChild.appendChild(upBtn);
                    val.lastElementChild.appendChild(downBtn);
                }
            }
        })
        _reorderingFunctionBinding(questionArea,classSelector);
    }



    function removeChoiceButton(choiceContent,questionArea) {
        choiceContent.find(".removeChoice").last().click(function () {
            var key = $(this).attr("key");
            var questionArea = $(this).parents(".questionArea");
            var choiceData = JSON.parse(questionArea.find(".choices").attr("choices"));

            for (var i = 0; i < choiceData.length; i++) {
                if (choiceData[i].value == key) {
                    choiceData.splice(i, 1);
                    break;
                }
            }
            questionArea.find(".choices").attr("choices", JSON.stringify(choiceData));
            $(this).parents("tr").remove();
            _reRenderChoiceActionBTn(questionArea,'.choiceContent');
        });
    };

    function addRowBinding(questionArea) {
        questionArea.find(".addRow").click(function () {
            var questionArea = $(this).parents(".questionArea");
            // var key = '<span class="data-bind" key="'+questionArea.find(".rowKey").val() +'"></span>';
            var key = questionArea.find(".rowKey").val();

            var row = {
                value: questionArea.find(".rowValue").val(),
                text: key
            };

            questionArea.find(".rowValue").val("");
            questionArea.find(".rowKey").val("");
            var rowValues = questionArea.find(".rows").attr("rows");
            var rowData = [];
            if (rowValues != "") {
                rowData = JSON.parse(rowValues);
            }
            rowData.push(row);
            questionArea.find(".rows").attr("rows", JSON.stringify(rowData));

            refreshRowValues(questionArea,row);
        });
    };

    function refreshRowValues(questionArea,addedRow) {
        if (addedRow) {
            var rowContent = questionArea.find(".rowContent").append("<tr><td>" + addedRow.value + "</td><td>" + addedRow.text + "</td><td><button type='button' class='btn removeRow' key='" + addedRow.value + "'>remove</button></td></tr>");
            removeRowButton(rowContent);
        } else if (questionArea.find(".rows").length > 0) {
            // questionArea.find(".rowContent").html("");
            var rowValuesData = JSON.parse(questionArea.find(".rows").attr("rows"));
            $.each(rowValuesData, function (key, value) {

                var rowContent = questionArea.find(".rowContent").append("<tr><td>" + value.value + "</td><td>" + $(value.text).attr('key') + "</td><td><button type='button' class='btn removeRow' key='" + value.value + "'>remove</button></td></tr>");
                removeRowButton(rowContent);
            });
        }

    }

    function removeRowButton(rowContent) {
        rowContent.find(".removeRow").click(function () {

            var key = $(this).attr("key");
            var questionArea = $(this).parents(".questionArea");
            var rowData = JSON.parse(questionArea.find(".rows").attr("rows"));
            for (var i = 0; i < rowData.length; i++) {
                if (rowData[i].value == key) {
                    rowData.splice(i, 1);
                    break;
                }
            }
            questionArea.find(".rows").attr("rows", JSON.stringify(rowData));
            $(this).parents("tr").remove();
        });
    };

    function addColumnBinding(questionArea) {
        questionArea.find(".addColumn").click(function () {
            var questionArea = $(this).parents(".questionArea");
            // var key = '<span class="data-bind" key="'+questionArea.find(".columnKey").val() +'"></span>';
            var key = questionArea.find(".columnKey").val();
            var column = {
                value: questionArea.find(".columnValue").val(),
                text: key
            };

            questionArea.find(".columnValue").val("");
            questionArea.find(".columnKey").val("");
            var columnValues = questionArea.find(".columns").attr("columns");
            var columnData = [];
            if (columnValues != "") {
                columnData = JSON.parse(columnValues);
            }
            columnData.push(column);
            questionArea.find(".columns").attr("columns", JSON.stringify(columnData));

            refreshColumns(questionArea,column);
        });
    };

    function refreshColumns(questionArea,addedColumn) {
        if (addedColumn) {
            var columnContent = questionArea.find(".columnContent").append("<tr><td>" + addedColumn.value + "</td><td>" + addedColumn.text + "</td><td><button type='button' class='btn removeColumn' key='" + addedColumn.value + "'>remove</button></td></tr>");
            removeColumnButton(columnContent);
        }else if (questionArea.find(".columns").length > 0) {
            var columnData = JSON.parse(questionArea.find(".columns").attr("columns"));
            // questionArea.find(".columnContent").html("");
            $.each(columnData, function (key, value) {
                var columnContent = questionArea.find(".columnContent").append("<tr><td>" + value.value + "</td><td>" + $(value.text).attr('key') + "</td><td><button type='button' class='btn removeColumn' key='" + value.value + "'>remove</button></td></tr>");
                removeColumnButton(columnContent);
            });
        }
    };

    function removeColumnButton(columnContent) {
        columnContent.find(".removeColumn").click(function () {

            var key = $(this).attr("key");
            var questionArea = $(this).parents(".questionArea");
            var columnData = JSON.parse(questionArea.find(".columns").attr("columns"));
            for (var i = 0; i < columnData.length; i++) {
                if (columnData[i].value == key) {
                    columnData.splice(i, 1);
                    break;
                }
            }
            questionArea.find(".columns").attr("columns", JSON.stringify(columnData));
            $(this).parents("tr").remove();
        });
    };

    function addItemBinding(questionArea) {
        questionArea.find(".addItem").click(function () {
            var questionArea = $(this).parents(".questionArea");
            // var key = '<span class="data-bind" key="'+questionArea.find(".itemKey").val() +'"></span>';
            var key = questionArea.find(".itemKey").val();

            var item = {
                name: questionArea.find(".itemValue").val(),
                title: key,
            };
            if(item.name.length != 0 && item.title.length != 0 ){
                questionArea.find(".itemValue").val("");
                questionArea.find(".itemKey").val("");
                var itemValues = questionArea.find(".items").attr("items");
                var itemData = [];
                if (itemValues != "") {
                    itemData = JSON.parse(itemValues);
                }
                itemData.push(item);
                questionArea.find(".items").attr("items", JSON.stringify(itemData));
                refreshItems(questionArea,item);
            }
        });

    };

    function refreshItems(questionArea,addedItem) {
        if (questionArea.find(".items").length > 0 ){
            var itemData = JSON.parse(questionArea.find(".items").attr("items"));
            var currentTableRowLength = questionArea.find(".itemContent").children().length;
            if (addedItem){
                if ( currentTableRowLength ===  1) {
                    //add first choice
                    var itemContent = questionArea.find(".itemContent").append("<tr><td>" + addedItem.name + "</td><td>" + addedItem.title + "</td><td>" + addedItem.score + "</td><td><button type='button' class='btn removeItem btn-action' key='" + addedItem.name + "'>remove</button></td></tr>");
                } else {
                    questionArea.find(".itemContent").children().children().last().append("<button class='btn down-row btn-action' data-key='"+currentTableRowLength+"'><i class='fa fa-arrow-down'></i></button>");
                    var itemContent = questionArea.find(".itemContent").append("<tr><td>" + addedItem.name + "</td><td>" + addedItem.title + "</td><td>" + addedItem.score + "</td><td><button type='button' class='btn removeItem btn-action' key='" + addedItem.name + "'>remove</button><button class='btn up-row btn-action' data-key='"+currentTableRowLength+"'><i class='fa fa-arrow-up'></i></button></td></tr>");
                }
                removeItemButton(itemContent,questionArea);
                _reorderingItems(questionArea);
            } else  {
                $.each(itemData, function(key, value) {
                    var upBtn = "<button class='btn up-row btn-action' data-key='" + key + "'><i class='fa fa-arrow-up'></i></button>";
                    var downBtn = "<button class='btn down-row btn-action' data-key='" + key + "'><i class='fa fa-arrow-down'></i></button>";
                    if (key === 0) {
                        var itemContent = questionArea.find(".itemContent").append("<tr><td>" + value.name + "</td><td>" + value.title + "</td><td>" + value.score + "</td><td><button type='button' class='btn removeItem btn-action' key='" + value.name + "'>remove</button>" + downBtn + "</td></tr>");
                    } else if (key === itemData.length - 1) {
                        var itemContent = questionArea.find(".itemContent").append("<tr><td>" + value.name + "</td><td>" + value.title + "</td><td>" + value.score + "</td><td><button type='button' class='btn removeItem btn-action' key='" + value.name + "'>remove</button>" + upBtn + "</td></tr>");
                    } else {
                        var itemContent = questionArea.find(".itemContent").append("<tr><td>" + value.name + "</td><td>" + value.title + "</td><td>" + value.score + "</td><td><button type='button' class='btn removeItem btn-action' key='" + value.name + "'>remove</button>" + upBtn + downBtn + "</td></tr>");
                    }
                    removeItemButton(itemContent, questionArea);
                });
            }

            _reorderingFunctionBinding(questionArea,'.itemContent');
        }
    };

    function _reorderingItems (questionArea, index , action){
        var trContainer= questionArea.find(".itemContent");
        if (index === undefined){
            //reorder because of action
        }else {
            //reorder because of ordering
            var indexToMove = parseInt(index)+1;
            var targetIndex = parseInt(index) +  action + 1;
            var data = trContainer.children();
            var target = data.splice(indexToMove,1);
            data.splice(targetIndex,0,target[0]);
            trContainer.children().append(data);
            trContainer.append(data);
        }
        var updatedItems = [];
        $.each(trContainer.children(),function (k,v) {
            if (k!==0){
                var temp = {
                    name:v.children[0].textContent,
                    title:v.children[1].textContent
                }
                updatedItems.push(temp);
            }
        });
        questionArea.find(".items").attr("items", JSON.stringify(updatedItems));
        _reRenderChoiceActionBTn(questionArea,'.itemContent');
    }

    function removeItemButton(itemContent) {
        itemContent.find(".removeItem").last().click(function () {
            var key = $(this).attr("key");
            var questionArea = $(this).parents(".questionArea");
            var itemData = JSON.parse(questionArea.find(".items").attr("items"));

            for (var i = 0; i < itemData.length; i++) {
                if (itemData[i].name == key) {
                    itemData.splice(i, 1);
                    break;
                }
            }
            questionArea.find(".items").attr("items", JSON.stringify(itemData));
            $(this).parents("tr").remove();
            _reRenderChoiceActionBTn(questionArea,'.itemContent');
        });
    };

    function addRateBinding(questionArea) {
        questionArea.find(".addRate").click(function () {
            var questionArea = $(this).parents(".questionArea");
            var key = questionArea.find(".rateKey").val();
            var rate = {
                name: questionArea.find(".rateValue").val(),
                title: key
            };
            if (rate.name.length != 0 && rate.title.length != 0){
                questionArea.find(".rateValue").val("");
                questionArea.find(".rateKey").val("");
                var rateValues = questionArea.find(".rateValues").attr("rateValues");
                var rateData = [];
                if (rateValues != "") {
                    rateData = JSON.parse(rateValues);
                }
                rateData.push(rate);
                questionArea.find(".rateValues").attr("rateValues", JSON.stringify(rateData));
                refreshRateValues(questionArea,rate);
            }
        });
    };

    function refreshRateValues(questionArea,addedRate) {
        if (questionArea.find(".rateValues").length > 0) {
            var rateData = JSON.parse(questionArea.find(".rateValues").attr("rateValues"));
            var currentTableRowLength = questionArea.find(".rateContent").children().length;
            if (addedRate){
                if ( currentTableRowLength ===  1) {
                    //add first choice
                    var rateContent = questionArea.find(".rateContent").append("<tr><td>" + addedRate.name + "</td><td>" + addedRate.title + "</td><td><button type='button' class='btn removeRate btn-action' key='" + addedRate.name + "'>remove</button></td></tr>");
                } else {
                    questionArea.find(".choiceContent").children().children().last().append("<button class='btn down-row btn-action' data-key='"+currentTableRowLength+"'><i class='fa fa-arrow-down'></i></button>");
                    var rateContent = questionArea.find(".rateContent").append("<tr><td>" + addedRate.name + "</td><td>" + addedRate.title + "</td><td><button type='button' class='btn removeRate btn-action' key='" + addedRate.name + "'>remove</button><button class='btn up-row btn-action' data-key='"+currentTableRowLength+"'><i class='fa fa-arrow-up'></i></button></td></tr>");
                }
                removeRateButton(rateContent,questionArea);
                _reorderingRates(questionArea);
            } else {
                $.each(rateData, function (key, value) {
                    var upBtn = "<button class='btn up-row btn-action' data-key='"+key+"'><i class='fa fa-arrow-up'></i></button>";
                    var downBtn = "<button class='btn down-row btn-action' data-key='"+key+"'><i class='fa fa-arrow-down'></i></button>";
                    if (key === 0 ){
                        var rateContent = questionArea.find(".rateContent").append("<tr><td>" + value.name + "</td><td>" + value.title + "</td><td><button type='button' class='btn removeRate btn-action' key='" + value.name + "'>remove</button>"+downBtn+"</td></tr>");
                    } else if (key === rateData.length - 1 ) {
                        var rateContent = questionArea.find(".rateContent").append("<tr><td>" + value.name + "</td><td>" + value.title + "</td><td><button type='button' class='btn removeRate btn-action' key='" + value.name + "'>remove</button>"+upBtn+"</td></tr>");
                    } else {
                        var rateContent = questionArea.find(".rateContent").append("<tr><td>" + value.name + "</td><td>" + value.title + "</td><td><button type='button' class='btn removeRate btn-action' key='" + value.name + "'>remove</button>"+upBtn+downBtn+"</td></tr>");
                    }
                    removeRateButton(rateContent,questionArea);
                });
            }
            _reorderingFunctionBinding(questionArea,'.choiceContent');
        }
    };

    function _reorderingRates (questionArea, index , action){
        var trContainer= questionArea.find(".rateContent");
        if (index === undefined){
            //reorder because of action
        }else {
            //reorder because of ordering
            var indexToMove = parseInt(index)+1;
            var targetIndex = parseInt(index) +  action + 1;
            var data = trContainer.children();
            var target = data.splice(indexToMove,1);
            data.splice(targetIndex,0,target[0]);
            trContainer.children().append(data);
            trContainer.append(data);
        }
        var updatedItems = [];
        $.each(trContainer.children(),function (k,v) {
            if (k!==0){
                var temp = {
                    name:v.children[0].textContent,
                    title:v.children[1].textContent
                }
                updatedItems.push(temp);
            }
        });
        questionArea.find(".rateValues").attr("rateValues", JSON.stringify(updatedItems));
        _reRenderChoiceActionBTn(questionArea,'.rateContent');
    }

    function removeRateButton(rateContent) {
        rateContent.find(".removeRate").last().click(function () {
            var key = $(this).attr("key");
            var questionArea = $(this).parents(".questionArea");
            var rateData = JSON.parse(questionArea.find(".rateValues").attr("rateValues"));
            for (var i = 0; i < rateData.length; i++) {
                if (rateData[i].value == key) {
                    rateData.splice(i, 1);
                    break;
                }
            }
            questionArea.find(".rateValues").attr("rateValues", JSON.stringify(rateData));
            $(this).parents("tr").remove();
            _reRenderChoiceActionBTn(questionArea,'.rateContent');
        });
    };

    function autoSetCustomerId(questionArea) {
        questionArea.find(".name").val("question" + questionId);
    };

    var questionItem = {
        inputType: '<div class="col-xs-12 col-sm-12 col-md-3"><label class="">Type:</label><div class=""><input type="text" class="form-control input-md inputType"></div></div>',
        topButton: '<div class="col-md-6 text-right"><button class="btn btn-danger question-button-delete btn-top"><i class="fa fa-trash" aria-hidden="true"></i></button><button class="btn btn-danger question-button-discard btn-top"><i class="fa fa-times" aria-hidden="true"></i></button><button class="btn question-button-save btn-top"><i class="fa fa-floppy-o" aria-hidden="true"></i></button><button class="btn question-button-edit btn-top"><i class="fa fa-pencil" aria-hidden="true"></i></button></div>',
        questionTitle: '<div class="question-title-label">Question:</div><div class="form-group row"><div class="col-md-12"><textarea class="form-control input-md title" placeholder="Question"></textarea></div></div>',
        required: '<input name="required" type="checkbox" class="basic-cpn isRequired"><label class="basic-cpn" for="required">Required</label>',
        columnCol: '<div class="col-xs-12 col-sm-12 col-md-3"><label class="">Level:</label><div class=""><input type="text" class="form-control input-md colCount"></div></div>',
        choiceOrder: '<div class="col-xs-12 col-sm-12 col-md-3"><label class="">Choices Order:</label><div class=""><select class="form-control choicesOrder"><option selected value="">none</option><option value="asc">asc</option><option value="desc">desc</option><option value="random">random</option></select></div></div>',
        otherQuestion: '<div class="col-xs-12 col-sm-12 col-md-3"><label class="">Question has other answer:</label><div class=""><select class="form-control hasOther"><option value="false">false</option><option value="true">true</option></select></div></div>',
        otherText: '<div class="col-xs-12 col-sm-12 col-md-3"><label class="">Question has other text:</label><div class=""><input type="text" class="form-control input-md otherText"></div></div>',
        visible: '<input name="visible" type="checkbox" checked class="basic-cpn visible"><label class="basic-cpn" for="visible">Visible</label>',
        comment: '<div class="col-xs-12 col-sm-12 col-md-3"><label class="">Question has comment:</label><div class=""><select class="form-control hasComment"><option value="false">false</option><option value="true">true</option></select></div></div>',
        name: '<div class="col-xs-12 col-sm-12 col-md-4"><label class="">ID:(*Required, and must unique)</label><div class=""><input type="text" class="form-control input-md name"/></div></div>',
        visibleIf: '<div class="col-xs-12 col-sm-12 col-md-7"><label class="">Visible If:</label><div class=""><input type="text" class="form-control input-md visibleIf"/>(Please enter a boolean expression. It should return true to keep the question/page visible. Example: {question1}=\'value1\' or ({question2}=3 and {question3}<5))</div></div>',
        html: '<div class="col-md-12"><label>Html:</label><textarea type="text" class="form-control input-md Html"></textarea></div>',
        choices: '<div class="question-title-label">Choices:</div><div class="form-group row"><div class="col-md-12"><div class="page_box_content"><table class="table table-striped table-bordered choices choicescores" choices="[]" choicescores="[]" scorelevels="[]" scoremulipliers="[]"><thead><tr><th>Value</th><th>Label</th><th>Score</th><th>Score Level</th><th>Score Multiplier</th><th>Operation</th></tr></thead><tbody class="choiceContent"><tr><td><input type="text" class="form-control input-md choiceValue"/></td><td><input type="text" class="form-control input-md choiceKey"/></td><td><input type="text" class="form-control input-md choicescore"/></td><td><input type="text" class="form-control input-md scorelevel"/></td><td><input type="text" class="form-control input-md scoremuliplier"/></td><td><button type="button" class="btn orange-btn margin-top-btn addChoice">Add</button></td></tr></tbody></table></div></div></div>',
        items: '<div class="question-title-label">Items:</div><div class="form-group row"><div class="col-md-12"><div class="page_box_content"><table class="table table-striped table-bordered items" items="[]"><thead><tr><th>Value</th><th>Label</th><th>operation</th></tr></thead><tbody class="itemContent"><tr><td><input type="text"  class="form-control input-md itemValue"/></td><td><input type="text"  class="form-control input-md itemKey"/></td><td><button type="button" class="btn orange-btn margin-top-btn addItem">Add</button></td></tr></tbody></table></div></div></div>',
        rows: '<div class="question-title-label">Rows:</div><div class="row"><div class="col-md-12"><div class="page_box_content"><table class="table table-striped table-bordered rows" rows="[]"><thead><tr><th>Value</th><th>Label</th><th>operation</th></tr></thead><tbody class="rowContent"><tr><td><input type="text" class="form-control input-md rowValue"/></td><td><input type="text" class="form-control input-md rowKey" /></td><td><button type="button" class="btn orange-btn margin-top-btn addRow">Add</button></td></tr></tbody></table></div></div></div>',
        columns: '<div class="question-title-label">Columns:</div><div class="row"><div class="col-md-12"><div class="page_box_content"><table class="table table-striped table-bordered columns" columns="[]"><thead><tr><th>Value</th><th>Label</th><th>operation</th></tr></thead><tbody class="columnContent"><tr><td><input type="text" class="form-control input-md columnValue" /></td><td><input type="text" class="form-control input-md columnKey" /></td><td><button type="button" class="btn orange-btn margin-top-btn addColumn">Add</button></td></tr></tbody></table></div></div></div>',
        rates: '<div class="question-title-label">Rates:</div><div class="form-group row"><div class=""><div class="col-xs-12 col-sm-12 col-md-4" style="display: none;"><label class="">Name:</label><inputtype="text" class="form-control input-md name"/></div><div class="col-md-4"><label>Value:</label><input type="text"  class="form-control input-md rateValue"/></div><div class="col-md-4"><label>Label:</label><input type="text"  class="form-control input-md rateKey"/></div><div class="col-md-2 text-right form-group"><button type="button" class="btn orange-btn margin-top addRate">Add Rate</button></div></div><div class="row"><div class="col-md-12"><div class="page_box_content table_width"><table class="table table-striped dataTable no-footer table-bordered rateValues" rateValues="[]"><thead><tr><th>Value</th><th>Label</th><th>Remove</th></tr></thead><tbody class="rateContent"></tbody></table></div></div></div></div>'
    }

    var questionTemplate = {
        checkbox: '<div class="panel checkboxQuestionArea questionArea" questionType="checkbox" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Checkbox</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber"></span><span class="questionDisplayTitle"></span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:' + '</div><div class="form-group row">' + questionItem['visible'] + questionItem['required'] + '</div><div class="form-group row">' + questionItem['otherText'] + questionItem['columnCol'] + questionItem['choiceOrder'] + questionItem['otherQuestion'] + '</div><div class="row form-group">' + questionItem['comment'] + questionItem['name'] + '</div><div class="form-group row">'+questionItem['visibleIf']+'</div>' + questionItem['choices'] + '</div></div></div>',
        dropdown: '<div class="panel dropdownQuestionArea questionArea" questionType="dropdown" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Dropdown</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['required'] + questionItem['visible'] + '</div><div class="row form-group">' + questionItem['choiceOrder'] + questionItem['otherQuestion'] + questionItem['otherText'] + questionItem['name'] + '</div><div class="form-group row">'+questionItem['visibleIf']+'</div>' + questionItem['choices'] + '</div></div></div>',
        html: '<div class="panel htmlQuestionArea questionArea" questionType="html" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Html</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['name'] + questionItem['visible'] + '</div><div class="form-group row">'+questionItem['visibleIf']+'</div><div class="form-group row">' + questionItem['html'] + '</div></div></div></div>',
        radiogroup: '<div class="panel radiogroupQuestionArea questionArea" questionType="radiogroup" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Radiogroup</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['name'] + questionItem['visible']+ questionItem['required'] + '</div><div class="form-group row">' + questionItem['columnCol'] + questionItem['choiceOrder'] + questionItem['otherQuestion'] + questionItem['otherText'] + '</div><div class="form-group row">'+questionItem['visibleIf']+'</div>' + questionItem['choices'] + '</div></div></div>',
        multipletext: '<div class="panel multipleTextQuestionArea questionArea" questionType="multipletext" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Multiple Text</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['visible'] + questionItem['required']  + '</div><div class="form-group row">' + questionItem['name'] + questionItem['columnCol'] + '</div><div class="form-group row">'+questionItem['visibleIf']+'</div>' + questionItem['items'] + '</div></div></div>',
        comment: '<div class="panel commentQuestionArea questionArea" questionType="comment" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Comment</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['visible'] + questionItem['name'] + questionItem['required'] + '</div><div class="form-group row">'+questionItem['visibleIf']+'</div></div></div></div>',
        rating: '<div class="panel ratingQuestionArea questionArea" questionType="rating" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Rating</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['visible'] + questionItem['required'] + questionItem['name'] + '</div><div class="form-group row">'+questionItem['visibleIf']+'</div></div></div></div>',
        text: '<div class="panel checkboxQuestionArea questionArea" questionType="text" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Text</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['visible'] + questionItem['required'] + questionItem['name'] +'</div><div class="form-group row">'+questionItem['visibleIf']+questionItem['inputType']+'</div></div></div></div>',
        matrix: '<div class="panel matrixSingleQuestionArea questionArea" questionType="matrix" questionData="[]"><div class="panel-heading"><h3 class="panel-title page-title-area"><div class="col-md-3 question-type">Matrix single</div><div class="col-md-3 questionDisplayName"><span class="badge questionNumber">1.&nbsp;</span><span class="questionDisplayTitle">Question</span></div>' + questionItem['topButton'] + '</h3></div><div class="panel-body"><div class="questionProp col-md-12">' + questionItem['questionTitle'] + '<div class="question-title-label">Property:</div><div class="form-group row">' + questionItem['visible'] + questionItem['required'] + '</div>' + questionItem['rows'] + questionItem['columns'] + '</div></div>' + questionItem['name'] + '<div class="form-group row">'+questionItem['visibleIf']+'</div></div>'
    }

    function settingQuestionNumber() {
        $(".pageArea").each(function (k, v) {
            $(v).find(".questionNumber").each(function (number, value) {
                // $(value).html((number + 1)+".&nbsp;");
                 $(value).html("&nbsp;");
            });
        });
    }

    initialDraggable();

    if (location.search) {
        var currSuid = location.search.substring(1);

        $.ajaxEx({
            url: tools.path.survey + "/getSurveyById/" + currSuid,
            method: "get",
            success: function (res) {
                if (canCanvertJson(res)){
                    res = JSON.parse(res);
                }
                if (res.code == 0) {
                    if (res.data != null && res.data != undefined){
                        surveyInfo = res.data;
                        $("body").find("#surveyID").val(surveyInfo.uuid);
                        initialUpdate();
                    }else{
                        tools.showWarning('There is no survey found!');
                    }
                } else {
                    tools.showError('create survey failed!');
                    console.log(res);
                }
            },
            error: function (res) {
                tools.showError('create survey failed!');
                console.log(res);
            }
        });
    }


    function generator() {
        var surveyJSON = {
            questionTitleTemplate: "{no} {require} {title}",
            questionStartIndex: 1,
            requiredText: "*",
            // completedHtml: "<p><h4>Thank you to complete the survey({title}) questions.</h4></p>",
            title: "survey title",
            pages: []
        };
        var title = $("body").find("#surveyTitle").val();
        if (title) {
            surveyJSON.title = title;
        }
        $("body").find(".pageArea").find(".sortableQuestionArea").each(function (index, element) {
            var questions = [];
            $(element).find(".questionArea").each(function (i, element) {
                var data = $(element).attr("questiondata");
                if (data != "[]") {
                    var question = JSON.parse(data);
                    questions.push(question);
                    quesList.push(question);
                }
            });
            var pageName;
            $("body").find(".pageList").find('a').each(function (n, item) {
                if ($(item).attr('href') == ('#' + $(element).attr('id'))) {
                    pageName = $(item).html();
                    surveyJSON.pages.push({
                        // name: $(this).attr("data-pagename"),
                        name: pageName,
                        questions: questions
                    });
                }
            });
        });

        surveyJSON.triggers = JSON.parse($("body").find(".dependences").attr("dependences"));
        return StringToBooleanTransform(surveyJSON);
        //return surveyJSON;
    };


    function canCanvertJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function StringToBooleanTransform(obj) {

        var objStr = JSON.stringify(obj);
        objStr = objStr.replace(new RegExp("\"true\"", 'g'), "true");
        objStr = objStr.replace(new RegExp("\"false\"", 'g'), "false");

        return JSON.parse(objStr);
    }

    function refreshDependences(dependenceArea) {
        if (dependenceArea.find(".dependences").length > 0) {
            var dependenceData = JSON.parse(dependenceArea.find(".dependences").attr("dependences"));
            var questions = [];
            $("body").find(".pageArea").find(".sortableQuestionArea").each(function (index, element) {
                $(element).find(".questionArea").each(function (index, element) {
                    var data = $(element).attr("questiondata");
                    if (data != "[]") {
                        questions.push({
                            name: JSON.parse(data).name,
                            display: JSON.parse(data).title
                        });
                    }
                });
            });
            dependenceArea.find(".dependenceContent").html("");
            var sourceQuestion;
            var distQuestion;
            $.each(dependenceData, function (key, value) {
                for (var k in questions) {
                    if (questions[k].name == value.name) {

                        sourceQuestion = $(questions[k].display).attr('key');
                    }
                    if (questions[k].name == value.questions) {

                        distQuestion = $(questions[k].display).attr('key');
                    }
                }
                var dependenceContent = dependenceArea.find(".dependenceContent").append("<tr><td>" + sourceQuestion + "</td><td>" + value.value + "</td><td>" + value.pages + "</td><td>" + distQuestion + "</td><td><button type='button' class='btn removeDependence' key='" + value.name + "' value='" + value.value + "'>remove</button></td></tr>");
                removeDependenceButton(dependenceContent);
            });
        }
    };

    function removeDependenceButton(dependenceContent) {
        dependenceContent.find(".removeDependence").click(function () {

            var key = $(this).attr("key");
            var value = $(this).attr("value");
            var dependenceArea = $("body").find(".dependences");
            var dependenceData = JSON.parse(dependenceArea.attr("dependences"));

            for (var i = 0; i < dependenceData.length; i++) {
                if ((dependenceData[i].name == key) && (dependenceData[i].value == value)) {
                    dependenceData.splice(i, 1);
                    break;
                }
            }
            dependenceArea.attr("dependences", JSON.stringify(dependenceData));
            $(this).parents("tr").remove();
        });
    };

    function sendDataToServer(survey) {
        var resultAsString = JSON.stringify(survey.data);
        tools.showInfo("Saved survey answers data format is: " + resultAsString); //send Ajax request to your web server.
    }

    function htmlUnescape(value) {
        return String(value).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&').replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '\t').replace(/&nbsp;/g, ' ');
    }

    function UnescapeTitle() {
        $(".sv_q_title").each(function (key, value) {
            $(value).html(htmlUnescape($(value).html()));
        });

        $("span[data-bind]").each(function (key, value) {
            $(value).html(htmlUnescape($(value).html()));
        });

        $("td[data-bind]").each(function (key, value) {
            $(value).html(htmlUnescape($(value).html()));
        });

        $("th[data-bind]").each(function (key, value) {
            $(value).html(htmlUnescape($(value).html()));
        });

        $("option").each(function (key, value) {
            $(value).html(htmlUnescape($(value).html()));
        })
    }


    return {

        doRename: function () {
            if (!$("#newPageName").valid()) {
                return false;
            }
            $(current.currentTab).html($("#newPageName").val());
            $("#renamePageDialog").modal("hide");
        },
        addPage: function () {
            self.parent().find("#addPageDialog").modal("show");
        },

        doAddPage: function () {
            var pageName = self.parent().find("#pageName").val();
            var num = 0;
            if (pageName) {
                self.find(".pageList li a").each(function (index, item) {
                    if ($(item).attr("href") == ('#' + pageName)) {
                        tools.showWarning("You can not add a same page");
                        num = 1;
                    }
                });
            } else {
                tools.showWarning("You need input a page name");
                num = 1;
            }
            if (num == 0) {
                // self.find(".pageArea").find(".deleteBtn").css("display", "block");
                // self.find(".pageArea").find(".renameBtn").css("display", "block");
                // self.find(".pageArea").find(".deleteBtn").css("float", "right");
                // self.find(".pageArea").find(".renameBtn").css("float", "right");
                var len = self.find(".pageList").find("a").length + 1;
                var id = "page" + len;
                // self.find(".pageList").last().before()
                $("#addPageDialogLabelTab").before("<a class='nav-link pull-left' data-toggle='tab' href='#" + id + "' role='tab'>" + pageName.replace("<", "&lt;") + "</a>");
                // self.find(".pageList").append("<a class='nav-link pull-left' data-toggle='tab' href='#" + id + "' role='tab'>" + pageName.replace("<", "&lt;") + "</a>");
                self.find(".tab-content").append("<div id=" + id + " data-pageName = " + pageName.replace("<", "&lt;") + " class='sortableQuestionArea tab-pane ui-sortable'></div>");
                self.parent().find("#addPageDialog").modal("hide");
                self.parent().find("#pageName").val("");
                // active the current page and tab
                if ($("#"+ id).attr("class").indexOf("active")!==-1) {
                } else {
                    for (var count = 1 ; count <=  len ; count ++ ){
                        $("#page"+ count ).removeClass("active");
                        $('a[href="#page' + count +'"]').removeClass("active");
                    }
                    $("#page"+ len).addClass("active");
                    $("#addPageDialogLabelTab").removeClass("active");
                    $('a[href="#page' + len +'"]').addClass("active");
                }
                // active the current page and tab
                if (self.find(".pageList").find("a").length == 1) {
                    self.find(".pageList").find("a").trigger("click");
                }
            }
        },

        doConfirmEmpty: function () {
            $("#addPageDialog").modal("show");
            var currentPage = self.find(".pageList").find(".active").attr("href");
            var nextPage = self.find(".pageList").find(".active").next();
            self.find(".pageList").find(".active").remove();
            self.find(".pageArea").find(currentPage).remove();
        },

        undoAddPage: function () {
            $(".pageList a.nav-link").removeClass("active");
            $(current.currentTab).addClass("active");
        },

        deleteCurrentPage: function () {
            if (self.find(".pageList").find("a").length === 2) {
                $("#emptyPageConfirmDialog").modal("show");
            } else {
                var currentPage = self.find(".pageList").find(".active").attr("href");
                var nextPage = self.find(".pageList").find(".active").next();
                self.find(".pageList").find(".active").remove();
                // if(nextPage.length==0){
                self.find(".pageList").find("a").first().trigger("click");
                // }else {
                //     nextPage.find('a').trigger("click");
                // }
                self.find(".pageArea").find(currentPage).remove();
                if (self.find(".pageList").find("a").length == 1) {
                    self.find(".pageList").find("a").trigger("click");
                }
                if (self.find(".pageList").find("a").length == 0) {
                    self.find(".pageArea").find(".deleteBtn").css("display", "none");
                }
            }
        },

        renameCurrentPage: function () {
            current.currentTab = self.find(".pageList").find(".active");
            current.currentPage = self.find(".tab-content").find(".active");
            $("#renamePageDialog").modal("show");
        },


        addDependences: function () {

            var dependenceArea = $("body").find("#dependenceContainer");
            var page = dependenceArea.find(".dependencePages").val();
            var pages = [];
            pages.push(page);
            var question = dependenceArea.find(".dependenceQuestions").val();
            var questions = [];
            questions.push(question);
            var dependence = {
                name: dependenceArea.find(".dependenceId").val(),
                value: dependenceArea.find(".dependenceValue").val(),
                questions: questions,
                operator: "equal",
                type: "visible",
                pages: pages,
            };

            dependenceArea.find(".dependenceId").val("");
            dependenceArea.find(".dependenceValue").val("");
            dependenceArea.find(".dependenceQuestions").val("");
            dependenceArea.find(".dependencePages").val("");
            var dependences = dependenceArea.find(".dependences").attr("dependences");
            var dependenceData = [];
            if (dependences != "[]") {
                dependenceData = JSON.parse(dependences);
            }
            dependenceData.push(dependence);
            dependenceArea.find(".dependences").attr("dependences", JSON.stringify(dependenceData));
            refreshDependences(dependenceArea);
        },

        addDependence: function () {
            $('.dependencePages').find('option').remove();
            $('.dependencePages').append('<option>select a page</option>');
            $('.dependenceId').find('option').remove();
            $('.dependenceId').append('<option>select source question</option>');
            $('.dependenceQuestions').find('option').remove();
            $('.dependenceQuestions').append('<option>select dist question</option>');
            $("body").find(".pageArea").find(".sortableQuestionArea").each(function (index, element) {
                var questions = [];
                $(element).find(".questionArea").each(function (index, element) {
                    var data = $(element).attr("questiondata");

                    var title = $(JSON.parse(data)['title']).attr('key');
                    if (data != "[]") {
                        questions.push(JSON.parse(data));
                        $('.dependenceId').append('<option value="' + JSON.parse(data)['name'] + '">' + title + '</option>');
                        $('.dependenceQuestions').append('<option value="' + JSON.parse(data)['name'] + '">' + title + '</option>');
                    }

                });
            });
            var pageName;
            $("body").find(".pageList").find('a').each(function (index, item) {
                pageName = $(item).html();
                $('.dependencePages').append('<option value="' + pageName + '">' + pageName + '</option>');
            })
            self.parent().find("#addDependenceDialog").modal("show");
        },

        runSurvey: function () {
            $("#runSurveyDialog").modal("show");
            $(".sortableQuestionArea").find("");

            var surveyJSON = generator();
            Survey.Survey.cssType = "bootstrap";
            var survey = new Survey.Survey(surveyJSON, "surveyContainer");
            survey.showQuestionNumbers = "false";
            survey.onComplete.add(sendDataToServer);
            UnescapeTitle();
            survey.onCurrentPageChanged.add(UnescapeTitle);

            window.currentLanguage = "en";
            function i18n() {
                updateText();
                $("button[type='button']").on('click', function () {
                    var language = $(this).attr("language")
                    if (language != undefined)
                        window.currentLanguage = language;
                    updateText();
                });
                $("input[type='button']").on('click', function () {
                    var language = $(this).attr("language")
                    if (language != undefined)
                        window.currentLanguage = language;
                    updateText();
                });
            }

            function updateText() {
                var i18n = $.i18n();
                i18n.locale = window.currentLanguage;
                i18n.load('/js/survey/i18n/survey-' + i18n.locale + '.json', i18n.locale).done(function () {

                    $("span.data-bind").each(function (key, value) {

                        var data = $(value).attr("key");
                        $(value).html($.i18n(data));
                    });
                });
            }

            i18n();
        },

        saveSurvey: function () {
            var isSave = $(".pageArea").find("[data-save=0]");
            // var num = 0;
            // $.each($(".questionArea .panel-body .questionDisplay"), function (k, v) {
            //     if ($(v).css("display") == "none") {
            //         num = 1;
            //     }
            // });
            // if (num == 0 && isSave.length===0){
            //     $("#saveSurveyDialog").modal("show");
            // }
            if (isSave.length === 0) {
                quesList = [];
                validationList = [];
                generator();
                var tempList = tools.deepClone(quesList);
                for (var i=0; i<quesList.length; i++){
                    var name = '';
                    if (quesList[i] && quesList[i] != undefined){
                        name = quesList[i].name;
                    }
                    var count = 1;
                    if (!name || name == undefined){
                        validationList.push({name: name, msg: quesList[i].title + ' === '+ emptyNameMsg});
                    }else if (name && name != undefined){
                        for (var j=0; j<tempList.length; j++){
                            if (i !== j && tempList[j] && tempList[j] != undefined && tempList[j].name != undefined && quesList[i].name == tempList[j].name){
                                count ++;
                                delete tempList[j];
                            }
                        }
                    }
                    if (count > 1){
                        var has = false;
                        for (var k = 0; k < validationList.length; k++) {
                            if (validationList[k].name == name) {
                                has = true;
                            }
                        }
                        if (!has) {
                            validationList.push({
                                name: name,
                                msg: 'Duplicated ID ==== "' + name + '" for ' + count + ' questions! '
                            });
                        }
                    }
                }
                if (validationList.length > 0){
                    for (var k in validationList){
                        tools.showError(validationList[k].msg);
                    }
                }else{
                    $("#saveSurveyDialog").modal("show");
                }
            } else {
                $("#messageDialog").modal("show");
            }
        },

        getSurveyInfo: function () {
            var surveyName = $("body").find("#surveyName").val();
            var surveyTitle = $("body").find("#surveyTitle").val();
            var surveyType = $("body").find("#surveyType").val();
            var surveyDescription = $("body").find("#surveyDescription").val();

            var surveyJson = {
                "name": surveyName,
                "desc": surveyDescription,
                "nType": surveyType,
                "survey": generator(),
                "title": surveyTitle
            }

            return surveyJson;
        }

    }
};
