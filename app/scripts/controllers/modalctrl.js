'use strict';

angular.module('erLoadUi')
  .controller('reassignnursectrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,rnId,podId,dataService,notificationService) {
    
    $scope.nurseId = rnId;
    $scope.podId = podId;
    
    //  Variable to store team only.
    $scope.teamsOnly = [];
    $scope.selectedTeamId = "";
    
    $scope.getTeamsOnly = function() {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                $scope.teamsOnly.unshift(dataService.teams[i]);
            }
        }
    };
 
    $scope.ok = function () {
        //  Where to reassign the nurse?
        var teamNameToAssign = "";
        //  Insert Member.
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == $scope.selectedTeamId) {
                teamNameToAssign = dataService.teams[i].name;
                dataService.teams[i].members.unshift($scope.nurseId);
                break;
            }
        }
        
        for(var i=0;i<$scope.podId.members.length;i++) {
            if($scope.podId.members[i].id == rnId.id) {
                $scope.podId.members.splice(i,1);
                break;
            }
        }
    
        notificationService.notification_text = "Assigned " + $scope.nurseId.name + " to " + teamNameToAssign;
        console.log(notificationService.notification_text);
        $uibModalInstance.close();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
    
})


angular.module('erLoadUi')
  .controller('reassignpatientctrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,patientId,rnId,podId,dataService,notificationService) {
    
    $scope.nurseId = rnId;
    $scope.podId = podId;
    
    $scope.placement = [];
    $scope.rnPlacement = [];
    
    $scope.teamsOnly = [];
    $scope.rnOnly = [];
    
    $scope.getTeamsOnly = function() {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                $scope.teamsOnly.unshift(dataService.teams[i].name);
            }
        }
        console.log($scope.teamsOnly);
        $scope.placement = [{options:$scope.teamsOnly,selected:'Select Pod'}];
        $scope.placement = $scope.placement[0];
    };
    
    $scope.getMembersAfterTeamSelect = function() {
        
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].name == $scope.placement.selected) {
                $scope.rnOnly = dataService.teams[i].members;
                break;
            }
        }

        console.log($scope.rnOnly);
        $scope.rnPlacement = [{options:$scope.rnOnly,selected:'Select RN'}];
        $scope.rnPlacement = $scope.rnPlacement[0];
        
    };
    
    $scope.reassignPatient = function() {
        var nurseN = null;
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].name == $scope.placement.selected) {
                for(var j=0;j<dataService.teams[i].members.length;j++) {
                    if(dataService.teams[i].members[j].id == $scope.rnPlacement.selected) {
                        nurseN = dataService.teams[i].members[j];
                        dataService.teams[i].members[j].assigned_patient.unshift(patientId);
                        break;
                    }
                }
            }
        }
                
        for(var i=0;i<$scope.nurseId.assigned_patient.length;i++) {
            if($scope.nurseId.assigned_patient[i].id == patientId.id) {
                $scope.nurseId.assigned_patient.splice(i,1);
                break;
            }
        }
        
        notificationService.setSuccessNotification("Re-assigned " + patientId.name + " to " + nurseN.name);
        $uibModalInstance.close();   
    }
    
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
    
})

angular.module('erLoadUi')
  .controller('manualpatientassignmentctrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,patientName,patientLimit,teams,dataService,patientNurseAssignmentService) {
    
    $scope.placement = [];
    $scope.rnPlacement = [];
    $scope.teamsOnly = [];
    $scope.rnOnly = [];
    
    $scope.getTeamsOnly = function() {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                $scope.teamsOnly.unshift(dataService.teams[i].name);
            }
        }
        console.log($scope.teamsOnly);
        $scope.placement = [{options:$scope.teamsOnly,selected:'Select Pod'}];
        $scope.placement = $scope.placement[0];
    };
    
    $scope.getMembersAfterTeamSelect = function() {
        
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].name == $scope.placement.selected) {
                $scope.rnOnly = dataService.teams[i].members;
                break;
            }
        }

        console.log($scope.rnOnly);
        $scope.rnPlacement = [{options:$scope.rnOnly,selected:'Select RN'}];
        $scope.rnPlacement = $scope.rnPlacement[0];
        
    };
    
    $scope.assignPatient = function() {
        console.log($scope.rnPlacement.selected);
        patientNurseAssignmentService.assignPatientToNurse(patientName,patientLimit,teams,$scope.rnPlacement.selected);
        patientName = "";
        $uibModalInstance.close(); 
    }
})

angular.module('erLoadUi')
  .controller('patientdetailsctrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance) {
    
    $scope.hello = "hello";
})

angular.module('erLoadUi')
  .controller('dischargepatientctrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,patientId,rnId,podId,dataService,patientNurseAssignmentService) {
    
    $scope.ok = function() {
        patientNurseAssignmentService.patientDischarge(patientId,rnId);
    }
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
    $uibModalInstance.close();
})

angular.module('erLoadUi')
    .controller('memberdetailsctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,member,dataService) {
})

angular.module('erLoadUi')
    .controller('poddetailsctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,team,dataService) {
})

angular.module('erLoadUi')
    .controller('doctordetailsctrl',function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,doctor,dataService) {
})

