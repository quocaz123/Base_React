import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { putUpdateUser } from '../service/UserService';
const ModalEditUser = (props) => {
    const { handleClose, show, dataUserEdit } = props;
    const [name, setName] = useState(" ");
    const [job, setJob] = useState(" ");

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
    }
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit])
    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"
                            value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Job</label>
                        <input type="text" className="form-control"
                            value={job} onChange={(event) => setJob(event.target.value)} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalEditUser;
