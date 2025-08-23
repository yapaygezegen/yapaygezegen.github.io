let dizi1 = ['k', '!', 'a', 't', 'n', 'e', 's', 'Ç', '?', 'ç', 'p', ';', 'S', 'w', '6', 'Q', 'ş', 'T', 'h', 'C', 'Ö', '.', 'İ', 'Ü', 'K', 'v', 'i', 'I', 'o', 'm', 'H', 'P', ',', 'd', 'ö', 'X', 'B', 'V', 'D', 'R', ':', 'G', 'l', 'y', 'r', 'A', 'M', 'Y', 'N', 'Ş', 'j', 'ğ', 'q', 'g', '7', '2', ' ', 'O', 'c', 'b', 'J', '8', 'Z', '0', 'U', 'ü', '4', 'E', 'L', 'x', '5', 'f', 'W', 'z', '3', '9', 'Ğ', 'F', 'ı', 'u', '1']
let dizi2 = dizi1.slice("").sort(() => Math.random() - 0.5)
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
document.addEventListener("click", function(a) {
    if(a.srcElement.dataset.icon == "wds-ic-send-filled"){
        document.querySelectorAll("p")[1].firstChild.firstChild.nodeValue = degistir(document.querySelectorAll("p")[1].firstChild.firstChild.nodeValue)
    }
})
document.addEventListener("click", function(b) {
    if(b.srcElement.localName == "span"){
        console.log(degistir(b.srcElement.innerText, 0))
    }
})
