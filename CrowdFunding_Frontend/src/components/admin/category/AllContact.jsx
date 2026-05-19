import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import ReactSwitch from "react-switch"
import { ClipLoader } from "react-spinners"

export default function AllContact() {

  const [contact, setContact] = useState([])
  const [loading, setLoading] = useState(false)

  // ================= FETCH DATA =================
  const fetchData = () => {
    setLoading(true)

    ApiService.allContact()
      .then((res) => {
        if (res.data.success) {
          setContact(res.data.data)
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

  // ================= CHANGE STATUS =================
  const changeStatus = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can revert this later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:"#d4a762 ",
            cancelButtonColor: "#d33",
      confirmButtonText: status ? "Mark Pending" : "Mark Resolved"
    }).then((result) => {
      if (result.isConfirmed) {

        let data = {
          _id: id,
          status: !status
        }

        let token = sessionStorage.getItem("token")
        let headers = { Authorization: token }

        ApiService.softDeleteContact(data, headers)
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
      }
    })
  }

  // ================= DELETE CONTACT =================
  const deleteContact = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {

        let data = { _id: id }
        let token = sessionStorage.getItem("token")
        let headers = { Authorization: token }

        ApiService.deleteContact(data, headers)
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
      }
    })
  }

  return (
    <>
      {/* HEADER */}
      <div className="container-fluid  py-4 my-4 mt-0">
        <div className="container text-center">
          <h1 className="display-5 mb-4">All Contact Queries</h1>
        </div>
      </div>

      {/* LOADER */}
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

      {/* TABLE */}
      <div className="container py-4">
        <div className="row">
          <div className="col">

            {contact.length > 0 ? (
              <div className="table-responsive admin-table">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th style={{ maxWidth: "300px" }}>Message</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contact.map((el, index) => (
                      <tr key={el._id}>
                        <td>{index + 1}</td>

                        <td>
                          <span className="fw-semibold text-dark">
                            {el?.name}
                          </span>
                        </td>

                        <td className="text-muted">
                          {el?.email}
                        </td>

                        <td style={{ maxWidth: "300px" }}>
                          <div className="text-muted">
                            {el?.message?.length > 60
                              ? el?.message.substring(0, 60) + "..."
                              : el?.message}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              el?.status ? "approved" : "rejected"
                            }`}
                          >
                            {el?.status ? "Resolved" : "Pending"}
                          </span>
                        </td>

                        <td className="text-end">
                          <div className="d-inline-flex align-items-center gap-2 table-actions">

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

                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => deleteContact(el?._id)}
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
                  No Contact Queries Available
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