var kelimeler = document.querySelectorAll("li")
var ustKelime = document.querySelector("#bulmaca-ust")
var ortaKelime = document.querySelector("#bulmaca-orta")
var altKelime = document.querySelector("#bulmaca-alt")
var altSol = document.querySelector("#alt-sol")
var ilerlemeDurumu = document.querySelector("#ilerleme-durumu")
var path = window.location.pathname
var veriSayfa = path.charAt(11,1)
var kayitVeri = localStorage.getItem(veriSayfa);
var kelimeGoster = document.querySelector("#kelime-goster")
var link = document.querySelectorAll("a")[1].href
var adres = path.charAt(11,1).toUpperCase()
var siralama = kayitVeri || 0
var veri1 = kelimeler[siralama].innerText.split(" / ")[0]
var veri2 = kelimeler[siralama].innerText.split(" / ")[1]
ortaKelime.innerText = veri2
var harfSiralama = 0
var kelimeOnEk = ""
var bekletme = true
var gosterDurum = true


for (let k = 0; k < kelimeler.length; k++) {
    if(kelimeler[k].innerText.split(" / ")[0].split(" ").length > 1){
        console.log(kelimeler[k].innerText.split(" / ")[0]);
    }
}





if(localStorage.getItem(adres) == null){
    localStorage.setItem(adres, 0)
}

ilerlemeDurumu.innerText = adres + " harfi için çözdüğünüz toplam kelime sayısı: " + localStorage.getItem(adres)

if(kayitVeri != null){
    ustKelime.innerText = ""   
    for (let s = 0; s < veri1.length; s++) {
        ustKelime.innerText += "?"   
    }
}
kelimeGoster.innerText = veri1

function kelimeKarma(gelen){
    var karma = gelen.split("").sort(() => Math.random() - 0.5)

    for (let i = 0; i < gelen.length; i++) {
        altKelime.innerHTML += '<div class="butonlar">'+karma[i]+'</div>'        
    } 
}

document.querySelector("#alt-alan").addEventListener("click", (h)=>{
    var gorselSira = h.srcElement.children[0].id
    if(gorselSira == 1 && gosterDurum && bekletme){
        gosterDurum = false
        kelimeGoster.style.opacity = 1
        setTimeout(() => {
            kelimeGoster.style.opacity = 0
            gosterDurum = true
        }, 1200);
    }
    if(gorselSira == 2){
        kelimeOnEk = ""
        siralama = 0
        localStorage.setItem(veriSayfa, 0)
        harfSiralama = 0
        ustKelime.innerText = ""
        veri1 = kelimeler[siralama].innerText.split(" / ")[0]
        kelimeGoster.innerText = veri1
        for (let b = 0; b < kelimeler[0].innerText.split(" / ")[0].length; b++) {
            ustKelime.innerText += "?"    
        }
        ortaKelime.innerText = kelimeler[0].innerText.split(" / ")[1]
        altSol.innerText = adres + " 1/"+kelimeler.length
        altKelime.innerHTML = ""
        kelimeKarma(kelimeler[0].innerText.split(" / ")[0])
        bekletme = true

        
    }


    h.srcElement.children[0].style.backgroundColor = "#889a9a";
    setTimeout(() => {
        h.srcElement.children[0].style.backgroundColor = "#d8f4f4";
    }, 200);
})

var guncel = parseInt(siralama)+1
altSol.innerText = adres + " " + guncel +"/"+kelimeler.length

kelimeKarma(veri1)

altKelime.addEventListener("click", (e)=>{


    if(e.srcElement.innerText == veri1[harfSiralama] && e.srcElement.className == "butonlar" && bekletme){
        
        e.srcElement.innerText = ""
        e.srcElement.style.backgroundColor = "#c7b49b";
        kelimeOnEk += veri1[harfSiralama]
        harfSiralama++
        ustKelime.innerText = "" 
        ustKelime.innerText = kelimeOnEk

        for (let k = 0; k < veri1.length-harfSiralama; k++) {
            ustKelime.innerText += "?"            
        }
    }
    if(e.srcElement.innerText != "" && e.srcElement.className == "butonlar"){
        e.srcElement.style.backgroundColor = "#ab4c5f"
        setTimeout(() => {
            e.srcElement.style.backgroundColor = "#d8f4f4"
        }, 500);
    }
    

    if(veri1.length == harfSiralama && kelimeler.length != siralama+1 && e.srcElement.className == "butonlar" && bekletme){
        bekletme = false
        setTimeout(() => {
            altKelime.innerHTML = ""
            ustKelime.innerText = ""
            kelimeOnEk = ""
            harfSiralama = 0
            siralama++        
            veri1 = kelimeler[siralama].innerText.split(" / ")[0]           
            localStorage.setItem(veriSayfa, siralama);
            altSol.innerText = `${adres} ${siralama+1}/${kelimeler.length}`
            kelimeGoster.innerText = veri1
            for (let k2 = 0; k2 < veri1.length; k2++) {
                ustKelime.innerText += "?"            
            }
            kelimeKarma(veri1)
            ortaKelime.innerText = kelimeler[siralama].innerText.split(" / ")[1]
            bekletme = true
            localStorage.setItem(adres, parseInt(localStorage.getItem(adres))+1)
            ilerlemeDurumu.innerText = adres + " harfi için çözdüğünüz toplam kelime sayısı: " + localStorage.getItem(adres)
        }, 1200);      
    }

    if(harfSiralama == veri1.length && kelimeler.length == siralama+1){
        bekletme = false
        altSol.innerText = `${adres} ${siralama+1}/${kelimeler.length}`
        localStorage.setItem(veriSayfa, 0)
        siralama = 0
        if(adres != "Y"){
            setTimeout(() => {
                ustKelime.innerText = "Tebrikler!"
                ortaKelime.innerText = "Bu bölümü bitirdiniz."
                altKelime.innerHTML = `Bir sonraki harfe geçmek için <a href="${link}">buraya </a> tıklayınız.`
            }, 1200); 
        }
        if(adres == "Y"){
            setTimeout(() => {
                ustKelime.innerText = "Tebrikler!"
                ortaKelime.innerText = "Tüm bölümleri bitirdiniz."
                altKelime.innerHTML = `İlk harfe geçmek için <a href="a-harfi-kelimeler.html">buraya </a> tıklayınız.`
            }, 1200); 
        }       
    }
})