angular.module('erLoadUi')
    .controller('nurseswitchctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,member,team,dataService,notificationService,patientNurseAssignmentService) {
    
    $scope.selectedNurse = "";
    $scope.rns = [];
    $scope.rnPlacement = [];

    $scope.getAllNurse = function() {
        for(var i=0;i<dataService.rns.length;i++) {
            if(dataService.rns[i].member_status != 'active') {
                $scope.rns.unshift(dataService.rns[i]);
            }
        }
        $scope.rnPlacement = [{options:$scope.rns,selected:'Select RN'}];
        $scope.rnPlacement = $scope.rnPlacement[0];
    }
    
    $scope.selectNurse = function() {
        for(var i=0;i<$scope.rns.length;i++) {
            if($scope.rns[i].id == $scope.rnPlacement.selected) {
                $scope.selectedNurse = $scope.rns[i];
                break;
            }
        }
    }
        
    $scope.ok = function () {
        
        patientNurseAssignmentService.reAssignPatientToNurse(dataService.teams,member,$scope.selectedNurse);
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == team.id) {
                for(var j=0;j<dataService.teams[i].members.length;j++) {
                    if(dataService.teams[i].members[j].id == member.id) {
                        dataService.teams[i].members[j] = $scope.selectedNurse;
                        break;
                    }
                }
            }
        }
        notificationService.setSuccessNotification("Switched " + member.name + " with " + $scope.selectedNurse.name + " on POD " + team.name);
        $scope.selectedNurse.member_status = 'active';
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
    .controller('doctorswitchctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,team,doctor,dataService,notificationService,patientNurseAssignmentService) {
    
    $scope.selectedDoctor = '';
    $scope.doctors = [];
    $scope.dcPlacement = [];
    $scope.getAllDoctors = function() {
        for(var i=0;i<dataService.doctors.length;i++) {
            $scope.doctors.unshift(dataService.doctors[i]);
        }
        $scope.dcPlacement = [{options:$scope.doctors,selected:'Select Doctor'}];
        $scope.dcPlacement = $scope.dcPlacement[0];
    }
    
    $scope.selectDoctor = function() {
        for(var i=0;i<$scope.doctors.length;i++) {
            if($scope.doctors[i].id == $scope.dcPlacement.selected) {
                $scope.selectedDoctor = $scope.doctors[i];
                break;
            }
        }
    }
    
    $scope.ok = function () {
        //  Switch to another doctor.
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == team.id) {
                dataService.teams[i].doctor = $scope.selectedDoctor;
                break;
            }
        } 
        
        notificationService.setSuccessNotification("Switched " + doctor.name + " with " + $scope.selectedDoctor.name + " on POD " + team.name);
        $uibModalInstance.close();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
 .controller('assignnursectrl',function($scope,$uibModalInstance,team,dataService,notificationService,patientNurseAssignmentService){
                
$scope.selectedNurse = "";
    $scope.rns = [];
    $scope.rnPlacement = [];

    $scope.getAllNurse = function() {
        for(var i=0;i<dataService.rns.length;i++) {
            if(dataService.rns[i].member_status != 'active') {
                $scope.rns.unshift(dataService.rns[i]);
            }
        }
        $scope.rnPlacement = [{options:$scope.rns,selected:'Select RN'}];
        $scope.rnPlacement = $scope.rnPlacement[0];
    }
    
    $scope.selectNurse = function() {
        for(var i=0;i<$scope.rns.length;i++) {
            if($scope.rns[i].id == $scope.rnPlacement.selected) {
                $scope.selectedNurse = $scope.rns[i];
                break;
            }
        }
    }
        
    $scope.ok = function () {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == team.id) {
                dataService.teams[i].members.push($scope.selectedNurse);
                break;
            }
        }
        notificationService.setSuccessNotification("Assigned " + $scope.selectedNurse.name + " with " + $scope.selectedNurse.name + " on POD " + team.name);
        $scope.selectedNurse.member_status = 'active';
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
                
});


angular.module('erLoadUi')
 .controller('newpodctrl',function($scope,$uibModalInstance,dataService,notificationService,patientNurseAssignmentService){
    
    $scope.listSelectNurse = [];
    $scope.podName = "";
    $scope.selectedDoctor = undefined;
    $scope.setDoctor = function(item) {
        $scope.selectedDoctor = item;
    }
    $scope.doctors = function() { 
        return dataService.doctors;
    }
    
    $scope.rns = function() { 
        var returnNurses = [];
        for(var i=0;i<dataService.rns.length;i++) {
            if(!getById(dataService.rns[i].id,$scope.listSelectNurse)) {
                returnNurses.unshift(dataService.rns[i]);
            }
        }
        return returnNurses;
    }
    
    function getById(id, myArray) {
    return myArray.filter(function(obj) {
          if(obj.id == id) {
            return obj 
          }
        })[0]
    }
    
    $scope.removeNurse = function(nurseId) {
        for(var i=0;i<$scope.listSelectNurse.length;i++) {
            if($scope.listSelectNurse[i].id == nurseId.id) {
                $scope.listSelectNurse.splice(i,1);
                break;
            }
        }
    }
    
    $scope.setNurse = function(item) {
        $scope.listSelectNurse.push(item);
        $scope.selectedNurse = "";
    }
    
    
    $scope.ok = function () {
        
        //  create the team.
        var team = {'id': dataService.teams.length + 1,'name': $scope.podName,
         'team_status':'active', 'count': '0',
         'doctor':$scope.selectedDoctor,
         'members':$scope.listSelectNurse
        };
        
        
        dataService.teams.push(team);
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
});


