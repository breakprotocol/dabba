angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper'])

    .controller('HomeCtrl',["$scope", "TemplateService", "NavigationService", "$timeout", function ($scope, TemplateService, NavigationService, $timeout) {

        $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
        console.log($scope.template);
        $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
        console.log($scope.menutitle);
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log($scope.navigation);

        $scope.mySlides = [
            'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
        ];
    }])

    .controller('ProductsCtrl',["$scope", "TemplateService", "NavigationService", "$timeout", "$stateParams", function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        $scope.template = TemplateService.changecontent("products"); //Use same name of .html file
        console.log($scope.template);
        $scope.menutitle = NavigationService.makeactive("Products"); //This is the Title of the Website
        console.log($scope.menutitle);
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log($scope.navigation);

        $scope.imgUrl="http://localhost/boxxitAngularBackend/uploads/";
        // $scope.imgUrl="https://opportunist-toleran.000webhostapp.com/uploads/";
        

        $scope.tpObject={"name":""};

        $scope.category = {
            "id": $stateParams.id,
            "name": $stateParams.name
        };
        console.log($stateParams.name);
        NavigationService.getSubCategories($scope.category, function (subCategories, products) {
            $scope.subCategories = subCategories;
            $scope.tpObject=subCategories[0];
            console.log("subCategories",subCategories);
            $scope.products = products;
        });

        $scope.getProducts = function (data) {
            console.log("event occured");
            $scope.selectedSubCategory=data;
            NavigationService.getProducts(data, function (products) {
                $scope.products = products;
            });
        };

        // $scope.subCategories = ["Gifts", "Envelopes", "Gifts", "Envelopes", "Gifts", "Envelopes", "Gifts", "Envelopes", "Gifts", "Envelopes", "Gifts", "Envelopes", "Gifts", "Envelopes", "Gifts", "Envelopes", "Envelopes", "Gifts", "Envelopes", "Envelopes", "Gifts", "Envelopes", "Envelopes", "Gifts", "Envelopes"];
        // $scope.products = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];



    }])

    .controller('CategoryCtrl',["$scope", "TemplateService", "NavigationService", "$timeout", function ($scope, TemplateService, NavigationService, $timeout) {
        alert();
        $scope.template = TemplateService.changecontent("category"); //Use same name of .html file
        console.log($scope.template);
        $scope.menutitle = NavigationService.makeactive("Category"); //This is the Title of the Website
        console.log($scope.menutitle);
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log($scope.navigation);

    }])

    .controller('FormCtrl',["$scope", "TemplateService", "NavigationService", "$timeout", function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("form"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Form"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.message1 = {"name":"heykjadbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"};
        $scope.message2 = {};   
            
            
            

      
    }])

    .controller('headerctrl',["$scope", "TemplateService", function ($scope, TemplateService) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });
        $.fancybox.close(true);
    }])

    .controller('languageCtrl',["$scope", "TemplateService", "$translate", "$rootScope", function ($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };


    }])

;