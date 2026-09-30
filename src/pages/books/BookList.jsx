import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Table, Button, Form, Pagination } from 'react-bootstrap';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
    console.log("API URL =", apiUrl);
function BookList() {
    let [books, setBooks] = useState([]);
    let [isDelete, setIsDelete] = useState(false);
    let [searchBook, setSearchBook] = useState('');
    let [nop, setNop] = useState(1);
    let [booksPerPage] = useState(3);
    let [pageNo, setPageNo] = useState(1);
    let navigate = useNavigate();
    let items = [];
    for (let i = 1; i <= nop; i++) {
        items.push(
            <Pagination.Item key={i} onClick={() => setPageNo(i)}>{i}</Pagination.Item>
        )
    }
    function goToAddBook() {

        navigate('/add/book')
    }

    function handleDelete(id) {
        alert(id);
        axios({
            url: apiUrl + '/delete/book/' + id,
            method: 'delete'
        }).then(() => {
            alert('data has been deleted successfully')
            setIsDelete(true);
        })
            .catch((err) => {
                alert(err)
            })
    }
    function handleUpdate(id) {
        alert(id);
        navigate('/edit/book/' + id);
    }
    const handleView = (id)=>{
        navigate('/book/'+id);
    }
  useEffect(() => {
    console.log("useEffect is running");
    console.log("API URL:", apiUrl);

    axios({
        url: apiUrl + '/books',
        method: 'get',
        params: {
            searchBook: searchBook,
            pageNo: pageNo,
            booksPerPage: booksPerPage
        }
    })
    .then((res) => {
        console.log("BOOK API RESPONSE:", res.data);

        setBooks(res.data.data);
        setNop(Math.ceil(res.data.totalBooks / booksPerPage));
    })
    .catch((err) => {
        console.log("BOOK API ERROR:", err);
    });


    }, [isDelete, searchBook, pageNo, booksPerPage])
    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Control type='text' placeholder='enter bookTitle to search....' onChange={(e) => setSearchBook(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                    <Button className='mt-5' variant="success" style={{ float: 'right' }} onClick={goToAddBook} >AddBook +</Button>
                    <h3 className='text-center text-danger mt-5'>Book List</h3>
                   <div style={{ overflowX: 'auto', width: '100%' }}>
                   <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Book Title</th>
                            <th>Author Name</th>
                            <th>Imprint</th>
                            <th>Publication Year</th>
                            <th>Product From</th>
                            <th>Publisher</th>
                            <th>Genre</th>
                            <th>ISBN No</th>
                            <th>Book Category</th>
                            <th>Edition</th>
                            <th>Language</th>
                            <th>Description</th>
                            <th>Short Description</th>
                            <th>Country of Origin</th>
                            <th>Manufacturer</th>
                            <th>Manufacturer Address</th>
                            <th>Packager</th>
                            <th>Packager Address</th>
                            <th>Rating</th>
                            <th>Reviews</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                     <tbody>
                           {books.map((book) => (
                          <tr key={book._id}>

                               <td>
                                    <img
                                        src={book.bookImage}
                                        width="50"
                                        height="60"
                                        alt={book.bookTitle}
                                    />
                                </td>

                            <td>{book.bookTitle}</td>

                            <td>{book.authorName}</td>

                            <td>{book.imprint}</td>

                            <td>{book.publicationYear}</td>

                            <td>{book.productFrom}</td>

                            <td>{book.publisher}</td>

                            <td>{book.genre}</td>

                            <td>{book.isbnNo}</td>

                            <td>{book.bookCategory}</td>

                            <td>{book.edition}</td>

                            <td>{book.language}</td>

                            <td>{book.description}</td>

                            <td>{book.shortDescription}</td>

                            <td>{book.countryOfOrigin}</td>

                            <td>{book.nameOfManufacturer}</td>

                            <td>{book.addressOfManufacturer}</td>

                            <td>{book.nameOfPackager}</td>

                            <td>{book.addressOfPackager}</td>

                            <td>{book.rating || "-"}</td>

                            <td>{book.reviews || "-"}</td>

                            <td>₹{book.originalPrice}</td>

                            <td>
                                <div className="d-flex gap-2">

                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(book._id)}
                    >
                        <FaTrash />
                    </Button>

                    <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleUpdate(book._id)}
                    >
                        <FaEdit />
                    </Button>

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(book._id)}
                    >
                        <FaEye />
                    </Button>

                     </div>
                     </td>

                     </tr>
                      ))}
                    </tbody>
                    </Table>
                    </div>
                    <Pagination size='md' className='justify-content-center'>{items}</Pagination>
                </Col>
            </Row>
        </Container>
    )
}

export default BookList;