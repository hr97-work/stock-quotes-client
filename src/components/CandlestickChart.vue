<!-- <template>
  <div>
    <div class="period-buttons">
      <button :class="{ 'active-range': this.period === 'day' }" @click="setPeriod('day')">День</button>
      <button :class="{ 'active-range': this.period === 'month' }" @click="setPeriod('month')">Месяц</button>
      <button :class="{ 'active-range': this.period === '6months' }" @click="setPeriod('6months')">Полгода</button>
      <button :class="{ 'active-range': this.period === 'year' }" @click="setPeriod('year')">Год</button>
    </div>
    <highcharts :options="chartOptions" ref="highcharts" />
  </div>
</template>

<script>
import HighchartsVue from "highcharts-vue";
import { chartOptions } from '../constants/chartOptions'

export default {
  components: {
    highcharts: HighchartsVue.component,
  },
  props: ["quotes", "dates", "dateMode"],
  data() {
    return {
      period: 'day',
      chartOptions: {
        ...chartOptions,
        xAxis: {
          ...chartOptions.xAxis,
          events: {
            setExtremes: this.handleSetExtremes,
          },
        },
      },
      originalData: [],
      min: 0,
      max: 0,
    };
  },
  computed: {
    filteredData: function () {
      return this.originalData.filter(
        (point) => point[0] >= this.min && point[0] <= this.max
      );
    },
  },
  methods: {
    handleSetExtremes(event) {
      const { min, max } = event;
      const { chart } = this.$refs.highcharts;

      this.min = min;
      this.max = max;

      chart.series[0].setData(this.filteredData, true);
    },
    updateChart(quotes) {
      this.originalData = quotes.map((quote) => [
        new Date(quote.date).getTime(),
        +quote.open,
        +quote.high,
        +quote.low,
        +quote.close,
      ]);


      this.$refs.highcharts.chart.series[0].setData(this.filteredData, true);

      this.setPeriod('year')
    },
    getDaysBetweenTimestamps(timestamp1, timestamp2) {
      const differenceInMs = Math.abs(timestamp2 - timestamp1);
      const millisecondsInDay = 24 * 60 * 60 * 1000;

      return Math.floor(differenceInMs / millisecondsInDay);
    },
    setPeriod(period) {
      this.period = period

      let range;


      const date = this.$props.dates.startDate;
      const now = date ? date : Date.now();

      switch (period) {
        case "day":
          range = 24 * 60 * 60 * 1000;
          break;
        case "month":
          range = 30 * 24 * 60 * 60 * 1000;
          break;
        case "6months":
          range = 6 * 30 * 24 * 60 * 60 * 1000;
          break;
        case "year":
          range = 365 * 24 * 60 * 60 * 1000;
          break;
      }

      const min = (date ? date : (this.$props.dates.endDate ? this.$props.dates.endDate : now)) - range;
      const max = this.$props.dates.endDate ? this.$props.dates.endDate : now

      this.$refs.highcharts.chart.xAxis[0].setExtremes(min, max);
    },
  },
  mounted() {
    this.updateChart(this.$props.quotes);
    if (this.$props.dateMode === 'single' && this.$props.dates.startDate) {
      this.setPeriod('day')
    }
  }
};
</script>

<style scoped lang="scss">
.period-buttons button {
  margin-right: 10px;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }
}

.active-range {
  color: #646cff
}
</style> -->


<template>
  <div>
    <highcharts :options="chartOptions" ref="highcharts" />
  </div>
</template>

<script>
import HighchartsVue from "highcharts-vue";
import { chartOptions } from '../constants/chartOptions'

export default {
  components: {
    highcharts: HighchartsVue.component,
  },
  props: ["quotes", "dates", "dateMode"],
  data() {
    return {
      period: 'day',
      chartOptions,
      originalData: [],
      min: 0,
      max: 0,
    };
  },
  methods: {
    updateChart(quotes) {
      this.originalData = quotes.map((quote) => [
        new Date(quote.date).getTime(),
        +quote.open,
        +quote.high,
        +quote.low,
        +quote.close,
      ]);


      this.$refs.highcharts.chart.series[0].setData(this.originalData, true);
    },
  },
  mounted() {
    this.updateChart(this.$props.quotes);
  }
};
</script>

<style scoped lang="scss">
.period-buttons button {
  margin-right: 10px;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }
}

.active-range {
  color: #646cff
}
</style>
