# sNiFTer

sNiFTer is an information platform, with the goal to decrease the learning curve, increase engagement, and provide realiable, actionable information for the NFT space. sNiFTer aims to tackle this challenge on 3 fronts; insights and tracking into the performance of and engagement with an NFT entity, interactive educational resources on NFT and BlockChain technology, and interaction between users in a social manner for community engagement. By NFT entity, we are referring to an individual token, an NFT collection, or an NFT creator.

Insights and tracking into the performance of and engagement with an NFT entity are provided through features that allow users to view the historical and current sales performance and transaction events associated with an NFT entity, along with community engagement on social sites. This is achieved through NFT entity search, NFT entity current and historical sales performance, transaction history, and beautiful art work that drives the marketplace. Finally, users can track the events associated with an NFT entity through watch lists that provide current sales information and notify of transactions or upcoming air drops.

Interactive educational resources, presented in a __story__ like style, with quizzes after short videos, allow users to learn relevant technical information in bite sized pieces.

Social interaction between members will be achieved through posts detailing NFT events, such as a transaction on an NFT, an NFT collection, or even NFT artwork that one finds interesting.

Your audience for the Readme.md are other developers who are joining your team.
Specifically, the file should contain detailed instructions that any developer
can follow to install, compile, run, and test your project. These are not only
useful to new developers, but also to you when you have to re-install everything
because your old laptop crashed. Also, the teachers of this class will be
following your instructions.

## External Requirements

In order to build this project you first have to install:

* [Node.js](https://nodejs.org/en/)
* [Vue.js](https://vuejs.org)

macOS:
Ensure that you have Brew installed by running the following terminal command:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Brew is installed, run the following command for Node.js and NPM package manager:
```
brew install node
```
With NPM installed, run the following command for Vue.js:
```
npm install vue
```

## Setup

Here you list all the one-time things the developer needs to do after cloning
your repo. Sometimes there is no need for this section, but some apps require
some first-time configuration from the developer, for example: setting up a
database for running your webapp locally.

## Running

Specify the commands for a developer to run the app from the cloned repo.

# Deployment
Deploy and host a static web app through the Amplify CLI.
```
amplify add hosting
```
Choose the manual deployment option.
```
? Select the plugin module to execute: # Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type: # Manual Deployment
```
Run the following command to publish the app.
```
amplify publush
```

# Testing

In 492 you will write automated tests. When you do you will need to add a 
section that explains how to run them.

The unit tests are in `/test/unit`.

The behavioral tests are in `/test/casper/`.

## Testing Technology

In some cases you need to install test runners, etc. Explain how.

## Running Tests

Explain how to run the automated tests.

# Authors

Your names and emails:

Shayon Ghoshroy | shayong@email.sc.edu
