
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
async function printToPrinter(e) {
  e.preventDefault();
  console.log(printerSelectInput.value)
  console.log(ipcRenderer)
  const width = widthInput.value;
  const height = heightInput.value;
  const printer = printerSelectInput.value;
  const base64pdf = await getHTML()

  await window.electron.print({
    // imgPath,
    height,
    width,
    printer,
    base64pdf
  });
}

async function getHTML(location) {
  const htmlString = await window.electron.getHTML("./renderer/report/invoice.html");
  console.log(htmlString)
  const jsPDF = window.jspdf.jsPDF
  let doc = new jsPDF({
      orientation: 'portrait',
      unit: "mm",
      format: [210, 297]
  });

  let div = document.getElementsByClassName("invoice")[0];

  await doc.html(
      div,
      {
        margin: 15,
        width: 210,
        windowWidth: 786,
        html2canvas: {
          width: 210,
          scale: 0.2,

        }
      }
  );
  const base64pdf = doc.output("datauri")
  return base64pdf
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
