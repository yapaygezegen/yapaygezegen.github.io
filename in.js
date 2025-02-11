let dizi1 = ['O', 'r', 'h', '!', 'l', 'ı', 'D', 'd', 'Q', 'ğ', 'P', 'A', 'X', 'W', 'İ', '.', '?', 'H', 'U', 'J', 'F', 'ç', 'B', ';', 'p', 'v', 'm', 'i', 'E', 'e', 'G', 'M', 'R', 'Y', 'z', 'V', 'Ü', 'Ö', 'Ş', 'Ç', 'g', 'I', 'K', 'q', ':', ' ', 'b', 'Ğ', 'k', 't', 'y', 'N', 'ş', ',', 'T', 's', 'c', 'a', 'L', 'o', 'u', 'n', 'ü', 'ö', 'Z', 'f', 'x', 'w', 'j', 'C', 'S']
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
        for (let j = 0; j < 71; j++) {
            if (veri[i] == a[j]) {
                sonuc += b[j]
            }
        }
    }
    return sonuc
}
document.addEventListener("mouseover", function(a) {
    if(a.srcElement.innerText == "Gönder" && acKapa){
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