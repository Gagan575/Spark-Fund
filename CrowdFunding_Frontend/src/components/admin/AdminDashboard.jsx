import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"


export default function AdminDashboard(){
    const [details, setDetails]=useState([])
    const fetchData=()=>{
        ApiService.dashboard(null)
         .then((res)=>{
                    console.log(res)
                    if(res.data.success){
                        setDetails(res.data)
        
                    }
                    else{
                        toast.error(res.data.message)
                    }
                })
                .catch((err)=>{
                    toast.error(err.message)
                })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(

    <>
    <div className="container-fluid bg-light py-4 my-4 mt-0">
    <div className="container text-center animated bounceInDown">
      <h1 className="display-1 mb-4"> Dashboard </h1>
      
    </div>
  </div>
    
                
            
             <div className="container-fluid py-5">
    <div className="container">
      <div className="row g-5">
        {/* <div className="col-lg-4 col-md-6">
          <div className="mb-3">
            <h6 className="text-primary text-uppercase">Land</h6>
            <h1 className="display-5">{details.totalLand}</h1>
          </div>
          
        </div> */}
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
            <i class="bi bi-person-square fa-4x mb-4 text-dark"></i>
            <h4>Owner</h4>
            <p className="mb-0 text-dark fs-4">
              {details.totalOwner}            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
           <i class="bi bi-person-check fa-4x mb-4 text-dark"></i>
            <h4>Investor</h4>
            <p className="mb-0 text-dark fs-4">
                 { details.totalInvestor}
            </p>
          </div>
        </div>


        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
           <i class=" fa-brands fa-ideal fa-4x mb-4 text-dark" ></i>
            <h4>Idea</h4>
            <p className="mb-0 text-dark fs-4">
             { details.totalIdea}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
            <i class="fa-solid fa-thumbs-up fa-4x mb-4 text-dark"></i>
            <h4>Likes</h4>
            <p className="mb-0 text-dark fs-4">
            { details.totalIdeaLikes}            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
            <i class="fas fa-comment fa-4x mb-4 text-dark"></i>
            <h4>Comments</h4>
            <p className="mb-0 text-dark fs-4">
            { details.totalIdeaComment}
            </p>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
          <i class="fa-solid fa-icons fa-4x mb-4 text-dark"></i>
            <h4>Category</h4>
            <p className="mb-0 text-dark fs-4">
                 { details.totalCategory}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
           <i class="fa-solid fa-arrow-up-right-dots fa-4x mb-4 text-dark"></i>
            <h4>Investment</h4>
            <p className="mb-0 text-dark fs-4">
              {details.totalInvestment}            </p>
          </div>
        </div>
      </div>
    </div>
  </div>



    </>
    
)
}