import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import ReactSwitch from "react-switch"
import ReadMore from "../../pages/ReadMore"
import { ClipLoader } from "react-spinners"

export default function AllCategory() {

    const [category, setCategory] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [loading, setLoading] = useState(false) // ✅ Added loader

    const fetchData = () => {
        setLoading(true)
        ApiService.allCategory()
            .then((res) => {
                if (res.data.success) {
                    setCategory(res.data.data)
                } else {
                    toast.error(res.data.message)
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

    const changeStatus = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be able to revert this!",
            icon: "warning",
            confirmButtonColor:"#d4a762 ",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            confirmButtonText: status ? "Deactivate" : "Activate"
        }).then((result) => {
            if (result.isConfirmed) {

                setLoading(true)

                let data = {
                    _id: id,
                    status: !status
                }

                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }

                ApiService.changeStatusCategory(data, headers)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                  confirmButtonColor:"#d4a762 ",
                                  cancelButtonColor: "#d33",
                                icon: "success"
                            })
                            fetchData()
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        })
    }

    const deleteCategory = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {

                setLoading(true)

                let data = { _id: id }
                let token = sessionStorage.getItem("token")
                let headers = { Authorization: token }

                ApiService.DeleteCategory(data, headers)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                icon: "success"
                            })
                            fetchData()
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        })
    }

    return (
        <>
            {/* ✅ LOADER OVERLAY (does not change layout) */}


            {/* ---- YOUR ORIGINAL JSX BELOW (UNCHANGED) ---- */}

            <div className="container-fluid  py-4 my-4 mt-0">
                <div className="container text-center">
                    <h1 className="display-1 mb-4"> All Categories </h1>
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
                        {category.length > 0 ? (
                            <div className="table-responsive admin-table">
                                <table className="table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th>Description</th>

                                            <th>Status</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {category.map((el, index) => (
                                            <tr key={el._id}>
                                                <td>{index + 1}</td>

                                                {/* Category Name */}
                                                <td>
                                                    {el?.image ? (
                                                        <img
                                                            src={el.image}
                                                            alt="category"
                                                            className="table-logo me-3"
                                                            onClick={() => setPreviewImage(el.image)}
                                                            style={{
                                                                width: "55px",
                                                                height: "45px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-muted">No Image</span>
                                                    )}
                                                    <span className="fw-semibold text-dark">
                                                        {el?.categoryName}
                                                    </span>
                                                </td>

                                                {/* Description */}
                                                <td style={{ maxWidth: "250px" }}>
                                                    <ReadMore
                                                        text={el?.description}
                                                        limit={20}
                                                        className="text-muted mb-0"
                                                    />
                                                </td>

                                                {/* Image */}


                                                {/* Status Badge */}
                                                <td>
                                                    <span
                                                        className={`status-badge ${el?.status ? "approved" : "rejected"
                                                            }`}
                                                    >
                                                        {el?.status ? "Active" : "Inactive"}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="text-end">
                                                    <div className="d-inline-flex align-items-center gap-2 table-actions ">

                                                        <ReactSwitch
                                                            checked={el?.status}
                                                            onChange={() =>
                                                                changeStatus(el?._id, el?.status)
                                                            }
                                                            height={18}
                                                            width={38}
                                                            handleDiameter={16}
                                                            uncheckedIcon={false}
                                                            checkedIcon={false}
                                                            offColor="#dee2e6"
                                                            onColor="#198754"
                                                        />

                                                        <Link
                                                            to={`/admin/category/update/${el._id}`}
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            <i className="bi bi-pencil-fill"></i>
                                                        </Link>

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => deleteCategory(el?._id)}
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
                                <h4 className="text-muted">No category available</h4>
                                <p>Please check back later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)}
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
                        onClick={(e) => e.stopPropagation()}
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