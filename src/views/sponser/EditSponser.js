import { useEffect, useState } from 'react';
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
  Col
} from 'reactstrap';
// core components

const { Option } = Select;

const EditUser = ({ openModal, handleModal, sponser, setSponser, getSponsers }) => {
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
    if (!(sponser.email.includes('.') && sponser.email.includes('@'))) {
      return toast.error('Please enter a valid email');
    }
    api('put', `/sponsers/${sponser._id}`, sponser).then((res) => {
      toast.success('sponser edited successfully');
      getSponsers();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a sponser
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {sponser.name ? '' : '*'}{' '}
                        </span>
                        <label className="form-control-label">Name</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter sponser's name here"
                          type="text"
                          value={sponser.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {sponser.email ? '' : '*'}{' '}
                        </span>
                        <label className="form-control-label">Email</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter sponser's email here"
                          type="email"
                          value={sponser.email}
                          disabled
                          name="email"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row></Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditUser;
