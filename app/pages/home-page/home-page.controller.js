angular
  .module('appModule')
  .controller('homeController', ['$scope', '$location', 'Employees', homePageController]);

function homePageController($scope, $location, Employees) {
  const homePageVm = this;
  homePageVm.employees = [];
  $scope.searchField = '';
  if ($location.search().filter) {
    $scope.searchField = $location.search().filter;
  }
  homePageVm.ChangeSearchField = (e) =>{
    $scope.searchField = e;
    $location.search('filter', $scope.searchField);
    $scope.$apply();
  };
  activate();
  window.addEventListener('customtype', (e)=>{ homePageVm.ChangeSearchField(e.detail); });
  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
}
