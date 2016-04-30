(function (angular) {
    angular.module('controllers.orderRegisterController', [])
        .controller('OrderRegisterCtrl', OrderRegisterCtrl);
    OrderRegisterCtrl.$inject = ['OrderService', '$log', '$state', 'ClientService', 'ProductService', 'toastr'];
    function OrderRegisterCtrl(OrderService, $log, $state, ClientService, ProductService, toastr) {
        var vm = this;
        vm.showFormProduct = false;
        vm.querySearchClient = querySearchClient;
        vm.selectedItemChangeClient = selectedItemChangeClient;
        vm.searchTextChangeClient = searchTextChangeClient;
        vm.newClient = newClient;

        vm.userId = 0;
        vm.products = [];
        vm.productsModel = [];
        vm.order = { products: [] };
        vm.searchTextClient = '';
        vm.selectedProduct = {};
        vm.selectedClient = {};
        vm.showFormProduct = false;
        vm.showButtons = false;
        vm.showFormOrder = true;
        vm.showFormPayment = false;
        vm.showDetailOrder = false; 
        vm.querySearchProduct = querySearchProduct;
        vm.selectedItemChangeProduct = selectedItemChangeProduct;
        vm.searchTextChangeProduct = searchTextChangeProduct;
        vm.newProduct = newProduct;
        vm.addToOrder = addToOrder;
        vm.toPaymentOrder = toPaymentOrder;
        vm.resetFields = resetFields;
        vm.removeItem = removeItem;
        vm.finishOrder = finishOrder;
        vm.backToPayment =backToPayment;
        vm.backToFormOrder = backToFormOrder;
        vm.create = create;
        init();


        function init() {
            loadProducts();
            loadClients();
        }
        function create () {
            var order = {};
            order.client = vm.selectedClient;
            order.user = vm.userId;
            order.which = {
                                total_value : vm.order.total_value, 
                                entrance : vm.order.entrance,
                                discount: vm.order.discount 
                            };
            order.products = vm.order.products.map(function (product) {
                var obj = {
                  id: product.id,
                  describe: product.describe
                };
                if(product.sendDate) {
                    obj.delivery_date = product.sendDate;
                }
                
                return obj;
            });
            $log.debug('order', order);                             
            OrderService.create(order).then(onCreateSuccess, onCreateError);
        }
        function onCreateError (err) {
            $log.error('onCreateError', err);
            toastr.error('Erro interno no servidor');
        }
        function onCreateSuccess (success) {
            $log.debug('onCreateSuccess', success);
            toastr.success('Pedido registrado com sucesso !');
        }
        function backToFormOrder () {
            vm.showFormPayment = false;
            vm.showFormOrder = true;
        }
        function backToPayment() {
            vm.showDetailOrder = false;
            vm.showFormPayment = true;
        }
        function removeItem(item) {
            vm.order.products.pop(item);
        }
        function toggleForms() {
            vm.showFormPayment = vm.showFormPayment ? false : true;
            vm.showFormOrder = !vm.showFormPayment;
        }
        function finishOrder() {
            var discount = vm.order.discount || 0;
            var entrance = vm.order.entrance || 0;
            vm.order.total_value = vm.order.total_value - (discount + entrance);
            
            vm.showDetailOrder = true;
            vm.showFormPayment = false;
            
        }
        function toPaymentOrder() {
            toggleForms();
            vm.order.total_value = 0;

            vm.order.products.forEach(function (e) {
                vm.order.total_value += parseFloat(e.quantity) * parseFloat(e.precoVenda);
            });
        }
        function resetFields(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }

            vm.searchTextProduct = '';
            vm.selectedClient = {};
            vm.selectedProduct = {};

        }
        function addToOrder(form) {
            if (!vm.selectedProduct) return;
            vm.order.products.push(vm.selectedProduct);

            resetFields(form);
        }
        /**
         * clients
         */
        function newClient(state) {
            $state.go('app.createClient', { 'clientName': vm.searchTextClient });
        }

        function querySearchClient(query) {
            query = angular.lowercase(query);
            var results = query ?
                vm.clients.filter(function (item) {
                    return angular.lowercase(item.display).indexOf(query) >= 0;
                })
                : vm.clients;

            return results;
        }
        function searchTextChangeClient(text) {
            $log.info('Text changed to ' + text);
        }
        function selectedItemChangeClient(item) {
            vm.showFormProduct = true;
            vm.selectedClient = item;
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function loadClients() {
            // ClientService.get().then(function (values) {
            //     $log.debug('value', values);
            // });
            var clients = [
                { value: 1, display: 'Erick Wendel' },
                { value: 2, display: 'Gustavo Oliveira' },
                { value: 4, display: 'Gustavo Oliveira2' },
                { value: 3, display: 'Ícaro Bichir' }
            ];

            vm.clients = clients;

        }
        /////////////////////////////////////

        /**
         * products
         */
        function newProduct(state) {
            $state.go('app.createProduct', { 'ProductName': vm.searchTextProduct });
        }


        function querySearchProduct(query) {
            query = angular.lowercase(query);
            var results = query ?
                vm.products.filter(function (item) {
                    return angular.lowercase(item.display).indexOf(query) >= 0;
                })
                : vm.products;

            return results;
        }
        function searchTextChangeProduct(text) {
            $log.info('Text changed to ' + text);
        }
        function selectedItemChangeProduct(item) {
            if (!item) return;

            var selected = vm.productsModel.filter(function filterProducts(product) {
                return product.id == item.value;
            });

            vm.selectedProduct = selected[0];
            vm.selectedProduct.client = { id: vm.selectedClient.value };
            vm.selectedProduct.user = { id: vm.userId };
            vm.showButtons = true;
            $log.info('Item changed to ' + JSON.stringify(selected[0]));
        }

        function loadProducts() {
            ProductService.products().then(function (products) {
                if (!products) return;
                vm.productsModel = products;
                var itens = angular.copy(products);
                itens = itens.map(function mapFn(item) {
                    return { value: item.id, display: item.nome };
                });
                vm.products = itens;
            });

        }

    }

})(angular);
