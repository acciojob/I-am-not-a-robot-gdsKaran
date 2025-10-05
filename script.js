//your code here
//your code here

const images = ["img1", "img2", "img3", "img4", "img5"];

// 1️⃣ Pick a random image to duplicate
const duplicateIndex = Math.floor(Math.random() * images.length);
const duplicateImage = images[duplicateIndex];
const allImages = [...images, duplicateImage];

// 2️⃣ Shuffle the images randomly
const shuffledImages = allImages.sort(() => Math.random() - 0.5);

// 3️⃣ Create and display the images inside main
const main = document.querySelector("main");
const flexDiv = document.createElement("div");
flexDiv.classList.add("flex");
main.appendChild(flexDiv);

// Message
const message = document.createElement("h3");
message.id = "h";
message.textContent =
  "Please click on the identical tiles to verify that you are not a robot.";
main.insertBefore(message, flexDiv);

// Container for result message
const para = document.createElement("p");
para.id = "para";
main.appendChild(para);

// 4️⃣ Render shuffled images
shuffledImages.forEach((cls, index) => {
  const img = document.createElement("img");
  img.classList.add(cls);
  img.id = "img" + index;
  flexDiv.appendChild(img);
});

// 5️⃣ Create Reset and Verify buttons (initially hidden)
const resetBtn = document.createElement("button");
resetBtn.id = "reset";
resetBtn.textContent = "Reset";
resetBtn.style.display = "none";
main.appendChild(resetBtn);

const verifyBtn = document.createElement("button");
verifyBtn.id = "verify";
verifyBtn.textContent = "Verify";
verifyBtn.style.display = "none";
main.appendChild(verifyBtn);

// 6️⃣ Track clicks
let selectedImages = [];

function resetState() {
  selectedImages = [];
  document.querySelectorAll("img").forEach((img) => {
    img.classList.remove("selected");
  });
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = "";
  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
}

// 7️⃣ Handle image click
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("click", () => {
    // show reset button on first click
    resetBtn.style.display = "block";

    // prevent selecting same image twice
    if (selectedImages.includes(img)) return;

    // add highlight
    img.classList.add("selected");
    selectedImages.push(img);

    // allow only two selections
    if (selectedImages.length === 2) {
      verifyBtn.style.display = "block";
    } else if (selectedImages.length > 2) {
      // don't allow more than 2 selections
      selectedImages.pop();
    }
  });
});

// 8️⃣ Handle reset button
resetBtn.addEventListener("click", resetState);

// 9️⃣ Handle verify button
verifyBtn.addEventListener("click", () => {
  const [first, second] = selectedImages;
  verifyBtn.style.display = "none";

  if (first.className === second.className) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
