const form = document.getElementById("color-form")
const colorInput = document.getElementById("colorpicker")
const schemeSelect = document.getElementById("scheme")
const palette = document.getElementById("color-palette")

const defaultColors = [
  "#F55A5A",
  "#2B283A",
  "#FBF3AB",
  "#AAD1B6",
  "#A626D3"
]

function renderPalette(colors) {
  palette.innerHTML = ""

  colors.forEach((color) => {
    const div = document.createElement("div")
    div.classList.add("color-box")
    div.innerHTML = `<div class="color" style="background:${color}" data-color="${color}">${color}</div>`

    palette.appendChild(div)
  })

  document.querySelectorAll("[data-color]").forEach(el => {
    el.addEventListener("click", () => {
      const hex = el.getAttribute("data-color")
      navigator.clipboard.writeText(hex)
    })
  })
}

function fetchColors(baseColor, scheme) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${scheme}&count=5`)
    .then(res => res.json())
    .then(data => {
      const colors = data.colors.map(c => c.hex.value)
      renderPalette(colors)
    })
    .catch(err => console.log("Error fetching colors:", err))
}

form.addEventListener("submit", function (e) {
  e.preventDefault()
  const baseColor = colorInput.value.slice(1)
  const scheme = schemeSelect.value
  fetchColors(baseColor, scheme)
})

window.addEventListener("DOMContentLoaded", function () {
  renderPalette(defaultColors)
})

