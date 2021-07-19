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
import { getResults, getElection } from "@/api";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default {
  name: "results",
  components: {
    Layout,
    VChart,
  },
  provide: {
    [THEME_KEY]: "",
  },
  data() {
    return {
      legendData: [],
      seriesData: [],
      election: {},
      results: [],
      option: {
        title: {
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [],
        },
        series: [
          {
            name: "Presidential Election Results",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    getElection(this.$route.params.election)
      .then((response) => {
        this.election = response.data.data;
        console.log(this.election);
      })
      .catch((error) => {
        console.log(error.response);
      });

    // console.log(this.option.legend);
    getResults(this.$route.params.election)
      .then((response) => {
        this.results = response.data.data;
        console.log(this.results);
        for (let i = 0; i < this.results.length; i++) {
          var candidate = this.results[i];
          console.log(candidate);
          var name = `${candidate.political_party.slug} ${candidate.full_name}`;

          this.option.series[0].data.push({
            value: parseInt(candidate.scores),
            name: name,
          });
          this.option.series[0].name = this.election.title;
          this.option.legend.data.push(name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
}
</style>

