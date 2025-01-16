import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const ModelAddNew = (props) => {
    const { handleClose, show } = props;
    const [name, setName] = useState(" ");
    const [job, setJob] = useState(" ");

    const handleSaveUser = () => {
        console.log('Name:', name);
        console.log('Job:', job);
    }
    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
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
                <Button variant="primary" onClick={handleSaveUser}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelAddNew;
