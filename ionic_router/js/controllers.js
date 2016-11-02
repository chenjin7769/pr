//控制器
var ctrlApp = angular.module('myApp1.controllers', []);

ctrlApp.controller('tab1Controller', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
		//八大菜图
		$scope.CooKs = [{
			e_id: '11',
			img: 'img1.jpg',
			cx: '粤菜'
		}, {
			e_id: '102',
			img: 'img2.jpg',
			cx: '浙菜'
		}, {
			e_id: '10',
			img: 'img3.jpg',
			cx: '川菜'
		}, {
			e_id: '104',
			img: 'img4.jpg',
			cx: '苏菜'
		}, {
			e_id: '13',
			img: 'img5.jpg',
			cx: '闽菜'
		}, {
			e_id: '101',
			img: 'img6.jpg',
			cx: '鲁菜'
		}, {
			e_id: '12',
			img: 'img7.jpg',
			cx: '湘菜'
		}, {
			e_id: '105',
			img: 'img8.jpg',
			cx: '徽菜'
		}];

		$scope.obj = 0;
		$scope.Datas = [];
		$scope.Data = [];
		/* state:1初始化，2刷新，3加载更多 */

		var morejia = function(obj, state) {

			$scope.hasmore = true;
			//首页随机菜
			$http.get("../ionic_router/meiwei.php", {
				params: {
					Numb: parseInt(Math.random() * 203 + 1)
				}
			}).success(function(res, status) {
//				console.log(res)
				if(res.result != null) {
					$scope.objs = Math.ceil(res.result.data.length / 10);
					for(var i = 0; i < $scope.objs + 1; i++) {
						if(i == Math.ceil(res.result.data.length / 10) - 1) {
							$scope.Datas[i] = res.result.data.slice(i * 10, res.result.data.length + 1);
						} else {
							$scope.Datas[i] = res.result.data.slice(i * 10, i * 10 + 10);
						}
					};
				};

				if(state == 3) {
					$scope.Data = $scope.Data.concat($scope.Datas[obj]);
				} else if(state == 1) {
					// 我们将把 concat() 中的参数连接到数组 a 中,可以是数组 ,等同于把数组中的内容放到数组中,：
					$scope.Data = [];
					$scope.obj = 0;
					$scope.Data = $scope.Data.concat($scope.Datas[obj]);
				};

			}).error(function(res, status) {});

		}
		morejia($scope.obj, 1);

		//下拉刷新===================================================
		$scope.doRefresh = function() {
			$scope.obj = 0;

			$scope.hasmore = true;
			$scope.isShow = "";
			$timeout(function() {
				//随机菜
				morejia($scope.obj, 1);

				//Stop the ion-refresher from spinning  父传子
				//$broadcast只能向child controller传递event与data
				$scope.$broadcast('scroll.refreshComplete');

			}, 1000);

		};
		//上拉加载;==================================
		var isT = true;
		$scope.loadMore = function() {
			if(isT) {
				isT = false;
				if(typeof($scope.objs) != "undefined" && $scope.obj < $scope.objs) {
					$scope.obj++;
					morejia($scope.obj, 3);
					$scope.$broadcast('scroll.infiniteScrollComplete');
					isT = true;
				} else {

					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.hasmore = false;
					$scope.isShow = "没有更多了";

				}
			}

		};
		if($scope.hasmore) {
			$timeout(function() {
				$scope.moreDataCanBeLoaded = $scope.hasmore
			}, 4000)
		}

	}])
	//内容详情页
	.controller('content1Controller', ['$scope', '$stateParams', '$http', '$sce', function($scope, $stateParams, $http, $sce) {

		$scope.title = '内容也面';
		$http.get("../ionic_router/meiweiId.php", {
			//地址栏获取参数   #/tab/content1/{{x.id}}
			params: {
				id: $stateParams.id
			}
		}).success(function(res) {
			$scope.data = res.result.data[0];
		});
		//	      console.log($stateParams);
	}])
	//轮播图跳转
	.controller('contentsController', ['$scope', '$stateParams', '$http', '$timeout', function($scope, $stateParams, $http, $timeout) {

		$scope.title = '轮播图';

		$scope.obj = 0;
		$scope.Datas = [];
		$scope.Data = [];
		/* state:1初始化，2刷新，3加载更多 */

		var morejia = function(obj, state) {

			$scope.hasmore = true;
			//菜系菜
			$http.get("../ionic_router/meiweiCXId.php", {
				params: {
					id: $stateParams.e_id
				}
			}).success(function(res, status) {
				
				if(res.result != null) {
					$scope.objs = Math.ceil(res.result.data.length / 10);
					for(var i = 0; i < $scope.objs + 1; i++) {
						if(i == Math.ceil(res.result.data.length / 10) - 1) {
							$scope.Datas[i] = res.result.data.slice(i * 10, res.result.data.length + 1);
						} else {
							$scope.Datas[i] = res.result.data.slice(i * 10, i * 10 + 10);
						}
					};
				};

				if(state == 3) {
					$scope.Data = $scope.Data.concat($scope.Datas[obj]);
				} else if(state == 1) {
					// 我们将把 concat() 中的参数连接到数组 a 中,可以是数组 ,等同于把数组中的内容放到数组中,：
					$scope.Data = [];
					$scope.obj = 0;
					$scope.Data = $scope.Data.concat($scope.Datas[obj]);
				};

			}).error(function(res, status) {});

		}
		morejia($scope.obj, 1);

		
		//上拉加载;==================================
		var isT = true;
		$scope.loadMore = function() {
			if(isT) {
				isT = false;
				if(typeof($scope.objs) != "undefined" && $scope.obj < $scope.objs) {
					$scope.obj++;
					morejia($scope.obj, 3);
					$scope.$broadcast('scroll.infiniteScrollComplete');
					isT = true;
				} else {

					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.hasmore = false;
					$scope.isShow = "没有更多了";

				}
			}

		};
		if($scope.hasmore) {
			$timeout(function() {
				$scope.moreDataCanBeLoaded = $scope.hasmore
			}, 4000)
		}
		//	      console.log($stateParams);
	}])
	//菜系
	.controller('tab2Controller', ['$scope', '$http', '$stateParams', '$timeout', function($scope, $http, $stateParams, $timeout) {
		$scope.title = 'tab2Controller';
		$scope.CooKs = [{
			e_id: '11',
			cx: '粤菜'
		}, {
			e_id: '102',
			cx: '浙菜'
		}, {
			e_id: '10',
			cx: '川菜'
		}, {
			e_id: '104',
			cx: '苏菜'
		}, {
			e_id: '13',
			cx: '闽菜'
		}, {
			e_id: '101',
			cx: '鲁菜'
		}, {
			e_id: '12',
			cx: '湘菜'
		}, {
			e_id: '105',
			cx: '徽菜'
		}];

	}])
	.controller('tab3Controller', ['$scope','$http', '$stateParams', '$timeout', function($scope,$http,$stateParams,$timeout) {
		$scope.title = 'tab3Controller';
		$scope.searchSelect = function(){
			$scope.serch=document.getElementById('search-input').value;
			$scope.isSHOW="";
	        if ($scope.serchVal == ''){
	        	$scope.isSHOW="没有这种菜";
	        }else{
	        	$http.get("../ionic_router/meiweSiId.php", {
					params: {
						serC: $scope.serch
					}
				}).success(function(res) {
					if(res.result == null){
						$scope.isSHOW="没有这种菜";
					}else{
						$scope.isSHOW="";
						location="#tab/content3/"+$scope.serch;
					}
				});
	        	
	        }
	    };
	}])
	.controller('content3Controller', ['$scope', '$http', '$stateParams', '$timeout', function($scope, $http, $stateParams, $timeout) {
		$scope.title = 'content3Controller';
		$scope.obj = 0;
		$scope.Datas = [];
		$scope.Data = [];
		/* state:1初始化，2刷新，3加载更多 */

		var morejia = function(obj, state) {

			$scope.hasmore = true;
			$scope.serch=document.getElementById('search-input').value;
			$http.get("../ionic_router/meiweSiId.php", {
				params: {
					serC: $scope.serch
				}
			}).success(function(res, status) {
				console.log(res)
				if(res.result != null) {
					$scope.objs = Math.ceil(res.result.data.length / 10);
					for(var i = 0; i < $scope.objs + 1; i++) {
						if(i == Math.ceil(res.result.data.length / 10) - 1) {
							$scope.Datas[i] = res.result.data.slice(i * 10, res.result.data.length + 1);
						} else {
							$scope.Datas[i] = res.result.data.slice(i * 10, i * 10 + 10);
						}
					};
				};

				if(state == 3) {
					$scope.Data = $scope.Data.concat($scope.Datas[obj]);
				} else if(state == 1) {
					// 我们将把 concat() 中的参数连接到数组 a 中,可以是数组 ,等同于把数组中的内容放到数组中,：
					$scope.Data = [];
					$scope.obj = 0;
					$scope.Data = $scope.Data.concat($scope.Datas[obj]);
				};

			}).error(function(res, status) {});

		}
		morejia($scope.obj, 1);

		//下拉刷新===================================================
		$scope.doRefresh = function() {
			$scope.obj = 0;

			$scope.hasmore = true;
			$scope.isShow = "";
			$timeout(function() {
				//搜索菜
				morejia($scope.obj, 1);

				//Stop the ion-refresher from spinning  父传子
				//$broadcast只能向child controller传递event与data
				$scope.$broadcast('scroll.refreshComplete');

			}, 1000);

		};
		//上拉加载;==================================
		var isT = true;
		$scope.loadMore = function() {
			if(isT) {
				isT = false;
				if(typeof($scope.objs) != "undefined" && $scope.obj < $scope.objs) {
					$scope.obj++;
					morejia($scope.obj, 3);
					$scope.$broadcast('scroll.infiniteScrollComplete');
					isT = true;
				} else {

					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.hasmore = false;
					$scope.isShow = "没有更多了";

				}
			}

		};
		if($scope.hasmore) {
			$timeout(function() {
				$scope.moreDataCanBeLoaded = $scope.hasmore
			}, 4000)
		}

	}]);
ctrlApp.filter('to_trusted', ['$sce', function($sce) {　　
	return function(text) {　　
		return $sce.trustAsHtml(text);　　
	};
}]);

ctrlApp.controller('MyCtrl', ['$scope', '$ionicSlideBoxDelegate', function($scope, $ionicSlideBoxDelegate) {
	$ionicSlideBoxDelegate.next();
}]);