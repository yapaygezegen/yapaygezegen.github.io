let dizi1 = ['V', 'o', ':', '.', 'c', 'O', 'w', 'Ç', 'Z', '4', 'v', '5', 'Q', 'J', 'ı', 'D', 'l', '2', 'y', 'U', 'z', 'g', 'Ş', 'S', 'G', 'P', ' ', 'k', 'ç', '8', ';', 's', 'W', 'ş', 'q', 'u', 'Ü', 'e', 'a', '6', 'T', 'E', 'K', 'F', 'A', '1', 'L', ',', 'd', 'x', 'C', 'i', 'N', 'b', 'n', '0', 'h', 'Ö', 'Y', 'j', 'İ', '?', 'ğ', 'R', 't', 'ö', 'ü', 'Ğ', 'X', '7', 'f', 'M', '3', 'B', 'H', 'I', 'm', 'p', 'r', '!', '9']
let dizi2 = dizi1.slice().sort(() => Math.random() - 0.5)
let acKapa = true
function degistir(veri, duzTers = 1) {
    let sonuc = "", a, b
    if (duzTers) {
        a = dizi1
        b = dizi2
    } else {
        a = dizi2
        b = dizi1
    }
    for (let i = 0; i < veri.length; i++) {
        for (let j = 0; j < 81; j++) {
            if (veri[i] == a[j]) {
                sonuc += b[j]
            }
        }
    }
    return sonuc
}
document.addEventListener("mouseover", function(a) {
    if(a.srcElement.ariaLabel == "Göndermek için Enter tuşuna bas" && acKapa){
        acKapa = false
        document.querySelector('span[data-lexical-text="true"]').firstChild.nodeValue = degistir(document.querySelector('span[data-lexical-text="true"]').firstChild.nodeValue)
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        acKapa = true
    }
})

document.addEventListener("click", function(b) {
    if(b.srcElement.namespaceURI == "http://www.w3.org/2000/svg" && !acKapa){
        acKapa = true
    }
    if(b.srcElement.dir == "auto"){
        console.log(degistir(b.srcElement.innerText, 0))
    }
})
console.log(dizi2)