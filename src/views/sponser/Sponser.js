// reactstrap components
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
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
import AddSponser from './AddSponser';
import EditSponser from './EditSponser';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const Users = () => {

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { users,sponsers } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
   let [sponser, setSponser] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    getSponsers();
  }, []);

  const getSponsers = async () => {
    const data = await api('get', '/sponsers');
    updateStore({ sponsers: data.sponsers });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setSponser({
         _id:item._id, 
        name: item.name,
        email: item.email,
      });
    }
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api('delete', `/sponsers/${id}`).then(() => {
      toast.success('Sponser deleted successfully');
      getSponsers();
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
                  <h3 className="mb-0">Sponsers</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Sponser
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {sponsers?.map((item) => {
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
                        <td title={item.email}>
                          {item.email?.length > 30
                            ? item.email?.substring(0, 30) + '...'
                            : item.email}
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
          <AddSponser
            openModal={openModal}
            handleModal={handleModal}
            getSponsers={getSponsers}
          />
        )}
        {editModal && (
          <EditSponser
            openModal={editModal}
            handleModal={handleEditModal}
            sponser={sponser}
            setSponser={setSponser}
            getSponsers={getSponsers}
          />
        )}
      </Container>
    </>
  );
};

export default Users;
