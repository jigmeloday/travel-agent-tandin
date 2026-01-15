import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_CONTACT_WRITE_TOKEN!,
  useCdn: false,
});

type SubscriptionValues = {
  firstName: string;
  lastName: string;
  email: string;
};

export async function POST(req: Request) {
  try {
    const body: SubscriptionValues = await req.json();

    // Validation
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const doc = {
      _type: 'subscription',
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      submittedAt: new Date().toISOString(),
    };

    const result = await client.create(doc);

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('Error creating subscription:', err);
    return NextResponse.json(
      { error: 'Failed to submit subscription' },
      { status: 500 }
    );
  }
}
