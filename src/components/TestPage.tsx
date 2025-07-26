import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  TrendingUp, 
  Award,
  RefreshCw,
  Home,
  Target,
  Brain
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: string;
}

interface TestResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  categoryScores: { [key: string]: { correct: number; total: number } };
  recommendations: string[];
}

interface ApiQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
function TestPage() {
  const { language, level } = useParams<{ language: string; level: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test configuration based on language and level
  const getTestConfig = () => {
    const configs: { [key: string]: { [key: string]: { duration: number; questionCount: number } } } = {
      'python': {
        'beginner': { duration: 30, questionCount: 25 },
        'intermediate': { duration: 45, questionCount: 35 },
        'advanced': { duration: 60, questionCount: 45 }
      },
      'javascript': {
        'beginner': { duration: 30, questionCount: 25 },
        'intermediate': { duration: 45, questionCount: 35 },
        'advanced': { duration: 60, questionCount: 45 }
      },
      'java': {
        'beginner': { duration: 35, questionCount: 30 },
        'intermediate': { duration: 50, questionCount: 40 },
        'advanced': { duration: 65, questionCount: 50 }
      },
      'c++': {
        'beginner': { duration: 40, questionCount: 30 },
        'intermediate': { duration: 55, questionCount: 40 },
        'advanced': { duration: 70, questionCount: 50 }
      },
      'ai-&-ml': {
        'beginner': { duration: 45, questionCount: 35 },
        'intermediate': { duration: 60, questionCount: 45 },
        'advanced': { duration: 75, questionCount: 55 }
      },
      'data-science': {
        'beginner': { duration: 40, questionCount: 30 },
        'intermediate': { duration: 55, questionCount: 40 },
        'advanced': { duration: 70, questionCount: 50 }
      }
    };

    return configs[language || 'python']?.[level || 'beginner'] || { duration: 30, questionCount: 25 };
  };

  // Map language to API categories
  const getApiCategories = (lang: string) => {
    const categoryMap: { [key: string]: number[] } = {
      'python': [18], // Computer Science
      'javascript': [18], // Computer Science
      'java': [18], // Computer Science
      'c++': [18], // Computer Science
      'ai-&-ml': [18, 19], // Computer Science, Mathematics
      'data-science': [18, 19] // Computer Science, Mathematics
    };
    return categoryMap[lang] || [18];
  };

  // Fetch questions from Open Trivia Database API
  const fetchQuestionsFromAPI = async (): Promise<Question[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const config = getTestConfig();
      const difficultyMap: { [key: string]: string } = {
        'beginner': 'easy',
        'intermediate': 'medium',
        'advanced': 'hard'
      };
      
      const apiDifficulty = difficultyMap[level || 'beginner'];
      
      const allQuestions: Question[] = [];
      let questionId = 1;
      
      // Try to fetch questions from multiple sources to get enough questions
      const categories = getApiCategories(language || 'python');
      const maxAttemptsPerCategory = 3;
      
      // First, try to get questions from API
      for (let attempt = 0; attempt < maxAttemptsPerCategory && allQuestions.length < config.questionCount; attempt++) {
        for (const categoryId of categories) {
          if (allQuestions.length >= config.questionCount) break;
          
          try {
            const questionsNeeded = Math.min(50, config.questionCount - allQuestions.length);
            const response = await fetch(
              `https://opentdb.com/api.php?amount=${questionsNeeded}&category=${category}&difficulty=${apiDifficulty}&type=multiple`
            );
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const formattedQuestions = data.results.map((apiQ: ApiQuestion) => {
                const options = [...apiQ.incorrect_answers, apiQ.correct_answer].sort(() => Math.random() - 0.5);
                const correctIndex = options.indexOf(apiQ.correct_answer);
                
                return {
                  id: questionId++,
                  question: decodeHtmlEntities(apiQ.question),
                  options: options.map(option => decodeHtmlEntities(option)),
                  correctAnswer: correctIndex,
                  explanation: `The correct answer is "${decodeHtmlEntities(apiQ.correct_answer)}". This question tests your knowledge of ${getCategoryName(apiQ.category, language || 'python')}.`,
                  category: getCategoryName(apiQ.category, language || 'python'),
                  difficulty: apiQ.difficulty
                };
              });
              
              allQuestions.push(...formattedQuestions);
            }
          } catch (categoryError) {
            console.warn(`Failed to fetch questions for category ${categoryId}, attempt ${attempt + 1}:`, categoryError);
          }
        }
      }
      
      // If we don't have enough questions from API, add some fallback questions
      if (allQuestions.length < config.questionCount) {
        console.log(`Only got ${allQuestions.length} questions from API, generating fallback questions`);
        const fallbackQuestions = generateFallbackQuestions(language || 'python', level || 'beginner', questionId);
        const needed = config.questionCount - allQuestions.length;
        allQuestions.push(...fallbackQuestions.slice(0, needed));
      }
      
      // Ensure we have exactly the right number of questions
      const finalQuestions = allQuestions.slice(0, config.questionCount);
      console.log(`Final question count: ${finalQuestions.length} / ${config.questionCount}`);
      return finalQuestions;
      
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Using fallback questions.');
      return generateFallbackQuestions(language || 'python', level || 'beginner', 1);
    } finally {
      setLoading(false);
    }
  };

  // Decode HTML entities from API responses
  const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Get category name based on language
  const getCategoryName = (apiCategory: string, lang: string): string => {
    const categoryMap: { [key: string]: string[] } = {
      'python': ['Python Basics', 'Data Structures', 'Functions', 'OOP', 'Libraries'],
      'javascript': ['JS Fundamentals', 'DOM Manipulation', 'Async Programming', 'ES6+', 'Frameworks'],
      'java': ['Java Basics', 'OOP', 'Collections', 'Multithreading', 'Spring'],
      'c++': ['C++ Fundamentals', 'Memory Management', 'STL', 'Templates', 'Performance'],
      'ai-&-ml': ['Machine Learning', 'Neural Networks', 'Data Processing', 'Algorithms', 'Tools'],
      'data-science': ['Statistics', 'Data Analysis', 'Visualization', 'Python/R', 'Big Data']
    };
    
    const categories = categoryMap[lang] || ['Programming', 'Computer Science', 'Software Development'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // Fallback questions in case API fails
  const generateFallbackQuestions = (lang: string, difficulty: string, startId: number): Question[] => {
    const config = getTestConfig();
    const fallbackQuestions: Question[] = [];
    
    // Generate language-specific questions
   const questionTemplates = {
  'python': [
    // 🟢 Easy (1–25)
    {
      question: "What is the correct way to comment in Python?",
      options: ["// this is a comment", "# this is a comment", "/* this is a comment */", "-- this is a comment"],
      correctAnswer: 1,
      category: "Syntax"
    },
    {
      question: "How do you assign a value to a variable in Python?",
      options: ["x <- 5", "x := 5", "x = 5", "x == 5"],
      correctAnswer: 2,
      category: "Python Basics"
    },
    {
      question: "Which function is used to display output in Python?",
      options: ["echo()", "print()", "display()", "output()"],
      correctAnswer: 1,
      category: "Functions"
    },
    {
      question: "Which of the following is a mutable data type in Python?",
      options: ["tuple", "string", "list", "int"],
      correctAnswer: 2,
      category: "Data Structures"
    },
    {
      question: "What does 'len()' function do in Python?",
      options: ["Returns length of object", "Creates a list", "Loops through items", "Defines a variable"],
      correctAnswer: 0,
      category: "Functions"
    },
    {
      question: "How do you create a class in Python?",
      options: ["class MyClass:", "Class MyClass:", "create MyClass:", "new MyClass:"],
      correctAnswer: 0,
      category: "OOP"
    },
    {
      question: "Which library is commonly used for data analysis in Python?",
      options: ["requests", "pandas", "flask", "django"],
      correctAnswer: 1,
      category: "Libraries"
    },
    {
      question: "Which of these is a valid list?",
      options: ["(1, 2, 3)", "{1, 2, 3}", "[1, 2, 3]", "<1, 2, 3>"],
      correctAnswer: 2,
      category: "Data Structures"
    },
    {
      question: "What is the keyword to create a loop in Python?",
      options: ["loop", "for", "repeat", "iterate"],
      correctAnswer: 1,
      category: "Loops"
    },
    {
      question: "Which keyword is used for a conditional statement?",
      options: ["for", "def", "if", "loop"],
      correctAnswer: 2,
      category: "Conditionals"
    },
    {
      question: "How do you import a module in Python?",
      options: ["require module", "import module", "#include module", "using module"],
      correctAnswer: 1,
      category: "Modules"
    },
    {
      question: "Which one is an integer?",
      options: ["'5'", "5.0", "5", "\"five\""],
      correctAnswer: 2,
      category: "Data Types"
    },
    {
      question: "Which function converts a string to an integer?",
      options: ["string()", "int()", "toInt()", "convert()"],
      correctAnswer: 1,
      category: "Type Conversion"
    },
    {
      question: "Which operator is used to check equality?",
      options: ["=", "==", "===", "!="],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "What is the output of `print(2 + 3 * 4)`?",
      options: ["20", "14", "24", "9"],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "What is the result of `3 > 2 and 2 > 1`?",
      options: ["False", "True", "None", "Error"],
      correctAnswer: 1,
      category: "Boolean Logic"
    },
    {
      question: "Which symbol is used for exponentiation?",
      options: ["^", "**", "//", "exp()"],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "What is the output of `type(10.5)`?",
      options: ["<class 'float'>", "<float>", "float", "int"],
      correctAnswer: 0,
      category: "Data Types"
    },
    {
      question: "Which function returns the type of a variable?",
      options: ["datatype()", "typeof()", "type()", "gettype()"],
      correctAnswer: 2,
      category: "Functions"
    },
    {
      question: "How do you create a tuple?",
      options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"],
      correctAnswer: 2,
      category: "Data Structures"
    },
    {
      question: "What is the output of `len('Python')`?",
      options: ["5", "6", "7", "Error"],
      correctAnswer: 1,
      category: "Strings"
    },
    {
      question: "What is the output of `'Py' + 'thon'`?",
      options: ["Python", "Py thon", "Error", "None"],
      correctAnswer: 0,
      category: "Strings"
    },
    {
      question: "What does `range(3)` return?",
      options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[3]"],
      correctAnswer: 1,
      category: "Loops"
    },
    {
      question: "How do you define a function?",
      options: ["func myFunc():", "def myFunc():", "function myFunc():", "define myFunc():"],
      correctAnswer: 1,
      category: "Functions"
    },
    {
      question: "Which keyword defines a function?",
      options: ["define", "def", "func", "method"],
      correctAnswer: 1,
      category: "Functions"
    },

    // 🟡 Medium (26–35)
    {
      question: "What is the output of: `print(2 ** 3)`?",
      options: ["5", "6", "8", "9"],
      correctAnswer: 2,
      category: "Operators"
    },
    {
      question: "Which method adds an item to a list?",
      options: ["add()", "insert()", "append()", "push()"],
      correctAnswer: 2,
      category: "Data Structures"
    },
    {
      question: "What is the output of: `bool('False')`?",
      options: ["False", "True", "None", "Error"],
      correctAnswer: 1,
      category: "Data Types"
    },
    {
      question: "What does `self` refer to in Python classes?",
      options: ["A keyword", "The class name", "The instance", "The method"],
      correctAnswer: 2,
      category: "OOP"
    },
    {
      question: "What is the correct way to handle exceptions?",
      options: ["try-catch", "try: except:", "catch: try:", "handle:"],
      correctAnswer: 1,
      category: "Error Handling"
    },
    {
      question: "Which function is used to get user input?",
      options: ["scan()", "input()", "get()", "read()"],
      correctAnswer: 1,
      category: "I/O"
    },
    {
      question: "How do you slice the first three elements of a list `mylist`?",
      options: ["mylist[0:3]", "mylist[:3]", "both A and B", "mylist[1:3]"],
      correctAnswer: 2,
      category: "Data Structures"
    },
    {
      question: "What does the `in` keyword do?",
      options: ["Iterates a loop", "Checks membership", "Defines variable", "Compares types"],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "What is the result of `'a' * 3`?",
      options: ["aaa", "a3", "Error", "a a a"],
      correctAnswer: 0,
      category: "Strings"
    },
    {
      question: "What does `enumerate()` do?",
      options: ["Adds values", "Returns index and value", "Deletes item", "Sorts list"],
      correctAnswer: 1,
      category: "Functions"
    },

    // 🔴 Hard (36–45)
    {
      question: "What is the output of: `list(map(lambda x: x*x, [1, 2, 3]))`?",
      options: ["[2,4,6]", "[1,4,9]", "[1,2,3]", "[1,8,27]"],
      correctAnswer: 1,
      category: "Functional Programming"
    },
    {
      question: "What will `set([1,2,2,3])` return?",
      options: ["[1,2,3]", "{1,2,3}", "[1,2,2,3]", "{1,2,2,3}"],
      correctAnswer: 1,
      category: "Data Structures"
    },
    {
      question: "How do you define a generator in Python?",
      options: ["Using yield", "Using return", "Using def", "Using async"],
      correctAnswer: 0,
      category: "Generators"
    },
    {
      question: "What is the result of: `2 < 3 < 4`?",
      options: ["True", "False", "Error", "None"],
      correctAnswer: 0,
      category: "Operators"
    },
    {
      question: "Which library is used for numerical computing?",
      options: ["pandas", "seaborn", "numpy", "tkinter"],
      correctAnswer: 2,
      category: "Libraries"
    },
    {
      question: "What does the `zip()` function do?",
      options: ["Joins lists element-wise", "Sorts lists", "Merges strings", "Compresses data"],
      correctAnswer: 0,
      category: "Functions"
    },
    {
      question: "What is a decorator in Python?",
      options: ["Loop", "Function modifier", "Variable", "Module"],
      correctAnswer: 1,
      category: "Advanced Functions"
    },
    {
      question: "What is a Python lambda?",
      options: ["Anonymous function", "Loop", "Class", "Keyword"],
      correctAnswer: 0,
      category: "Functions"
    },
    {
      question: "What does `*args` do?",
      options: ["Multiplies args", "Accepts any number of positional args", "Specifies return", "None of these"],
      correctAnswer: 1,
      category: "Functions"
    },
    {
      question: "What does `is` check in Python?",
      options: ["Type", "Value equality", "Identity", "Length"],
      correctAnswer: 2,
      category: "Operators"
    }
  ],
 
  'java': [
    // 🟢 Easy (1–25)
    {
      question: "What is the main method signature in Java?",
      options: ["public static void main(String[] args)", "public void main(String args)", "static void main(String[] args)", "public main(String[] args)"],
      correctAnswer: 0,
      category: "Java Basics"
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["inherits", "extends", "implements", "super"],
      correctAnswer: 1,
      category: "OOP"
    },
    {
      question: "Which of the following is a valid Java identifier?",
      options: ["1number", "number_1", "number-1", "number 1"],
      correctAnswer: 1,
      category: "Syntax"
    },
    {
      question: "Which of the following is a valid data type in Java?",
      options: ["integer", "int", "number", "real"],
      correctAnswer: 1,
      category: "Data Types"
    },
    {
      question: "Which method is used to print to the console in Java?",
      options: ["console.log()", "System.print()", "System.out.print()", "print()"],
      correctAnswer: 2,
      category: "I/O"
    },
    {
      question: "How do you declare a class in Java?",
      options: ["class MyClass {}", "MyClass class {}", "define class MyClass {}", "class: MyClass {}"],
      correctAnswer: 0,
      category: "Classes"
    },
    {
      question: "Which symbol is used to terminate a statement in Java?",
      options: [".", ":", ";", "#"],
      correctAnswer: 2,
      category: "Syntax"
    },
    {
      question: "Which loop runs at least once even if the condition is false?",
      options: ["for", "while", "do-while", "foreach"],
      correctAnswer: 2,
      category: "Loops"
    },
    {
      question: "What is the size of `int` in Java?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on system"],
      correctAnswer: 1,
      category: "Data Types"
    },
    {
      question: "Which keyword is used to define a constant variable?",
      options: ["const", "static", "final", "immutable"],
      correctAnswer: 2,
      category: "Modifiers"
    },
    {
      question: "What is the default value of a boolean in Java?",
      options: ["true", "false", "null", "0"],
      correctAnswer: 1,
      category: "Data Types"
    },
    {
      question: "Which class is used to take user input in Java?",
      options: ["Scanner", "Reader", "Input", "Console"],
      correctAnswer: 0,
      category: "I/O"
    },
    {
      question: "What does JVM stand for?",
      options: ["Java Verified Machine", "Java Virtual Machine", "Just Virtual Machine", "Java Variable Memory"],
      correctAnswer: 1,
      category: "Java Basics"
    },
    {
      question: "Which operator is used for addition?",
      options: ["*", "+", "=", "/"],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "Which keyword is used to create an object?",
      options: ["object", "init", "new", "make"],
      correctAnswer: 2,
      category: "OOP"
    },
    {
      question: "What is the extension of compiled Java files?",
      options: [".java", ".exe", ".class", ".compile"],
      correctAnswer: 2,
      category: "Java Basics"
    },
    {
      question: "Which method starts the thread execution?",
      options: ["run()", "start()", "init()", "execute()"],
      correctAnswer: 1,
      category: "Multithreading"
    },
    {
      question: "Which access modifier makes a variable visible only within the same class?",
      options: ["public", "private", "protected", "default"],
      correctAnswer: 1,
      category: "Access Modifiers"
    },
    {
      question: "Which exception is checked at compile time?",
      options: ["NullPointerException", "IOException", "ArithmeticException", "ArrayIndexOutOfBoundsException"],
      correctAnswer: 1,
      category: "Exceptions"
    },
    {
      question: "Which loop is used to iterate through arrays easily?",
      options: ["for", "foreach", "while", "do-while"],
      correctAnswer: 1,
      category: "Loops"
    },
    {
      question: "Which class provides dynamic arrays in Java?",
      options: ["Array", "LinkedList", "ArrayList", "HashMap"],
      correctAnswer: 2,
      category: "Collections"
    },
    {
      question: "What is the superclass of all classes in Java?",
      options: ["Object", "Class", "Base", "Root"],
      correctAnswer: 0,
      category: "OOP"
    },
    {
      question: "What does `this` keyword refer to?",
      options: ["Current method", "Current object", "Super class", "Static method"],
      correctAnswer: 1,
      category: "OOP"
    },
    {
      question: "What does `==` compare in Java?",
      options: ["Values", "References", "Types", "Classes"],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "Which package contains the Scanner class?",
      options: ["java.io", "java.util", "java.lang", "java.input"],
      correctAnswer: 1,
      category: "Libraries"
    },

    // 🟡 Medium (26–35)
    {
      question: "What is the output of `System.out.println(10 / 3)`?",
      options: ["3.33", "3", "3.0", "Error"],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "Which method is used to find the length of a string?",
      options: ["length", "length()", "size()", "getLength()"],
      correctAnswer: 1,
      category: "Strings"
    },
    {
      question: "Which interface must be implemented to sort objects?",
      options: ["Comparable", "Comparator", "Iterable", "Collection"],
      correctAnswer: 0,
      category: "Interfaces"
    },
    {
      question: "Which keyword is used to prevent inheritance?",
      options: ["final", "static", "private", "sealed"],
      correctAnswer: 0,
      category: "OOP"
    },
    {
      question: "How do you create an abstract class?",
      options: ["class MyClass {}", "abstract class MyClass {}", "virtual class MyClass {}", "interface MyClass {}"],
      correctAnswer: 1,
      category: "OOP"
    },
    {
      question: "What is the default access modifier in Java?",
      options: ["public", "private", "protected", "package-private"],
      correctAnswer: 3,
      category: "Access Modifiers"
    },
    {
      question: "Which collection does not allow duplicates?",
      options: ["List", "Set", "Map", "Queue"],
      correctAnswer: 1,
      category: "Collections"
    },
    {
      question: "Which block is always executed in exception handling?",
      options: ["try", "catch", "finally", "throw"],
      correctAnswer: 2,
      category: "Exceptions"
    },
    {
      question: "Which interface is used for lambda expressions?",
      options: ["Runnable", "Serializable", "FunctionalInterface", "Callable"],
      correctAnswer: 2,
      category: "Functional Programming"
    },
    {
      question: "Which stream class is used for reading text line by line?",
      options: ["BufferedReader", "FileInputStream", "Scanner", "Reader"],
      correctAnswer: 0,
      category: "File I/O"
    },

    // 🔴 Hard (36–45)
    {
      question: "What is method overloading?",
      options: ["Same method name, different parameters", "Same method name, same parameters", "Two classes with same method", "Subclass changing behavior"],
      correctAnswer: 0,
      category: "OOP"
    },
    {
      question: "Which of the following is used to implement runtime polymorphism?",
      options: ["Method overloading", "Method overriding", "Constructor", "Abstract class"],
      correctAnswer: 1,
      category: "Polymorphism"
    },
    {
      question: "Which collection maintains insertion order and allows duplicates?",
      options: ["HashSet", "TreeSet", "ArrayList", "LinkedHashSet"],
      correctAnswer: 3,
      category: "Collections"
    },
    {
      question: "Which annotation is used to suppress warnings in Java?",
      options: ["@SafeVarargs", "@SuppressWarnings", "@Override", "@Deprecated"],
      correctAnswer: 1,
      category: "Annotations"
    },
    {
      question: "Which feature of Java supports dynamic method resolution at runtime?",
      options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
      correctAnswer: 1,
      category: "OOP"
    },
    {
      question: "Which class is used to create immutable strings?",
      options: ["String", "StringBuilder", "StringBuffer", "CharSequence"],
      correctAnswer: 0,
      category: "Strings"
    },
    {
      question: "Which exception is thrown when dividing by zero?",
      options: ["ArithmeticException", "IOException", "NullPointerException", "NumberFormatException"],
      correctAnswer: 0,
      category: "Exceptions"
    },
    {
      question: "Which keyword is used for synchronization?",
      options: ["locked", "threaded", "sync", "synchronized"],
      correctAnswer: 3,
      category: "Multithreading"
    },
    {
      question: "Which stream class is used to write objects to files?",
      options: ["ObjectOutputStream", "BufferedWriter", "FileWriter", "OutputStreamWriter"],
      correctAnswer: 0,
      category: "File I/O"
    },
    {
      question: "Which type of class cannot be instantiated?",
      options: ["Abstract", "Public", "Private", "Static"],
      correctAnswer: 0,
      category: "OOP"
    }
  ],
  'javascript': [
    // 🟢 Easy (1–25)
    {
      question: "How do you declare a variable in JavaScript?",
      options: ["var x;", "variable x;", "v x;", "declare x;"],
      correctAnswer: 0,
      category: "JS Fundamentals"
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
      category: "Arrays"
    },
    {
      question: "How do you select an element by ID in JavaScript?",
      options: ["document.getElement('id')", "document.getElementById('id')", "document.select('#id')", "document.find('id')"],
      correctAnswer: 1,
      category: "DOM Manipulation"
    },
    {
      question: "Which keyword is used to define a constant variable?",
      options: ["var", "let", "const", "static"],
      correctAnswer: 2,
      category: "Variables"
    },
    {
      question: "What is the output of `typeof null`?",
      options: ["'null'", "'object'", "'undefined'", "'number'"],
      correctAnswer: 1,
      category: "Types"
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
      correctAnswer: 1,
      category: "Syntax"
    },
    {
      question: "What does `NaN` stand for?",
      options: ["Not a Name", "No assigned Number", "Not a Number", "Null and None"],
      correctAnswer: 2,
      category: "Types"
    },
    {
      question: "What does `===` mean in JavaScript?",
      options: ["Equal by value", "Equal by reference", "Strict equality", "Assignment"],
      correctAnswer: 2,
      category: "Operators"
    },
    {
      question: "Which operator is used to assign a value?",
      options: ["=", "==", "===", ":"],
      correctAnswer: 0,
      category: "Operators"
    },
    {
      question: "How do you define a function in JavaScript?",
      options: ["function myFunc()", "def myFunc()", "func myFunc()", "function = myFunc()"],
      correctAnswer: 0,
      category: "Functions"
    },
    {
      question: "What does `console.log()` do?",
      options: ["Logs to browser history", "Logs to console", "Logs to file", "Sends HTTP log"],
      correctAnswer: 1,
      category: "Debugging"
    },
    {
      question: "Which loop will execute at least once?",
      options: ["for", "while", "do-while", "forEach"],
      correctAnswer: 2,
      category: "Loops"
    },
    {
      question: "Which data type is not primitive?",
      options: ["String", "Boolean", "Object", "Number"],
      correctAnswer: 2,
      category: "Data Types"
    },
    {
      question: "How do you convert a string to an integer?",
      options: ["parseInt()", "int()", "toInt()", "Number.parse()"],
      correctAnswer: 0,
      category: "Conversion"
    },
    {
      question: "What will `typeof undefined` return?",
      options: ["'null'", "'object'", "'undefined'", "'NaN'"],
      correctAnswer: 2,
      category: "Types"
    },
    {
      question: "Which of these is falsy in JavaScript?",
      options: ["0", `"false"`, `"0"`, `"null"`],
      correctAnswer: 0,
      category: "Truthy/Falsy"
    },
    {
      question: "What does `Array.isArray([])` return?",
      options: ["true", "false", "undefined", "error"],
      correctAnswer: 0,
      category: "Arrays"
    },
    {
      question: "Which object is the root of the browser DOM?",
      options: ["window", "document", "html", "body"],
      correctAnswer: 0,
      category: "DOM"
    },
    {
      question: "What does `event.preventDefault()` do?",
      options: ["Stops page refresh", "Closes event", "Logs error", "Prevents console"],
      correctAnswer: 0,
      category: "Events"
    },
    {
      question: "How do you declare a string?",
      options: [`"hello"`, `hello`, `string('hello')`, `<hello>`],
      correctAnswer: 0,
      category: "Strings"
    },
    {
      question: "What value does `Boolean('')` return?",
      options: ["true", "false", "null", "undefined"],
      correctAnswer: 1,
      category: "Booleans"
    },
    {
      question: "Which array method removes the last element?",
      options: ["pop()", "remove()", "slice()", "shift()"],
      correctAnswer: 0,
      category: "Arrays"
    },
    {
      question: "What keyword is used to exit a loop?",
      options: ["end", "return", "break", "exit"],
      correctAnswer: 2,
      category: "Control Flow"
    },
    {
      question: "What will `typeof []` return?",
      options: ["array", "object", "list", "undefined"],
      correctAnswer: 1,
      category: "Types"
    },
    {
      question: "Which method is used to join array elements?",
      options: ["connect()", "join()", "merge()", "combine()"],
      correctAnswer: 1,
      category: "Arrays"
    },

    // 🟡 Medium (26–35)
    {
      question: "Which method is used to copy an object?",
      options: ["Object.assign()", "copy()", "clone()", "Object.copy()"],
      correctAnswer: 0,
      category: "Objects"
    },
    {
      question: "Which of the following is block-scoped?",
      options: ["var", "let", "const", "both let and const"],
      correctAnswer: 3,
      category: "Variables"
    },
    {
      question: "How do you write an arrow function?",
      options: ["()=>{}", "function => {}", "-> function", "fn() -> {}"],
      correctAnswer: 0,
      category: "Functions"
    },
    {
      question: "What does `JSON.stringify()` do?",
      options: ["Converts string to JSON", "Parses JSON", "Converts JS object to JSON string", "None"],
      correctAnswer: 2,
      category: "JSON"
    },
    {
      question: "Which value is returned by `[].length`?",
      options: ["undefined", "null", "0", "error"],
      correctAnswer: 2,
      category: "Arrays"
    },
    {
      question: "Which operator is used for exponentiation?",
      options: ["^", "**", "^^", "//"],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "Which keyword creates a class in JavaScript?",
      options: ["function", "object", "class", "new"],
      correctAnswer: 2,
      category: "Classes"
    },
    {
      question: "How to handle errors in a `try` block?",
      options: ["error()", "fail()", "catch()", "rescue()"],
      correctAnswer: 2,
      category: "Error Handling"
    },
    {
      question: "What is the purpose of `use strict`?",
      options: ["Disable strict typing", "Enable new JavaScript features", "Catch silent errors", "Increase speed"],
      correctAnswer: 2,
      category: "Strict Mode"
    },
    {
      question: "Which keyword defines a generator function?",
      options: ["generate", "function*", "yield", "gen"],
      correctAnswer: 1,
      category: "Advanced Functions"
    },

    // 🔴 Hard (36–45)
    {
      question: "What is closure in JavaScript?",
      options: ["Function inside a function", "Function with private scope", "Inner function accessing outer variables", "None"],
      correctAnswer: 2,
      category: "Closures"
    },
    {
      question: "What is a Promise?",
      options: ["Data structure", "Function callback", "Object representing async result", "Synchronous value"],
      correctAnswer: 2,
      category: "Async Programming"
    },
    {
      question: "Which method resolves all promises in an array?",
      options: ["Promise.any()", "Promise.resolve()", "Promise.all()", "Promise.wait()"],
      correctAnswer: 2,
      category: "Promises"
    },
    {
      question: "What is the output of `0.1 + 0.2 === 0.3`?",
      options: ["true", "false", "NaN", "undefined"],
      correctAnswer: 1,
      category: "Math"
    },
    {
      question: "Which event is fired when the DOM is fully loaded?",
      options: ["onload", "DOMContentLoaded", "ready", "loadend"],
      correctAnswer: 1,
      category: "Events"
    },
    {
      question: "How can you prevent object mutation?",
      options: ["freezeObject()", "Object.freeze()", "lock()", "const"],
      correctAnswer: 1,
      category: "Objects"
    },
    {
      question: "Which of the following is a WeakMap?",
      options: ["Map with weak keys", "Map with null values", "Map that leaks memory", "Map without keys"],
      correctAnswer: 0,
      category: "Advanced Data Types"
    },
    {
      question: "What is tail call optimization?",
      options: ["Recursion cleanup", "Function chaining", "Stack reuse in recursion", "Garbage collection"],
      correctAnswer: 2,
      category: "Advanced Functions"
    },
    {
      question: "Which syntax defines async function?",
      options: ["async function()", "function async()", "function* async()", "def async()"],
      correctAnswer: 0,
      category: "Async Programming"
    },
    {
      question: "What does the `yield` keyword do?",
      options: ["Pause function", "Break loop", "Return value", "Continue"],
      correctAnswer: 0,
      category: "Generators"
    }
  ],
  'c++': [
    // 🟢 Easy (1–25)
    {
      question: "Which keyword is used to define a function in C++?",
      options: ["def", "func", "void", "function"],
      correctAnswer: 2,
      category: "Functions"
    },
    {
      question: "What is the correct syntax to declare an integer variable in C++?",
      options: ["int x;", "x int;", "int = x;", "integer x;"],
      correctAnswer: 0,
      category: "Variables"
    },
    {
      question: "Which symbol is used to include a header file in C++?",
      options: ["@", "#", "$", "!"],
      correctAnswer: 1,
      category: "Preprocessor"
    },
    {
      question: "Which of these is a correct comment in C++?",
      options: ["// this is a comment", "/* this is a comment */", "-- comment", "Both A and B"],
      correctAnswer: 3,
      category: "Syntax"
    },
    {
      question: "Which function is used to output to the console in C++?",
      options: ["print()", "System.out.print()", "cout", "Console.Write()"],
      correctAnswer: 2,
      category: "Input/Output"
    },
    {
      question: "What is the extension of a C++ source file?",
      options: [".c", ".cp", ".cpp", ".cxx"],
      correctAnswer: 2,
      category: "Basics"
    },
    {
      question: "Which keyword is used for decision making in C++?",
      options: ["switch", "case", "if", "All of the above"],
      correctAnswer: 3,
      category: "Control Flow"
    },
    {
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "None"],
      correctAnswer: 2,
      category: "Loops"
    },
    {
      question: "How do you take input from the user in C++?",
      options: ["cin", "scanf", "input()", "getInput()"],
      correctAnswer: 0,
      category: "Input/Output"
    },
    {
      question: "Which operator is used for assignment in C++?",
      options: ["==", "=", "!=", ":="],
      correctAnswer: 1,
      category: "Operators"
    },
    {
      question: "Which of the following is a relational operator in C++?",
      options: ["+", "&&", "==", "="],
      correctAnswer: 2,
      category: "Operators"
    },
    {
      question: "Which one is a valid identifier in C++?",
      options: ["1num", "_value", "float", "#data"],
      correctAnswer: 1,
      category: "Variables"
    },
    {
      question: "Which header file is required for cout and cin?",
      options: ["<stdlib.h>", "<conio.h>", "<iostream>", "<stdio.h>"],
      correctAnswer: 2,
      category: "Header Files"
    },
    {
      question: "What is the return type of main() in C++?",
      options: ["void", "char", "int", "float"],
      correctAnswer: 2,
      category: "Functions"
    },
    {
      question: "Which loop is used when the number of iterations is known?",
      options: ["while", "do-while", "for", "if"],
      correctAnswer: 2,
      category: "Loops"
    },
    {
      question: "Which operator is used for increment in C++?",
      options: ["++", "+=", "+", "inc"],
      correctAnswer: 0,
      category: "Operators"
    },
    {
      question: "Which data type is used to store true/false values?",
      options: ["bool", "bit", "boolean", "truth"],
      correctAnswer: 0,
      category: "Data Types"
    },
    {
      question: "What does 'endl' do in C++?",
      options: ["Ends the program", "Adds a new line", "Clears screen", "Ends a statement"],
      correctAnswer: 1,
      category: "Input/Output"
    },
    {
      question: "How do you declare a constant variable?",
      options: ["constant int x = 5;", "final int x = 5;", "const int x = 5;", "static int x = 5;"],
      correctAnswer: 2,
      category: "Constants"
    },
    {
      question: "Which function is the entry point of a C++ program?",
      options: ["start()", "main()", "begin()", "execute()"],
      correctAnswer: 1,
      category: "Functions"
    },
    {
      question: "Which keyword is used to define a block of code?",
      options: ["block", "set", "begin-end", "{}"],
      correctAnswer: 3,
      category: "Syntax"
    },
    {
      question: "Which of the following is a correct function declaration?",
      options: ["int func();", "func int();", "int();", "function int()"],
      correctAnswer: 0,
      category: "Functions"
    },
    {
      question: "Which character ends a C++ statement?",
      options: [";", ".", ":", ","],
      correctAnswer: 0,
      category: "Syntax"
    },
    {
      question: "Which header file is used for mathematical operations?",
      options: ["<cmath>", "<math.h>", "<maths>", "<mathfunc>"],
      correctAnswer: 0,
      category: "Libraries"
    },
    {
      question: "Which keyword creates an object of a class?",
      options: ["create", "class", "new", "object"],
      correctAnswer: 2,
      category: "OOP"
    },

    // 🟡 Medium (26–35)
    {
      question: "What is a class in C++?",
      options: ["A data type", "An object", "A blueprint for creating objects", "A variable"],
      correctAnswer: 2,
      category: "OOP"
    },
    {
      question: "Which of these is used to create a constructor?",
      options: ["function with return type", "function without name", "function with class name", "function with static"],
      correctAnswer: 2,
      category: "OOP"
    },
    {
      question: "What is the output of 5 / 2 in C++?",
      options: ["2", "2.5", "2.0", "3"],
      correctAnswer: 0,
      category: "Operators"
    },
    {
      question: "Which keyword prevents a class from being inherited?",
      options: ["sealed", "final", "const", "static"],
      correctAnswer: 1,
      category: "OOP"
    },
    {
      question: "What is function overloading?",
      options: ["Two functions with same name but different parameters", "Two classes with same function", "Using same function in two classes", "Replacing a function"],
      correctAnswer: 0,
      category: "OOP"
    },
    {
      question: "Which keyword is used to handle exceptions?",
      options: ["error", "try", "if", "handle"],
      correctAnswer: 1,
      category: "Exceptions"
    },
    {
      question: "Which container does not allow duplicate elements?",
      options: ["vector", "list", "set", "map"],
      correctAnswer: 2,
      category: "STL"
    },
    {
      question: "What is the use of 'this' pointer?",
      options: ["Points to object", "Points to base class", "Points to static variables", "None"],
      correctAnswer: 0,
      category: "Pointers"
    },
    {
      question: "What is the default access specifier for class members?",
      options: ["public", "protected", "private", "internal"],
      correctAnswer: 2,
      category: "OOP"
    },
    {
      question: "What is a namespace in C++?",
      options: ["A memory location", "A class", "A declarative region", "A data structure"],
      correctAnswer: 2,
      category: "Namespaces"
    },

    // 🔴 Hard (36–45)
    {
      question: "What is polymorphism in C++?",
      options: ["Many variables", "Function overloading and overriding", "Multiple inheritance", "Encapsulation"],
      correctAnswer: 1,
      category: "OOP"
    },
    {
      question: "Which of these is a virtual function?",
      options: ["Function declared with virtual keyword", "Static function", "Template function", "Constructor"],
      correctAnswer: 0,
      category: "Advanced OOP"
    },
    {
      question: "What does 'new' keyword do in C++?",
      options: ["Deletes object", "Creates object on stack", "Allocates memory dynamically", "Closes program"],
      correctAnswer: 2,
      category: "Memory Management"
    },
    {
      question: "Which of the following is a smart pointer in C++11?",
      options: ["auto_ptr", "shared_ptr", "raw_ptr", "own_ptr"],
      correctAnswer: 1,
      category: "Advanced"
    },
    {
      question: "What is the type of exception caught by catch(...) block?",
      options: ["int", "char", "all types", "runtime_error"],
      correctAnswer: 2,
      category: "Exceptions"
    },
    {
      question: "What is multiple inheritance?",
      options: ["One class inherits many classes", "One class is inherited by many", "One function used by many", "Overloading"],
      correctAnswer: 0,
      category: "OOP"
    },
    {
      question: "Which class template is used for key-value pairs?",
      options: ["set", "map", "vector", "queue"],
      correctAnswer: 1,
      category: "STL"
    },
    {
      question: "Which C++ keyword is used to free memory allocated by new?",
      options: ["free", "delete", "dispose", "release"],
      correctAnswer: 1,
      category: "Memory Management"
    },
    {
      question: "What is RAII in C++?",
      options: ["Runtime Allocation Initialization Interface", "Resource Acquisition Is Initialization", "Random Access In Iterator", "None"],
      correctAnswer: 1,
      category: "Advanced"
    },
    {
      question: "What does STL stand for in C++?",
      options: ["Standard Template Library", "Standard Type Library", "Static Template Library", "Simple Template List"],
      correctAnswer: 0,
      category: "STL"
    }
  ],

  'ai-&-ml': [
    // 🟢 Easy (1–25)
    {
      question: "What does AI stand for?",
      options: ["Automated Intelligence", "Artificial Insight", "Artificial Intelligence", "Advanced Interface"],
      correctAnswer: 2,
      category: "AI Basics"
    },
    {
      question: "Which of the following is a type of machine learning?",
      options: ["Supervised learning", "Improvised learning", "Indexed learning", "Sampled learning"],
      correctAnswer: 0,
      category: "ML Basics"
    },
    {
      question: "What is the goal of supervised learning?",
      options: ["To find hidden patterns", "To label data", "To use labeled data to predict outputs", "To clean data"],
      correctAnswer: 2,
      category: "Supervised Learning"
    },
    {
      question: "Which algorithm is used for classification problems?",
      options: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"],
      correctAnswer: 1,
      category: "Algorithms"
    },
    {
      question: "Which of these is a Python library used in ML?",
      options: ["React", "Django", "TensorFlow", "Flask"],
      correctAnswer: 2,
      category: "Libraries"
    },
    {
      question: "What does NLP stand for in AI?",
      options: ["Natural Language Programming", "Neural Logic Processing", "Natural Language Processing", "Non-linear Programming"],
      correctAnswer: 2,
      category: "NLP"
    },
    {
      question: "What is overfitting in machine learning?",
      options: ["Model is too simple", "Model fits training data too well", "Model fails to learn", "Model is too fast"],
      correctAnswer: 1,
      category: "Model Performance"
    },
    {
      question: "Which of these is an example of unsupervised learning?",
      options: ["Decision Trees", "K-Means Clustering", "Linear Regression", "Logistic Regression"],
      correctAnswer: 1,
      category: "Unsupervised Learning"
    },
    {
      question: "Which function is used to reduce model loss in training?",
      options: ["Optimizer", "Evaluator", "Compiler", "Regressor"],
      correctAnswer: 0,
      category: "Optimization"
    },
    {
      question: "What does 'epoch' mean in ML training?",
      options: ["One pass through the dataset", "Number of models", "Type of neural layer", "Loss function"],
      correctAnswer: 0,
      category: "Training"
    },
    {
      question: "Which metric is used to evaluate classification?",
      options: ["MAE", "RMSE", "Accuracy", "MSE"],
      correctAnswer: 2,
      category: "Evaluation"
    },
    {
      question: "What does the sigmoid function do?",
      options: ["Normalize between 0 and 1", "Cluster data", "Reduce variance", "Split features"],
      correctAnswer: 0,
      category: "Activation Functions"
    },
    {
      question: "Which algorithm is often used in recommendation systems?",
      options: ["Random Forest", "KNN", "Collaborative Filtering", "SVM"],
      correctAnswer: 2,
      category: "Applications"
    },
    {
      question: "Which of the following is a regression algorithm?",
      options: ["K-Means", "Logistic Regression", "Linear Regression", "Naive Bayes"],
      correctAnswer: 2,
      category: "Algorithms"
    },
    {
      question: "What is the role of a loss function?",
      options: ["Measure model accuracy", "Determine learning rate", "Calculate prediction error", "Transform data"],
      correctAnswer: 2,
      category: "Optimization"
    },
    {
      question: "Which one is not a type of machine learning?",
      options: ["Supervised", "Unsupervised", "Reinforcement", "Informative"],
      correctAnswer: 3,
      category: "ML Basics"
    },
    {
      question: "Which language is most popular for AI development?",
      options: ["Java", "Python", "C++", "PHP"],
      correctAnswer: 1,
      category: "Languages"
    },
    {
      question: "Which AI system defeated a Go champion?",
      options: ["IBM Watson", "Deep Blue", "AlphaGo", "Siri"],
      correctAnswer: 2,
      category: "History"
    },
    {
      question: "What does a confusion matrix measure?",
      options: ["True vs Predicted labels", "Clustering quality", "Data accuracy", "Noise"],
      correctAnswer: 0,
      category: "Evaluation"
    },
    {
      question: "Which library provides pre-built models for ML?",
      options: ["NumPy", "Scikit-learn", "OpenCV", "Pandas"],
      correctAnswer: 1,
      category: "Libraries"
    },
    {
      question: "Which AI technique mimics the human brain?",
      options: ["Genetic Algorithms", "Neural Networks", "Decision Trees", "Clustering"],
      correctAnswer: 1,
      category: "Neural Networks"
    },
    {
      question: "What is precision in classification tasks?",
      options: ["TP / (TP + FP)", "TP / (TP + FN)", "FP / (FP + TN)", "TN / (TN + FN)"],
      correctAnswer: 0,
      category: "Evaluation"
    },
    {
      question: "Which technique reduces the number of input variables?",
      options: ["Overfitting", "Feature selection", "Label encoding", "Boosting"],
      correctAnswer: 1,
      category: "Feature Engineering"
    },
    {
      question: "What is reinforcement learning?",
      options: ["Learning with no labels", "Learning from rewards and penalties", "Learning from regression", "None"],
      correctAnswer: 1,
      category: "Reinforcement Learning"
    },
    {
      question: "Which component adjusts weights during training?",
      options: ["Loss function", "Optimizer", "Bias", "Neuron"],
      correctAnswer: 1,
      category: "Training"
    },

    // 🟡 Medium (26–35)
    {
      question: "What is gradient descent used for?",
      options: ["Clustering data", "Optimizing weights", "Evaluating models", "Scaling features"],
      correctAnswer: 1,
      category: "Optimization"
    },
    {
      question: "What is backpropagation?",
      options: ["Forward data processing", "Updating weights based on error", "Convolution process", "Normalization"],
      correctAnswer: 1,
      category: "Neural Networks"
    },
    {
      question: "What is a ROC curve used for?",
      options: ["Clustering", "Regression analysis", "Evaluating classification", "Training models"],
      correctAnswer: 2,
      category: "Evaluation"
    },
    {
      question: "Which of the following is a deep learning framework?",
      options: ["Scikit-learn", "XGBoost", "Keras", "Matplotlib"],
      correctAnswer: 2,
      category: "Libraries"
    },
    {
      question: "What is vanishing gradient problem?",
      options: ["Large weights", "Loss grows too fast", "Gradients shrink to zero", "Too much data"],
      correctAnswer: 2,
      category: "Neural Networks"
    },
    {
      question: "What is dropout in neural networks?",
      options: ["Removing outliers", "Reducing neuron activity during training", "Eliminating low weights", "Cleaning data"],
      correctAnswer: 1,
      category: "Regularization"
    },
    {
      question: "What is the purpose of ReLU?",
      options: ["Saturate values", "Keep values between -1 and 1", "Remove negatives", "Allow only positive activation"],
      correctAnswer: 3,
      category: "Activation Functions"
    },
    {
      question: "Which metric is used in regression problems?",
      options: ["F1-score", "Precision", "RMSE", "Recall"],
      correctAnswer: 2,
      category: "Evaluation"
    },
    {
      question: "What is the curse of dimensionality?",
      options: ["Too little data", "Too many labels", "Too many features degrade model", "Not enough processing power"],
      correctAnswer: 2,
      category: "Data Processing"
    },
    {
      question: "What is the primary task of PCA?",
      options: ["Regression", "Classification", "Dimensionality Reduction", "Prediction"],
      correctAnswer: 2,
      category: "Feature Engineering"
    },

    // 🔴 Hard (36–45)
    {
      question: "What is the vanishing gradient problem?",
      options: ["Model crashes", "Input is too large", "Gradients get too small to update weights", "Loss increases sharply"],
      correctAnswer: 2,
      category: "Neural Networks"
    },
    {
      question: "What is transfer learning?",
      options: ["Learning with multiple models", "Training from scratch", "Using pre-trained model knowledge", "Learning in clusters"],
      correctAnswer: 2,
      category: "Advanced Techniques"
    },
    {
      question: "Which algorithm is commonly used in object detection?",
      options: ["RNN", "YOLO", "SVM", "PCA"],
      correctAnswer: 1,
      category: "Computer Vision"
    },
    {
      question: "Which technique is used to prevent overfitting?",
      options: ["Data Augmentation", "Under-sampling", "Gradient boosting", "Early stopping"],
      correctAnswer: 3,
      category: "Model Tuning"
    },
    {
      question: "What is a hyperparameter?",
      options: ["Parameter learned during training", "External configuration before training", "A neuron function", "An error"],
      correctAnswer: 1,
      category: "Model Tuning"
    },
    {
      question: "What is attention mechanism in NLP?",
      options: ["Focuses on input parts that matter", "Skips unimportant words", "Changes grammar", "Translates faster"],
      correctAnswer: 0,
      category: "NLP"
    },
    {
      question: "What does LSTM stand for?",
      options: ["Limited Short Term Memory", "Long Short-Term Memory", "Long Storage Training Model", "Layered Semantic Transfer Model"],
      correctAnswer: 1,
      category: "Deep Learning"
    },
    {
      question: "Which transformer model is used in ChatGPT?",
      options: ["LSTM", "GRU", "GPT", "BERT"],
      correctAnswer: 2,
      category: "Transformers"
    },
    {
      question: "What is BERT good at?",
      options: ["Text generation", "Image detection", "Text classification and question answering", "Speech synthesis"],
      correctAnswer: 2,
      category: "NLP"
    },
    {
      question: "What does GAN stand for?",
      options: ["General AI Network", "Generative Adversarial Network", "Global Attention Network", "Generative Analytical Node"],
      correctAnswer: 1,
      category: "Generative Models"
    }
  ],
 
  'data-science': [
    // 🟢 Easy (1–30)
    {
      question: "What does 'data science' primarily involve?",
      options: ["Cooking recipes", "Collecting and analyzing data", "Drawing images", "Managing servers"],
      correctAnswer: 1,
      category: "Introduction"
    },
    {
      question: "Which of these is a common tool used in data science?",
      options: ["Photoshop", "TensorBoard", "Excel", "Adobe Illustrator"],
      correctAnswer: 2,
      category: "Tools"
    },
    {
      question: "What does CSV stand for?",
      options: ["Character Separated Values", "Comma Separated Values", "Column Storage Values", "Current Sheet Value"],
      correctAnswer: 1,
      category: "Data Formats"
    },
    {
      question: "What is the use of NumPy in Python?",
      options: ["Image processing", "Numerical computing", "String manipulation", "Web development"],
      correctAnswer: 1,
      category: "Libraries"
    },
    {
      question: "Which library is used for data visualization?",
      options: ["matplotlib", "flask", "tensorflow", "pandas"],
      correctAnswer: 0,
      category: "Visualization"
    },
    {
      question: "What is the role of a data scientist?",
      options: ["Managing IT systems", "Designing UX", "Extracting insights from data", "Writing blogs"],
      correctAnswer: 2,
      category: "Roles"
    },
    {
      question: "Which of the following is a data type in pandas?",
      options: ["DataGrid", "DataFrame", "DataSheet", "DataTable"],
      correctAnswer: 1,
      category: "Pandas"
    },
    {
      question: "What is missing data?",
      options: ["Data that is out of range", "Data that is not relevant", "Data that is not available", "Data that is duplicated"],
      correctAnswer: 2,
      category: "Data Cleaning"
    },
    {
      question: "Which of the following is a measure of central tendency?",
      options: ["Mean", "Variance", "Standard deviation", "Range"],
      correctAnswer: 0,
      category: "Statistics"
    },
    {
      question: "Which Python library is widely used for data manipulation?",
      options: ["Seaborn", "PyTorch", "Pandas", "Scikit-learn"],
      correctAnswer: 2,
      category: "Libraries"
    },
    {
      question: "What is the output of data.describe()?",
      options: ["Correlation matrix", "Summary statistics", "Data visualization", "Data types"],
      correctAnswer: 1,
      category: "Pandas"
    },
    {
      question: "What is the purpose of data preprocessing?",
      options: ["To clean and prepare data for analysis", "To store data", "To destroy data", "To encrypt data"],
      correctAnswer: 0,
      category: "Data Cleaning"
    },
    {
      question: "What is outlier detection used for?",
      options: ["Enhancing image quality", "Finding incorrect data points", "Reducing data size", "Encrypting data"],
      correctAnswer: 1,
      category: "EDA"
    },
    {
      question: "Which chart type is used to show trends over time?",
      options: ["Pie chart", "Histogram", "Line chart", "Box plot"],
      correctAnswer: 2,
      category: "Visualization"
    },
    {
      question: "Which value represents the middle of a dataset?",
      options: ["Mean", "Median", "Mode", "Range"],
      correctAnswer: 1,
      category: "Statistics"
    },
    {
      question: "What is variance?",
      options: ["Average of all data", "Measure of spread", "Sum of values", "Most frequent value"],
      correctAnswer: 1,
      category: "Statistics"
    },
    {
      question: "What type of plot shows distribution of a dataset?",
      options: ["Line plot", "Scatter plot", "Histogram", "Bar chart"],
      correctAnswer: 2,
      category: "Visualization"
    },
    {
      question: "Which package helps build ML models in data science?",
      options: ["keras", "scikit-learn", "matplotlib", "pandas"],
      correctAnswer: 1,
      category: "ML"
    },
    {
      question: "Which one is not a data type in pandas?",
      options: ["int", "float", "category", "stringlist"],
      correctAnswer: 3,
      category: "Pandas"
    },
    {
      question: "Which operation helps combine two datasets?",
      options: ["merge", "split", "scale", "loop"],
      correctAnswer: 0,
      category: "Data Wrangling"
    },
    {
      question: "What does correlation show?",
      options: ["Size of data", "Relationship between variables", "Standard deviation", "Errors"],
      correctAnswer: 1,
      category: "Statistics"
    },
    {
      question: "What is data normalization?",
      options: ["Data encryption", "Data cleaning", "Scaling data to a range", "Deleting duplicates"],
      correctAnswer: 2,
      category: "Preprocessing"
    },
    {
      question: "Which of these is an ordinal data example?",
      options: ["Age", "Temperature", "Ratings (1–5)", "Height"],
      correctAnswer: 2,
      category: "Data Types"
    },
    {
      question: "What does the head() function return in pandas?",
      options: ["Last 5 rows", "Summary", "First 5 rows", "All column names"],
      correctAnswer: 2,
      category: "Pandas"
    },
    {
      question: "Which graph is used to show categorical data?",
      options: ["Line chart", "Bar chart", "Scatter plot", "Histogram"],
      correctAnswer: 1,
      category: "Visualization"
    },
    {
      question: "What is one-hot encoding used for?",
      options: ["Scaling numbers", "Visualizing data", "Converting categories to binary", "Removing outliers"],
      correctAnswer: 2,
      category: "Encoding"
    },
    {
      question: "Which step comes before model training?",
      options: ["Prediction", "Data preparation", "Hyperparameter tuning", "Evaluation"],
      correctAnswer: 1,
      category: "Workflow"
    },
    {
      question: "What is the goal of EDA (Exploratory Data Analysis)?",
      options: ["Build models", "Clean data", "Understand data structure and patterns", "Test predictions"],
      correctAnswer: 2,
      category: "EDA"
    },
    {
      question: "Which library is best for statistical modeling in Python?",
      options: ["NumPy", "Statsmodels", "TensorFlow", "PyTorch"],
      correctAnswer: 1,
      category: "Libraries"
    },

    // 🟡 Medium (31–45)
    {
      question: "What does a box plot represent?",
      options: ["Frequency", "Correlation", "Distribution with quartiles", "Mean"],
      correctAnswer: 2,
      category: "Visualization"
    },
    {
      question: "Which technique is used for dimensionality reduction?",
      options: ["SVM", "PCA", "KNN", "Gradient Boosting"],
      correctAnswer: 1,
      category: "Feature Engineering"
    },
    {
      question: "What is the difference between data wrangling and cleaning?",
      options: ["No difference", "Wrangling includes restructuring data", "Cleaning is final step", "Cleaning focuses on merging only"],
      correctAnswer: 1,
      category: "Data Wrangling"
    },
    {
      question: "What is an imbalanced dataset?",
      options: ["Dataset with missing values", "Dataset with unequal class distribution", "Very large dataset", "Dataset with too many features"],
      correctAnswer: 1,
      category: "Data Quality"
    },
    {
      question: "Which metric measures how well predicted values match actual values?",
      options: ["Accuracy", "F1 Score", "R-squared", "Confusion Matrix"],
      correctAnswer: 2,
      category: "Model Evaluation"
    },
    {
      question: "What is the primary use of time series analysis?",
      options: ["Predict stock prices", "Image recognition", "Data compression", "Text summarization"],
      correctAnswer: 0,
      category: "Time Series"
    },
    {
      question: "Which plot shows the relationship between two numerical variables?",
      options: ["Bar chart", "Line chart", "Histogram", "Scatter plot"],
      correctAnswer: 3,
      category: "EDA"
    },
    {
      question: "Which error metric is used in regression problems?",
      options: ["Recall", "F1 Score", "RMSE", "Precision"],
      correctAnswer: 2,
      category: "Evaluation"
    },
    {
      question: "What is feature scaling used for?",
      options: ["Reducing text", "Cleaning data", "Normalizing features", "Creating classes"],
      correctAnswer: 2,
      category: "Preprocessing"
    },
    {
      question: "What is cross-validation used for?",
      options: ["Hyperparameter tuning", "Splitting data", "Evaluating model generalization", "Encoding data"],
      correctAnswer: 2,
      category: "Model Validation"
    },
    {
      question: "What is multicollinearity?",
      options: ["Multiple outputs", "Features that are highly correlated", "Missing values", "Low data variance"],
      correctAnswer: 1,
      category: "Data Quality"
    },
    {
      question: "Which of these helps with big data processing?",
      options: ["Excel", "Apache Spark", "Pandas", "Numpy"],
      correctAnswer: 1,
      category: "Big Data"
    },
    {
      question: "What is feature engineering?",
      options: ["Feature deletion", "Creating new features from raw data", "Scaling models", "Merging models"],
      correctAnswer: 1,
      category: "Feature Engineering"
    },
    {
      question: "Which test checks if two datasets have the same mean?",
      options: ["Z-test", "Chi-square", "T-test", "ANOVA"],
      correctAnswer: 2,
      category: "Statistics"
    },

    // 🔴 Hard (46–50)
    {
      question: "What is the difference between bagging and boosting?",
      options: ["Bagging uses deep learning", "Boosting builds sequential models", "Bagging trains models one by one", "Boosting is used only for classification"],
      correctAnswer: 1,
      category: "Ensemble Learning"
    },
    {
      question: "What is the main function of a confusion matrix?",
      options: ["Data visualization", "Model scoring", "Model error calculation", "Class performance evaluation"],
      correctAnswer: 3,
      category: "Evaluation"
    },
    {
      question: "Which type of data is best for clustering?",
      options: ["Structured categorical", "Text", "Unlabeled numerical", "Binary labels"],
      correctAnswer: 2,
      category: "Unsupervised Learning"
    },
    {
      question: "What is regularization used for?",
      options: ["Enhancing accuracy", "Preventing overfitting", "Balancing data", "Scaling inputs"],
      correctAnswer: 1,
      category: "Model Tuning"
    },
    {
      question: "Which method is used to handle high-dimensional data?",
      options: ["Normalization", "Feature extraction", "Label encoding", "Batch training"],
      correctAnswer: 1,
      category: "Feature Engineering"
    }
  ]

};

   

    
    const templates = questionTemplates[lang as keyof typeof questionTemplates] || questionTemplates['python'];
    
    // Generate enough questions by repeating and modifying templates
    for (let i = 0; i < config.questionCount; i++) {
      const template = templates[i % templates.length];
      fallbackQuestions.push({
        id: startId + i,
        question: template.question,
        options: template.options,
        correctAnswer: template.correctAnswer,
        explanation: `The correct answer is "${template.options[template.correctAnswer]}". This tests your knowledge of ${template.category}.`,
        category: template.category,
        difficulty: difficulty
      });
    }
    
    return fallbackQuestions;
  };

  useEffect(() => {
    const config = getTestConfig();
    setTimeLeft(config.duration * 60); // Convert minutes to seconds
    
    // Fetch questions when component mounts
    fetchQuestionsFromAPI().then(setQuestions);
  }, [language, level]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && !testCompleted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && testStarted) {
      handleSubmitTest();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, testStarted, testCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    if (questions.length === 0) {
      setError('No questions available. Please try again.');
      return;
    }
    setTestStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const calculateResult = (): TestResult => {
    let correctAnswers = 0;
    const categoryScores: { [key: string]: { correct: number; total: number } } = {};
    
    questions.forEach((question, index) => {
      const category = question.category;
      if (!categoryScores[category]) {
        categoryScores[category] = { correct: 0, total: 0 };
      }
      categoryScores[category].total++;
      
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
        categoryScores[category].correct++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    const config = getTestConfig();
    const timeSpent = (config.duration * 60) - timeLeft;

    // Generate recommendations based on performance
    const recommendations: string[] = [];
    if (score >= 90) {
      recommendations.push("Excellent performance! You're ready for advanced topics.");
      recommendations.push("Consider taking certification exams in this area.");
    } else if (score >= 70) {
      recommendations.push("Good understanding! Focus on weak areas for improvement.");
      recommendations.push("Practice more coding exercises to strengthen your skills.");
    } else if (score >= 50) {
      recommendations.push("Basic understanding present. Significant improvement needed.");
      recommendations.push("Review fundamental concepts and practice regularly.");
    } else {
      recommendations.push("Strong foundation building required.");
      recommendations.push("Start with beginner-level courses and practice basics.");
    }

    // Add category-specific recommendations
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const categoryPercentage = (scores.correct / scores.total) * 100;
      if (categoryPercentage < 60) {
        recommendations.push(`Focus on improving ${category} concepts.`);
      }
    });

    return {
      score,
      totalQuestions: questions.length,
      timeSpent,
      categoryScores,
      recommendations
    };
  };

  const handleSubmitTest = () => {
    const result = calculateResult();
    setTestResult(result);
    setTestCompleted(true);
  };

  const getLanguageIcon = (lang: string) => {
    const icons: { [key: string]: string } = {
      'python': '🐍',
      'javascript': '⚡',
      'java': '☕',
      'c++': '⚙️',
      'ai-&-ml': '🤖',
      'data-science': '📊'
    };
    return icons[lang] || '💻';
  };

  const getDifficultyColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'beginner': 'from-green-500 to-blue-500',
      'intermediate': 'from-yellow-500 to-orange-500',
      'advanced': 'from-red-500 to-pink-500'
    };
    return colors[level] || 'from-blue-500 to-purple-500';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparing Your Test</h2>
          <p className="text-gray-600">Loading questions from our database...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Test</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">{getLanguageIcon(language || '')}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 capitalize">{language?.replace('-', ' & ')} Assessment</h1>
                <p className="text-sm text-gray-600 capitalize">{level} Level</p>
              </div>
            </div>
          </div>

          {/* Error message if any */}
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 text-yellow-600 mr-2">⚠️</div>
                <p className="text-yellow-800">{error}</p>
              </div>
            </div>
          )}
          {/* Test Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 bg-gradient-to-r ${getDifficultyColor(level || '')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white text-4xl">{getLanguageIcon(language || '')}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                {language?.replace('-', ' & ')} {level} Assessment
              </h2>
              <p className="text-gray-600">
                Test your knowledge and get personalized recommendations for improvement
              </p>
              <p className="text-sm text-blue-600 mt-2">
                Questions loaded: {questions.length} / {getTestConfig().questionCount}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{getTestConfig().duration} Minutes</div>
                <div className="text-sm text-gray-600">Time Limit</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{questions.length} Questions</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Detailed Analysis</div>
                <div className="text-sm text-gray-600">Performance Report</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Test Instructions:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Read each question carefully before selecting your answer</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>You can navigate between questions using Next/Previous buttons</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>The test will auto-submit when time expires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>You'll receive detailed performance analysis and recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Questions are sourced from verified programming knowledge databases</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={handleStartTest}
                disabled={questions.length === 0}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span>Start Assessment</span>
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted && testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <Home className="w-5 h-5 mr-1" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Assessment Complete!</h1>
              <p className="text-gray-600">Here's your detailed performance analysis</p>
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className={`w-32 h-32 bg-gradient-to-r ${testResult.score >= 70 ? 'from-green-500 to-blue-500' : testResult.score >= 50 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <div className="text-white text-center">
                  <div className="text-4xl font-bold">{testResult.score}%</div>
                  <div className="text-sm">Score</div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {testResult.score >= 90 ? 'Excellent!' : testResult.score >= 70 ? 'Good Job!' : testResult.score >= 50 ? 'Keep Learning!' : 'Need Improvement'}
              </h2>
              <p className="text-gray-600">
                You answered {Object.values(selectedAnswers).filter((answer, index) => answer === questions[index]?.correctAnswer).length} out of {testResult.totalQuestions} questions correctly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{Math.floor(testResult.timeSpent / 60)}m {testResult.timeSpent % 60}s</div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{testResult.score}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900 capitalize">{level}</div>
                <div className="text-sm text-gray-600">Level Completed</div>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                Performance by Category
              </h3>
              <div className="space-y-4">
                {Object.entries(testResult.categoryScores).map(([category, scores]) => {
                  const percentage = Math.round((scores.correct / scores.total) * 100);
                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{category}</span>
                        <span className="text-sm text-gray-600">{scores.correct}/{scores.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-gray-600 mt-1">{percentage}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-600" />
                Personalized Recommendations
              </h3>
              <div className="space-y-3">
                {testResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retake Test</span>
            </button>
            <Link
              to="/"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors text-center"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  if (!currentQ) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Timer */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="w-64 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-6">
            <div className="text-sm text-blue-600 font-medium mb-2">{currentQ.category}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQ.question}</h2>
          </div>

          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span className="ml-2">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Show explanation if answer is selected */}
          {selectedAnswers[currentQuestion] !== undefined && showExplanation && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-start">
                {selectedAnswers[currentQuestion] === currentQ.correctAnswer ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-gray-900 mb-2">
                    {selectedAnswers[currentQuestion] === currentQ.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </div>
                  <div className="text-gray-700">{currentQ.explanation}</div>
                  {selectedAnswers[currentQuestion] !== currentQ.correctAnswer && (
                    <div className="mt-2 text-sm text-gray-600">
                      Correct answer: {String.fromCharCode(65 + currentQ.correctAnswer)}. {currentQ.options[currentQ.correctAnswer]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-4">
              {selectedAnswers[currentQuestion] !== undefined && !showExplanation && (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Show Explanation
                </button>
              )}
              
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  <span>Next</span>
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setShowExplanation(false);
                }}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[index] !== undefined
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;