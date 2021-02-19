document.addEventListener("DOMContentLoaded", getBookmarks);

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

function pageTransition(self) {
    var sidebar = document.getElementById("sidebar");
    var pageLoader = document.getElementById("pageLoader");
    sidebar.style.left = "calc(100% - 10em)";
    sidebar.style.opacity = "0";
    pageLoader.style.width = "100%";
    // console.log(self.alt);

    setTimeout(myURL, 400);
    function myURL(){
        window.open('https://'+self.alt, '_self');
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
        console.log("remove");
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
    let targetLogoSrc = target.children[0].src;
    let targetLogoAlt = target.children[0].alt;
    const bookmarkIndexSelf = JSON.stringify(selfLogoSrc + "'" + selfLogoAlt);
    const bookmarkIndexTarget = JSON.stringify(targetLogoSrc + "'" + targetLogoAlt);

    // console.log(bookmarks);
    // console.log("self = " + bookmarks.indexOf(bookmarkIndexSelf));
    // console.log("target = " + bookmarks.indexOf(bookmarkIndexTarget));
    // console.log("self = " + bookmarks[bookmarks.indexOf(bookmarkIndexSelf)]);
    // console.log("target = " + bookmarks[bookmarks.indexOf(bookmarkIndexTarget)]);

    let selfTemp = bookmarks[bookmarks.indexOf(bookmarkIndexSelf)];
    let targetTemp = bookmarks[bookmarks.indexOf(bookmarkIndexTarget)];
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

function removeLocalBookmark(bookmark) {
    let bookmarks;
    if (localStorage.getItem("bookmarks") === null) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    if (bookmark != null) {
        const bookmarkIndex = bookmark.children[0].innerText;
        bookmarks.splice(bookmarks.indexOf(bookmarkIndex), 1);
    }
    else {
        console.log(bookmarks.indexOf(bookmark));
        bookmarks.splice(bookmarks.indexOf(bookmark), 1);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function toggleAddContentMenu(show, save) {
   
    var contextMenu = document.getElementById("newContent").style;
    var button = document.getElementById("addContentButton").style;
    var addContentMenu = document.getElementById("addContentMenu").style;

    var img = document.getElementById("imageOutput");
    var imgContainer = document.getElementById("contentImage").style;
    var bookmarkForm = document.getElementById("bookmarkForm");
    
    if (show && (!button.opacity || button.opacity === "1")) {

        button.opacity = "0";

        contextMenu.position = "absolute";
        contextMenu.backgroundColor = "#3b3b3b";
        contextMenu.width = "22em";
        contextMenu.height = "20em";
        contextMenu.left = "calc(50vw - 8em)";
        contextMenu.borderRadius = "10px";

        addContentMenu.opacity = "1";
        addContentMenu.pointerEvents = "unset";
    }
    else if (!show) {
        button.opacity = "1";

        contextMenu.position = "relative";
        contextMenu.backgroundColor = "#212121";
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
        imgContainer.height = "3em";
        bookmarkForm.reset();
    }
    
}

function addBookmark() {
    var imageInput = document.getElementById("imageInput").value;
    var nameInput = document.getElementById("nameInput").value;

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
    newLogo.onclick= function() {pageTransition(this)};
    bookmarkDiv.appendChild(newLogo);
    bookmarkContainer.appendChild(bookmarkDiv);
    saveLocalBookmarks(newLogo);
}

function loadImage() {
    var input = document.getElementById("imageInput").value;
    var img = document.getElementById("imageOutput");
    var imgContainer = document.getElementById("contentImage").style;

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
      console.log(bookmarks);
    }
    bookmarks.forEach(function(bookmark) {
        if (bookmark != null) {
            //Create bookmark div
            let attributes = bookmark.split("'");
            // console.log(bookmark);
            // console.log(attributes[0].slice(1));
            // console.log(attributes[1].slice(0, -1));
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
            newLogo.onclick = function() {pageTransition(this)};
            bookmarkDiv.appendChild(newLogo);
            //attach final bookmark
            bookmarkContainer.appendChild(bookmarkDiv);
        } 
        else {
            console.log("corrupt");
            removeLocalBookmark(bookmark);
        }
    });
}
