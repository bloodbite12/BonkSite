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


function toggleAddContentMenu(show, save, isBackground) { 
    if (show) {
        addNewContentMenu(isBackground);
        let addContentMenu = document.querySelector(".newContentMenu");
        
        addContentMenu.style.width = "20em";
    }
    else if (!show) {
        let addContentMenu = document.querySelector(".newContentMenu");
        if (save) {
            if (isBackground) {
                changeBackground();
            }
            else {
                addBookmark();
            }
        }
        addContentMenu.style.width = "0em";
        removeNewContentMenu(isBackground);
    }
}

function addNewContentMenu(isBackground) {
    const newContentMenu = document.querySelector(".newContentMenu");
        const imgContainer = document.createElement("div");
            const img = document.createElement("div");
        const inputForm = document.createElement("form");
            const formContainer = document.createElement("div");
                const inputURL = document.createElement("input");
                const inputText = document.createElement("input");
        const checkboxes = document.createElement("div");
            // const checkboxDiv1 = document.createElement("div");
            //     const checkboxCover = document.createElement("input");
            //     const checkboxCoverText = document.createElement("label");
            const checkboxDiv2 = document.createElement("div");
                const checkboxInvert = document.createElement("input");
                const checkboxInvertText = document.createElement("label");
        const buttonsContainer = document.createElement("div");
            const buttonCancel = document.createElement("div");
                const buttonTextCancel = document.createElement("p");
            const buttonApply = document.createElement("div");
                const buttonTextApply = document.createElement("p");


    imgContainer.classList.add("imgContainer");
    img.classList.add("img", "gcse-search");
    inputForm.classList.add("inputForm");
    formContainer.classList.add("formContainer");
    inputURL.classList.add("urlInput", "input");
    inputURL.type = "url";
    inputURL.placeholder = "Image url";
    inputURL.oninput = function() {loadImage()};
    inputText.classList.add("linkInput", "input");
    inputText.type = "text"
    inputText.placeholder = "Target url (google.com)";
    checkboxes.classList.add("checkboxes");
    // checkboxCover.classList.add("coverImageToggle");
    // checkboxCover.type = "checkbox";
    // checkboxCoverText.innerHTML = "Cover";
    // checkboxCover.onclick = function() {cover()};
    checkboxInvert.classList.add("invertImageToggle");
    checkboxInvert.type = "checkbox";
    checkboxInvert.onclick = function() {invert()};
    checkboxInvertText.innerHTML = "Invert";
    buttonsContainer.classList.add("buttons");
    buttonCancel.classList.add("button", "cancel");
    buttonCancel.onclick = function() {toggleAddContentMenu(0, 0, isBackground)};
    buttonApply.classList.add("button", "apply");
    buttonApply.onclick = function() {toggleAddContentMenu(0, 1, isBackground)};

    newContentMenu.appendChild(imgContainer);
        imgContainer.appendChild(img);
    newContentMenu.appendChild(inputForm);
        inputForm.appendChild(formContainer);
            formContainer.appendChild(inputURL);
            formContainer.appendChild(inputText);
        inputForm.appendChild(checkboxes);
            // checkboxes.appendChild(checkboxDiv1);
            //     checkboxDiv1.appendChild(checkboxCover);
            //     checkboxDiv1.appendChild(checkboxCoverText);
            checkboxes.appendChild(checkboxDiv2);   
                checkboxDiv2.appendChild(checkboxInvert);
                checkboxDiv2.appendChild(checkboxInvertText);
    newContentMenu.appendChild(buttonsContainer);
        buttonsContainer.appendChild(buttonCancel);
            buttonCancel.appendChild(buttonTextCancel);
        buttonsContainer.appendChild(buttonApply);
            buttonApply.appendChild(buttonTextApply);
    
    if (isBackground)
    {
        inputText.remove();
    }
            
}

function removeNewContentMenu(isBackground) {
    const newContentMenu = document.querySelector(".newContentMenu");
    const imgContainer = document.querySelector(".imgContainer");
    const inputForm = document.querySelector(".inputForm");
    const checkboxes = document.querySelector(".checkboxes");
    const buttonsContainer = document.querySelector(".buttons");


    setTimeout(function() { 
        imgContainer.remove();
        inputForm.remove();
        checkboxes.remove();
        buttonsContainer.remove(); 
    }, 200);
}

function addBookmark() {
    let imageInput = document.querySelector(".urlInput").value;
    let nameInput = document.querySelector(".linkInput").value;
    let inverted = document.querySelector(".invertImageToggle").checked;

    if (imageInput.slice(-1 -3) !== ".png" && imageInput.slice(-1 -3) !== ".jpg" && imageInput.slice(-1 -3) !== ".svg") {
        console.log(imageInput);
        var temp = imageInput;
        imageInput = "https://s2.googleusercontent.com/s2/favicons?domain="+temp;
        console.log(imageInput);
    }

    const bookmarkContainer = document.getElementById("sidebarContainer");
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

function hndlr(response) {
    var item = response.items[0];
    img = document.querySelector(".img");
    img.style.backgroundImage = "url("+item.link+")";
}


function loadImage() {
    let input = document.querySelector(".urlInput").value;
    let img = document.querySelector(".img");
    if (input.slice(-1 -3) !== ".png" && input.slice(-1 -3) !== ".jpg" && input.slice(-1 -3) !== ".svg") {
        console.log(input.slice(-1 -3));
        if (input.slice(-1 -3) === (".com"))
        {
            var script = document.querySelector("#getImageScript");
            script.src = "https://www.googleapis.com/customsearch/v1?searchType=image&key=AIzaSyBGHiXjHu_ZQBRMmDypOVhUphc8Mj51lWg&cx=d116d780df4f0c388&callback=hndlr&q="+input.slice(0, -4);
        }
    }
    else {
        img.style.backgroundImage = "url("+input+")";
    }
}

function changeBackground() {
    let input = document.querySelector(".urlInput").value;
    let currentBackground = document.querySelector("#main").style;
    currentBackground.backgroundImage = "url("+input+")";
    saveLocalBackground(input);
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

function invert() {
    let image = document.querySelector(".img");
    if (image.style.filter === "invert(0)" || !image.style.filter) {
        image.style.filter = "invert(1)";
    }
    else if (image.style.filter === "invert(1)") {
        image.style.filter = "invert(0)";
    }
}

function cover() {
    let image = document.querySelector(".img");
    if (image.style.backgroundSize === "contain" || !image.style.backgroundSize) {
        image.style.backgroundSize = "cover";
    }
    else if (image.style.backgroundSize === "cover") {
        image.style.backgroundSize = "contain";
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
    let trashcan = document.querySelector(".trashcan");
    dragSrcEl = self;
    ev.dataTransfer.setData("text/html", self.innerHTML);

    trashcan.style.height = "4em";

    self.addEventListener('dragend', handleDragEnd, false);
}

function handleDragEnd() {
    let trashcan = document.querySelector(".trashcan");
    trashcan.style.height = "0";
}

function drop(ev, self) {
    let trashcan = document.querySelector(".trashcan");
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
