import { NextResponse } from "next/server";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_CONTACT_WRITE_TOKEN!,
  useCdn: false,
});

type EnquiryFormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body: EnquiryFormValues = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const doc = {
      _type: "enquiry",
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      message: body.message,
      submittedAt: new Date().toISOString(), // optional if initialValue is set
    };

    const result = await client.create(doc);

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
