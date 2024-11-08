<template>
  <table>
    <thead>
      <tr>
        <th>Дата</th>
        <th>Тикер</th>
        <th>Открытие</th>
        <th>Закрытие</th>
        <th>Максимум</th>
        <th>Минимум</th>
        <th>Объем</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="quote in quotes" :key="quote.id">
        <td>{{ quote.date }}</td>
        <td>{{ quote.ticker }}</td>
        <td>{{ quote.open }}</td>
        <td>{{ quote.close }}</td>
        <td>{{ quote.high }}</td>
        <td>{{ quote.low }}</td>
        <td>{{ quote.volume }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: ['quotes']
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

thead,
tbody {
  display: block;
}

tbody {
  max-height: calc(100vh - 300px);
  overflow: hidden;
  overflow-y: auto;
  }

thead {
  width: 100%;
}

tr {
  display: table;
  table-layout: fixed;
  width: 100%;
}

.filter-container {
  display: flex;
  justify-content: end;
  padding: 10px 0;
  gap: 10px;
}

th,
td {
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 160px;
}
</style>
