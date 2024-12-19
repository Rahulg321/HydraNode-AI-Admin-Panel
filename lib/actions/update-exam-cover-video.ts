"use server";

import { revalidatePath } from "next/cache";

import { headers } from "next/headers";
import db from "@/lib/db";
import { auth } from "@/auth";

export async function UpdateExamCoverVideo(formData: FormData, examId: string) {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "An active session is required to upload video.",
      };
    }

    const fileName = formData.get("fileName") as string;
    const video = formData.get("video") as File;

    console.log(`Uploading video: ${fileName} for exam: ${examId}`);

    const url = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}?${process.env.AZURE_STORAGE_SAS_TOKEN}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": video.type,
      },
      body: video,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    console.log("upload response", response.body, response.blob);

    // https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}

    const videoUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}`;

    await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        coverVideo: videoUrl,
      },
    });

    revalidatePath(`/instructor/${examId}/manage/basics`);
    revalidatePath(`/instructor/exams`);

    return {
      success: true,
      message: "Video uploaded successfully",
      videoUrl,
    };
  } catch (error) {
    console.error("Error uploading video:", error);
    return {
      success: false,
      message: "Failed to upload video",
    };
  }
}
