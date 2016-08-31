import React, {Component} from 'react';
import WidgetComponents from '../components'
import TableComponents from './components'
class TableWrapper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {widgetConf, onWidgetParamsChange, closeWidgetSettingsModal} = this.props;
        return (
            <span>
                <WidgetComponents.WidgetConfModal widgetConf={widgetConf} onWidgetParamsChange={onWidgetParamsChange} closeWidgetSettingsModal={closeWidgetSettingsModal}/>
                <TableComponents.WidgetContent widgetConf={widgetConf}/>
            </span>
        )
    }
}
export default TableWrapper