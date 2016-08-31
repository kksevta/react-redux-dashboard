import React, {Component} from 'react';
import PieChartModule from './pie-chart'
import TableModule from './table'
import WidgetComponents from './components'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import ReactGridLayout from 'react-grid-layout';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {noOfGridLayoutColumns, gridLayoutRowHeight, gridLayoutWidth} from 'dashboard-app/config/widgets-config'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const BasicReactGridLayout = WidthProvider(ReactGridLayout);
class WidgetWrapper extends Component {
    constructor(props) {
        super(props);
        this.onWidgetParamsChange = this.onWidgetParamsChange.bind(this)
        this.onRemoveWidgetClick = this.onRemoveWidgetClick.bind(this)
        this.onWidgetsLayoutChange = this.onWidgetsLayoutChange.bind(this)
        this.onWidgetClone = this.onWidgetClone.bind(this);
        this.openWidgetSettingsModal = this.openWidgetSettingsModal.bind(this)
        this.closeWidgetSettingsModal = this.closeWidgetSettingsModal.bind(this)
    }
    openWidgetSettingsModal(widgetConf) {
        this.props.dispatch(Actions.widgetConfModalOpened(widgetConf))
    }
    closeWidgetSettingsModal(widgetConf) {
        this.props.dispatch(Actions.widgetConfModalClosed(widgetConf))
    }
    onWidgetParamsChange(widgetConf) {
        this.props.dispatch(Actions.widgetParamChanged(widgetConf))
    }
    onRemoveWidgetClick(widgetConf) {
        this.props.dispatch(Actions.widgetRemoved(widgetConf))
    }
    onWidgetsLayoutChange(layout) {
        this.props.dispatch(Actions.widgetsLayoutChanged(layout))
    }
    onWidgetClone(widgetConf) {
        this.props.dispatch(Actions.widgetCloned(widgetConf))
    }
    render() {
        const {widgetsConf} = this.props;
        let widgets = <div></div>;
        if (widgetsConf && widgetsConf.length > 0) {
            widgets = widgetsConf.map((widgetConf) => {
                return <div class="grid-item-wrapper" _grid={widgetConf.layout} key={widgetConf.id}>
                    <div class='max-size'>
                        {widgetConf.loading ? <WidgetComponents.Loader/> : null}
                        <WidgetComponents.WidgetBorder openWidgetSettingsModal={this.openWidgetSettingsModal} onWidgetClone={this.onWidgetClone} onRemoveWidgetClick={this.onRemoveWidgetClick} widgetConf={widgetConf}>
                            {(() => {
                                switch (widgetConf.type) {
                                    case "piechart":
                                        return (
                                            <PieChartModule.wrapper onWidgetParamsChange={this.onWidgetParamsChange} closeWidgetSettingsModal={this.closeWidgetSettingsModal} widgetConf={widgetConf}/>);
                                    case "table":
                                        return (
                                            <TableModule.wrapper onWidgetParamsChange={this.onWidgetParamsChange} closeWidgetSettingsModal={this.closeWidgetSettingsModal} widgetConf={widgetConf}/>);
                                    default:
                                        return (
                                            <PieChartModule.wrapper onWidgetParamsChange={this.onWidgetParamsChange} closeWidgetSettingsModal={this.closeWidgetSettingsModal} widgetConf={widgetConf}/>);
                                }
                            })() }
                        </WidgetComponents.WidgetBorder>
                    </div>
                </div>
            })
        }
        return (
            <div class="container-fluid">
                <BasicReactGridLayout draggableHandle='.grid-item-draggable-handle' cols={noOfGridLayoutColumns} rowHeight={gridLayoutRowHeight} width={gridLayoutWidth} onLayoutChange={this.onWidgetsLayoutChange}>
                    {widgets}
                </BasicReactGridLayout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        widgetsConf: state.widgetsConf,
    }
}
export default connect(mapStateToProps, null)(WidgetWrapper)

