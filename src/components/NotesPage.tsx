import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  Code, 
  Database, 
  Globe, 
  Brain, 
  Smartphone, 
  Shield, 
  Cloud, 
  Gamepad2, 
  Coins, 
  Star, 
  TrendingUp, 
  Eye, 
  ChevronDown, 
  ChevronRight,
  X,
  Target,
  Award,
  Users,
  Clock
} from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link' | 'cheatsheet' | 'practice';
  url: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  downloads?: number;
  rating?: number;
  size?: string;
  pages?: number;
}

interface Subject {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  totalMaterials: number;
  category: string;
  materials: StudyMaterial[];
}

function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    'All', 'Programming Languages', 'Web Development', 'Mobile Development', 
    'Data Science', 'AI & Machine Learning', 'DevOps & Cloud', 'Cybersecurity', 
    'Game Development', 'Blockchain'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const subjects: Subject[] = [
    {
      id: 'python',
      name: 'Python Programming',
      icon: Code,
      color: 'from-green-500 to-blue-500',
      description: 'Complete Python programming resources from basics to advanced concepts',
      totalMaterials: 5,
      category: 'Programming Languages',
      materials: [
        {
          id: 'python-official-tutorial',
          title: 'Python Official Tutorial',
          type: 'pdf',
          url: 'https://docs.python.org/3/tutorial/index.html',
          description: 'Official Python tutorial from the Python Software Foundation. Credit: python.org',
          difficulty: 'Beginner',
          downloads: 15420,
          rating: 4.8,
          size: 'Online',
          pages: 120
        },
        {
          id: 'python-cheatsheet',
          title: 'Python Cheatsheet',
          type: 'cheatsheet',
          url: 'https://www.pythoncheatsheet.org/',
          description: 'Comprehensive Python syntax and functions reference. Credit: pythoncheatsheet.org',
          difficulty: 'Beginner',
          downloads: 8930,
          rating: 4.9,
          size: 'Online',
          pages: 8
        },
        {
          id: 'python-advanced',
          title: 'Real Python Tutorials',
          type: 'pdf',
          url: 'https://realpython.com/',
          description: 'Advanced Python concepts and tutorials. Credit: realpython.com',
          difficulty: 'Advanced',
          downloads: 5670,
          rating: 4.7,
          size: 'Online',
          pages: 180
        },
        {
          id: 'python-practice',
          title: 'HackerRank Python Practice',
          type: 'practice',
          url: 'https://www.hackerrank.com/domains/python',
          description: '100+ Python coding challenges with solutions. Credit: hackerrank.com',
          difficulty: 'Intermediate',
          downloads: 12340,
          rating: 4.6,
          size: 'Online',
          pages: 250
        },
        {
          id: 'python-data-structures',
          title: 'Problem Solving with Algorithms and Data Structures',
          type: 'doc',
          url: 'https://runestone.academy/runestone/books/published/pythonds/index.html',
          description: 'Open source book on data structures and algorithms in Python. Credit: runestone.academy',
          difficulty: 'Intermediate',
          downloads: 9870,
          rating: 4.8,
          size: 'Online',
          pages: 320
        }
      ]
    },
    {
      id: 'javascript',
      name: 'JavaScript & ES6+',
      icon: Globe,
      color: 'from-yellow-500 to-orange-500',
      description: 'Modern JavaScript development resources and best practices',
      totalMaterials: 4,
      category: 'Programming Languages',
      materials: [
        {
          id: 'js-modern-guide',
          title: 'JavaScript.info',
          type: 'doc',
          url: 'https://javascript.info/',
          description: 'Comprehensive modern JavaScript tutorial. Credit: javascript.info (Open License)',
          difficulty: 'Beginner',
          downloads: 18750,
          rating: 4.9,
          size: 'Online',
          pages: 200
        },
        {
          id: 'es6-features',
          title: 'ES6+ Features Cheat Sheet',
          type: 'cheatsheet',
          url: 'https://github.com/DrkSephy/es6-cheatsheet',
          description: 'Quick reference for all ES6+ features. Credit: github.com/DrkSephy/es6-cheatsheet',
          difficulty: 'Intermediate',
          downloads: 11230,
          rating: 4.7,
          size: 'Online',
          pages: 12
        },
        {
          id: 'js-dom-manipulation',
          title: 'MDN DOM Documentation',
          type: 'pdf',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
          description: 'Complete guide to DOM manipulation and event handling. Credit: MDN Web Docs',
          difficulty: 'Intermediate',
          downloads: 7890,
          rating: 4.6,
          size: 'Online',
          pages: 150
        },
        {
          id: 'js-async-programming',
          title: 'MDN Asynchronous JavaScript',
          type: 'doc',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
          description: 'Promises, async/await, and asynchronous programming patterns. Credit: MDN Web Docs',
          difficulty: 'Advanced',
          downloads: 6540,
          rating: 4.8,
          size: 'Online',
          pages: 95
        }
      ]
    },
    {
      id: 'react',
      name: 'React.js Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      description: 'React.js development from basics to advanced patterns',
      totalMaterials: 20,
      category: 'Web Development',
      materials: [
        {
          id: 'react-official-docs',
          title: 'React Official Documentation',
          type: 'doc',
          url: 'https://react.dev/',
          description: 'Official React documentation with interactive examples',
          difficulty: 'Beginner',
          downloads: 22340,
          rating: 4.9,
          size: '4.5 MB',
          pages: 280
        },
        {
          id: 'react-hooks-guide',
          title: 'React Hooks Complete Guide',
          type: 'pdf',
          url: 'https://overreacted.io/a-complete-guide-to-useeffect/',
          description: 'Comprehensive guide to React Hooks and their usage patterns',
          difficulty: 'Intermediate',
          downloads: 15670,
          rating: 4.8,
          size: '3.1 MB',
          pages: 180
        },
        {
          id: 'react-patterns',
          title: 'React Design Patterns & Best Practices',
          type: 'doc',
          url: 'https://reactpatterns.com/',
          description: 'Common React patterns and architectural best practices',
          difficulty: 'Advanced',
          downloads: 8920,
          rating: 4.7,
          size: '2.8 MB',
          pages: 160
        }
      ]
    },
    {
      id: 'java',
      name: 'Java Programming',
      icon: Code,
      color: 'from-red-500 to-pink-500',
      description: 'Java programming from fundamentals to enterprise development',
      totalMaterials: 28,
      category: 'Programming Languages',
      materials: [
        {
          id: 'java-oracle-tutorial',
          title: 'Oracle Java Tutorial',
          type: 'doc',
          url: 'https://docs.oracle.com/javase/tutorial/',
          description: 'Official Oracle Java tutorial covering all core concepts',
          difficulty: 'Beginner',
          downloads: 19850,
          rating: 4.8,
          size: '6.2 MB',
          pages: 400
        },
        {
          id: 'java-oop-guide',
          title: 'Java Object-Oriented Programming',
          type: 'pdf',
          url: 'https://www.oracle.com/java/technologies/javase/codeconventions-contents.html',
          description: 'Complete guide to OOP concepts in Java with examples',
          difficulty: 'Intermediate',
          downloads: 12450,
          rating: 4.7,
          size: '4.1 MB',
          pages: 220
        },
        {
          id: 'java-collections',
          title: 'Java Collections Framework Guide',
          type: 'cheatsheet',
          url: 'https://docs.oracle.com/javase/8/docs/technotes/guides/collections/',
          description: 'Comprehensive guide to Java Collections with performance analysis',
          difficulty: 'Intermediate',
          downloads: 9870,
          rating: 4.6,
          size: '2.3 MB',
          pages: 85
        }
      ]
    },
    {
      id: 'cpp',
      name: 'C++ Programming',
      icon: Code,
      color: 'from-blue-500 to-purple-500',
      description: 'C++ programming for system development and competitive programming',
      totalMaterials: 3,
      category: 'Programming Languages',
      materials: [
        {
          id: 'cpp-reference',
          title: 'C++ Reference Documentation',
          type: 'doc',
          url: 'https://en.cppreference.com/',
          description: 'Complete C++ language reference with examples. Credit: en.cppreference.com (Creative Commons Attribution-ShareAlike 3.0)',
          difficulty: 'Intermediate',
          downloads: 14230,
          rating: 4.9,
          size: 'Online',
          pages: 500
        },
        {
          id: 'cpp-tutorialpoint',
          title: 'C++ Tutorial (TutorialsPoint)',
          type: 'doc',
          url: 'https://www.tutorialspoint.com/cplusplus/index.htm',
          description: 'Beginner-friendly C++ tutorial with examples and explanations. Credit: TutorialsPoint',
          difficulty: 'Beginner',
          downloads: 11200,
          rating: 4.7,
          size: 'Online',
          pages: 120
        },
        {
          id: 'cpp-stl-guide',
          title: 'C++ STL Documentation (GeeksforGeeks)',
          type: 'cheatsheet',
          url: 'https://www.geeksforgeeks.org/the-c-standard-template-library-stl/',
          description: 'Standard Template Library containers, algorithms, and iterators. Credit: GeeksforGeeks',
          difficulty: 'Advanced',
          downloads: 8760,
          rating: 4.7,
          size: 'Online',
          pages: 190
        }
      ]
    },
    {
      id: 'data-structures',
      name: 'Data Structures & Algorithms',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      description: 'Comprehensive DSA resources for interviews and competitive programming',
      totalMaterials: 30,
      category: 'Programming Languages',
      materials: [
        {
          id: 'dsa-visualizer',
          title: 'Data Structures Visualizer',
          type: 'link',
          url: 'https://visualgo.net/',
          description: 'Interactive visualizations of data structures and algorithms',
          difficulty: 'Beginner',
          downloads: 25670,
          rating: 4.9,
          size: 'Online',
          pages: 0
        },
        {
          id: 'algorithms-guide',
          title: 'Algorithms Design Manual',
          type: 'pdf',
          url: 'https://www.algorist.com/',
          description: 'Comprehensive guide to algorithm design and analysis',
          difficulty: 'Advanced',
          downloads: 11230,
          rating: 4.8,
          size: '12.5 MB',
          pages: 650
        },
        {
          id: 'leetcode-patterns',
          title: 'LeetCode Problem Patterns',
          type: 'cheatsheet',
          url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns',
          description: 'Common patterns for solving coding interview problems',
          difficulty: 'Intermediate',
          downloads: 18940,
          rating: 4.7,
          size: '2.1 MB',
          pages: 45
        }
      ]
    },
    {
      id: 'machine-learning',
      name: 'Machine Learning',
      icon: Brain,
      color: 'from-green-500 to-teal-500',
      description: 'ML algorithms, frameworks, and practical implementation guides',
      totalMaterials: 3,
      category: 'AI & Machine Learning',
      materials: [
        {
          id: 'sklearn-user-guide',
          title: 'Scikit-learn User Guide',
          type: 'doc',
          url: 'https://scikit-learn.org/stable/user_guide.html',
          description: 'Official user guide for scikit-learn algorithms and usage. Credit: scikit-learn.org (BSD License)',
          difficulty: 'Intermediate',
          downloads: 16780,
          rating: 4.8,
          size: 'Online',
          pages: 6
        },
        {
          id: 'deep-learning-book',
          title: 'Deep Learning Textbook (Goodfellow, Bengio, Courville)',
          type: 'doc',
          url: 'https://www.deeplearningbook.org/',
          description: 'Comprehensive deep learning textbook, free online. Credit: Ian Goodfellow, Yoshua Bengio, Aaron Courville',
          difficulty: 'Advanced',
          downloads: 21340,
          rating: 4.9,
          size: 'Online',
          pages: 800
        },
        {
          id: 'ml-cheatsheet',
          title: 'Machine Learning Cheatsheet',
          type: 'cheatsheet',
          url: 'https://ml-cheatsheet.readthedocs.io/en/latest/',
          description: 'Open source ML algorithms and concepts summary. Credit: ml-cheatsheet.readthedocs.io',
          difficulty: 'Beginner',
          downloads: 15400,
          rating: 4.8,
          size: 'Online',
          pages: 40
        }
      ]
    },
    {
      id: 'web-development',
      name: 'Full Stack Web Development',
      icon: Globe,
      color: 'from-blue-500 to-green-500',
      description: 'Complete web development stack from frontend to backend',
      totalMaterials: 35,
      category: 'Web Development',
      materials: [
        {
          id: 'html-css-guide',
          title: 'HTML & CSS Complete Guide',
          type: 'doc',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web',
          description: 'MDN Web Docs complete guide to HTML and CSS',
          difficulty: 'Beginner',
          downloads: 28940,
          rating: 4.8,
          size: '8.2 MB',
          pages: 350
        },
        {
          id: 'nodejs-guide',
          title: 'Node.js Development Guide',
          type: 'pdf',
          url: 'https://nodejs.org/en/docs/guides/',
          description: 'Official Node.js guides for backend development',
          difficulty: 'Intermediate',
          downloads: 15670,
          rating: 4.7,
          size: '4.5 MB',
          pages: 200
        },
        {
          id: 'rest-api-design',
          title: 'RESTful API Design Best Practices',
          type: 'doc',
          url: 'https://restfulapi.net/',
          description: 'Complete guide to designing RESTful APIs',
          difficulty: 'Intermediate',
          downloads: 12340,
          rating: 4.6,
          size: '2.8 MB',
          pages: 120
        }
      ]
    },
    {
      id: 'mobile-development',
      name: 'Mobile App Development',
      icon: Smartphone,
      color: 'from-purple-500 to-blue-500',
      description: 'iOS, Android, and cross-platform mobile development resources',
      totalMaterials: 18,
      category: 'Mobile Development',
      materials: [
        {
          id: 'react-native-docs',
          title: 'React Native Documentation',
          type: 'doc',
          url: 'https://reactnative.dev/docs/getting-started',
          description: 'Official React Native documentation and tutorials',
          difficulty: 'Intermediate',
          downloads: 19870,
          rating: 4.8,
          size: '6.1 MB',
          pages: 280
        },
        {
          id: 'flutter-cookbook',
          title: 'Flutter Cookbook',
          type: 'doc',
          url: 'https://docs.flutter.dev/cookbook',
          description: 'Flutter recipes for common mobile app development tasks',
          difficulty: 'Intermediate',
          downloads: 16540,
          rating: 4.7,
          size: '5.3 MB',
          pages: 220
        }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud Computing',
      icon: Cloud,
      color: 'from-gray-500 to-blue-500',
      description: 'DevOps practices, cloud platforms, and infrastructure automation',
      totalMaterials: 22,
      category: 'DevOps & Cloud',
      materials: [
        {
          id: 'docker-guide',
          title: 'Docker Complete Guide',
          type: 'pdf',
          url: 'https://docs.docker.com/get-started/',
          description: 'Official Docker documentation and best practices',
          difficulty: 'Intermediate',
          downloads: 18230,
          rating: 4.8,
          size: '7.2 MB',
          pages: 300
        },
        {
          id: 'kubernetes-tutorial',
          title: 'Kubernetes Tutorial',
          type: 'doc',
          url: 'https://kubernetes.io/docs/tutorials/',
          description: 'Official Kubernetes tutorials and concepts',
          difficulty: 'Advanced',
          downloads: 12890,
          rating: 4.7,
          size: '9.1 MB',
          pages: 400
        },
        {
          id: 'aws-cheatsheet',
          title: 'AWS Services Cheat Sheet',
          type: 'cheatsheet',
          url: 'https://aws.amazon.com/getting-started/',
          description: 'Quick reference for AWS services and their use cases',
          difficulty: 'Intermediate',
          downloads: 21450,
          rating: 4.9,
          size: '3.2 MB',
          pages: 25
        }
      ]
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      description: 'Information security, ethical hacking, and security best practices',
      totalMaterials: 16,
      category: 'Cybersecurity',
      materials: [
        {
          id: 'owasp-guide',
          title: 'OWASP Security Guide',
          type: 'doc',
          url: 'https://owasp.org/www-project-top-ten/',
          description: 'OWASP Top 10 security risks and mitigation strategies',
          difficulty: 'Intermediate',
          downloads: 14670,
          rating: 4.8,
          size: '4.5 MB',
          pages: 180
        },
        {
          id: 'penetration-testing',
          title: 'Penetration Testing Guide',
          type: 'pdf',
          url: 'https://www.sans.org/white-papers/',
          description: 'Comprehensive guide to penetration testing methodologies',
          difficulty: 'Advanced',
          downloads: 8930,
          rating: 4.7,
          size: '6.8 MB',
          pages: 250
        }
      ]
    }
  ];

  const filteredSubjects = subjects.filter(subject => {
    const matchesCategory = selectedCategory === 'All' || subject.category === selectedCategory;
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const hasMaterialsWithDifficulty = selectedDifficulty === 'All' || 
      subject.materials.some(material => material.difficulty === selectedDifficulty);
    
    return matchesCategory && matchesSearch && hasMaterialsWithDifficulty;
  });

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'doc': return BookOpen;
      case 'link': return ExternalLink;
      case 'cheatsheet': return Target;
      case 'practice': return Code;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-50';
      case 'doc': return 'text-blue-600 bg-blue-50';
      case 'link': return 'text-green-600 bg-green-50';
      case 'cheatsheet': return 'text-purple-600 bg-purple-50';
      case 'practice': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-700 bg-green-100';
      case 'Intermediate': return 'text-yellow-700 bg-yellow-100';
      case 'Advanced': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  // Featured/Popular materials
  const featuredMaterials = subjects
    .flatMap(subject => subject.materials)
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 6);

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
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Study Materials</h1>
                <p className="text-sm text-gray-600">Notes, guides & resources</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notes & Study Materials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of study materials, cheat sheets, and resources for all programming languages and technologies
          </p>
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1 text-blue-600" />
              <span>200+ Resources</span>
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1 text-green-600" />
              <span>Free Downloads</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>Curated Content</span>
            </div>
          </div>
        </div>

        {/* Featured Materials */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              Most Popular Resources
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMaterials.map((material) => {
              const TypeIcon = getTypeIcon(material.type);
              return (
                <div key={material.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(material.type)}`}>
                      <TypeIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(material.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                        {material.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{material.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{material.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {material.downloads?.toLocaleString()} downloads
                    </span>
                    {material.size && (
                      <span>{material.size}</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-center text-sm flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </a>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm flex items-center justify-center"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
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

            {/* Difficulty Filter */}
            <div className="relative">
              <Target className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchTerm) && (
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
              {selectedDifficulty !== 'All' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {selectedDifficulty}
                  <button
                    onClick={() => setSelectedDifficulty('All')}
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
            Showing {filteredSubjects.length} subjects with {filteredSubjects.reduce((acc, subject) => acc + subject.totalMaterials, 0)} total materials
          </p>
        </div>

        {/* Subjects Display */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSubjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <div key={subject.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                     onClick={() => setSelectedSubject(subject)}>
                  <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                        <p className="text-white/90 text-sm">{subject.totalMaterials} materials</p>
                      </div>
                      <IconComponent className="w-12 h-12 text-white/80" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{subject.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{subject.category}</span>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                        View Materials
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View with Accordion */
          <div className="space-y-4">
            {filteredSubjects.map((subject) => {
              const IconComponent = subject.icon;
              const isExpanded = expandedSubjects.includes(subject.id);
              
              return (
                <div key={subject.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSubjectExpansion(subject.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{subject.name}</h3>
                          <p className="text-gray-600">{subject.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>{subject.totalMaterials} materials</span>
                            <span>•</span>
                            <span>{subject.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-4">
                        {subject.materials
                          .filter(material => selectedDifficulty === 'All' || material.difficulty === selectedDifficulty)
                          .map((material) => {
                            const TypeIcon = getTypeIcon(material.type);
                            return (
                              <div key={material.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                  <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>
                                    <TypeIcon className="w-4 h-4" />
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                                    {material.difficulty}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">{material.title}</h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{material.description}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                  <span className="flex items-center">
                                    <Download className="w-3 h-3 mr-1" />
                                    {material.downloads?.toLocaleString()}
                                  </span>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-3 h-3 ${i < Math.floor(material.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-center text-xs flex items-center justify-center"
                                  >
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </a>
                                  <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-xs flex items-center justify-center"
                                  >
                                    <Download className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSearchTerm('');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Subject Detail Modal */}
        {selectedSubject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className={`bg-gradient-to-r ${selectedSubject.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <selectedSubject.icon className="w-12 h-12 text-white" />
                    <div>
                      <h3 className="text-2xl font-bold">{selectedSubject.name}</h3>
                      <p className="text-white/90">{selectedSubject.description}</p>
                      <p className="text-white/80 text-sm mt-1">{selectedSubject.totalMaterials} materials available</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedSubject.materials.map((material) => {
                    const TypeIcon = getTypeIcon(material.type);
                    return (
                      <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-3 rounded-lg ${getTypeColor(material.type)}`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                            {material.difficulty}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{material.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{material.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {material.downloads?.toLocaleString()} downloads
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(material.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-center text-sm flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Online
                          </a>
                          <a
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm flex items-center justify-center"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;