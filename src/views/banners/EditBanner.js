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

const EditUser = ({ openModal, handleModal, banner, setBanner, getBanner }) => {
  const handleInput = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

     const handleFileChange = (e) => {
    setBanner({ ...banner, bannerImg: e.target.files[0] });
  };
  const handleSubmit = (e) => {
       e.preventDefault();
              const formData = new FormData();

       if (banner.name == '') {
         return toast.error("Please enter  name");
       }
         for (const property in banner)
       {
       formData.append(property,banner[property])
        } 

       api('put', `/banners/${banner._id}`, formData).then((res) => {
        toast.success('Banner edited successfully');
       getBanner();
          handleModal();
      });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a user
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
                            {banner.name ? '' : '*'}{' '}
                          </span>
                          Name
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Banner name here"
                          type="text"
                          value={banner.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                      <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          
                          Link
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Link here"
                          type="text"
                          value={banner.link}
                          name="link"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  <div className="pl-lg-4">
                      <Row>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label
                        //   className="form-control-label"
                          htmlFor="input-image"
                        >
                          Banner image <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="input-image"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                    </Row>
                    </div>

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
