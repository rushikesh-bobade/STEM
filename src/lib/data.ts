export interface Instructor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  students: number;
  courses: number;
  rating: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "assignment" | "resource";
  isPreview?: boolean;
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  videoPreview?: string;
  category: string;
  subcategory?: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  totalLectures: number;
  rating: number;
  reviewCount: number;
  studentsEnrolled: number;
  badge?: "bestseller" | "new" | "sale" | "hot";
  instructor: Instructor;
  modules: Module[];
  learningOutcomes: string[];
  requirements: string[];
  features: string[];
  lastUpdated: string;
  language: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  mobileAccess: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  type: "hardware" | "course" | "bundle";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  badge?: "sale" | "new" | "bestseller" | "limited";
  specs?: ProductSpec[];
  features: string[];
  boxContents?: string[];
  compatibility?: string[];
  warranty?: string;
  shipping?: string;
  reviews?: Review[];
  relatedProducts?: string[];
  ageRange?: string;
  difficulty?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  program?: string;
}

export interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: "Active" | "Ongoing" | "Completed" | "New" | "Eco-Friendly" | "Financial Aid";
  tags: string[];
  link?: string;
}

export const instructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Dr. Sarah Chen",
    title: "Senior AI Researcher",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Sarah has over 12 years of experience in robotics and artificial intelligence. She previously led the autonomous vehicle navigation team at a major EV manufacturer. Her passion is making complex systems understandable.",
    students: 45000,
    courses: 12,
    rating: 4.9,
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "inst-2",
    name: "Prof. Rajesh Kumar",
    title: "Robotics Engineer",
    company: "IIT Delhi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "Rajesh is a professor at IIT Delhi with 20+ years of experience in robotics. He has published over 50 research papers and holds 15 patents in autonomous systems.",
    students: 38000,
    courses: 8,
    rating: 4.8,
  },
  {
    id: "inst-3",
    name: "Emily Watson",
    title: "Full Stack Developer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    bio: "Emily is a software engineer at Google with expertise in Python, JavaScript, and cloud computing. She loves teaching programming to beginners.",
    students: 62000,
    courses: 15,
    rating: 4.9,
  },
];

