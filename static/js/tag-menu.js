let TAG_LIST = [];

function removeTag(tag) {
    const targetTag = document.getElementById(tag);
    targetTag.remove();
    TAG_LIST = TAG_LIST.filter(function(item) {
        return item !== tag
    });
}

function appendTag(tag) {
    const outerTagMenu = document.getElementById("tag-menu-outer");
    const tagInputBox = document.getElementById("tag-menu-box");
    const newTag = document.createElement("div");
    const tagName = document.createTextNode(tag);
    newTag.id = tag;
    newTag.classList.add("col");
    newTag.classList.add("tag-icon");
    newTag.addEventListener("click", () => {
        removeTag(tag);
    });
    newTag.appendChild(tagName);
    if (TAG_LIST.includes(tag)) {
        return;
    } else {
        outerTagMenu.appendChild(newTag);
        TAG_LIST.push(tag);
    }

}