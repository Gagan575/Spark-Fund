import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import ReadMore from "../../pages/ReadMore"
import { ClipLoader } from "react-spinners"


export default function ManageIdea() {
    const [idea, setIdea] = useState([])
    const [previewVideo, setPreviewVideo] = useState(null);

    const userId = sessionStorage.getItem("userId")

    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        setLoading(true)

        const data = {

        }
        ApiService.allIdea(data)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setIdea(res.data.data)


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


    const statuses = ["Pending", "Rejected", "Approved", "Funded"]


    const changeStatus = (id, newStatus) => {

        Swal.fire({
            title: "Are you sure?",
            text: `Change status to "${newStatus}"?`,
            icon: "warning",
             confirmButtonColor:"#d4a762 ",
              cancelButtonColor: "#d33",
            showCancelButton: true,
            confirmButtonText: "Yes, update"
        }).then((result) => {
            if (result.isConfirmed) {
                ApiService.changeStatusIdea({
                    _id: id,
                    status: newStatus
                })
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
             confirmButtonColor:"#d4a762 ",

                                icon: "success"
                            })
                            
                            fetchData()
                        }
                    })
                    .catch((err) => toast.error(err.message))
            }
        })
    }


    const deleteIdea = (id) => {
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
                ApiService.DeleteIdea(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                // text: "Your file has been deleted.",
                                 confirmButtonColor:"#d4a762 ",
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
                    <h1 className="display-1 mb-4">All Ideas</h1>
                    <ol className="breadcrumb justify-content-center mb-0 ">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>

                        <li className="breadcrumb-item text-dark" aria-current="page">
                            All Ideas
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
            <div className="container">
                <div className="row">
                    <div className="col">
                        {idea.length > 0 ? (
                            <div className="table-responsive">
                               <div className="table-responsive admin-table">
  <table className="table align-middle mb-0">
    <thead>
      <tr>
        <th>#</th>
        <th>Owner</th>
        <th>Title</th>
        <th>Category</th>
        <th>Description</th>
        {/* <th>Pitch</th> */}
        <th>Status</th>
        <th className="text-end">Actions</th>
      </tr>
    </thead>

    <tbody>
      {idea.map((el, index) => (
        <tr key={el._id}>
          <td>{index + 1}</td>

          <td>
            <div className="fw-semibold">{el?.ownerId?.name}</div>
          </td>

          <td className="text-truncate" style={{ maxWidth: 180 }}>
            {el?.title}
          </td>

          <td>
            <span className="badge bg-light text-dark">
              {el?.categoryId?.categoryName}
            </span>
          </td>

          <td style={{ maxWidth: 220 }}>
            <ReadMore text={el.description} limit={20} />
          </td>

          {/* <td className="text-center">
            {el?.pitchVideoUrl ? (
              <video
                src={el.pitchVideoUrl}
                muted
                preload="metadata"
                className="table-video"
                onClick={() => setPreviewVideo(el.pitchVideoUrl)}
              />
            ) : (
              <span className="text-muted">—</span>
            )}
          </td> */}

          <td>
            <span className={`status-badge ${el.status.toLowerCase()}`}>
              {el.status}
            </span>
          </td>

          <td className="text-end">
            <select
              className="form-select form-select-sm d-inline w-auto me-2"
              value={el.status}
              onChange={(e) => changeStatus(el._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Funded">Funded</option>
            </select>

            <Link
              to={`/admin/CheckIdea/${el._id}`}
              className="btn btn-sm btn-outline-primary"
            >
              <i className="bi bi-eye"></i>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No idea available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {previewVideo && (
                <div
                    onClick={() => setPreviewVideo(null)} // click outside closes
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
                    <video
                        src={previewVideo}
                        controls
                        autoPlay
                        onClick={(e) => e.stopPropagation()} // clicking video does not close
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