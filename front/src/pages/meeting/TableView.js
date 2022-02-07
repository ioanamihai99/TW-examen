import React, { useState } from 'react';

import { Table, Button } from 'react-bootstrap';
import { EditParticipantModal } from './modals/EditParticipantModal'
import axios from "axios";

export const TableView = ({ columns, dataList, ...props }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState({})

    const deleteItem = (id) => {
        axios.delete(`/participants/${id}`).then((res) => {
            props.setRefresh(prev => !prev);
            console.log(res)
        }).catch(err => console.log('Ups', err))
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {columns.map(column => {
                            return <th key={column.name}>{column.label}</th>
                        })}

                    </tr>
                </thead>
                <tbody>
                    {dataList.map(item => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                    <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                                    <Button onClick={() => {
                                        setSelectedMeeting(item);
                                        setEditModalOpen(true);
                                    }}>Editeaza</Button>
                                </div>
                            </td>
                        </tr>
                    }
                    )}
                </tbody>
            </Table>
            {
                editModalOpen &&
                <EditParticipantModal
                    openModal={editModalOpen}
                    selected={selectedMeeting}
                    onClose={() => {
                        setEditModalOpen(false);
                        props.setRefresh(prev => !prev);
                    }}
                />
            }
        </>)
}


