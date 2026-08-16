import QRCode from 'qrcode';

async function generateQR(text: string): Promise<string | undefined> {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('error generating qrcode', err);
  }
}

export const QrCodeServices = { generateQR };