export const coursesData: Course[] = [
  {
    id: "course-1",
    slug: "advanced-robotics-ai-integration",
    name: "Advanced Robotics & AI Integration",
    description: "Master the fundamentals of autonomous systems, neural networks, and circuit design. Build real-world projects and launch your career in robotics engineering.",
    longDescription: "This comprehensive course covers everything you need to know about integrating AI with robotics. From basic sensor integration to advanced neural network implementation, you'll learn by building real projects that you can showcase in your portfolio.",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    videoPreview: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Robotics",
    subcategory: "AI Integration",
    level: "intermediate",
    duration: "12 Weeks",
    totalLectures: 48,
    rating: 4.9,
    reviewCount: 580,
    studentsEnrolled: 12450,
    badge: "bestseller",
    instructor: instructors[0],
    lastUpdated: "December 2024",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    learningOutcomes: [
      "Build autonomous robots using ROS2 and Python",
      "Implement computer vision for object detection and tracking",
      "Design neural networks for robotic decision making",
      "Create efficient and safe electronic circuits for robots",
      "Deploy machine learning models on edge devices like Raspberry Pi",
      "Integrate sensors and actuators for real-world applications",
    ],
    requirements: [
      "Basic programming knowledge in Python",
      "Understanding of basic electronics",
      "A computer with at least 8GB RAM",
      "Enthusiasm to learn and build projects",
    ],
    features: [
      "48 hours on-demand video",
      "12 downloadable resources",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion",
      "30-day money-back guarantee",
    ],
    modules: [
      {
        id: "mod-1",
        title: "Introduction to Autonomous Systems",
        duration: "4h 45m",
        lessons: [
          { id: "les-1", title: "Course Overview & Objectives", duration: "12:30", type: "video", isPreview: true },
          { id: "les-2", title: "History of Robotics", duration: "18:20", type: "video" },
          { id: "les-3", title: "Levels of Autonomy", duration: "15:00", type: "video" },
          { id: "les-4", title: "Setting Up Your Development Environment", duration: "25:00", type: "video" },
          { id: "les-5", title: "Module 1 Quiz", duration: "15:00", type: "quiz" },
        ],
      },
      {
        id: "mod-2",
        title: "Sensors & Actuators Deep Dive",
        duration: "6h 20m",
        lessons: [
          { id: "les-6", title: "Types of Sensors in Robotics", duration: "22:00", type: "video" },
          { id: "les-7", title: "Working with Ultrasonic Sensors", duration: "28:00", type: "video" },
          { id: "les-8", title: "IR Sensors and Line Following", duration: "32:00", type: "video" },
          { id: "les-9", title: "Motor Control Fundamentals", duration: "35:00", type: "video" },
          { id: "les-10", title: "Servo Motors and PWM", duration: "30:00", type: "video" },
          { id: "les-11", title: "Hands-on Project: Sensor Integration", duration: "45:00", type: "assignment" },
        ],
      },
      {
        id: "mod-3",
        title: "Computer Vision Basics",
        duration: "8h 15m",
        lessons: [
          { id: "les-12", title: "Introduction to OpenCV", duration: "25:00", type: "video" },
          { id: "les-13", title: "Image Processing Fundamentals", duration: "35:00", type: "video" },
          { id: "les-14", title: "Object Detection with YOLO", duration: "45:00", type: "video" },
          { id: "les-15", title: "Face Recognition Systems", duration: "40:00", type: "video" },
          { id: "les-16", title: "Project: Build a Vision-Based Robot", duration: "60:00", type: "assignment" },
        ],
      },
    ],
  },
  {
    id: "course-2",
    slug: "python-programming-beginners",
    name: "Python Programming for Beginners",
    description: "Start your coding journey with Python. Learn programming fundamentals, data structures, and build practical projects.",
    price: 49.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    category: "Coding",
    subcategory: "Python",
    level: "beginner",
    duration: "8 Weeks",
    totalLectures: 42,
    rating: 4.8,
    reviewCount: 1250,
    studentsEnrolled: 28000,
    badge: "bestseller",
    instructor: instructors[2],
    lastUpdated: "November 2024",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    learningOutcomes: [
      "Write Python code from scratch",
      "Understand programming logic and problem-solving",
      "Work with data structures and algorithms",
      "Build GUI applications with Tkinter",
      "Create web scrapers and automation scripts",
    ],
    requirements: [
      "No prior programming experience required",
      "A computer with internet access",
      "Willingness to practice coding daily",
    ],
    features: [
      "42 hours on-demand video",
      "15 coding exercises",
      "5 real-world projects",
      "Certificate of completion",
    ],
    modules: [
      {
        id: "mod-1",
        title: "Getting Started with Python",
        duration: "3h 30m",
        lessons: [
          { id: "les-1", title: "Why Learn Python?", duration: "10:00", type: "video", isPreview: true },
          { id: "les-2", title: "Installing Python", duration: "15:00", type: "video" },
          { id: "les-3", title: "Your First Python Program", duration: "20:00", type: "video" },
        ],
      },
    ],
  },
  {
    id: "course-3",
    slug: "iot-smart-home-automation",
    name: "IoT & Smart Home Automation",
    description: "Build connected devices and smart home systems using Arduino, ESP32, and cloud platforms.",
    price: 79.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "IoT",
    subcategory: "Home Automation",
    level: "intermediate",
    duration: "10 Weeks",
    totalLectures: 56,
    rating: 4.7,
    reviewCount: 420,
    studentsEnrolled: 8500,
    badge: "hot",
    instructor: instructors[1],
    lastUpdated: "December 2024",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    learningOutcomes: [
      "Design IoT architectures",
      "Program ESP32 and Arduino devices",
      "Build cloud-connected sensors",
      "Create mobile apps for device control",
      "Implement home automation systems",
    ],
    requirements: [
      "Basic electronics knowledge",
      "Basic programming experience",
      "Arduino or ESP32 development board",
    ],
    features: [
      "56 hours on-demand video",
      "Hardware project guides",
      "Cloud platform integration",
      "Certificate of completion",
    ],
    modules: [],
  },
  {
    id: "course-4",
    slug: "machine-learning-fundamentals",
    name: "Machine Learning Fundamentals",
    description: "Learn ML algorithms, neural networks, and build AI models from scratch using Python and TensorFlow.",
    price: 149.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    category: "AI & ML",
    subcategory: "Machine Learning",
    level: "intermediate",
    duration: "14 Weeks",
    totalLectures: 72,
    rating: 4.9,
    reviewCount: 890,
    studentsEnrolled: 15200,
    badge: "new",
    instructor: instructors[0],
    lastUpdated: "December 2024",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    learningOutcomes: [
      "Understand ML algorithms from theory to practice",
      "Build and train neural networks",
      "Work with real-world datasets",
      "Deploy ML models in production",
    ],
    requirements: [
      "Python programming experience",
      "Basic math and statistics",
      "Computer with GPU recommended",
    ],
    features: [
      "72 hours on-demand video",
      "20+ ML projects",
      "TensorFlow and PyTorch tutorials",
      "Certificate of completion",
    ],
    modules: [],
  },
  {
    id: "course-5",
    slug: "3d-printing-design-mastery",
    name: "3D Printing & Design Mastery",
    description: "Master 3D modeling, slicing software, and printing techniques to bring your ideas to life.",
    price: 69.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    category: "3D Printing",
    subcategory: "Design",
    level: "beginner",
    duration: "6 Weeks",
    totalLectures: 36,
    rating: 4.6,
    reviewCount: 320,
    studentsEnrolled: 5800,
    instructor: instructors[1],
    lastUpdated: "November 2024",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    learningOutcomes: [
      "Create 3D models using Fusion 360 and Blender",
      "Understand FDM and SLA printing technologies",
      "Optimize prints for strength and quality",
      "Troubleshoot common printing issues",
    ],
    requirements: [
      "No prior experience required",
      "Access to a 3D printer recommended",
    ],
    features: [
      "36 hours on-demand video",
      "CAD file downloads",
      "Print settings guides",
      "Certificate of completion",
    ],
    modules: [],
  },
  {
    id: "course-6",
    slug: "drone-building-programming",
    name: "Drone Building & Programming",
    description: "Build your own quadcopter from scratch and learn to program autonomous flight behaviors.",
    price: 129.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
    category: "Robotics",
    subcategory: "Drones",
    level: "advanced",
    duration: "12 Weeks",
    totalLectures: 64,
    rating: 4.8,
    reviewCount: 245,
    studentsEnrolled: 4200,
    badge: "hot",
    instructor: instructors[1],
    lastUpdated: "December 2024",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    learningOutcomes: [
      "Understand drone aerodynamics and physics",
      "Build a quadcopter from components",
      "Program flight controllers",
      "Implement autonomous navigation",
    ],
    requirements: [
      "Basic electronics knowledge",
      "Programming experience",
      "Drone kit (available in our store)",
    ],
    features: [
      "64 hours on-demand video",
      "Component selection guide",
      "Flight controller programming",
      "Certificate of completion",
    ],
    modules: [],
  },
];

