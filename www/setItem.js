// This is a JavaScript file
function ar(){
  var obj = {
  'name':'shota',
  'address':'Hokkaido',
  'age':'29'
};
  array.push(obj);

  var setjson = JSON.stringify(obj);
  localStorage.setItem('testdata',setjson);
}

var array = [];
var obj = {
  'name':'shota',
  'address':'Hokkaido',
  'age':'29'
};
array.push(obj);

var setjson = JSON.stringify(obj);
localStorage.setItem('testdata',setjson);

var getjson = localStorage.getItem('testdata');
var obj = JSON.parse(getjson);

function init(){
  sessionStorage.setItem('name','shota');
}