angular.module("umbraco").controller("Umbraco.RedirectUrlSearch", function ($scope, $http, angularHelper, notificationsService, entityResource) {

    //...todo
    //paging
    //search by url or url part
    //search by domain
    //display domain in dashboard results?

    $scope.isSearch = false;
    $scope.hasResults = false;


    $scope.search = function () {

        //do we want to search by url and by domain...

        var searchTerm = $scope.searchTerm;

        $http.get("backoffice/api/RedirectUrlManagement/SearchRedirectUrls/?searchTerm=" + searchTerm).then(function (response) {
            var matchingItems = response.data;   
            $scope.isSearch = true;
            $scope.StatusMessage = matchingItems.StatusMessage;
            $scope.hasResults = matchingItems.HasSearchResults;
            $scope.redirectUrls = matchingItems.SearchResults;
            angular.forEach($scope.redirectUrls, function (item) {     
                $http.get("backoffice/api/RedirectUrlManagement/GetPublishedUrl/?id=" + item.ContentId).then(function (response) {
                    item.ContentUrl = response.data;
                });               
            });
        });
    };

    $scope.load = function () {   
       // $scope.searchTerm = "";
        $scope.search();
    };

    $scope.removeRedirect = function (redirectToDelete) {
        $http.post("backoffice/api/RedirectUrlManagement/DeleteRedirectUrl/" + redirectToDelete.Id).then(function (response) {
            if (response.status == 200) {
                notificationsService.success('Redirect Url Removed!', 'Redirect Url ' + redirectToDelete.Url + ' has been deleted');
                // now remove from table client sides
                var index = -1;
                var urlArr = eval($scope.redirectUrls);
                for (var i = 0; i < urlArr.length; i++) {
                    if (urlArr[i].Id === redirectToDelete.Id) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    notificationsService.warning('Redirect Url Removal Error!', 'Redirect Url ' + redirectToDelete.Url + ' may have already been removed');
                }
                $scope.redirectUrls.splice(index, 1);
            }
            else {
                notificationsService.warning('Redirect Url Error!','Redirect Url ' + redirectToDelete.Url + ' was not deleted');
            }   
        }); 
    };
    $scope.load();
});


