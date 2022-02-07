import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

export const AddParticipantModal = ({ openModal, meetingId, ...props }) => {
    const [participant, setParticipant] = useState({});

    const salveaza = () => {
        let item = {
            name: participant.name,
        }

        axios.post(`/participants/meeting/${meetingId}/add`, item).then((res) => {
            console.log(res)
            if (res.status === 200) {
                props.onClose();
            }
        })
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setParticipant((prev) => { return { ...prev, [e.target.name]: e.target.value } })
        console.log(e.target, e.target.value, e.target.name)
    }

    return (
        //onHide={handleClose}
        <Modal show={openModal} onHide={props.onClose} >
            <Modal.Header closeButton>
                <Modal.Title>Adaugare</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nume">
                        <Form.Label>Nume</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="nume"
                            name="name"
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={salveaza}>Salveaza</Button>
            </Modal.Footer>
        </Modal >
    )
}


