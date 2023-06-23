function incomeFunction(){
    var y= document.getElementById("income-pop-up");
    if(y.style.display === "none"){
        y.style.display= "flex";
    }
    else{
        y.style.display = "none";
    }
}

function expenseFunction(){
    var x= document.getElementById("expense-pop-up");
    if(x.style.display === "none"){
        x.style.display= "flex";
    }
    else{
        x.style.display = "none";
    }
}

