
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { app } from '../firebase';

// Conditionally initialize storage to handle null `app` during build
let storage: FirebaseStorage | null = null;
if (app) {
  storage = getStorage(app);
}

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const uploadImage = async (file: File, path: string): Promise<string> => {
  // Add a runtime check to ensure storage is initialized
  if (!storage) {
    throw new Error('Firebase Storage is not initialized. Cannot upload image.');
  }

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
