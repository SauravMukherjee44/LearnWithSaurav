import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  BookOpen, 
  Users, 
  Award, 
  Star, 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  Shield,
  BarChart3,
  Brain,
  Timer,
  Play,
  ChevronRight,
  FileText
} from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Saurav Mukherjee</h1>
                <p className="text-sm text-gray-600">AI Engineer & Programming Mentor</p>
              </div>
            </div>
           <nav className="hidden md:flex space-x-8">
              <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
              <a href="#certifications" className="text-gray-700 hover:text-blue-600 transition-colors">Certifications</a>
              <a href="#tests" className="text-gray-700 hover:text-blue-600 transition-colors">Live Tests</a>
              <Link to="/notes" className="text-gray-700 hover:text-blue-600 transition-colors">Study Materials</Link>
              <a href="#reviews" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Programming</span> & 
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> AI</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Learn from an experienced AI Engineer. From beginner to industry-ready professional with hands-on projects, 
                certification preparation, and personalized mentorship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/courses" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-center">
                  Explore Courses
                </Link>
                <a href="#tests" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Take Free Test
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Programming and AI Learning" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ Students</p>
                    <p className="text-sm text-gray-600">Successfully Trained</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Programming Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive courses designed to take you from beginner to industry professional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Python & AI Fundamentals",
                description: "Master Python programming and dive into Artificial Intelligence with hands-on projects",
                duration: "12 weeks",
                level: "Beginner to Advanced",
                image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
                topics: ["Python", "Machine Learning", "Neural Networks"]
              },
              {
                title: "Full Stack Web Development",
                description: "Build modern web applications using React, Node.js, and cloud technologies",
                duration: "16 weeks",
                level: "Intermediate",
                image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
                topics: ["HTML/CSS/JS", "React", "Node.js", "Databases"]
              },
              {
                title: "Data Science & Analytics",
                description: "Learn data analysis, visualization, and machine learning for business insights",
                duration: "14 weeks",
                level: "Intermediate",
                image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400",
                topics: ["Statistics", "Pandas", "Visualization", "ML Algorithms"]
              },
              {
                title: "Java Enterprise Development",
                description: "Master Java programming and enterprise application development",
                duration: "10 weeks",
                level: "Beginner to Advanced",
                image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
                topics: ["Java Basics", "OOP", "Spring Framework", "Microservices"]
              },
              {
                title: "C++ System Programming",
                description: "Learn system-level programming and performance optimization with C++",
                duration: "8 weeks",
                level: "Intermediate",
                image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
                topics: ["C++ Fundamentals", "Memory Management", "STL", "Performance"]
              },
              {
                title: "Machine Learning Engineering",
                description: "Deploy ML models in production with MLOps and cloud platforms",
                duration: "12 weeks",
                level: "Advanced",
                image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
                topics: ["ML Pipeline", "Model Deployment", "MLOps", "Cloud ML"]
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-medium text-gray-700">Key Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                    <Link to="/courses" className="block w-full h-full">
                      Enroll Now
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Certification Preparation Section */}
      <section id="certifications" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Prepare for Industry Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get ready for prestigious tech company certifications with expert guidance and comprehensive preparation
            </p>
          </div>

          {/* Preparation Process */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Study Materials</h3>
              <p className="text-gray-600">Comprehensive guides, video lectures, and hands-on labs aligned with official exam objectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Tests</h3>
              <p className="text-gray-600">Realistic mock exams with detailed explanations and performance analytics</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Exam Strategy</h3>
              <p className="text-gray-600">Test-taking strategies, time management, and expert tips for certification success</p>
            </div>
          </div>

          {/* Target Certifications */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                company: "Python Institute",
                logo: "bg-gradient-to-r from-blue-500 to-green-500",
                certifications: [
                  "PCEP – Certified Entry-Level Python Programmer",
                  "PCAP – Certified Associate in Python Programming",
                  "PCPP – Certified Professional in Python Programming"
                ]
              },
              {
                company: "Oracle",
                logo: "bg-gradient-to-r from-red-500 to-orange-500",
                certifications: [
                  "Oracle Certified Associate Java Programmer (OCAJP)",
                  "Oracle Certified Professional Java Programmer (OCPJP)"
                ]
              },
              {
                company: "Microsoft",
                logo: "bg-gradient-to-r from-blue-500 to-cyan-500",
                certifications: [
                  "Microsoft Certified: Azure Fundamentals (AZ-900)",
                  "Microsoft Certified: Azure Developer Associate",
                  "Microsoft Certified: Data Scientist Associate"
                ]
              },
              {
                company: "JavaScript/ECMA",
                logo: "bg-gradient-to-r from-yellow-500 to-orange-500",
                certifications: [
                  "W3C Certified JavaScript Developer",
                  "Microsoft Certified: JavaScript Specialist",
                  "OpenJS Node.js Application Developer"
                ]
              },
              {
                company: "Data Science & ML",
                logo: "bg-gradient-to-r from-purple-500 to-pink-500",
                certifications: [
                  "IBM Data Science Professional Certificate",
                  "Google Data Analytics Professional Certificate",
                  "TensorFlow Developer Certificate"
                ]
              },
              {
                company: "C++ Institute",
                logo: "bg-gradient-to-r from-blue-500 to-purple-500",
                certifications: [
                  "CLA – C Programming Language Certified Associate",
                  "CPA – C++ Certified Associate Programmer",
                  "CPP – C++ Certified Professional Programmer"
                ]
              }
            ].map((cert, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 ${cert.logo} rounded-lg flex items-center justify-center mr-4`}>
                    <span className="text-white font-bold text-lg">{cert.company.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{cert.company}</h3>
                </div>
                <ul className="space-y-2">
                  {cert.certifications.map((certification, certIndex) => (
                    <li key={certIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{certification}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: "Official Exam Alignment", desc: "Content aligned with current exam objectives" },
              { icon: TrendingUp, title: "Latest Updates", desc: "Regular updates with new exam patterns" },
              { icon: Award, title: "95% Success Rate", desc: "Students pass on their first attempt" },
              { icon: Users, title: "Expert Mentorship", desc: "Guidance from certified professionals" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Study Materials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Study Materials & Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive notes, cheat sheets, and study guides for all programming languages and technologies
            </p>
          </div>

          {/* Featured Study Materials */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Programming Notes",
                description: "Complete study guides for Python, JavaScript, Java, C++, and more",
                icon: BookOpen,
                color: "from-blue-500 to-purple-500",
                count: "50+ Guides"
              },
              {
                title: "Quick Reference Sheets",
                description: "Handy cheat sheets for syntax, functions, and best practices",
                icon: FileText,
                color: "from-green-500 to-blue-500",
                count: "30+ Cheat Sheets"
              },
              {
                title: "Practice Resources",
                description: "Coding challenges, exercises, and project-based learning materials",
                icon: Code,
                color: "from-purple-500 to-pink-500",
                count: "100+ Problems"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">{item.count}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Subject Categories Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Available Study Materials</h3>
              <p className="text-gray-600">Comprehensive resources for all major programming languages and technologies</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "Python", icon: "🐍", color: "bg-green-100 text-green-700" },
                { name: "JavaScript", icon: "⚡", color: "bg-yellow-100 text-yellow-700" },
                { name: "React", icon: "⚛️", color: "bg-blue-100 text-blue-700" },
                { name: "Java", icon: "☕", color: "bg-red-100 text-red-700" },
                { name: "C++", icon: "⚙️", color: "bg-purple-100 text-purple-700" },
                { name: "Node.js", icon: "🟢", color: "bg-green-100 text-green-700" },
                { name: "Data Science", icon: "📊", color: "bg-cyan-100 text-cyan-700" },
                { name: "Machine Learning", icon: "🤖", color: "bg-pink-100 text-pink-700" },
                { name: "Web Dev", icon: "🌐", color: "bg-indigo-100 text-indigo-700" },
                { name: "DevOps", icon: "🔧", color: "bg-gray-100 text-gray-700" },
                { name: "Mobile Dev", icon: "📱", color: "bg-purple-100 text-purple-700" },
                { name: "Cybersecurity", icon: "🛡️", color: "bg-red-100 text-red-700" }
              ].map((subject, index) => (
                <div key={index} className={`${subject.color} rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer`}>
                  <div className="text-2xl mb-1">{subject.icon}</div>
                  <div className="text-xs font-medium">{subject.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Highlight */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: BookOpen,
                title: "Comprehensive Notes",
                description: "Detailed study guides covering all topics"
              },
              {
                icon: Target,
                title: "Quick References",
                description: "Cheat sheets for rapid learning"
              },
              {
                icon: Code,
                title: "Practice Problems",
                description: "Hands-on coding exercises"
              },
              {
                icon: TrendingUp,
                title: "Regular Updates",
                description: "Fresh content added weekly"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link 
              to="/notes" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 space-x-2"
            >
              <BookOpen className="w-6 h-6" />
              <span>Explore Study Materials</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <p className="text-gray-600 mt-4">Free access to all study materials and resources</p>
          </div>
        </div>
      </section>


      {/* Live Tests Section */}
      <section id="tests" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Assessment Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Test your programming skills with our comprehensive assessment platform featuring real-time analytics and personalized feedback
            </p>
          </div>

          {/* Platform Features */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Timer,
                title: "Timed Assessments",
                description: "Real exam conditions with countdown timers"
              },
              {
                icon: BarChart3,
                title: "Detailed Analytics",
                description: "Performance tracking and skill analysis"
              },
              {
                icon: Brain,
                title: "AI Recommendations",
                description: "Personalized learning suggestions"
              },
              {
                icon: Shield,
                title: "Secure Environment",
                description: "Anti-cheating measures and proctoring"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          

          {/* Programming Tests */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                language: "Python",
                icon: "🐍",
                image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                color: "from-green-500 to-blue-500",
                tests: [
                  { level: "Beginner", duration: "30 min", questions: 25, difficulty: "🟢" },
                  { level: "Intermediate", duration: "45 min", questions: 35, difficulty: "🟡" },
                  { level: "Advanced", duration: "60 min", questions: 45, difficulty: "🔴" }
                ]
              },
              {
                language: "JavaScript",
                icon: "⚡",
                image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                color: "from-yellow-500 to-orange-500",
                tests: [
                  { level: "Beginner", duration: "30 min", questions: 25, difficulty: "🟢" },
                  { level: "Intermediate", duration: "45 min", questions: 35, difficulty: "🟡" },
                  { level: "Advanced", duration: "60 min", questions: 45, difficulty: "🔴" }
                ]
              },
              {
                language: "Java",
                icon: "☕",
                image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                color: "from-red-500 to-pink-500",
                tests: [
                  { level: "Beginner", duration: "35 min", questions: 30, difficulty: "🟢" },
                  { level: "Intermediate", duration: "50 min", questions: 40, difficulty: "🟡" },
                  { level: "Advanced", duration: "65 min", questions: 50, difficulty: "🔴" }
                ]
              },
              {
                language: "C++",
                icon: "⚙️",
                image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
                color: "from-blue-500 to-purple-500",
                tests: [
                  { level: "Beginner", duration: "40 min", questions: 30, difficulty: "🟢" },
                  { level: "Intermediate", duration: "55 min", questions: 40, difficulty: "🟡" },
                  { level: "Advanced", duration: "70 min", questions: 50, difficulty: "🔴" }
                ]
              },
              {
                language: "AI & ML",
                icon: "🤖",
                image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
                color: "from-purple-500 to-pink-500",
                tests: [
                  { level: "Beginner", duration: "45 min", questions: 35, difficulty: "🟢" },
                  { level: "Intermediate", duration: "60 min", questions: 45, difficulty: "🟡" },
                  { level: "Advanced", duration: "75 min", questions: 55, difficulty: "🔴" }
                ]
              },
              {
                language: "Data Science",
                icon: "📊",
                image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
                color: "from-cyan-500 to-blue-500",
                tests: [
                  { level: "Beginner", duration: "40 min", questions: 30, difficulty: "🟢" },
                  { level: "Intermediate", duration: "55 min", questions: 40, difficulty: "🟡" },
                  { level: "Advanced", duration: "70 min", questions: 50, difficulty: "🔴" }
                ]
              }
            ].map((lang, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`bg-gradient-to-r ${lang.color} p-6 text-white flex items-center justify-between`}>
                  <div>
                    <h3 className="text-2xl font-bold">{lang.language}</h3>
                    <p className="text-white/90">Assessment Tests</p>
                  </div>
                  <div className="text-4xl">{lang.icon}</div>
                </div>
                {/* Add image below the colored header */}
                <div className="flex justify-center -mt-8 mb-2">
                  <img
                    src={lang.image}
                    alt={lang.language + " logo"}
                    className="w-16 h-16 rounded-full bg-white shadow-md border-2 border-blue-100 object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {lang.tests.map((test, testIndex) => (
                      <div key={testIndex} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{test.difficulty}</span>
                            <span className="font-semibold text-gray-900">{test.level}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {test.questions} questions
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {test.duration}
                          </div>
                          <Link 
                            to={`/test/${lang.language.toLowerCase().replace(/\s+/g, '-')}/${test.level.toLowerCase()}`}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-1"
                          >
                            <Play className="w-4 h-4" />
                            <span>Start Test</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Result Analysis */}
          <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Comprehensive Result Analysis</h3>
              <p className="text-gray-600">Get detailed insights into your performance with actionable recommendations</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Performance Breakdown</h4>
                <p className="text-sm text-gray-600">Detailed analysis by skill categories and question types</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your improvement over time with visual charts</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">AI Recommendations</h4>
                <p className="text-sm text-gray-600">Personalized study plan and resource suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who transformed their careers with our comprehensive programming courses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Jitesh",
                role: "",
                company: "",
                course: "Python & AI Fundamentals",
                avatar: "bg-gradient-to-r from-blue-500 to-purple-500",
                rating: 5,
                review: "Saurav's Python and AI course completely changed my career trajectory. His teaching style is incredibly clear, and the hands-on projects gave me the confidence to build modern AI models."
              },
              {
                name: "Sam",
                role: "",
                company: "",
                course: "C++ Programming Mastery",
                avatar: "bg-gradient-to-r from-green-500 to-blue-500",
                rating: 5,
                review: "As a complete beginner, I was intimidated by programming. Saurav's C++ course broke everything down perfectly. Now I'm confidently building applications and even got good ratings at school!"
              },
              {
                name: "Ema",
                role: "",
                company: "",
                course: "Full-Stack Web Development",
                avatar: "bg-gradient-to-r from-pink-500 to-orange-500",
                rating: 5,
                review: "The Web Development course exceeded all my expectations. Saurav doesn't just teach code - he teaches you how to think like a developer. The portfolio projects I built helped me secure multiple job offers!"
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${review.avatar} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    {/* Hide role and company if empty */}
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">Course: {review.course}</span>
                </div>
                <p className="text-gray-700 italic">"{review.review}"</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "500+", label: "Students Trained", icon: Users },
              { number: "95%", label: "Success Rate", icon: TrendingUp },
              { number: "4.9/5", label: "Average Rating", icon: Star },
              { number: "24/7", label: "Support Available", icon: CheckCircle }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Saurav Mukherjee</h2>
              <p className="text-lg text-gray-600 mb-6">
                As an experienced AI Engineer with over 8 years in the industry, I've worked with leading tech companies 
                and startups, developing cutting-edge AI solutions and mentoring hundreds of aspiring developers.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                My passion lies in making complex programming concepts accessible to everyone. Through hands-on projects, 
                real-world applications, and personalized mentorship, I help students build the skills they need to succeed 
                in today's competitive tech landscape.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Expertise</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Artificial Intelligence</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Machine Learning</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Full Stack Development</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Data Science</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Achievements</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><Award className="w-4 h-4 text-blue-500 mr-2" />500+ Students Mentored</li>
                    <li className="flex items-center"><Award className="w-4 h-4 text-blue-500 mr-2" />95% Sucesss Rate</li>
                    <li className="flex items-center"><Award className="w-4 h-4 text-blue-500 mr-2" />Industry Certified</li>
                    <li className="flex items-center"><Award className="w-4 h-4 text-blue-500 mr-2" />Published Researcher</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="./instructor.png" 
                alt="Saurav Mukherjee - AI Engineer and Programming Mentor" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Google Form Container */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-x-clip">
        {/* Decorative SVG Patterns - Left */}
        <div className="hidden md:block absolute left-0 top-0 h-full w-40 z-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="18" fill="#6366f1" opacity="0.15"/>
            <rect x="20" y="120" width="60" height="12" rx="6" fill="#3b82f6" opacity="0.12"/>
            <rect x="35" y="200" width="30" height="30" rx="8" fill="#a21caf" opacity="0.10"/>
            <circle cx="70" cy="320" r="14" fill="#f59e42" opacity="0.13"/>
            <rect x="10" y="350" width="80" height="8" rx="4" fill="#10b981" opacity="0.10"/>
          </svg>
          {/* Tech Stickers */}
          <div className="absolute left-2 top-24 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-8 h-8" />
          </div>
          <div className="absolute left-4 top-56 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-7 h-7" />
          </div>
          <div className="absolute left-8 top-80 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-7 h-7" />
          </div>
        </div>
        {/* Decorative SVG Patterns - Right */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-40 z-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="60" height="12" rx="6" fill="#f59e42" opacity="0.10"/>
            <circle cx="80" cy="120" r="16" fill="#10b981" opacity="0.13"/>
            <rect x="30" y="220" width="40" height="40" rx="10" fill="#6366f1" opacity="0.10"/>
            <circle cx="30" cy="340" r="12" fill="#a21caf" opacity="0.12"/>
            <rect x="10" y="370" width="80" height="8" rx="4" fill="#3b82f6" opacity="0.10"/>
          </svg>
          {/* Tech Stickers */}
          <div className="absolute right-2 top-16 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-8 h-8" />
          </div>
          <div className="absolute right-4 top-48 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-7 h-7" />
          </div>
          <div className="absolute right-8 top-80 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-7 h-7" />
          </div>
        </div>
        {/* Main Form Container */}
        <div className="relative z-20 flex justify-center">
          <div className="bg-white rounded-2xl p-4 sm:p-8 md:p-10 shadow-2xl border-4 border-blue-100 w-full max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">Student Inquiry Form</h3>
              <p className="text-gray-700">
                Tell me about your learning goals and I'll recommend the perfect course for you.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-2 sm:p-4 md:p-6 min-h-72 sm:min-h-96 border-2 border-blue-200 flex items-center justify-center overflow-auto shadow-inner">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSd6q231d2-tmW8r1KXCz6D9BVJT3EQBBZgLp22ZDX9RbfPrbQ/viewform?embedded=true"
                width="100%"
                height="700"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-lg w-full"
                style={{ minWidth: 0, maxWidth: "100%" }}
                title="Student Inquiry Form"
              >
                Loading…
              </iframe>
            </div>
            {/* Alternative contact information */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Or reach out directly for immediate assistance
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:sauravmukherjee928@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  📧 sauravmukherjee928@gmail.com
                </a>
                <a href="https://wa.me/917667133539" className="text-blue-600 hover:text-blue-700 font-medium">
                  📞 +91 7667133539 (Whatsapp)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Programming Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of successful students who have transformed their careers with our comprehensive courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-center">
              Explore Courses
            </Link>
            <a href="#tests" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Take Free Assessment
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Saurav Mukherjee</span>
              </div>
              <p className="text-gray-400">Empowering the next generation of programmers and AI engineers.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
      <Link to="/courses/python-ai" className="hover:text-blue-400 transition-colors">
        Python & AI
      </Link>
    </li>
    <li>
      <Link to="/courses/web-development" className="hover:text-blue-400 transition-colors">
        Web Development
      </Link>
    </li>
    <li>
      <Link to="/courses/data-science" className="hover:text-blue-400 transition-colors">
        Data Science
      </Link>
    </li>
    <li>
      <Link to="/courses/java" className="hover:text-blue-400 transition-colors">
        Java Programming
      </Link>
    </li>
  </ul>
</div>
<div>
  <h4 className="font-bold mb-4">Resources</h4>
  <ul className="space-y-2 text-gray-400">
    <li>
      <a href="#tests" className="hover:text-blue-400 transition-colors">
        Live Tests
      </a>
    </li>
    <li>
      <a href="#certifications" className="hover:text-blue-400 transition-colors">
        Certification Prep
      </a>
    </li>
    <li>
      <a href="#reviews" className="hover:text-blue-400 transition-colors">
        Student Reviews
      </a>
    </li>
    <li>
      <a href="#about" className="hover:text-blue-400 transition-colors">
        About Mentor
      </a>
    </li>
  </ul>
</div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="mailto:sauravmukherjee928@gmail.com"
                    className="hover:text-blue-400 transition-colors"
                    target="_blank" rel="noopener noreferrer"
                  >
                    📧 sauravmukherjee928@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/917667133539"
                    className="hover:text-green-400 transition-colors"
                    target="_blank" rel="noopener noreferrer"
                  >
                    📞 +91 7667133539 (Whatsapp)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sauravmukherjee44"
                    className="hover:text-blue-400 transition-colors"
                    target="_blank" rel="noopener noreferrer"
                  >
                    LinkedIn: /in/sauravmukherjee44
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sauravmukherjee44"
                    className="hover:text-blue-400 transition-colors"
                    target="_blank" rel="noopener noreferrer"
                  >
                    GitHub: /sauravmukherjee44
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Saurav Mukherjee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;