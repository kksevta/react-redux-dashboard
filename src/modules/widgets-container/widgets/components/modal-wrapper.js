import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
class ModalWrapper extends Component {
    render() {
        const {ModalBool, onRequestClose, title, saveWidgetParams} = this.props;
        return (
            <div>
                <Modal show={ModalBool} onHide={onRequestClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onRequestClose}>
                            Close
                        </Button>
                        <Button  onClick={saveWidgetParams}>
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default ModalWrapper;