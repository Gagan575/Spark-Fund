import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"


export default function AllInvestors() {
    const [investors, setInvestors] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false)




    const fetchData = () => {
        setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allInvestor()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setInvestors(res.data.data)


                }
                else {
                    toast.error(res.data.essage)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])


     const changeStatus = (id, oldStatus, newStatus) => {
    
            if (oldStatus === newStatus) return
    
            Swal.fire({
                title: "Are you sure?",
                text: `Change status to "${newStatus}"?`,
                icon: "warning",
                 confirmButtonColor:"#d4a762 ",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update"
            }).then((result) => {
    
                if (!result.isConfirmed) {
                    fetchData() // rollback UI
                    return
                }
    
                ApiService.changeStatusInvestor({
                    _id: id,
                    kycStatus: newStatus
                })
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire("Updated!", res.data.message, "success", confirmButtonColor,"#d4a762 ",)
                            fetchData()
                        }
                    })
                    .catch(() => fetchData()) // rollback on error
            })
        }

    const deleteInvestors = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
           confirmButtonColor:"#d4a762 ",
            cancelButtonColor: "#d33",
            confirmButtonText: `${!id ? "Enable" : "Delete"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,

                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.DeleteInvestor(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                 confirmButtonColor:"#d4a762 ",
                                // text: "Your file has been deleted.",
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })


    }


    return (
        <>
       

<div className="container-fluid  py-4 my-4 mt-0">
    <div className="container text-center ">
      <h1 className="display-1 mb-4">All Investors</h1>
      <ol className="breadcrumb justify-content-center mb-0 ">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        
        <li className="breadcrumb-item text-dark" aria-current="page">
          All Investors
        </li>
      </ol>
    </div>
  </div>
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


           

            <div className="container py-2">
                <div className="row">
                    <div className="col">
                        {investors.length > 0 ? (
                            <div className="table-responsive admin-table">
  <table className="table align-middle mb-0">
    <thead>
      <tr>
        <th>#</th>
        <th>Investor</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Country</th>
        <th>Risk</th>
        <th>KYC</th>
        <th className="text-end">Actions</th>
      </tr>
    </thead>

    <tbody>
      {investors?.map((el, index) => (
        <tr key={el._id}>
          <td>{index + 1}</td>

          {/* Avatar + Name */}
          <td>
  <div className="d-flex align-items-center gap-2 table-user">
    <img
      src={el?.userId?.profileImage || "/avatar.png"}
      alt="logo"
      className="table-logo"
      onClick={() => setPreviewImage(el?.userId?.profileImage)}
    />
    <span className="fw-semibold text-dark">
      {el?.userId?.name}
    </span>
  </div>
</td>

          <td className="text-muted">{el?.userId?.email}</td>

          <td>{el?.userId?.contact}</td>

          <td>
            <span className="badge bg-light text-dark">
              {el?.country}
            </span>
          </td>

          <td>
            <span className="badge bg-secondary">
              {el?.riskPreference}
            </span>
          </td>

          {/* KYC Status */}
          <td>
            <span className={`status-badge ${el.kycStatus.toLowerCase()}`}>
              {el.kycStatus}
            </span>
          </td>

          {/* Actions */}
          <td className="text-end">
            <select
              className="form-select form-select-sm d-inline w-auto me-2"
              value={el.kycStatus}
              onChange={(e) =>
                changeStatus(el._id, el.kycStatus, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => deleteInvestors(el?._id)}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Investors available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)} // click outside closes
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                >
                    <img
                        src={previewImage}
                        alt="Preview"
                        onClick={(e) => e.stopPropagation()} // clicking image does not close
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "6px",
                            boxShadow: "0 0 10px #000"
                        }}
                    />
                </div>
            )}



        </>
    )
}