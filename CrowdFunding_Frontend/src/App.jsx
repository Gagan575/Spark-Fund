import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Layout from './components/layouts/Layout'
import Contact from './components/pages/Contact'
import Book from './components/pages/Book'
import Login from './components/auth/Login'
import { Bounce, ToastContainer } from 'react-toastify'
import Register from './components/auth/Register'
import InvestorRegister from './components/auth/InvestorRegister'
import AddCategory from './components/admin/category/AddCategory'
import AllCategory from './components/admin/category/AllCategory'
import UpdateCategory from './components/admin/category/UpdateCategory'
import AdminLayout from './components/layouts/AdminLayout'
import OwnerLayout from './components/layouts/OwnerLayout'
import AddIdea from './components/owner/idea/AddIdea'
import AllIdea from './components/owner/idea/AllIdea'
import UpdateIdea from './components/owner/idea/UpdateIdea'
import ManageIdea from './components/admin/idea/ManageIdea'
import ViewCategories from './components/user/category/ViewCategories'
import ViewIdeas from './components/user/ideas/ViewIdeas'
import ManageIdeas from './components/user/ideas/ManageIdeas'
import AddInvestment from './components/user/investment/AddInvestment'
import AddPayment from './components/user/payment/AddPayment'
import ManageInvestment from './components/user/payment/ManageInvestment'
import ManageCategories from './components/owner/category/ManageCategories'
import OwnerIdea from './components/owner/category/OwnerIdea'
import ManageUsers from './components/admin/user/ManageUsers'
import AllInvestors from './components/admin/investors/AllInvestors'
// import ALLinvestments from './components/admin/investments/AllInvestments'
import ALLInvestments from './components/admin/investments/AllInvestments'
import OwnerInvestment from './components/owner/category/OwnerInvestment'
import AdminDashboard from './components/admin/AdminDashboard'
import OwnerDashboard from './components/owner/OwnerDashboard'
import CheckIdea from './components/admin/idea/CheckIdea'
import CardDashboard from './components/admin/CardDashboard';
import AllContact from './components/admin/category/AllContact';
// import './App.css'

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="book" element={<Book />} />



            <Route path="viewcategories" element={<ViewCategories />} />
            <Route path="viewideas/:id" element={<ViewIdeas />} />
            <Route path="manageideas/:id" element={<ManageIdeas />} />



            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/investorregister" element={<InvestorRegister />} />

            <Route path="investment/add/:id" element={<AddInvestment />} />
            <Route path="payment/add/:id" element={<AddPayment />} />
            <Route path="investment/manage" element={<ManageInvestment />} />



          </Route>



          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<CardDashboard />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/all" element={<AllCategory />} />
            <Route path="contact/all" element={<AllContact />} />

            <Route path="category/update/:id" element={<UpdateCategory />} />

            <Route path="idea/manage" element={<ManageIdea />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="investors/all" element={<AllInvestors />} />
            <Route path="investments" element={<ALLInvestments />} />
            <Route path="CheckIdea/:id" element={<CheckIdea />} />



          </Route>

          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<OwnerDashboard />} />

            <Route path="idea/add" element={<AddIdea />} />
            <Route path="idea/all" element={<AllIdea />} />
            <Route path="idea/update/:id" element={<UpdateIdea />} />

            <Route path="Managecategories" element={<ManageCategories />} />
            <Route path="Manageidea/:id" element={<OwnerIdea />} />


            <Route path="investments/all" element={<OwnerInvestment />} />















          </Route>




        </Routes>
      </BrowserRouter>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}


      />





    </>
  )
}

export default App
