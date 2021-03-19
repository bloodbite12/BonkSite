document.addEventListener("DOMContentLoaded", getBookmarks);
document.addEventListener("DOMContentLoaded", getBackground);

function pageLoad() {
    var background = document.getElementById("background");
    background.style.opacity = "1";
}

function playGame() {
    let game = document.getElementById("game");
    let button = document.getElementById("playGameButton");
    gameIframe = document.createElement("iframe");
    gameIframe.src = "https://www.lexaloffle.com/bbs/widget.php?pid=snake_afk";
    gameIframe.allowfullscreen = true;
    gameIframe.width="621";
    gameIframe.height="513";
    gameIframe.style.border = "none";
    gameIframe.style.overflow = "hidden";
    game.appendChild(gameIframe);
    game.style.display = "block";
    button.style.display = "none";
}

function expand(self, expandBool) {
    if (expandBool) {
        self.style.transform = "scaleX(1.1) scaleY(1.1)";
    }
    else {
        self.style.transform = "scaleX(1) scaleY(1)";
    }
}

let menuOpen = false;
function showMenu() {
    const menu = document.querySelector('#menu');
    const menuBtn = document.querySelector('.menuButton');
    const menuContent = document.querySelector('#menuContent');
    if (!menuOpen) {
        menuOpen = true;
        menuBtn.classList.add('open');
        menu.style.width = "20em";
        menu.style.height = "100vh";
        menuContent.style.opacity = "1";
    }
    else {
        menuOpen = false;
        menuBtn.classList.remove('open');
        menu.style.width = "4em";
        menu.style.height = "4em";
        menuContent.style.opacity = "0";
    }
}

function toggleChangeBackground(show, save) {
    var backgroundMenu = document.querySelector(".newBackground").style;
    var button = document.querySelector(".addBackgroundButton").style;
    var addContentMenu = document.querySelector(".addBackgroundMenu").style;

    var img = document.querySelector(".imageOutput");
    var imgContainer = document.querySelector(".backgroundImage").style;
    var backgroundForm = document.querySelector(".backgroundForm");
    
    if (show && (!button.opacity || button.opacity === "1")) {

        button.opacity = "0";

        backgroundMenu.position = "absolute";
        backgroundMenu.backgroundColor = "#3b3b3b";
        backgroundMenu.width = "22em";
        backgroundMenu.height = "20em";
        backgroundMenu.left = "calc(-50vw + 6em)";
        backgroundMenu.borderRadius = "10px";
        backgroundMenu.zIndex = "1";
        backgroundMenu.marginTop = "20em";

        addContentMenu.opacity = "1";
        addContentMenu.pointerEvents = "unset";
    }
    else if (!show) {
        button.opacity = "1";

        backgroundMenu.backgroundColor = "$color3";
        backgroundMenu.width = "100%";
        backgroundMenu.height = "3em";
        backgroundMenu.left = "0";
        backgroundMenu.borderRadius = "0";
        backgroundMenu.marginTop = "1em";
        addContentMenu.opacity = "0";
        addContentMenu.pointerEvents = "none";
        
        if (save) {
            changeBackground();
        }
        img.src = ""
        imgContainer.height = "4em";
        backgroundForm.reset();
        invert(0);
    }
}

function changeBackground() {
    var imageInput = document.querySelector(".backgroundInput").value;
    var currentBackground = document.querySelector("#main").style;
    console.log(imageInput);
    currentBackground.backgroundImage = "url("+imageInput+")";
    saveLocalBackground(imageInput);
}

function saveLocalBackground(newBackground) {
    let background;
    background = [];
    background.push(JSON.stringify(newBackground));
    localStorage.setItem("background", JSON.stringify(background));
}

function getBackground() {
    var currentBackground = document.querySelector("#main").style;
    let background;
    if (localStorage.getItem("background") === null) {
        background = [];
    } else {
        background = JSON.parse(localStorage.getItem("background"));
    //   console.log(bookmarks);
    }
    background.forEach(function(item) {
        if (item != null) {
            //Create bookmark div
            let backgroundLink = item.split("'");
            currentBackground.backgroundImage = "url("+backgroundLink[0]+")";
        } 
        else {
            console.log("corrupt");
            console.log(item);
        }
    });
}



function invert(bool) {
    let image = document.querySelector(".imageOutput");
    // console.log(image.style.filter);
    if (image.style.filter === "invert(0)" || !image.style.filter) {
        image.style.filter = "invert(1)";
    }
    else if (!bool || image.style.filter === "invert(1)") {
        image.style.filter = "invert(0)";
    }
}

