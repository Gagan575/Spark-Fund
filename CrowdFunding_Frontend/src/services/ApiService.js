import axios from "axios"
const BASEURL="http://localhost:5000"

class ApiServices{
    getToken(){
        let token=sessionStorage.getItem("token")
        let headers={
                Authorization:token
            }
        return headers
    }

    login(data){
        return axios.post(BASEURL+"/api/user/login", data,{headers:this.getToken()})
    }
    softDeleteUser(data){
        return axios.post(BASEURL+"/admin/user/softDelete", data, {headers:this.getToken()})
    }
    register(data){
        return axios.post(BASEURL+"/api/user/register", data)
    }
    investorregister(data){
        return axios.post(BASEURL+"/api/investor/register", data)
    }
    allUser(data){
        return axios.post(BASEURL+"/api/user/all",data )
    }
    addCategory(data){
        return axios.post(BASEURL+"/admin/category/add", data,{headers:this.getToken()})
    }
    allCategory(data){
        return axios.post(BASEURL+"/api/category/all",data )
    }
    changeStatusCategory(data){
        return axios.post(BASEURL+"/admin/category/changeStatus", data, {headers:this.getToken()})
    }
    singleCategory(data){
        return axios.post(BASEURL+"/api/category/single",data)
    }
    updateCategory(data){
        return axios.post(BASEURL+"/admin/category/update",data,{headers:this.getToken()})
    }
    DeleteCategory(data){
        return axios.post(BASEURL+"/admin/category/delete",data,{headers:this.getToken()})
    }
    addIdea(data){
        return axios.post(BASEURL+"/owner/idea/add", data,{headers:this.getToken()})
    }
    allIdea(data){
        return axios.post(BASEURL+"/api/idea/all", data,{headers:this.getToken()})
    }
    changeStatusIdea(data){
        return axios.post(BASEURL+"/admin/idea/changeStatus", data, {headers:this.getToken()})
    }
    singleIdea(data){
        return axios.post(BASEURL+"/api/idea/single",data)
    }
    updateIdea(data){
        return axios.post(BASEURL+"/owner/idea/update",data,{headers:this.getToken()})
    }
    DeleteIdea(data){
        return axios.post(BASEURL+"/owner/idea/delete",data,{headers:this.getToken()})
    }
    DeleteIdeaMedia(data){
        return axios.post(BASEURL+"/owner/ideaMedia/delete",data,{headers:this.getToken()})
    }


    addIdeaMedia(data){
        return axios.post(BASEURL+"/owner/ideaMedia/add", data,{headers:this.getToken()})
    }
    updateIdeaMedia(data){
        return axios.post(BASEURL+"/owner/ideaMedia/update", data,{headers:this.getToken()})
    }
    allIdeaMedia(data){
        return axios.post(BASEURL+"/api/ideaMedia/all", data,{headers:this.getToken()})
    }
     addLikes(data){
        return axios.post(BASEURL+"/investor/ideaLikes/add", data,{headers:this.getToken()})
    }
    addComments(data){
        return axios.post(BASEURL+"/investor/ideaComment/add", data,{headers:this.getToken()})
    }
     allLikes(data){
        return axios.post(BASEURL+"/api/ideaLikes/all", data,{headers:this.getToken()})
    }
    allComments(data){
        return axios.post(BASEURL+"/api/ideaComment/all", data,{headers:this.getToken()})
    }
    addInvestment(data){
        return axios.post(BASEURL+"/investor/investment/add", data,{headers:this.getToken()})
    }
    allInvestment(data){
        return axios.post(BASEURL+"/api/investment/all", data,{headers:this.getToken()})
    }
   updateInvestment(data){
        return axios.post(BASEURL+"/investor/investment/all", data,{headers:this.getToken()})
    }
    changeStatusInvestment(data){
        return axios.post(BASEURL+"/investor/investment/changeStatus", data,{headers:this.getToken()})
    }
    addPayment(data){
        return axios.post(BASEURL+"/investor/payment/add", data,{headers:this.getToken()})
    }
    
    allInvestor(data){
        return axios.post(BASEURL+"/api/investor/all", data,{headers:this.getToken()})
    }
    changeStatusInvestor(data){
        return axios.post(BASEURL+"/admin/investor/changeStatus", data, {headers:this.getToken()})
    }
    singleInvestor(data){
        return axios.post(BASEURL+"/api/investor/single",data)
    }
    updateInvestor(data){
        return axios.post(BASEURL+"/admin/investor/update",data,{headers:this.getToken()})
    }
    DeleteInvestor(data){
        return axios.post(BASEURL+"/admin/investor/delete",data,{headers:this.getToken()})
    }
    addBooking(data){
        return axios.post(BASEURL+"/user/booking/add", data,{headers:this.getToken()})
    }
    allBooking(data){
        return axios.post(BASEURL+"/api/booking/all", data,{headers:this.getToken()})
    }
    changeStatusBooking(data){
        return axios.post(BASEURL+"/admin/booking/changeStatus", data, {headers:this.getToken()})
    }
    singleBooking(data){
        return axios.post(BASEURL+"/api/booking/single",data)
    }
    updateBooking(data){
        return axios.post(BASEURL+"/user/user/booking/update",data,{headers:this.getToken()})
    }
    DeleteBooking(data){
        return axios.post(BASEURL+"/farmer/booking/delete",data,{headers:this.getToken()})
    }

