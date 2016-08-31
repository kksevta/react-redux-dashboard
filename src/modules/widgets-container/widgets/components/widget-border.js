import React, {Component} from 'react';
import {defaultWidgetsList} from 'dashboard-app/config/widgets-config'
class WidgetBorder extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {widgetConf, onRemoveWidgetClick, openWidgetSettingsModal, onWidgetClone} = this.props
        const widget = _.find(defaultWidgetsList, (defaultWidget) => {
            return defaultWidget.type == widgetConf.type
        })
        let widgetTitleIconClass = widget.iconClass + ' pull-left widget-border-title-icon';
        let widgetTitleIconTitle = widget.title
        return (
            <div class="panel panel-default widegt-panel-wrapper">
                <div class="panel-heading grid-item-draggable-handle">
                    <i title="Remove" onClick={() => onRemoveWidgetClick(widgetConf) } class="fa fa-times pull-right widget-border-icons"  aria-hidden="true"></i>
                    <i title="Configuration" onClick={() => openWidgetSettingsModal(widgetConf) } class="fa fa-cog pull-right widget-border-icons" aria-hidden="true"></i>
                    <i title="Clone" onClick={() => onWidgetClone(widgetConf) } class="fa fa-clone pull-right widget-border-icons"  aria-hidden="true"></i>
                    <i title={widgetTitleIconTitle} class={widgetTitleIconClass} aria-hidden="true"></i>
                    <h3 class="panel-title">{widgetConf.title}</h3>
                </div>
                <div class="panel-body" class="widget-panel-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default WidgetBorder;