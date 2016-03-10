function cardController($scope, $sce) {
    $scope.playerOnePlay = '';
    $scope.playerTwoPlay = '';
    $scope.result = '';
    $scope.PlayerTurn = '1';
    Object.prototype.shuffle = function() {
        var j, x, i;
        for (i = this.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = this[i - 1];
            this[i - 1] = this[j];
            this[j] = x;
        }
    };
    $scope.cards = {
        1: 'as',
        2: 'deux',
        3: 'trois',
        4: 'quatre',
        5: 'cinq',
        6: 'six',
        7: 'sept',
        8: 'huit',
        9: 'neuf',
        10: 'dix',
        11: 'valet',
        12: 'dame',
        13: 'roi'
    };
    $scope.colors = [
        'coeur',
        'pique',
        'carreau',
        'trèfle'
    ];
    $scope.checkStatus = function() {
        /*function checkStatus() - Return true if player one won hand, false is player two won hand, then clear board*/
        $scope.result = 'J1 : '+$scope.playerOnePlay+' - J2 : '+$scope.playerTwoPlay;
        $scope.playerOnePlay = '';
        $scope.playerTwoPlay = '';
        return true;
    };
    $scope.cardScope = [];
    angular.forEach($scope.colors, function(color) {
        angular.forEach($scope.cards, function(card, index) {
            $scope.cardScope.push([color, card, index]);
        });
    });
    $scope.players = ['un', 'deux'];
    $scope.cardByPlayer = Math.floor($scope.cardScope.length / $scope.players.length);
    $scope.cardScope.shuffle();
    $scope.playerOneHand = $scope.cardScope.slice(0, $scope.cardByPlayer);
    $scope.playerTwoHand = $scope.cardScope.slice($scope.cardByPlayer, $scope.cardScope.length);
    $scope.play = function(player, cardIndex) {
        if (player === 1) {
            $scope.PlayerTurn = '2';
            $scope.playerOnePlay = $scope.playerOneHand[cardIndex][1] + ' de ' + $scope.playerOneHand[cardIndex][0];
            $scope.playerOneHand.splice(cardIndex,1);
        } else {
            $scope.PlayerTurn = '1';
            $scope.playerTwoPlay = $scope.playerTwoHand[cardIndex][1] + ' de ' + $scope.playerTwoHand[cardIndex][0];
            $scope.playerTwoHand.splice(cardIndex,1);
            $scope.checkStatus();
        }
    };

}
