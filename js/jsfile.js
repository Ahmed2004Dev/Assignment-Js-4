var yourname = document.querySelector("#yourname");
var youremail = document.querySelector(".emailuser");
var yourpassword = document.querySelector(".passworduser");
var buttn_search = document.querySelector("#searchinput");
var buttn_sign = document.querySelector("#sign_up_buttn");
var buttn_login = document.querySelector("#login-btnn");
var buttn_sign_main = document.querySelector("#sign-btnn");
var cont_login_input = document.querySelector(".cont-all");
var cont_teble_data = document.querySelector(".table");
var deletebuttn = document.querySelector("#deleteb")

datasign = []

function validname(){
    var regexName =/[a-z]/;
    if(regexName.test(yourname.value) == true){
        document.getElementById("message_name").classList.replace("d-block" , "d-none");
        return true
    }
    else{
        document.getElementById("message_name").classList.replace("d-none" , "d-block");
        return false
    }
}

function validEmail(){
    var regexEmail =/@gmail.com$/;
    if(regexEmail.test(youremail.value) == true){
        document.getElementById("message_email").classList.replace("d-block" , "d-none");
        return true
    }
    else{
        document.getElementById("message_email").classList.replace("d-none" , "d-block");
        return false
    }
}

function validPassword(){
    var regexPassword = /[a-z][0-9]/;
    if(regexPassword.test(yourpassword.value)== true){
        document.getElementById("message_password").classList.replace("d-block" , "d-none");
        return true
    }
    else{
        document.getElementById("message_password").classList.replace("d-none" , "d-block");
        return false
    }
}

function searchAccountFonded() {
    for (var i = 0; i < datasign.length; i++) {
        if (datasign[i].emailuser == youremail.value) {
            return true
        }
    }
} 

function loginer() {   
    if(validEmail() == true && validPassword() == true && validname() == true){
        var inputdata = {
            nameuser : yourname.value,
            emailuser: youremail.value,
            passworduser: yourpassword.value,
        }
        if(searchAccountFonded() == true){
            document.getElementById("message_email_founded").innerHTML= `<span class="text-danger">This account is in use</span>`;
            console.log("no");
        }
        else{
            buttn_login.addEventListener("click" , function(){
                cont_login_input.classList.replace("d-block" , "d-none");
                cont_teble_data.classList.replace("d-none" , "d-block");
            });
            document.getElementById("message_email_founded").innerHTML= `<span class="text-danger"></span>`;
            console.log("yes");
            localStorage.setItem("all", JSON.stringify(datasign));
            datasign.push(inputdata);
            clear();
            dispaly()
        };
    }
}

function signer () {   
    if(validEmail() == true && validPassword() == true){
        var inputdata = {
            nameuser : yourname.value,
            emailuser: youremail.value,
            passworduser: yourpassword.value,
        }
        if(searchAccountFonded() == true){
            buttn_sign_main.addEventListener("click" , function(){
                cont_login_input.classList.replace("d-block" , "d-none");
                cont_teble_data.classList.replace("d-none" , "d-block");
                dispaly();
            });
        }
        else{
            document.getElementById("message_email_founded").innerHTML= `<span class="text-danger"></span>`;
            localStorage.setItem("all", JSON.stringify(datasign));
            datasign.push(inputdata);
            document.getElementById("message_email_founded").innerHTML= `<span class="text-danger">This account is not founded</span>`;
        }
    }
}

function clear() {
    yourname.value="";
    youremail.value = "";
    yourpassword.value = "";
}

function dispaly() {
    TableData = "";
    for (var i = 0; i < datasign.length; i++) {
        TableData +=
        `
        <tr>
            <td>${i + 1}</td>
            <td>${datasign[i].nameuser}</td>
            <td>${datasign[i].emailuser}</td>
            <td>${datasign[i].passworduser}</td>
            <td>
                <button onclick="deleteAccount(${i})" type="button" class="btn btn-outline-danger">Log out</button>
            </td>
        </tr>
        `
    };
    document.querySelector("#tbody").innerHTML=TableData;
    localStorage.setItem("all", JSON.stringify(datasign));
    console.log("perfect");
    // document.querySelector(".table").innerHTML=
    // `
    // <button onclick="deleteAccount()" type="button" class="btn btn-outline-danger">Log out</button>
    // `
}

if(localStorage.getItem("all")!=null){
    datasign = JSON.parse(localStorage.getItem("all"));
    dispaly()
};

function deleteAccount(index){
    datasign.splice(index , 1);
    localStorage.setItem("all", JSON.stringify(datasign));
    dispaly()
}

function searchAccount(leater) {
    Table_Data_User = "";
    for (var i = 0; i < datasign.length; i++) {
        if (datasign[i].emailuser.toLowerCase().includes(leater.toLowerCase().trim())) {
            Table_Data_User +=
            `
            <tr>
                <td>${i + 1}</td>
                <td>${datasign[i].nameuser}</td>
                <td>${datasign[i].emailuser}</td>
                <td>${datasign[i].passworduser}</td>
                <td>
                    <button onclick="deleteAccount(${i})" type="button" class="btn btn-outline-danger">Log out</button>
                </td>
            </tr>
            `
        }
    }
    document.getElementById("tbody").innerHTML = Table_Data_User;
}

function loginButtn(){
    document.getElementById("yourname").classList.replace("d-none" , "d-block");
}

buttn_sign.addEventListener("click" , function(){
    buttn_login.classList.replace("d-none" , "d-block");
    buttn_sign_main.classList.replace("d-block" , "d-none");
    clear();
    document.getElementById("message_email_founded").innerHTML= `<span class="text-danger"></span>`;
});