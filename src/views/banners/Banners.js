// reactstrap components
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row
} from 'reactstrap';

// core components
import AddBanner from './AddBanner';
import EditBanner from './EditBanner';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const Users = () => {

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { users ,banners} = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [banner, setBanner] = useState({
    
    name: '',
    bannerImg:''
   
  });

  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = async () => {
    const data = await api('get', '/banners');

    updateStore({ banners: data.banners });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setBanner(
         item||banner
      );
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
      console.log("d")
    api('delete', `/banners/${id}`).then(() => {
      toast.success('Banner deleted successfully');
      getBanner();
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Banners</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Banner
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Banner Img</th>
                    <th scope="col">Link</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {banners?.map((item) => {
                    return (
                      <tr>
                         
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm" title={item.name}>
                                {item.name?.length > 30
                                  ? item.name?.substring(0, 30) + '...'
                                  : item.name}
                              </span>
                            </Media>
                          </Media>
                        </th>
                            <td title={item.bannerImg}>
                           <a
                              className="  mr-3"
                              href="#pablo"
                              
                              onClick={(e) => e.preventDefault()}
                            >
                                
                            <img
                                alt="Article"
                                width="40%"
                              height="100px"
                                src={
                                  process.env.REACT_APP_SERVER_MEDIA_URL +
                                  item.bannerImg
                                }
                              />
                              
                              </a>
                        </td>
                             <td >
                           <a
                              className="  mr-3"
                              href={item?.link}
                              target="_blank"
                              
                            //   onClick={(e) => e.preventDefault()}
                            >
                           {item.link}
                              </a>
                        </td>
                     

                        <td>{new Date(item.createdAt).toDateString()}</td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              {item.test_conducted && (
                                <DropdownItem
                                //   onClick={() =>
                                //     history.push(`/admin/users/${item._id}`)
                                //   }
                                >
                                  View
                                </DropdownItem>
                              )}
                              <DropdownItem
                                href="#pablo"
                                onClick={() => handleEditModal(item)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                className="text-danger"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddBanner
            openModal={openModal}
            handleModal={handleModal}
            getBanner={getBanner}
          />
        )}
        {editModal && (
          <EditBanner
            openModal={editModal}
            handleModal={handleEditModal}
            banner={banner}
            setBanner={setBanner}
            getBanner={getBanner}
          />
        )}
      </Container>
    </>
  );
};

export default Users;
