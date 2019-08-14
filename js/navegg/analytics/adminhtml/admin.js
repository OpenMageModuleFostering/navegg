function validaFormId(){
    if(document.getElementById('navegg_analytics_navegg_advertising').value == '' ||document.getElementById('navegg_analytics_navegg_advertising').value == 'Enter your ID'){
        alert("Please, enter your ID number.");
        return false;
    }
    return true;
}

function validaEmail(id){
    if(document.getElementById(id).value == '' ){
        alert("Please, enter your e-mail address.");
        document.getElementById(id).focus();
        return false;
    }else{
        if(!checkMail(document.getElementById(id).value)){
            alert("Please, enter a valid e-mail address.");
            document.getElementById(id).focus();
            return false;
        }
        return true;
    }
}

function checkMail(mail){
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(typeof mail == "string"){
        if(er.test(mail)){
            return true;
        }
    }else if(typeof mail == "object"){
        if(er.test(mail.value)){
            return true;
        }
    }else{
        return false;
    }
}

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function api(action){
    if(typeof action !== undefined){
        switch(action){
            case "getId":
                elemento = document.getElementById("emNvg");
                email = elemento.value
                if(checkMail(email)){
                    callAjax("/navegg_analytics/index/getid?email="+email,function(data){
                        var data = JSON.parse(data);
                        if(data.error){
                            var html = "<h3>The entered e-mail is invalid</h3>";
                            document.getElementById("result_ids").innerHTML= html;
                            elemento.focus();
                        }else{
                            if(data.accid.length > 1){
                                var html = "<h3>The entered e-mail has multiples accounts, select one</h3>";
                            }else if (data.accid.length == 1) {
                                var html = "<h3>The entered e-mail has the following account</h3>";
                            }else{
                                var html = "<h3>The entered e-mail have no accounts</h3>";
                            }
                            html += "<ul>"
                            for(var i=0; i<data.accid.length;i++){
                              html += "<li>"+data.accid[i]+"</li>";
                            }
                            html += "</ul>"
                            document.getElementById("result_ids").innerHTML= html;
                        }
                    });
                }else{
                    var html = "<h3>The entered e-mail is invalid</h3>";
                    document.getElementById("result_ids").innerHTML= html;
                }
                break;
            case "newAcc":
                _name = document.getElementById("nmNvg");
                _email = document.getElementById("nemNvg");
                _storeName = document.getElementById("stNvg");
                _storeUrl = document.getElementById("urNvg");
                if(!checkMail(_email.value)){
                    alert("The entered e-mail is invalid");
                    _email.focus();
                }else{
                    callAjax("/navegg_analytics/index/newacc?usr_name="+_name.value+"&usr_email="+_email.value+"&usr_site_name="+_storeName.value+"&usr_domain="+_storeUrl.value,function(data){
                        // {"success":"true","id_navegg":"38310","usr_acess_key":"92dbb6fb39a64cfbf4b0f26e8cf3a08b", "tag":"<script id='navegg' type='text/javascript' src='//tag.navdmp.com/tm38310.js' async='true'></script>"}
                      var data = JSON.parse(data);
                      if(data.success=="true"){
                        alert("Account registered successfully, check your e-mail");
                        document.getElementById("navegg_analytics_navegg_advertising").value=data.id_navegg;
                        document.getElementById('containerNewAccount').style.display = 'none'
                        _name.value="";
                        _email.value="";
                        _storeName.value="";
                        _storeUrl.value="";
                      }else if(data.message){
                        alert("Please, check your form");
                      }else{
                        alert("Error on process. If the error persist, please contact our support at it@navegg.com");
                      }
                    })
                }
                break;
            default:
            break;
        }
    }
}