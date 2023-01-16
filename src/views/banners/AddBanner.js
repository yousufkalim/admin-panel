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

const AddBanner = ({ openModal, handleModal, getBanner }) => {
  let [banner, setBanner] = useState({
    name: '',
    link:"",
  bannerImg:''
  });

    const handleFileChange = (e) => {
    setBanner({ ...banner, bannerImg: e.target.files[0] });
  };

  const handleInput = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (banner.name == '') {
      return toast.error("Please enter name");
    }

    if (banner.bannerImg == '') {
      return toast.error('Please enter Img');
    }
  
    for (const property in banner)
{
    formData.append(property,banner[property])
} 

    api('post', '/banners', formData).then((res) => {
      toast.success('User added successfully');
      getBanner();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add Banner
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
                

                  
                  </Row
                  >
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

                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
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

export default AddBanner;
