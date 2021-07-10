<template>
  <Layout>
      <div class="p-5 mb-6">
        <div class="border-b border-gray-200 mb-5 relative">
          <h1 class="py-5 transition text-xl font-bold">Results</h1>
       </div>
       <div class="">
        <v-chart class="chart" :option="option" />
       </div>
    </div>
  </Layout>
</template>
<script>
import Layout from "./components/layout";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "results",
  components: {
    Layout,
    VChart
  },
  provide: {
    [THEME_KEY]: ""
  },
  data() {
    return {
      option: {
        title: {
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "PPP (Muammend buahari)",
            "APV (Atiku dangote)",
            "ADC (Yowosore oteloda)",
            "YPP (Makinde azeez)",
            "APP (Kanu Nwankwa)"
          ]
        },
        series: [
          {
            name: "Presidential Election Results",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "PDP (Muammend buahari)" },
              { value: 310, name: "APC (Atiku dangote)" },
              { value: 234, name: "ADC (Yowosore oteloda)" },
              { value: 135, name: "YPP (Makinde azeez)" },
              { value: 1548, name: "APP (Kanu Nwankwa)" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
}
</style>

