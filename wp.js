let dizi1 = ['y', 'z', 'X', 'r', 'Ş', 'U', 'v', 'h', 'V', 't', ';', 'b', '.', ',', 'o', 'ı', 'S', 'e', '!', 'f', 'A', 'H', 'p', 'P', 'Ü', 'Z', 'i', 'C', 'ü', '?', 'u', ':', 'J', 'j', 's', 'ç', 'n', 'W', 'k', 'İ', 'E', 'ö', 'Ç', 'a', 'm', 'ş', 'L', 'D', 'Ğ', 'I', 'B', 'K', 'Q', 'x', 'w', 'O', 'N', 'Y', 'M', 'q', 'T', 'c', 'R', 'Ö', 'G', 'l', 'ğ', 'g', ' ', 'd', 'F']
let dizi2 = dizi1.slice("").sort(() => Math.random() - 0.5)
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
        for (let j = 0; j < 71; j++) {
            if (veri[i] == a[j]) {
                sonuc += b[j]
            }
        }
    }
    return sonuc
}
document.addEventListener("mouseover", function(a) {
    if(a.srcElement.dataset.icon == "send" && acKapa){
        acKapa = false
        document.querySelectorAll("p")[1].firstChild.firstChild.nodeValue = degistir(document.querySelectorAll("p")[1].firstChild.firstChild.nodeValue)
    }
})
document.addEventListener("click", function(b) {
    if(b.srcElement.dataset.icon == "send" && !acKapa){
        acKapa = true
    }
    if(b.srcElement.localName == "span"){
        console.log(degistir(b.srcElement.innerText, 0))
    }
})