import { CloudUpload, Edit, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import { ResponseEventDTO } from '@/gen/data-contracts';
import { useUploadImageEventMutation } from '@/queries/hooks/event';

interface EditBannerDialogProps {
  event: ResponseEventDTO;
}

const EditBannerDialog: FC<EditBannerDialogProps> = ({ event }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const uploadImageMutation = useUploadImageEventMutation();

  const onSubmit = async () => {
    if (files.length === 0) {
      toast.error('Please select an image to upload.');
      return;
    }

    const uploadImagePromise = uploadImageMutation.mutateAsync({
      id: event.id,
      Image: files[0],
    });

    toast.promise(uploadImagePromise, {
      loading: 'Uploading image...',
      success: 'Image successfully uploaded!',
      error: 'Failed to upload image.',
    });

    uploadImagePromise.then(() => {
      router.refresh();
      setOpen(false);
    });
  };

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message);
  }, []);

  useEffect(() => {
    if (open) setFiles([]);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label="Edit image"
          className="hover:bg-secondary"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FileUpload
          value={files}
          onValueChange={setFiles}
          accept="image/*"
          maxFiles={1}
          maxSize={5 * 1024 * 1024}
          onFileReject={onFileReject}
        >
          <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
            <CloudUpload className="size-4" />
            Drag and drop or
            <FileUploadTrigger asChild>
              <Button variant="link" size="sm" className="p-0">
                choose files
              </Button>
            </FileUploadTrigger>
            to upload
          </FileUploadDropzone>
          <FileUploadList>
            {files.map(file => (
              <FileUploadItem key={file.name} value={file}>
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
        <DialogFooter>
          <Button type="button" onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBannerDialog;
