const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');
const printerSelectInput = document.querySelector('#printerSelect');


document.addEventListener('DOMContentLoaded', () => {
  const printerSelect = document.getElementById('printerSelect');

  console.log(window.electron)
  getPrinter();
  window.electron.onGetPrinterApp((_name, printer) => {
    // console.log("masuk")
    // console.log(printer)
    // console.log(_name)
    printerSelect.innerHTML = '';
    printer.forEach((printer) => {
      const option = document.createElement('option');
      option.value = printer.name;
      option.text = printer.name;
      printerSelect.appendChild(option);
    });
  })
});


// Load image and show form
function loadImage(e) {
  const file = e.target.files[0];

  // Check if file is an image
  if (!isFileImage(file)) {
    alertError('Please select an image');
    return;
  }

  // Add current height and width to form using the URL API
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  // Show form, image name and output path
  form.style.display = 'block';
  filename.innerHTML = img.files[0].name;
  outputPath.innerText = path.join(os.homedir(), 'imageresizer');
}

// Make sure file is an image
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return file && acceptedImageTypes.includes(file['type']);
}

// Resize image
function printToPrinter(e) {
  e.preventDefault();

  const width = widthInput.value;
  const height = heightInput.value;
  const printer = printerSelectInput.value;
  console.log(printerSelectInput.value)
  ipcRenderer.send('printer:toPrint', {
    // imgPath,
    height,
    width,
    printer
  });
}

function getPrinter(e) {
  ipcRenderer.send('get-printer-app')
}

// When done, show message
ipcRenderer.on('image:done', () =>
  alertSuccess(`Image resized to ${heightInput.value} x ${widthInput.value}`)
);

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center',
    },
  });
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center',
    },
  });
}

// File select listener
// img.addEventListener('change', loadImage);
// Form submit listener
form.addEventListener('submit', printToPrinter);
