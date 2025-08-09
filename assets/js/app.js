// Get canvas and context for drawing
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height

// Number of snowflakes
const snowCount = 300;

// Array to hold snowflake objects
const snowflakes = [];

// Possible colors for snowflakes
const colors = [
  "red",
  "green",
  "blue",
  "purple",
  "yellow",
  "pink",
  "aqua",
  "rgb(0,110,255)",
];

// Initialize snowflakes with random properties
for (let i = 0; i < snowCount; i++) {
  snowflakes.push({
    x: Math.random() * canvas.width, // Random x position
    y: Math.random() * canvas.height, // Random y position
    color: colors[Math.floor(Math.random() * colors.length)], // Random color
    radius: Math.random() * 4 + 1, // Random radius
    speed: Math.random() * 1 + 0.5, // Random speed
  });
}

// Update canvas size on window resize
window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// Function to animate snowflakes
const snow = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  for (let flake of snowflakes) {
    flake.y += flake.speed; // Move flake down
    flake.radius += 0.05; // Gradually increase radius
    ctx.beginPath();
    ctx.fillStyle = flake.color;
    ctx.arc(flake.x, flake.y, flake.radius, 0, 2 * Math.PI);
    ctx.fill();

    // Reset flake to top if it goes out of view
    if (flake.y >= canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
    // Reset radius if it gets too big
    if (flake.radius >= 10) {
      flake.radius = 0;
    }
  }
  requestAnimationFrame(snow); // Continue animation
};

// Color object for animated background
const color = { r: 0, g: 0, b: 0 };
const speed = { r: 0.9, g: 0.5, b: 0.5 };

// Function to animate background color
const bgcolor = () => {
  document.body.style.backgroundColor = `rgb(${Math.round(
    color.r
  )},${Math.round(color.g)},${Math.round(color.b)})`;

  color.r += speed.r;
  if (color.r >= 255 || color.r <= 0) speed.r *= -1;

  color.g += speed.g;
  if (color.g >= 255 || color.g <= 0) speed.g *= -1;

  color.b += speed.b;
  if (color.b >= 255 || color.b <= 0) speed.b *= -1;

  requestAnimationFrame(bgcolor); // Continue animation
};

// Start background color animation
bgcolor();

// Start snow animation
snow();

// Try to generate a QR code if .qrcode element exists
try {
  new QRCode(document.querySelector(".qrcode"), {
    text: "topprog.ir", // QR code content
    with: 100, // (typo: should be width)
    height: 200, // QR code height
    colorDark: "#000000", // QR code color
  });
} catch (e) {}
