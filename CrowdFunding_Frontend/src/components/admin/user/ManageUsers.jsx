import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader } from "react-spinners"

export default function ManageUsers() {
    const [user, setUser] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false)



    const fetchData = () => {
          setLoading(true)

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allUser({role:"owner"})
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setUser(res.data.data)


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



    const softDelete = (id, status) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You will be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor:"#d4a762 ",
                cancelButtonColor: "#d33",
                confirmButtonText: status === "Active" ? "Deactivate" : "Activate"
            }).then((result) => {
                if (result.isConfirmed) {
                    let data = {
                        _id: id,
    
                    }
                    let token = sessionStorage.getItem("token")
                    let headers = {
                        Authorization: token
                    }
                    ApiService.softDeleteUser(data)
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


    

    const deleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
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
                ApiService.Deleteuser(data)
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
      <h1 className="display-1 mb-4">Idea Owners</h1>
      <ol className="breadcrumb justify-content-center mb-0 ">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
     
        <li className="breadcrumb-item text-dark" aria-current="page">
      Idea Owners
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
           
            <div className="container py-4">
                <div className="row">
                    <div className="col">
                        {user.length > 0 ? (
                           <div className="table-responsive admin-table">
  <table className="table align-middle mb-0">
    <thead>
      <tr>
        <th>#</th>
        <th>Owner</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Status</th>
        <th className="text-end">Actions</th>
      </tr>
    </thead>

    <tbody>
      {user.map((el, index) => (
        <tr key={el._id}>
          <td>{index + 1}</td>

          {/* Logo-style Image + Name */}
          <td>
            <div className="d-flex align-items-center gap-2 table-user">
              <img
                src={el?.profileImage || "/avatar.png"}
                alt="logo"
                className="table-logo"
                onClick={() => setPreviewImage(el?.profileImage)}
              />
              <span className="fw-semibold text-dark">
                {el?.name}
              </span>
            </div>
          </td>

          <td className="text-muted">{el?.email}</td>

          <td>{el?.contact}</td>

          {/* Status */}
          <td>
            <span
              className={`status-badge ${
                el?.status === "Active" ? "approved" : "rejected"
              }`}
            >
              {el?.status === "Active" ? "Active" : "Inactive"}
            </span>
          </td>

          {/* Actions */}
        <td className="text-end">
  <div className="d-inline-flex align-items-center gap-2 table-actions">
    <ReactSwitch
      checked={el?.status === "Active"}
      onChange={() => softDelete(el?._id, el?.status)}
      height={18}
      width={38}
      handleDiameter={16}
      uncheckedIcon={false}
      checkedIcon={false}
      offColor="#dee2e6"
      onColor="#198754"
    />

    <button
      className="btn btn-sm btn-outline-primary"
      onClick={() => deleteUser(el?._id)}
    >
      <i className="bi bi-trash-fill"></i>
    </button>
  </div>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Idea Owners available
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