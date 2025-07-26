import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Clock, 
  Users, 
  Star, 
  Award, 
  CheckCircle, 
  Code, 
  Database, 
  Globe, 
  Brain, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Cloud, 
  Zap, 
  Layers, 
  Terminal, 
  GitBranch, 
  Server, 
  Monitor,
  BookOpen,
  Target,
  TrendingUp,
  Filter,
  Search,
  X
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  students: string;
  rating: number;
  price: string;
  image: string;
  category: string;
  topics: string[];
  prerequisites: string[];
  outcomes: string[];
  instructor: string;
  language: string;
  framework?: string;
}

function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = [
    'All', 'Programming Languages', 'Web Development', 'Mobile Development', 
    'Data Science', 'AI & Machine Learning', 'DevOps & Cloud', 'Cybersecurity', 
    'Game Development', 'Blockchain'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const courses: Course[] = [
    // Programming Languages
    {
      id: 'python-fundamentals',
      title: 'Python Programming Fundamentals',
      description: 'Master Python from basics to advanced concepts with hands-on projects and real-world applications.',
      duration: '12 weeks',
      level: 'Beginner',
      students: '2,500+',
      rating: 4.9,
      price: '₹12,999',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Programming Languages',
      topics: ['Python Syntax', 'Data Structures', 'OOP', 'File Handling', 'Libraries'],
      prerequisites: ['Basic Computer Knowledge'],
      outcomes: ['Build Python Applications', 'Understand OOP Concepts', 'Work with APIs'],
      instructor: 'Saurav Mukherjee',
      language: 'Python'
    },
    {
      id: 'javascript-mastery',
      title: 'JavaScript Complete Mastery',
      description: 'Comprehensive JavaScript course covering ES6+, DOM manipulation, and modern development practices.',
      duration: '10 weeks',
      level: 'Intermediate',
      students: '1,800+',
      rating: 4.8,
      price: '₹11,999',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Programming Languages',
      topics: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'Modules', 'Testing'],
      prerequisites: ['HTML/CSS Basics'],
      outcomes: ['Modern JavaScript Development', 'Build Interactive Websites', 'API Integration'],
      instructor: 'Saurav Mukherjee',
      language: 'JavaScript'
    },
    {
      id: 'java-enterprise',
      title: 'Java Enterprise Development',
      description: 'Learn Java programming and enterprise application development with Spring Framework.',
      duration: '14 weeks',
      level: 'Intermediate',
      students: '1,200+',
      rating: 4.7,
      price: '₹15,999',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Programming Languages',
      topics: ['Java Fundamentals', 'OOP', 'Collections', 'Spring Framework', 'Microservices'],
      prerequisites: ['Programming Basics'],
      outcomes: ['Enterprise Java Applications', 'Spring Boot Projects', 'RESTful APIs'],
      instructor: 'Saurav Mukherjee',
      language: 'Java'
    },
    {
      id: 'cpp-system-programming',
      title: 'C++ System Programming',
      description: 'Master C++ for system-level programming, performance optimization, and competitive programming.',
      duration: '10 weeks',
      level: 'Advanced',
      students: '900+',
      rating: 4.8,
      price: '₹13,999',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Programming Languages',
      topics: ['C++ Fundamentals', 'Memory Management', 'STL', 'Templates', 'Performance'],
      prerequisites: ['C Programming Knowledge'],
      outcomes: ['System Programming', 'Performance Optimization', 'Competitive Programming'],
      instructor: 'Saurav Mukherjee',
      language: 'C++'
    },
    {
      id: 'go-programming',
      title: 'Go Programming for Backend',
      description: 'Learn Go programming language for building scalable backend systems and microservices.',
      duration: '8 weeks',
      level: 'Intermediate',
      students: '650+',
      rating: 4.6,
      price: '₹10,999',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Programming Languages',
      topics: ['Go Syntax', 'Concurrency', 'Web Servers', 'Database Integration', 'Testing'],
      prerequisites: ['Programming Experience'],
      outcomes: ['Backend Development', 'Microservices', 'Concurrent Programming'],
      instructor: 'Saurav Mukherjee',
      language: 'Go'
    },

    // Web Development
    {
      id: 'react-development',
      title: 'React.js Complete Course',
      description: 'Build modern web applications with React.js, including hooks, context, and state management.',
      duration: '12 weeks',
      level: 'Intermediate',
      students: '3,200+',
      rating: 4.9,
      price: '₹14,999',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      topics: ['React Fundamentals', 'Hooks', 'State Management', 'Routing', 'Testing'],
      prerequisites: ['JavaScript Knowledge'],
      outcomes: ['Modern React Apps', 'Component Architecture', 'State Management'],
      instructor: 'Saurav Mukherjee',
      language: 'JavaScript',
      framework: 'React'
    },
    {
      id: 'nodejs-backend',
      title: 'Node.js Backend Development',
      description: 'Master server-side development with Node.js, Express, and database integration.',
      duration: '10 weeks',
      level: 'Intermediate',
      students: '2,100+',
      rating: 4.8,
      price: '₹13,999',
      image: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      topics: ['Node.js Fundamentals', 'Express.js', 'Database Integration', 'Authentication', 'APIs'],
      prerequisites: ['JavaScript Knowledge'],
      outcomes: ['Backend APIs', 'Database Management', 'Authentication Systems'],
      instructor: 'Saurav Mukherjee',
      language: 'JavaScript',
      framework: 'Node.js'
    },
    {
      id: 'vue-development',
      title: 'Vue.js Progressive Framework',
      description: 'Learn Vue.js for building progressive web applications with modern development practices.',
      duration: '8 weeks',
      level: 'Intermediate',
      students: '1,400+',
      rating: 4.7,
      price: '₹11,999',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      topics: ['Vue Fundamentals', 'Components', 'Vuex', 'Vue Router', 'Composition API'],
      prerequisites: ['JavaScript Basics'],
      outcomes: ['Vue Applications', 'Component Systems', 'State Management'],
      instructor: 'Saurav Mukherjee',
      language: 'JavaScript',
      framework: 'Vue.js'
    },
    {
      id: 'angular-development',
      title: 'Angular Enterprise Applications',
      description: 'Build enterprise-grade applications with Angular, TypeScript, and modern development tools.',
      duration: '14 weeks',
      level: 'Advanced',
      students: '1,100+',
      rating: 4.6,
      price: '₹16,999',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      topics: ['Angular Fundamentals', 'TypeScript', 'Services', 'Routing', 'Testing'],
      prerequisites: ['JavaScript/TypeScript Knowledge'],
      outcomes: ['Enterprise Applications', 'Component Architecture', 'Testing Strategies'],
      instructor: 'Saurav Mukherjee',
      language: 'TypeScript',
      framework: 'Angular'
    },

    // Mobile Development
    {
      id: 'react-native',
      title: 'React Native Mobile Development',
      description: 'Build cross-platform mobile applications using React Native and modern mobile development practices.',
      duration: '12 weeks',
      level: 'Intermediate',
      students: '1,800+',
      rating: 4.8,
      price: '₹17,999',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Mobile Development',
      topics: ['React Native Basics', 'Navigation', 'State Management', 'Native Modules', 'Publishing'],
      prerequisites: ['React Knowledge'],
      outcomes: ['Cross-platform Apps', 'Native Features', 'App Store Publishing'],
      instructor: 'Saurav Mukherjee',
      language: 'JavaScript',
      framework: 'React Native'
    },
    {
      id: 'flutter-development',
      title: 'Flutter Cross-Platform Development',
      description: 'Create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
      duration: '14 weeks',
      level: 'Intermediate',
      students: '1,500+',
      rating: 4.7,
      price: '₹18,999',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Mobile Development',
      topics: ['Dart Language', 'Flutter Widgets', 'State Management', 'Animations', 'Platform Integration'],
      prerequisites: ['Programming Basics'],
      outcomes: ['Cross-platform Applications', 'Beautiful UIs', 'Platform-specific Features'],
      instructor: 'Saurav Mukherjee',
      language: 'Dart',
      framework: 'Flutter'
    },

    // Data Science & AI
    {
      id: 'data-science-python',
      title: 'Data Science with Python',
      description: 'Complete data science course covering statistics, machine learning, and data visualization.',
      duration: '16 weeks',
      level: 'Intermediate',
      students: '2,800+',
      rating: 4.9,
      price: '₹19,999',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Data Science',
      topics: ['Statistics', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
      prerequisites: ['Python Basics'],
      outcomes: ['Data Analysis', 'Machine Learning Models', 'Data Visualization'],
      instructor: 'Saurav Mukherjee',
      language: 'Python'
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Engineering',
      description: 'Advanced machine learning course with deep learning, MLOps, and production deployment.',
      duration: '18 weeks',
      level: 'Advanced',
      students: '1,900+',
      rating: 4.8,
      price: '₹24,999',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'AI & Machine Learning',
      topics: ['ML Algorithms', 'Deep Learning', 'TensorFlow', 'MLOps', 'Model Deployment'],
      prerequisites: ['Python & Statistics'],
      outcomes: ['ML Model Development', 'Production Deployment', 'MLOps Implementation'],
      instructor: 'Saurav Mukherjee',
      language: 'Python'
    },
    {
      id: 'ai-fundamentals',
      title: 'Artificial Intelligence Fundamentals',
      description: 'Comprehensive AI course covering neural networks, computer vision, and natural language processing.',
      duration: '20 weeks',
      level: 'Advanced',
      students: '1,200+',
      rating: 4.9,
      price: '₹29,999',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'AI & Machine Learning',
      topics: ['Neural Networks', 'Computer Vision', 'NLP', 'Reinforcement Learning', 'AI Ethics'],
      prerequisites: ['Machine Learning Knowledge'],
      outcomes: ['AI Applications', 'Deep Learning Models', 'Computer Vision Systems'],
      instructor: 'Saurav Mukherjee',
      language: 'Python'
    },

    // DevOps & Cloud
    {
      id: 'aws-cloud',
      title: 'AWS Cloud Solutions Architecture',
      description: 'Master Amazon Web Services for building scalable, secure, and cost-effective cloud solutions.',
      duration: '12 weeks',
      level: 'Intermediate',
      students: '1,600+',
      rating: 4.7,
      price: '₹21,999',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'DevOps & Cloud',
      topics: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFormation'],
      prerequisites: ['Basic Networking'],
      outcomes: ['Cloud Architecture', 'AWS Certification Prep', 'Scalable Solutions'],
      instructor: 'Saurav Mukherjee',
      language: 'Multiple'
    },
    {
      id: 'docker-kubernetes',
      title: 'Docker & Kubernetes Mastery',
      description: 'Learn containerization and orchestration for modern application deployment and scaling.',
      duration: '10 weeks',
      level: 'Intermediate',
      students: '1,400+',
      rating: 4.8,
      price: '₹16,999',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'DevOps & Cloud',
      topics: ['Docker Fundamentals', 'Container Orchestration', 'Kubernetes', 'CI/CD', 'Monitoring'],
      prerequisites: ['Linux Basics'],
      outcomes: ['Container Management', 'Kubernetes Deployment', 'DevOps Practices'],
      instructor: 'Saurav Mukherjee',
      language: 'Multiple'
    },

    // Cybersecurity
    {
      id: 'ethical-hacking',
      title: 'Ethical Hacking & Penetration Testing',
      description: 'Learn cybersecurity fundamentals, ethical hacking techniques, and penetration testing methodologies.',
      duration: '14 weeks',
      level: 'Advanced',
      students: '800+',
      rating: 4.6,
      price: '₹22,999',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Cybersecurity',
      topics: ['Network Security', 'Web Application Security', 'Penetration Testing', 'Forensics', 'Compliance'],
      prerequisites: ['Networking Knowledge'],
      outcomes: ['Security Assessment', 'Penetration Testing', 'Security Consulting'],
      instructor: 'Saurav Mukherjee',
      language: 'Multiple'
    },

    // Game Development
    {
      id: 'unity-game-dev',
      title: 'Unity Game Development',
      description: 'Create 2D and 3D games using Unity engine with C# programming and game design principles.',
      duration: '16 weeks',
      level: 'Intermediate',
      students: '1,100+',
      rating: 4.7,
      price: '₹18,999',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Game Development',
      topics: ['Unity Engine', 'C# Scripting', 'Game Physics', 'Animation', 'Publishing'],
      prerequisites: ['Programming Basics'],
      outcomes: ['2D/3D Games', 'Game Mechanics', 'Game Publishing'],
      instructor: 'Saurav Mukherjee',
      language: 'C#',
      framework: 'Unity'
    },

    // Blockchain
    {
      id: 'blockchain-development',
      title: 'Blockchain & Smart Contract Development',
      description: 'Learn blockchain technology, cryptocurrency, and smart contract development with Solidity.',
      duration: '12 weeks',
      level: 'Advanced',
      students: '600+',
      rating: 4.5,
      price: '₹25,999',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Blockchain',
      topics: ['Blockchain Fundamentals', 'Ethereum', 'Solidity', 'DApps', 'Web3'],
      prerequisites: ['Programming Experience'],
      outcomes: ['Smart Contracts', 'DApp Development', 'Blockchain Solutions'],
      instructor: 'Saurav Mukherjee',
      language: 'Solidity'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  const GoogleFormModal = () => {
    if (!showEnrollmentForm || !selectedCourse) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Enroll in {selectedCourse.title}</h3>
              <p className="text-gray-600">Fill out the form below to secure your spot</p>
            </div>
            <button
              onClick={() => setShowEnrollmentForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-white rounded-lg p-6 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSd6q231d2-tmW8r1KXCz6D9BVJT3EQBBZgLp22ZDX9RbfPrbQ/viewform?embedded=true"
              width="640"
              height="961"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-lg w-full"
              title="Course Registration"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">All Courses</h1>
                <p className="text-sm text-gray-600">Choose your learning path</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Course Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master programming languages, frameworks, and cutting-edge technologies with our comprehensive course collection
          </p>
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-blue-600" />
              <span>{courses.length} Courses</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-green-600" />
              <span>500+ Students</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>4.8 Average Rating</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="relative">
              <Target className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchTerm) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategory !== 'All' && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedLevel !== 'All' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {selectedLevel}
                  <button
                    onClick={() => setSelectedLevel('All')}
                    className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {course.category}
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">({course.rating})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Certificate
                  </span>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                    {course.topics.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{course.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">SM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                    <p className="text-xs text-gray-500">AI Engineer & Mentor</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleEnrollClick(course)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSearchTerm('');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Google Form Modal */}
      <GoogleFormModal />
    </div>
  );
}

export default CoursesPage;