import React, {PropTypes} from 'react';
const WidgetIcons = props => {
    let {onWidgetIconClick, iconClass, type, title} = props;
    iconClass = iconClass + ' widget-header-icons'
    return (
        <i class={iconClass} title={title} onClick={onWidgetIconClick} data-type={type} data-title={title}>
        </i>
    );
};

WidgetIcons.propTypes = {
    onWidgetIconClick: React.PropTypes.func,
    iconClass: PropTypes.string
};
export default WidgetIcons;