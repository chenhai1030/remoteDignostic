function update(id) {
   $.getJSON("/chat/macs",function(data) {
      // $.each(data, function(){
      //    $("#client-content").html('<p>' + this.mac_addr +'</p>');
      //    });
   });
}
function timeDown(limit, i) {
   limit--;
   if (i > 4) {
       i = 0;
   }
   if (limit < 0) {
       limit = 3;
       update(i);
       i++;
   }
   setTimeout(function() {
       timeDown(limit, i);}, 1000)
}



function client_submit()
{
    let item = $("[name='client-mac']").filter(":checked");
    // console.log(item.attr("value"))
    mac = item.attr("value")

    $.ajax({
        url: 'client_mac',
        type: 'POST',
        data: JSON.stringify({
				'mac':mac
			}),
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
            // alert('success!')
            let n = window.location
            , s = n.href + (n.href.indexOf("editors")>0 ? "&" : "?") + "macaddr=" + mac.replace(/\:/g,"");
            history.replaceState("", "", s)
        },
        error: function(xhr, exception){
            if( xhr.status === 413){
                alert('Error : ' + xhr.status + 'Request Entity Too Large');
            }else
                alert('failed!' + xhr.status)
        }
    });
}

$(document).ready(function(){
    $("#change-client").click(function(){
        $("#client-content").empty()
        $.getJSON("/chat/macs",function(data) {
            let obj = JSON.parse(data)
            for (let i=0;i < obj.length;i++){
                // console.log(obj[i].fields.mac_addr)
                mac = obj[i].fields.mac_addr
                $("#client-content").append('<p>'+ '<input type="radio" name="client-mac" value="'+mac+'"/>' +mac+ '</p>');
            }
        });
    });

});

// $().ready(function() {
//    timeDown(5, 0)
// })

// function loadMac(){
//     let xmlhttp;
// 	if (window.XMLHttpRequest){
// 	    xmlhttp=new XMLHttpRequest();
//     }
// 	xmlhttp.onreadystatechange=function(){
//         if (xmlhttp.readyState==4 && xmlhttp.status==200){
//             $("#client-content").html('<p>' + this.mac_addr +'</p>');
//         }
//     }
// 	xmlhttp.open("POST","/chat/macs",true);
// 	xmlhttp.send();
// }