import { NextResponse } from 'next/server';
// Database
import pool from '@/lib/db';
// Functions
import { getData, pageRank } from './algortihm';

// To handle a GET request to /api/search
export async function GET(request) {
    try {
        const search = request.query.q;
        getData(search, (rows) => {
            if(rows !== null && rows.length > 0){
                const pagesRecommand = pageRank(rows);
                return NextResponse.json({ result: pagesRecommand }, { status: 200 });
            }else{
                return NextResponse.json({ result: null }, { status: 200 });
            }
        })

    } catch (error) {
        return NextResponse.json({ message: 'Error while fetching data', error }, { status: 500 });
    }
}