var Controller=(function(){
    var name_active_alert=1;
    var email_active_alert=1;
    var pass_active_alert=1;
    const selector={
        name:document.querySelector('.name'),
        name_alert_1:document.querySelector('.name_alert_1'),
        name_alert_2:document.querySelector('.name_alert_2'),
        name_alert_3:document.querySelector('.name_alert_3'),
        button:document.querySelector('.button'),
        email_alert_1:document.querySelector('.email_alert_1'),
        email_alert_2:document.querySelector('.email_alert_2'),
        email:document.querySelector('.email'),
        pass:document.querySelector('.password'),
        pass_alert_1:document.querySelector('.pass_alert_1'),
        pass_alert_2:document.querySelector('.pass_alert_2')
    };
    function destroyAlert(){
        document.querySelectorAll('.destroy').forEach((alert)=>{
            alert.addEventListener('click',function(e){
                e.target.parentNode.parentNode.remove();
            });
        });
    };
    function NameValidation(){
        selector.name.addEventListener('input',function(e){
            const str=e.target.value;
            selector.name_alert_1.style.display="none";
            selector.name_alert_2.style.display="none";
            selector.name_alert_3.style.display="none";
            name_active_alert=0;
            if(str==''){
                name_active_alert=1;
                selector.name_alert_1.style.display="block";
            }
            else if(str.length>=1 && (str.charCodeAt(0)<65 || str.charCodeAt(0)>122)){
                selector.name_alert_2.style.display="block";
                name_active_alert=2;
            }
            else if(str.length<3){
                name_active_alert=3;
                selector.name_alert_3.style.display="block";
            }
            ButtonColor();
        });
    };
    function EmailValidation(){
        selector.email.addEventListener('input',function(e){
            const str=e.target.value;
            selector.email_alert_1.style.display="none";
            selector.email_alert_2.style.display="none";
            email_active_alert=0;
            var check=str.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
            if(str==''){
                email_active_alert=1;
                selector.email_alert_1.style.display="block";
            }
            else if(!check){
                email_active_alert=2;
                selector.email_alert_2.style.display="block";
            }
            ButtonColor();
        });
    };
    function PassValidation(){
        selector.pass.addEventListener('input',function(e){
            const str=e.target.value;
            selector.pass_alert_1.style.display="none";
            selector.pass_alert_2.style.display="none";
            pass_active_alert=0;
            if(str==''){
                pass_active_alert=1;
                selector.pass_alert_1.style.display="block";
            }
            else if(str.length<8){
                pass_active_alert=2;
                selector.pass_alert_2.style.display="block";
            }
            ButtonColor();
        });
    };
    function CheckSubmit(){
        selector.button.addEventListener('click',function(e){
            if(name_active_alert!='0' || email_active_alert!='0' || pass_active_alert!='0'){
                e.preventDefault();
                if(name_active_alert!='0'){
                    selector.name.style.animation=`Vibrate 0.1s ease-in-out normal 5`;
                    document.querySelector(`.name_alert_${name_active_alert}`).style.display="block";
                    RemoveAnimation()
                }
                if(email_active_alert!='0'){
                    document.querySelector(`.email_alert_${email_active_alert}`).style.display="block";
                    selector.email.style.animation=`Vibrate 0.1s ease-in-out normal 5`;
                    RemoveAnimation();
                }
                if(pass_active_alert!='0'){
                    document.querySelector(`.pass_alert_${pass_active_alert}`).style.display="block";
                    selector.pass.style.animation=`Vibrate 0.1s ease-in-out normal 5`;
                    RemoveAnimation();
                }   
            }
        });
    };
    function ButtonColor(){
        if(name_active_alert=='0' && email_active_alert=='0' && pass_active_alert=='0')
            selector.button.style.backgroundColor="#4040cc";
        else    
            selector.button.style.backgroundColor="";
    };
    function RemoveAnimation(){
        setTimeout(()=>{
            selector.name.style.animation="";
            selector.email.style.animation="";
            selector.pass.style.animation="";
        },1000);
    };
    return{
        init:function(){
            destroyAlert();
            CheckSubmit();
            NameValidation();
            EmailValidation();
            PassValidation();
        }
    }
})();

Controller.init();