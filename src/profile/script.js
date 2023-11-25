var urls = [
    "/quiz.html",
    "/page2.html",
    "/page3.html",
    "/page4.html",
    "/page5.html",
    "/page6.html",
    "/page7.html",
    "/page8.html",
];

document.getElementById("random-link").addEventListener("click", function(){
    var url = urls[Math.floor(Math.random()*urls.length)]
  alert("вы собираетесь перейти по ссылке: " + url);
  this.href = url;
});