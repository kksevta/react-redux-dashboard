import React, {Component} from 'react';
import {dataConversionMethods} from '../model'
import WidgetsContainerModule from 'dashboard-app/widgets-container'
import {connect} from 'react-redux'
import {WIDGET_RAW_DATA_CONVERSION_ERROR_STATUS} from 'dashboard-app/config/status'
import WidgetComponents from '../../components'
import { PieChart } from 'react-d3';

class PieChartWidgetContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetRawData: undefined,
            widgetRawDataConverionError: ''
        }
    }
    componentDidMount() {
        let dataSource = this.props.widgetConf.params.dataSource;
        this.props.dispatch(WidgetsContainerModule.thunks.getWidgetsDataThunk({ dataSource: dataSource, widgetId: this.props.widgetConf.id })).
            then((response) => {
                let config = dataConversionMethods[this.props.widgetConf.params.dataSourceType](response.data)
                this.setState({
                    widgetRawData: config,
                    widgetRawDataConverionError: ''
                })
            }).catch((response) => {
                this.setState({
                    widgetRawData: undefined,
                    widgetRawDataConverionError: WIDGET_RAW_DATA_CONVERSION_ERROR_STATUS.message
                })
            })
    }
    componentWillReceiveProps(nextProps) {
        let dataSource = nextProps.widgetConf.params.dataSource;
        if (nextProps.widgetConf.params !== this.props.widgetConf.params) {
            this.props.dispatch(WidgetsContainerModule.thunks.getWidgetsDataThunk({ dataSource: dataSource, widgetId: this.props.widgetConf.id })).
                then((response) => {
                    let config = dataConversionMethods[this.props.widgetConf.params.dataSourceType](response.data)
                    this.setState({
                        widgetRawData: config,
                        widgetRawDataConverionError: ''
                    })
                }).catch((response) => {
                    this.setState({
                        widgetRawData: undefined,
                        widgetRawDataConverionError: WIDGET_RAW_DATA_CONVERSION_ERROR_STATUS.message
                    })
                })
        }
        else if (nextProps.widgetConf.layout.h !== this.props.widgetConf.layout.h || nextProps.widgetConf.layout.w !== this.props.widgetConf.layout.w) {
            this.forceUpdate();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.widgetRawData != this.state.widgetRawData
    }
    render() {
        const Error = this.props.widgetConf.error ? this.props.widgetConf.error.message : this.state.widgetRawDataConverionError
        return (
            <div class="dynamic-height-wrapper">
                {Error || this.props.widgetConf.loading || !this.state.widgetRawData ? <div class="text-center">{Error}</div> : <div>d3 pie chart comp</div>}
            </div>
        );
    }
}
export default connect()(PieChartWidgetContent)