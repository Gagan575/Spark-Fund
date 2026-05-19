import { useState } from "react"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader, MoonLoader } from "react-spinners"

export default function Login() {



  let nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [load, setload] = useState(false)

  const changeEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)

  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleForm = (e) => {
    setload(true)
    e.preventDefault()
    let data = {
      email: email,
      password: password,

    }
    ApiService.login(data)
      .then((res) => {
        console.log(res);
        

        if (res.data.success) {


          if (res.data.data.status === false) {
            toast.error("Your account is inactive. Please contact admin.");
            return;
          }
          toast.success(res.data.message)

          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("name", res.data.data.name)
          sessionStorage.setItem("email", res.data.data.email)
          sessionStorage.setItem("role", res.data.data.role)
          sessionStorage.setItem("userId", res.data.data._id)
          if (res.data.data.role == "admin") {
            nav("/admin")
          }
          else if (res.data.data.role == "owner") {
            nav("/owner")
          }
          else {
            nav("/")
          }

          setload(false)
        } else {
          setload(false)
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        setload(false)
        toast.error(err.message)
      })

  }


  return (
    <>
      {
        load ?
         (
                    <div style={{
                        minHeight: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <ClipLoader color="#000" size={50} />
                    </div>
                )

          
          :
          <div
            className="container-fluid contact py-6 wow bounceInUp"
            data-wow-delay="0.1s"
          >
            <div className="container d-flex justify-content-center">
              <div className="p-4 bg-light rounded contact-form">
                <div className="row g-  ">
                  <div className="col-12 text-center">

                    <h1 className="display-5 mb-0">Login</h1>
                  </div>
                  <div className="col-12 mt-4 ">

                    <form action="" method="POST" onSubmit={handleForm}>

                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            required
                            onChange={changeEmail}
                            type="email"
                            className="w-100 form-control p-3 mb-4 border-primary bg-light"
                            placeholder="Your Email"
                            style={{ height: 55 }}
                          />

                        </div>
                      </div>


                      <div className="col-12">
                        <div className="form-group">
                          <input
                            required
                            onChange={changePassword}
                            type="password"
                            className="w-100 form-control p-3 mb-4 border-primary bg-light"
                            placeholder="Your Password"
                            style={{ height: 55 }}
                          />
                        </div>
                      </div>




                      <button
                        className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                        type="submit"
                      >
                        Login
                      </button>
                      <p className="text-center mt-2"><Link to="/register"  >Signup as Owner </Link>| <Link to="/investorregister">Investor</Link></p>

                    </form>
                  </div>

                </div>
              </div>
            </div >
          </div >
      }
    </>
  )
}
