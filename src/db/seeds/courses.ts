import { db } from '@/db';
import { courses } from '@/db/schema';

async function main() {
    const sampleCourses = [
        {
            title: 'Web Development Fundamentals',
            slug: 'web-development-fundamentals',
            description: 'Learn the essential building blocks of web development including HTML, CSS, and JavaScript. Perfect for beginners who want to start their journey in web development and build their first websites from scratch.',
            instructorId: 'instructor-001',
            category: 'Web Development',
            level: 'beginner',
            price: 4999,
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://www.youtube.com/watch?v=example1',
            durationHours: 20,
            status: 'published',
            createdAt: new Date('2024-10-15').toISOString(),
            updatedAt: new Date('2024-10-15').toISOString(),
        },
        {
            title: 'Advanced JavaScript Patterns',
            slug: 'advanced-javascript-patterns',
            description: 'Master advanced JavaScript concepts including closures, promises, async/await, and design patterns. This course takes your JavaScript skills to the next level with real-world examples and best practices.',
            instructorId: 'instructor-001',
            category: 'Programming',
            level: 'advanced',
            price: 7999,
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://www.youtube.com/watch?v=example2',
            durationHours: 30,
            status: 'published',
            createdAt: new Date('2024-11-01').toISOString(),
            updatedAt: new Date('2024-11-01').toISOString(),
        },
        {
            title: 'React Complete Guide',
            slug: 'react-complete-guide',
            description: 'Comprehensive guide to React covering hooks, state management, routing, and modern React patterns. Build production-ready applications with hands-on projects and learn industry best practices.',
            instructorId: 'instructor-002',
            category: 'Web Development',
            level: 'intermediate',
            price: 5999,
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://www.youtube.com/watch?v=example3',
            durationHours: 25,
            status: 'published',
            createdAt: new Date('2024-11-10').toISOString(),
            updatedAt: new Date('2024-11-10').toISOString(),
        },
        {
            title: 'Python for Data Science',
            slug: 'python-for-data-science',
            description: 'Dive into data science with Python covering NumPy, Pandas, and data visualization. Learn to analyze real-world datasets and create meaningful insights through hands-on data projects.',
            instructorId: 'instructor-002',
            category: 'Data Science',
            level: 'beginner',
            price: 6999,
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://www.youtube.com/watch?v=example4',
            durationHours: 35,
            status: 'published',
            createdAt: new Date('2024-11-20').toISOString(),
            updatedAt: new Date('2024-11-20').toISOString(),
        },
        {
            title: 'UI/UX Design Principles',
            slug: 'ui-ux-design-principles',
            description: 'Master the fundamentals of user interface and user experience design. Learn design thinking, wireframing, prototyping, and how to create intuitive, user-centered designs that delight users.',
            instructorId: 'instructor-001',
            category: 'Design',
            level: 'beginner',
            price: 3999,
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: null,
            durationHours: 15,
            status: 'draft',
            createdAt: new Date('2024-12-01').toISOString(),
            updatedAt: new Date('2024-12-01').toISOString(),
        },
        {
            title: 'Machine Learning Basics',
            slug: 'machine-learning-basics',
            description: 'Introduction to machine learning concepts, algorithms, and practical applications using Python. Build and train your first ML models with scikit-learn and understand the fundamentals of artificial intelligence.',
            instructorId: 'instructor-002',
            category: 'Data Science',
            level: 'intermediate',
            price: 8999,
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://www.youtube.com/watch?v=example6',
            durationHours: 40,
            status: 'published',
            createdAt: new Date('2024-12-10').toISOString(),
            updatedAt: new Date('2024-12-10').toISOString(),
        }
    ];

    await db.insert(courses).values(sampleCourses);
    
    console.log('✅ Courses seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});