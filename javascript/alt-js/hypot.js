const canvas = document.getElementById('canvasAlan')
const ctx = canvas.getContext('2d')
const bilgiDiv = document.getElementById('bilgi')
const oynatButton = document.getElementById('oynatButton')
canvas.width = window.innerWidth * 0.8
canvas.height = 300
let daireCap, daireYaricap, daire1Baslangic, daire2Baslangic, daire1, daire2, temasOldu = false, animasyonDevamEdiyor = false
let tekrarB = true

function yenidenBaslat() {
    daireCap = canvas.width / 10
    daireCap *= 0.5
    daireYaricap = daireCap / 2
    daire1Baslangic = { x: daireYaricap + 15, y: Math.random() * (canvas.height - daireCap) + daireYaricap }
    daire2Baslangic = { x: canvas.width - daireYaricap - 15, y: Math.random() * (canvas.height - daireCap) + daireYaricap}
    daire1 = { ...daire1Baslangic }
    daire2 = { ...daire2Baslangic }
    temasOldu = false
    animasyonDevamEdiyor = false
}

function cizDaire(daire, renk) {
    ctx.beginPath()
    ctx.arc(daire.x, daire.y, daireYaricap, 0, 2 * Math.PI)
    ctx.fillStyle = renk
    ctx.fill()
    ctx.stroke()
}

function bilgileriGoster() {
    const dx = daire2.x - daire1.x
    const dy = daire2.y - daire1.y
    let mesafe = Math.hypot(dx, dy)
    mesafe -= daireCap
    let temasEdiyor = mesafe <= 0
    temasOldu = temasEdiyor
    let tk = !temasEdiyor ? "Mesafe var.." : "Çarpışma gerçekleşti."
    bilgiDiv.innerHTML = `
        Daire1: x = ${daire1.x.toFixed(2)}, y = ${daire1.y.toFixed(2)}<br>
        Daire2: x = ${daire2.x.toFixed(2)}, y = ${daire2.y.toFixed(2)}<br>
        Hypot Mesafe: ${mesafe.toFixed(2)}<br>
        ${tk}`
}

function animasyon() {
    if (!animasyonDevamEdiyor) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const dx = daire2.x - daire1.x
    const dy = daire2.y - daire1.y
    let mesafe = Math.hypot(dx, dy)
    mesafe -= daireCap

    if (mesafe > 0) {
        const hareketMiktari = Math.min(mesafe, 1)
        const hareketX = dx / Math.hypot(dx, dy) * hareketMiktari
        const hareketY = dy / Math.hypot(dx, dy) * hareketMiktari
        daire1.x += hareketX
        daire1.y += hareketY
        daire2.x -= hareketX
        daire2.y -= hareketY
    } else {
        animasyonDevamEdiyor = false
    }

    cizDaire(daire1, 'red')
    cizDaire(daire2, 'blue')
    bilgileriGoster()

    if (animasyonDevamEdiyor) {
        requestAnimationFrame(animasyon)
    }
}

oynatButton.addEventListener('click', () => {
    if (temasOldu) {
        yenidenBaslat()
    }
    animasyonDevamEdiyor = true
    animasyon()
    
})

yenidenBaslat()
cizDaire(daire1, 'red')
cizDaire(daire2, 'blue')
bilgileriGoster()