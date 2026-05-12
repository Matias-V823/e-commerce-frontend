import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const transactionDate = searchParams.get("transactionDate")
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions?transactionDate=${transactionDate}`
    
    const req = await fetch(url, {
        cache: "no-store",
    })
    const res = await req.json()
    return Response.json(res)
}