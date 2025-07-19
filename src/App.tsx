import React from 'react';
import { Code, Brain, Database, Globe, Users, Award, BookOpen, Zap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Saurav Mukherjee
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#courses" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Courses</a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learn Programming &{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tech Skills
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                with <strong>Saurav Mukherjee</strong> – AI Engineer
              </p>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Master programming languages, AI, and cutting-edge technologies with expert guidance. 
                From beginner to industry-ready professional.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Learning Today
                </a>
                <a href="#courses" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Explore Courses
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg" 
                alt="Programming workspace with multiple monitors showing code"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <span className="font-semibold text-gray-800">AI Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose My Courses?</h2>
            <p className="text-xl text-gray-600 mt-4">Industry-proven teaching methods with real-world applications</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All Levels Welcome</h3>
              <p className="text-gray-600">From complete beginners to advanced professionals</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-on Projects</h3>
              <p className="text-gray-600">Real-world projects that build your portfolio</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Learn from an experienced AI Engineer</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry-Ready Skills</h3>
              <p className="text-gray-600">Skills that employers are actively seeking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Comprehensive Course Offerings</h2>
            <p className="text-xl text-gray-600 mt-4">Master the technologies that power the future</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Programming Languages</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {['C', 'C++', 'Python', 'Java', 'JavaScript', 'More Languages'].map((lang) => (
                  <div key={lang} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-800">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg" 
                alt="Programming code on multiple screens"
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg" 
                alt="AI and machine learning visualization"
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Modern Technologies</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Artificial Intelligence</h4>
                    <p className="text-gray-600 text-sm">Build intelligent systems and applications</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <Database className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Science & ML</h4>
                    <p className="text-gray-600 text-sm">Extract insights from data and build predictive models</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <Globe className="h-6 w-6 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Web Development</h4>
                    <p className="text-gray-600 text-sm">Create modern, responsive web applications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">What Students Say</h2>
            <p className="text-xl text-gray-600 mt-4">Real feedback from students who've transformed their careers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Zoheb's Review */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  Z
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Zoheb</h3>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "Saurav's Python and AI course completely changed my career trajectory. His teaching style is incredibly clear, and the hands-on projects gave me the confidence to land my dream job as a Machine Learning Engineer."
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Course:</span> Python & AI Fundamentals
              </div>
            </div>

            {/* Sam's Review */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Sam</h3>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "As a complete beginner, I was intimidated by programming. Saurav's C++ course broke everything down perfectly. Now I'm confidently building applications and even got promoted at work!"
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Course:</span> C++ Programming Mastery
              </div>
            </div>

            {/* Ema's Review */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  E
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Ema</h3>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "The Web Development course exceeded all my expectations. Saurav doesn't just teach code - he teaches you how to think like a developer. The portfolio projects I built helped me secure multiple job offers!"
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Course:</span> Full-Stack Web Development
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" 
                alt="Professional instructor teaching technology"
                className="rounded-xl shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Saurav Mukherjee</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As an experienced AI Engineer, I'm passionate about sharing knowledge and helping others succeed in the rapidly evolving tech industry. My comprehensive courses are designed to be practical and engaging, ensuring you gain real-world skills that matter.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Each course features hands-on projects that not only teach you the fundamentals but also build your portfolio with industry-ready work. Whether you're starting your programming journey or advancing your existing skills, I provide expert guidance tailored to your level.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Engineer & Educator</h3>
                  <p className="text-gray-600">Bridging the gap between theory and practice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Google Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Ready to Start Learning?</h2>
            <p className="text-xl text-gray-600 mt-4">
              Fill out the inquiry form below and I'll get back to you with course details and enrollment information.
            </p>
          </div>
          
          {/* Google Form Container */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Student Inquiry Form</h3>
              <p className="text-gray-600">Tell me about your learning goals and I'll recommend the perfect course for you.</p>
            </div>
            
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd6q231d2-tmW8r1KXCz6D9BVJT3EQBBZgLp22ZDX9RbfPrbQ/viewform?embedded=true" width="640" height="961" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            
            {/* Alternative contact information */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Or reach out directly for immediate assistance
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:sauravmukherjee928@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  📧 sauravmukherjee928@gmail.com
                </a>
                <a href="tel:+917667133539" className="text-blue-600 hover:text-blue-700 font-medium">
                  📞 +91 7667133539 (Whatsapp)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">Saurav Mukherjee</span>
              </div>
              <p className="text-gray-400">
                Empowering the next generation of programmers and tech professionals with cutting-edge skills and industry expertise.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#courses" className="text-gray-400 hover:text-white transition-colors">Courses</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Artificial Intelligence</li>
                <li className="text-gray-400">Machine Learning</li>
                <li className="text-gray-400">Web Development</li>
                <li className="text-gray-400">Data Science</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Saurav Mukherjee. All rights reserved. | AI Engineer & Programming Instructor
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;