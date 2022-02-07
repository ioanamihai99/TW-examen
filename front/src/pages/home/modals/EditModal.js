import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

export const EditModal = ({ openModal, selected, ...props }) => {
    const [updatedMeeting, setUpdatedMeeting] = useState(selected);

    // console.log(selected.createdAt)
    // var date = new Date(selected.createdAt);
    // console.log(date.toISOString().substring(0, 10));
    useEffect(() => {
        setUpdatedMeeting(selected)
    }, [selected])

    const actualizeaza = () => {
        axios.put(`/meetings/${updatedMeeting.id}`, updatedMeeting).then((res) => {
            console.log(res);
            props.onClose();
        })
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setUpdatedMeeting((prev) => { return { ...prev, [e.target.name]: e.target.value } })
        console.log(e.target, e.target.value, e.target.name)
    }

    useEffect(() => {
        console.log(updatedMeeting)
    }, [updatedMeeting])

    return (
        <Modal show={openModal} onHide={props.onClose} >
            <Modal.Header closeButton>
                <Modal.Title>Actualizare meeting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className="mb-3" controlId="descriere">
                        <Form.Label>Descriere</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="descriere"
                            name="description"
                            defaultValue={selected.description}
                            onChange={handleOnChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="url">
                        <Form.Label>url</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="url"
                            name="url"
                            defaultValue={selected.url}
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    {/* todo update date also  */}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={actualizeaza}>Actualizeaza</Button>
            </Modal.Footer>
        </Modal>
    )
}


