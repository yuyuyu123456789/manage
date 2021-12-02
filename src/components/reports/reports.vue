<!-- 数据统计 -->
<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import http from "../../http/index.js";
export default {
  props: {},
  data() {
    return {};
  },
  mounted() {
      var chartDom = document.getElementById("main");
var myChart = echarts.init(chartDom);
var option;
    http({
      url: "reports/type/1",
    })
      .then((res) => {
        option = res.data;

          option.title= {
            text: "用户来源",
          };
          option.tooltip={
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },

        option && myChart.setOption(option);
      })
      
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
#main{
    width: 100%;
    height: 700px;
}
</style>
