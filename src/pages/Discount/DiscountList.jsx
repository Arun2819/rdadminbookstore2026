import { useNavigate } from "react-router-dom"
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Table
} from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

function DiscountList() {

    const [discounts, setDiscounts] = useState([])
    const navigate = useNavigate()

    function goToAddDiscount() {
        navigate('/add/discount')
    }

    function goForEdit(id) {
        navigate('/edit/discount/' + id)
    }

    useEffect(() => {

        axios({
            url: apiUrl + '/discounts',
            method: 'get'
        })
        .then((res) => {

            console.log("DISCOUNT RESPONSE:", res.data)

            setDiscounts(res.data.data || [])

        })
        .catch((err) => {

            console.log("DISCOUNT ERROR:", err)
            alert(err.response?.data?.message || "Unable to load discounts")

        })

    }, [])

    return (

        <Container>

            {/* Search + Add Discount */}
            <Row>
                <Col>

                    <Form>
                        <FormGroup>

                            <Form.Control
                                type="text"
                                placeholder="Type of book name to search"
                            />

                        </FormGroup>
                    </Form>

                    <Button
                        className="mt-5"
                        variant="success"
                        style={{ float: 'right' }}
                        onClick={goToAddDiscount}
                    >
                        Add Discount+
                    </Button>

                </Col>
            </Row>


            {/* Discount List */}
            <Row>

                <h3 className="mt-2 text-center text-danger">
                    Discount List
                </h3>

                <Table bordered hover responsive>

                    <thead>

                        <tr>
                            <th>Discount Name</th>
                            <th>Discount Type</th>
                            <th>Discount Value</th>
                            <th>Book Name</th>
                            <th>Valid From</th>
                            <th>Valid To</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>


                    <tbody>

                        {
                            discounts.map((discount) => (

                                <tr key={discount._id}>

                                    <td>
                                        {discount.discountName}
                                    </td>

                                    <td>
                                        {discount.discountType}
                                    </td>

                                    <td>
                                        {discount.discountValue}
                                    </td>

                                    <td>
                                        {discount.book?.bookTitle || "Book not available"}
                                    </td>

                                    <td>
                                        {discount.validFrom
                                            ? new Date(discount.validFrom).toLocaleDateString("en-GB")
                                            : "-"
                                        }
                                    </td>

                                    <td>
                                        {discount.validTo
                                            ? new Date(discount.validTo).toLocaleDateString("en-GB")
                                            : "-"
                                        }
                                    </td>

                                    <td
                                        className={
                                            discount.status === 'Active'
                                                ? 'text-success'
                                                : 'text-danger'
                                        }
                                    >
                                        {discount.status}
                                    </td>

                                    <td>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => goForEdit(discount._id)}
                                        >
                                            Edit
                                        </Button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </Table>

            </Row>

        </Container>

    )
}

export default DiscountList