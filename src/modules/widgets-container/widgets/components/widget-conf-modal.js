import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalWrapper from './modal-wrapper';
import {dataSourceTypes} from 'dashboard-app/config/widgets-config'
class WidgetConfModal extends Component {
    constructor(props) {
        super(props);
        this.saveWidgetParams = this.saveWidgetParams.bind(this)
    }
    saveWidgetParams() {
        this.props.closeWidgetSettingsModal(this.props.widgetConf)
        const clonedWidgetConf = Object.assign({}, this.props.widgetConf);
        clonedWidgetConf.title = this.refs._title.value;
        clonedWidgetConf.params = {};
        clonedWidgetConf.params.dataSourceType = this.refs._dataSourceType.value;
        this.props.onWidgetParamsChange(clonedWidgetConf)
    }
    render() {
        const {ModalBool, closeWidgetSettingsModal,widgetConf} = this.props;
        const {title, id, params, type} = widgetConf
        const options = dataSourceTypes[type].map((dataSource) => {
            return <option key={dataSource.id} value={dataSource.type}>{dataSource.name}</option>
        })
        return (
            <ModalWrapper
                ModalBool={widgetConf.modalbool} onRequestClose={() => closeWidgetSettingsModal(widgetConf) } saveWidgetParams={this.saveWidgetParams} title={"Widget Configuration"}>
                <div class="container">
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label >Widget Title: </label>
                            <input type="text" ref='_title' class="form-control"  defaultValue={title}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label >DataSource Type: </label>
                            <select  class="form-control" ref='_dataSourceType' defaultValue={params.dataSourceType} >
                                {options}
                            </select>
                        </div>
                    </div>
                </div>
            </ModalWrapper >
        );
    }
}
export default WidgetConfModal;