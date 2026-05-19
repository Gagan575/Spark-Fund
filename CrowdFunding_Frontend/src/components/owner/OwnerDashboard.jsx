import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService";


export default function OwnerDashboard(){
    const [details, setDetails]=useState([])
   const id = sessionStorage.getItem("userId");
    const fetchData=()=>{
      const data = {
            ownerId: id,
            
        };
      
        ApiService.dashboard(data)
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
        


        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
           <i class=" fa-brands fa-ideal fa-4x mb-4 text-dark" ></i>
            <h4>Idea</h4>
            <p className="mb-0 text-dark fs-4">
             { details.totalOwnerIdea}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
            <i class="fa-solid fa-thumbs-up fa-4x mb-4 text-dark"></i>
            <h4>Likes</h4>
            <p className="mb-0 text-dark fs-4">
            { details.totalOwnerIdeaLikes}            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
            <i class="fas fa-comment fa-4x mb-4 text-dark"></i>
            <h4>Comments</h4>
            <p className="mb-0 text-dark fs-4">
            { details.totalOwnerIdeaComment}
            </p>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item bg-primary rounded p-4 text-center">
          <i class="fa-solid fa-icons fa-4x mb-4 text-dark"></i>
            <h4>Total Category</h4>
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
              {details.totalOwnerInvestment}            </p>
          </div>
        </div>
      </div>
    </div>
  </div>



    </>
    
)
}