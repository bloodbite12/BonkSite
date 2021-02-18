function pageLoad() {
    var background = document.getElementById("background");
    background.style.opacity = "1";
}

function expand(self, expandBool) {
    if (expandBool) {
        self.style.transform = "scaleX(1.1) scaleY(1.1)";
    }
    else {
        self.style.transform = "scaleX(1) scaleY(1)";
    }
}

function pageTransition(page) {
    var sidebar = document.getElementById("sidebar");
    var pageLoader = document.getElementById("pageLoader");
    var url = page;
    sidebar.style.left = "calc(100% - 10em)";
    sidebar.style.opacity = "0";
    pageLoader.style.width = "100%";

    setTimeout(myURL, 400);
    function myURL(){
        window.open('https://'+url, '_self');
    }
}