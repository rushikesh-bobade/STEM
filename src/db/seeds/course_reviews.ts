import { db } from '@/db';
import { courseReviews } from '@/db/schema';

async function main() {
    const sampleReviews = [
        // Course 1: Web Development Fundamentals - 3 reviews
        {
            userId: 'student-001',
            courseId: 1,
            rating: 5,
            reviewText: 'This course exceeded my expectations! The instructor explains complex concepts in a clear and easy-to-understand manner. The hands-on projects really helped solidify my understanding of web development fundamentals. Highly recommended for beginners.',
            createdAt: new Date('2025-01-10').getTime(),
            updatedAt: new Date('2025-01-10').getTime(),
        },
        {
            userId: 'student-002',
            courseId: 1,
            rating: 5,
            reviewText: 'Excellent course for anyone starting their web development journey. The curriculum is well-structured and covers all the essential topics. I particularly appreciated the real-world examples and the supportive community.',
            createdAt: new Date('2025-01-12').getTime(),
            updatedAt: new Date('2025-01-12').getTime(),
        },
        {
            userId: 'student-003',
            courseId: 1,
            rating: 4,
            reviewText: 'Great course overall with comprehensive content. The pacing was perfect for me as a complete beginner. The only minor issue was that some video quality could be improved, but the content itself is top-notch.',
            createdAt: new Date('2025-01-15').getTime(),
            updatedAt: new Date('2025-01-15').getTime(),
        },
        // Course 2: Advanced JavaScript Patterns - 3 reviews
        {
            userId: 'student-004',
            courseId: 2,
            rating: 5,
            reviewText: 'This course took my JavaScript skills to the next level. The instructor does an amazing job explaining design patterns and best practices. The code examples are practical and directly applicable to real-world projects. Worth every penny!',
            createdAt: new Date('2025-01-08').getTime(),
            updatedAt: new Date('2025-01-08').getTime(),
        },
        {
            userId: 'student-001',
            courseId: 2,
            rating: 5,
            reviewText: 'Outstanding course on advanced JavaScript concepts. I especially loved the sections on asynchronous programming and functional programming patterns. The instructor has a deep understanding of the subject matter and presents it brilliantly.',
            createdAt: new Date('2025-01-14').getTime(),
            updatedAt: new Date('2025-01-14').getTime(),
        },
        {
            userId: 'student-002',
            courseId: 2,
            rating: 4,
            reviewText: 'Very informative course with excellent coverage of advanced JavaScript topics. The exercises were challenging but rewarding. I would have liked more project-based learning, but overall a solid course for intermediate developers.',
            createdAt: new Date('2025-01-18').getTime(),
            updatedAt: new Date('2025-01-18').getTime(),
        },
        // Course 3: React Complete Guide - 2 reviews
        {
            userId: 'student-003',
            courseId: 3,
            rating: 5,
            reviewText: 'The most comprehensive React course I have ever taken. It covers everything from basics to advanced topics like hooks, context API, and performance optimization. The instructor is engaging and the course content is regularly updated with the latest React features.',
            createdAt: new Date('2025-01-11').getTime(),
            updatedAt: new Date('2025-01-11').getTime(),
        },
        {
            userId: 'student-004',
            courseId: 3,
            rating: 5,
            reviewText: 'Absolutely fantastic course! The project-based approach makes learning React enjoyable and practical. I built several real-world applications throughout the course which gave me the confidence to start my own projects. Highly recommend to anyone serious about learning React.',
            createdAt: new Date('2025-01-16').getTime(),
            updatedAt: new Date('2025-01-16').getTime(),
        },
    ];

    await db.insert(courseReviews).values(sampleReviews);
    
    console.log('✅ Course reviews seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});