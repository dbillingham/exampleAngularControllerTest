exampleAngularControllerTest
============================

Exmaple of how to mock a service which has a function that returns a promise. 

#Intro
I recently had to create a unit test for an angular project using jasmine.  The purpose of this test was to test a controller. It had many dependencies, one of which was a service, (angular factory).  This service was used for data access and had a function that called out to the api using the $http object.  This function returned a promise.

#Problem
I needed to mock/stub the service and provide an object for when the function returned.

#Resolution
Mock the service within a beforeEach method using sinon.  Sinon is a mocking framework popular within the mocha library.  Jasmine does have its own mocking framework built in called spyOn.

    var serviceMock;
 
    beforeEach(inject(function($q) {

      //Mock the service
 
      serviceMock = sinon.stub({ getById: function () { }});
    
    }));

Declare globally, and instantiate a deferred object for the getById function, within the beforeEach.

      var getByIdServiceDeferred;

      beforeEach(inject(function($q) {
 
        getByIdServiceDeferred = $q.defer();

      }));


Set the return value for the getById function within the mocked service, to return the deferred promise, within the beforeEach.

      serviceMock.getById.returns(getByIdServiceDeferred.promise);

    
The mock will need to be passed to the controller when it is initialised. Within the ‘it’ block, describe your test and create the controller under test.  

      it('should set an error message if the call to retrieve the  data is unsuccessful', function () {
 
        var ctrl = createUnitUnderTest();
 
      });

Get the deferred object and either resolve or reject it, passing an object if necessary.  You will also need to force a digest or use apply. And test the outcome.

      getByIdServiceDeferred.reject({ data: { message: 'failed' } });
      scope.$root.$digest();
      expect(ctrl.errorMessage).toBe('failed');


It is important to remember to either resolve or reject the promise after the controller has been instantiated.
