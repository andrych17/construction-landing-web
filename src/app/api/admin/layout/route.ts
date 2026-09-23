import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';
import { readLayoutResponse, writeLayoutResponse } from '@/lib/layout-api';

export async function GET() {
  try {
    await requireAdmin();
    return await readLayoutResponse('home');
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    return await writeLayoutResponse('home', await request.json());
  } catch (error) {
    return handleApiError(error);
  }
}
