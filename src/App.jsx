import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'

import WelcomePage from './pages/WelcomePage/WelcomePage'
import BookList from './pages/books/BookList'
import AddBook from './pages/books/AddBook'
import BookPageForEdit from './pages/books/BookPageForEdit'
import BookDetail from './pages/books/BookDetail'

import AdminLogin from './pages/LoginSignupPages/AdminLogin'

import CreateDiscount from './pages/Discount/CreateDiscount'
import DiscountList from './pages/Discount/DiscountList'
import DiscountForEdit from './pages/Discount/DiscountForEdit'

import UserList from './pages/users/UserList'


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<AdminLogin />} />

        {/* ADMIN PAGES */}
        <Route path="/admin/dashboard" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <WelcomePage />
            </main>
          </div>
        } />

        <Route path="/books" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <BookList />
            </main>
          </div>
        } />

        <Route path="/add/book" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <AddBook />
            </main>
          </div>
        } />

        <Route path="/book/:id" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <BookDetail />
            </main>
          </div>
        } />

        <Route path="/edit/book/:id" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <BookPageForEdit />
            </main>
          </div>
        } />

        {/* DISCOUNTS */}
        <Route path="/discounts" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <DiscountList />
            </main>
          </div>
        } />

        <Route path="/add/discount" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <CreateDiscount />
            </main>
          </div>
        } />

        <Route path="/edit/discount/:id" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <DiscountForEdit />
            </main>
          </div>
        } />

        {/* USERS */}
        <Route path="/users" element={
          <div className="d-flex">
            <Sidebar />

            <main style={{ flexGrow: 1, padding: '20px' }}>
              <UserList />
            </main>
          </div>
        } />

      </Routes>

    </BrowserRouter>
  )
}

export default App