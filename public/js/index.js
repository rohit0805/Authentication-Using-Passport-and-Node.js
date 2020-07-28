function destroyAlert(){
    document.querySelectorAll('.destroy').forEach((alert)=>{
        alert.addEventListener('click',function(e){
            e.target.parentNode.parentNode.remove();
        });
    });
};

destroyAlert();
