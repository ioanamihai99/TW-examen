import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import { TableView } from './TableView';
import { Button } from 'react-bootstrap';
import { AddParticipantModal } from './modals/AddParticipantModal'

export const MeetingDetailedView = ({ match, ...props }) => {
    const [openAddModal, setOpenModal] = useState(false);
    const [meeting, setMeeting] = useState([])
    const [dataList, setDataList] = useState([])
    const [refreshTable, setRefreshTable] = useState(false);


    const getData = () => {
        axios.get(`/meetings/${match.params.meetingId}`).then(res => {
            console.log(res.data)
            setMeeting(res.data);
        })
        axios.get(`/participants/meeting/${match.params.meetingId}`).then(res => {
            console.log(res.data)
            setDataList(res.data);
        })
    }

    const columns = [
        { name: 'id', label: 'Id' },
        { name: 'name', label: 'Nume' },
    ]
    //fortam rerandarea datelor in functie de un state
    useEffect(() => {
        getData();
    }, [refreshTable])

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h4>Bun venit in camera voastra</h4>
                <h4>Are url-ul de {meeting?.url} creat la {moment(meeting.createdAt).format("YYYY-MM-DD HH:mm:ss")}</h4>
            </div>

            <div style={{ marginTop: "20px" }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
                }}>
                    <h4>Participanti:</h4>
                    <Button onClick={() => setOpenModal(true)}>Adauga participant</Button>

                </div>
                {
                    dataList.length === 0 ?
                        'Nu exista participanti' :
                        <TableView
                            columns={columns}
                            dataList={dataList}
                            refreshTable={refreshTable}
                            setRefresh={setRefreshTable} />
                }

            </div>
            {
                openAddModal &&
                <AddParticipantModal
                    openModal={openAddModal}
                    meetingId={match.params.meetingId}
                    onClose={() => {
                        setOpenModal(false);
                        getData();
                    }}
                />
            }
        </>)
}


