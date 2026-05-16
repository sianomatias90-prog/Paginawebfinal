import { ImagePlus, Trash2, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { deleteUploadedImage, saveUploadedImage } from '../lib/productImages';
import ResolvedImage from './ResolvedImage';

interface ProductImageGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ProductImageGallery({ images, onChange }: ProductImageGalleryProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setError('');
    setUploading(true);
    try {
      const added: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue;
        const url = await saveUploadedImage(file);
        added.push(url);
      }
      if (added.length === 0) {
        setError('Seleccioná archivos de imagen (JPG, PNG, etc.).');
        return;
      }
      onChange([...images, ...added]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir la imagen');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async (url: string) => {
    onChange(images.filter(img => img !== url));
    await deleteUploadedImage(url);
  };

  const setAsMain = (url: string) => {
    onChange([url, ...images.filter(img => img !== url)]);
  };

  return (
    <div className="sm:col-span-2 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-sm text-[#5c5c6e]">Fotos del producto</label>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/15 border border-teal-500/35 text-teal-400 text-sm font-medium hover:bg-teal-500/25 transition-colors disabled:opacity-50"
        >
          <ImagePlus className="w-4 h-4" />
          {uploading ? 'Subiendo...' : 'Cargar fotos'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      <p className="text-xs text-[#8a8a9a]">
        La primera foto es la principal. Podés subir varias y eliminar las que no quieras.
      </p>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((url, index) => (
            <div
              key={url}
              className="relative group rounded-xl overflow-hidden border border-[#1e1e2e] bg-[#1a1a24] aspect-square"
            >
              <ResolvedImage
                src={url}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 0 && (
                <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-teal-500 text-black">
                  Principal
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => setAsMain(url)}
                    title="Usar como principal"
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-amber-500/30 hover:text-amber-300 transition-colors"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  title="Eliminar foto"
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-red-500/40 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="w-full py-10 rounded-xl border-2 border-dashed border-[#1e1e2e] text-[#5c5c6e] hover:border-teal-500/40 hover:text-teal-400 transition-colors text-sm"
        >
          <ImagePlus className="w-8 h-8 mx-auto mb-2 opacity-60" />
          Tocá para cargar fotos
        </button>
      )}
    </div>
  );
}