export const productsData: Product[] = [
  {
    id: "prod-1",
    slug: "arduino-starter-kit-v3",
    name: "Arduino Starter Kit V3",
    description: "The ultimate entry point for aspiring engineers. Build 15 unique projects that teach you the basics of voltage, current, and digital logic.",
    longDescription: "The Arduino Starter Kit V3 is the ultimate entry point for aspiring engineers. Through hands-on projects, you'll learn how to read sensors, control motors, and visualize data. The kit walks you through the fundamentals of Ohm's Law in a practical way, ensuring you understand the 'why' behind the 'how'.",
    price: 49.99,
    originalPrice: 65.00,
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop",
    ],
    category: "DIY Kits",
    subcategory: "Arduino",
    type: "hardware",
    rating: 4.8,
    reviewCount: 120,
    inStock: true,
    stockCount: 150,
    badge: "bestseller",
    ageRange: "Ages 12+",
    difficulty: "Beginner Friendly",
    warranty: "2 Year Warranty",
    shipping: "Free Shipping on orders over $100",
    specs: [
      { label: "Microcontroller", value: "ATmega328P" },
      { label: "Operating Voltage", value: "5V" },
      { label: "Input Voltage", value: "7-12V" },
      { label: "Digital I/O Pins", value: "14 (6 PWM)" },
      { label: "Analog Inputs", value: "6" },
      { label: "Flash Memory", value: "32 KB" },
      { label: "Clock Speed", value: "16 MHz" },
    ],
    features: [
      "Includes main microcontroller board",
      "Over 200 components",
      "170-page project guide included",
      "Compatible with Mac, Windows, and Linux",
      "No prior experience required",
    ],
    boxContents: [
      "1x Project Book (170 pages)",
      "1x Arduino Uno Board",
      "1x USB Cable",
      "1x Breadboard",
      "70x Solid Core Jumper Wires",
      "1x LCD Display",
      "Various resistors, LEDs, and sensors",
    ],
    compatibility: ["Windows", "macOS", "Linux"],
    relatedProducts: ["prod-2", "prod-3", "prod-4"],
  },
  {
    id: "prod-2",
    slug: "iot-smart-home-kit",
    name: "IoT Smart Home Starter Kit",
    description: "Build your own automated home system with sensors, relays, and ESP32 connectivity.",
    price: 89.99,
    originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    category: "IoT Kits",
    type: "hardware",
    rating: 4.5,
    reviewCount: 42,
    inStock: true,
    stockCount: 75,
    features: [
      "ESP32 microcontroller",
      "Temperature and humidity sensors",
      "Motion detection sensors",
      "Relay modules for device control",
      "Mobile app compatible",
    ],
    boxContents: [
      "1x ESP32 Development Board",
      "1x DHT22 Temperature Sensor",
      "1x PIR Motion Sensor",
      "4x Relay Modules",
      "Connecting wires and components",
    ],
  },
  {
    id: "prod-3",
    slug: "ai-vision-sensor-module",
    name: "AI Vision Sensor Module",
    description: "High-performance camera module with on-board object detection and face recognition.",
    price: 35.50,
    originalPrice: 49.99,
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    ],
    category: "Sensors",
    type: "hardware",
    rating: 4.0,
    reviewCount: 15,
    inStock: true,
    stockCount: 200,
    badge: "sale",
    features: [
      "Built-in AI processor",
      "Object detection up to 20 classes",
      "Face recognition capability",
      "I2C and UART interfaces",
      "Low power consumption",
    ],
  },
  {
    id: "prod-4",
    slug: "6-axis-robotic-arm-kit",
    name: "6-Axis Robotic Arm Kit",
    description: "Programmable desktop robotic arm. Supports Python, C++, and block-based programming.",
    price: 299.00,
    originalPrice: 399.00,
    images: [
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&h=600&fit=crop",
    ],
    category: "Robotics Kits",
    type: "hardware",
    rating: 5.0,
    reviewCount: 56,
    inStock: true,
    stockCount: 30,
    badge: "bestseller",
    features: [
      "6 degrees of freedom",
      "500g payload capacity",
      "USB and Bluetooth connectivity",
      "Python and C++ SDK",
      "Block-based programming for beginners",
    ],
  },
  {
    id: "prod-5",
    slug: "diy-quadcopter-drone-kit",
    name: "DIY Quadcopter Drone Kit",
    description: "Assemble and program your own drone. Includes gyroscope, accelerometer, and flight controller.",
    price: 159.99,
    originalPrice: 219.99,
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
    ],
    category: "Robotics Kits",
    type: "hardware",
    rating: 4.5,
    reviewCount: 8,
    inStock: true,
    stockCount: 45,
    features: [
      "250mm frame kit",
      "Brushless motors",
      "Flight controller with GPS",
      "First-person view camera",
      "Comprehensive build guide",
    ],
  },
  {
    id: "prod-6",
    slug: "raspberry-pi-learning-bundle",
    name: "Raspberry Pi Learning Bundle",
    description: "Raspberry Pi 4 with accessories and learning materials for IoT and programming projects.",
    price: 119.99,
    originalPrice: 159.99,
    images: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop",
    ],
    category: "DIY Kits",
    type: "bundle",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    stockCount: 60,
    badge: "new",
    features: [
      "Raspberry Pi 4 (4GB RAM)",
      "32GB microSD card with OS",
      "Official power supply",
      "Case with cooling fan",
      "GPIO reference card",
      "Project book included",
    ],
  },
  {
    id: "prod-7",
    slug: "37-in-1-sensor-kit",
    name: "37-in-1 Sensor Kit",
    description: "Comprehensive sensor kit compatible with Arduino and Raspberry Pi.",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    ],
    category: "Sensors",
    type: "hardware",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 300,
    features: [
      "37 different sensors",
      "Temperature, humidity, motion",
      "Light, sound, touch sensors",
      "Compatible with Arduino/RPi",
    ],
  },
  {
    id: "prod-8",
    slug: "lcd-display-module",
    name: "LCD Display Module",
    description: "16x2 Character display with I2C interface for easy connection.",
    price: 8.50,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    ],
    category: "Components",
    type: "hardware",
    rating: 4.4,
    reviewCount: 210,
    inStock: true,
    stockCount: 500,
    features: [
      "16x2 character display",
      "I2C interface",
      "Backlight control",
      "5V operation",
    ],
  },
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    userId: "user-1",
    userName: "James Wilson",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Absolutely fantastic course. The section on neural networks finally made the concepts click for me. I was able to build my own autonomous rover by the end of week 10. Highly recommended for anyone wanting to get serious about robotics.",
    date: "2 days ago",
    helpful: 24,
  },
  {
    id: "rev-2",
    userId: "user-2",
    userName: "Sarah Miller",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Dr. Chen explains complex topics in a way that's easy to understand. The hands-on projects are excellent and really help reinforce the concepts.",
    date: "1 week ago",
    helpful: 18,
  },
  {
    id: "rev-3",
    userId: "user-3",
    userName: "John Doe",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Perfect for high school projects. The instructions are crystal clear and the components are high quality. We had the first LED blinking in 15 minutes!",
    date: "2 weeks ago",
    helpful: 12,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Ravi Kumar",
    role: "Student",
    location: "Kanpur, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    quote: "Before the mobile lab came to our village, I had never seen a computer. Now I can code in Python and I'm building a weather station for my family's farm.",
    rating: 5,
    program: "Mobile STEM Labs",
  },
  {
    id: "test-2",
    name: "Sunita Sharma",
    role: "Science Teacher",
    location: "Rajasthan, India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    quote: "The teacher training program gave me the confidence to start a robotics club. My students are now competing at state levels and winning!",
    rating: 5,
    program: "Teacher Training",
  },
  {
    id: "test-3",
    name: "Mr. Gupta",
    role: "Parent",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    quote: "Thanks to the scholarship, my daughter could participate in RoboThrone. It opened her eyes to engineering as a career path.",
    rating: 5,
    program: "Scholarship Fund",
  },
];

