
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface UnsplashImage {
  id: string;
  url: string;
  thumbUrl: string;
  alt: string;
  author: {
    name: string;
    link: string;
  };
}

interface UnsplashImagePickerProps {
  initialQuery: string;
  onImageSelect: (url: string) => void;
  children: React.ReactNode;
}

const ImagePickerCore = ({ query, onImageSelect, closeDialog }: { query: string, onImageSelect: (url: string) => void, closeDialog: () => void }) => {
  const { data: images, isLoading, error, isError } = useQuery({
    queryKey: ['unsplash-search', query],
    queryFn: async () => {
      if (!query) return [];
      const { data, error } = await supabase.functions.invoke('search-unsplash-images', {
        body: { query }
      });
      if (error) throw new Error(error.message);
      return data as UnsplashImage[];
    },
    enabled: !!query,
  });

  if (isError) {
    toast.error("Fehler beim Laden der Bilder: " + (error as Error).message);
    return <div className="text-red-500 p-4">Bilder konnten nicht geladen werden.</div>;
  }

  const handleSelect = (url: string) => {
    onImageSelect(url);
    closeDialog();
  };

  return (
    <div className="p-4">
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      )}
      {!isLoading && images && images.length === 0 && (
         <div className="text-center text-gray-500 p-8">Keine Bilder für "{query}" gefunden.</div>
      )}
      {images && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
          {images.map(image => (
            <div key={image.id} className="group relative cursor-pointer" onClick={() => handleSelect(image.url)}>
              <img src={image.thumbUrl} alt={image.alt} className="w-full h-32 object-cover rounded-md transition-transform duration-200 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity">
                <p className="text-white opacity-0 group-hover:opacity-100 text-center text-xs p-2">Auswählen</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export const UnsplashImagePicker = ({ initialQuery, onImageSelect, children }: UnsplashImagePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);
  
  useEffect(() => {
      if(isOpen) {
          setSearchQuery(initialQuery);
          setDebouncedQuery(initialQuery);
      }
  }, [isOpen, initialQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Titelbild auswählen</DialogTitle>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Bildersuche auf Unsplash..."
              className="pl-10"
            />
          </div>
        </DialogHeader>
        <ImagePickerCore query={debouncedQuery} onImageSelect={onImageSelect} closeDialog={() => setIsOpen(false)} />
        <DialogFooter>
          <DialogClose asChild>
             <Button variant="outline">Schließen</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
