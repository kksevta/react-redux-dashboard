const noOfGridLayoutColumns = 12
const gridLayoutRowHeight = 30
const gridLayoutWidth = 2000
const dataSourceTypes = {
    'piechart': [
        {
            id: '_weatherForecast',
            type: 'weatherForecast',
            name: 'Weather Forecast',
        },
        {
            id: '_customData',
            type: 'customData',
            name: 'Custom Data',
        }],
    'table': [
        {
            id: '_weatherForecast',
            type: 'weatherForecast',
            name: 'Weather Forecast',
        },
        {
            id: '_indianGovtData',
            type: 'indianGovtData',
            name: 'Indian Govt. Data',
        }]
}
const defaultWidgetsList = [
    {
        id: '_piecharticon',
        iconClass: 'fa fa-pie-chart ',
        type: 'piechart',
        title: 'PieChart',
        layout: {
            h: 12,
            w: 6,
            minW: 4,
            minH: 8
        },
        params: {
            dataSourceType: dataSourceTypes['piechart'][0]['type'],
        }
    },
    {
        id: '_tableicon',
        iconClass: 'fa fa-table ',
        type: 'table',
        title: 'Table',
        layout: {
            h: 12,
            w: 6,
            minW: 4,
            minH: 8
        },
        params: {
            dataSourceType: dataSourceTypes['table'][0]['type'],
        }
    },
]
export {noOfGridLayoutColumns, defaultWidgetsList, dataSourceTypes, gridLayoutRowHeight, gridLayoutWidth }