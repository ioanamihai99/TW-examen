import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

export const EditParticipantModal = ({ openModal, selected, ...props }) => {
    const [updatedParticipant, setUpdatedParticipant] = useState(selected);

    useEffect(() => {
        setUpdatedParticipant(selected)
    }, [selected])


    const actualizeaza = () => {
        console.log(updatedParticipant)
        axios.put(`/participants/${updatedParticipant.id}`, updatedParticipant).then((res) => {
            console.log(res);
            props.onClose();
        })
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setUpdatedParticipant((prev) => { return { ...prev, [e.target.name]: e.target.value } })
        console.log(e.target, e.target.value, e.target.name)
    }

    return (
        <Modal show={openModal} onHide={props.onClose} >
            <Modal.Header closeButton>
                <Modal.Title>Actualizare participant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className="mb-3" controlId="nume">
                        <Form.Label>Nume</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="nume"
                            name="name"
                            defaultValue={selected.name}
                            onChange={handleOnChange}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={actualizeaza}>Actualizeaza</Button>
            </Modal.Footer>
        </Modal>
    )
}


