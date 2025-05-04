console.log("Hello Script loaded");

// DOM Elements
const generateBtn = document.getElementById("btn1");
const colorPreview = document.getElementById("colorPreview");
const colorName = document.getElementById("colorName");
const rgbValue = document.getElementById("rgbValue");
const hexValue = document.getElementById("hexValue");
const copyHexBtn = document.getElementById("copyHex");
const colorHistory = document.getElementById("colorHistory");
const clickCounter = document.getElementById("times");
const card = document.querySelector('.card');
const colorInfo = document.querySelector('.color-info');

// State
let no_of_clicks = 0;
let colorHistoryArray = [];

// Color array
const colorArray = [
    'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque',
    'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue',
    'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan',
    'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGrey', 'DarkGreen', 'DarkKhaki',
    'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon',
    'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet',
    'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite',
    'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Grey',
    'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory',
    'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue',
    'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGrey', 'LightGreen',
    'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGrey',
    'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon',
    'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen',
    'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed',
    'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy',
    'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod',
    'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru',
    'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown',
    'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue',
    'SlateBlue', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal',
    'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow',
    'YellowGreen'
];

// Convert RGB to HEX
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Get RGB values from color name
function getRGBFromColorName(colorName) {
    const temp = document.createElement('div');
    temp.style.color = colorName;
    document.body.appendChild(temp);
    const rgb = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    return rgb;
}

// Update color history
function updateColorHistory(color) {
    if (colorHistoryArray.length >= 10) {
        colorHistoryArray.shift();
    }
    colorHistoryArray.push(color);
    
    colorHistory.innerHTML = '';
    colorHistoryArray.forEach((color, index) => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box animate__animated animate__fadeIn';
        colorBox.style.backgroundColor = color;
        colorBox.title = color;
        colorBox.addEventListener('click', () => applyColor(color));
        colorHistory.appendChild(colorBox);
    });
}

// Calculate brightness of a color
function getBrightness(rgb) {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Apply color to the page
function applyColor(color) {
    const rgb = getRGBFromColorName(color);
    const hex = rgbToHex(
        parseInt(rgb.match(/\d+/g)[0]),
        parseInt(rgb.match(/\d+/g)[1]),
        parseInt(rgb.match(/\d+/g)[2])
    );

    // Add animation classes
    colorPreview.classList.add('animate__animated', 'animate__pulse');
    colorName.classList.add('animate__animated', 'animate__fadeIn');
    
    // Remove animation classes after animation completes
    setTimeout(() => {
        colorPreview.classList.remove('animate__animated', 'animate__pulse');
        colorName.classList.remove('animate__animated', 'animate__fadeIn');
    }, 1000);

    // Update color information
    colorPreview.style.backgroundColor = color;
    colorName.textContent = color;
    rgbValue.textContent = rgb;
    hexValue.textContent = hex;
    
    // Apply color to the entire page
    document.body.style.backgroundColor = color;
    
    // Update text colors based on background brightness
    const brightness = getBrightness(rgb);
    
    // Always use dark text for the card content
    colorName.style.color = '#333';
    rgbValue.style.color = '#444';
    hexValue.style.color = '#444';
    copyHexBtn.style.color = '#666';
    
    // Update card background opacity based on brightness
    const cardOpacity = brightness > 200 ? 0.98 : 0.95;
    card.style.background = `rgba(255, 255, 255, ${cardOpacity})`;
    colorInfo.style.background = `rgba(255, 255, 255, ${cardOpacity})`;
}

// Copy to clipboard
copyHexBtn.addEventListener('click', () => {
    const hex = hexValue.textContent;
    navigator.clipboard.writeText(hex).then(() => {
        copyHexBtn.classList.add('copied', 'animate__animated', 'animate__bounce');
        setTimeout(() => {
            copyHexBtn.classList.remove('copied', 'animate__animated', 'animate__bounce');
        }, 1000);
    });
});

// Generate new color
function generateNewColor() {
    const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    applyColor(randomColor);
    updateColorHistory(randomColor);
    no_of_clicks++;
    clickCounter.textContent = no_of_clicks;
    
    // Add button animation
    generateBtn.classList.add('animate__animated', 'animate__pulse');
    setTimeout(() => {
        generateBtn.classList.remove('animate__animated', 'animate__pulse');
    }, 1000);
}

// Event Listeners
generateBtn.addEventListener('click', generateNewColor);

// Initialize with a random color
generateNewColor();