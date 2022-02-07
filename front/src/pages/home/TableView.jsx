import React, { useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment'
import { Table, Button } from 'react-bootstrap';
import { EditModal } from './modals/EditModal'
import axios from "axios";

export const TableView = ({ dataList, ...props }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState({})
    const history = useHistory();

    const columns = [
        { name: 'id', label: 'Id' },
        { name: 'description', label: 'Descriere' },
        { name: 'url', label: 'Link' },
        { name: 'createdAt', label: 'Data creare' },

    ]

    const deleteItem = (id) => {
        axios.delete(`/meetings/${id}`).then((res) => {
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
                            <td>{item.description}</td>
                            <td>{item.url}</td>
                            <td>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                            <td>
                                <Button onClick={() => history.push(`/meetings/${item.id}`)}>Vezi participanti</Button>
                            </td>
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
                <EditModal
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


