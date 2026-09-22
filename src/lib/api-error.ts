import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { UnauthorizedError, ForbiddenError } from '@/lib/auth';

export function handleApiError(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  if (error instanceof ForbiddenError) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'Data tidak valid.', details: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })) },
      { status: 422 }
    );
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: 'Body JSON tidak valid.' }, { status: 400 });
  }
  console.error(error);
  return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
}
