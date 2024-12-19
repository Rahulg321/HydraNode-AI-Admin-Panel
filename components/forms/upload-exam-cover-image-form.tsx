"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UpdateExamCoverImage from "@/lib/actions/update-exam-cover-image";
import Image from "next/image";

const UploadExamCoverImageFormSchema = z.object({
  image: z
    //Rest of validations done via react dropzone
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
});

export type UploadExamCoverImageType = z.infer<
  typeof UploadExamCoverImageFormSchema
>;

const UploadExamCoverImageForm = ({
  examId,
  setDialogOpenState,
}: {
  examId: string;
  setDialogOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<UploadExamCoverImageType>({
    resolver: zodResolver(UploadExamCoverImageFormSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (values: UploadExamCoverImageType) => {
    startTransition(async () => {
      try {
        const blobName = `image-${Date.now()}-${values.image.name}`;

        const formData = new FormData();

        formData.append("image", values.image);
        formData.append("fileName", blobName);

        const response = await UpdateExamCoverImage(formData, examId);

        if (response.success) {
          console.log("image uploaded successfully", response.imageUrl);

          toast({
            title: "Image uploaded successfully 🎉",
            variant: "success",
            description: response.message || "Successfully Completed Action",
          });

          setDialogOpenState(false);
        } else {
          toast({
            title: "ERROR 🥲",
            variant: "destructive",
            description: response.message || "Server Side Error Occured",
          });
        }
      } catch (error) {
        console.log("An error occured while trying to upload image", error);
        toast({
          title: "Could not upload image 🥲",
          variant: "destructive",
          description: "An error occured, please try again later!!",
        });
      }

      toast({
        title: `Image uploaded successfully 🎉 ${values.image.name}`,
        variant: "success",
        description: "Successfully Completed Action",
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="mx-auto md:w-1/2">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  Upload your image
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                >
                  {preview && (
                    <Image
                      src={preview as string}
                      alt="Uploaded image"
                      height={500}
                      width={500}
                      className="max-h-[400px] rounded-lg"
                    />
                  )}
                  <ImagePlus
                    className={`size-36 ${preview ? "hidden" : "block"}`}
                  />
                  <Input {...getInputProps()} type="file" />
                  {isDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an image to upload it</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="mx-auto block h-auto rounded-lg"
        >
          {isPending ? "Uploading....." : "Upload"}
        </Button>
      </form>
    </Form>
  );
};

export default UploadExamCoverImageForm;
