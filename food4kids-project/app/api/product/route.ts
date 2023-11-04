import { spoonacular } from "@/spoonacular";
import { ProductInfo } from "@/types";
import { NextResponse } from "next/server";

type ResponseData = ProductInfo;

export async function GET(req: Request): Promise<NextResponse<ResponseData>> {
  const query = new URL(req.url).searchParams.get("id")?.toString() ?? "";
  if (!/^P\d+$/.test(query)) {
    return NextResponse.next({ status: 404 }) as any;
  }
  const id = query.substring(1);

  const data = (await spoonacular(
    "GET",
    `/food/products/${id}`
  )) as ResponseData;
  data.id = `P${data.id}`;
  data.quantity = 1;
  return NextResponse.json(data);
}
