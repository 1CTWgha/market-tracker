angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(DataServices, AuthServices, Auth){
  var homeComp = this;

  // AuthServices.userSignup();
  // AuthServices.userLogin();
  // Auth.isLoggedIn();
  // Auth.userLogout();

  // DataServices.searchStocks();
  // DataServices.details();

  // DataServices.getChartData().then(function(data){
  //   homeComp.foo = data;
  //   console.log("homeComp results: ", homeComp.foo);
  // });
}

HomeCompCtrl.$inject = ['DataServices', 'AuthServices', 'Auth'];
