
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { app } from '../firebase';

const storage = getStorage(app);

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  try {
    // Compress the image
    const compressedFile = await imageCompression(file, compressionOptions);

    // Create a storage reference
    const storageRef = ref(storage, `${path}/${Date.now()}_${compressedFile.name}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, compressedFile);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image.');
  }
};
