import React, {Component} from 'react';
import WidgetModule from './widgets'
import WidgetHeaderModule  from './widgets-header'
import {defaultWidgetsList} from 'dashboard-app/config/widgets-config'

class WidgetsContainerWrapper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const widgetTypes = defaultWidgetsList;
        return (
            <div>
                <WidgetHeaderModule.wrapper widgetTypes={widgetTypes} />
                <hr/>
                <WidgetModule.wrapper/>
            </div>
        )
    }
}
export default WidgetsContainerWrapper