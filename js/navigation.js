var adminURL = "";
if (isproduction) {
    adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
    adminURL = "http://localhost/boxxitAngularPhp/backend/request.php";
    // adminURL = "https://opportunist-toleran.000webhostapp.com/backend/request.php";    
    // adminURL = "http://localhost:8080/backend/request.php";
    
}

var navigationservice = angular.module('navigationservice', [])

    .factory('NavigationService', function ($http) {

        var navigation = [{
                name: "Home",
                classis: "active",
                anchor: "home",
                subnav: []
                // link:"https://www.google.com",

            }, {
                name: "Form",
                classis: "active",
                anchor: "form",
                subnav: []
            },
            {
                name: "About Us",
                classis: "active",
                anchor: "about",
                subnav: []
            },

            {
                name: "Products",
                classis: "active",
                anchor: "",
                subnav: []
            }
        ];


        return {


            getnav: function () {
                console.log("adminURL",adminURL);
                $http({
                    method: "POST",
                    url: adminURL + "/categories/get"
                }).then(function (data) {

                    console.log("data", data);
                    var obj = {
                        name: "",
                        classis: "",
                        anchor: "products"
                    };
                    var retArr = [];
                    _.each(data.data, function (n) {
                        console.log(n);
                        obj.name = n.name;
                        obj.id = n._id,
                            retArr.push(_.cloneDeep(obj));
                    });

                    navigation[3].subnav = _.chunk(retArr, 7);
                    console.log(navigation[3].subnav);

                });
                return navigation;
            },

            makeactive: function (menuname) {
                for (var i = 0; i < navigation.length; i++) {
                    if (navigation[i].name == menuname) {
                        navigation[i].classis = "active";
                    } else {
                        navigation[i].classis = "";
                    }
                }
                return menuname;
            },

            getSubCategories: function (data, callback) {
                console.log(data);
                $http({
                    url: adminURL + "/sub_categories/get",
                    method: "POST",
                    data: {
                        "category": data.id
                    }

                }).then(function (subCat) {
                    console.log("sub category------", subCat.data);
                    $http({
                        url: adminURL + "/products/get",
                        method: "POST",
                        data: {
                            "sub_cat": subCat.data[0]._id,
                        }

                    }).then(function (prod) {
                        console.log("products------", prod.data);
                        callback(subCat.data, prod.data);
                    })

                })
            },

            getProducts: function (data, callback) {
                $http({
                    url: adminURL + "/products/get",
                    method: "POST",
                    data: {
                        "sub_cat": data._id
                    }
                }).then(function (prod) {
                    console.log("products------", prod.data);
                    callback(prod.data);
                })
            }



        };


    });