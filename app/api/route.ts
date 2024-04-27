import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  console.log('route ~ 4: ', request);

  return Response.json({ message: 'Hello' });
}