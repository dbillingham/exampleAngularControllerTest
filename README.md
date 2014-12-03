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


#How to use
Instead of:

    var db = new OrmLiteConnectionFactory("connectionString").OpenDbConnection();
    
Do:

    var db = new DbConnectionAdapter(new OrmLiteConnectionFactory("connectionString").OpenDbConnection());
    