    addMatchApplication(data){
        return axios.post(BASEURL+"owner/matchapplication/add", data,{headers:this.getToken()})
    }
    
    
    singleInvestment(data){
        return axios.post(BASEURL+"/api/investment/single",data)
    }
    updateInvestment(data){
        return axios.post(BASEURL+"admin/investment/update",data,{headers:this.getToken()})
    }
    DeleteInvestment(data){
        return axios.post(BASEURL+"/admin/investment/delete",data,{headers:this.getToken()})
    }
    addMatch(data){
        return axios.post(BASEURL+"/admin/match/add", data,{headers:this.getToken()})
    }
    allMatch(data){
        return axios.post(BASEURL+"/api/match/all", data,{headers:this.getToken()})
    }
    changeStatusMatch(data){
        return axios.post(BASEURL+"/admin/match/changeStatus", data, {headers:this.getToken()})
    }
    singleMatch(data){
        return axios.post(BASEURL+"/api/match/single",data)
    }
    updateMatch(data){
        return axios.post(BASEURL+"/admin/match/update",data,{headers:this.getToken()})
    }
    DeleteMatch(data){
        return axios.post(BASEURL+"/admin/match/delete",data,{headers:this.getToken()})
    }
    dashboard(data){
        return axios.post(BASEURL+"/api/dashboard",data)
    }

    addAnnouncment(data){
        return axios.post(BASEURL+"/admin/announcment/add", data,{headers:this.getToken()})
    }
    allAnnouncment(data){
        return axios.post(BASEURL+"/api/announcment/all", data,{headers:this.getToken()})
    }
    changeStatusAnnouncment(data){
        return axios.post(BASEURL+"/admin/announcment/changeStatus", data,{headers:this.getToken()})
    }
    singleAnnouncment(data){
        return axios.post(BASEURL+"/api/announcment/single", data,{headers:this.getToken()})
    }
    updateAnnouncment(data){
        return axios.post(BASEURL+"/admin/announcment/update", data,{headers:this.getToken()})
    }
    

//     getGeminiCropSuggestion(data) {
//     return axios.post(
//       BASEURL + "/gemini/suggest",
//       data,
//        // optional auth
//     );
//   }
   getIdeaAIScore = (data) => {
  return axios.post(BASEURL+"/ai/idea-score", data);
};

 getInvestmentSuggestion = (data) => {
  return axios.post(BASEURL+"/ai/investment-suggestion", data);
};

enhanceDescription = async (data) => {
  const response = await axios.post(BASEURL + "/ai/enhance-description", data);
  return response.data;
};

getMessages(data) {
    return axios.post(`${BASEURL}/chat/get-messages`, data);
  }


 

  
  getChatInvestors(data) {
    return axios.post(
      BASEURL + "/chat/get-chat-investors",
      data,
      { headers: this.getToken() }
    );
  }

  // ===============================
  // 🔹 INVESTOR - Get Chat Owners
  // ===============================
  getChatOwners(data) {
    return axios.post(
      BASEURL + "/chat/get-chat-owners",
      data,
      { headers: this.getToken() }
    );
  }

  // ===============================
  // 🔹 Get Admin
  // ===============================
  getAdmin() {
    return axios.post(
      BASEURL + "/chat/get-admin",
      {},
      { headers: this.getToken() }
    );
  }

  // ===============================
  // 🔹 ADMIN - Get All Investors
  // ===============================
  getAllInvestors() {
    return axios.get(
      BASEURL + "/chat/get-all-investors",
      { headers: this.getToken() }
    );
  }

  // ===============================
  // 🔹 ADMIN - Get All Owners
  // ===============================
  getAllOwners() {
    return axios.get(
      BASEURL + "/chat/get-all-owners",
      { headers: this.getToken() }
    );
  }

  // ===============================
  // 🔹 Load Old Messages
  // ===============================
  getMessages(data) {
    return axios.post(
      BASEURL + "/chat/get-messages",
      data,
      { headers: this.getToken() }
    );
  }

  // ===============================
  // 🔹 Owner Conversations
  // ===============================
  getOwnerConversations(data) {
    return axios.post(
      BASEURL + "/chat/owner-conversations",
      data,
      { headers: this.getToken() }
    );
  }

  // ===============================
  // 🔹 Admin Conversations
  // ===============================
  getAdminConversations(data) {
    return axios.post(
      BASEURL + "/chat/admin-conversations",
      data,
      { headers: this.getToken() }
    );
  }


contact(data) {
   return axios.post(BASEURL+"/api/contact/add", data)
}

allContact(data) {
   return axios.post(BASEURL+"/admin/contact/all",data,{headers:this.getToken()})
}

softDeleteContact(data) {
   return axios.post(BASEURL+"/admin/contact/changeStatus", data,{headers:this.getToken()})
}

    admindashboard(data){
        return axios.post(BASEURL+"/api/admindashboard",data,{headers:this.getToken()})
    }



}
export default new ApiServices