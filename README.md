# Clique: A Javascript Linear Algebra Library with Applications to Spectral Analysis

Clique represents a two-sided effort:

1. A generalized, powerful linear algebra library for use in any Javascript application
2. An application of said library to a new statistical method for analyzing trends in large data sets

Although initial efforts involved approval voting data, the present attempt will
expand the possibilities of the statistical technique to analyze a wider
variety of information types while making the tool available to all.

### Collaborators: Spectral Analysis

* Andrew Forney
* Edward Mosteig
* Michael Orrison
* David Uminsky

### Advisors: Clique

* Mike Megally
* Ray Toal

# Build Instructions

The following section details the necessary steps to run the Clique webapp and build its library:

## Node

To set-up node.js, please consult the documentation listed [here](https://github.com/joyent/node/wiki/Installation) for your particular operating system. Note: Windows development is not supported for this project as the Express framework cannot operate. Macs can enjoy the all-inclusive node / npm binary listed on the above page.

## Node Dependencies

The present project uses some third-party node dependencies that can be configured after node has been successfully set up:

Firstly, you must install node package manager (npm) as illustrated on step 4 of the above node installation tutorial. Once npm is set up, run the following commands:

`cd ~ ; npm install express jade`

## Cloning the source

If you are familiar with git cloning and do not require the assistance of an IDE or GUI, you may skip this step!

1. If you're using eclipse as your IDE, you can install the eGit plugin via the Indigo package (Install new software -> Indigo packages -> Collaboration -> eGit).
2. Right click anywhere in the project explorer, choose "import", then "project from git"
3. Click "clone" then fill in the necessary fields, using the http method for the clone (Note: replace "Username" with your git username): "https://Username@github.com/Forns/clique.git"
4. Follow the chain of "next" windows until you can click "finish." Once you see the cloned git repository, you can click on it and create a general project from it.
5. Now, it is located in your project explorer for you to work!

## Building the Library

Although the latest clone will always come with the latest distribution of the clique library, during development you will have to build the library with each change. Here's how to do it:

1. Navigate to the clique git directory, e.g. `cd ~/git/clique`
2. Type `make`
3. Whew! You're done; successful compilation will yield the library located in src/main/public/js/dist/clique.js

## Running the application

1. To run the node server, navigate to "src/main" within clique, then type `node app.js` -- Successful server setup will display "Express server listening on port 5700 in development mode"
2. To view the running server, open a web browser (not IE lol) then navigate to localhost:5700 -- On other computers, you can get the ip of the host computer, then append :5700 to access the page

## Running tests

Assuming setup has been successful in the previous steps, you can now run and modify the qUnit test suite be navigating to localhost:5700/test

## Pulling and Pushing

1. Before you start any coding session, make sure no one has been working on the project by doing a git pull (for eclipse users, right click on the clique project in your project explorer, then navigate to Team -> Pull)
2. When you've done work locally and you're ready to commit to your local clone of the repository, do a git commit (for eclipse users, right click on the clique project in your project explorer, then navigate to Team -> Commit). Make sure you add a descriptive commit message for what you did.
3. Once you're ready to push your changes to the central repository, do a git push (for eclipse users, right click on the clique project in your project explorer, then navigate to Team -> Push).

Happy coding! Don't break anything, or I'll break you!

# [API](http://clique.cloudno.de/api)
