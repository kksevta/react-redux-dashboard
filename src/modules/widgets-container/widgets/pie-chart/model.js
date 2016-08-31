let config = {};
const dataConversionMethods = {
    weatherForecast: (data) => {
        config = {
            type: "pie",
            theme: "light",
            dataProvider: [],
            depth3D: 15,
            valueField: "humidity",
            titleField: "time",
            titles: [
                {
                    "text": "Humidity forcast for " + data.city.name,
                    "size": 15
                }
            ]
        }
        data.list.forEach(function (row, index) {
            if (index < 15) {
                var obj = {
                    "time": row.dt_txt,
                    "humidity": row.main.humidity
                }
                config.dataProvider.push(obj)
            }
        })
        return config;
    },
    customData: (data) => {
        config = {
            type: "pie",
            theme: "light",
            titles: [
                {
                    "text": "Custom Data",
                    "size": 15
                }
            ],
            dataProvider: [
                {
                    "country": "Lithuania",
                    "litres": 501.9
                }, {
                    "country": "Czech Republic",
                    "litres": 301.9
                }, {
                    "country": "Ireland",
                    "litres": 201.1
                }, {
                    "country": "Germany",
                    "litres": 165.8
                }, {
                    "country": "Australia",
                    "litres": 139.9
                }, {
                    "country": "Austria",
                    "litres": 128.3
                }, {
                    "country": "UK",
                    "litres": 99
                }, {
                    "country": "Belgium",
                    "litres": 60
                }, {
                    "country": "The Netherlands",
                    "litres": 50
                }],
            depth3D: 15,
            valueField: "litres",
            titleField: "country"
        }
        return config
    }
}
export { dataConversionMethods }