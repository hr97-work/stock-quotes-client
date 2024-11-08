import { createApp } from "vue";
import "./style.css";
import Main from "./components/Main.vue";
import stockInit from "highcharts/modules/stock";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
stockInit(Highcharts);

const app = createApp(Main);

app.use(HighchartsVue);

app.mount("#app");
