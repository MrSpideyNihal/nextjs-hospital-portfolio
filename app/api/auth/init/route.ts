import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Admin from '@/src/models/Admin';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: username.toLowerCase() });

        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Admin user already exists' },
                { status: 400 }
            );
        }

        // Create new admin
        const admin = await Admin.create({
            username: username.toLowerCase(),
            password: password, // Will be hashed by the pre-save hook
        });

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully',
            username: admin.username,
        });
    } catch (error: any) {
        console.error('Create admin error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create admin user' },
            { status: 500 }
        );
    }
}
