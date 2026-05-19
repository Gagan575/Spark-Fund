import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import MoonLoader from "react-spinners/MoonLoader"
import ApiService from "../../../services/ApiService"

export default function AddPayment() {
    

    const { id } = useParams()
    const nav = useNavigate()

    const [investment, setInvestment] = useState(null)
    const [load, setLoad] = useState(false)

    console.log("invest",id)
    // Fetch investment details
    const fetchInvestment = () => {
        setLoad(true)
        ApiService.allInvestment({ _id: id })
            .then((res) => {
                if (res.data.success && res.data.data.length > 0) {
                    console.log(res.data.data[0])
                    setInvestment(res.data.data[0])
                } else {
                    toast.error("Investment not found")
                }
            })
            .catch(err => toast.error(err.message))
            .finally(() => setLoad(false))
    }

    useEffect(() => {
        fetchInvestment()
    }, [])

    // Razorpay payment
    const handlePayment = () => {

        if (!investment) return

        const options = {
            key: "rzp_test_Q8bKRaQdmgftXW",
            amount: investment.amount * 100,
            currency: "INR",
            name: "Investment Platform",
            description: "Idea Investment",

            handler: function (response) {

                const paymentData = {
                    investmentId: investment._id,
                    amount: investment.amount,
                    paymentMethod: "online",
                    transactionId: response.razorpay_payment_id,
                    paymentStatus: "Success"
                }

                ApiService.addPayment(paymentData)
                    .then((res) => {
                        if (res.data.success) {

                            // Activate investment after payment
                            ApiService.changeStatusInvestment({
                                _id: investment._id,
                                status: "Active"
                            })

                            toast.success("Payment successful!")
                            nav("/investment/manage")
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch(err => toast.error(err.message))
            },

            prefill: {
                name: sessionStorage.getItem("name") || "Investor",
                email: sessionStorage.getItem("email") || "investor@email.com",
                contact: sessionStorage.getItem("contact") || "9999999999"
            },

            theme: { color: "#0d6efd" }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    if (load || !investment) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <MoonLoader size={50} />
            </div>
        )
    }

    return (
        <div
            className="container-fluid contact py-6 wow bounceInUp"
            data-wow-delay="0.1s"
        >
            <div className="container d-flex justify-content-center">
                <div className="p-4 bg-light rounded contact-form">
                    <div className="row g-">

                        <div className="col-12 text-center">
                            <h1 className="display-5 mb-4">Investment Payment</h1>
                        </div>

                        <div className="col-md-12 mb-3">
                            <label className="form-label">Investment Amount</label>
                            <input
                                type="number"
                                className="form-control p-3 border-primary bg-light"
                                value={investment.amount}
                                disabled
                            />
                        </div>

                        <button
                            className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                            onClick={handlePayment}
                        >
                            Pay with Razorpay
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
