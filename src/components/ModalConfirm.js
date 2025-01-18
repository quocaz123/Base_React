import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../service/UserService';
import { toast } from 'react-toastify';
const ModalConfirm = (props) => {
    const { handleClose, show, dataUserDelete, handleDeleteUserFromModal } = props;


    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success("Delete user successfully");
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        }
        else {
            toast.error("Delete user failed");
        }
        console.log(res);
    }

    return (

        <Modal show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>

            <Modal.Header closeButton>
                <Modal.Title>Delete a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This action can't be undone !
                Are you sure you want to delete this user?
                <br />
                <b>email = {dataUserDelete.email} ?</b>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={confirmDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirm;
