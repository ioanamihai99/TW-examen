import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { TableView } from './TableView';
import { AddModal } from './modals/AddModal';
import axios from "axios";

export const Home = (props) => {
  const [dataList, setDataList] = useState([])
  const [openAddModal, setOpenModal] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [filterWord, setFilterWord] = useState('');
  const [orderBy, setOrderBy] = useState()
  //preluam datele
  const getData = () => {
    let queryParams = {};

    if (orderBy) {
      queryParams = {
        params: {
          orderBy: orderBy
        }
      }
    }
    axios.get('/meetings', queryParams).then(res => {
      setDataList(res.data);
    })
  }

  //fortam rerandarea datelor in functie de un state
  useEffect(() => {
    getData();
  }, [refreshTable, orderBy])

  //filtrarea
  useEffect(() => {
    console.log(filterWord);
    if (filterWord !== "") {
      const filtered = dataList.filter((item) => item.description.includes(filterWord))
      setDataList(filtered);
    } else {
      getData();
    }
  }, [filterWord])

  return (
    <div>
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          <Form.Group controlId="cauta">
            <Form.Control
              type="text"
              placeholder="cauta"
              name="filterInput"
              onChange={(e) => { e.preventDefault(); setFilterWord(e.target.value); }}
            />
          </Form.Group>
          <Button onClick={() => setOrderBy('ASC')}>Sort ASC</Button>
          <Button onClick={() => setOrderBy('DESC')}>Sort DESC</Button>
        </div>
        <Button onClick={() => setOpenModal(true)}>Adauga meeting</Button>

      </div>


      <TableView dataList={dataList} refreshTable={refreshTable} setRefresh={setRefreshTable} />
      {
        openAddModal &&
        <AddModal
          openModal={openAddModal}
          onClose={() => {
            setOpenModal(false);
            getData();
          }}
        />
      }
    </div>
  );
}

