import React, {Component} from 'react';
import WidgetComponents from '../components'
import PieChartComponents from './components'
class PieChartWrapper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {widgetConf, onWidgetParamsChange, closeWidgetSettingsModal} = this.props;
        return (
            <span>
                <WidgetComponents.WidgetConfModal widgetConf={widgetConf} onWidgetParamsChange={onWidgetParamsChange} closeWidgetSettingsModal={closeWidgetSettingsModal}/>
                <PieChartComponents.WidgetContent widgetConf={widgetConf}/>
            </span>
        )
    }
}
export default PieChartWrapper