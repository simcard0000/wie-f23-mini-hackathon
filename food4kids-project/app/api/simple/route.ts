import { spoonacular } from "@/spoonacular";
import { SimpleFoodInfo } from "@/types";
import { NextResponse } from "next/server";

type ResponseData = SimpleFoodInfo;

export async function GET(req: Request): Promise<NextResponse<ResponseData>> {
  const query = new URL(req.url).searchParams.get("id")?.toString() ?? "";
  if (!/^S\d+$/.test(query)) {
    return NextResponse.next({ status: 404 }) as any;
  }
  const id = query.substring(1);

  const data = (await spoonacular(
    "GET",
    `/food/ingredients/${id}/information`,
    {
      amount: "1",
      unit: "serving",
    }
  )) as ResponseData;
  data.id = `S${data.id}`;
  data.quantity = 1;
  return NextResponse.json(data);
}
