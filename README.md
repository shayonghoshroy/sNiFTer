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

Install AWS Amplify CLI globally.
```
npm install -g @aws-amplify/cli
```
Setup the Amplify CLI.
```
amplify configure
```
Install Amplify libraries.
```
npm install aws-amplify @aws-amplify/ui-components
```

## Running

Run the Vue app.
```
npm run serve --open
```

## Deployment
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
amplify publish
```

# Testing

Our project uses the Jest testing framework.

To test the Vue app, use the command:
```
npm test [jest options]
```

# Authors

Your names and emails:

Shayon Ghoshroy | shayong@email.sc.edu

Stephen Baione | sbaione@email.sc.edu

Matthew Graham | grahammc@email.sc.edu

Charlie Coffin | cdcoffin@email.sc.edu