export const initiatives: Initiative[] = [
  {
    id: "init-1",
    title: "Mobile STEM Labs",
    description: "A fleet of vans equipped with 3D printers, robotics kits, and laptops traveling to rural villages to conduct weekend workshops.",
    icon: "truck",
    status: "Active",
    tags: ["Active", "Rural Focus"],
  },
  {
    id: "init-2",
    title: "Teacher Training",
    description: "Empowering local educators with the skills and curriculum needed to teach robotics and coding confidently.",
    icon: "users",
    status: "Ongoing",
    tags: ["Ongoing", "Capacity Building"],
  },
  {
    id: "init-3",
    title: "Scholarship Fund",
    description: "Full scholarships for talented students from low-income families to participate in national robotics competitions.",
    icon: "award",
    status: "Financial Aid",
    tags: ["Annual", "Financial Aid"],
  },
  {
    id: "init-4",
    title: "E-Waste to Robots",
    description: "Teaching students how to repurpose electronic waste into functional robotics parts, promoting sustainability.",
    icon: "recycle",
    status: "Eco-Friendly",
    tags: ["New", "Eco-Friendly"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "future-of-robotics-education",
    title: "The Future of Robotics Education in India",
    excerpt: "How STEM education is transforming the way students learn and prepare for careers in technology.",
    content: "",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    category: "Education",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    date: "December 28, 2024",
    readTime: "5 min read",
    tags: ["Robotics", "Education", "India"],
  },
  {
    id: "blog-2",
    slug: "robothrone-2024-highlights",
    title: "RoboThrone 2024: A Record-Breaking Year",
    excerpt: "Recap of the biggest robotics competition for students with over 500 participants from across India.",
    content: "",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&h=400&fit=crop",
    category: "Competition",
    author: {
      name: "Prof. Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    date: "December 20, 2024",
    readTime: "8 min read",
    tags: ["RoboThrone", "Competition", "Winners"],
  },
  {
    id: "blog-3",
    slug: "getting-started-with-arduino",
    title: "Getting Started with Arduino: A Beginner's Guide",
    excerpt: "Everything you need to know to start your electronics journey with Arduino microcontrollers.",
    content: "",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&h=400&fit=crop",
    category: "Tutorial",
    author: {
      name: "Emily Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    date: "December 15, 2024",
    readTime: "10 min read",
    tags: ["Arduino", "Tutorial", "Beginners"],
  },
];

export const categories = {
  courses: ["Robotics", "AI & ML", "Coding", "IoT", "3D Printing", "Game Dev", "Data Science", "Cybersecurity"],
  products: ["All Products", "DIY Kits", "Robotics Kits", "IoT Kits", "Sensors", "Components", "Bundles"],
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
  {
    question: "Do courses come with certificates?",
    answer: "Yes, all our courses include a certificate of completion that you can share on LinkedIn and add to your resume. Certificates are issued after completing all course modules and assignments.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee on all courses and unused physical products. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "Do I get lifetime access to courses?",
    answer: "Yes! Once you purchase a course, you have lifetime access to all course materials, including any future updates to the content.",
  },
];

export const impactStats = [
  { label: "Partner Schools", value: "50+" },
  { label: "Students Reached", value: "10k+" },
  { label: "Workshops Conducted", value: "200+" },
  { label: "Worth of Kits Donated", value: "₹5M+" },
];
