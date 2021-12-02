import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bulma/css/bulma.css";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";

applyPolyfills().then(() => {
  defineCustomElements(window);
});
Amplify.configure(awsconfig);

createApp(App).use(router).use(Oruga).mount("#app");
