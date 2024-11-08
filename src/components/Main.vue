<template>
  <div class="filter-container">
    <div class="filter-labels">
      <span class="range" @click="() => setRangeMode('single')" :class="{ 'active-range': rangeMode == 'single' }">
        Дата
      </span>
      /
      <span class="range" @click="() => setRangeMode('range')" :class="{ 'active-range': rangeMode == 'range' }">
        Диапазон дат
      </span>
    </div>
    <div class="date-range-container" v-if="rangeMode === 'range'">
      <label class="date-range-label" for="">
        <span>От</span>
        <input type="date" v-model="startDate" placeholder="Начальная дата" />
      </label>
      <label class="date-range-label" for="">
        <span>До</span>
        <input type="date" v-model="endDate" placeholder="Конечная дата" />
      </label>
    </div>
    <div v-else style="min-height: 60px">
      <input type="date" v-model="singleDate" placeholder="Выберите дату" />
    </div>
    <div class="view-mode-container">
      <div class="filter-labels">
        <span class="range" @click="() => setViewMode('table')" :class="{ 'active-mode': viewMode == 'table' }">
          Таблица
        </span>
        /
        <span class="range" @click="() => setViewMode('graph')" :class="{ 'active-mode': viewMode == 'graph' }">
          Свечной график
        </span>
      </div>
      <div class="filter">
        <button @click="fetchQuotes">Фильтровать</button>
        <div @click="clearDates" class="clear-icon">
          <ClearIcon />
          <!-- <img src="../assets/clear.svg" alt="Очистить фильтры" /> -->
        </div>
      </div>
    </div>
  </div>
  <template v-if="!isLoading">
    <div v-if="viewMode == 'table'" class="table-container">
      <QuotesTable :quotes="quotes" />
    </div>
    <div v-if="viewMode == 'graph'" class="graph-container">
      <CandlestickChart :quotes="quotes" :dateMode="rangeMode" :dates="{
        startDate: this.startDateProp,
        endDate: this.endDateProp,
      }" />
    </div>
  </template>
  <div class="loader-container" v-else>
    <Loader />
  </div>
</template>

<script>
import axios from "axios";

import QuotesTable from "./QuotesTable.vue";
import CandlestickChart from "./CandlestickChart.vue";
import Loader from "./Loader.vue";
import ClearIcon from "../assets/icons/clear.vue";

export default {
  components: {
    QuotesTable,
    CandlestickChart,
    Loader,
    ClearIcon,
  },
  data() {
    return {
      rangeMode: "single",
      startDate: null,
      endDate: null,
      singleDate: null,
      period: null,
      quotes: [],
      viewMode: "table",
      isLoading: false,
    };
  },
  methods: {
    fetchQuotes(immidiate) {
      const { need_fetch, ...rest } = this.fetchParams;

      if (need_fetch || immidiate) {
        this.isLoading = true;
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/quotes`, { params: rest })
          .then((response) => {
            this.quotes = response.data.data;
          })
          .catch((error) => {
            console.error("Ошибка при получении котировок:", error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    getTimestamp(date) {
      if (!date) return null;

      return new Date(date).getTime();
    },
    setPeriod(period) {
      this.period = period;
      this.fetchQuotes();
    },
    setRangeMode(mode) {
      this.rangeMode = mode;
    },
    setViewMode(mode) {
      this.viewMode = mode;
    },
    clearDates() {
      this.rangeMode = "single";
      this.startDate = null;
      this.endDate = null;
      this.singleDate = null;
      this.fetchQuotes(true);
    },
  },
  mounted() {
    this.fetchQuotes(true);
  },
  computed: {
    startDateProp() {
      if (this.rangeMode === "single") {
        return this.getTimestamp(this.singleDate);
      }

      return this.getTimestamp(this.startDate);
    },
    endDateProp() {
      if (this.rangeMode === "single") {
        return null;
      }

      return this.getTimestamp(this.endDate);
    },
    fetchParams() {
      const params = {
        need_fetch: false,
        date: null,
        start_date: null,
        end_date: null,
      };

      if (this.rangeMode === "single" && this.singleDate) {
        params.need_fetch = true;
        params.date = this.singleDate;
      } else if (this.rangeMode === "range" && (this.startDate || this.endDate)) {
        params.need_fetch = true;
        params.start_date = this.startDate;
        params.end_date = this.endDate;
      }

      return params;
    },
  },
};
</script>

<style scoped lang="scss">
.filter-container {
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: end;
  min-height: 150px;
  padding: 0 40px;

  .active-range,
  .active-mode {
    font-weight: bold;
  }

  .filter-labels {
    font-size: 14px;
    letter-spacing: 0.54px;
  }

  .range {
    cursor: pointer;
    transition: 0.15s all;

    &:hover:not(.active-range, .active-mode) {
      color: #777;
    }
  }

  button:focus {
    outline: none;
  }

  .filter {
    display: flex;
    align-items: center;
    gap: 5px;

    .clear-icon {
      cursor: pointer;
      position: relative;
      height: 32px;

      &::after {
        content: "Очистить фильтры";
        opacity: 0;
        display: block;
        width: max-content;
        position: absolute;
        top: -35px;
        border-radius: 6px;
        right: 0px;
        background-color: black;
        color: white;
        font-weight: bold;
        font-size: 10px;
        padding: 10px;
        letter-spacing: 0.45px;
        transition: .15s all;
        visibility: hidden;
      }

      svg {
        transition: fill .25s;
      }

      &:hover {
        &::after {
          opacity: 1;
          visibility: visible;
        }

        svg {
          fill: #636363b0;
        }
      }
    }
  }

  .date-range-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 60px;
    justify-content: space-evenly;

    .date-range-label {
      align-items: center;
      display: flex;
      gap: 5px;

      span {
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.25px;
      }
    }
  }

  .view-mode-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}

.loader-container {
  height: calc(100vh - 400px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-container,
.graph-container {
  background-color: #f7f7f7;
  margin: 10px 40px 0 40px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
}

.table-container {
  padding: 40px;

  @media only screen and (max-width: 1260px) {
    max-width: 1120px;
    overflow: auto;
  }
}

.graph-container {
  padding: 20px 20px 0 20px;
}
</style>
