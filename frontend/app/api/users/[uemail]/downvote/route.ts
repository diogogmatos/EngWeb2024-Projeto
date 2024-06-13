import connectMongo from '@/lib/mongoose';
import * as UserController from '@/controllers/User';
import * as ResourceController from '@/controllers/Resource';
import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { uemail: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ status: HttpStatusCode.Unauthorized });
    }

    if (!params.uemail) {
      return NextResponse.json(
        { message: 'No user email provided' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    if (session.user.email !== params.uemail) {
      return NextResponse.json({ status: HttpStatusCode.Unauthorized });
    }

    await connectMongo();

    const body = (await req.json()) as { resourceId: string };
    const res: unknown = await ResourceController.get(body.resourceId);

    if (!res) {
      return NextResponse.json(
        { message: 'Resource does not exist' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    await UserController.addDownvote(params.uemail, body.resourceId);

    return NextResponse.json(
      { message: 'Downvote added' },
      { status: HttpStatusCode.Ok },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error as Error },
      { status: HttpStatusCode.BadRequest },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { uemail: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ status: HttpStatusCode.Unauthorized });
    }

    if (!params.uemail) {
      return NextResponse.json(
        { message: 'No user email provided' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    if (session.user.email !== params.uemail) {
      return NextResponse.json({ status: HttpStatusCode.Unauthorized });
    }

    await connectMongo();

    const body = (await req.json()) as { resourceId: string };
    const res: unknown = await ResourceController.get(body.resourceId);

    if (!res) {
      return NextResponse.json(
        { message: 'Resource does not exist' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    await UserController.removeDownvote(params.uemail, body.resourceId);

    return NextResponse.json(
      { message: 'Downvote removed' },
      { status: HttpStatusCode.Ok },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error as Error },
      { status: HttpStatusCode.BadRequest },
    );
  }
}
