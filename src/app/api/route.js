import { NextResponse } from 'next/server';
// Database
import pool from '../../lib/db';

// To handle a GET request to /api
export async function GET(request) {
    return NextResponse.json({}, { status: 200 });
}