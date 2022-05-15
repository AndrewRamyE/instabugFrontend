angular
  .module('appModule')
  .component('employeesList', {
    templateUrl: 'components/employees-list/employees-list.html',
    controller: EmployeesListComponent,
    controllerAs: 'EmployeesListComponentVm',
    bindings: {
      employeesList: '<',
      searchField: '<',
    },
  });

function EmployeesListComponent($scope, $sce) {
  $scope.highlight = function (text, search) {
    if (!search) {
      return $sce.trustAsHtml(text);
    }
    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
  };
}
