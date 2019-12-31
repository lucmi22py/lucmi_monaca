// This is a JavaScript file

var i;
for (i = 0; i < 6; i++) {
    $('button').eq(i).on('touchstart', {value: i + 1 }, onclick);
}

function onclick(e) {
    alert(e.data.value + '番目のボタンをクリックしました');
};

function fn01(){
    window.location.href = "omake.html";
};


$('button').on('touchstart', 'fn02()');
function fn02(){
    location.href = "database.html";
};

function fn03(){
    window.location.href = "csvcatch.html";
};