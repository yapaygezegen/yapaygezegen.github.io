let dizi1 = ['r', 'm', 'H', 'v', 'K', 'i', 'n', 'Q', 'Ş', 'N', ':', 's', 'X', 'Z', 'ı', 'c', '3', 'Ğ', 'T', 'o', ';', 'C', 'V', 'Ç', '1', 'Y', 'I', 'ç', '!', 'y', 'ü', 'İ', 'D', 'g', '7', 'J', '.', 'x', 'u', '5', 'F', 'l', 'ş', '6', 'z', '4', 'q', 'j', 'U', 'G', 'k', 'Ü', 'd', '8', 'ö', 'e', '2', 'M', 'ğ', 'p', 'R', ',', 'a', 'E', 'S', 'h', 'W', '?', '9', 'b', 't', 'O', 'P', 'L', ' ', '0', 'A', 'w', 'Ö', 'B', 'f']
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
    if((a.srcElement.innerText == "Gönder" || a.srcElement.innerText == "Send") && acKapa){
        acKapa = false
        document.querySelectorAll("p")[0].firstChild.firstChild.nodeValue = degistir(document.querySelectorAll("p")[0].firstChild.firstChild.nodeValue)
    }
})
document.addEventListener("click", function(b) {
    if(b.srcElement.innerText == "Gönder" && !acKapa){
        acKapa = true
    }
    if(b.srcElement.dir == "auto"){
        console.log(degistir(b.srcElement.innerText, 0))
    }
})
console.log(dizi2)
