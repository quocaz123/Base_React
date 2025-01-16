import axios from 'axios';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../service/UserService';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
function TableUsers() {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});


    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
    };


    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }

    const handleEditUser = (user) => {
        console.log(user);
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    useEffect(() => {
        //call api
        getUsers(1);


    }, []);


    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        //res && res.data tránh tình trạng call api lỗi bị sập
        if (res && res.data) {
            console.log(res);
            setTotalUsers(res.total)
            setTotalPage(res.total_pages)
            setListUsers(res.data);
        }
    }

    const handlePageClick = async (event) => {
        console.log("envent: ", event);
        // + convent string to number
        getUsers(+event.selected + 1);
    }

    return (
        <>
            <div className='my-3 add-new'>
                <span> <b>List Users:</b></span>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}>Add new user</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                </tbody>
            </Table>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModelAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
            />
        </>);
}

export default TableUsers;