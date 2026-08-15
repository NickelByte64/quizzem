import QRCode from 'qrcode';

async function generateQR(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export const QrCodeServices = { generateQR };
