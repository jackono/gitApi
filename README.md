Github API using NodeJS and MongoDB:

 * NodeJS
 * MongoDB
 * ExpressJS

Prerequisites
-----

I assume you have installed Docker and it is running.

See the [Docker website](http://www.docker.io/gettingstarted/#h_installation) for installation instructions.

Build
-----

Steps to build a Docker image:

1. Build the image

        cd ..
        docker-compose build

    This will take a few minutes.

2. Run the image's default command, we will be using the docker-composer file configured.

        docker-compose up -d

3. Once everything has started up, you should be able to access the Swagger API doc via [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) on your host machine.

        open http://localhost:3000/api-docs/

4. To test the application using jest.
         docker-compose down //stop containers
         docker-compose -p test run --rm web npm run test

   Sample test result:
         PASS  tests/routes.test.js (19.228 s)
            Post Endpoints
            ✓ should save a comment to db (1018 ms)
            ✓ should fetch all comments from a github org (9 ms)
            ✓ should soft delete all comments from db (8 ms)
            ✓ should fetch all members from a github org (1240 ms)
            ✓ should return an error when posting to non-existing github org (584 ms)
            ✓ should return an error when fetching from non-existing github org (3 ms)
            ✓ should return an error when deleting a non-existing collection (3 ms)
            ✓ should return an error when deleting soft deleted collection (3 ms)
            ✓ should return an error when fetching the members from non-existing github org (589 ms)

            Test Suites: 1 passed, 1 total
            Tests:       9 passed, 9 total
            Snapshots:   0 total
            Time:        19.85 s
            Ran all test suites.