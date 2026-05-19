import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

export default function ManageInvestment() {

    const investorId = sessionStorage.getItem("userId")

    const [investments, setInvestments] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchInvestments = () => {
        setLoading(true)

        ApiService.allInvestment({ investorId })
            .then(res => {
                if (res.data.success) {
                    setInvestments(res.data.data || [])
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err => toast.error(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchInvestments()
    }, [])

    return (
        <>
            {/* Hero */}
            <div className="container-fluid  py-3 mt-0">
                <div className="container text-center ">
                    <h1 className="display-1 mb-4">Investments</h1>
                    <ol className="breadcrumb justify-content-center mb-0 ">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item text-dark">Investments</li>
                    </ol>
                </div>
            </div>

            {/* Investment Cards */}
            <div className="container py-6 d-flex flex-column align-items-center">

                {loading && (
                    <div style={{
                        minHeight: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <ClipLoader color="#000" size={50} />
                    </div>
                )}

                {!loading && investments.length > 0 ? (
                    investments.map((inv, index) => {

                        const idea = inv.ideaId || {}

                        return (
                            <div
                                key={index}
                                className="row align-items-center mb-5 shadow overflow-hidden"
                                style={{
                                    background: "#fff",
                                   
                                    width: "100%",
                                    borderRadius: "14px",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                }}
                            >
                                <div className="col-md-12 p-4">

                                    <h4 className="fw-bold mb-1 text-dark">
                                        {idea.title || "Idea Title"}
                                    </h4>

                                    <small className=" d-block mb-2 text-dark">
                                        {idea.description}
                                    </small>

                                    {/* STATS */}
                                    <div className="d-flex gap-2 my-3">
                                        <div className="border rounded p-2 text-center flex-fill">
                                            <div className="text-primary fw-bold small">
                                                Invested
                                            </div>
                                            <div className="fw-bold text-dark">
                                                ₹ {inv.amount}
                                            </div>
                                        </div>

                                        <div className="border rounded p-2 text-center flex-fill">
                                            <div className="text-success fw-bold small">
                                                Equity
                                            </div>
                                            <div className="fw-bold text-dark">
                                                {inv.equityPercent} %
                                            </div>
                                        </div>

                                        <div className="border rounded p-2 text-center flex-fill">
                                            <div className="text-warning fw-bold small">
                                                Status
                                            </div>
                                            <div className="fw-bold text-dark">
                                                {inv.status}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <small className="text-muted">
                                            Invested On:{" "}
                                            {new Date(inv.createdAt).toLocaleDateString()}
                                        </small>

                                        {
                                            inv.status === "Pending" ?
                                                <Link
                                                    to={`/payment/add/${inv._id}`}
                                                    className="w-25 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                                                >
                                                    Pay
                                                </Link>
                                                :
                                                <p className="w-25 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill">
                                                    Paid
                                                </p>
                                        }
                                    </div>

                                </div>
                            </div>
                        )
                    })
                ) : !loading && (
                    <div className="text-center">
                        <h4 className="text-muted">No Investments Found</h4>
                        <p>You haven’t invested in any ideas yet.</p>
                    </div>
                )}
            </div>
        </>
    )
}