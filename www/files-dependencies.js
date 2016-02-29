var root = './www/app/';
var files =
    [
        
        "common/controllers/appController.js",
        "login/controllers/loginController.js",
        "order/controllers/orderController.js",
        "order/controllers/orderDetailController.js",
        "user/controllers/userController.js",
        "provider/controllers/providerController.js",
        "client/controllers/clientController.js",
        "product/controllers/productController.js",
        "product/controllers/productCountController.js",
        "employee/controllers/employeeController.js",
        "employee/controllers/employeeDetailController.js",



        "login/services/loginService.js",
        "order/services/orderService.js",
        "user/services/userService.js",
        "client/services/clientService.js",
        "product/services/productService.js",
        "employee/services/employeeService.js",
        "common/services/utilFactory.js",


        "common/filters/commonFilters.js",
        "common/directives/filter-grid.js",

        "!views.js"
    ];
    
function rootFiles(item) {
    var file = root + item;
    return file;
}    
files = files.map(rootFiles);
module.exports = files;