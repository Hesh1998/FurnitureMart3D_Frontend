function toastSetup(){
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show()) 
}


function errorToast(message){
    document.querySelector(".toast").innerHTML  = `<div class="toast-header" style="background-color: #f1aeae;"> <img src="alert-24.png" class="me-auto"> <button type="button" class="btn-close" data-bs-dismiss="toast"></button> </div> <div class="toast-body" style="background-color: white; border-radius: 10px;"> <h5 style="text-align: center;">${message}</h5> </div>`;
    toastSetup();
}


function infoToast(message){
    document.querySelector(".toast").innerHTML  = `<div class="toast-header" style="background-color: #c4ff89;"> <img src="ok-24.png" class="me-auto"> <button type="button" class="btn-close" data-bs-dismiss="toast"></button> </div> <div class="toast-body" style="background-color: white; border-radius: 10px;"> <h5 style="text-align: center;">${message}</h5> </div>`;
    toastSetup();
}


function buttonToast(message){
    document.querySelector(".toast").innerHTML  = `<div class="toast-header" style="background-color: #ADD8E6;"> <img src="info-24.png" class="me-auto"> <button type="button" class="btn-close" data-bs-dismiss="toast"></button> </div> <div class="toast-body" style="background-color: white; border-radius: 10px;"> <h5 style="text-align: center;">${message}</h5> <center> <button type="button" class="btn btn-success">Yes</button> <button type="button" class="btn btn-danger" style="margin-left: 15px;">No</button> </center> </div>`;
    toastSetup();
}