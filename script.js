async function handleSubmit() {
  const query = document.querySelector("#Query").value;
  const height = document.querySelector("#height").value;
  const width = document.querySelector("#width").value;
  const image = document.querySelector("#image-out");
  const cover = document.querySelector("#cover");
  const load_cover = document.querySelector("#load-cover");

  const downloadButton = document.querySelector("#download-button");
  try {
    cover.style.display = "none";
    load_cover.style.display = "flex";
    const response = await fetch(
      `https://source.unsplash.com/${width}x${height}/?${query}`
    );
    if (response.ok) {
      load_cover.style.display = "none";
      cover.style.display = "flex";
      image.src = response.url;
      downloadButton.href = response.url;
      downloadButton.setAttribute("download", "image.jpg"); // Set the desired file name
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

const downloadButton = document.querySelector("#download-button");
downloadButton.addEventListener("click", (e) => {
  const image = document.querySelector("#image-out");
  const fileName = "image.jpg"; // Change the file name if needed
  downloadImage(image.src, fileName);
});

function downloadImage(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => console.error("Error:", error));
}
