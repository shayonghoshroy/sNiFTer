import { createApp } from "vue";
import App from "./App.vue";

// configure Amplify in order to interact with backend services
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";

import router from "./router";

Amplify.configure(aws_exports);
applyPolyfills().then(() => {
  defineCustomElements(window);
});

createApp(App).use(router).mount("#app");
