

    var surveyPath = tools.path.survey;
    var surveyEdit;
    var rootPath = tools.path.rootPath;
    var isSaved = false;

    $(function () {
        surveyEdit = $(".contain").surveyEdit();
        eventBinding()
    });

    function doSaveSurvey() {
        if (!$("#saveSurveyForm").valid()) {
            return false;
        }
        var surveyID = $("body").find("#surveyID").val();
        var sendInfo = surveyEdit.getSurveyInfo();
        console.log(sendInfo);

        var currSuid = location.search.substring(1);
        if(currSuid){
            sendInfo['uuid'] = currSuid;
            $.ajaxEx({
                url: surveyPath + "/updateSurvey",
                method: "post",
                data: sendInfo,
                success: function (res) {
                    isSaved = false;
                    if (res.code == 0) {
                        tools.showSuccess('update survey successful!');
                        location.href = rootPath + '/project/admin';
                        // $("#saveSurveyDialog").modal('hide');
                    } else {
                        tools.showError('update survey failed!');
                        console.log(res);
                    }
                },
                error: function (res) {
                    isSaved = false;
                    tools.showError('update survey failed!');
                    console.log(res);
                }
            });
        }else{
            $.ajaxEx({
                url: surveyPath + "/createSurvey",
                method: "post",
                data: sendInfo,
                success: function (res) {
                    if (res.code == 0) {
                        tools.showSuccess('create survey successful!');
                        location.href = rootPath + '/project/admin';
                        // $("#saveSurveyDialog").modal('hide');
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
    }

    function cancelSurvey() {
        location.href = rootPath + "/project/admin";
    }
    function eventBinding() {
        //added for jquery validation
        $('form').each(function () {
            $(this).validate({
                rules: {
                    surveyName: {
                        required: true
                    }
                }
            });
        });
        $("#saveSurveyDialog,#renamePageDialog").on('hidden.bs.modal', function () {
            $(this).clearForm();
        });

        $("#saveSurveyBtn").on('click', function(){
            if (!isSaved){
                doSaveSurvey();
                isSaved = true;
            }
        });
    }



