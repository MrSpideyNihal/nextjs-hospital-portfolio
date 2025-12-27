import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Admin from '@/src/models/Admin';
import { generateToken } from '@/src/lib/auth';

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

        // Find admin by username
        const admin = await Admin.findOne({ username: username.toLowerCase() });

        console.log('Login attempt:', { username: username.toLowerCase(), adminFound: !!admin });

        if (!admin) {
            console.log('Admin not found in database');
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        console.log('Admin found, comparing password...');

        // Compare password
        const isMatch = await admin.comparePassword(password);

        console.log('Password match result:', isMatch);

        if (!isMatch) {
            console.log('Password mismatch');
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Generate JWT token
        const token = generateToken({
            userId: admin._id.toString(),
            username: admin.username,
        });

        // Create response with token in cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
            },
        });

        // Set HTTP-only cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: true, // Always use secure in production
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        console.log('Cookie set successfully, token:', token.substring(0, 20) + '...');

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
