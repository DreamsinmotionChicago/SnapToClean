export function isHeic(file: File) {
  const name = file.name.toLowerCase();
  return file.type.includes('heic') || file.type.includes('heif') || name.endsWith('.heic') || name.endsWith('.heif');
}

export async function convertHeicToJpeg(file: File): Promise<File> {
  const heic2any = (await import('heic2any')).default as any;
  const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.85 });
  return new File([blob as Blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' });
}

export async function compressImage(file: File): Promise<File> {
  const imageCompression = (await import('browser-image-compression')).default;
  const compressed = await imageCompression(file, {
    maxSizeMB: 1.2,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.8
  });
  return new File([compressed], file.name, { type: compressed.type });
}
