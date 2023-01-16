import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Select } from 'antd';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label
} from 'reactstrap';
// core components

const { Option } = Select;

const AddUser = ({ openModal, handleModal, getSponsers }) => {
  let [sponser, setSponser] = useState({
    name: '',
    email: '',
  });
  const handleInput = (e) => {
    setSponser({ ...sponser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sponser.name == '') {
      return toast.error("Please enter sponser's name");
    }
    if (sponser.email == '') {
      return toast.error('Please enter email');
    }
    api('post', '/sponsers', sponser).then((res) => {
      toast.success('Sponser added successfully');
      getSponsers();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a Sponser
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>
                            {sponser.name ? '' : '*'}{' '}
                          </span>
                          Name
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Sponser's name here"
                          type="text"
                          value={sponser.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>
                            {sponser.email ? '' : '*'}{' '}
                          </span>
                          Email
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Sponser's email here"
                          type="email"
                          value={sponser.email}
                          name="email"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Row></Row>
                  <Row></Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddUser;
