(function () {
  const camera = document.querySelector("video");

  if (!camera) return;

  let barcodeDetector = new BarcodeDetector({
    formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
  });

  const scanBarcode = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
    });
    camera.srcObject = stream;
    await camera.play();

    window.setInterval(async () => {
      const barcodes = await barcodeDetector.detect(camera);

      if (barcodes.length <= 0) return;

      window.location.replace(`${window.location.origin}/product/${barcodes[0].rawValue}`);
    }, 1000);
  };

  scanBarcode();
})();
