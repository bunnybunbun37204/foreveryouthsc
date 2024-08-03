import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const db = getFirestore(app);
const foreveryouthRef = db.collection("foreveryouth-rpkm");
const auth = getAuth(app);

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("image_url")?.toString();

  if (!description || !imageUrl) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find user", {
      status: 404,
    });
  }

  try {
    const user = await auth.getUser(params.id ?? "");
    await foreveryouthRef.doc(params.id).create({
      description: description,
      image_url: imageUrl,
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
    return new Response("Cannot find user", {
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