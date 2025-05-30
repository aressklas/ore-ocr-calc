// Handle image paste from clipboard
document.addEventListener('paste', function (event) {
  const items = event.clipboardData.items;
  for (const item of items) {
    if (item.type.indexOf('image') === 0) {
      const file = item.getAsFile();
      if (file) {
        document.getElementById("results").textContent = "Processing pasted image...";
        Tesseract.recognize(file, 'eng', { logger: m => console.log(m) })
          .then(({ data: { text } }) => {
            document.getElementById("extractedText").value = text;
            calculateFromText(text);
          })
          .catch(err => {
            document.getElementById("results").textContent = "OCR Error (pasted): " + err.message;
          });
      }
    }
  }
});
