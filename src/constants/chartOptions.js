export const chartOptions = {
  chart: {
    type: "candlestick",
    backgroundColor: "#f7f7f7",
    animation: {
      duration: 500, // Duration in milliseconds for smoother transition
      easing: "easeOutQuad", // Easing function for animation
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    type: "datetime",
    labels: {
      style: {
        color: "#6e6e6e",
        fontSize: "12px",
      },
    },
  },
  yAxis: {
    title: {
      text: "Цена",
      style: {
        color: "#6e6e6e",
        fontWeight: "bold",
      },
    },
    gridLineColor: "#e6e6e6",
    labels: {
      style: {
        color: "#6e6e6e",
      },
    },
  },
  series: [
    {
      name: "Цена акций",
      type: "candlestick",
      tooltip: {
        valueDecimals: 2,
      },
      data: [],
      // color: "#f44",
      // upColor: "#4caf50",
      lineWidth: 1,
      dataGrouping: {
        enabled: true,
        units: [
          ["day", [1]],
          ["week", [1]],
          ["month", [1]],
        ],
      },
      tooltip: {
        valueDecimals: 2,
        split: true,
        headerFormat: "<b>{point.key}</b><br>",
        pointFormat: `
                <span style="color:{series.color}">●</span>
                Открытие: <b>{point.open}</b><br/>
                <span style="color:{series.color}">●</span>
                Максимум: <b>{point.high}</b><br/>
                <span style="color:{series.color}">●</span>
                Минимум: <b>{point.low}</b><br/>
                <span style="color:{series.color}">●</span>
                Закрытие: <b>{point.close}</b>
              `,
      },
      pointRange: 24 * 3600 * 1000,
    },
  ],
  rangeSelector: {
    title: "",
    enabled: true,
    buttons: [
      {
        type: "day",
        count: 1,
        text: "День",
        enabled: true,
      },
      {
        type: "month",
        count: 1,
        text: "Месяц",
      },
      { type: "month", count: 6, text: "Пол года" },
      { type: "year", count: 1, text: "Год" },
      {
        type: "all",
        text: "Все время",
      },
    ],
    buttonTheme: {
      width: 65,
      padding: 4,
    },
    selected: 3,
  },
  navigator: {
    enabled: true,
  },
  credits: {
    enabled: true,
  },
};
