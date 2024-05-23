import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { Buffer } from "buffer"; // Import buffer
import { getAuth } from "firebase-admin/auth";

const db = getFirestore(app);
const foreveryouthRef = db.collection("foreveryouth");
const auth = getAuth(app);

interface UploadResponse {
  key: string;
}

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const description = formData.get("description")?.toString();
  const imageFile = formData.get("image") as File | null;

  if (!imageFile) {
    return new Response("Missing image file", {
      status: 400,
    });
  }

  // Read file and convert to base64
  const arrayBuffer = await imageFile.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const user = await auth.getUser(params.id ?? "");
  const response = await fetch(
    "https://smo-api.bunyawatapp37204.workers.dev/images/upload",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: base64Image,
        width: 300,
        height: 300,
      }),
    }
  );
  const jsonData: unknown = await response.json();
  const _data = jsonData as UploadResponse;
  const img =
    "https://smo-api.bunyawatapp37204.workers.dev/images/" + _data.key;
  if (!description) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find friend", {
      status: 404,
    });
  }

  try {
    await foreveryouthRef.doc(params.id).create({
      description: description,
      image_url: img,
      email: user.email,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return redirect("/view");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find friend", {
      status: 404,
    });
  }

  try {
    await foreveryouthRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return redirect("/view");
};
