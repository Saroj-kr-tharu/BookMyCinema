const QRCode = require('qrcode');


async function genQR(data) {
    try {



        // Generate QR code
       

        // Convert to JSON string
        const qrString = JSON.stringify(data);

        // Generate QR code
        const qrCode = await QRCode.toDataURL(qrString);

        return qrCode;

    } catch (error) {
        console.log('Something went wrong in get role utils (gen Qr)', error);
        throw error;
    }
}

module.exports = genQR;