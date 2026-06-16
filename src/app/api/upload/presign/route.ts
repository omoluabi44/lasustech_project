import { NextResponse } from 'next/server';
import { generatePresignedUrl } from '@/lib/s3';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('filename');
    const contentType = searchParams.get('contentType');

    if (!fileName || !contentType) {
      return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
    }

    const { presignedUrl, publicUrl } = await generatePresignedUrl(fileName, contentType);

    return NextResponse.json({ presignedUrl, publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Presign error:', error);
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}
