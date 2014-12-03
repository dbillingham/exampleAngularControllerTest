'use strict';

(function() {

    describe('exampleCtrlTests', function () {

        var scope,
            controller,
            dataServiceMock,
            getByIdServiceDeferred;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller, $q) {

            scope = $rootScope.$new();
            controller = $controller;

            //Mock the data service

            dataServiceMock = sinon.stub({ getById: function () { } });
            getByIdServiceDeferred = $q.defer();

            dataServiceMock.getById.returns(getByIdServiceDeferred.promise);

        }));

        function createUnitUnderTest() {

            //Create a new instance of the controller

            return controller('exampleCtrl', {
                $scope: scope,
                dataService: dataServiceMock
            });
        }


        it('should set an error message if the call to retrieve the data is unsuccessful', function () {

            var ctrl = createUnitUnderTest();

            getByIdServiceDeferred.reject({ data: { message: 'failed' } });
            scope.$root.$digest();

            expect(ctrl.messageCallback).toBe('failed');
        });

    });
})();