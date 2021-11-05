# sNiFTer

sNiFTer is an information platform, with the goal to decrease the learning curve, increase engagement, and provide realiable, actionable information for the NFT space. sNiFTer aims to tackle this challenge on 3 fronts; insights and tracking into the performance of and engagement with an NFT entity, interactive educational resources on NFT and BlockChain technology, and interaction between users in a social manner for community engagement. 

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

Shayon Ghoshroy | shayong@email.sc.edu

Stephen Baione | sbaione@email.sc.edu

Matthew Graham | grahammc@email.sc.edu

Charlie Coffin | cdcoffin@email.sc.edu

Evan Owre | eowre@email.sc.edu
