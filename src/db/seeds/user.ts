import { db } from '@/db';
import { user } from '@/db/schema';

async function main() {
    const sampleUsers = [
        {
            id: 'admin-001',
            name: 'Admin User',
            email: 'admin@techyguide.com',
            role: 'admin',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-05'),
        },
        {
            id: 'content-admin-001',
            name: 'Content Manager',
            email: 'content@techyguide.com',
            role: 'content_admin',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-10'),
        },
        {
            id: 'instructor-001',
            name: 'John Smith',
            email: 'john@techyguide.com',
            role: 'instructor',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
        },
        {
            id: 'instructor-002',
            name: 'Sarah Johnson',
            email: 'sarah@techyguide.com',
            role: 'instructor',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-20'),
        },
        {
            id: 'student-001',
            name: 'Michael Brown',
            email: 'michael@example.com',
            role: 'student',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-02-01'),
            updatedAt: new Date('2024-02-01'),
        },
        {
            id: 'student-002',
            name: 'Emily Davis',
            email: 'emily@example.com',
            role: 'student',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-02-05'),
            updatedAt: new Date('2024-02-05'),
        },
        {
            id: 'student-003',
            name: 'David Wilson',
            email: 'david@example.com',
            role: 'student',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-02-10'),
            updatedAt: new Date('2024-02-10'),
        },
        {
            id: 'student-004',
            name: 'Lisa Anderson',
            email: 'lisa@example.com',
            role: 'student',
            emailVerified: true,
            image: null,
            createdAt: new Date('2024-02-15'),
            updatedAt: new Date('2024-02-15'),
        },
    ];

    await db.insert(user).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});