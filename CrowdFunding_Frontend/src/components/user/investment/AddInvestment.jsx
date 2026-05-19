import axios from "axios"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"

export default function AddInvestment() {
    const { id } = useParams()
    const { state } = useLocation();
    const idea = state?.idea;
  const suggestion = state?.suggestion;

  

    const investorId = sessionStorage.getItem("userId")
    const [investorStatus, setInvestorStatus] = useState(null)


    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [ideas, setIdeas] = useState([])
    const sanitizeAmount = (value) => {
  if (!value) return "";
  return Number(
    value
      .toString()
      .replace(/[^0-9.]/g, "") // removes ₹ , INR etc
  );
};


    const fetchData = () => {
        ApiService.allIdea({ kycStatus: "Verified" })
            .then((res) => {
                if (res.data.success) {
                    setIdeas(res.data.data)
                }
            })
            .catch(err => toast.error(err.message))

        ApiService.singleInvestor({userId:investorId})
            .then((res) => {
                if (res.data.success) {
                    setInvestorStatus(res.data.data.kycStatus) // "Approved", "Pending", etc.
                }
            })
            .catch(() => {
                toast.error("Unable to verify investor status")
            })


    }

    useEffect(() => {
        fetchData()

        if (suggestion) {
    reset({
      amount: sanitizeAmount(suggestion.amount),
      equityPercent: suggestion.equityPercent
    });
  }
}, [suggestion, reset])

    const handleForm = (data) => {
        if (investorStatus !== "Verified") {
            toast.error("Your investor account is not approved yet")
            return
        }

        setload(true)

        // const formData = new FormData()
        // formData.append("investorId", investorId)
        // formData.append("ideaId", data.ideaId)
        // formData.append("amount", data.amount)
        // formData.append("equityPercent", data.equityPercent)
        // formData.append("status", "Active")
        data.investorId = investorId
        data.ideaId = id

        ApiService.addInvestment(data)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    toast.success(res.data.message)
                    const investmentId = res.data.data._id
                    nav(`/payment/add/${investmentId}`)

                } else {
                    setload(false)
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                setload(false)
                toast.error(
                    err.response?.data?.message ||
                    err.message ||
                    "Something went wrong"
                )
            })
    }

    const handleError = (errors) => {
        setload(false)
        console.log("Form Errors:", errors)
        toast.error("Please fill all required fields")
    }

    return (
        <>
            {
                load ?
                    (
                        <div style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(255,255,255,0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 9999
                        }}>
                            <div style={{ transform: "translateY(-40px)" }}>
                                <MoonLoader size={50} />
                            </div>
                        </div>
                    )
                    :
                    <div
                        className="container-fluid contact py-6 wow bounceInUp"
                        data-wow-delay="0.1s"
                    >
                        <div className="container d-flex justify-content-center">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-">
                                    <div className="col-12 text-center">
                                        <h1 className="display-5 mb-0">Add Investment</h1>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <form onSubmit={handleSubmit(handleForm, handleError)}>

                                            {/* Idea */}
                                            {/* <div className="col-md-12">
                                                <div className="form-group">
                                                    <select
                                                        className="form-select border-primary p-2 mb-4"
                                                        {...register("ideaId", {
                                                            required: "Idea is required"
                                                        })}
                                                    >
                                                        <option value="">Select Idea</option>
                                                        {ideas.map((el) => (
                                                            <option key={el._id} value={el._id}>
                                                                {el.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div> */}

                                            {/* Amount */}
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        min={1}
                                                        type="number"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Investment Amount"
                                                        style={{ height: 55 }}
                                                        {...register("amount", {
                                                            required: "amount is required",
                                                            valueAsNumber: true
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Equity */}
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                    min={1}
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Equity Percentage"
                                                        style={{ height: 55 }}
                                                        {...register("equityPercent", {
                                                            required: "equityPercent is required"
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                disabled={investorStatus !== "Verified"}
                                                className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                                                type="submit"
                                            >
                                                {investorStatus === "Verified"
                                                    ? "Add Investment"
                                                    : "Investor Not Verified"}
                                            </button>


                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
