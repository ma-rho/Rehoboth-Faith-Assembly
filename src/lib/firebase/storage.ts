import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { storage } from '../firebase';

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!file) throw new Error('No file provided for upload.');

  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    const storageRef = ref(storage, `${path}/${Date.now()}_${compressedFile.name}`);
    const snapshot = await uploadBytes(storageRef, compressedFile);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image.');
  }
};