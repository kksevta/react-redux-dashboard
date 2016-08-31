import React, {Component, PropTypes} from 'react';
import WidgetHeaderComponents from './components'
import {connect} from 'react-redux'
import * as Actions from '../actions'
class WidgetHeaderWrapper extends Component {
    constructor(props) {
        super(props);
        this.onWidgetIconClick = this.onWidgetIconClick.bind(this)
    }
    onWidgetIconClick(icon) {
        this.props.dispatch(Actions.widgetAdded(icon.target.getAttribute('data-type')))
    }
    render() {
        const {widgetTypes} = this.props;
        const WidgetHeader = widgetTypes.map((widget) => {
            return <WidgetHeaderComponents.WidgetIcons key={widget.id} onWidgetIconClick={this.onWidgetIconClick} type={widget.type} title={widget.title} iconClass={widget.iconClass}></WidgetHeaderComponents.WidgetIcons>;
        })
        return (
            <div class='text-center'>
                {WidgetHeader}
            </div>
        );
    }
}

WidgetHeaderWrapper.propTypes = {
    widgetTypes: PropTypes.array
};

export default connect()(WidgetHeaderWrapper);