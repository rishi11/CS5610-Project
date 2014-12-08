var URL = "http://api.worldweatheronline.com/free/v1/weather.ashx?q=ZIP,COUNTRY&format=json&num_of_days=1&key=7fb14336cc58cb24c49b88edd85a9050953334c9"
function WeatherClientController($scope, $http) {
    $scope.getWeather = function () {
        //console.log("function called : getWeather");
        if (($scope.zip != null) && ($scope.country != null)) {
            var zip = $scope.zip;
            var country = $scope.country;
        } else {
            var zip = "02115";
            var country = "United States of America";
        }
        ////console.log(country);
        var url = URL.replace("ZIP", zip);
        var url = URL.replace("COUNTRY", country);

        $http.get(url).success(function (response) {
            $scope.weather = response.data.weather;
            //console.log($scope.weather);
            $scope.zipDisp = zip
            $scope.countryDisp = country;
            $scope.dateDisp = response.data.weather[0].date;
            $scope.maxDisp = response.data.weather[0].tempMaxF;
            $scope.minDisp = response.data.weather[0].tempMinF;
            $scope.windDisp = response.data.weather[0].windspeedMiles;
            $scope.imgDisp = response.data.weather[0].weatherIconUrl[0].value;
        });
    }
}
