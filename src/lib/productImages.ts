const DB_NAME = 'mas3d-images';
const DB_VERSION = 1;
const STORE = 'blobs';
const UPLOAD_PREFIX = 'upload://';
const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.85;
const MAX_FILE_MB = 8;

const memoryCache = new Map<string, string>();

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
  });
}

function idbPut(id: string, dataUrl: string): Promise<void> {
  return openDb().then(
    db =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.objectStore(STORE).put(dataUrl, id);
      }),
  );
}

function idbGet(id: string): Promise<string | undefined> {
  return openDb().then(
    db =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).get(id);
        req.onsuccess = () => resolve(req.result as string | undefined);
        req.onerror = () => reject(req.error);
      }),
  );
}

function idbDelete(id: string): Promise<void> {
  return openDb().then(
    db =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.objectStore(STORE).delete(id);
      }),
  );
}

export function isUploadUrl(url: string): boolean {
  return url.startsWith(UPLOAD_PREFIX);
}

function uploadId(url: string): string {
  return url.slice(UPLOAD_PREFIX.length);
}

export async function resolveImageUrl(url: string): Promise<string> {
  if (!url) return '';
  if (!isUploadUrl(url)) return url;
  if (memoryCache.has(url)) return memoryCache.get(url)!;
  const data = await idbGet(uploadId(url));
  if (data) memoryCache.set(url, data);
  return data || '';
}

export function invalidateImageCache(url: string): void {
  memoryCache.delete(url);
}

async function compressImage(file: File): Promise<string> {
  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    throw new Error(`La imagen supera ${MAX_FILE_MB} MB. Usá un archivo más liviano.`);
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.readAsDataURL(file);
  });

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      const maxEdge = Math.max(width, height);
      if (maxEdge > MAX_EDGE) {
        const scale = MAX_EDGE / maxEdge;
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No se pudo procesar la imagen'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };
    img.onerror = () => reject(new Error('Formato de imagen no válido'));
    img.src = dataUrl;
  });
}

export async function saveUploadedImage(file: File): Promise<string> {
  const dataUrl = await compressImage(file);
  const id = `img-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const virtualUrl = `${UPLOAD_PREFIX}${id}`;
  await idbPut(id, dataUrl);
  memoryCache.set(virtualUrl, dataUrl);
  return virtualUrl;
}

export async function deleteUploadedImage(url: string): Promise<void> {
  if (!isUploadUrl(url)) return;
  invalidateImageCache(url);
  await idbDelete(uploadId(url));
}

export async function cleanupProductImages(urls: string[]): Promise<void> {
  await Promise.all(urls.filter(isUploadUrl).map(deleteUploadedImage));
}
