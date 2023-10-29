import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TableComponent = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/products', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            sortColumn,
            sortDirection,
            searchText,
          },
        });
        const modifiedData = response.data.data.data.map((item) => ({
          ...item,
          category: item.category.name,
        }));
        setProducts(modifiedData);
        
        setTotalProducts(response.data.data.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, sortColumn, sortDirection, searchText]);

  const columns = [
    { field: 'images', label: 'Image' },
    { field: 'name', label: 'Name', sortable: true },
    { field: 'category', label: 'Category', sortable: true },
    { field: 'price', label: 'Price', sortable: true },
    { field: 'actions', label: 'Actions' }
  ];

  const handleSort = (field) => {
    if (field === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(field);
      setSortDirection('asc');
    }
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button as={Link} to="/product" variant="success">
            Add Product
          </Button>
        </div>
        <div className="d-flex align-items-center mr-3 gap-3">
          <div className="search-icon">
            <i className="fa fa-search"></i>
          </div>
          <Form.Control
            type="text"
            placeholder="Search by Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div style={{ height: '70vh', overflowY: 'auto' }}>
          <Table striped bordered hover>
            <thead>
              <tr style={{position:'sticky'}}>
                {columns.map((column) => (
                  <th key={column.field} onClick={column.sortable ? () => handleSort(column.field) : null}>
                    <div className={`d-flex ${column.sortable ? '' : 'flex-column'} justify-content-between align-items-center`}>
                      <span>{column.label}</span>
                      {column.sortable && (
                        <i
                          className={`fa fa-duotone fa-sort ${column.field === sortColumn ? (sortDirection === 'asc' ? 'asc' : 'desc') : ''}`}
                          aria-hidden="true"
                        ></i>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={column.field} className={column.field}>
                      {column.field === 'images' ? (
                        <Image
                          className="product-thumbnail"
                          src={`${process.env.REACT_APP_API_URL_BACKEND}/${item[column.field][0].url}`}
                          alt={item.name}
                          fluid
                        />
                      ) : column.field === 'actions' ? (
                        <Button as={Link} to={`/detail/${item._id}`}>
                          View Product
                        </Button>
                      ) : (
                        item[column.field]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          <Row>
          <Form.Group className='col-2'>
            <Form.Label>Page Size:</Form.Label>
            <Form.Control
              as="select"
              value={itemsPerPage}
              onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value))
              setCurrentPage(1);
              }}
              style={{width:'3.5vw'}}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
            </Form.Control>
          </Form.Group>
          <ul className="pagination col-8" align-self-center='true'>
            <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {renderPageNumbers.map((number) => (
              <li
                key={number}
                className={number === currentPage ? 'active' : ''}
              >
                <Button
                  variant="link"
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </Button>
              </li>
            ))}
            <button className="pagination-button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </ul>
          </Row>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