function pageTransition(self) {
    var sidebar = document.getElementById("sidebar");
    var pageLoader = document.getElementById("pageLoader");
    sidebar.style.left = "calc(100% - 10em)";
    sidebar.style.opacity = "0";
    pageLoader.style.width = "100%";
    pageLoader.style.zIndex = 5;
    // console.log(self.alt);

    setTimeout(myURL, 400);
    function myURL(){
        // console.log(self.alt.slice(0, 4));
        if (self.alt.slice(0, 4) != "http")
        {
            window.open('https://'+ self.alt, '_self');

        }
        else {
            window.open(self.alt, '_self');
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault(true);
}

var dragSrcEl = null;
function drag(ev, self) {
    let trashcan = document.getElementById("trashcan");
    dragSrcEl = self;
    ev.dataTransfer.setData("text/html", self.innerHTML);

    trashcan.style.height = "4em";
    trashcan.style.marginTop = "1em";

    self.addEventListener('dragend', handleDragEnd, false);
}

function handleDragEnd() {
    trashcan.style.height = "0";
    trashcan.style.marginTop = "0";
}

function drop(ev, self) {
    let trashcan = document.getElementById("trashcan");
    ev.preventDefault(false);
    
    if (self != trashcan)
    {
        if (dragSrcEl != self)
        {
            moveBookmark(dragSrcEl, self);
            var data = ev.dataTransfer.getData("text/html");
        if (dragSrcEl) {
            dragSrcEl.innerHTML = self.innerHTML;
        }
        self.innerHTML = data;
        }
        trashcan.style.height = "0";
        trashcan.style.marginTop = "0";

    }
    else {
        let bookmarkContainer = document.getElementById("sidebarContainer");
        // console.log("remove");
        bookmarkContainer.removeChild(dragSrcEl);
        removeLocalBookmark(dragSrcEl);
    }
    
    // console.log(dragSrcEl.innerHTML);
    // console.log(self.innerHTML);
    // console.log(data);
}

function moveBookmark(target, self) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    let selfLogoSrc = self.children[0].src;
    let selfLogoAlt = self.children[0].alt;
    let selfLogoInv = self.children[0].style.filter;
    let targetLogoSrc = target.children[0].src;
    let targetLogoAlt = target.children[0].alt;
    let targetLogoInv = target.children[0].style.filter;

    if (selfLogoInv) {
        selfLogoAlt += 'true';
    }
    if (targetLogoInv) {
        targetLogoAlt += 'true';
    }

    const bookmarkIndexSelf = JSON.stringify(selfLogoSrc + "'" + selfLogoAlt);
    const bookmarkIndexTarget = JSON.stringify(targetLogoSrc + "'" + targetLogoAlt);

    // console.log(bookmarks);
    // console.log("self = " + bookmarks.indexOf(bookmarkIndexSelf));
    // console.log("target = " + bookmarks.indexOf(bookmarkIndexTarget));
    // console.log("self = " + bookmarks[bookmarks.indexOf(bookmarkIndexSelf)]);
    // console.log("target = " + bookmarks[bookmarks.indexOf(bookmarkIndexTarget)]);
    let selfTemp = bookmarks[bookmarks.indexOf(bookmarkIndexSelf)];
    let targetTemp = bookmarks[bookmarks.indexOf(bookmarkIndexTarget)];
    // console.log(bookmarks.indexOf(bookmarkIndexSelf));
    // console.log(bookmarks.indexOf(bookmarkIndexTarget));

    if (bookmarks.indexOf(bookmarkIndexSelf) > bookmarks.indexOf(bookmarkIndexTarget))
    {
        bookmarks[bookmarks.indexOf(bookmarkIndexSelf)] = bookmarks[bookmarks.indexOf(bookmarkIndexTarget)];
        bookmarks[bookmarks.indexOf(bookmarkIndexTarget)] = selfTemp;
    }
    else
    {
        bookmarks[bookmarks.indexOf(bookmarkIndexTarget)] = bookmarks[bookmarks.indexOf(bookmarkIndexSelf)];
        bookmarks[bookmarks.indexOf(bookmarkIndexSelf)] = targetTemp;
    }

  
    // temp = bookmarks[bookmarks.indexOf(bookmarkIndexSelf)];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // console.log(bookmarks);
}

function toggleAddContentMenu(show, save) {
   
    var contextMenu = document.querySelector(".newContent").style;
    var button = document.querySelector(".addContentButton").style;
    var addContentMenu = document.querySelector(".addContentMenu").style;

    var img = document.querySelector(".imageOutput");
    var imgContainer = document.querySelector(".contentImage").style;
    var bookmarkForm = document.querySelector(".bookmarkForm");
    
    if (show && (!button.opacity || button.opacity === "1")) {

        button.opacity = "0";

        contextMenu.position = "absolute";
        contextMenu.backgroundColor = "#3b3b3b";
        contextMenu.width = "22em";
        contextMenu.height = "20em";
        contextMenu.left = "calc(50vw - 6em)";
        contextMenu.borderRadius = "10px";
        contextMenu.zIndex = "1";

        addContentMenu.opacity = "1";
        addContentMenu.pointerEvents = "unset";
    }
    else if (!show) {
        button.opacity = "1";

        contextMenu.position = "relative";
        contextMenu.backgroundColor = "$color3";
        contextMenu.width = "10em";
        contextMenu.height = "3em";
        contextMenu.left = "0";
        contextMenu.borderRadius = "0";

        addContentMenu.opacity = "0";
        addContentMenu.pointerEvents = "none";
        
        if (save) {
            addBookmark();
        }
        img.src = ""
        imgContainer.height = "4em";
        bookmarkForm.reset();
        invert(0);
    }
    
}

function addBookmark() {
    var imageInput = document.querySelector(".imageInput").value;
    var nameInput = document.querySelector(".nameInput").value;
    var inverted = document.querySelector("#invertImage").checked;

    // console.log(inverted);

    var bookmarkContainer = document.getElementById("sidebarContainer");
    const bookmarkDiv = document.createElement("div");
    bookmarkDiv.classList.add("content");
    bookmarkDiv.onmouseover = function() {expand(this, 1)};
    bookmarkDiv.onmouseout = function() {expand(this, 0)};
    bookmarkDiv.draggable = function() {true};
    bookmarkDiv.ondrop = function() {drop(event, this)};
    bookmarkDiv.ondragstart = function() {drag(event, this)};
    bookmarkDiv.ondragover = function() {allowDrop(event)};
    const newLogo = document.createElement("img");
    newLogo.classList.add("logo");
    newLogo.src = imageInput;
    newLogo.alt = nameInput;
    if (inverted) {
        newLogo.style.filter = "invert(1)";
        newLogo.alt = nameInput + inverted;
    }
    newLogo.onclick= function() {pageTransition(this)};
    bookmarkDiv.appendChild(newLogo);
    bookmarkContainer.appendChild(bookmarkDiv);
    saveLocalBookmarks(newLogo);
}

function loadImage() {
    var input = document.querySelector(".imageInput").value;
    var img = document.querySelector(".imageOutput");
    var imgContainer = document.querySelector(".contentImage").style;

    img.src = input;
    img.style.margin = "1em 0";
    imgContainer.height = "12em";

}

function saveLocalBookmarks(newLogo) {
    let bookmarks;
    if (localStorage.getItem("bookmarks") === null) {
        bookmarks = [];
    }
    else {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    // console.log("bookmark = " +bookmark);
    // console.log("bookmarks = " +JSON.stringify(bookmarks));
    bookmarks.push(JSON.stringify(newLogo.src + "'" + newLogo.alt));
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function getBookmarks() {
    var bookmarkContainer = document.getElementById("sidebarContainer");
    let bookmarks;
    if (localStorage.getItem("bookmarks") === null) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //   console.log(bookmarks);
    }
    bookmarks.forEach(function(bookmark) {
        if (bookmark != null) {
            //Create bookmark div
            let attributes = bookmark.split("'");
            // console.log(bookmark);
            const bookmarkDiv = document.createElement("div");
            bookmarkDiv.classList.add("content");
            bookmarkDiv.onmouseover = function() {expand(this, 1)};
            bookmarkDiv.onmouseout = function() {expand(this, 0)};
            bookmarkDiv.draggable = function() {true};
            bookmarkDiv.ondrop = function() {drop(event, this)};
            bookmarkDiv.ondragstart = function() {drag(event, this)};
            bookmarkDiv.ondragover = function() {allowDrop(event)};
            const newLogo = document.createElement("img");
            newLogo.classList.add("logo");
            newLogo.src = attributes[0].slice(1);
            newLogo.alt = attributes[1].slice(0, -1);
            if (attributes[1].slice(0 -5) === 'true"') {
                newLogo.alt = attributes[1].slice(0, -5);
                newLogo.style.filter = "invert(1)";
            }
            newLogo.onclick = function() {pageTransition(this)};
            bookmarkDiv.appendChild(newLogo);
            //attach final bookmark
            bookmarkContainer.appendChild(bookmarkDiv);
        } 
        else {
            console.log("corrupt");
            console.log(bookmark);
            removeLocalBookmark(bookmark);
        }
    });
}

function removeLocalBookmark(bookmark) {
    let bookmarks;
    if (localStorage.getItem("bookmarks") === null) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }

    bookmarkSrc = bookmark.children[0].src;
    bookmarkAlt = bookmark.children[0].alt;
    bookmarkInv = bookmark.children[0].style.filter;
    // console.log(bookmarkSrc);
    // console.log(bookmarkAlt);
    // console.log(bookmarkInv);
    // let attributes = bookmark.split("'");

    if (bookmark != null) {
        let bookmarkIndex = JSON.stringify(bookmarkSrc + "'" + bookmarkAlt);
        if (bookmarkInv) {
            bookmarkIndex = JSON.stringify(bookmarkSrc + "'" + bookmarkAlt + 'true');
        }
        // console.log("not null " + bookmarks);
        // console.log("not null " + bookmarkIndex);
        // console.log("not null " + bookmarks.indexOf(bookmarkIndex));
        bookmarks.splice(bookmarks.indexOf(bookmarkIndex), 1);
    }
    else {
        bookmarks.splice(bookmarks.indexOf(bookmark), 1);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
