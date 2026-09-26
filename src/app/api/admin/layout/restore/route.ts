import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';
import { restoreLayoutResponse } from '@/lib/layout-api';

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const body = await request.json().catch(() => ({}));
    const index = typeof body.index === 'number' && body.index >= 0 ? body.index : 0;
    return await restoreLayoutResponse('home', index, session.name);
  } catch (error) {
    return handleApiError(error);
  }
}
