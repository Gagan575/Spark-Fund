import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"

export default function ALLInvestments() {
    // const investorId = sessionStorage.getItem("userId")

    const [investments, setInvestments] = useState([])
    
    const [loading, setLoading] = useState(false)










    const fetchData = () => {
        setLoading(true)

        ApiService.allInvestment()
            .then(res => {
                if (res.data.success) {
                    setInvestments(res.data.data || [])
                    console.log(res);
                    
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err => toast.error(err.message))
           
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    

    // const filteredMatchApplications =
    //     selectedSport === "All"
    //         ? matchApplication
    //         : matchApplication.filter(
    //             (el) => el?.sportsId?._id === selectedSport
    //         );





    const changeStatus = (id, oldStatus, newStatus) => {

        if (oldStatus === newStatus) return

        Swal.fire({
            title: "Are you sure?",
            text: `Change status to "${newStatus}"?`,
            icon: "warning",
             confirmButtonColor:"#d4a762 ",
            showCancelButton: true,
            confirmButtonText: "Yes, update"
        }).then((result) => {

            if (!result.isConfirmed) {
                fetchData() // rollback UI
                return
            }

            ApiService.changeStatusInvestment({
                _id: id,
                status: newStatus
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


    const deleteInvestment = (id) => {
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
                ApiService.DeleteInvestment(data)
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
    <div className="container text-center">
      <h1 className="display-1 mb-4"> All Investments </h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item">
          <a href="/admin">Home</a>
        </li>
       
        <li className="breadcrumb-item text-dark" aria-current="page">
          Investments
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




            {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h1 className="display-1 text-white mb-md-4">All teams</h1>
                                    <Link to="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                                        Home
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div> */}
           

            <div className="container py-2">
                <div className="row">
                    <div className="col">
                        {investments.length > 0 ? (
                            <div className="table-responsive admin-table">
                                < table className="table align-middle mb-0  ">
                                    <thead >
                                        <tr>
                                            <th >Sno</th>
                                            <th >Investor Name</th>

                                            <th >Idea Owner Name</th>
                                            <th >Amount</th>
                                            <th >equityPercent</th>





                                            <th >Status</th>
                                            <th className="text-end" >Actions</th>



                                        </tr>
                                    </thead>
                                    <tbody>

                                        {investments?.map((el, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td >
                                                     <div className="fw-semibold">{el?.investorId?.name}</div>
                                                </td>
                                                <td className="text-truncate" style={{ maxWidth: 180 }}>{el?.ideaId?.ownerId?.name}
                                                </td>
                                                <td className=" bg-light text-dark">₹{el?.amount}
                                                   
                                                </td>
                                                <td className=" bg-light text-dark"> {el?.equityPercent} %
                                                    
                                                </td>



                                                {/* <td className="hover-bg text-center">
                                                        {el?.logo ? (
                                                            <img
                                                                onClick={() => setPreviewImage(el.logo)}
                                                                src={el.logo}
                                                                alt="logo"
                                                                width="70"
                                                                height="55"
                                                                style={{
                                                                    objectFit: "cover",
                                                                    borderRadius: "4px",
                                                                    border: "1px solid #ddd"
                                                                }}
                                                            />
                                                        ) : (
                                                            <span>No Image</span>
                                                        )}
                                                    </td> */}

                                                    <td>
            <span className={`status-badge ${el.status.toLowerCase()}`}>
              {el.status}
            </span>
          </td>

                                                

                                        <td className="text-end">
            {/* <select
              className="form-select form-select-sm d-inline w-auto me-2"
              value={el.status}
              onChange={(e) => changeStatus(el._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Refunded">Refunded</option>
              <option value="Frozen">Frozen</option>
            </select> */}



                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => { deleteInvestment(el?._id) }}><i class="bi bi-trash-fill"></i></button>
                                                    {/* <Link to={`/coach/matchapplication/update/${el._id}`} className="btn btn-success mx-2"> <i class="bi bi-pencil-fill"></i></Link> */}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Investment available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>



        </>
    )
}