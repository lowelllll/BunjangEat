$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

let max = 0;
let min = 18;

let makeRandom = (a,b) => Math.floor(Math.random() * (a-b)+ b);


const ROOT_URL = 'http://menubot.pythonanywhere.com/menu/menus/'

function mykeydown() {
        document.getElementById('footer__changer').addEventListener('keyup', function(e){
            if(e.target.selectionStart == 0){
                document.getElementById("footer__submit").style.backgroundColor = "gray";
                document.getElementById("footer__icon").style.color = "white";
            }
            else{
                document.getElementById("footer__submit").style.backgroundColor = "red";
                document.getElementById("footer__icon").style.color = "yellow";
            }
        })

}


$("#footer__submit").on("click",() => {
    let FormData  = $("#footer__changer").serializeObject();
    console.log(FormData);
    $.ajax({
        url:"http://menubot.pythonanywhere.com/menu/create/",
        dataType:'json',
        type:'POST',
        data:FormData,
        success:() =>{
            alert("success");
        },
        error:() =>{
            alert("error");
        }
    })


    $.ajax({
        url:'http://menubot.pythonanywhere.com/menu/menus/',
        dataType:'json',
        method:'get',
        success:(data) => {
            const id_value = data.menus[0].id;
            console.log(id_value);
            /*
            console.log(data.menus[0].id) + 1;

            console.log(data.menus);
            console.log("0번 ID : " + data.menus[0].id);
            console.log("1번 ID : " + data.menus[1].id);

            console.log("1번 ID + 1 : " + ++(data.menus[1].id));
            */

            const tag = `
                <div class="menu">
                    <div class="menu__text">
                        <span class="menu__name">${FormData.name}</span>
                        <span class="menu__last-date">식사 기록 없음</span>
                    </div>
                   <input type="hidden" class="id" value="${id_value}" />
                    <div class="menu__delete">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
                `;
            $(".menu:last-child").after(tag);
        }
    })
});



$("#menus").on("click", ".menu__delete", function() {
    const $menus = $(this).parent();
    const $input = $menus.find(".id");
    const pk = $input.val();
    console.log('id', pk);

    $.ajax({
        url:"http://menubot.pythonanywhere.com/menu/delete/",
        dataType:'json',
        type:'POST',
        data:{
            "pk":pk
        },
        success:function () {
            alert("success")
        },
        error:function () {
            alert("error")
        }
    })


    $($menus).remove();
});

