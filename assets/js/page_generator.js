const mobileUserAgents = [
  "Android",
  "webOS",
  "iPhone",
  "iPad",
  "iPod",
  "BlackBerry",
  "Windows Phone",
  "Opera Mini",
  "IEMobile",
  "Mobile"
];

const isMobile = mobileUserAgents.some(agent => navigator.userAgent.includes(agent));

if (!isMobile){
  document.body.innerHTML = "<h5 align='center'>Please open this page on your mobile device.</h5>";
}

// Get references to form elements and toast notification
const [imageInput, nameInput, emailInput, aboutInput, toast] = [
  document.getElementById("image-input"), // File input for profile image
  document.getElementById("name-input"), // Input for user name
  document.getElementById("email-input"), // Input for user email
  document.getElementById("about-input"), // Textarea for about section
  document.querySelector(".toast"), // Toast notification element
];

const form = document.getElementById("profile-form"); // Profile form

// Handle image input change event
imageInput.addEventListener("change", () => {
  const imageLabel = document.getElementById("image-label");
  try {
    // Show selected file name and set label background to green
    imageLabel.textContent = imageInput.files[0].name;
    imageLabel.style.backgroundColor = "green";
  } catch (e) {
    // If no file selected, reset label
    imageLabel.textContent = "Choose your image";
    imageLabel.style.backgroundColor = "red";
  }
});

const loveQuotes = [
  "Even after all this time, the sun never says to the earth, 'You owe me.' — Hafiz",
  "With life as short as a half-taken breath, don't plant anything but love. — Rumi",
  "The minute I heard my first love story, I started looking for you. — Rumi",
  "I wish I could show you when you are lonely or in darkness the astonishing light of your own being. — Hafiz",
  "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray. — Rumi",
  "Love is the bridge between you and everything. — Rumi",
  "We are born of love; Love is our mother. — Rumi",
  "You are the soul of the soul of the universe, and your name is Love. — Rumi",
  "The way to love anything is to realize that it may be lost. — G.K. Chesterton",
  "Love looks not with the eyes, but with the mind. — William Shakespeare",
  "I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love. — Gabriel García Márquez",
  "Whatever our souls are made of, his and mine are the same. — Emily Brontë",
  "You have bewitched me, body and soul, and I love, I love, I love you. — Jane Austen",
  "Love does not consist in gazing at each other, but in looking outward together in the same direction. — Antoine de Saint-Exupéry",
  "To love and be loved is to feel the sun from both sides. — David Viscott",
];

const textGenerator = document.querySelector(".text-generator");

textGenerator.addEventListener("click", () => {
  aboutInput.textContent =
    loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
});

// Handle form submission
form.onsubmit = (e) => {
  e.preventDefault(); // Prevent default form submission
  // Check if all fields are filled
  if (
    imageInput.files.length !== 0 &&
    nameInput.value &&
    emailInput.value &&
    aboutInput.value
  ) {
    // Validate email format
    const regex = new RegExp(/^[\w.-]+@[\w.-]+\.\w{1,10}$/);
    const result = regex.test(emailInput.value);
    if (result) {
      // Show success toast if email is valid
      Toastify({
        text: "Generated successfully",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
      const card = document.getElementById("card-template");
      const app = document.querySelector(".app");
      app.innerHTML = card.innerHTML;

      const cardTitle = document.querySelector(".card-title");
      const cardImg = document.querySelector(".card-img");
      const cardContent = document.querySelector(".card-content");

      cardTitle.children[0].textContent = nameInput.value;
      cardTitle.children[1].textContent = emailInput.value;
      cardImg.children[0].src = URL.createObjectURL(imageInput.files[0]);
      cardContent.children[0].textContent = aboutInput.value;

    } else {
      // Show error toast if email is invalid
      Toastify({
        text: "Email is invalid",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff0000, #ff7f00)",
        },
        onClick: function () {},
      }).showToast();
    }
  } else {
    // Show error toast if any field is missing
    Toastify({
      text: "Please fill all fields",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff0000, #ff7f00)",
      },
      onClick: function () {},
    }).showToast();
  }
};
