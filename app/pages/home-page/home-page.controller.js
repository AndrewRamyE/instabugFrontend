angular
  .module('appModule')
  .controller('homeController', ['$scope', '$location', 'Employees', homePageController]);

function homePageController($scope, $location, Employees) {
  const homePageVm = this;
  homePageVm.employees = [];
  $scope.searchField = '';
  $scope.page = 1;
  $scope.showBtn = true;
  $scope.lastPage = false;
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
  $scope.loadMore = async function () {
    $scope.page++;
    $scope.showBtn = false;
    Employees.loadMoreEmployees($scope.page)
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        if (data.pages === $scope.page) {
          $scope.lastPage = true;
        }
      });
    // this sleep just to see loading for demonstration purpose you can remove it in production
    await sleep(2000);
    $scope.showBtn = true;
    $scope.$apply();
  };
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
