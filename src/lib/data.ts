export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type: "hardware" | "course" | "bundle";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: "sale" | "new" | "bestseller";
}

export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  rating: number;
  badge?: "bestseller" | "new" | "sale";
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "IoT Smart Home Starter Kit",
    description: "Build your own automated home system with sensors, relays, and a...",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Robotics Kits",
    type: "hardware",
    rating: 4.5,
    reviewCount: 42,
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Python for Robotics Masterclass",
    description: "20 hours of video content teaching you how to code autonomous...",
    price: 49.99,
    originalPrice: 120.0,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    category: "Online Courses",
    type: "course",
    rating: 5.0,
    reviewCount: 128,
    inStock: true,
  },
  {
    id: "prod-3",
    name: "AI Vision Sensor Module",
    description: "High-performance camera module with on-board object detection...",
    price: 35.5,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    category: "Sensors",
    type: "hardware",
    rating: 4.0,
    reviewCount: 15,
    inStock: true,
    badge: "sale",
  },
  {
    id: "prod-4",
    name: "6-Axis Robotic Arm Kit",
    description: "Programmable desktop robotic arm. Supports Python, C++, and block...",
    price: 299.0,
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=400&h=300&fit=crop",
    category: "Robotics Kits",
    type: "hardware",
    rating: 5.0,
    reviewCount: 56,
    inStock: true,
  },
  {
    id: "prod-5",
    name: "DIY Quadcopter Drone",
    description: "Assemble and program your own drone. Includes gyroscope and...",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
    category: "Robotics Kits",
    type: "hardware",
    rating: 4.5,
    reviewCount: 8,
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Neural Networks for Beginners",
    description: "Understand the math and logic behind modern AI. No heavy...",
    price: 39.0,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    category: "Online Courses",
    type: "course",
    rating: 4.8,
    reviewCount: 210,
    inStock: true,
  },
  {
    id: "prod-7",
    name: "Arduino Starter Kit v2",
    description: "Complete Arduino kit with sensors, LEDs, motors and comprehensive guide.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop",
    category: "Microcontrollers",
    type: "hardware",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "prod-8",
    name: "Raspberry Pi Learning Bundle",
    description: "Raspberry Pi 4 with accessories and learning materials.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop",
    category: "Microcontrollers",
    type: "bundle",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    badge: "new",
  },
];

export const courses: Course[] = [
  {
    id: "course-1",
    name: "Introduction to Neural Networks",
    description: "Master the fundamentals of AI. Build your first neural network fro...",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    category: "AI & ML",
    level: "beginner",
    rating: 4.8,
    badge: "bestseller",
  },
  {
    id: "course-2",
    name: "Advanced Drone Physics",
    description: "Deep dive into aerodynamics, PID controllers, and autonomous navigation.",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=300&fit=crop",
    category: "Robotics",
    level: "advanced",
    rating: 5.0,
    badge: "new",
  },
  {
    id: "course-3",
    name: "Web3 Development Bootcamp",
    description: "Learn Solidity, smart contracts, and build your own decentralized...",
    price: 89.0,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    category: "Blockchain",
    level: "intermediate",
    rating: 4.2,
  },
  {
    id: "course-4",
    name: "Python for Data Analysis",
    description: "Clean, visualize, and analyze complex datasets using Pandas and Matplotlib.",
    price: 59.0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    category: "Data Science",
    level: "intermediate",
    rating: 4.6,
  },
  {
    id: "course-5",
    name: "Arduino Masters",
    description: "Get hands-on with electronics. Program microcontrollers to interact with the world.",
    price: 35.0,
    originalPrice: 45.0,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    category: "Hardware",
    level: "beginner",
    rating: 4.9,
    badge: "sale",
  },
  {
    id: "course-6",
    name: "Ethical Hacking & Cyber Sec",
    description: "Understand network security, penetration testing, and how to...",
    price: 75.0,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    category: "Security",
    level: "advanced",
    rating: 4.7,
  },
];

export const categories = {
  products: [
    "All Products",
    "Robotics Kits",
    "Microcontrollers",
    "Sensors",
    "Online Courses",
  ],
  courses: ["Robotics", "AI & Coding", "IoT & Electronics", "Game Dev"],
  levels: ["Beginner", "Intermediate", "Advanced"],
};

export const competitionCategories = [
  {
    id: "line-following",
    name: "Line Following Robot",
    description: "Design a robot that can follow a line path autonomously with speed and precision.",
    difficulty: "Beginner",
  },
  {
    id: "obstacle-avoidance",
    name: "Obstacle Avoidance",
    description: "Create a robot that can navigate around obstacles independently using sensors.",
    difficulty: "Intermediate",
  },
  {
    id: "sumo-wrestling",
    name: "Sumo Wrestling Robot",
    description: "Build a robot to compete in sumo-style matches and push opponents out.",
    difficulty: "Advanced",
  },
  {
    id: "ai-powered",
    name: "AI-Powered Bot",
    description: "Integrate AI/ML capabilities into your robot design for complex tasks.",
    difficulty: "Advanced",
  },
];

export const pastWinners = [
  {
    rank: 1,
    teamName: "RoboKids",
    school: "Delhi Public School, Mumbai",
    members: ["Aarav Sharma", "Diya Patel", "Rohan Kumar"],
    category: "Junior Group",
  },
  {
    rank: 2,
    teamName: "Tech Titans",
    school: "Modern School, Delhi",
    members: ["Priya Singh", "Arjun Mehta", "Kavya Reddy"],
    category: "Junior Group",
  },
  {
    rank: 3,
    teamName: "Innovation Squad",
    school: "Ryan International, Bangalore",
    members: ["Aditya Verma", "Sneha Gupta", "Vikram Joshi"],
    category: "Junior Group",
  },
];

export const innovationThemes = [
  {
    icon: "leaf",
    title: "Environment Sustainability",
    description: "Eco-friendly solutions for a greener tomorrow",
  },
  {
    icon: "rocket",
    title: "Space Exploration",
    description: "Futuristic space tech and rovers",
  },
  {
    icon: "home",
    title: "Technology in Daily Life",
    description: "Smart living solutions for modern homes",
  },
  {
    icon: "shield",
    title: "Disaster Management",
    description: "Emergency response tech for safety",
  },
];

export const faqs = [
  {
    question: "How do I register for RoboThrone 2025?",
    answer: "You can register by clicking the 'Register Now' button on this page. Fill in your team details, school information, and select your competition category. Early bird registration is available until February 15th with a 20% discount.",
  },
  {
    question: "Can I purchase kits in bulk for my school?",
    answer: "Yes! We offer special bulk discounts for educational institutions. Contact our sales team at reachus@techyguide.in or use our bulk order form on the Products page.",
  },
  {
    question: "Where is the competition held?",
    answer: "RoboThrone 2025 will be held in multiple cities across India. Regional rounds will be conducted in Delhi, Mumbai, Bangalore, and Chennai. The finals will be held at the Bangalore International Exhibition Center.",
  },
];
