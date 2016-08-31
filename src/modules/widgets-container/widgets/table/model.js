let config = {};
const dataConversionMethods = {
    weatherForecast: (data) => {
        let columns = Object.keys(data.list[0].main)
        columns.unshift("Date");
        config = {
            title: 'Weather forecast for ' + data.city.name,
            columns: columns,
            list: []
        }
        data.list.forEach(function (row, index) {
            var obj = {
                id: row.dt,
                columnData: {}
            }
            columns.forEach((columnName) => {
                if (columnName == 'Date') {
                    obj.columnData[columnName] = row.dt_txt;
                }
                else {
                    obj.columnData[columnName] = row.main[columnName]
                }
            })
            config.list.push(obj)
        })
        return config;
    },
    indianGovtData: (data) => {
        let columns = Object.keys(data.fields);
        config = {
            title: 'Indian Govt. data',
            columns: columns,
            list: []
        }
        data.records.forEach(function (row, index) {
            var obj = {
                id: row.id,
                columnData: {}
            }
            columns.forEach((columnName) => {
                obj.columnData[columnName] = row[columnName]
            })
            config.list.push(obj)
        })
        return config;
    }
}
export { dataConversionMethods }