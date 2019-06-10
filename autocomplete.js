function getValue(val) {
  if (!val) {
    return;
  }
  fetchAPI(val);
}

//Function to call API 
function fetchAPI(input) {
  var xhr = new XMLHttpRequest();
  document.getElementById("result").innerHTML = "";
  if(input!=""){
    restURL = "https://restcountries.eu/rest/v2/name/"
  }
  else{
    restURL = "https://restcountries.eu/rest/v2/all";
  }
  xhr.open("GET", restURL + input, true);
  xhr.onload = function() {
    //console.log(xhr.responseText);
    var data = JSON.parse(xhr.responseText);
    if (Object.keys(data).length == 0) {
      console.log("No results found");
      var node1 = document.createElement("LI");
      var textnode1 = document.createTextNode("No Results Found");
      node1.appendChild(textnode1);
      document.getElementById("result").appendChild(node1);
    } else {
      var newArry = new Array();
      newArry = data;
      var res = "<ul>";

      newArry.forEach(e => {
        //res += '<li>'+e.year+'</li>';
        var node = document.createElement("LI");
        var result = e.name;
        //var result = e.year + ' - '+ new Date().toDateString();
        var textnode = document.createTextNode(result);
        node.appendChild(textnode);

        node.onclick = function(event) {
          console.log(event);
          var nodeResult = document.createElement("LI");
          var resultDisp = node.textContent;
          if(document.getElementById("autocompleteTextBox").value!=""){
          var textNodeResult = document.createTextNode(document.getElementById("autocompleteTextBox").value);
          }
          else{
            var textNodeResult ="";
          }
          
          document.getElementById("autocompleteTextBox").value = resultDisp;

          document.getElementById('history').style.display = 'block';
          
          //document.getElementById("resultFinal").appendChild(nodeResult);
          document.getElementById("result").innerHTML = "";
        };
        document.getElementById("result").appendChild(node);
      });
    }
  };
  xhr.send();
}


function clearList() {
  document.getElementById("resultFinal").innerHTML = "";
}

function clearVal(){
  document.getElementById("autocompleteTextBox").value = "";
  //fetchAPI("");
  document.getElementById("result").innerHTML = "";
}

function searchHistory(){
  //var node = document.createElement("LI");
  var nodeResult = document.createElement("LI");
  //var resultDisp = node.textContent;
  if(document.getElementById("autocompleteTextBox").value!=""){
  var textNodeResult = document.createTextNode(document.getElementById("autocompleteTextBox").value);
  }
  else{
    var textNodeResult ="";
  }
var close1 = document.createElement("span");
          close1.className = "closeButton";
          close1.className = "spanCls closeIcon";
          var textCont1 = "X";
          
          var clostContent1 = document.createTextNode(textCont1);
          close1.appendChild(clostContent1);
          

          var close = document.createElement("span");
          close.className = "spanCls";
          var textCont = new Date().toUTCString();
          var clostContent = document.createTextNode(textCont);
          close.appendChild(clostContent);
         
          nodeResult.append(close1);
          nodeResult.append(close);
          nodeResult.appendChild(textNodeResult);


          close1.onclick = function(event1) {
            console.log(event1);
            event1.target.parentElement.remove();
            
            if(document.getElementsByClassName('spanCls').length <= 0) {
                //document.getElementById('history').style.display = 'none';
            }
          };

          document.getElementById("resultFinal").appendChild(nodeResult);

          
}