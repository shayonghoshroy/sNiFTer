import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bulma/css/bulma.css";
import { VuesticPlugin } from "vuestic-ui";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";
import SimpleVueGrid from "simple-vue-grid";

applyPolyfills().then(() => {
  defineCustomElements(window);
});
Amplify.configure(awsconfig);

createApp(App).use(router).use(VuesticPlugin).use(SimpleVueGrid).mount("#app");
