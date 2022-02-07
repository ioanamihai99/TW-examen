import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

export const AddModal = ({ openModal, ...props }) => {
    const [meeting, setMeeting] = useState({});

    const salveaza = () => {
        const urlString = meeting.url;
        let urlChecked;
        try {
            urlChecked = new URL(urlString);
        } catch (_) {
            alert('url nu este corect')
            return;
        }
        axios.post('/meetings/save', meeting).then((res) => {
            console.log(res)
            if (res.status === 200) {
                props.onClose();
            }
        })
    }
    const handleOnChange = (e) => {
        e.preventDefault();
        setMeeting((prev) => { return { ...prev, [e.target.name]: e.target.value } })
        console.log(e.target, e.target.value, e.target.name)
    }

    return (
        <Modal show={openModal} onHide={props.onClose} >
            <Modal.Header closeButton>
                <Modal.Title>Adaugare</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descriere</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="descriere"
                            name="description"
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="url">
                        <Form.Label>url</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="url"
                            name="url"
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


