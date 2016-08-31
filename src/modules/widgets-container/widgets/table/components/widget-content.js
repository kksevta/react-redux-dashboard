import React, {Component} from 'react';
import {dataConversionMethods} from '../model'
import WidgetsContainerModule from 'dashboard-app/widgets-container'
import {connect} from 'react-redux'
import {WIDGET_RAW_DATA_CONVERSION_ERROR_STATUS} from 'dashboard-app/config/status'
import WidgetComponents from '../../components'
class TableWidgetContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetRawData: undefined,
            widgetRawDataConverionError: ''
        }
    }
    componentDidMount() {
        let dataSourceType = this.props.widgetConf.params.dataSourceType;
        this.props.dispatch(WidgetsContainerModule.thunks.getWidgetsDataThunk({ dataSourceType: dataSourceType, widgetType: this.props.widgetConf.type, widgetId: this.props.widgetConf.id })).
            then((response) => {
                let config = dataConversionMethods[this.props.widgetConf.params.dataSourceType](response.data.data)
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
        let dataSourceType = nextProps.widgetConf.params.dataSourceType;
        if (nextProps.widgetConf.params !== this.props.widgetConf.params) {
            this.props.dispatch(WidgetsContainerModule.thunks.getWidgetsDataThunk({ dataSourceType: dataSourceType, widgetType: this.props.widgetConf.type, widgetId: this.props.widgetConf.id })).
                then((response) => {
                    let config = dataConversionMethods[this.props.widgetConf.params.dataSourceType](response.data.data)
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
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.widgetRawData != this.state.widgetRawData
    }
    render() {
        const Error = this.props.widgetConf.error ? this.props.widgetConf.error.message : this.state.widgetRawDataConverionError
        return (
            <div class="table-dynamic-height-wrapper">
                {Error || this.props.widgetConf.loading || !this.state.widgetRawData ? <div class="text-center">{Error}</div> : <WidgetComponents.Table config={this.state.widgetRawData}></WidgetComponents.Table>}
            </div>
        );
    }
}
export default connect()(TableWidgetContent)