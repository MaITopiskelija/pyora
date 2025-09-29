const PREFIX = "cb";

function key(element){
    return PREFIX + element.id
}

document.querySelectorAll("input[type=checkbox][data-persist]").forEach(cb =>{
    const saved = localStorage.getItem(key(cb))
    if(saved !== null)
        cb.checked = saved ==="1"
})

document.addEventListener("change", el => {
    if (el.target.matches("input[type=checkbox][data-persist]")){
        if (!el.isTrusted){
            const saved = localStorage.getItem(key(el.target))
            el.target.checked = saved === "1"
        }
        localStorage.setItem(key(el.target), el.target.checked ? "1" : "0")
    }
},true)