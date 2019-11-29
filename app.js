//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);

//Define Routing for app
//Uri /file_upload -> template file_upload.html and Controller FileUploadController
//Uri /ShowOrders -> template ShowOrders.html and Controller FileUploadController
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/file_upload', {
	templateUrl: 'templates/file_upload.html',
	controller: 'FileUploadController'
      }).
      when('/skills_page', {
	templateUrl: 'templates/skills_page.html',
	controller: 'SkillsPageController'
      }).
      otherwise({
	redirectTo: '/FileUploadController'
      });
}]);


sampleApp.controller('FileUploadController', function($scope) {
	
	$scope.message = 'This is FileUpload screen';
//============== DRAG & DROP =============
    // source for drag&drop: 
    var dropbox = document.getElementById("dropbox")
    $scope.dropText = 'Drag & Drop files here...'

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drag & Drop files here...'
            $scope.dropClass = ''
        })
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var clazz = 'not-available'
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
        $scope.$apply(function(){
            $scope.dropText = ok ? 'Drag & Drop files here...' : 'Only files are allowed!'
            $scope.dropClass = ok ? 'over' : 'not-available'
        })
    }, false)
    dropbox.addEventListener("drop", function(evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drag & Drop files here...'
            $scope.dropClass = ''
        })
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            $scope.$apply(function(){
                $scope.files = []
                for (var i = 0; i < files.length; i++) {
                    $scope.files.push(files[i])
                }
            })
        }
    }, false)
    //============== DRAG & DROP =============

    $scope.setFiles = function(element) {
    $scope.$apply(function($scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        $scope.files = []
        for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
        }
      $scope.progressVisible = false
      });
    };

    $scope.uploadFile = function() {
        var fd = new FormData()
        for (var i in $scope.files) {
            fd.append("uploadedFile", $scope.files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", "/fileupload")
        $scope.progressVisible = true
        xhr.send(fd)
    }

    function uploadProgress(evt) {
        $scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        $scope.$apply(function(){
            $scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
	
});


sampleApp.controller('SkillsPageController', function($scope) {

	$scope.message = 'This is SkillsPage screen';
$scope.stdSkills = {'skill_1':'<ul><li id="std1_skill_1"> Javascript</li> <li id="std2_skill_1"> PHP</li><li id="std3_skill_1"> Perl</li>',

'skill_2':'<ul><li id="std1_skill_2"> C</li> <li id="std2_skill_2"> C++</li><li id="std3_skill_2"> Java</li>',
'skill_3':'<ul><li id="std1_skill_3"> MySQL</li> <li id="std2_skill_3"> Oracle</li><li id="std3_skill_3"> MongoDB</li>',
'skill_4':'<ul><li id="std1_skill_4"> SpringBoot</li> <li id="std2_skill_4"> Express</li><li id="std3_skill_4"> Laravel</li>',
		};
$scope.mappedSkills = {'std1_skill_1':'Javascript','std2_skill_1':'PHP','std3_skill_1':'Perl',
'std1_skill_2':'C','std2_skill_2':'C++','std3_skill_2':'Java',
'std1_skill_3':'MySQL','std2_skill_3':'Oracle','std3_skill_3':'MongoDB',
'std1_skill_4':'SpringBoot','std2_skill_4':'Express','std3_skill_4':'Laravel',
		};
	$scope.addStdSkills = function(element){
console.log("This",'#std_'+element, $scope.stdSkills[element] );
	let id ="#std_"+element;
	$(id).append($scope.stdSkills[element]); 
$('li').click(function(){
let map_id =this.id.replace('std','map');
console.log("This",id,$('#'+this.id).innerHTML);
$('#map_skills').append( '<li id="'+map_id+'">'+$scope.mappedSkills[this.id]+'</li>'); 
});

	};

	

});

