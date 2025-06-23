import { Chapter } from '../types';

export const chapters: Chapter[] = [
  {
    title: "Getting Started with Lua",
    description: "Introduction to Lua programming language, its design philosophy, and setting up your development environment.",
    objectives: [
      "Understand Lua's design philosophy and use cases",
      "Set up a Lua development environment",
      "Write and execute your first Lua program",
      "Navigate the interactive Lua interpreter",
      "Understand Lua's role as an extension language"
    ],
    prerequisites: [],
    estimatedTime: "2-3 hours",
    difficulty: "Beginner",
    sections: [
      {
        title: "What is Lua?",
        content: "Lua is a powerful, efficient, lightweight, embeddable scripting language. It was designed as a general-purpose extensible language and is frequently used for extending applications. Lua combines simple procedural syntax with powerful data description constructs based on associative arrays and extensible semantics.",
        codeExamples: [
          {
            title: "Hello World in Lua",
            explanation: "The traditional first program demonstrates Lua's simple syntax.",
            code: `-- This is a comment in Lua
print("Hello, Lua World!")
print("Welcome to Lua programming!")`,
            output: "Hello, Lua World!\nWelcome to Lua programming!"
          }
        ],
        exercises: [
          {
            title: "Personal Greeting",
            description: "Create a program that displays a personalized greeting.",
            instructions: [
              "Define a variable with your name",
              "Use string concatenation to create a greeting",
              "Print the greeting message"
            ],
            starterCode: `-- Define your name here
local name = "Your Name"

-- Create and print a greeting
-- Your code here`
          }
        ]
      },
      {
        title: "Installing and Running Lua",
        content: "Learn how to install Lua on different operating systems and understand the various ways to run Lua code: interactive mode, script files, and embedded execution.",
        codeExamples: [
          {
            title: "Running Lua Interactively",
            explanation: "The Lua interpreter can be used interactively for testing and learning.",
            code: `-- In the Lua interactive interpreter:
> print("Interactive mode!")
> x = 5
> print(x * 2)`,
            output: "Interactive mode!\n10"
          },
          {
            title: "Command Line Arguments",
            explanation: "Lua scripts can access command-line arguments through the 'arg' table.",
            code: `-- Save as script.lua and run: lua script.lua hello world
print("Script name:", arg[0])
print("First argument:", arg[1])
print("Second argument:", arg[2])

for i, v in ipairs(arg) do
    print("arg[" .. i .. "] =", v)
end`
          }
        ],
        exercises: [
          {
            title: "Environment Explorer",
            description: "Create a script that explores the Lua environment and displays system information.",
            instructions: [
              "Print the Lua version using _VERSION",
              "Display all command-line arguments",
              "Show the current working directory if available"
            ]
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is Lua primarily designed for?",
          options: [
            "System programming only",
            "Web development only", 
            "Extension and embedding in applications",
            "Mobile app development only"
          ],
          correctAnswer: 2,
          explanation: "Lua is designed as an extensible language, primarily for embedding in host applications to provide scripting capabilities."
        },
        {
          question: "How do you write a comment in Lua?",
          options: [
            "// This is a comment",
            "# This is a comment",
            "-- This is a comment", 
            "/* This is a comment */"
          ],
          correctAnswer: 2,
          explanation: "Lua uses double dashes (--) for single-line comments."
        },
        {
          question: "What global variable contains the Lua version?",
          options: [
            "VERSION",
            "_VERSION",
            "LUA_VERSION",
            "version"
          ],
          correctAnswer: 1,
          explanation: "_VERSION is a global variable that contains the current Lua version as a string."
        }
      ]
    }
  },
  {
    title: "Data Types and Variables",
    description: "Master Lua's eight fundamental data types, variable scoping rules, and type coercion mechanisms.",
    objectives: [
      "Understand all eight Lua data types",
      "Master variable scoping (local vs global)",
      "Learn type coercion and conversion",
      "Work with nil values effectively",
      "Understand truthiness in Lua"
    ],
    prerequisites: ["Basic Lua syntax"],
    estimatedTime: "3-4 hours",
    difficulty: "Beginner",
    sections: [
      {
        title: "The Eight Data Types",
        content: "Lua is dynamically typed with eight fundamental types: nil, boolean, number, string, function, userdata, thread, and table. Each type has specific characteristics and behaviors.",
        codeExamples: [
          {
            title: "Exploring Data Types",
            explanation: "Use the type() function to examine different data types.",
            code: `-- Demonstrating all eight data types
local nil_value = nil
local bool_value = true
local num_value = 42.5
local str_value = "Hello Lua"
local func_value = function() return "I'm a function" end
local table_value = {1, 2, 3}
-- userdata and thread are created through C API or coroutines

print("nil:", type(nil_value))
print("boolean:", type(bool_value))
print("number:", type(num_value))
print("string:", type(str_value))
print("function:", type(func_value))
print("table:", type(table_value))`,
            output: "nil: nil\nboolean: boolean\nnumber: number\nstring: string\nfunction: function\ntable: table"
          },
          {
            title: "Type Coercion in Action",
            explanation: "Lua automatically converts between strings and numbers in arithmetic contexts.",
            code: `-- Automatic type coercion
print("10" + 5)        -- String to number: 15
print(10 .. " items")  -- Number to string: "10 items"
print("3.14" * 2)      -- String to number: 6.28

-- But not in equality comparisons
print("10" == 10)      -- false (no coercion)
print(tonumber("10") == 10)  -- true (explicit conversion)`,
            output: "15\n10 items\n6.28\nfalse\ntrue"
          }
        ],
        exercises: [
          {
            title: "Type Detective",
            description: "Create a function that analyzes and reports detailed information about any value.",
            instructions: [
              "Write a function that takes any value as parameter",
              "Report its type, value, and truthiness",
              "Handle special cases like nil and empty strings",
              "Test with various data types"
            ],
            starterCode: `local function analyze_value(value)
    -- Your implementation here
    -- Report type, value, and whether it's truthy
end

-- Test cases
analyze_value(nil)
analyze_value(false)
analyze_value(0)
analyze_value("")
analyze_value("hello")`
          }
        ]
      },
      {
        title: "Variable Scoping",
        content: "Understanding local vs global variables, lexical scoping, and the importance of proper variable management for clean, maintainable code.",
        codeExamples: [
          {
            title: "Local vs Global Scope",
            explanation: "Demonstrate the difference between local and global variables.",
            code: `-- Global variable (implicit)
global_var = "I'm global"

-- Local variable (explicit)
local local_var = "I'm local"

function test_scope()
    print("Inside function:")
    print("Global:", global_var)  -- Accessible
    print("Local:", local_var)    -- Also accessible (upvalue)
    
    -- Creating a new local variable
    local function_local = "I'm function-local"
    print("Function local:", function_local)
end

test_scope()

-- Outside function
print("Outside function:")
print("Global:", global_var)     -- Still accessible
-- print("Local:", local_var)    -- Still accessible (in same scope)
-- print("Function local:", function_local)  -- Error: not accessible`,
            output: "Inside function:\nGlobal: I'm global\nLocal: I'm local\nFunction local: I'm function-local\nOutside function:\nGlobal: I'm global"
          },
          {
            title: "Nested Scopes and Shadowing",
            explanation: "How local variables can shadow outer variables.",
            code: `local x = "outer"

do  -- New block
    local x = "middle"
    print("Middle scope:", x)
    
    do  -- Another nested block
        local x = "inner"
        print("Inner scope:", x)
    end
    
    print("Back to middle:", x)
end

print("Back to outer:", x)`,
            output: "Middle scope: middle\nInner scope: inner\nBack to middle: middle\nBack to outer: outer"
          }
        ],
        exercises: [
          {
            title: "Scope Puzzle",
            description: "Predict and verify the output of complex scoping scenarios.",
            instructions: [
              "Analyze the given code with multiple scope levels",
              "Predict what each print statement will output",
              "Run the code to verify your predictions",
              "Explain why each variable has its specific value"
            ],
            starterCode: `local a = 1
local b = 2

do
    local a = 10
    b = 20
    local c = 30
    
    do
        local b = 200
        c = 300
        print("Inner: a=" .. a .. ", b=" .. b .. ", c=" .. c)
    end
    
    print("Middle: a=" .. a .. ", b=" .. b .. ", c=" .. c)
end

print("Outer: a=" .. a .. ", b=" .. b)
-- What happens if we try to print c here?`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "Which values are considered 'falsy' in Lua?",
          options: [
            "false, nil, 0, and empty string",
            "Only false",
            "false and nil only",
            "false, nil, and 0"
          ],
          correctAnswer: 2,
          explanation: "In Lua, only false and nil are considered falsy. Unlike many other languages, 0 and empty string are truthy."
        },
        {
          question: "What happens when you perform '10' + 5 in Lua?",
          options: [
            "Error: cannot add string and number",
            "Returns '105' (string concatenation)",
            "Returns 15 (automatic type coercion)",
            "Returns nil"
          ],
          correctAnswer: 2,
          explanation: "Lua automatically converts the string '10' to a number for arithmetic operations, resulting in 15."
        },
        {
          question: "What is the scope of a variable declared without 'local'?",
          options: [
            "Function scope",
            "Block scope",
            "Global scope",
            "Module scope"
          ],
          correctAnswer: 2,
          explanation: "Variables declared without 'local' are global and accessible from anywhere in the program."
        }
      ]
    }
  },
  {
    title: "Operators and Expressions",
    description: "Master Lua's operators, understand precedence rules, and learn to build complex expressions effectively.",
    objectives: [
      "Master arithmetic, relational, and logical operators",
      "Understand operator precedence and associativity",
      "Learn string concatenation and pattern basics",
      "Use the length operator effectively",
      "Build complex expressions with proper precedence"
    ],
    prerequisites: ["Data types and variables"],
    estimatedTime: "2-3 hours",
    difficulty: "Beginner",
    sections: [
      {
        title: "Arithmetic and Relational Operators",
        content: "Lua provides standard arithmetic operators with some unique behaviors, especially regarding the modulo operator and exponentiation.",
        codeExamples: [
          {
            title: "Arithmetic Operations",
            explanation: "Explore all arithmetic operators including modulo behavior.",
            code: `-- Basic arithmetic
print("Addition:", 10 + 3)
print("Subtraction:", 10 - 3)
print("Multiplication:", 10 * 3)
print("Division:", 10 / 3)
print("Exponentiation:", 2 ^ 3)
print("Unary minus:", -10)

-- Modulo operator (remainder)
print("10 % 3 =", 10 % 3)
print("10 % -3 =", 10 % -3)
print("-10 % 3 =", -10 % 3)
print("-10 % -3 =", -10 % -3)

-- Modulo with floats
print("10.5 % 3 =", 10.5 % 3)`,
            output: "Addition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3.3333333333333\nExponentiation: 8\nUnary minus: -10\n10 % 3 = 1\n10 % -3 = -2\n-10 % 3 = 2\n-10 % -3 = -1\n10.5 % 3 = 1.5"
          },
          {
            title: "Relational Operators",
            explanation: "Comparison operators work with numbers and strings, with specific rules for different types.",
            code: `-- Numeric comparisons
print("10 == 10:", 10 == 10)
print("10 ~= 5:", 10 ~= 5)
print("10 > 5:", 10 > 5)
print("10 < 5:", 10 < 5)
print("10 >= 10:", 10 >= 10)
print("10 <= 5:", 10 <= 5)

-- String comparisons (lexicographic)
print('"apple" < "banana":', "apple" < "banana")
print('"Apple" < "apple":', "Apple" < "apple")

-- Type comparisons
print("10 == '10':", 10 == "10")  -- Different types
print("nil == false:", nil == false)`,
            output: "10 == 10: true\n10 ~= 5: true\n10 > 5: true\n10 < 5: false\n10 >= 10: true\n10 <= 5: false\napple < banana: true\nApple < apple: true\n10 == '10': false\nnil == false: false"
          }
        ],
        exercises: [
          {
            title: "Calculator Functions",
            description: "Build a set of calculator functions that handle edge cases properly.",
            instructions: [
              "Create functions for basic arithmetic operations",
              "Handle division by zero gracefully",
              "Implement a power function with integer exponents",
              "Add input validation for all functions"
            ],
            starterCode: `-- Calculator module
local calc = {}

function calc.add(a, b)
    -- Your implementation
end

function calc.divide(a, b)
    -- Handle division by zero
end

function calc.power(base, exponent)
    -- Integer exponentiation
end

-- Test your functions
print(calc.add(5, 3))
print(calc.divide(10, 0))  -- Should handle gracefully
print(calc.power(2, 10))`
          }
        ]
      },
      {
        title: "Logical Operators and Short-Circuit Evaluation",
        content: "Lua's logical operators (and, or, not) have unique behaviors that make them powerful for conditional assignments and default values.",
        codeExamples: [
          {
            title: "Logical Operators Behavior",
            explanation: "Understanding how and, or, and not work with Lua's truthiness rules.",
            code: `-- Basic logical operations
print("true and false:", true and false)
print("true or false:", true or false)
print("not true:", not true)
print("not false:", not false)

-- Short-circuit evaluation
print("false and error():", false and "this won't execute")
print("true or error():", true or "this won't execute")

-- Logical operators return operands, not just true/false
print("5 and 10:", 5 and 10)        -- Returns 10
print("nil and 10:", nil and 10)    -- Returns nil
print("5 or 10:", 5 or 10)          -- Returns 5
print("nil or 10:", nil or 10)      -- Returns 10`,
            output: "true and false: false\ntrue or false: true\nnot true: false\nnot false: true\nfalse and error(): false\ntrue or error(): true\n5 and 10: 10\nnil and 10: nil\n5 or 10: 5\nnil or 10: 10"
          },
          {
            title: "Practical Uses of Logical Operators",
            explanation: "Common patterns using logical operators for default values and conditional assignments.",
            code: `-- Default value pattern
local function greet(name)
    name = name or "World"  -- Default to "World" if name is nil
    return "Hello, " .. name .. "!"
end

print(greet())          -- Uses default
print(greet("Alice"))   -- Uses provided name

-- Conditional assignment
local config = {
    debug = true,
    timeout = nil
}

local debug_mode = config.debug or false
local timeout = config.timeout or 30

print("Debug mode:", debug_mode)
print("Timeout:", timeout)

-- Guard pattern
local function safe_divide(a, b)
    return b ~= 0 and a / b or "Cannot divide by zero"
end

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
            output: "Hello, World!\nHello, Alice!\nDebug mode: true\nTimeout: 30\n5\nCannot divide by zero"
          }
        ],
        exercises: [
          {
            title: "Configuration Manager",
            description: "Build a configuration system that uses logical operators for defaults and validation.",
            instructions: [
              "Create a function that merges user config with defaults",
              "Use logical operators for default value assignment",
              "Implement validation using logical operators",
              "Handle nested configuration objects"
            ],
            starterCode: `local function create_config(user_config)
    user_config = user_config or {}
    
    local config = {
        -- Use logical operators to set defaults
        host = user_config.host or "localhost",
        port = user_config.port or 8080,
        -- Add more configuration options
    }
    
    -- Add validation logic here
    
    return config
end

-- Test cases
local config1 = create_config()
local config2 = create_config({host = "example.com", port = 3000})
local config3 = create_config({invalid_port = "not a number"})`
          }
        ]
      },
      {
        title: "String Operations and Length Operator",
        content: "String concatenation, length operations, and introduction to string manipulation in Lua.",
        codeExamples: [
          {
            title: "String Concatenation",
            explanation: "Using the .. operator for string concatenation with automatic type conversion.",
            code: `-- Basic concatenation
local first = "Hello"
local second = "World"
print(first .. " " .. second)

-- Automatic number to string conversion
local name = "Alice"
local age = 25
print(name .. " is " .. age .. " years old")

-- Multiple concatenations
local result = "The answer is " .. 42 .. " and that's " .. true
print(result)

-- Concatenation with expressions
local x, y = 10, 20
print("Sum: " .. (x + y))  -- Parentheses needed for precedence`,
            output: "Hello World\nAlice is 25 years old\nThe answer is 42 and that's true\nSum: 30"
          },
          {
            title: "Length Operator",
            explanation: "Using the # operator with strings and tables.",
            code: `-- String length
local text = "Hello, Lua!"
print("Length of '" .. text .. "':", #text)

-- Empty string
print("Length of empty string:", #"")

-- Unicode considerations (Lua 5.1 counts bytes, not characters)
local unicode_text = "Héllo"
print("Length of '" .. unicode_text .. "':", #unicode_text)

-- Table length (for arrays)
local numbers = {10, 20, 30, 40, 50}
print("Array length:", #numbers)

-- Table with holes
local sparse = {1, 2, nil, 4, 5}
print("Sparse array length:", #sparse)  -- Undefined behavior`,
            output: "Length of 'Hello, Lua!': 12\nLength of empty string: 0\nLength of 'Héllo': 6\nArray length: 5\nSparse array length: 2"
          }
        ],
        exercises: [
          {
            title: "Text Formatter",
            description: "Create a text formatting utility using string operations.",
            instructions: [
              "Build functions to center, left-align, and right-align text",
              "Create a function to truncate text with ellipsis",
              "Implement a simple word wrap function",
              "Add padding and border functions"
            ],
            starterCode: `local formatter = {}

function formatter.center(text, width)
    -- Center text within given width
end

function formatter.truncate(text, max_length)
    -- Truncate with "..." if too long
end

function formatter.wrap_words(text, line_length)
    -- Simple word wrapping
end

-- Test your functions
print(formatter.center("Hello", 20))
print(formatter.truncate("This is a very long text", 15))
print(formatter.wrap_words("This is a long sentence that needs wrapping", 10))`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What does the expression 'nil or 42' return?",
          options: [
            "nil",
            "42",
            "true",
            "false"
          ],
          correctAnswer: 1,
          explanation: "The 'or' operator returns its first operand if it's truthy, otherwise the second. Since nil is falsy, it returns 42."
        },
        {
          question: "What is the result of 10 % -3 in Lua?",
          options: [
            "1",
            "-1",
            "2",
            "-2"
          ],
          correctAnswer: 3,
          explanation: "Lua's modulo is defined as a - math.floor(a/b)*b, so 10 % -3 = 10 - math.floor(10/-3)*(-3) = 10 - (-4)*(-3) = -2."
        },
        {
          question: "Which operator has the highest precedence in Lua?",
          options: [
            "^",
            "*",
            "not",
            ".."
          ],
          correctAnswer: 0,
          explanation: "The exponentiation operator (^) has the highest precedence among arithmetic operators in Lua."
        }
      ]
    }
  },
  {
    title: "Control Structures",
    description: "Master conditional statements, loops, and control flow mechanisms in Lua programming.",
    objectives: [
      "Use if-then-else statements effectively",
      "Master while and repeat-until loops",
      "Understand numeric and generic for loops",
      "Learn break and return statement usage",
      "Implement complex control flow patterns"
    ],
    prerequisites: ["Operators and expressions"],
    estimatedTime: "3-4 hours",
    difficulty: "Beginner",
    sections: [
      {
        title: "Conditional Statements",
        content: "Lua's if-then-else statements provide flexible conditional execution with support for multiple conditions through elseif.",
        codeExamples: [
          {
            title: "Basic Conditional Logic",
            explanation: "Simple if-then-else statements with Lua's truthiness rules.",
            code: `-- Basic if statement
local age = 18
if age >= 18 then
    print("You are an adult")
end

-- If-else statement
local weather = "sunny"
if weather == "sunny" then
    print("Great day for a picnic!")
else
    print("Maybe stay indoors")
end

-- Multiple conditions with elseif
local score = 85
if score >= 90 then
    print("Grade: A")
elseif score >= 80 then
    print("Grade: B")
elseif score >= 70 then
    print("Grade: C")
elseif score >= 60 then
    print("Grade: D")
else
    print("Grade: F")
end`,
            output: "You are an adult\nGreat day for a picnic!\nGrade: B"
          },
          {
            title: "Truthiness in Conditionals",
            explanation: "Understanding what values are considered true or false in Lua conditions.",
            code: `-- Testing different values in conditions
local values = {nil, false, true, 0, "", "hello", {}, function() end}

for i, value in ipairs(values) do
    if value then
        print("Value " .. i .. " (" .. tostring(value) .. ") is truthy")
    else
        print("Value " .. i .. " (" .. tostring(value) .. ") is falsy")
    end
end

-- Practical example: checking for valid input
local function process_input(input)
    if input and input ~= "" then
        print("Processing: " .. input)
    else
        print("Invalid input provided")
    end
end

process_input("hello")
process_input("")
process_input(nil)`,
            output: "Value 1 (nil) is falsy\nValue 2 (false) is falsy\nValue 3 (true) is truthy\nValue 4 (0) is truthy\nValue 5 () is truthy\nValue 6 (hello) is truthy\nValue 7 (table: 0x...) is truthy\nValue 8 (function: 0x...) is truthy\nProcessing: hello\nInvalid input provided\nInvalid input provided"
          }
        ],
        exercises: [
          {
            title: "Grade Calculator",
            description: "Build a comprehensive grade calculation system with multiple criteria.",
            instructions: [
              "Create a function that calculates letter grades from numeric scores",
              "Add support for extra credit and grade curves",
              "Implement different grading scales (A-F, pass/fail, etc.)",
              "Handle edge cases and invalid inputs"
            ],
            starterCode: `local function calculate_grade(score, extra_credit, curve)
    extra_credit = extra_credit or 0
    curve = curve or 0
    
    -- Apply extra credit and curve
    local final_score = score + extra_credit + curve
    
    -- Your grading logic here
    
end

-- Test cases
print(calculate_grade(85))
print(calculate_grade(75, 5, 3))
print(calculate_grade(95, 10))  -- Should handle scores > 100
print(calculate_grade(-5))      -- Should handle invalid scores`
          }
        ]
      },
      {
        title: "Loop Constructs",
        content: "Lua provides several loop constructs: while, repeat-until, numeric for, and generic for loops, each suited for different scenarios.",
        codeExamples: [
          {
            title: "While and Repeat-Until Loops",
            explanation: "Pre-test and post-test loops for different iteration needs.",
            code: `-- While loop (pre-test)
local count = 1
while count <= 5 do
    print("While loop iteration:", count)
    count = count + 1
end

-- Repeat-until loop (post-test)
local num = 1
repeat
    print("Repeat-until iteration:", num)
    num = num + 1
until num > 3

-- Practical example: input validation
local function get_valid_number()
    local input
    repeat
        io.write("Enter a number between 1 and 10: ")
        input = tonumber(io.read())
    until input and input >= 1 and input <= 10
    return input
end

-- Simulated version for demonstration
local function simulate_input()
    local attempts = {-1, 15, "abc", 7}
    local attempt = 1
    
    repeat
        local input = attempts[attempt]
        print("Attempting input:", input)
        if type(input) == "number" and input >= 1 and input <= 10 then
            print("Valid input:", input)
            return input
        else
            print("Invalid input, try again")
        end
        attempt = attempt + 1
    until attempt > #attempts
    
    return 5  -- Default fallback
end

simulate_input()`,
            output: "While loop iteration: 1\nWhile loop iteration: 2\nWhile loop iteration: 3\nWhile loop iteration: 4\nWhile loop iteration: 5\nRepeat-until iteration: 1\nRepeat-until iteration: 2\nRepeat-until iteration: 3\nAttempting input: -1\nInvalid input, try again\nAttempting input: 15\nInvalid input, try again\nAttempting input: abc\nInvalid input, try again\nAttempting input: 7\nValid input: 7"
          },
          {
            title: "Numeric For Loops",
            explanation: "Efficient iteration over numeric ranges with optional step values.",
            code: `-- Basic numeric for loop
print("Counting up:")
for i = 1, 5 do
    print("i =", i)
end

-- Counting down with step
print("Counting down:")
for i = 10, 1, -2 do
    print("i =", i)
end

-- Using variables for loop bounds
local start, stop, step = 2, 20, 3
print("Custom range:")
for i = start, stop, step do
    print("i =", i)
end

-- Practical example: multiplication table
local function print_multiplication_table(n)
    print("Multiplication table for " .. n .. ":")
    for i = 1, 12 do
        print(n .. " x " .. i .. " = " .. (n * i))
    end
end

print_multiplication_table(7)`,
            output: "Counting up:\ni = 1\ni = 2\ni = 3\ni = 4\ni = 5\nCounting down:\ni = 10\ni = 8\ni = 6\ni = 4\ni = 2\nCustom range:\ni = 2\ni = 5\ni = 8\ni = 11\ni = 14\ni = 17\ni = 20\nMultiplication table for 7:\n7 x 1 = 7\n7 x 2 = 14\n...\n7 x 12 = 84"
          }
        ],
        exercises: [
          {
            title: "Pattern Generator",
            description: "Create functions that generate various text patterns using loops.",
            instructions: [
              "Build a function to create a triangle pattern with asterisks",
              "Create a diamond pattern generator",
              "Implement a number pyramid",
              "Add customizable characters and sizes"
            ],
            starterCode: `local patterns = {}

function patterns.triangle(height, char)
    char = char or "*"
    -- Generate triangle pattern
end

function patterns.diamond(size, char)
    char = char or "*"
    -- Generate diamond pattern
end

function patterns.number_pyramid(height)
    -- Generate number pyramid
end

-- Test your patterns
patterns.triangle(5)
patterns.diamond(7, "#")
patterns.number_pyramid(4)`
          }
        ]
      },
      {
        title: "Generic For Loops and Iterators",
        content: "The generic for loop is Lua's most powerful iteration construct, working with iterator functions to traverse various data structures.",
        codeExamples: [
          {
            title: "Basic Iterator Usage",
            explanation: "Using ipairs and pairs to iterate over tables.",
            code: `-- Array-style iteration with ipairs
local fruits = {"apple", "banana", "cherry", "date"}
print("Using ipairs (array-style):")
for index, fruit in ipairs(fruits) do
    print(index, fruit)
end

-- Hash-style iteration with pairs
local person = {
    name = "Alice",
    age = 30,
    city = "New York",
    occupation = "Engineer"
}
print("Using pairs (hash-style):")
for key, value in pairs(person) do
    print(key, value)
end

-- Mixed table iteration
local mixed = {
    "first",     -- index 1
    "second",    -- index 2
    name = "Mixed Table",
    count = 42
}
print("Mixed table with ipairs:")
for i, v in ipairs(mixed) do
    print(i, v)
end
print("Mixed table with pairs:")
for k, v in pairs(mixed) do
    print(k, v)
end`,
            output: "Using ipairs (array-style):\n1\tapple\n2\tbanana\n3\tcherry\n4\tdate\nUsing pairs (hash-style):\nname\tAlice\nage\t30\ncity\tNew York\noccupation\tEngineer\nMixed table with ipairs:\n1\tfirst\n2\tsecond\nMixed table with pairs:\n1\tfirst\n2\tsecond\nname\tMixed Table\ncount\t42"
          },
          {
            title: "Custom Iterator Functions",
            explanation: "Creating custom iterators for specialized iteration patterns.",
            code: `-- Custom iterator: iterate over words in a string
local function words(str)
    local pos = 1
    return function()
        if pos <= #str then
            local start_pos = pos
            -- Find the start of the next word
            while pos <= #str and str:sub(pos, pos):match("%s") do
                pos = pos + 1
            end
            if pos > #str then return nil end
            
            start_pos = pos
            -- Find the end of the word
            while pos <= #str and not str:sub(pos, pos):match("%s") do
                pos = pos + 1
            end
            
            return str:sub(start_pos, pos - 1)
        end
    end
end

-- Using the custom iterator
local sentence = "The quick brown fox jumps"
print("Words in sentence:")
for word in words(sentence) do
    print("Word:", word)
end

-- Custom iterator: reverse iteration
local function reverse_ipairs(t)
    local i = #t + 1
    return function()
        i = i - 1
        if i > 0 then
            return i, t[i]
        end
    end
end

local numbers = {10, 20, 30, 40, 50}
print("Reverse iteration:")
for i, v in reverse_ipairs(numbers) do
    print(i, v)
end`,
            output: "Words in sentence:\nWord: The\nWord: quick\nWord: brown\nWord: fox\nWord: jumps\nReverse iteration:\n5\t50\n4\t40\n3\t30\n2\t20\n1\t10"
          }
        ],
        exercises: [
          {
            title: "Data Processing Pipeline",
            description: "Build a data processing system using various loop constructs and iterators.",
            instructions: [
              "Create functions to filter, map, and reduce data using generic for loops",
              "Implement a custom iterator for processing CSV-like data",
              "Build a pipeline that chains multiple operations",
              "Add error handling and validation"
            ],
            starterCode: `local data_processor = {}

function data_processor.filter(data, predicate)
    local result = {}
    -- Filter data based on predicate function
    return result
end

function data_processor.map(data, transform)
    local result = {}
    -- Transform each element using transform function
    return result
end

function data_processor.csv_lines(csv_string)
    -- Custom iterator for CSV lines
    return function()
        -- Your iterator implementation
    end
end

-- Test data
local numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
local csv_data = "name,age,city\nAlice,25,NYC\nBob,30,LA\nCharlie,35,Chicago"

-- Test your functions
local evens = data_processor.filter(numbers, function(n) return n % 2 == 0 end)
local squares = data_processor.map(evens, function(n) return n * n end)`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is the difference between 'while' and 'repeat-until' loops?",
          options: [
            "There is no difference",
            "while is pre-test, repeat-until is post-test",
            "repeat-until is faster",
            "while can only use numeric conditions"
          ],
          correctAnswer: 1,
          explanation: "while loops test the condition before each iteration (pre-test), while repeat-until loops test after each iteration (post-test), guaranteeing at least one execution."
        },
        {
          question: "What does 'ipairs' iterate over in a table?",
          options: [
            "All key-value pairs",
            "Only string keys",
            "Consecutive integer keys starting from 1",
            "Only numeric keys"
          ],
          correctAnswer: 2,
          explanation: "ipairs iterates over consecutive positive integer keys starting from 1 until it encounters a nil value."
        },
        {
          question: "In a numeric for loop 'for i = 10, 1, -2', what values will i take?",
          options: [
            "10, 8, 6, 4, 2",
            "10, 8, 6, 4, 2, 0",
            "1, 3, 5, 7, 9",
            "Error: invalid range"
          ],
          correctAnswer: 0,
          explanation: "The loop starts at 10, decrements by 2 each iteration, and stops when i would be less than 1, so: 10, 8, 6, 4, 2."
        }
      ]
    }
  },
  {
    title: "Functions and Scope",
    description: "Master function definition, calling conventions, closures, and advanced scoping concepts in Lua.",
    objectives: [
      "Define and call functions with various parameter patterns",
      "Understand multiple return values and variadic functions",
      "Master closures and upvalue concepts",
      "Learn proper tail call optimization",
      "Implement higher-order functions and functional patterns"
    ],
    prerequisites: ["Control structures"],
    estimatedTime: "4-5 hours",
    difficulty: "Intermediate",
    sections: [
      {
        title: "Function Basics and Parameters",
        content: "Functions in Lua are first-class values, meaning they can be stored in variables, passed as arguments, and returned from other functions.",
        codeExamples: [
          {
            title: "Function Definition and Calling",
            explanation: "Various ways to define and call functions in Lua.",
            code: `-- Basic function definition
function greet(name)
    return "Hello, " .. name .. "!"
end

-- Function as a variable
local say_goodbye = function(name)
    return "Goodbye, " .. name .. "!"
end

-- Calling functions
print(greet("Alice"))
print(say_goodbye("Bob"))

-- Functions with multiple parameters
function calculate_area(length, width)
    return length * width
end

print("Area:", calculate_area(5, 3))

-- Functions with default parameter simulation
function create_user(name, age, role)
    age = age or 18        -- Default age
    role = role or "user"  -- Default role
    
    return {
        name = name,
        age = age,
        role = role
    }
end

local user1 = create_user("Alice")
local user2 = create_user("Bob", 25, "admin")
print("User 1:", user1.name, user1.age, user1.role)
print("User 2:", user2.name, user2.age, user2.role)`,
            output: "Hello, Alice!\nGoodbye, Bob!\nArea: 15\nUser 1: Alice 18 user\nUser 2: Bob 25 admin"
          },
          {
            title: "Multiple Return Values",
            explanation: "Lua functions can return multiple values, which is a powerful feature for data exchange.",
            code: `-- Function returning multiple values
function get_name_parts(full_name)
    local space_pos = string.find(full_name, " ")
    if space_pos then
        local first = string.sub(full_name, 1, space_pos - 1)
        local last = string.sub(full_name, space_pos + 1)
        return first, last
    else
        return full_name, ""
    end
end

-- Receiving multiple return values
local first, last = get_name_parts("John Doe")
print("First:", first, "Last:", last)

-- Using only some return values
local first_only = get_name_parts("Jane Smith")
print("First only:", first_only)

-- Mathematical function with multiple returns
function divide_with_remainder(dividend, divisor)
    local quotient = math.floor(dividend / divisor)
    local remainder = dividend % divisor
    return quotient, remainder
end

local q, r = divide_with_remainder(17, 5)
print("17 ÷ 5 = " .. q .. " remainder " .. r)

-- Function returning variable number of values
function get_stats(numbers)
    if #numbers == 0 then
        return nil, "No data"
    end
    
    local sum = 0
    local min, max = numbers[1], numbers[1]
    
    for _, num in ipairs(numbers) do
        sum = sum + num
        if num < min then min = num end
        if num > max then max = num end
    end
    
    local avg = sum / #numbers
    return sum, avg, min, max
end

local data = {10, 5, 8, 12, 3, 15}
local sum, avg, min, max = get_stats(data)
print("Sum:", sum, "Avg:", avg, "Min:", min, "Max:", max)`,
            output: "First: John Last: Doe\nFirst only: Jane\n17 ÷ 5 = 3 remainder 2\nSum: 53 Avg: 8.8333333333333 Min: 3 Max: 15"
          }
        ],
        exercises: [
          {
            title: "String Utilities Library",
            description: "Create a comprehensive string utilities library with multiple functions.",
            instructions: [
              "Build functions for string manipulation (trim, split, join)",
              "Implement functions that return multiple values appropriately",
              "Add validation and error handling",
              "Create helper functions that use other functions in the library"
            ],
            starterCode: `local string_utils = {}

function string_utils.trim(str)
    -- Remove leading and trailing whitespace
    -- Return trimmed string and number of characters removed
end

function string_utils.split(str, delimiter)
    -- Split string by delimiter
    -- Return table of parts and count of parts
end

function string_utils.join(parts, separator)
    -- Join table of strings with separator
end

function string_utils.word_count(str)
    -- Count words, characters, and lines
    -- Return word_count, char_count, line_count
end

-- Test your functions
local text = "  Hello, World!  \n  How are you?  "
local trimmed, removed = string_utils.trim(text)
local parts, count = string_utils.split("apple,banana,cherry", ",")
local words, chars, lines = string_utils.word_count(text)`
          }
        ]
      },
      {
        title: "Variadic Functions and Advanced Parameters",
        content: "Lua supports variadic functions that can accept a variable number of arguments using the ... syntax.",
        codeExamples: [
          {
            title: "Variadic Functions",
            explanation: "Functions that accept variable numbers of arguments using the ... operator.",
            code: `-- Basic variadic function
function print_all(...)
    local args = {...}  -- Pack arguments into a table
    print("Number of arguments:", #args)
    for i, arg in ipairs(args) do
        print("Arg " .. i .. ":", arg)
    end
end

print_all("hello", 42, true, nil, "world")

-- Variadic function with fixed parameters
function log_message(level, ...)
    local message_parts = {...}
    local full_message = table.concat(message_parts, " ")
    print("[" .. level .. "] " .. full_message)
end

log_message("INFO", "User", "Alice", "logged in")
log_message("ERROR", "Database", "connection", "failed")

-- Mathematical variadic functions
function sum(...)
    local total = 0
    for _, value in ipairs{...} do
        if type(value) == "number" then
            total = total + value
        end
    end
    return total
end

function average(...)
    local args = {...}
    local total = sum(...)
    return #args > 0 and total / #args or 0
end

print("Sum:", sum(1, 2, 3, 4, 5))
print("Average:", average(10, 20, 30, 40))

-- Forwarding arguments to other functions
function debug_print(...)
    if DEBUG_MODE then
        print("DEBUG:", ...)
    end
end

DEBUG_MODE = true
debug_print("Variable x =", 42, "at line", 15)`,
            output: "Number of arguments: 5\nArg 1: hello\nArg 2: 42\nArg 3: true\nArg 4: nil\nArg 5: world\n[INFO] User Alice logged in\n[ERROR] Database connection failed\nSum: 15\nAverage: 25\nDEBUG: Variable x = 42 at line 15"
          },
          {
            title: "Advanced Parameter Patterns",
            explanation: "Sophisticated parameter handling including named parameters and validation.",
            code: `-- Named parameters using tables
function create_window(options)
    options = options or {}
    
    local window = {
        title = options.title or "Untitled",
        width = options.width or 800,
        height = options.height or 600,
        resizable = options.resizable ~= false,  -- Default true
        visible = options.visible ~= false       -- Default true
    }
    
    return window
end

-- Usage with named parameters
local win1 = create_window{
    title = "My Application",
    width = 1024,
    height = 768,
    resizable = false
}

local win2 = create_window()  -- All defaults

print("Window 1:", win1.title, win1.width .. "x" .. win1.height)
print("Window 2:", win2.title, win2.width .. "x" .. win2.height)

-- Parameter validation function
function validate_params(params, schema)
    for key, rules in pairs(schema) do
        local value = params[key]
        
        -- Check required parameters
        if rules.required and value == nil then
            error("Missing required parameter: " .. key)
        end
        
        -- Check type
        if value ~= nil and rules.type and type(value) ~= rules.type then
            error("Parameter " .. key .. " must be of type " .. rules.type)
        end
        
        -- Check range for numbers
        if value and rules.min and value < rules.min then
            error("Parameter " .. key .. " must be >= " .. rules.min)
        end
        if value and rules.max and value > rules.max then
            error("Parameter " .. key .. " must be <= " .. rules.max)
        end
    end
end

function create_user_validated(params)
    local schema = {
        name = {required = true, type = "string"},
        age = {required = true, type = "number", min = 0, max = 150},
        email = {type = "string"}
    }
    
    validate_params(params, schema)
    
    return {
        name = params.name,
        age = params.age,
        email = params.email or "no-email@example.com"
    }
end

-- Test validation
local user = create_user_validated{name = "Alice", age = 25, email = "alice@example.com"}
print("Created user:", user.name, user.age, user.email)`,
            output: "Window 1: My Application 1024x768\nWindow 2: Untitled 800x600\nCreated user: Alice 25 alice@example.com"
          }
        ],
        exercises: [
          {
            title: "Flexible Logger System",
            description: "Build a logging system that demonstrates advanced parameter handling.",
            instructions: [
              "Create a logger that accepts variable arguments",
              "Support different log levels and formatting options",
              "Implement named parameters for configuration",
              "Add timestamp and caller information"
            ],
            starterCode: `local logger = {}

-- Logger configuration
logger.config = {
    level = "INFO",
    timestamp = true,
    caller_info = false
}

function logger.log(level, ...)
    -- Implement flexible logging with variadic arguments
end

function logger.configure(options)
    -- Update logger configuration using named parameters
end

function logger.info(...)
    -- Convenience function for info level
end

function logger.error(...)
    -- Convenience function for error level
end

-- Test your logger
logger.configure{level = "DEBUG", timestamp = true}
logger.info("Application started")
logger.error("Database connection failed:", "timeout after 30s")
logger.log("DEBUG", "Variable state:", {x = 10, y = 20})`
          }
        ]
      },
      {
        title: "Closures and Upvalues",
        content: "Closures are functions that capture variables from their enclosing scope, creating powerful patterns for state management and data encapsulation.",
        codeExamples: [
          {
            title: "Basic Closures",
            explanation: "Understanding how closures capture and maintain access to outer variables.",
            code: `-- Simple closure example
function create_counter()
    local count = 0  -- This becomes an upvalue
    
    return function()
        count = count + 1
        return count
    end
end

-- Each counter has its own state
local counter1 = create_counter()
local counter2 = create_counter()

print("Counter 1:", counter1())  -- 1
print("Counter 1:", counter1())  -- 2
print("Counter 2:", counter2())  -- 1
print("Counter 1:", counter1())  -- 3
print("Counter 2:", counter2())  -- 2

-- Closure with parameters
function create_multiplier(factor)
    return function(x)
        return x * factor
    end
end

local double = create_multiplier(2)
local triple = create_multiplier(3)

print("Double 5:", double(5))    -- 10
print("Triple 4:", triple(4))    -- 12

-- Multiple upvalues
function create_bank_account(initial_balance)
    local balance = initial_balance
    local transaction_count = 0
    
    return {
        deposit = function(amount)
            if amount > 0 then
                balance = balance + amount
                transaction_count = transaction_count + 1
                return balance
            else
                error("Deposit amount must be positive")
            end
        end,
        
        withdraw = function(amount)
            if amount > 0 and amount <= balance then
                balance = balance - amount
                transaction_count = transaction_count + 1
                return balance
            else
                error("Invalid withdrawal amount")
            end
        end,
        
        get_balance = function()
            return balance
        end,
        
        get_transaction_count = function()
            return transaction_count
        end
    }
end

local account = create_bank_account(100)
print("Initial balance:", account.get_balance())
print("After deposit:", account.deposit(50))
print("After withdrawal:", account.withdraw(25))
print("Transactions:", account.get_transaction_count())`,
            output: "Counter 1: 1\nCounter 1: 2\nCounter 2: 1\nCounter 1: 3\nCounter 2: 2\nDouble 5: 10\nTriple 4: 12\nInitial balance: 100\nAfter deposit: 150\nAfter withdrawal: 125\nTransactions: 2"
          },
          {
            title: "Advanced Closure Patterns",
            explanation: "Sophisticated uses of closures for configuration, caching, and state machines.",
            code: `-- Memoization using closures
function memoize(func)
    local cache = {}
    
    return function(...)
        local key = table.concat({...}, ",")
        
        if cache[key] == nil then
            cache[key] = func(...)
            print("Computing result for:", key)
        else
            print("Using cached result for:", key)
        end
        
        return cache[key]
    end
end

-- Expensive function to memoize
local function fibonacci(n)
    if n <= 1 then
        return n
    else
        return fibonacci(n - 1) + fibonacci(n - 2)
    end
end

local memoized_fib = memoize(fibonacci)

print("Fib(10):", memoized_fib(10))
print("Fib(10) again:", memoized_fib(10))  -- Uses cache

-- Configuration closure
function create_formatter(config)
    config = config or {}
    local prefix = config.prefix or ""
    local suffix = config.suffix or ""
    local uppercase = config.uppercase or false
    
    return function(text)
        local result = prefix .. text .. suffix
        return uppercase and string.upper(result) or result
    end
end

local html_formatter = create_formatter{
    prefix = "<p>",
    suffix = "</p>",
    uppercase = false
}

local shout_formatter = create_formatter{
    prefix = ">>> ",
    suffix = " <<<",
    uppercase = true
}

print(html_formatter("Hello World"))
print(shout_formatter("Hello World"))

-- State machine using closures
function create_state_machine(initial_state, transitions)
    local current_state = initial_state
    
    return {
        get_state = function()
            return current_state
        end,
        
        transition = function(event)
            local next_state = transitions[current_state] and transitions[current_state][event]
            if next_state then
                print("Transitioning from " .. current_state .. " to " .. next_state .. " on " .. event)
                current_state = next_state
                return true
            else
                print("Invalid transition: " .. event .. " from " .. current_state)
                return false
            end
        end
    }
end

-- Traffic light state machine
local traffic_light = create_state_machine("red", {
    red = {timer = "green"},
    green = {timer = "yellow"},
    yellow = {timer = "red"}
})

print("Current state:", traffic_light.get_state())
traffic_light.transition("timer")
traffic_light.transition("timer")
traffic_light.transition("invalid")  -- Should fail`,
            output: "Computing result for: 10\nFib(10): 55\nUsing cached result for: 10\nFib(10) again: 55\n<p>Hello World</p>\n>>> HELLO WORLD <<<\nCurrent state: red\nTransitioning from red to green on timer\nTransitioning from green to yellow on timer\nInvalid transition: invalid from yellow"
          }
        ],
        exercises: [
          {
            title: "Event System with Closures",
            description: "Build an event system that uses closures for event handlers and state management.",
            instructions: [
              "Create an event emitter that can register and trigger events",
              "Use closures to maintain event handler state",
              "Implement event filtering and transformation",
              "Add support for one-time event handlers"
            ],
            starterCode: `local function create_event_emitter()
    local handlers = {}
    
    return {
        on = function(event, handler)
            -- Register event handler
        end,
        
        once = function(event, handler)
            -- Register one-time event handler
        end,
        
        emit = function(event, ...)
            -- Trigger all handlers for the event
        end,
        
        off = function(event, handler)
            -- Remove specific handler
        end,
        
        create_filtered_handler = function(filter_func, handler)
            -- Return a closure that filters events before handling
        end
    }
end

-- Test your event system
local emitter = create_event_emitter()

local counter_handler = function(data)
    print("Counter event:", data)
end

emitter.on("count", counter_handler)
emitter.once("startup", function() print("System started!") end)

emitter.emit("startup")
emitter.emit("count", 1)
emitter.emit("count", 2)`
          }
        ]
      },
      {
        title: "Higher-Order Functions and Functional Programming",
        content: "Functions that operate on other functions, enabling powerful functional programming patterns in Lua.",
        codeExamples: [
          {
            title: "Higher-Order Function Basics",
            explanation: "Functions that take other functions as parameters or return functions.",
            code: `-- Function that takes another function as parameter
function apply_twice(func, value)
    return func(func(value))
end

local function double(x)
    return x * 2
end

local function increment(x)
    return x + 1
end

print("Apply double twice to 3:", apply_twice(double, 3))      -- 12
print("Apply increment twice to 5:", apply_twice(increment, 5)) -- 7

-- Function that returns a function
function create_adder(n)
    return function(x)
        return x + n
    end
end

local add_10 = create_adder(10)
local add_5 = create_adder(5)

print("Add 10 to 7:", add_10(7))  -- 17
print("Add 5 to 12:", add_5(12))  -- 17

-- Composition function
function compose(f, g)
    return function(x)
        return f(g(x))
    end
end

local function square(x)
    return x * x
end

local square_then_double = compose(double, square)
local double_then_square = compose(square, double)

print("Square then double 3:", square_then_double(3))  -- 18
print("Double then square 3:", double_then_square(3))  -- 36`,
            output: "Apply double twice to 3: 12\nApply increment twice to 5: 7\nAdd 10 to 7: 17\nAdd 5 to 12: 17\nSquare then double 3: 18\nDouble then square 3: 36"
          },
          {
            title: "Functional Array Operations",
            explanation: "Implementing map, filter, and reduce operations for functional data processing.",
            code: `-- Map function: apply a function to each element
function map(array, func)
    local result = {}
    for i, value in ipairs(array) do
        result[i] = func(value)
    end
    return result
end

-- Filter function: keep elements that pass a test
function filter(array, predicate)
    local result = {}
    for _, value in ipairs(array) do
        if predicate(value) then
            table.insert(result, value)
        end
    end
    return result
end

-- Reduce function: combine all elements into a single value
function reduce(array, func, initial)
    local accumulator = initial
    for _, value in ipairs(array) do
        accumulator = func(accumulator, value)
    end
    return accumulator
end

-- Test data
local numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

-- Map: square all numbers
local squares = map(numbers, function(x) return x * x end)
print("Squares:", table.concat(squares, ", "))

-- Filter: get even numbers
local evens = filter(numbers, function(x) return x % 2 == 0 end)
print("Evens:", table.concat(evens, ", "))

-- Reduce: sum all numbers
local sum = reduce(numbers, function(acc, x) return acc + x end, 0)
print("Sum:", sum)

-- Chaining operations
local result = reduce(
    map(
        filter(numbers, function(x) return x % 2 == 0 end),
        function(x) return x * x end
    ),
    function(acc, x) return acc + x end,
    0
)
print("Sum of squares of even numbers:", result)

-- More complex example: processing a list of people
local people = {
    {name = "Alice", age = 25, salary = 50000},
    {name = "Bob", age = 30, salary = 60000},
    {name = "Charlie", age = 35, salary = 70000},
    {name = "Diana", age = 28, salary = 55000}
}

-- Get names of people over 30
local senior_names = map(
    filter(people, function(person) return person.age > 30 end),
    function(person) return person.name end
)
print("People over 30:", table.concat(senior_names, ", "))

-- Calculate average salary
local total_salary = reduce(people, function(acc, person) return acc + person.salary end, 0)
local average_salary = total_salary / #people
print("Average salary:", average_salary)`,
            output: "Squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100\nEvens: 2, 4, 6, 8, 10\nSum: 55\nSum of squares of even numbers: 220\nPeople over 30: Bob, Charlie\nAverage salary: 58750"
          }
        ],
        exercises: [
          {
            title: "Functional Programming Toolkit",
            description: "Build a comprehensive functional programming library with various higher-order functions.",
            instructions: [
              "Implement additional functional operations (find, some, every, partition)",
              "Create function composition and currying utilities",
              "Add support for working with nested data structures",
              "Implement lazy evaluation for performance"
            ],
            starterCode: `local fp = {}

function fp.map(array, func)
    -- Already implemented above
end

function fp.filter(array, predicate)
    -- Already implemented above
end

function fp.find(array, predicate)
    -- Find first element that matches predicate
end

function fp.some(array, predicate)
    -- Return true if any element matches predicate
end

function fp.every(array, predicate)
    -- Return true if all elements match predicate
end

function fp.partition(array, predicate)
    -- Split array into two arrays: [matches, non_matches]
end

function fp.curry(func, arity)
    -- Convert function to curried form
end

function fp.pipe(...)
    -- Compose functions left-to-right
end

-- Test your implementations
local numbers = {1, 2, 3, 4, 5}
local is_even = function(x) return x % 2 == 0 end

print("Find first even:", fp.find(numbers, is_even))
print("Some are even:", fp.some(numbers, is_even))
print("All are positive:", fp.every(numbers, function(x) return x > 0 end))`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What happens to local variables in the outer function when a closure is created?",
          options: [
            "They are copied into the closure",
            "They become upvalues accessible to the closure",
            "They are destroyed immediately",
            "They become global variables"
          ],
          correctAnswer: 1,
          explanation: "Local variables from outer scopes become upvalues in closures, maintaining their reference and allowing the closure to access and modify them."
        },
        {
          question: "How many values does this function return: function test() return 1, 2, 3 end?",
          options: [
            "1",
            "2", 
            "3",
            "It depends on how it's called"
          ],
          correctAnswer: 2,
          explanation: "The function returns 3 values. However, how many are actually used depends on the calling context - extra values may be discarded."
        },
        {
          question: "What is a higher-order function?",
          options: [
            "A function with many parameters",
            "A function that calls itself recursively",
            "A function that takes functions as parameters or returns functions",
            "A function defined at the top level"
          ],
          correctAnswer: 2,
          explanation: "A higher-order function is one that operates on other functions, either by taking them as arguments or by returning them."
        }
      ]
    }
  },
  {
    title: "Tables: Lua's Universal Data Structure",
    description: "Master Lua's most important data structure - tables - which serve as arrays, dictionaries, objects, and more.",
    objectives: [
      "Understand table creation and initialization",
      "Master array and hash table operations",
      "Learn table traversal with ipairs and pairs",
      "Implement complex data structures using tables",
      "Understand table references and copying"
    ],
    prerequisites: ["Functions and scope"],
    estimatedTime: "4-5 hours",
    difficulty: "Intermediate",
    sections: [
      {
        title: "Table Fundamentals",
        content: "Tables are Lua's only data structuring mechanism, serving as both arrays and associative arrays (hash tables). Understanding their dual nature is crucial for effective Lua programming.",
        codeExamples: [
          {
            title: "Table Creation and Basic Operations",
            explanation: "Different ways to create and manipulate tables in Lua.",
            code: `-- Empty table creation
local empty_table = {}
local another_empty = {}

print("Empty tables are different objects:", empty_table == another_empty)

-- Array-style initialization
local fruits = {"apple", "banana", "cherry"}
print("First fruit:", fruits[1])  -- Lua uses 1-based indexing
print("Array length:", #fruits)

-- Hash-style initialization
local person = {
    name = "Alice",
    age = 30,
    city = "New York"
}
print("Person's name:", person.name)
print("Person's age:", person["age"])  -- Equivalent to person.age

-- Mixed initialization
local mixed = {
    "first element",    -- index 1
    "second element",   -- index 2
    name = "Mixed Table",
    count = 42,
    [100] = "hundredth element"
}

print("Mixed[1]:", mixed[1])
print("Mixed.name:", mixed.name)
print("Mixed[100]:", mixed[100])

-- Dynamic key assignment
local key = "dynamic_key"
mixed[key] = "dynamic value"
print("Dynamic value:", mixed.dynamic_key)

-- Table as a record/struct
local point = {x = 10, y = 20}
point.z = 30  -- Add new field
print("3D Point:", point.x, point.y, point.z)`,
            output: "Empty tables are different objects: false\nFirst fruit: apple\nArray length: 3\nPerson's name: Alice\nPerson's age: 30\nMixed[1]: first element\nMixed.name: Mixed Table\nMixed[100]: hundredth element\nDynamic value: dynamic value\n3D Point: 10 20 30"
          },
          {
            title: "Table References and Copying",
            explanation: "Understanding how table assignment works with references, not copies.",
            code: `-- Table assignment creates references, not copies
local original = {a = 1, b = 2, c = 3}
local reference = original

reference.a = 100
print("Original.a after modifying reference:", original.a)  -- 100

-- Shallow copy function
function shallow_copy(t)
    local copy = {}
    for k, v in pairs(t) do
        copy[k] = v
    end
    return copy
end

local copy = shallow_copy(original)
copy.b = 200
print("Original.b after modifying copy:", original.b)      -- 2
print("Copy.b:", copy.b)                                   -- 200

-- Deep copy function (handles nested tables)
function deep_copy(t)
    if type(t) ~= "table" then
        return t
    end
    
    local copy = {}
    for k, v in pairs(t) do
        copy[k] = deep_copy(v)  -- Recursive copy
    end
    return copy
end

-- Test with nested tables
local nested = {
    name = "Parent",
    child = {
        name = "Child",
        value = 42
    }
}

local shallow = shallow_copy(nested)
local deep = deep_copy(nested)

-- Modify nested value
nested.child.value = 999

print("Original nested value:", nested.child.value)    -- 999
print("Shallow copy nested value:", shallow.child.value)  -- 999 (shared reference)
print("Deep copy nested value:", deep.child.value)     -- 42 (independent copy)

-- Table equality
local t1 = {1, 2, 3}
local t2 = {1, 2, 3}
local t3 = t1

print("t1 == t2 (same content):", t1 == t2)  -- false (different objects)
print("t1 == t3 (same reference):", t1 == t3)  -- true (same object)`,
            output: "Original.a after modifying reference: 100\nOriginal.b after modifying copy: 2\nCopy.b: 200\nOriginal nested value: 999\nShallow copy nested value: 999\nDeep copy nested value: 42\nt1 == t2 (same content): false\nt1 == t3 (same reference): true"
          }
        ],
        exercises: [
          {
            title: "Table Utility Library",
            description: "Create a comprehensive library for table operations.",
            instructions: [
              "Implement functions for deep copying, merging tables",
              "Create functions to compare table contents (deep equality)",
              "Add functions for table serialization and deserialization",
              "Implement table flattening and nesting operations"
            ],
            starterCode: `local table_utils = {}

function table_utils.deep_copy(t)
    -- Implement deep copy with cycle detection
end

function table_utils.merge(t1, t2)
    -- Merge two tables, with t2 values overriding t1
end

function table_utils.deep_equal(t1, t2)
    -- Compare two tables for deep equality
end

function table_utils.serialize(t)
    -- Convert table to string representation
end

function table_utils.flatten(t, separator)
    -- Flatten nested table with dot notation keys
    separator = separator or "."
end

-- Test your implementations
local t1 = {a = 1, b = {c = 2, d = 3}}
local t2 = {b = {e = 4}, f = 5}

local merged = table_utils.merge(t1, t2)
local flattened = table_utils.flatten(t1)
print("Merged:", table_utils.serialize(merged))
print("Flattened:", table_utils.serialize(flattened))`
          }
        ]
      },
      {
        title: "Table Traversal and Iteration",
        content: "Mastering the different ways to iterate over tables using ipairs, pairs, and custom iterators.",
        codeExamples: [
          {
            title: "ipairs vs pairs",
            explanation: "Understanding the difference between ipairs (array part) and pairs (all elements).",
            code: `-- Create a mixed table
local mixed_table = {
    "first",      -- index 1
    "second",     -- index 2
    "third",      -- index 3
    name = "Mixed",
    age = 25,
    [10] = "tenth",
    [5] = "fifth"
}

print("Using ipairs (consecutive integer keys from 1):")
for i, v in ipairs(mixed_table) do
    print(i, v)
end

print("\\nUsing pairs (all key-value pairs):")
for k, v in pairs(mixed_table) do
    print(k, v)
end

-- Sparse array behavior
local sparse = {1, 2, nil, 4, 5}
print("\\nSparse array with ipairs:")
for i, v in ipairs(sparse) do
    print(i, v)
end

print("\\nSparse array with pairs:")
for k, v in pairs(sparse) do
    print(k, v)
end

print("\\nSparse array length:", #sparse)

-- Manual iteration with next()
print("\\nManual iteration with next():")
local key = nil
repeat
    key, value = next(mixed_table, key)
    if key then
        print(key, value)
    end
until not key`,
            output: "Using ipairs (consecutive integer keys from 1):\n1\tfirst\n2\tsecond\n3\tthird\n\nUsing pairs (all key-value pairs):\n1\tfirst\n2\tsecond\n3\tthird\nname\tMixed\nage\t25\n10\ttenth\n5\tfifth\n\nSparse array with ipairs:\n1\t1\n2\t2\n\nSparse array with pairs:\n1\t1\n2\t2\n4\t4\n5\t5\n\nSparse array length: 2\n\nManual iteration with next():\n..."
          },
          {
            title: "Custom Table Iterators",
            explanation: "Creating specialized iterators for different traversal patterns.",
            code: `-- Iterator for sorted keys
function sorted_pairs(t)
    local keys = {}
    for k in pairs(t) do
        table.insert(keys, k)
    end
    table.sort(keys, function(a, b)
        -- Handle mixed key types
        local ta, tb = type(a), type(b)
        if ta == tb then
            return a < b
        else
            return ta < tb
        end
    end)
    
    local i = 0
    return function()
        i = i + 1
        local key = keys[i]
        if key then
            return key, t[key]
        end
    end
end

local data = {
    zebra = "animal",
    apple = "fruit",
    [3] = "number three",
    [1] = "number one",
    banana = "fruit"
}

print("Sorted iteration:")
for k, v in sorted_pairs(data) do
    print(k, v)
end

-- Iterator for values only
function values(t)
    local key = nil
    return function()
        local value
        key, value = next(t, key)
        return value
    end
end

print("\\nValues only:")
for value in values(data) do
    print(value)
end

-- Iterator for filtering
function filtered_pairs(t, predicate)
    local key = nil
    return function()
        repeat
            key, value = next(t, key)
        until not key or predicate(key, value)
        return key, value
    end
end

print("\\nFiltered (string keys only):")
for k, v in filtered_pairs(data, function(k, v) return type(k) == "string" end) do
    print(k, v)
end

-- Iterator for nested tables (depth-first)
function deep_pairs(t, prefix)
    prefix = prefix or ""
    local key = nil
    local nested_iter = nil
    local nested_key = nil
    
    return function()
        if nested_iter then
            local nk, nv = nested_iter()
            if nk then
                return prefix .. nested_key .. "." .. nk, nv
            else
                nested_iter = nil
            end
        end
        
        repeat
            key, value = next(t, key)
            if key and type(value) == "table" then
                nested_key = key
                nested_iter = deep_pairs(value)
                local nk, nv = nested_iter()
                if nk then
                    return prefix .. key .. "." .. nk, nv
                end
            end
        until not key or type(value) ~= "table"
        
        if key then
            return prefix .. key, value
        end
    end
end

local nested_data = {
    user = {
        name = "Alice",
        settings = {
            theme = "dark",
            notifications = true
        }
    },
    version = "1.0"
}

print("\\nDeep iteration:")
for k, v in deep_pairs(nested_data) do
    print(k, v)
end`,
            output: "Sorted iteration:\n1\tnumber one\n3\tnumber three\napple\tfruit\nbanana\tfruit\nzebra\tanimal\n\nValues only:\nnumber one\nnumber three\nfruit\nfruit\nanimal\n\nFiltered (string keys only):\napple\tfruit\nbanana\tfruit\nzebra\tanimal\n\nDeep iteration:\nuser.name\tAlice\nuser.settings.theme\tdark\nuser.settings.notifications\ttrue\nversion\t1.0"
          }
        ],
        exercises: [
          {
            title: "Advanced Table Iterators",
            description: "Build a collection of specialized table iterators for different use cases.",
            instructions: [
              "Create an iterator that yields key-value pairs in reverse order",
              "Implement an iterator for breadth-first traversal of nested tables",
              "Build an iterator that can skip certain keys or values based on patterns",
              "Create a paginated iterator that yields chunks of key-value pairs"
            ],
            starterCode: `local iterators = {}

function iterators.reverse_pairs(t)
    -- Iterate in reverse order (for array-like tables)
end

function iterators.breadth_first(t)
    -- Breadth-first traversal of nested tables
end

function iterators.skip_pattern(t, pattern)
    -- Skip keys matching a pattern
end

function iterators.paginated(t, page_size)
    -- Return iterator that yields pages of key-value pairs
end

-- Test your iterators
local test_data = {
    "first", "second", "third",
    nested = {a = 1, b = {c = 2}},
    skip_me = "should be skipped",
    keep_me = "should be kept"
}

print("Reverse iteration:")
for k, v in iterators.reverse_pairs(test_data) do
    print(k, v)
end

print("\\nBreadth-first:")
for k, v in iterators.breadth_first(test_data) do
    print(k, v)
end`
          }
        ]
      },
      {
        title: "Implementing Data Structures with Tables",
        content: "Using tables to implement common data structures like stacks, queues, sets, and more complex structures.",
        codeExamples: [
          {
            title: "Stack and Queue Implementation",
            explanation: "Implementing stack (LIFO) and queue (FIFO) data structures using tables.",
            code: `-- Stack implementation
local Stack = {}
Stack.__index = Stack

function Stack.new()
    return setmetatable({}, Stack)
end

function Stack:push(value)
    table.insert(self, value)
end

function Stack:pop()
    return table.remove(self)
end

function Stack:peek()
    return self[#self]
end

function Stack:is_empty()
    return #self == 0
end

function Stack:size()
    return #self
end

-- Test stack
local stack = Stack.new()
stack:push("first")
stack:push("second")
stack:push("third")

print("Stack size:", stack:size())
print("Peek:", stack:peek())
print("Pop:", stack:pop())
print("Pop:", stack:pop())
print("Size after pops:", stack:size())

-- Queue implementation
local Queue = {}
Queue.__index = Queue

function Queue.new()
    return setmetatable({head = 1, tail = 0}, Queue)
end

function Queue:enqueue(value)
    self.tail = self.tail + 1
    self[self.tail] = value
end

function Queue:dequeue()
    if self.head > self.tail then
        return nil  -- Queue is empty
    end
    
    local value = self[self.head]
    self[self.head] = nil  -- Allow garbage collection
    self.head = self.head + 1
    
    -- Reset indices when queue becomes empty
    if self.head > self.tail then
        self.head = 1
        self.tail = 0
    end
    
    return value
end

function Queue:is_empty()
    return self.head > self.tail
end

function Queue:size()
    return self.tail - self.head + 1
end

-- Test queue
local queue = Queue.new()
queue:enqueue("first")
queue:enqueue("second")
queue:enqueue("third")

print("\\nQueue size:", queue:size())
print("Dequeue:", queue:dequeue())
print("Dequeue:", queue:dequeue())
print("Size after dequeues:", queue:size())`,
            output: "Stack size: 3\nPeek: third\nPop: third\nPop: second\nSize after pops: 1\n\nQueue size: 3\nDequeue: first\nDequeue: second\nSize after dequeues: 1"
          },
          {
            title: "Set and Dictionary Implementations",
            explanation: "Implementing sets and enhanced dictionaries with additional functionality.",
            code: `-- Set implementation
local Set = {}
Set.__index = Set

function Set.new(items)
    local set = setmetatable({}, Set)
    if items then
        for _, item in ipairs(items) do
            set:add(item)
        end
    end
    return set
end

function Set:add(item)
    self[item] = true
end

function Set:remove(item)
    self[item] = nil
end

function Set:contains(item)
    return self[item] == true
end

function Set:size()
    local count = 0
    for _ in pairs(self) do
        count = count + 1
    end
    return count
end

function Set:to_array()
    local array = {}
    for item in pairs(self) do
        table.insert(array, item)
    end
    return array
end

function Set:union(other)
    local result = Set.new()
    for item in pairs(self) do
        result:add(item)
    end
    for item in pairs(other) do
        result:add(item)
    end
    return result
end

function Set:intersection(other)
    local result = Set.new()
    for item in pairs(self) do
        if other:contains(item) then
            result:add(item)
        end
    end
    return result
end

-- Test set operations
local set1 = Set.new({"apple", "banana", "cherry"})
local set2 = Set.new({"banana", "date", "elderberry"})

print("Set1 contains 'apple':", set1:contains("apple"))
print("Set1 size:", set1:size())

local union = set1:union(set2)
local intersection = set1:intersection(set2)

print("Union:", table.concat(union:to_array(), ", "))
print("Intersection:", table.concat(intersection:to_array(), ", "))

-- Enhanced Dictionary with default values and key transformation
local Dict = {}
Dict.__index = Dict

function Dict.new(default_value, key_transform)
    return setmetatable({
        _data = {},
        _default = default_value,
        _transform = key_transform
    }, Dict)
end

function Dict:_transform_key(key)
    if self._transform then
        return self._transform(key)
    end
    return key
end

function Dict:set(key, value)
    key = self:_transform_key(key)
    self._data[key] = value
end

function Dict:get(key)
    key = self:_transform_key(key)
    local value = self._data[key]
    if value == nil then
        return self._default
    end
    return value
end

function Dict:has(key)
    key = self:_transform_key(key)
    return self._data[key] ~= nil
end

function Dict:keys()
    local keys = {}
    for k in pairs(self._data) do
        table.insert(keys, k)
    end
    return keys
end

-- Test enhanced dictionary
local case_insensitive_dict = Dict.new("N/A", string.lower)
case_insensitive_dict:set("Name", "Alice")
case_insensitive_dict:set("AGE", 30)

print("\\nCase-insensitive dictionary:")
print("name:", case_insensitive_dict:get("name"))
print("Age:", case_insensitive_dict:get("Age"))
print("missing:", case_insensitive_dict:get("missing"))`,
            output: "Set1 contains 'apple': true\nSet1 size: 3\nUnion: apple, banana, cherry, date, elderberry\nIntersection: banana\n\nCase-insensitive dictionary:\nname: Alice\nAge: 30\nmissing: N/A"
          }
        ],
        exercises: [
          {
            title: "Advanced Data Structures",
            description: "Implement more complex data structures using tables as the foundation.",
            instructions: [
              "Create a priority queue (heap) implementation",
              "Build a simple graph structure with adjacency lists",
              "Implement a trie (prefix tree) for string storage and retrieval",
              "Create a LRU (Least Recently Used) cache"
            ],
            starterCode: `-- Priority Queue (Min-Heap)
local PriorityQueue = {}
PriorityQueue.__index = PriorityQueue

function PriorityQueue.new(compare_func)
    return setmetatable({
        _heap = {},
        _compare = compare_func or function(a, b) return a < b end
    }, PriorityQueue)
end

function PriorityQueue:insert(item)
    -- Insert item and maintain heap property
end

function PriorityQueue:extract_min()
    -- Remove and return minimum item
end

-- Graph implementation
local Graph = {}
Graph.__index = Graph

function Graph.new(directed)
    return setmetatable({
        _adjacency = {},
        _directed = directed or false
    }, Graph)
end

function Graph:add_vertex(vertex)
    -- Add a vertex to the graph
end

function Graph:add_edge(from, to, weight)
    -- Add an edge between vertices
end

function Graph:get_neighbors(vertex)
    -- Return neighbors of a vertex
end

-- Test your implementations
local pq = PriorityQueue.new()
pq:insert(5)
pq:insert(2)
pq:insert(8)
pq:insert(1)

print("Min item:", pq:extract_min())  -- Should be 1

local graph = Graph.new(false)  -- Undirected graph
graph:add_vertex("A")
graph:add_vertex("B")
graph:add_edge("A", "B", 1)
print("Neighbors of A:", table.concat(graph:get_neighbors("A"), ", "))`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is the difference between ipairs and pairs when iterating over tables?",
          options: [
            "ipairs is faster than pairs",
            "ipairs iterates over consecutive integer keys from 1, pairs iterates over all keys",
            "pairs only works with string keys",
            "There is no difference"
          ],
          correctAnswer: 1,
          explanation: "ipairs iterates over consecutive positive integer keys starting from 1 until it hits a nil value, while pairs iterates over all key-value pairs in the table."
        },
        {
          question: "What happens when you assign one table to another variable?",
          options: [
            "A copy of the table is created",
            "Only the values are copied",
            "A reference to the same table is created",
            "An error occurs"
          ],
          correctAnswer: 2,
          explanation: "Table assignment creates a reference to the same table object, not a copy. Modifications through either variable affect the same table."
        },
        {
          question: "What does the # operator return for the table {1, 2, nil, 4, 5}?",
          options: [
            "5",
            "4", 
            "2",
            "The result is undefined"
          ],
          correctAnswer: 3,
          explanation: "The # operator's behavior is undefined for tables with 'holes' (nil values in the array part). It may return any valid boundary."
        }
      ]
    }
  },
  {
    title: "String Manipulation and Pattern Matching",
    description: "Master Lua's powerful string manipulation capabilities and pattern matching system for text processing.",
    objectives: [
      "Master string manipulation functions and techniques",
      "Understand Lua's pattern matching system",
      "Learn to use captures and replacements effectively",
      "Build text processing and parsing solutions",
      "Optimize string operations for performance"
    ],
    prerequisites: ["Tables and data structures"],
    estimatedTime: "4-5 hours",
    difficulty: "Intermediate",
    sections: [
      {
        title: "String Manipulation Functions",
        content: "Lua provides a rich set of string manipulation functions for common text processing tasks, from basic operations to advanced formatting.",
        codeExamples: [
          {
            title: "Basic String Operations",
            explanation: "Essential string functions for everyday text manipulation.",
            code: `-- String length and character access
local text = "Hello, Lua World!"
print("Length:", #text)
print("Length (function):", string.len(text))

-- Character codes and conversion
print("First char code:", string.byte(text, 1))
print("Last char code:", string.byte(text, -1))
print("Multiple chars:", string.byte(text, 1, 3))

-- Creating strings from character codes
print("From codes:", string.char(72, 101, 108, 108, 111))  -- "Hello"

-- Substrings
print("Substring (1-5):", string.sub(text, 1, 5))
print("Substring (8 to end):", string.sub(text, 8))
print("Last 6 chars:", string.sub(text, -6))

-- Case conversion
print("Uppercase:", string.upper(text))
print("Lowercase:", string.lower(text))

-- String repetition and reversal
print("Repeated:", string.rep("Lua ", 3))
print("Reversed:", string.reverse(text))

-- String formatting (printf-style)
local name, age, score = "Alice", 25, 95.5
print(string.format("Name: %s, Age: %d, Score: %.1f", name, age, score))
print(string.format("Hex: %x, Octal: %o, Scientific: %e", 255, 64, 1234.5))

-- Lua-specific %q format for safe string literals
local unsafe = 'String with "quotes" and \\backslashes'
print("Safe literal:", string.format("local s = %q", unsafe))`,
            output: "Length: 17\nLength (function): 17\nFirst char code: 72\nLast char code: 33\nMultiple chars: 72\t101\t108\nFrom codes: Hello\nSubstring (1-5): Hello\nSubstring (8 to end): Lua World!\nLast 6 chars: World!\nUppercase: HELLO, LUA WORLD!\nLowercase: hello, lua world!\nRepeated: Lua Lua Lua \nReversed: !dlroW auL ,olleH\nName: Alice, Age: 25, Score: 95.5\nHex: ff, Octal: 100, Scientific: 1.234500e+03\nSafe literal: local s = \"String with \\\"quotes\\\" and \\\\backslashes\""
          },
          {
            title: "Advanced String Formatting",
            explanation: "Sophisticated string formatting techniques for complex output.",
            code: `-- Advanced formatting with width and precision
local function format_table(data)
    print(string.format("%-15s %8s %10s", "Name", "Age", "Salary"))
    print(string.rep("-", 35))
    
    for _, person in ipairs(data) do
        print(string.format("%-15s %8d %10.2f", 
            person.name, person.age, person.salary))
    end
end

local employees = {
    {name = "Alice Johnson", age = 28, salary = 65000.50},
    {name = "Bob Smith", age = 35, salary = 75000.00},
    {name = "Carol Davis", age = 42, salary = 85000.75}
}

format_table(employees)

-- Custom formatting function
local function format_currency(amount, currency)
    currency = currency or "$"
    return string.format("%s%,.2f", currency, amount)
end

print("\\nFormatted currencies:")
print("USD:", format_currency(1234567.89))
print("EUR:", format_currency(987654.32, "€"))

-- Template-style formatting
local function template_format(template, values)
    return string.gsub(template, "{(%w+)}", function(key)
        return tostring(values[key] or "{" .. key .. "}")
    end)
end

local template = "Hello {name}, you have {count} new messages. Welcome to {app}!"
local data = {name = "Alice", count = 5, app = "LuaApp"}
print("\\nTemplate result:", template_format(template, data))

-- Multi-line string formatting
local function format_report(title, items)
    local lines = {string.format("=== %s ===", title)}
    
    for i, item in ipairs(items) do
        table.insert(lines, string.format("%2d. %s", i, item))
    end
    
    table.insert(lines, string.rep("=", #title + 8))
    return table.concat(lines, "\\n")
end

local report = format_report("Shopping List", {
    "Apples (2 lbs)",
    "Bread (whole wheat)",
    "Milk (1 gallon)",
    "Eggs (dozen)"
})
print("\\n" .. report)`,
            output: "Name            Age     Salary\n-----------------------------------\nAlice Johnson    28   65000.50\nBob Smith        35   75000.00\nCarol Davis      42   85000.75\n\nFormatted currencies:\nUSD: $1,234,567.89\nEUR: €987,654.32\n\nTemplate result: Hello Alice, you have 5 new messages. Welcome to LuaApp!\n\n=== Shopping List ===\n 1. Apples (2 lbs)\n 2. Bread (whole wheat)\n 3. Milk (1 gallon)\n 4. Eggs (dozen)\n================="
          }
        ],
        exercises: [
          {
            title: "Text Processing Utilities",
            description: "Build a comprehensive text processing library with various string manipulation functions.",
            instructions: [
              "Create functions for text alignment (left, right, center)",
              "Implement word wrapping with proper line breaking",
              "Build a function to create ASCII tables from data",
              "Add text cleaning and normalization functions"
            ],
            starterCode: `local text_utils = {}

function text_utils.pad_left(text, width, char)
    char = char or " "
    -- Pad text to width with char on the left
end

function text_utils.pad_right(text, width, char)
    char = char or " "
    -- Pad text to width with char on the right
end

function text_utils.center(text, width, char)
    char = char or " "
    -- Center text within width
end

function text_utils.wrap_text(text, width)
    -- Wrap text to specified width, breaking at word boundaries
end

function text_utils.create_table(headers, rows, options)
    options = options or {}
    -- Create ASCII table from headers and rows
end

function text_utils.clean_text(text)
    -- Remove extra whitespace, normalize line endings
end

-- Test your functions
local long_text = "This is a very long sentence that needs to be wrapped at a reasonable width to fit properly in a terminal or document."
print(text_utils.wrap_text(long_text, 30))

local table_data = {
    {"Alice", 28, "Engineer"},
    {"Bob", 35, "Manager"},
    {"Carol", 42, "Director"}
}
print(text_utils.create_table({"Name", "Age", "Role"}, table_data))`
          }
        ]
      },
      {
        title: "Pattern Matching Fundamentals",
        content: "Lua's pattern matching system is simpler than regular expressions but powerful enough for most text processing tasks.",
        codeExamples: [
          {
            title: "Basic Pattern Matching",
            explanation: "Understanding Lua's pattern syntax and basic matching operations.",
            code: `-- Basic pattern matching with string.find
local text = "The quick brown fox jumps over the lazy dog"

-- Simple literal matching
local start, finish = string.find(text, "fox")
print("'fox' found at positions:", start, finish)

-- Case-insensitive matching (manual)
local start2, finish2 = string.find(string.lower(text), "fox")
print("'fox' (case-insensitive) found at:", start2, finish2)

-- Character classes
print("\\nCharacter class examples:")
print("First digit:", string.find("abc123def", "%d"))
print("First letter:", string.find("123abc456", "%a"))
print("First space:", string.find("hello world", "%s"))
print("First punctuation:", string.find("hello, world!", "%p"))

-- Pattern anchoring
local emails = {
    "user@example.com",
    "not-an-email",
    "another@test.org",
    "invalid.email"
}

print("\\nEmail validation (simple):")
for _, email in ipairs(emails) do
    local has_at = string.find(email, "@")
    local has_dot_after_at = string.find(email, "@.*%.")
    local is_valid = has_at and has_dot_after_at
    print(email, "->", is_valid and "valid" or "invalid")
end

-- Using string.match to extract matches
local log_line = "2023-12-25 14:30:15 ERROR Database connection failed"
local date = string.match(log_line, "%d%d%d%d%-%d%d%-%d%d")
local time = string.match(log_line, "%d%d:%d%d:%d%d")
local level = string.match(log_line, "%u%u%u%u%u?")  -- 4-5 uppercase letters
print("\\nLog parsing:")
print("Date:", date)
print("Time:", time)
print("Level:", level)

-- Pattern repetition
local numbers_text = "Price: $123.45, Tax: $12.34, Total: $135.79"
print("\\nExtracting prices:")
for price in string.gmatch(numbers_text, "%$%d+%.%d%d") do
    print("Found price:", price)
end`,
            output: "'fox' found at positions: 17 19\n'fox' (case-insensitive) found at: 17 19\n\nCharacter class examples:\nFirst digit: 4 4\nFirst letter: 4 4\nFirst space: 6 6\nFirst punctuation: 6 6\n\nEmail validation (simple):\nuser@example.com -> valid\nnot-an-email -> invalid\nanother@test.org -> valid\ninvalid.email -> invalid\n\nLog parsing:\nDate: 2023-12-25\nTime: 14:30:15\nLevel: ERROR\n\nExtracting prices:\nFound price: $123.45\nFound price: $12.34\nFound price: $135.79"
          },
          {
            title: "Advanced Pattern Techniques",
            explanation: "Complex patterns using captures, balanced matching, and advanced techniques.",
            code: `-- Captures in patterns
local function parse_name(full_name)
    local first, last = string.match(full_name, "^(%a+)%s+(%a+)$")
    return first, last
end

local names = {"John Doe", "Jane Smith", "Bob", "Mary Jane Watson"}
print("Name parsing:")
for _, name in ipairs(names) do
    local first, last = parse_name(name)
    if first and last then
        print(name, "->", "First:", first, "Last:", last)
    else
        print(name, "-> Invalid format")
    end
end

-- Multiple captures
local function parse_url(url)
    local protocol, host, port, path = string.match(url, 
        "^(%a+)://([^:/]+):?(%d*)(.*)$")
    return protocol, host, port ~= "" and tonumber(port) or nil, path
end

local urls = {
    "http://example.com/path",
    "https://api.example.com:8080/v1/users",
    "ftp://files.example.com:21/downloads"
}

print("\\nURL parsing:")
for _, url in ipairs(urls) do
    local protocol, host, port, path = parse_url(url)
    print(string.format("URL: %s", url))
    print(string.format("  Protocol: %s, Host: %s, Port: %s, Path: %s", 
        protocol or "nil", host or "nil", port or "default", path or "/"))
end

-- Balanced matching with %b
local function extract_parentheses(text)
    local results = {}
    for match in string.gmatch(text, "%b()") do
        table.insert(results, match)
    end
    return results
end

local code = "function test(a, b) return (a + b) * (c - d) end"
local parens = extract_parentheses(code)
print("\\nParentheses found:")
for i, paren in ipairs(parens) do
    print(i, paren)
end

-- Complex pattern: parsing CSV with quoted fields
local function parse_csv_line(line)
    local fields = {}
    local field_pattern = '([^,]*),?'  -- Simple version
    local quoted_pattern = '"([^"]*)"'  -- Quoted fields
    
    -- This is a simplified CSV parser
    local pos = 1
    while pos <= #line do
        local field
        if string.sub(line, pos, pos) == '"' then
            -- Quoted field
            local start_quote = pos
            local end_quote = string.find(line, '"', pos + 1)
            if end_quote then
                field = string.sub(line, pos + 1, end_quote - 1)
                pos = end_quote + 1
                if string.sub(line, pos, pos) == ',' then
                    pos = pos + 1
                end
            else
                error("Unterminated quoted field")
            end
        else
            -- Unquoted field
            local comma_pos = string.find(line, ',', pos)
            if comma_pos then
                field = string.sub(line, pos, comma_pos - 1)
                pos = comma_pos + 1
            else
                field = string.sub(line, pos)
                pos = #line + 1
            end
        end
        table.insert(fields, field)
    end
    
    return fields
end

local csv_lines = {
    'John,25,Engineer',
    '"Smith, Jane",30,"Software Developer"',
    'Bob,"Manager, Sales",35'
}

print("\\nCSV parsing:")
for _, line in ipairs(csv_lines) do
    local fields = parse_csv_line(line)
    print("Line:", line)
    print("Fields:", table.concat(fields, " | "))
end`,
            output: "Name parsing:\nJohn Doe -> First: John Last: Doe\nJane Smith -> First: Jane Last: Smith\nBob -> Invalid format\nMary Jane Watson -> Invalid format\n\nURL parsing:\nURL: http://example.com/path\n  Protocol: http, Host: example.com, Port: default, Path: /path\nURL: https://api.example.com:8080/v1/users\n  Protocol: https, Host: api.example.com, Port: 8080, Path: /v1/users\nURL: ftp://files.example.com:21/downloads\n  Protocol: ftp, Host: files.example.com, Port: 21, Path: /downloads\n\nParentheses found:\n1\t(a, b)\n2\t(a + b)\n3\t(c - d)\n\nCSV parsing:\nLine: John,25,Engineer\nFields: John | 25 | Engineer\nLine: \"Smith, Jane\",30,\"Software Developer\"\nFields: Smith, Jane | 30 | Software Developer\nLine: Bob,\"Manager, Sales\",35\nFields: Bob | Manager, Sales | 35"
          }
        ],
        exercises: [
          {
            title: "Advanced Text Parser",
            description: "Build a sophisticated text parsing system using pattern matching.",
            instructions: [
              "Create a function to validate and parse email addresses",
              "Build a simple markup parser (like Markdown) for basic formatting",
              "Implement a log file analyzer that extracts structured data",
              "Create a configuration file parser for key-value pairs"
            ],
            starterCode: `local parser = {}

function parser.parse_email(email)
    -- Parse and validate email address
    -- Return table with {user, domain, valid}
end

function parser.parse_markdown(text)
    -- Parse basic markdown: **bold**, *italic*, [link](url)
    -- Return HTML-like output
end

function parser.analyze_log(log_lines)
    -- Analyze log lines and extract:
    -- - Timestamps
    -- - Log levels
    -- - IP addresses
    -- - Error messages
    -- Return structured data
end

function parser.parse_config(config_text)
    -- Parse configuration in format:
    -- key = value
    -- # comments
    -- [sections]
    -- Return nested table structure
end

-- Test your parsers
local emails = {
    "user@example.com",
    "invalid.email",
    "test+tag@domain.co.uk"
}

for _, email in ipairs(emails) do
    local result = parser.parse_email(email)
    print(email, "->", result.valid and "valid" or "invalid")
end

local markdown = "This is **bold** and *italic* text with a [link](http://example.com)."
print("Markdown:", parser.parse_markdown(markdown))`
          }
        ]
      },
      {
        title: "String Replacement and Transformation",
        content: "Advanced string manipulation using gsub for search and replace operations with pattern-based transformations.",
        codeExamples: [
          {
            title: "Basic String Replacement",
            explanation: "Using string.gsub for search and replace operations.",
            code: `-- Basic literal replacement
local text = "Hello world, wonderful world!"
local result1 = string.gsub(text, "world", "Lua")
print("Basic replacement:", result1)

-- Pattern-based replacement
local code = "var x = 10; var y = 20; var z = 30;"
local lua_code = string.gsub(code, "var (%w+)", "local %1")
print("Pattern replacement:", lua_code)

-- Replacement with function
local function capitalize_words(text)
    return string.gsub(text, "(%a)([%a]*)", function(first, rest)
        return string.upper(first) .. string.lower(rest)
    end)
end

local mixed_case = "hELLo WoRLd, tHiS iS lUa!"
print("Capitalized:", capitalize_words(mixed_case))

-- Replacement with table lookup
local abbreviations = {
    USA = "United States of America",
    UK = "United Kingdom",
    EU = "European Union",
    UN = "United Nations"
}

local text_with_abbrev = "The USA and UK are part of the UN, but not the EU."
local expanded = string.gsub(text_with_abbrev, "(%u%u+)", abbreviations)
print("Expanded abbreviations:", expanded)

-- Counting replacements
local html = "<p>Hello</p><div>World</div><span>Lua</span>"
local plain_text, count = string.gsub(html, "<[^>]*>", "")
print("Stripped HTML:", plain_text)
print("Tags removed:", count)

-- Conditional replacement
local function smart_replace(text, pattern, replacement_func)
    return string.gsub(text, pattern, function(match)
        return replacement_func(match) or match
    end)
end

local function enhance_numbers(num_str)
    local num = tonumber(num_str)
    if num and num > 100 then
        return num_str .. " (large)"
    elseif num and num < 10 then
        return num_str .. " (small)"
    end
    return num_str
end

local number_text = "We have 5 apples, 150 oranges, and 25 bananas."
local enhanced = smart_replace(number_text, "%d+", enhance_numbers)
print("Enhanced numbers:", enhanced)`,
            output: "Basic replacement: Hello Lua, wonderful Lua!\nPattern replacement: local x = 10; local y = 20; local z = 30;\nCapitalized: Hello World, This Is Lua!\nExpanded abbreviations: The United States of America and United Kingdom are part of the United Nations, but not the European Union.\nStripped HTML: HelloWorldLua\nTags removed: 3\nEnhanced numbers: We have 5 (small) apples, 150 (large) oranges, and 25 bananas."
          },
          {
            title: "Advanced Text Transformations",
            explanation: "Complex text transformations using sophisticated pattern matching and replacement techniques.",
            code: `-- Template engine using gsub
local function render_template(template, data)
    -- Handle simple variables: {{variable}}
    local result = string.gsub(template, "{{%s*([%w_]+)%s*}}", function(var)
        return tostring(data[var] or "")
    end)
    
    -- Handle conditionals: {{#if condition}}...{{/if}}
    result = string.gsub(result, "{{#if%s+([%w_]+)}}(.-){{/if}}", function(condition, content)
        return data[condition] and content or ""
    end)
    
    -- Handle loops: {{#each array}}...{{/each}}
    result = string.gsub(result, "{{#each%s+([%w_]+)}}(.-){{/each}}", function(array_name, content)
        local array = data[array_name]
        if type(array) == "table" then
            local parts = {}
            for _, item in ipairs(array) do
                local item_content = string.gsub(content, "{{%.}}", tostring(item))
                table.insert(parts, item_content)
            end
            return table.concat(parts)
        end
        return ""
    end)
    
    return result
end

local template = [[
Hello {{name}}!

{{#if show_items}}
Your items:
{{#each items}}
- {{.}}
{{/each}}
{{/if}}

Thank you for using our service.
]]

local template_data = {
    name = "Alice",
    show_items = true,
    items = {"Apple", "Banana", "Cherry"}
}

print("Rendered template:")
print(render_template(template, template_data))

-- Code formatter/beautifier
local function format_lua_code(code)
    -- Add spaces around operators
    code = string.gsub(code, "([%w%)])([+%-*/%^])([%w%(])", "%1 %2 %3")
    
    -- Add spaces after commas
    code = string.gsub(code, ",([%S])", ", %1")
    
    -- Format function definitions
    code = string.gsub(code, "function%s+([%w_]+)%(", "function %1(")
    
    -- Add spaces around assignment
    code = string.gsub(code, "([%w%)])=([%w%(])", "%1 = %2")
    
    return code
end

local messy_code = "function test(a,b)return a+b*c end"
print("\\nFormatted code:", format_lua_code(messy_code))

-- Text statistics and analysis
local function analyze_text(text)
    local stats = {
        characters = #text,
        words = 0,
        sentences = 0,
        paragraphs = 0,
        word_frequency = {}
    }
    
    -- Count words and build frequency table
    for word in string.gmatch(string.lower(text), "%a+") do
        stats.words = stats.words + 1
        stats.word_frequency[word] = (stats.word_frequency[word] or 0) + 1
    end
    
    -- Count sentences (simplified)
    for _ in string.gmatch(text, "[.!?]+") do
        stats.sentences = stats.sentences + 1
    end
    
    -- Count paragraphs (double newlines)
    stats.paragraphs = 1
    for _ in string.gmatch(text, "\\n\\s*\\n") do
        stats.paragraphs = stats.paragraphs + 1
    end
    
    return stats
end

local sample_text = [[
Lua is a powerful programming language. It is lightweight and embeddable.
Many applications use Lua for scripting and configuration.

Lua's syntax is simple and clean. This makes it easy to learn and use.
The language supports multiple programming paradigms.
]]

local stats = analyze_text(sample_text)
print("\\nText analysis:")
print("Characters:", stats.characters)
print("Words:", stats.words)
print("Sentences:", stats.sentences)
print("Paragraphs:", stats.paragraphs)
print("Most common words:")

-- Sort words by frequency
local word_list = {}
for word, count in pairs(stats.word_frequency) do
    table.insert(word_list, {word = word, count = count})
end
table.sort(word_list, function(a, b) return a.count > b.count end)

for i = 1, math.min(5, #word_list) do
    print(string.format("  %s: %d", word_list[i].word, word_list[i].count))
end`,
            output: "Rendered template:\nHello Alice!\n\nYour items:\n- Apple\n- Banana\n- Cherry\n\nThank you for using our service.\n\nFormatted code: function test(a, b) return a + b * c end\n\nText analysis:\nCharacters: 203\nWords: 32\nSentences: 6\nParagraphs: 2\nMost common words:\n  and: 4\n  lua: 3\n  is: 2\n  it: 2\n  to: 2"
          }
        ],
        exercises: [
          {
            title: "Text Processing Pipeline",
            description: "Build a comprehensive text processing system with multiple transformation stages.",
            instructions: [
              "Create a text sanitizer that removes unwanted characters and normalizes whitespace",
              "Build a simple syntax highlighter for code",
              "Implement a text-to-slug converter for URLs",
              "Create a smart text wrapper that handles different content types"
            ],
            starterCode: `local text_processor = {}

function text_processor.sanitize(text, options)
    options = options or {}
    -- Remove/replace unwanted characters
    -- Normalize whitespace
    -- Handle encoding issues
end

function text_processor.highlight_syntax(code, language)
    -- Simple syntax highlighting
    -- Support for keywords, strings, comments
    -- Return text with markup tags
end

function text_processor.to_slug(text)
    -- Convert text to URL-friendly slug
    -- Handle special characters, spaces, case
end

function text_processor.smart_wrap(text, width, options)
    options = options or {}
    -- Intelligent text wrapping
    -- Handle different content types (code, prose, lists)
    -- Preserve formatting where appropriate
end

function text_processor.extract_metadata(text)
    -- Extract metadata from text
    -- Find titles, dates, emails, URLs, etc.
    -- Return structured data
end

-- Test your text processor
local messy_text = "  This is    MESSY text with\\t\\textra   whitespace!  "
local clean_text = text_processor.sanitize(messy_text)
print("Sanitized:", clean_text)

local title = "How to Learn Lua Programming: A Complete Guide!"
local slug = text_processor.to_slug(title)
print("Slug:", slug)

local code_sample = 'function hello() print("Hello, World!") end'
local highlighted = text_processor.highlight_syntax(code_sample, "lua")
print("Highlighted:", highlighted)`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What does the pattern '%d+' match in Lua?",
          options: [
            "Exactly one digit",
            "One or more digits",
            "Zero or more digits", 
            "Any character except digits"
          ],
          correctAnswer: 1,
          explanation: "The pattern '%d+' matches one or more consecutive digits. %d matches a single digit, and + means one or more repetitions."
        },
        {
          question: "What is the difference between string.find and string.match?",
          options: [
            "There is no difference",
            "string.find returns positions, string.match returns the matched text",
            "string.match is faster",
            "string.find only works with literal strings"
          ],
          correctAnswer: 1,
          explanation: "string.find returns the start and end positions of the match, while string.match returns the actual matched text (or captures)."
        },
        {
          question: "What does the %b() pattern match?",
          options: [
            "The literal text '%b()'",
            "Balanced parentheses",
            "Any text between parentheses",
            "Empty parentheses only"
          ],
          correctAnswer: 1,
          explanation: "The %b() pattern matches balanced parentheses, ensuring that opening and closing parentheses are properly paired."
        }
      ]
    }
  },
  {
    title: "File I/O and System Interaction",
    description: "Master file operations, system commands, and external program interaction in Lua applications.",
    objectives: [
      "Understand file I/O operations and modes",
      "Master reading and writing different file formats",
      "Learn system command execution and environment interaction",
      "Implement robust error handling for I/O operations",
      "Build file processing and data persistence solutions"
    ],
    prerequisites: ["String manipulation and pattern matching"],
    estimatedTime: "3-4 hours",
    difficulty: "Intermediate",
    sections: [
      {
        title: "File Operations Fundamentals",
        content: "Lua provides comprehensive file I/O capabilities through the io library, supporting both simple and advanced file operations.",
        codeExamples: [
          {
            title: "Basic File Reading and Writing",
            explanation: "Essential file operations for reading from and writing to files.",
            code: `-- Writing to a file
local function write_sample_file()
    local file = io.open("sample.txt", "w")
    if file then
        file:write("Hello, Lua File I/O!\\n")
        file:write("This is line 2\\n")
        file:write("Line 3 with numbers: ", 123, "\\n")
        file:close()
        print("File written successfully")
    else
        print("Error: Could not open file for writing")
    end
end

write_sample_file()

-- Reading entire file
local function read_entire_file(filename)
    local file = io.open(filename, "r")
    if file then
        local content = file:read("*a")  -- Read all
        file:close()
        return content
    else
        return nil, "Could not open file: " .. filename
    end
end

local content, err = read_entire_file("sample.txt")
if content then
    print("File contents:")
    print(content)
else
    print("Error:", err)
end

-- Reading line by line
local function read_lines(filename)
    local file = io.open(filename, "r")
    if not file then
        return nil, "Could not open file: " .. filename
    end
    
    local lines = {}
    for line in file:lines() do
        table.insert(lines, line)
    end
    file:close()
    
    return lines
end

local lines, err = read_lines("sample.txt")
if lines then
    print("\\nReading line by line:")
    for i, line in ipairs(lines) do
        print(string.format("Line %d: %s", i, line))
    end
else
    print("Error:", err)
end

-- Appending to file
local function append_to_file(filename, text)
    local file = io.open(filename, "a")
    if file then
        file:write(text)
        file:close()
        return true
    else
        return false, "Could not open file for appending"
    end
end

local success, err = append_to_file("sample.txt", "Appended line\\n")
if success then
    print("\\nText appended successfully")
else
    print("Error:", err)
end

-- Different read modes
local function demonstrate_read_modes(filename)
    local file = io.open(filename, "r")
    if not file then
        print("Could not open file")
        return
    end
    
    print("\\nDifferent read modes:")
    
    -- Read one line
    local line = file:read("*l")
    print("First line:", line)
    
    -- Read a number
    file:seek("set", 0)  -- Reset to beginning
    local num = file:read("*n")
    print("First number found:", num or "none")
    
    -- Read specific number of characters
    file:seek("set", 0)  -- Reset to beginning
    local chars = file:read(5)
    print("First 5 characters:", chars)
    
    file:close()
end

demonstrate_read_modes("sample.txt")`,
            output: "File written successfully\nFile contents:\nHello, Lua File I/O!\nThis is line 2\nLine 3 with numbers: 123\n\nReading line by line:\nLine 1: Hello, Lua File I/O!\nLine 2: This is line 2\nLine 3: Line 3 with numbers: 123\n\nText appended successfully\n\nDifferent read modes:\nFirst line: Hello, Lua File I/O!\nFirst number found: none\nFirst 5 characters: Hello"
          },
          {
            title: "Advanced File Operations",
            explanation: "More sophisticated file operations including binary files, file positioning, and error handling.",
            code: `-- Safe file operations with proper error handling
local function safe_file_operation(filename, mode, operation)
    local file, err = io.open(filename, mode)
    if not file then
        return nil, "Failed to open file: " .. err
    end
    
    local success, result = pcall(operation, file)
    file:close()
    
    if success then
        return result
    else
        return nil, "Operation failed: " .. result
    end
end

-- Copy file function
local function copy_file(source, destination)
    return safe_file_operation(source, "rb", function(src_file)
        return safe_file_operation(destination, "wb", function(dst_file)
            local chunk_size = 4096
            while true do
                local chunk = src_file:read(chunk_size)
                if not chunk then break end
                dst_file:write(chunk)
            end
            return true
        end)
    end)
end

-- Create a test file and copy it
local function create_test_file()
    local content = "This is a test file for copying.\\n"
    content = content .. "It contains multiple lines.\\n"
    content = content .. "Line 3 with special chars: àáâãäå\\n"
    
    local file = io.open("test_source.txt", "w")
    if file then
        file:write(content)
        file:close()
        return true
    end
    return false
end

if create_test_file() then
    local success, err = copy_file("test_source.txt", "test_copy.txt")
    if success then
        print("File copied successfully")
    else
        print("Copy failed:", err)
    end
end

-- File information and manipulation
local function get_file_size(filename)
    return safe_file_operation(filename, "r", function(file)
        local current = file:seek()      -- Get current position
        local size = file:seek("end")    -- Seek to end and get position
        file:seek("set", current)       -- Restore original position
        return size
    end)
end

local size, err = get_file_size("test_source.txt")
if size then
    print("File size:", size, "bytes")
else
    print("Error getting file size:", err)
end

-- Reading file in chunks
local function process_large_file(filename, chunk_size, processor)
    chunk_size = chunk_size or 1024
    
    return safe_file_operation(filename, "r", function(file)
        local chunk_number = 1
        while true do
            local chunk = file:read(chunk_size)
            if not chunk or #chunk == 0 then
                break
            end
            
            processor(chunk, chunk_number)
            chunk_number = chunk_number + 1
        end
        return chunk_number - 1
    end)
end

-- Example: count characters in chunks
local char_count = 0
local chunks_processed, err = process_large_file("test_source.txt", 10, function(chunk, chunk_num)
    char_count = char_count + #chunk
    print(string.format("Chunk %d (%d chars): %q", chunk_num, #chunk, chunk))
end)

if chunks_processed then
    print("Total chunks processed:", chunks_processed)
    print("Total characters:", char_count)
else
    print("Error processing file:", err)
end

-- Temporary file operations
local function with_temp_file(operation)
    local temp_name = os.tmpname()
    local success, result = pcall(operation, temp_name)
    
    -- Clean up
    os.remove(temp_name)
    
    if success then
        return result
    else
        error("Temporary file operation failed: " .. result)
    end
end

-- Example using temporary file
local temp_result = with_temp_file(function(temp_name)
    local file = io.open(temp_name, "w")
    file:write("Temporary data\\n")
    file:close()
    
    -- Read it back
    file = io.open(temp_name, "r")
    local content = file:read("*a")
    file:close()
    
    return content
end)

print("\\nTemporary file content:", temp_result)`,
            output: "File copied successfully\nFile size: 85 bytes\nChunk 1 (10 chars): \"This is a \"\nChunk 2 (10 chars): \"test file \"\nChunk 3 (10 chars): \"for copyin\"\nChunk 4 (10 chars): \"g.\\nIt cont\"\nChunk 5 (10 chars): \"ains multi\"\nChunk 6 (10 chars): \"ple lines.\"\nChunk 7 (10 chars): \"\\nLine 3 wi\"\nChunk 8 (10 chars): \"th special\"\nChunk 9 (5 chars): \" char\"\nTotal chunks processed: 9\nTotal characters: 85\n\nTemporary file content: Temporary data"
          }
        ],
        exercises: [
          {
            title: "File Management Utility",
            description: "Build a comprehensive file management system with various file operations.",
            instructions: [
              "Create functions for file comparison (content-based)",
              "Implement a file backup system with versioning",
              "Build a simple file encryption/decryption utility",
              "Add file search and filtering capabilities"
            ],
            starterCode: `local file_manager = {}

function file_manager.compare_files(file1, file2)
    -- Compare two files byte by byte
    -- Return true if identical, false otherwise
end

function file_manager.backup_file(filename, backup_dir)
    -- Create timestamped backup of file
    -- Handle backup directory creation
end

function file_manager.encrypt_file(filename, key, output_filename)
    -- Simple XOR encryption (for demonstration)
    -- Read file, encrypt content, write to output
end

function file_manager.decrypt_file(filename, key, output_filename)
    -- Decrypt XOR-encrypted file
end

function file_manager.find_files(directory, pattern)
    -- Find files matching pattern in directory
    -- Return list of matching files
end

function file_manager.get_file_info(filename)
    -- Get comprehensive file information
    -- Size, modification time (if available), type
end

-- Test your file manager
local info = file_manager.get_file_info("test_source.txt")
print("File info:", info)

local are_same = file_manager.compare_files("test_source.txt", "test_copy.txt")
print("Files are identical:", are_same)

file_manager.encrypt_file("test_source.txt", "secret", "encrypted.txt")
file_manager.decrypt_file("encrypted.txt", "secret", "decrypted.txt")`
          }
        ]
      },
      {
        title: "Working with Different File Formats",
        content: "Techniques for reading and writing various file formats including CSV, JSON-like data, and configuration files.",
        codeExamples: [
          {
            title: "CSV File Processing",
            explanation: "Reading and writing CSV files with proper handling of quoted fields and special characters.",
            code: `-- CSV Reader/Writer
local csv = {}

function csv.parse_line(line)
    local fields = {}
    local field = ""
    local in_quotes = false
    local i = 1
    
    while i <= #line do
        local char = line:sub(i, i)
        
        if char == '"' then
            if in_quotes and i < #line and line:sub(i + 1, i + 1) == '"' then
                -- Escaped quote
                field = field .. '"'
                i = i + 1
            else
                -- Toggle quote state
                in_quotes = not in_quotes
            end
        elseif char == ',' and not in_quotes then
            -- Field separator
            table.insert(fields, field)
            field = ""
        else
            field = field .. char
        end
        
        i = i + 1
    end
    
    -- Add the last field
    table.insert(fields, field)
    return fields
end

function csv.read_file(filename)
    local file = io.open(filename, "r")
    if not file then
        return nil, "Could not open file: " .. filename
    end
    
    local data = {}
    local headers = nil
    
    for line in file:lines() do
        local fields = csv.parse_line(line)
        if not headers then
            headers = fields
        else
            local record = {}
            for i, field in ipairs(fields) do
                record[headers[i]] = field
            end
            table.insert(data, record)
        end
    end
    
    file:close()
    return data, headers
end

function csv.write_file(filename, data, headers)
    local file = io.open(filename, "w")
    if not file then
        return false, "Could not open file for writing: " .. filename
    end
    
    -- Write headers
    if headers then
        file:write(table.concat(headers, ",") .. "\\n")
    end
    
    -- Write data
    for _, record in ipairs(data) do
        local fields = {}
        for _, header in ipairs(headers or {}) do
            local value = tostring(record[header] or "")
            -- Quote fields that contain commas or quotes
            if value:find('[,"]') then
                value = '"' .. value:gsub('"', '""') .. '"'
            end
            table.insert(fields, value)
        end
        file:write(table.concat(fields, ",") .. "\\n")
    end
    
    file:close()
    return true
end

-- Create sample CSV data
local sample_data = {
    {name = "John Doe", age = "30", city = "New York", notes = "Likes coffee, tea"},
    {name = "Jane Smith", age = "25", city = "Los Angeles", notes = 'Says "Hello" often'},
    {name = "Bob Johnson", age = "35", city = "Chicago", notes = ""}
}

local headers = {"name", "age", "city", "notes"}

-- Write CSV file
local success, err = csv.write_file("people.csv", sample_data, headers)
if success then
    print("CSV file written successfully")
else
    print("Error writing CSV:", err)
end

-- Read CSV file back
local data, read_headers = csv.read_file("people.csv")
if data then
    print("\\nCSV data read:")
    print("Headers:", table.concat(read_headers, ", "))
    for i, record in ipairs(data) do
        print(string.format("Record %d:", i))
        for _, header in ipairs(read_headers) do
            print(string.format("  %s: %s", header, record[header]))
        end
    end
else
    print("Error reading CSV:", read_headers)
end`,
            output: "CSV file written successfully\n\nCSV data read:\nHeaders: name, age, city, notes\nRecord 1:\n  name: John Doe\n  age: 30\n  city: New York\n  notes: Likes coffee, tea\nRecord 2:\n  name: Jane Smith\n  age: 25\n  city: Los Angeles\n  notes: Says \"Hello\" often\nRecord 3:\n  name: Bob Johnson\n  age: 35\n  city: Chicago\n  notes: "
          },
          {
            title: "Configuration File Handling",
            explanation: "Reading and writing configuration files in various formats.",
            code: `-- Configuration file parser
local config = {}

-- Simple key=value configuration format
function config.parse_simple(content)
    local result = {}
    local current_section = nil
    
    for line in content:gmatch("[^\\n]+") do
        -- Remove leading/trailing whitespace
        line = line:match("^%s*(.-)%s*$")
        
        -- Skip empty lines and comments
        if line ~= "" and not line:match("^[#;]") then
            -- Check for section headers [section]
            local section = line:match("^%[(.+)%]$")
            if section then
                current_section = section
                result[section] = result[section] or {}
            else
                -- Parse key=value pairs
                local key, value = line:match("^([^=]+)=(.*)$")
                if key and value then
                    key = key:match("^%s*(.-)%s*$")
                    value = value:match("^%s*(.-)%s*$")
                    
                    -- Remove quotes from value if present
                    value = value:match('^"(.*)"$') or value:match("^'(.*)'$") or value
                    
                    -- Convert to appropriate type
                    if value:lower() == "true" then
                        value = true
                    elseif value:lower() == "false" then
                        value = false
                    elseif value:match("^%-?%d+$") then
                        value = tonumber(value)
                    elseif value:match("^%-?%d*%.%d+$") then
                        value = tonumber(value)
                    end
                    
                    if current_section then
                        result[current_section][key] = value
                    else
                        result[key] = value
                    end
                end
            end
        end
    end
    
    return result
end

function config.write_simple(data, filename)
    local file = io.open(filename, "w")
    if not file then
        return false, "Could not open file for writing"
    end
    
    -- Write global settings first
    for key, value in pairs(data) do
        if type(value) ~= "table" then
            local value_str = tostring(value)
            if type(value) == "string" and value:find("[%s#;]") then
                value_str = '"' .. value .. '"'
            end
            file:write(key .. "=" .. value_str .. "\\n")
        end
    end
    
    -- Write sections
    for section_name, section_data in pairs(data) do
        if type(section_data) == "table" then
            file:write("\\n[" .. section_name .. "]\\n")
            for key, value in pairs(section_data) do
                local value_str = tostring(value)
                if type(value) == "string" and value:find("[%s#;]") then
                    value_str = '"' .. value .. '"'
                end
                file:write(key .. "=" .. value_str .. "\\n")
            end
        end
    end
    
    file:close()
    return true
end

-- Lua table serialization (simple)
function config.serialize_table(t, indent)
    indent = indent or 0
    local indent_str = string.rep("  ", indent)
    local result = {}
    
    table.insert(result, "{")
    
    for key, value in pairs(t) do
        local key_str
        if type(key) == "string" and key:match("^[%a_][%w_]*$") then
            key_str = key
        else
            key_str = "[" .. string.format("%q", key) .. "]"
        end
        
        local value_str
        if type(value) == "table" then
            value_str = config.serialize_table(value, indent + 1)
        elseif type(value) == "string" then
            value_str = string.format("%q", value)
        else
            value_str = tostring(value)
        end
        
        table.insert(result, indent_str .. "  " .. key_str .. " = " .. value_str .. ",")
    end
    
    table.insert(result, indent_str .. "}")
    return table.concat(result, "\\n")
end

-- Test configuration handling
local sample_config = [[
# Global settings
app_name = "My Application"
version = 1.2
debug = true

[database]
host = localhost
port = 5432
name = myapp_db
ssl = false

[ui]
theme = dark
font_size = 12
window_title = "My App Window"
]]

print("Parsing configuration:")
local parsed = config.parse_simple(sample_config)

-- Display parsed configuration
local function print_config(cfg, prefix)
    prefix = prefix or ""
    for key, value in pairs(cfg) do
        if type(value) == "table" then
            print(prefix .. "[" .. key .. "]")
            print_config(value, prefix .. "  ")
        else
            print(prefix .. key .. " = " .. tostring(value) .. " (" .. type(value) .. ")")
        end
    end
end

print_config(parsed)

-- Write configuration back to file
local success, err = config.write_simple(parsed, "config_output.ini")
if success then
    print("\\nConfiguration written to config_output.ini")
else
    print("Error writing config:", err)
end

-- Demonstrate Lua table serialization
local lua_config = {
    app = {
        name = "Test App",
        version = {major = 1, minor = 2, patch = 3},
        features = {"auth", "logging", "caching"}
    },
    database = {
        host = "localhost",
        port = 5432
    }
}

print("\\nLua table serialization:")
print("return " .. config.serialize_table(lua_config))`,
            output: "Parsing configuration:\napp_name = My Application (string)\nversion = 1.2 (number)\ndebug = true (boolean)\n[database]\n  host = localhost (string)\n  port = 5432 (number)\n  name = myapp_db (string)\n  ssl = false (boolean)\n[ui]\n  theme = dark (string)\n  font_size = 12 (number)\n  window_title = My App Window (string)\n\nConfiguration written to config_output.ini\n\nLua table serialization:\nreturn {\n  app = {\n    name = \"Test App\",\n    version = {\n      major = 1,\n      minor = 2,\n      patch = 3,\n    },\n    features = {\n      [1] = \"auth\",\n      [2] = \"logging\",\n      [3] = \"caching\",\n    },\n  },\n  database = {\n    host = \"localhost\",\n    port = 5432,\n  },\n}"
          }
        ],
        exercises: [
          {
            title: "Data Format Converter",
            description: "Build a utility that can convert between different data formats.",
            instructions: [
              "Create converters between CSV, JSON-like, and Lua table formats",
              "Add support for XML-like simple format",
              "Implement data validation and schema checking",
              "Add import/export functionality with error reporting"
            ],
            starterCode: `local converter = {}

function converter.csv_to_table(csv_filename)
    -- Convert CSV file to Lua table structure
end

function converter.table_to_csv(data, csv_filename)
    -- Convert Lua table to CSV file
end

function converter.table_to_lua_file(data, lua_filename)
    -- Write Lua table as executable Lua file
end

function converter.load_lua_data(lua_filename)
    -- Safely load data from Lua file
end

function converter.validate_schema(data, schema)
    -- Validate data against a simple schema
    -- Schema format: {field_name = {type = "string", required = true}}
end

function converter.xml_simple_parse(xml_content)
    -- Parse simple XML-like format
    -- Handle basic tags and attributes
end

-- Test your converter
local test_data = {
    {name = "Alice", age = 25, department = "Engineering"},
    {name = "Bob", age = 30, department = "Sales"},
    {name = "Carol", age = 28, department = "Marketing"}
}

converter.table_to_csv(test_data, "employees.csv")
converter.table_to_lua_file(test_data, "employees.lua")

local loaded_data = converter.load_lua_data("employees.lua")
print("Data round-trip successful:", #loaded_data == #test_data)`
          }
        ]
      },
      {
        title: "System Interaction and Environment",
        content: "Interacting with the operating system, executing commands, and working with environment variables.",
        codeExamples: [
          {
            title: "System Commands and Environment",
            explanation: "Executing system commands and accessing environment variables.",
            code: `-- Environment variables
print("Environment variables:")
print("PATH:", os.getenv("PATH"))
print("HOME:", os.getenv("HOME") or os.getenv("USERPROFILE"))  -- Unix/Windows
print("USER:", os.getenv("USER") or os.getenv("USERNAME"))     -- Unix/Windows

-- Custom environment variable (if set)
print("CUSTOM_VAR:", os.getenv("CUSTOM_VAR") or "Not set")

-- System information
print("\\nSystem information:")
print("OS Date:", os.date())
print("OS Date (UTC):", os.date("!%Y-%m-%d %H:%M:%S"))
print("Timestamp:", os.time())

-- Formatted date examples
local now = os.time()
print("Formatted dates:")
print("ISO format:", os.date("%Y-%m-%d %H:%M:%S", now))
print("US format:", os.date("%m/%d/%Y %I:%M %p", now))
print("Day of week:", os.date("%A, %B %d, %Y", now))

-- Time calculations
local start_time = os.time()
-- Simulate some work
local sum = 0
for i = 1, 1000000 do
    sum = sum + i
end
local end_time = os.time()
print("\\nTime calculation:")
print("Start:", os.date("%H:%M:%S", start_time))
print("End:", os.date("%H:%M:%S", end_time))
print("Duration:", os.difftime(end_time, start_time), "seconds")

-- System command execution
print("\\nExecuting system commands:")

-- Cross-platform directory listing
local function list_directory(path)
    path = path or "."
    local command
    
    -- Detect OS and use appropriate command
    if os.getenv("OS") and os.getenv("OS"):find("Windows") then
        command = "dir " .. path
    else
        command = "ls -la " .. path
    end
    
    print("Executing:", command)
    local result = os.execute(command)
    return result
end

-- Note: This will show directory contents
-- list_directory(".")

-- File operations using system commands
local function create_directory(dirname)
    local command
    if os.getenv("OS") and os.getenv("OS"):find("Windows") then
        command = "mkdir " .. dirname
    else
        command = "mkdir -p " .. dirname
    end
    
    local result = os.execute(command)
    return result == 0 or result == true  -- Different Lua versions return different values
end

-- Create a test directory
local test_dir = "test_directory"
if create_directory(test_dir) then
    print("Directory created:", test_dir)
    
    -- Clean up
    os.remove(test_dir)  -- This only works for empty directories
    print("Directory removed:", test_dir)
else
    print("Failed to create directory:", test_dir)
end

-- Working with temporary files
print("\\nTemporary file operations:")
local temp_name = os.tmpname()
print("Temporary file name:", temp_name)

-- Write to temporary file
local temp_file = io.open(temp_name, "w")
if temp_file then
    temp_file:write("This is temporary data\\n")
    temp_file:write("Created at: " .. os.date() .. "\\n")
    temp_file:close()
    
    -- Read it back
    temp_file = io.open(temp_name, "r")
    if temp_file then
        print("Temporary file contents:")
        print(temp_file:read("*a"))
        temp_file:close()
    end
    
    -- Clean up
    os.remove(temp_name)
    print("Temporary file removed")
end`,
            output: "Environment variables:\nPATH: /usr/local/bin:/usr/bin:/bin\nHOME: /home/user\nUSER: user\nCUSTOM_VAR: Not set\n\nSystem information:\nOS Date: Mon Dec 25 14:30:15 2023\nOS Date (UTC): 2023-12-25 19:30:15\nTimestamp: 1703534215\nFormatted dates:\nISO format: 2023-12-25 14:30:15\nUS format: 12/25/2023 02:30 PM\nDay of week: Monday, December 25, 2023\n\nTime calculation:\nStart: 14:30:15\nEnd: 14:30:15\nDuration: 0 seconds\n\nExecuting system commands:\nDirectory created: test_directory\nDirectory removed: test_directory\n\nTemporary file operations:\nTemporary file name: /tmp/lua_abc123\nTemporary file contents:\nThis is temporary data\nCreated at: Mon Dec 25 14:30:15 2023\n\nTemporary file removed"
          },
          {
            title: "Advanced System Interaction",
            explanation: "More sophisticated system interaction including process management and cross-platform compatibility.",
            code: `-- Cross-platform utilities
local system_utils = {}

function system_utils.get_os()
    if os.getenv("OS") and os.getenv("OS"):find("Windows") then
        return "windows"
    elseif os.getenv("HOME") then
        return "unix"
    else
        return "unknown"
    end
end

function system_utils.get_path_separator()
    return system_utils.get_os() == "windows" and "\\\\" or "/"
end

function system_utils.join_path(...)
    local parts = {...}
    local sep = system_utils.get_path_separator()
    return table.concat(parts, sep)
end

function system_utils.file_exists(filename)
    local file = io.open(filename, "r")
    if file then
        file:close()
        return true
    end
    return false
end

function system_utils.execute_with_output(command)
    -- This is a simplified version - real implementation would use popen
    print("Would execute:", command)
    local success = os.execute(command)
    return success == 0 or success == true
end

-- Demonstrate cross-platform utilities
print("System utilities:")
print("OS:", system_utils.get_os())
print("Path separator:", system_utils.get_path_separator())
print("Joined path:", system_utils.join_path("home", "user", "documents", "file.txt"))

-- File system operations
local function safe_file_operations()
    local test_file = "system_test.txt"
    
    -- Create test file
    local file = io.open(test_file, "w")
    if file then
        file:write("Test file for system operations\\n")
        file:close()
        
        print("\\nFile operations:")
        print("File exists:", system_utils.file_exists(test_file))
        
        -- Get file information (simplified)
        local file_info = io.open(test_file, "r")
        if file_info then
            local content = file_info:read("*a")
            file_info:close()
            print("File size:", #content, "bytes")
        end
        
        -- Rename file
        local new_name = "renamed_test.txt"
        local success = os.rename(test_file, new_name)
        if success then
            print("File renamed to:", new_name)
            print("Original exists:", system_utils.file_exists(test_file))
            print("Renamed exists:", system_utils.file_exists(new_name))
            
            -- Clean up
            os.remove(new_name)
            print("Cleaned up test files")
        else
            print("Failed to rename file")
            os.remove(test_file)
        end
    end
end

safe_file_operations()

-- Process and timing utilities
local function benchmark_function(func, iterations)
    iterations = iterations or 1
    
    local start_time = os.clock()  -- CPU time
    local start_real = os.time()   -- Real time
    
    for i = 1, iterations do
        func()
    end
    
    local end_time = os.clock()
    local end_real = os.time()
    
    return {
        cpu_time = end_time - start_time,
        real_time = os.difftime(end_real, start_real),
        iterations = iterations
    }
end

-- Test function to benchmark
local function test_function()
    local sum = 0
    for i = 1, 100000 do
        sum = sum + math.sqrt(i)
    end
    return sum
end

print("\\nBenchmarking:")
local results = benchmark_function(test_function, 5)
print(string.format("CPU time: %.4f seconds", results.cpu_time))
print(string.format("Real time: %.0f seconds", results.real_time))
print(string.format("Iterations: %d", results.iterations))
print(string.format("Average CPU time per iteration: %.4f seconds", 
    results.cpu_time / results.iterations))

-- Environment manipulation (demonstration)
local function demonstrate_environment()
    print("\\nEnvironment demonstration:")
    
    -- Note: Lua cannot set environment variables that persist
    -- This would only affect the current Lua process
    local original_path = os.getenv("PATH")
    print("Original PATH length:", original_path and #original_path or 0)
    
    -- Simulate environment-aware operations
    local config_locations = {
        system_utils.join_path(os.getenv("HOME") or ".", ".config", "myapp"),
        system_utils.join_path(".", "config"),
        system_utils.join_path("..", "config")
    }
    
    print("Config search locations:")
    for i, location in ipairs(config_locations) do
        print(string.format("  %d. %s", i, location))
    end
end

demonstrate_environment()`,
            output: "System utilities:\nOS: unix\nPath separator: /\nJoined path: home/user/documents/file.txt\n\nFile operations:\nFile exists: true\nFile size: 35 bytes\nFile renamed to: renamed_test.txt\nOriginal exists: false\nRenamed exists: true\nCleaned up test files\n\nBenchmarking:\nCPU time: 0.0234 seconds\nReal time: 0 seconds\nIterations: 5\nAverage CPU time per iteration: 0.0047 seconds\n\nEnvironment demonstration:\nOriginal PATH length: 45\nConfig search locations:\n  1. /home/user/.config/myapp\n  2. ./config\n  3. ../config"
          }
        ],
        exercises: [
          {
            title: "System Administration Toolkit",
            description: "Build a comprehensive system administration toolkit using Lua.",
            instructions: [
              "Create a log file analyzer that processes system logs",
              "Build a backup utility that can backup files with compression simulation",
              "Implement a system monitor that tracks file changes",
              "Add a configuration deployment system"
            ],
            starterCode: `local sysadmin = {}

function sysadmin.analyze_logs(log_directory, pattern)
    -- Analyze log files for patterns
    -- Return statistics and matching entries
end

function sysadmin.backup_files(source_list, backup_location)
    -- Create backups of specified files/directories
    -- Include timestamp and verification
end

function sysadmin.monitor_files(file_list, check_interval)
    -- Monitor files for changes
    -- Return change detection system
end

function sysadmin.deploy_config(config_template, target_locations, variables)
    -- Deploy configuration files with variable substitution
    -- Handle multiple target locations
end

function sysadmin.system_report()
    -- Generate system report with:
    -- - Disk usage simulation
    -- - Process information (limited)
    -- - Environment summary
end

-- Test your system administration toolkit
local log_stats = sysadmin.analyze_logs(".", "error")
print("Log analysis:", log_stats)

local backup_result = sysadmin.backup_files({"config.txt", "data.txt"}, "backup/")
print("Backup result:", backup_result)

local report = sysadmin.system_report()
print("System report:", report)`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is the difference between 'r', 'w', and 'a' file modes?",
          options: [
            "'r' reads, 'w' writes, 'a' appends - all create files if they don't exist",
            "'r' reads existing files, 'w' creates/overwrites files, 'a' appends to files",
            "'r' is read-only, 'w' is write-only, 'a' is append-only",
            "There is no difference in Lua"
          ],
          correctAnswer: 1,
          explanation: "'r' opens existing files for reading, 'w' creates new files or overwrites existing ones, 'a' opens files for appending (creates if doesn't exist)."
        },
        {
          question: "What does file:read('*a') do?",
          options: [
            "Reads one character",
            "Reads all remaining content from the file",
            "Reads the first line",
            "Reads all lines into a table"
          ],
          correctAnswer: 1,
          explanation: "The '*a' format reads all remaining content from the current file position to the end of the file."
        },
        {
          question: "What is the purpose of os.tmpname()?",
          options: [
            "To get the current user's name",
            "To generate a temporary filename",
            "To create a temporary directory",
            "To get the system's temporary directory path"
          ],
          correctAnswer: 1,
          explanation: "os.tmpname() generates a unique temporary filename that can be used for creating temporary files."
        }
      ]
    }
  },
  {
    title: "Error Handling and Debugging",
    description: "Master robust error handling techniques, debugging strategies, and building resilient Lua applications.",
    objectives: [
      "Understand Lua's error model and propagation",
      "Master pcall and xpcall for protected execution",
      "Learn debugging techniques and tools",
      "Implement comprehensive error handling strategies",
      "Build robust applications with graceful error recovery"
    ],
    prerequisites: ["File I/O and system interaction"],
    estimatedTime: "3-4 hours",
    difficulty: "Intermediate",
    sections: [
      {
        title: "Error Handling Fundamentals",
        content: "Lua's error handling is based on exceptions that can be caught and handled using protected calls. Understanding when and how to handle errors is crucial for building robust applications.",
        codeExamples: [
          {
            title: "Basic Error Handling with pcall",
            explanation: "Using pcall to catch and handle errors gracefully.",
            code: `-- Function that might cause errors
local function risky_operation(operation, a, b)
    if operation == "divide" then
        if b == 0 then
            error("Division by zero is not allowed")
        end
        return a / b
    elseif operation == "sqrt" then
        if a < 0 then
            error("Cannot take square root of negative number")
        end
        return math.sqrt(a)
    elseif operation == "access" then
        local data = {x = 10, y = 20}
        if not data[a] then
            error("Key '" .. tostring(a) .. "' not found in data")
        end
        return data[a]
    else
        error("Unknown operation: " .. tostring(operation))
    end
end

-- Safe wrapper using pcall
local function safe_operation(operation, a, b)
    local success, result = pcall(risky_operation, operation, a, b)
    
    if success then
        return result, nil  -- result, no error
    else
        return nil, result  -- no result, error message
    end
end

-- Test various operations
local test_cases = {
    {"divide", 10, 2},
    {"divide", 10, 0},  -- Will cause error
    {"sqrt", 16},
    {"sqrt", -4},       -- Will cause error
    {"access", "x"},
    {"access", "z"},    -- Will cause error
    {"unknown", 1, 2}   -- Will cause error
}

print("Testing error handling:")
for i, case in ipairs(test_cases) do
    local operation, a, b = case[1], case[2], case[3]
    local result, err = safe_operation(operation, a, b)
    
    if result then
        print(string.format("Test %d: %s(%s, %s) = %s", 
            i, operation, tostring(a), tostring(b or ""), tostring(result)))
    else
        print(string.format("Test %d: %s(%s, %s) failed: %s", 
            i, operation, tostring(a), tostring(b or ""), err))
    end
end

-- Nested error handling
local function process_data(data)
    local results = {}
    local errors = {}
    
    for i, item in ipairs(data) do
        local success, result = pcall(function()
            if type(item) ~= "number" then
                error("Item must be a number, got " .. type(item))
            end
            if item < 0 then
                error("Item must be non-negative")
            end
            return math.sqrt(item) * 2
        end)
        
        if success then
            results[i] = result
        else
            errors[i] = result  -- result contains error message when success is false
        end
    end
    
    return results, errors
end

local test_data = {4, 9, -1, "invalid", 16, 0}
local results, errors = process_data(test_data)

print("\\nProcessing data with error collection:")
for i, item in ipairs(test_data) do
    if results[i] then
        print(string.format("Item %d (%s): %s", i, tostring(item), results[i]))
    else
        print(string.format("Item %d (%s): ERROR - %s", i, tostring(item), errors[i]))
    end
end`,
            output: "Testing error handling:\nTest 1: divide(10, 2) = 5\nTest 2: divide(10, 0) failed: Division by zero is not allowed\nTest 3: sqrt(16) = 4\nTest 4: sqrt(-4) failed: Cannot take square root of negative number\nTest 5: access(x) = 10\nTest 6: access(z) failed: Key 'z' not found in data\nTest 7: unknown(1, 2) failed: Unknown operation: unknown\n\nProcessing data with error collection:\nItem 1 (4): 4\nItem 2 (9): 6\nItem 3 (-1): ERROR - Item must be non-negative\nItem 4 (invalid): ERROR - Item must be a number, got string\nItem 5 (16): 8\nItem 6 (0): 0"
          },
          {
            title: "Advanced Error Handling with xpcall",
            explanation: "Using xpcall for custom error handling and stack traces.",
            code: `-- Custom error handler that provides detailed information
local function error_handler(err)
    local trace = debug.traceback("Error occurred: " .. tostring(err), 2)
    
    -- Extract useful information
    local error_info = {
        message = tostring(err),
        timestamp = os.date("%Y-%m-%d %H:%M:%S"),
        traceback = trace
    }
    
    return error_info
end

-- Function with nested calls to demonstrate stack trace
local function level3_function(x)
    if x < 0 then
        error("Negative value not allowed in level3_function")
    end
    return math.sqrt(x)
end

local function level2_function(x, y)
    local result1 = level3_function(x)
    local result2 = level3_function(y)
    return result1 + result2
end

local function level1_function(a, b, c)
    local sum = level2_function(a, b)
    local final = level3_function(c)
    return sum + final
end

-- Test with xpcall
local function test_with_xpcall(a, b, c)
    local success, result = xpcall(level1_function, error_handler, a, b, c)
    
    if success then
        print("Success:", result)
    else
        print("Error details:")
        print("  Message:", result.message)
        print("  Time:", result.timestamp)
        print("  Stack trace:")
        -- Print each line of the traceback with indentation
        for line in result.traceback:gmatch("[^\\n]+") do
            print("    " .. line)
        end
    end
    
    return success, result
end

print("Testing xpcall with stack traces:")
print("\\nTest 1 - Valid input:")
test_with_xpcall(4, 9, 16)

print("\\nTest 2 - Invalid input (negative number):")
test_with_xpcall(4, -9, 16)

-- Error recovery and retry mechanism
local function retry_operation(operation, max_retries, ...)
    local args = {...}
    local retries = 0
    
    while retries < max_retries do
        local success, result = xpcall(operation, error_handler, table.unpack(args))
        
        if success then
            if retries > 0 then
                print(string.format("Operation succeeded after %d retries", retries))
            end
            return result
        else
            retries = retries + 1
            print(string.format("Attempt %d failed: %s", retries, result.message))
            
            if retries < max_retries then
                print(string.format("Retrying... (%d/%d)", retries + 1, max_retries))
                -- In a real scenario, you might add a delay here
            end
        end
    end
    
    error("Operation failed after " .. max_retries .. " attempts")
end

-- Simulate an operation that might fail randomly
local function unreliable_operation(data)
    -- Simulate random failure (in real code, this might be network issues, etc.)
    if math.random() < 0.7 then  -- 70% chance of failure
        error("Simulated random failure")
    end
    return "Operation completed successfully with data: " .. tostring(data)
end

-- Test retry mechanism
print("\\nTesting retry mechanism:")
math.randomseed(os.time())

local success, result = pcall(retry_operation, unreliable_operation, 3, "test_data")
if success then
    print("Final result:", result)
else
    print("Final failure:", result)
end

-- Error categorization and handling
local ErrorTypes = {
    VALIDATION = "validation",
    NETWORK = "network", 
    FILE_IO = "file_io",
    CALCULATION = "calculation",
    UNKNOWN = "unknown"
}

local function categorized_error(error_type, message, details)
    local err = {
        type = error_type,
        message = message,
        details = details or {},
        timestamp = os.time()
    }
    error(err)
end

local function handle_categorized_error(err)
    if type(err) == "table" and err.type then
        local handlers = {
            [ErrorTypes.VALIDATION] = function(e)
                return "Validation Error: " .. e.message .. " (Please check your input)"
            end,
            [ErrorTypes.NETWORK] = function(e)
                return "Network Error: " .. e.message .. " (Please check your connection)"
            end,
            [ErrorTypes.FILE_IO] = function(e)
                return "File Error: " .. e.message .. " (Please check file permissions)"
            end,
            [ErrorTypes.CALCULATION] = function(e)
                return "Calculation Error: " .. e.message .. " (Please verify your data)"
            end
        }
        
        local handler = handlers[err.type]
        if handler then
            return handler(err)
        end
    end
    
    return "Unknown Error: " .. tostring(err)
end

-- Test categorized errors
local function test_categorized_errors()
    local test_functions = {
        function() categorized_error(ErrorTypes.VALIDATION, "Invalid email format") end,
        function() categorized_error(ErrorTypes.NETWORK, "Connection timeout") end,
        function() categorized_error(ErrorTypes.FILE_IO, "Permission denied") end,
        function() error("Regular string error") end
    }
    
    print("\\nTesting categorized error handling:")
    for i, test_func in ipairs(test_functions) do
        local success, err = pcall(test_func)
        if not success then
            local user_message = handle_categorized_error(err)
            print(string.format("Test %d: %s", i, user_message))
        end
    end
end

test_categorized_errors()`,
            output: "Testing xpcall with stack traces:\n\nTest 1 - Valid input:\nSuccess: 9\n\nTest 2 - Invalid input (negative number):\nError details:\n  Message: Negative value not allowed in level3_function\n  Time: 2023-12-25 14:30:15\n  Stack trace:\n    Error occurred: Negative value not allowed in level3_function\n    stack traceback:\n    [C]: in function 'error'\n    in function 'level3_function'\n    in function 'level2_function'\n    in function 'level1_function'\n\nTesting retry mechanism:\nAttempt 1 failed: Simulated random failure\nRetrying... (2/3)\nAttempt 2 failed: Simulated random failure\nRetrying... (3/3)\nOperation succeeded after 2 retries\nFinal result: Operation completed successfully with data: test_data\n\nTesting categorized error handling:\nTest 1: Validation Error: Invalid email format (Please check your input)\nTest 2: Network Error: Connection timeout (Please check your connection)\nTest 3: File Error: Permission denied (Please check file permissions)\nTest 4: Unknown Error: Regular string error"
          }
        ],
        exercises: [
          {
            title: "Robust Error Handling Framework",
            description: "Build a comprehensive error handling framework for Lua applications.",
            instructions: [
              "Create an error logging system with different severity levels",
              "Implement error recovery strategies for different error types",
              "Build a circuit breaker pattern for failing operations",
              "Add error reporting and notification capabilities"
            ],
            starterCode: `local error_framework = {}

-- Error severity levels
error_framework.SEVERITY = {
    DEBUG = 1,
    INFO = 2,
    WARNING = 3,
    ERROR = 4,
    CRITICAL = 5
}

function error_framework.create_logger(config)
    -- Create a logger with configurable output and formatting
    -- Support file logging, console output, etc.
end

function error_framework.create_circuit_breaker(failure_threshold, timeout)
    -- Implement circuit breaker pattern
    -- Track failures and open circuit when threshold is reached
end

function error_framework.create_error_handler(strategies)
    -- Create configurable error handler with different strategies
    -- Support retry, fallback, circuit breaking, etc.
end

function error_framework.wrap_function(func, error_config)
    -- Wrap a function with comprehensive error handling
    -- Include logging, retries, circuit breaking, etc.
end

-- Test your error handling framework
local logger = error_framework.create_logger({
    level = error_framework.SEVERITY.INFO,
    output = "console"
})

local circuit_breaker = error_framework.create_circuit_breaker(3, 60)

local safe_function = error_framework.wrap_function(
    function(x) 
        if x < 0 then error("Negative input") end
        return x * 2 
    end,
    {
        logger = logger,
        circuit_breaker = circuit_breaker,
        max_retries = 2
    }
)

print("Testing framework:", safe_function(5))
print("Testing with error:", safe_function(-1))`
          }
        ]
      },
      {
        title: "Debugging Techniques and Tools",
        content: "Effective debugging strategies using Lua's debug library and other techniques for identifying and fixing issues.",
        codeExamples: [
          {
            title: "Debug Library Fundamentals",
            explanation: "Using the debug library for introspection and debugging.",
            code: `-- Function to demonstrate debugging capabilities
local function problematic_function(a, b, c)
    local x = a + b
    local y = b * c
    local z = x / y  -- Potential division by zero
    return z
end

local function calling_function(data)
    local result = 0
    for i, item in ipairs(data) do
        result = result + problematic_function(item.a, item.b, item.c)
    end
    return result
end

-- Debug information extractor
local function get_debug_info(level)
    level = level or 2  -- Skip this function itself
    local info = debug.getinfo(level, "nSl")
    
    if info then
        return {
            name = info.name or "<anonymous>",
            source = info.source,
            line = info.currentline,
            what = info.what,
            short_src = info.short_src
        }
    end
    return nil
end

-- Enhanced error handler with debug information
local function debug_error_handler(err)
    local error_info = {
        message = tostring(err),
        timestamp = os.date("%Y-%m-%d %H:%M:%S"),
        stack = {}
    }
    
    -- Collect stack information
    local level = 2
    while true do
        local info = debug.getinfo(level, "nSl")
        if not info then break end
        
        table.insert(error_info.stack, {
            function_name = info.name or "<anonymous>",
            source = info.short_src or "unknown",
            line = info.currentline or 0,
            what = info.what
        })
        
        level = level + 1
    end
    
    return error_info
end

-- Function to print debug information
local function print_debug_info(error_info)
    print("=== DEBUG INFORMATION ===")
    print("Error:", error_info.message)
    print("Time:", error_info.timestamp)
    print("\\nStack trace:")
    
    for i, frame in ipairs(error_info.stack) do
        print(string.format("  %d. %s() in %s:%d [%s]", 
            i, frame.function_name, frame.source, frame.line, frame.what))
    end
    print("========================")
end

-- Test debugging with problematic data
local test_data = {
    {a = 10, b = 5, c = 2},   -- Valid
    {a = 8, b = 0, c = 3},    -- Will cause division by zero
    {a = 6, b = 3, c = 1}     -- Valid
}

print("Testing with debug information:")
local success, result = xpcall(calling_function, debug_error_handler, test_data)

if success then
    print("Result:", result)
else
    print_debug_info(result)
end

-- Variable inspection at runtime
local function inspect_variables(level)
    level = level or 2
    local variables = {}
    
    -- Get local variables
    local i = 1
    while true do
        local name, value = debug.getlocal(level, i)
        if not name then break end
        
        -- Skip internal variables (those starting with '(')
        if not name:match("^%(") then
            variables[name] = {
                value = value,
                type = type(value),
                scope = "local"
            }
        end
        i = i + 1
    end
    
    -- Get upvalues (if function is available)
    local func_info = debug.getinfo(level, "f")
    if func_info and func_info.func then
        local j = 1
        while true do
            local name, value = debug.getupvalue(func_info.func, j)
            if not name then break end
            
            variables[name] = {
                value = value,
                type = type(value),
                scope = "upvalue"
            }
            j = j + 1
        end
    end
    
    return variables
end

-- Function that uses variable inspection
local function debug_aware_function(x, y)
    local intermediate = x * 2
    local result = intermediate + y
    
    -- Inspect variables at this point
    print("\\nVariable inspection:")
    local vars = inspect_variables()
    for name, info in pairs(vars) do
        print(string.format("  %s (%s, %s): %s", 
            name, info.scope, info.type, tostring(info.value)))
    end
    
    return result
end

debug_aware_function(5, 10)

-- Conditional debugging
local DEBUG_MODE = true

local function debug_print(...)
    if DEBUG_MODE then
        local info = get_debug_info()
        local prefix = string.format("[DEBUG %s:%d]", 
            info and info.short_src or "unknown", 
            info and info.line or 0)
        print(prefix, ...)
    end
end

local function traced_function(n)
    debug_print("Entering traced_function with n =", n)
    
    if n <= 0 then
        debug_print("Base case reached")
        return 1
    end
    
    debug_print("Recursive call with n =", n - 1)
    local result = n * traced_function(n - 1)
    
    debug_print("Returning", result, "for n =", n)
    return result
end

print("\\nTraced factorial calculation:")
local factorial_result = traced_function(4)
print("Final result:", factorial_result)`,
            output: "Testing with debug information:\n=== DEBUG INFORMATION ===\nError: attempt to divide by zero\nTime: 2023-12-25 14:30:15\n\nStack trace:\n  1. problematic_function() in [string \"...\"]:3 [Lua]\n  2. calling_function() in [string \"...\"]:9 [Lua]\n  3. <anonymous>() in [string \"...\"]:0 [main]\n========================\n\nVariable inspection:\n  x (local, number): 10\n  y (local, number): 20\n  intermediate (local, number): 10\n  result (local, number): 30\n\nTraced factorial calculation:\n[DEBUG [string \"...\"]:95] Entering traced_function with n = 4\n[DEBUG [string \"...\"]:101] Recursive call with n = 3\n[DEBUG [string \"...\"]:95] Entering traced_function with n = 3\n[DEBUG [string \"...\"]:101] Recursive call with n = 2\n[DEBUG [string \"...\"]:95] Entering traced_function with n = 2\n[DEBUG [string \"...\"]:101] Recursive call with n = 1\n[DEBUG [string \"...\"]:95] Entering traced_function with n = 1\n[DEBUG [string \"...\"]:101] Recursive call with n = 0\n[DEBUG [string \"...\"]:95] Entering traced_function with n = 0\n[DEBUG [string \"...\"]:98] Base case reached\n[DEBUG [string \"...\"]:104] Returning 1 for n = 0\n[DEBUG [string \"...\"]:104] Returning 1 for n = 1\n[DEBUG [string \"...\"]:104] Returning 2 for n = 2\n[DEBUG [string \"...\"]:104] Returning 6 for n = 3\n[DEBUG [string \"...\"]:104] Returning 24 for n = 4\nFinal result: 24"
          },
          {
            title: "Advanced Debugging and Profiling",
            explanation: "Sophisticated debugging techniques including profiling, memory tracking, and performance analysis.",
            code: `-- Performance profiler using debug hooks
local profiler = {}

function profiler.new()
    local prof = {
        call_count = {},
        call_time = {},
        call_stack = {},
        start_time = {},
        enabled = false
    }
    
    function prof:start()
        self.enabled = true
        debug.sethook(function(event)
            if not self.enabled then return end
            
            local info = debug.getinfo(2, "nS")
            if not info then return end
            
            local func_name = info.name or (info.source .. ":" .. (info.linedefined or 0))
            
            if event == "call" then
                self.call_count[func_name] = (self.call_count[func_name] or 0) + 1
                table.insert(self.call_stack, func_name)
                self.start_time[func_name] = os.clock()
            elseif event == "return" then
                if #self.call_stack > 0 then
                    local current_func = table.remove(self.call_stack)
                    if self.start_time[current_func] then
                        local elapsed = os.clock() - self.start_time[current_func]
                        self.call_time[current_func] = (self.call_time[current_func] or 0) + elapsed
                    end
                end
            end
        end, "cr")
    end
    
    function prof:stop()
        self.enabled = false
        debug.sethook()
    end
    
    function prof:report()
        print("=== PROFILER REPORT ===")
        print("Function Call Counts:")
        
        -- Sort by call count
        local sorted_calls = {}
        for func, count in pairs(self.call_count) do
            table.insert(sorted_calls, {func = func, count = count, time = self.call_time[func] or 0})
        end
        table.sort(sorted_calls, function(a, b) return a.count > b.count end)
        
        for _, entry in ipairs(sorted_calls) do
            print(string.format("  %-30s: %5d calls, %8.4f seconds", 
                entry.func, entry.count, entry.time))
        end
        print("=====================")
    end
    
    return prof
end

-- Test functions for profiling
local function fibonacci(n)
    if n <= 1 then
        return n
    end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

local function factorial(n)
    if n <= 1 then
        return 1
    end
    return n * factorial(n - 1)
end

local function test_math_functions()
    local results = {}
    for i = 1, 10 do
        results[i] = {
            fib = fibonacci(i),
            fact = factorial(i)
        }
    end
    return results
end

-- Profile the test functions
print("Running profiler test:")
local prof = profiler.new()
prof:start()

local results = test_math_functions()

prof:stop()
prof:report()

-- Memory usage tracker (simplified)
local memory_tracker = {}

function memory_tracker.new()
    local tracker = {
        snapshots = {},
        enabled = false
    }
    
    function tracker:snapshot(label)
        if not self.enabled then return end
        
        local memory_kb = collectgarbage("count")
        table.insert(self.snapshots, {
            label = label or "unnamed",
            memory = memory_kb,
            timestamp = os.clock()
        })
    end
    
    function tracker:start()
        self.enabled = true
        self:snapshot("start")
    end
    
    function tracker:stop()
        self:snapshot("stop")
        self.enabled = false
    end
    
    function tracker:report()
        print("\\n=== MEMORY TRACKER REPORT ===")
        local baseline = self.snapshots[1] and self.snapshots[1].memory or 0
        
        for i, snapshot in ipairs(self.snapshots) do
            local diff = snapshot.memory - baseline
            print(string.format("  %-15s: %8.2f KB (%+8.2f KB)", 
                snapshot.label, snapshot.memory, diff))
        end
        print("============================")
    end
    
    return tracker
end

-- Test memory tracking
print("\\nRunning memory tracker test:")
local mem_tracker = memory_tracker.new()
mem_tracker:start()

-- Create some data structures
local large_table = {}
mem_tracker:snapshot("before_table")

for i = 1, 10000 do
    large_table[i] = {
        id = i,
        name = "Item " .. i,
        data = string.rep("x", 100)
    }
end
mem_tracker:snapshot("after_table")

-- Force garbage collection
collectgarbage("collect")
mem_tracker:snapshot("after_gc")

-- Clear the table
large_table = nil
collectgarbage("collect")
mem_tracker:snapshot("after_clear")

mem_tracker:stop()
mem_tracker:report()

-- Assertion framework for debugging
local assert_framework = {}

function assert_framework.assert_type(value, expected_type, message)
    if type(value) ~= expected_type then
        local err_msg = message or string.format("Expected %s, got %s", expected_type, type(value))
        error(err_msg, 2)
    end
end

function assert_framework.assert_range(value, min_val, max_val, message)
    if value < min_val or value > max_val then
        local err_msg = message or string.format("Value %s not in range [%s, %s]", 
            tostring(value), tostring(min_val), tostring(max_val))
        error(err_msg, 2)
    end
end

function assert_framework.assert_not_nil(value, message)
    if value == nil then
        local err_msg = message or "Value cannot be nil"
        error(err_msg, 2)
    end
end

-- Function using assertions for debugging
local function validated_function(name, age, score)
    assert_framework.assert_type(name, "string", "Name must be a string")
    assert_framework.assert_type(age, "number", "Age must be a number")
    assert_framework.assert_range(age, 0, 150, "Age must be between 0 and 150")
    assert_framework.assert_type(score, "number", "Score must be a number")
    assert_framework.assert_range(score, 0, 100, "Score must be between 0 and 100")
    
    return {
        name = name,
        age = age,
        score = score,
        grade = score >= 90 and "A" or score >= 80 and "B" or score >= 70 and "C" or "F"
    }
end

-- Test assertion framework
print("\\nTesting assertion framework:")
local test_cases = {
    {"Alice", 25, 95},      -- Valid
    {"Bob", "30", 85},      -- Invalid age type
    {"Carol", 25, 105},     -- Invalid score range
    {nil, 30, 80}           -- Invalid name
}

for i, case in ipairs(test_cases) do
    local success, result = pcall(validated_function, case[1], case[2], case[3])
    if success then
        print(string.format("Test %d: Success - %s, age %d, grade %s", 
            i, result.name, result.age, result.grade))
    else
        print(string.format("Test %d: Failed - %s", i, result))
    end
end`,
            output: "Running profiler test:\n=== PROFILER REPORT ===\nFunction Call Counts:\n  fibonacci                     :    89 calls,   0.0012 seconds\n  factorial                     :    55 calls,   0.0003 seconds\n  test_math_functions           :     1 calls,   0.0015 seconds\n=====================\n\nRunning memory tracker test:\n=== MEMORY TRACKER REPORT ===\n  start          :   245.67 KB (   +0.00 KB)\n  before_table   :   245.89 KB (   +0.22 KB)\n  after_table    :  2156.34 KB (+1910.67 KB)\n  after_gc       :  2156.34 KB (+1910.67 KB)\n  after_clear    :   246.12 KB (   +0.45 KB)\n============================\n\nTesting assertion framework:\nTest 1: Success - Alice, age 25, grade A\nTest 2: Failed - Age must be a number\nTest 3: Failed - Score must be between 0 and 100\nTest 4: Failed - Name must be a string"
          }
        ],
        exercises: [
          {
            title: "Comprehensive Debugging Suite",
            description: "Build a complete debugging and profiling suite for Lua applications.",
            instructions: [
              "Create a configurable logging system with different output formats",
              "Implement a function call tracer with filtering capabilities",
              "Build a memory leak detector for long-running applications",
              "Add performance benchmarking and comparison tools"
            ],
            starterCode: `local debug_suite = {}

function debug_suite.create_logger(config)
    -- Configurable logger with:
    -- - Multiple output destinations (file, console, network)
    -- - Different log levels and filtering
    -- - Structured logging with metadata
    -- - Log rotation and archiving
end

function debug_suite.create_tracer(options)
    -- Function call tracer with:
    -- - Selective function filtering
    -- - Call depth limiting
    -- - Timing information
    -- - Parameter and return value logging
end

function debug_suite.create_memory_monitor(config)
    -- Memory monitoring with:
    -- - Periodic snapshots
    -- - Leak detection algorithms
    -- - Growth trend analysis
    -- - Garbage collection impact measurement
end

function debug_suite.create_benchmark_suite()
    -- Benchmarking tools with:
    -- - Statistical analysis (mean, median, std dev)
    -- - Comparison between implementations
    -- - Performance regression detection
    -- - Report generation
end

function debug_suite.create_test_framework()
    -- Testing framework with:
    -- - Assertion library
    -- - Test discovery and execution
    -- - Coverage analysis
    -- - Mocking and stubbing capabilities
end

-- Test your debugging suite
local logger = debug_suite.create_logger({
    level = "DEBUG",
    outputs = {"console", "file"},
    format = "structured"
})

local tracer = debug_suite.create_tracer({
    filter = function(func_name) return func_name:match("^test_") end,
    max_depth = 5
})

local benchmark = debug_suite.create_benchmark_suite()

-- Example usage
benchmark:compare("sorting_algorithms", {
    bubble_sort = function(arr) --[[ implementation ]] end,
    quick_sort = function(arr) --[[ implementation ]] end
}, {1000, 5000, 10000})  -- Test with different data sizes`
          }
        ]
      },
      {
        title: "Building Resilient Applications",
        content: "Strategies for building robust, fault-tolerant applications that gracefully handle errors and recover from failures.",
        codeExamples: [
          {
            title: "Graceful Degradation and Fallbacks",
            explanation: "Implementing fallback mechanisms and graceful degradation when components fail.",
            code: `-- Service abstraction with fallback mechanisms
local service_manager = {}

function service_manager.new()
    local manager = {
        services = {},
        fallbacks = {},
        health_checks = {}
    }
    
    function manager:register_service(name, service, fallback, health_check)
        self.services[name] = service
        self.fallbacks[name] = fallback
        self.health_checks[name] = health_check
    end
    
    function manager:call_service(name, method, ...)
        local service = self.services[name]
        local fallback = self.fallbacks[name]
        local health_check = self.health_checks[name]
        
        -- Check service health first
        if health_check and not health_check() then
            print("Service " .. name .. " is unhealthy, using fallback")
            if fallback and fallback[method] then
                return fallback[method](...)
            else
                error("Service " .. name .. " is unavailable and no fallback provided")
            end
        end
        
        -- Try primary service
        if service and service[method] then
            local success, result = pcall(service[method], ...)
            if success then
                return result
            else
                print("Service " .. name .. " failed: " .. tostring(result))
                
                -- Fall back to backup service
                if fallback and fallback[method] then
                    print("Using fallback for " .. name .. "." .. method)
                    return fallback[method](...)
                else
                    error("Service " .. name .. " failed and no fallback available")
                end
            end
        else
            error("Service " .. name .. " or method " .. method .. " not found")
        end
    end
    
    return manager
end

-- Example services
local primary_database = {
    get_user = function(id)
        -- Simulate random failure
        if math.random() < 0.3 then
            error("Database connection failed")
        end
        return {id = id, name = "User " .. id, source = "primary_db"}
    end,
    
    save_user = function(user)
        if math.random() < 0.3 then
            error("Database write failed")
        end
        return true
    end
}

local cache_fallback = {
    get_user = function(id)
        -- Simulate cache lookup
        return {id = id, name = "Cached User " .. id, source = "cache"}
    end,
    
    save_user = function(user)
        -- Cache can't save, but we can queue for later
        print("Queued user for later save:", user.name)
        return true
    end
}

local function database_health_check()
    -- Simulate health check
    return math.random() > 0.2  -- 80% healthy
end

-- Set up service manager
local sm = service_manager.new()
sm:register_service("database", primary_database, cache_fallback, database_health_check)

-- Test service calls with fallbacks
print("Testing service manager with fallbacks:")
math.randomseed(os.time())

for i = 1, 5 do
    local success, result = pcall(function()
        return sm:call_service("database", "get_user", i)
    end)
    
    if success then
        print(string.format("User %d: %s (from %s)", i, result.name, result.source))
    else
        print(string.format("Failed to get user %d: %s", i, result))
    end
end

-- Circuit breaker pattern implementation
local function create_circuit_breaker(failure_threshold, recovery_timeout)
    local breaker = {
        state = "closed",  -- closed, open, half_open
        failure_count = 0,
        failure_threshold = failure_threshold,
        recovery_timeout = recovery_timeout,
        last_failure_time = 0
    }
    
    function breaker:call(operation, ...)
        local current_time = os.time()
        
        -- Check if we should transition from open to half-open
        if self.state == "open" then
            if current_time - self.last_failure_time >= self.recovery_timeout then
                self.state = "half_open"
                print("Circuit breaker transitioning to half-open")
            else
                error("Circuit breaker is open - operation not allowed")
            end
        end
        
        -- Attempt the operation
        local success, result = pcall(operation, ...)
        
        if success then
            -- Reset on success
            if self.state == "half_open" then
                self.state = "closed"
                self.failure_count = 0
                print("Circuit breaker closed - service recovered")
            end
            return result
        else
            -- Handle failure
            self.failure_count = self.failure_count + 1
            self.last_failure_time = current_time
            
            if self.failure_count >= self.failure_threshold then
                self.state = "open"
                print("Circuit breaker opened due to failures")
            end
            
            error(result)
        end
    end
    
    function breaker:get_state()
        return self.state
    end
    
    return breaker
end

-- Test circuit breaker
print("\\nTesting circuit breaker:")
local unreliable_service = function()
    if math.random() < 0.7 then  -- 70% failure rate
        error("Service temporarily unavailable")
    end
    return "Service response"
end

local breaker = create_circuit_breaker(3, 5)  -- 3 failures, 5 second recovery

for i = 1, 10 do
    local success, result = pcall(function()
        return breaker:call(unreliable_service)
    end)
    
    if success then
        print(string.format("Call %d: Success - %s", i, result))
    else
        print(string.format("Call %d: Failed - %s (State: %s)", i, result, breaker:get_state()))
    end
    
    -- Simulate time passing for recovery test
    if i == 7 then
        print("Simulating time passage for recovery...")
        -- In real code, you'd actually wait
    end
end

-- Retry mechanism with exponential backoff
local function create_retry_policy(max_attempts, base_delay, max_delay)
    return {
        max_attempts = max_attempts,
        base_delay = base_delay,
        max_delay = max_delay,
        
        execute = function(self, operation, ...)
            local attempt = 1
            local delay = self.base_delay
            
            while attempt <= self.max_attempts do
                local success, result = pcall(operation, ...)
                
                if success then
                    if attempt > 1 then
                        print(string.format("Operation succeeded on attempt %d", attempt))
                    end
                    return result
                end
                
                print(string.format("Attempt %d failed: %s", attempt, result))
                
                if attempt < self.max_attempts then
                    print(string.format("Retrying in %d seconds...", delay))
                    -- In real code: os.execute("sleep " .. delay)
                    
                    -- Exponential backoff
                    delay = math.min(delay * 2, self.max_delay)
                end
                
                attempt = attempt + 1
            end
            
            error("Operation failed after " .. self.max_attempts .. " attempts")
        end
    }
end

-- Test retry policy
print("\\nTesting retry policy:")
local flaky_operation = function(data)
    if math.random() < 0.6 then  -- 60% failure rate
        error("Temporary failure")
    end
    return "Operation completed with: " .. tostring(data)
end

local retry_policy = create_retry_policy(4, 1, 8)
local success, result = pcall(function()
    return retry_policy:execute(flaky_operation, "test_data")
end)

if success then
    print("Final result:", result)
else
    print("Final failure:", result)
end`,
            output: "Testing service manager with fallbacks:\nUser 1: User 1 (from primary_db)\nService database failed: Database connection failed\nUsing fallback for database.get_user\nUser 2: Cached User 2 (from cache)\nUser 3: User 3 (from primary_db)\nService database is unhealthy, using fallback\nUser 4: Cached User 4 (from cache)\nUser 5: User 5 (from primary_db)\n\nTesting circuit breaker:\nCall 1: Failed - Service temporarily unavailable (State: closed)\nCall 2: Failed - Service temporarily unavailable (State: closed)\nCall 3: Failed - Service temporarily unavailable (State: open)\nCircuit breaker opened due to failures\nCall 4: Failed - Circuit breaker is open - operation not allowed (State: open)\nCall 5: Failed - Circuit breaker is open - operation not allowed (State: open)\nCall 6: Failed - Circuit breaker is open - operation not allowed (State: open)\nCall 7: Failed - Circuit breaker is open - operation not allowed (State: open)\nSimulating time passage for recovery...\nCall 8: Failed - Circuit breaker is open - operation not allowed (State: open)\nCall 9: Failed - Circuit breaker is open - operation not allowed (State: open)\nCall 10: Failed - Circuit breaker is open - operation not allowed (State: open)\n\nTesting retry policy:\nAttempt 1 failed: Temporary failure\nRetrying in 1 seconds...\nAttempt 2 failed: Temporary failure\nRetrying in 2 seconds...\nOperation succeeded on attempt 3\nFinal result: Operation completed with: test_data"
          }
        ],
        exercises: [
          {
            title: "Fault-Tolerant Application Framework",
            description: "Build a comprehensive framework for creating fault-tolerant applications.",
            instructions: [
              "Create a health monitoring system for application components",
              "Implement automatic failover and recovery mechanisms",
              "Build a configuration system that supports hot-reloading",
              "Add metrics collection and alerting capabilities"
            ],
            starterCode: `local fault_tolerant = {}

function fault_tolerant.create_health_monitor(components)
    -- Monitor health of application components
    -- Support different health check types (ping, function call, resource check)
    -- Provide health status reporting and history
end

function fault_tolerant.create_failover_manager(primary, secondary, health_check)
    -- Automatic failover between primary and secondary systems
    -- Support graceful switchover and automatic recovery
    -- Handle state synchronization between systems
end

function fault_tolerant.create_config_manager(config_sources)
    -- Hot-reloadable configuration system
    -- Support multiple configuration sources (files, environment, remote)
    -- Provide configuration validation and rollback
end

function fault_tolerant.create_metrics_collector(config)
    -- Collect application metrics (performance, errors, usage)
    -- Support different metric types (counters, gauges, histograms)
    -- Provide alerting based on thresholds
end

function fault_tolerant.create_application(components)
    -- Main application framework that ties everything together
    -- Coordinate health monitoring, failover, configuration, and metrics
    -- Provide graceful shutdown and startup procedures
end

-- Test your fault-tolerant framework
local app = fault_tolerant.create_application({
    database = {
        primary = "primary_db_connection",
        secondary = "backup_db_connection",
        health_check = function() return true end
    },
    cache = {
        primary = "redis_connection", 
        secondary = "memory_cache",
        health_check = function() return true end
    }
})

app:start()
print("Application started with fault tolerance")

-- Simulate component failure
app:simulate_failure("database")
print("Database failure simulated - checking failover")

app:stop()
print("Application stopped gracefully")`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is the difference between pcall and xpcall?",
          options: [
            "pcall is faster than xpcall",
            "xpcall allows custom error handling functions",
            "pcall only works with Lua functions",
            "There is no difference"
          ],
          correctAnswer: 1,
          explanation: "xpcall allows you to specify a custom error handler function that can process the error before it's returned, while pcall uses a default error handler."
        },
        {
          question: "What does debug.getinfo() return?",
          options: [
            "Only the function name",
            "Only the line number",
            "A table with function information like name, source, and line",
            "The function's source code"
          ],
          correctAnswer: 2,
          explanation: "debug.getinfo() returns a table containing various pieces of information about a function, including its name, source file, line numbers, and other metadata."
        },
        {
          question: "What is a circuit breaker pattern used for?",
          options: [
            "Breaking infinite loops",
            "Preventing cascading failures by stopping calls to failing services",
            "Breaking out of nested function calls",
            "Stopping memory leaks"
          ],
          correctAnswer: 1,
          explanation: "The circuit breaker pattern prevents cascading failures by monitoring for failures and 'opening the circuit' to stop calls to a failing service, allowing it time to recover."
        }
      ]
    }
  },
  {
    title: "Modules and Package Management",
    description: "Learn to create reusable modules, understand Lua's module system, and manage dependencies effectively.",
    objectives: [
      "Understand Lua's module system and require mechanism",
      "Create well-structured, reusable modules",
      "Master module loading and path management",
      "Learn package organization and distribution",
      "Implement module versioning and dependency management"
    ],
    prerequisites: ["Error handling and debugging"],
    estimatedTime: "3-4 hours",
    difficulty: "Intermediate",
    sections: [
      {
        title: "Module System Fundamentals",
        content: "Lua's module system is based on the require function and package management. Understanding how modules are loaded, cached, and organized is essential for building maintainable applications.",
        codeExamples: [
          {
            title: "Creating and Using Basic Modules",
            explanation: "Learn how to create modules and use them with require.",
            code: `-- First, let's create a simple math utilities module
-- This would typically be in a file called 'mathutils.lua'

local mathutils = {}

function mathutils.add(a, b)
    return a + b
end

function mathutils.multiply(a, b)
    return a * b
end

function mathutils.factorial(n)
    if n <= 1 then
        return 1
    end
    return n * mathutils.factorial(n - 1)
end

function mathutils.is_prime(n)
    if n < 2 then return false end
    if n == 2 then return true end
    if n % 2 == 0 then return false end
    
    for i = 3, math.sqrt(n), 2 do
        if n % i == 0 then
            return false
        end
    end
    return true
end

-- Export the module
return mathutils

-- Now let's simulate using this module
-- In a real scenario, this would be in a separate file

-- Simulate the module loading process
local function simulate_require(module_name)
    -- This simulates what require() does internally
    print("Loading module:", module_name)
    
    -- For demonstration, we'll return our mathutils module
    if module_name == "mathutils" then
        return mathutils
    else
        error("Module not found: " .. module_name)
    end
end

-- Using the module
print("=== Module Usage Example ===")
local math_lib = simulate_require("mathutils")

print("Addition:", math_lib.add(5, 3))
print("Multiplication:", math_lib.multiply(4, 7))
print("Factorial of 5:", math_lib.factorial(5))
print("Is 17 prime?", math_lib.is_prime(17))
print("Is 15 prime?", math_lib.is_prime(15))

-- Alternative usage pattern - importing specific functions
local add, multiply = math_lib.add, math_lib.multiply
print("Using imported functions:", add(10, 20), multiply(3, 4))

-- Module with private functions
local stringutils = {}

-- Private helper function (not exported)
local function trim_whitespace(str)
    return str:match("^%s*(.-)%s*$")
end

-- Public functions
function stringutils.capitalize(str)
    str = trim_whitespace(str)
    return str:sub(1, 1):upper() .. str:sub(2):lower()
end

function stringutils.title_case(str)
    return str:gsub("(%a)([%a]*)", function(first, rest)
        return first:upper() .. rest:lower()
    end)
end

function stringutils.reverse_words(str)
    local words = {}
    for word in str:gmatch("%S+") do
        table.insert(words, 1, word)
    end
    return table.concat(words, " ")
end

-- Demonstrate private vs public functions
print("\\n=== String Utils Module ===")
print("Capitalize:", stringutils.capitalize("  hello world  "))
print("Title case:", stringutils.title_case("hello world from lua"))
print("Reverse words:", stringutils.reverse_words("The quick brown fox"))

-- This would cause an error if we tried to access it:
-- print(stringutils.trim_whitespace("test"))  -- Error: function not exported`,
            output: "Loading module: mathutils\n=== Module Usage Example ===\nAddition: 8\nMultiplication: 28\nFactorial of 5: 120\nIs 17 prime? true\nIs 15 prime? false\nUsing imported functions: 30 12\n\n=== String Utils Module ===\nCapitalize: Hello world\nTitle case: Hello World From Lua\nReverse words: fox brown quick The"
          },
          {
            title: "Advanced Module Patterns",
            explanation: "Sophisticated module patterns including module factories, configuration, and initialization.",
            code: `-- Module factory pattern
local function create_logger_module(config)
    config = config or {}
    
    local logger = {
        level = config.level or "INFO",
        output = config.output or "console",
        format = config.format or "[%s] %s: %s"
    }
    
    local levels = {
        DEBUG = 1,
        INFO = 2,
        WARNING = 3,
        ERROR = 4,
        CRITICAL = 5
    }
    
    local function should_log(level)
        return levels[level] >= levels[logger.level]
    end
    
    local function format_message(level, category, message)
        return string.format(logger.format, os.date("%H:%M:%S"), level, message)
    end
    
    function logger.debug(message)
        if should_log("DEBUG") then
            print(format_message("DEBUG", "debug", message))
        end
    end
    
    function logger.info(message)
        if should_log("INFO") then
            print(format_message("INFO", "info", message))
        end
    end
    
    function logger.warning(message)
        if should_log("WARNING") then
            print(format_message("WARNING", "warning", message))
        end
    end
    
    function logger.error(message)
        if should_log("ERROR") then
            print(format_message("ERROR", "error", message))
        end
    end
    
    function logger.set_level(new_level)
        if levels[new_level] then
            logger.level = new_level
        else
            error("Invalid log level: " .. tostring(new_level))
        end
    end
    
    function logger.get_config()
        return {
            level = logger.level,
            output = logger.output,
            format = logger.format
        }
    end
    
    return logger
end

-- Test logger factory
print("=== Logger Factory Pattern ===")
local app_logger = create_logger_module({level = "DEBUG"})
local error_logger = create_logger_module({level = "ERROR"})

app_logger.debug("This is a debug message")
app_logger.info("Application started")
app_logger.warning("This is a warning")

error_logger.debug("This debug won't show")
error_logger.info("This info won't show")
error_logger.error("This error will show")

-- Module with initialization and cleanup
local database_module = {}

-- Module state
local connection = nil
local transaction_count = 0
local is_initialized = false

function database_module.initialize(config)
    if is_initialized then
        return true, "Already initialized"
    end
    
    config = config or {}
    connection = {
        host = config.host or "localhost",
        port = config.port or 5432,
        database = config.database or "default",
        connected = true
    }
    
    is_initialized = true
    print("Database initialized:", connection.host .. ":" .. connection.port)
    return true, "Initialized successfully"
end

function database_module.execute_query(query)
    if not is_initialized then
        error("Database not initialized. Call initialize() first.")
    end
    
    if not connection.connected then
        error("Database connection lost")
    end
    
    transaction_count = transaction_count + 1
    print("Executing query:", query)
    return {rows = {}, affected = 0, transaction_id = transaction_count}
end

function database_module.get_stats()
    return {
        initialized = is_initialized,
        connected = connection and connection.connected or false,
        transaction_count = transaction_count,
        connection_info = connection
    }
end

function database_module.cleanup()
    if connection then
        connection.connected = false
        print("Database connection closed")
    end
    is_initialized = false
    transaction_count = 0
end

-- Test database module
print("\\n=== Database Module with Initialization ===")
print("Stats before init:", database_module.get_stats().initialized)

database_module.initialize({host = "db.example.com", database = "myapp"})
database_module.execute_query("SELECT * FROM users")
database_module.execute_query("INSERT INTO logs VALUES (...)")

local stats = database_module.get_stats()
print("Transaction count:", stats.transaction_count)
print("Connected to:", stats.connection_info.host)

database_module.cleanup()

-- Module with namespace and sub-modules
local graphics = {}

-- Sub-module: colors
graphics.colors = {
    RED = {255, 0, 0},
    GREEN = {0, 255, 0},
    BLUE = {0, 0, 255},
    WHITE = {255, 255, 255},
    BLACK = {0, 0, 0}
}

function graphics.colors.rgb_to_hex(r, g, b)
    return string.format("#%02X%02X%02X", r, g, b)
end

function graphics.colors.hex_to_rgb(hex)
    hex = hex:gsub("#", "")
    local r = tonumber(hex:sub(1, 2), 16)
    local g = tonumber(hex:sub(3, 4), 16)
    local b = tonumber(hex:sub(5, 6), 16)
    return r, g, b
end

-- Sub-module: shapes
graphics.shapes = {}

function graphics.shapes.rectangle(x, y, width, height)
    return {
        type = "rectangle",
        x = x, y = y,
        width = width, height = height,
        area = width * height
    }
end

function graphics.shapes.circle(x, y, radius)
    return {
        type = "circle",
        x = x, y = y,
        radius = radius,
        area = math.pi * radius * radius
    }
end

-- Main graphics functions
function graphics.create_canvas(width, height)
    return {
        width = width,
        height = height,
        shapes = {},
        background = graphics.colors.WHITE
    }
end

function graphics.add_shape(canvas, shape)
    table.insert(canvas.shapes, shape)
end

-- Test graphics module with sub-modules
print("\\n=== Graphics Module with Sub-modules ===")
local canvas = graphics.create_canvas(800, 600)

local rect = graphics.shapes.rectangle(10, 10, 100, 50)
local circle = graphics.shapes.circle(200, 200, 30)

graphics.add_shape(canvas, rect)
graphics.add_shape(canvas, circle)

print("Canvas size:", canvas.width .. "x" .. canvas.height)
print("Rectangle area:", rect.area)
print("Circle area:", string.format("%.2f", circle.area))

local red_hex = graphics.colors.rgb_to_hex(255, 0, 0)
print("Red in hex:", red_hex)

local r, g, b = graphics.colors.hex_to_rgb("#00FF00")
print("Green RGB:", r, g, b)`,
            output: "=== Logger Factory Pattern ===\n[14:30:15] DEBUG: This is a debug message\n[14:30:15] INFO: Application started\n[14:30:15] WARNING: This is a warning\n[14:30:15] ERROR: This error will show\n\n=== Database Module with Initialization ===\nStats before init: false\nDatabase initialized: db.example.com:5432\nExecuting query: SELECT * FROM users\nExecuting query: INSERT INTO logs VALUES (...)\nTransaction count: 2\nConnected to: db.example.com\nDatabase connection closed\n\n=== Graphics Module with Sub-modules ===\nCanvas size: 800x600\nRectangle area: 5000\nCircle area: 2827.43\nRed in hex: #FF0000\nGreen RGB: 0 255 0"
          }
        ],
        exercises: [
          {
            title: "Configuration Management Module",
            description: "Build a comprehensive configuration management system as a reusable module.",
            instructions: [
              "Create a module that can load configuration from multiple sources",
              "Support environment variable overrides and default values",
              "Implement configuration validation and type checking",
              "Add hot-reloading capabilities for configuration changes"
            ],
            starterCode: `-- config_manager.lua
local config_manager = {}

function config_manager.new(options)
    -- Create a new configuration manager instance
    -- Support options like: default_file, env_prefix, validation_schema
end

function config_manager:load_from_file(filename)
    -- Load configuration from file (JSON, YAML, or Lua table format)
end

function config_manager:load_from_env(prefix)
    -- Load configuration from environment variables with given prefix
end

function config_manager:set_defaults(defaults)
    -- Set default configuration values
end

function config_manager:validate(schema)
    -- Validate current configuration against schema
end

function config_manager:get(key, default_value)
    -- Get configuration value with optional default
end

function config_manager:set(key, value)
    -- Set configuration value
end

function config_manager:watch_file(filename, callback)
    -- Watch configuration file for changes and reload
end

-- Test your configuration manager
local config = config_manager.new({
    env_prefix = "MYAPP_",
    validation_schema = {
        database = {type = "table", required = true},
        port = {type = "number", min = 1, max = 65535}
    }
})

config:set_defaults({
    database = {host = "localhost", port = 5432},
    port = 8080,
    debug = false
})

config:load_from_env("MYAPP_")
print("Database host:", config:get("database.host"))
print("Port:", config:get("port"))`
          }
        ]
      },
      {
        title: "Package Loading and Path Management",
        content: "Understanding how Lua finds and loads modules, managing package paths, and creating custom loaders.",
        codeExamples: [
          {
            title: "Understanding Package Paths and Loading",
            explanation: "How Lua's require function finds and loads modules using package.path and package.cpath.",
            code: `-- Demonstrate package path management
print("=== Package Path Management ===")

-- Show current package paths
print("Current package.path:")
for path in package.path:gmatch("[^;]+") do
    print("  " .. path)
end

print("\\nCurrent package.cpath:")
for path in package.cpath:gmatch("[^;]+") do
    print("  " .. path)
end

-- Show loaded packages
print("\\nCurrently loaded packages:")
for name, module in pairs(package.loaded) do
    print("  " .. name .. " -> " .. tostring(module))
end

-- Custom module loader
local custom_modules = {
    ["mymath"] = function()
        local mymath = {}
        function mymath.square(x) return x * x end
        function mymath.cube(x) return x * x * x end
        return mymath
    end,
    
    ["mystring"] = function()
        local mystring = {}
        function mystring.reverse(s) return s:reverse() end
        function mystring.count_chars(s) return #s end
        return mystring
    end
}

-- Custom loader function
local function custom_loader(module_name)
    local loader = custom_modules[module_name]
    if loader then
        return loader
    else
        return "\\n\\tno custom module '" .. module_name .. "'"
    end
end

-- Add custom loader to package.loaders (or package.searchers in Lua 5.2+)
-- Note: In Lua 5.1, it's package.loaders; in 5.2+, it's package.searchers
if package.loaders then
    table.insert(package.loaders, 2, custom_loader)  -- Insert at position 2
else
    table.insert(package.searchers, 2, custom_loader)
end

-- Simulate require function behavior
local function simulate_require(module_name)
    -- Check if already loaded
    if package.loaded[module_name] then
        print("Module '" .. module_name .. "' already loaded from cache")
        return package.loaded[module_name]
    end
    
    -- Try each loader
    local loaders = package.loaders or package.searchers or {}
    local errors = {}
    
    for i, loader in ipairs(loaders) do
        local result = loader(module_name)
        
        if type(result) == "function" then
            print("Loading '" .. module_name .. "' using loader " .. i)
            local module = result()
            package.loaded[module_name] = module
            return module
        elseif type(result) == "string" then
            table.insert(errors, result)
        end
    end
    
    error("module '" .. module_name .. "' not found:" .. table.concat(errors))
end

-- Test custom module loading
print("\\n=== Custom Module Loading ===")
local mymath = simulate_require("mymath")
print("Square of 5:", mymath.square(5))
print("Cube of 3:", mymath.cube(3))

local mystring = simulate_require("mystring")
print("Reverse 'hello':", mystring.reverse("hello"))
print("Character count of 'Lua':", mystring.count_chars("Lua"))

-- Try loading the same module again (should use cache)
local mymath2 = simulate_require("mymath")
print("Same module instance?", mymath == mymath2)

-- Path manipulation utilities
local path_utils = {}

function path_utils.add_path(new_path)
    -- Add a new path to package.path
    if not package.path:find(new_path, 1, true) then
        package.path = new_path .. ";" .. package.path
        print("Added to package.path:", new_path)
    else
        print("Path already exists:", new_path)
    end
end

function path_utils.remove_path(path_to_remove)
    -- Remove a path from package.path
    local paths = {}
    for path in package.path:gmatch("[^;]+") do
        if path ~= path_to_remove then
            table.insert(paths, path)
        end
    end
    package.path = table.concat(paths, ";")
    print("Removed from package.path:", path_to_remove)
end

function path_utils.find_module_file(module_name)
    -- Find where a module would be loaded from
    local module_path = module_name:gsub("%.", "/")
    
    for path_template in package.path:gmatch("[^;]+") do
        local file_path = path_template:gsub("%?", module_path)
        print("Checking:", file_path)
        
        -- In a real implementation, you'd check if the file exists
        -- For demonstration, we'll just show the paths that would be checked
    end
end

-- Test path utilities
print("\\n=== Path Utilities ===")
path_utils.add_path("./custom_modules/?.lua")
path_utils.add_path("./lib/?.lua")

print("\\nSearching for module 'utils.string':")
path_utils.find_module_file("utils.string")

-- Module preloading
print("\\n=== Module Preloading ===")

-- Preload a module (available but not yet executed)
package.preload["preloaded_module"] = function()
    print("Preloaded module is being initialized")
    return {
        message = "I was preloaded!",
        get_time = function() return os.date() end
    }
end

-- The module won't be initialized until required
print("Module preloaded but not initialized yet")

-- Now require it
local preloaded = simulate_require("preloaded_module")
print("Preloaded module message:", preloaded.message)
print("Current time from preloaded module:", preloaded.get_time())

-- Module unloading (for development/testing)
local function unload_module(module_name)
    package.loaded[module_name] = nil
    print("Unloaded module:", module_name)
end

-- Demonstrate module reloading
print("\\n=== Module Reloading ===")
unload_module("mymath")

-- Modify the custom module
custom_modules["mymath"] = function()
    local mymath = {}
    function mymath.square(x) return x * x end
    function mymath.cube(x) return x * x * x end
    function mymath.power(x, n) return x ^ n end  -- New function
    return mymath
end

-- Reload the module
local mymath_reloaded = simulate_require("mymath")
print("New function available:", mymath_reloaded.power(2, 4))`,
            output: "=== Package Path Management ===\nCurrent package.path:\n  ./?.lua\n  /usr/local/share/lua/5.1/?.lua\n  /usr/local/share/lua/5.1/?/init.lua\n  /usr/local/lib/lua/5.1/?.lua\n  /usr/local/lib/lua/5.1/?/init.lua\n\nCurrent package.cpath:\n  ./?.so\n  /usr/local/lib/lua/5.1/?.so\n  /usr/local/lib/lua/5.1/loadall.so\n\nCurrently loaded packages:\n  _G -> table: 0x...\n  coroutine -> table: 0x...\n  debug -> table: 0x...\n  io -> table: 0x...\n  math -> table: 0x...\n  os -> table: 0x...\n  package -> table: 0x...\n  string -> table: 0x...\n  table -> table: 0x...\n\n=== Custom Module Loading ===\nLoading 'mymath' using loader 2\nSquare of 5: 25\nCube of 3: 27\nLoading 'mystring' using loader 2\nReverse 'hello': olleh\nCharacter count of 'Lua': 3\nModule 'mymath' already loaded from cache\nSame module instance? true\n\n=== Path Utilities ===\nAdded to package.path: ./custom_modules/?.lua\nAdded to package.path: ./lib/?.lua\n\nSearching for module 'utils.string':\nChecking: ./custom_modules/utils/string.lua\nChecking: ./lib/utils/string.lua\nChecking: ./utils/string.lua\nChecking: /usr/local/share/lua/5.1/utils/string.lua\n\n=== Module Preloading ===\nModule preloaded but not initialized yet\nPreloaded module is being initialized\nPreloaded module message: I was preloaded!\nCurrent time from preloaded module: Mon Dec 25 14:30:15 2023\n\n=== Module Reloading ===\nUnloaded module: mymath\nLoading 'mymath' using loader 2\nNew function available: 16"
          },
          {
            title: "Advanced Package Management",
            explanation: "Creating sophisticated package management systems with versioning and dependency resolution.",
            code: `-- Advanced package manager
local package_manager = {}

-- Package registry
local registry = {
    packages = {},
    dependencies = {},
    versions = {}
}

-- Version comparison utility
local function compare_versions(v1, v2)
    local function parse_version(version)
        local parts = {}
        for part in version:gmatch("[^%.]+") do
            table.insert(parts, tonumber(part) or 0)
        end
        return parts
    end
    
    local parts1 = parse_version(v1)
    local parts2 = parse_version(v2)
    local max_parts = math.max(#parts1, #parts2)
    
    for i = 1, max_parts do
        local p1 = parts1[i] or 0
        local p2 = parts2[i] or 0
        
        if p1 < p2 then return -1
        elseif p1 > p2 then return 1
        end
    end
    
    return 0
end

-- Package registration
function package_manager.register_package(name, version, loader, dependencies)
    dependencies = dependencies or {}
    
    if not registry.packages[name] then
        registry.packages[name] = {}
        registry.versions[name] = {}
    end
    
    registry.packages[name][version] = loader
    registry.dependencies[name .. "@" .. version] = dependencies
    table.insert(registry.versions[name], version)
    
    -- Sort versions
    table.sort(registry.versions[name], function(a, b)
        return compare_versions(a, b) < 0
    end)
    
    print("Registered package:", name .. "@" .. version)
end

-- Dependency resolution
function package_manager.resolve_dependencies(name, version)
    local resolved = {}
    local resolving = {}
    
    local function resolve(pkg_name, pkg_version)
        local key = pkg_name .. "@" .. pkg_version
        
        if resolved[key] then
            return resolved[key]
        end
        
        if resolving[key] then
            error("Circular dependency detected: " .. key)
        end
        
        resolving[key] = true
        
        local deps = registry.dependencies[key] or {}
        local resolved_deps = {}
        
        for _, dep in ipairs(deps) do
            local dep_name, dep_version = dep:match("([^@]+)@(.+)")
            if not dep_name then
                dep_name = dep
                dep_version = package_manager.get_latest_version(dep_name)
            end
            
            if not registry.packages[dep_name] or not registry.packages[dep_name][dep_version] then
                error("Dependency not found: " .. dep_name .. "@" .. dep_version)
            end
            
            local sub_deps = resolve(dep_name, dep_version)
            for sub_key, sub_loader in pairs(sub_deps) do
                resolved_deps[sub_key] = sub_loader
            end
            resolved_deps[dep_name .. "@" .. dep_version] = registry.packages[dep_name][dep_version]
        end
        
        resolving[key] = nil
        resolved[key] = resolved_deps
        
        return resolved_deps
    end
    
    return resolve(name, version)
end

-- Get latest version
function package_manager.get_latest_version(name)
    local versions = registry.versions[name]
    return versions and versions[#versions] or nil
end

-- Load package with dependencies
function package_manager.load_package(name, version)
    version = version or package_manager.get_latest_version(name)
    
    if not version then
        error("Package not found: " .. name)
    end
    
    local key = name .. "@" .. version
    
    -- Check if already loaded
    if package.loaded[key] then
        return package.loaded[key]
    end
    
    print("Loading package:", key)
    
    -- Resolve and load dependencies first
    local dependencies = package_manager.resolve_dependencies(name, version)
    for dep_key, dep_loader in pairs(dependencies) do
        if not package.loaded[dep_key] then
            print("Loading dependency:", dep_key)
            package.loaded[dep_key] = dep_loader()
        end
    end
    
    -- Load the main package
    local loader = registry.packages[name][version]
    if not loader then
        error("Package loader not found: " .. key)
    end
    
    local module = loader()
    package.loaded[key] = module
    
    return module
end

-- Register some example packages
print("=== Package Registration ===")

-- Base utility package
package_manager.register_package("utils", "1.0.0", function()
    return {
        trim = function(s) return s:match("^%s*(.-)%s*$") end,
        split = function(s, sep)
            local parts = {}
            for part in s:gmatch("[^" .. sep .. "]+") do
                table.insert(parts, part)
            end
            return parts
        end
    }
end)

-- Updated utility package
package_manager.register_package("utils", "1.1.0", function()
    return {
        trim = function(s) return s:match("^%s*(.-)%s*$") end,
        split = function(s, sep)
            local parts = {}
            for part in s:gmatch("[^" .. sep .. "]+") do
                table.insert(parts, part)
            end
            return parts
        end,
        join = function(parts, sep) return table.concat(parts, sep) end
    }
end)

-- HTTP client package that depends on utils
package_manager.register_package("http", "2.0.0", function()
    local utils = package.loaded["utils@1.1.0"]
    return {
        get = function(url)
            print("HTTP GET:", url)
            return "Response from " .. url
        end,
        parse_headers = function(header_string)
            return utils.split(header_string, "\\n")
        end
    }
end, {"utils@1.1.0"})

-- Web framework that depends on HTTP client
package_manager.register_package("webframework", "3.0.0", function()
    local http = package.loaded["http@2.0.0"]
    local utils = package.loaded["utils@1.1.0"]
    
    return {
        create_app = function()
            return {
                routes = {},
                add_route = function(self, path, handler)
                    self.routes[path] = handler
                end,
                handle_request = function(self, path)
                    local handler = self.routes[path]
                    if handler then
                        return handler()
                    else
                        return "404 Not Found"
                    end
                end
            }
        end,
        make_request = http.get,
        utils = utils
    }
end, {"http@2.0.0"})

-- Test package loading with dependencies
print("\\n=== Package Loading with Dependencies ===")
local web = package_manager.load_package("webframework", "3.0.0")

local app = web.create_app()
app:add_route("/hello", function() return "Hello, World!" end)
app:add_route("/api/users", function() return "User list" end)

print("Response for /hello:", app:handle_request("/hello"))
print("Response for /api/users:", app:handle_request("/api/users"))
print("Response for /unknown:", app:handle_request("/unknown"))

-- Test utility functions from dependency
local trimmed = web.utils.trim("  hello world  ")
local parts = web.utils.split("a,b,c", ",")
local joined = web.utils.join({"x", "y", "z"}, "-")

print("\\nUtility functions from dependency:")
print("Trimmed:", "'" .. trimmed .. "'")
print("Split parts:", table.concat(parts, " | "))
print("Joined:", joined)

-- Package information
function package_manager.list_packages()
    print("\\n=== Available Packages ===")
    for name, versions in pairs(registry.versions) do
        print(name .. ":")
        for _, version in ipairs(versions) do
            local key = name .. "@" .. version
            local deps = registry.dependencies[key] or {}
            local dep_str = #deps > 0 and " (deps: " .. table.concat(deps, ", ") .. ")" or ""
            print("  " .. version .. dep_str)
        end
    end
end

function package_manager.list_loaded()
    print("\\n=== Loaded Packages ===")
    for key, module in pairs(package.loaded) do
        if key:find("@") then  -- Only show our versioned packages
            print("  " .. key)
        end
    end
end

package_manager.list_packages()
package_manager.list_loaded()`,
            output: "=== Package Registration ===\nRegistered package: utils@1.0.0\nRegistered package: utils@1.1.0\nRegistered package: http@2.0.0\nRegistered package: webframework@3.0.0\n\n=== Package Loading with Dependencies ===\nLoading package: webframework@3.0.0\nLoading dependency: utils@1.1.0\nLoading dependency: http@2.0.0\nLoading package: webframework@3.0.0\nResponse for /hello: Hello, World!\nResponse for /api/users: User list\nResponse for /unknown: 404 Not Found\n\nUtility functions from dependency:\nTrimmed: 'hello world'\nSplit parts: a | b | c\nJoined: x-y-z\n\n=== Available Packages ===\nutils:\n  1.0.0\n  1.1.0\nhttp:\n  2.0.0 (deps: utils@1.1.0)\nwebframework:\n  3.0.0 (deps: http@2.0.0)\n\n=== Loaded Packages ===\n  utils@1.1.0\n  http@2.0.0\n  webframework@3.0.0"
          }
        ],
        exercises: [
          {
            title: "Plugin System with Dynamic Loading",
            description: "Create a plugin system that can dynamically load and manage plugins with dependencies.",
            instructions: [
              "Build a plugin manager that can discover and load plugins",
              "Implement plugin lifecycle management (load, initialize, cleanup)",
              "Add plugin dependency resolution and loading order",
              "Create a plugin API for inter-plugin communication"
            ],
            starterCode: `local plugin_system = {}

function plugin_system.new(config)
    -- Create a new plugin system instance
    -- Support configuration for plugin directories, API version, etc.
end

function plugin_system:discover_plugins(directory)
    -- Discover available plugins in directory
    -- Return list of plugin metadata
end

function plugin_system:load_plugin(plugin_name, version)
    -- Load a specific plugin with version
    -- Handle dependencies and initialization
end

function plugin_system:unload_plugin(plugin_name)
    -- Safely unload a plugin and clean up resources
end

function plugin_system:get_plugin_api()
    -- Return API object that plugins can use to interact with system
end

function plugin_system:call_plugin_hook(hook_name, ...)
    -- Call a specific hook in all loaded plugins
end

function plugin_system:list_plugins()
    -- List all available and loaded plugins
end

-- Example plugin structure
local example_plugin = {
    metadata = {
        name = "example_plugin",
        version = "1.0.0",
        description = "An example plugin",
        dependencies = {"utils@1.0.0"},
        api_version = "1.0"
    },
    
    initialize = function(api)
        -- Plugin initialization code
        print("Example plugin initialized")
    end,
    
    cleanup = function()
        -- Plugin cleanup code
        print("Example plugin cleaned up")
    end,
    
    hooks = {
        on_request = function(request)
            -- Handle request hook
            return "Modified by example plugin: " .. request
        end
    }
}

-- Test your plugin system
local ps = plugin_system.new({
    plugin_dir = "./plugins",
    api_version = "1.0"
})

ps:load_plugin("example_plugin", "1.0.0")
local result = ps:call_plugin_hook("on_request", "test request")
print("Hook result:", result)

ps:list_plugins()
ps:unload_plugin("example_plugin")`
          }
        ]
      },
      {
        title: "Module Organization and Best Practices",
        content: "Learn best practices for organizing modules, creating clean APIs, and maintaining backward compatibility.",
        codeExamples: [
          {
            title: "Module Organization Patterns",
            explanation: "Best practices for structuring modules and creating maintainable APIs.",
            code: `-- Example of well-organized module structure
-- This demonstrates a comprehensive module with proper organization

local json_parser = {}

-- Module metadata
json_parser._VERSION = "1.2.0"
json_parser._DESCRIPTION = "A simple JSON parser for Lua"
json_parser._LICENSE = "MIT"

-- Private constants and utilities
local WHITESPACE = {[' '] = true, ['\\t'] = true, ['\\n'] = true, ['\\r'] = true}
local ESCAPE_CHARS = {
    ['"'] = '"',
    ['\\\\'] = '\\\\',
    ['/'] = '/',
    ['b'] = '\\b',
    ['f'] = '\\f',
    ['n'] = '\\n',
    ['r'] = '\\r',
    ['t'] = '\\t'
}

-- Private helper functions
local function skip_whitespace(str, pos)
    while pos <= #str and WHITESPACE[str:sub(pos, pos)] do
        pos = pos + 1
    end
    return pos
end

local function parse_string(str, pos)
    if str:sub(pos, pos) ~= '"' then
        error("Expected string at position " .. pos)
    end
    
    pos = pos + 1
    local result = {}
    
    while pos <= #str do
        local char = str:sub(pos, pos)
        
        if char == '"' then
            return table.concat(result), pos + 1
        elseif char == '\\\\' then
            pos = pos + 1
            local escape = str:sub(pos, pos)
            local escaped = ESCAPE_CHARS[escape]
            if escaped then
                table.insert(result, escaped)
            else
                error("Invalid escape sequence at position " .. pos)
            end
        else
            table.insert(result, char)
        end
        
        pos = pos + 1
    end
    
    error("Unterminated string")
end

local function parse_number(str, pos)
    local start_pos = pos
    local has_decimal = false
    
    -- Handle negative sign
    if str:sub(pos, pos) == '-' then
        pos = pos + 1
    end
    
    -- Parse digits
    while pos <= #str do
        local char = str:sub(pos, pos)
        if char:match('%d') then
            pos = pos + 1
        elseif char == '.' and not has_decimal then
            has_decimal = true
            pos = pos + 1
        else
            break
        end
    end
    
    local number_str = str:sub(start_pos, pos - 1)
    local number = tonumber(number_str)
    
    if not number then
        error("Invalid number at position " .. start_pos)
    end
    
    return number, pos
end

-- Forward declaration for recursive parsing
local parse_value

local function parse_array(str, pos)
    if str:sub(pos, pos) ~= '[' then
        error("Expected '[' at position " .. pos)
    end
    
    pos = pos + 1
    pos = skip_whitespace(str, pos)
    
    local result = {}
    
    -- Handle empty array
    if pos <= #str and str:sub(pos, pos) == ']' then
        return result, pos + 1
    end
    
    while pos <= #str do
        local value
        value, pos = parse_value(str, pos)
        table.insert(result, value)
        
        pos = skip_whitespace(str, pos)
        
        if pos <= #str and str:sub(pos, pos) == ']' then
            return result, pos + 1
        elseif pos <= #str and str:sub(pos, pos) == ',' then
            pos = pos + 1
            pos = skip_whitespace(str, pos)
        else
            error("Expected ',' or ']' at position " .. pos)
        end
    end
    
    error("Unterminated array")
end

local function parse_object(str, pos)
    if str:sub(pos, pos) ~= '{' then
        error("Expected '{' at position " .. pos)
    end
    
    pos = pos + 1
    pos = skip_whitespace(str, pos)
    
    local result = {}
    
    -- Handle empty object
    if pos <= #str and str:sub(pos, pos) == '}' then
        return result, pos + 1
    end
    
    while pos <= #str do
        -- Parse key
        local key
        key, pos = parse_string(str, pos)
        pos = skip_whitespace(str, pos)
        
        -- Expect colon
        if pos > #str or str:sub(pos, pos) ~= ':' then
            error("Expected ':' at position " .. pos)
        end
        pos = pos + 1
        pos = skip_whitespace(str, pos)
        
        -- Parse value
        local value
        value, pos = parse_value(str, pos)
        result[key] = value
        
        pos = skip_whitespace(str, pos)
        
        if pos <= #str and str:sub(pos, pos) == '}' then
            return result, pos + 1
        elseif pos <= #str and str:sub(pos, pos) == ',' then
            pos = pos + 1
            pos = skip_whitespace(str, pos)
        else
            error("Expected ',' or '}' at position " .. pos)
        end
    end
    
    error("Unterminated object")
end

-- Main parsing function
parse_value = function(str, pos)
    pos = skip_whitespace(str, pos)
    
    if pos > #str then
        error("Unexpected end of input")
    end
    
    local char = str:sub(pos, pos)
    
    if char == '"' then
        return parse_string(str, pos)
    elseif char == '[' then
        return parse_array(str, pos)
    elseif char == '{' then
        return parse_object(str, pos)
    elseif char:match('[%-0-9]') then
        return parse_number(str, pos)
    elseif str:sub(pos, pos + 3) == 'true' then
        return true, pos + 4
    elseif str:sub(pos, pos + 4) == 'false' then
        return false, pos + 5
    elseif str:sub(pos, pos + 3) == 'null' then
        return nil, pos + 4
    else
        error("Unexpected character '" .. char .. "' at position " .. pos)
    end
end

-- Public API functions
function json_parser.parse(json_string)
    if type(json_string) ~= "string" then
        error("Expected string input", 2)
    end
    
    local success, result = pcall(function()
        local value, pos = parse_value(json_string, 1)
        pos = skip_whitespace(json_string, pos)
        
        if pos <= #json_string then
            error("Unexpected content after JSON value")
        end
        
        return value
    end)
    
    if success then
        return result
    else
        error("JSON parsing failed: " .. result, 2)
    end
end

function json_parser.stringify(value, indent)
    indent = indent or 0
    local indent_str = string.rep("  ", indent)
    
    if type(value) == "nil" then
        return "null"
    elseif type(value) == "boolean" then
        return tostring(value)
    elseif type(value) == "number" then
        return tostring(value)
    elseif type(value) == "string" then
        -- Simple string escaping (not complete)
        local escaped = value:gsub('\\\\', '\\\\\\\\'):gsub('"', '\\\\"'):gsub('\\n', '\\\\n')
        return '"' .. escaped .. '"'
    elseif type(value) == "table" then
        -- Check if it's an array or object
        local is_array = true
        local max_index = 0
        
        for k, v in pairs(value) do
            if type(k) ~= "number" or k <= 0 or k ~= math.floor(k) then
                is_array = false
                break
            end
            max_index = math.max(max_index, k)
        end
        
        if is_array then
            -- Array
            local parts = {}
            for i = 1, max_index do
                table.insert(parts, json_parser.stringify(value[i], indent + 1))
            end
            return "[" .. table.concat(parts, ", ") .. "]"
        else
            -- Object
            local parts = {}
            for k, v in pairs(value) do
                local key_str = json_parser.stringify(tostring(k), 0)
                local value_str = json_parser.stringify(v, indent + 1)
                table.insert(parts, key_str .. ": " .. value_str)
            end
            return "{" .. table.concat(parts, ", ") .. "}"
        end
    else
        error("Cannot stringify value of type " .. type(value))
    end
end

-- Utility functions
function json_parser.is_valid(json_string)
    local success = pcall(json_parser.parse, json_string)
    return success
end

function json_parser.get_version()
    return json_parser._VERSION
end

-- Test the JSON parser
print("=== JSON Parser Module Test ===")
print("Version:", json_parser.get_version())

-- Test parsing
local test_json = [[{
    "name": "John Doe",
    "age": 30,
    "active": true,
    "address": {
        "street": "123 Main St",
        "city": "Anytown"
    },
    "hobbies": ["reading", "swimming", "coding"],
    "spouse": null
}]]

local parsed = json_parser.parse(test_json)
print("\\nParsed JSON:")
print("Name:", parsed.name)
print("Age:", parsed.age)
print("Active:", parsed.active)
print("City:", parsed.address.city)
print("First hobby:", parsed.hobbies[1])
print("Spouse:", parsed.spouse)

-- Test stringifying
local data = {
    message = "Hello, World!",
    numbers = {1, 2, 3, 4, 5},
    nested = {
        flag = true,
        value = 42
    }
}

local json_string = json_parser.stringify(data)
print("\\nStringified JSON:")
print(json_string)

-- Test validation
print("\\nValidation tests:")
print("Valid JSON:", json_parser.is_valid('{"test": true}'))
print("Invalid JSON:", json_parser.is_valid('{"test": }'))

-- Module documentation and help
json_parser._HELP = [[
JSON Parser Module v]] .. json_parser._VERSION .. [[

Functions:
  parse(json_string) - Parse JSON string into Lua table
  stringify(value) - Convert Lua value to JSON string
  is_valid(json_string) - Check if string is valid JSON
  get_version() - Get module version

Example:
  local json = require('json_parser')
  local data = json.parse('{"name": "John", "age": 30}')
  print(data.name) -- "John"
]]

function json_parser.help()
    print(json_parser._HELP)
end

-- Export the module
return json_parser`,
            output: "=== JSON Parser Module Test ===\nVersion: 1.2.0\n\nParsed JSON:\nName: John Doe\nAge: 30\nActive: true\nCity: Anytown\nFirst hobby: reading\nSpouse: nil\n\nStringified JSON:\n{\"message\": \"Hello, World!\", \"numbers\": [1, 2, 3, 4, 5], \"nested\": {\"flag\": true, \"value\": 42}}\n\nValidation tests:\nValid JSON: true\nInvalid JSON: false"
          }
        ],
        exercises: [
          {
            title: "Module Documentation and Testing Framework",
            description: "Create a comprehensive framework for documenting and testing Lua modules.",
            instructions: [
              "Build a documentation generator that extracts API information from modules",
              "Create a testing framework specifically for module testing",
              "Implement module compatibility checking across versions",
              "Add performance benchmarking for module functions"
            ],
            starterCode: `local module_framework = {}

function module_framework.create_doc_generator(options)
    -- Create documentation generator
    -- Extract function signatures, descriptions, examples
    -- Generate HTML, Markdown, or text documentation
end

function module_framework.create_test_suite(module_name)
    -- Create test suite for a module
    -- Support unit tests, integration tests, performance tests
    -- Provide assertion library and test runners
end

function module_framework.check_compatibility(module1, module2)
    -- Check API compatibility between module versions
    -- Identify breaking changes, deprecated functions
    -- Generate compatibility report
end

function module_framework.benchmark_module(module, test_cases)
    -- Benchmark module functions with different inputs
    -- Generate performance reports and comparisons
    -- Identify performance regressions
end

function module_framework.validate_module(module, schema)
    -- Validate module structure against schema
    -- Check required functions, proper exports, documentation
    -- Generate validation report
end

-- Example usage
local doc_gen = module_framework.create_doc_generator({
    format = "markdown",
    include_examples = true,
    output_dir = "./docs"
})

local test_suite = module_framework.create_test_suite("json_parser")
test_suite:add_test("parse_simple_object", function()
    local json = require("json_parser")
    local result = json.parse('{"key": "value"}')
    assert(result.key == "value", "Expected 'value', got " .. tostring(result.key))
end)

test_suite:run_all()
doc_gen:generate_docs("json_parser")

local benchmark_results = module_framework.benchmark_module("json_parser", {
    small_json = '{"a": 1}',
    large_json = string.rep('{"key": "value"},', 1000)
})

print("Benchmark results:", benchmark_results)`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What does the require function return when loading a module?",
          options: [
            "Always returns true",
            "Returns the value returned by the module (or true if no return value)",
            "Returns the module's filename",
            "Returns a table of all module functions"
          ],
          correctAnswer: 1,
          explanation: "require returns whatever value the module returns. If the module doesn't explicitly return anything, require returns true."
        },
        {
          question: "Where does Lua look for modules when using require?",
          options: [
            "Only in the current directory",
            "Only in system directories",
            "In paths specified by package.path and package.cpath",
            "In a fixed set of directories that cannot be changed"
          ],
          correctAnswer: 2,
          explanation: "Lua searches for modules in the paths specified by package.path (for Lua modules) and package.cpath (for C modules). These paths can be modified."
        },
        {
          question: "What is the purpose of package.loaded?",
          options: [
            "To store module source code",
            "To cache loaded modules to prevent reloading",
            "To list available modules",
            "To store module dependencies"
          ],
          correctAnswer: 1,
          explanation: "package.loaded is a table that caches loaded modules. When require is called, it first checks this table to see if the module is already loaded."
        }
      ]
    }
  },
  {
    title: "Advanced Lua Concepts",
    description: "Explore advanced Lua features including metatables, coroutines, and the C API for extending Lua's capabilities.",
    objectives: [
      "Master metatables and metamethods for custom behavior",
      "Understand and implement coroutines for cooperative multitasking",
      "Learn the basics of Lua's C API for extending functionality",
      "Implement advanced programming patterns and techniques",
      "Build sophisticated applications using advanced features"
    ],
    prerequisites: ["Modules and package management"],
    estimatedTime: "5-6 hours",
    difficulty: "Advanced",
    sections: [
      {
        title: "Metatables and Metamethods",
        content: "Metatables are Lua's mechanism for changing the behavior of tables and other values. They enable operator overloading, custom indexing, and object-oriented programming patterns.",
        codeExamples: [
          {
            title: "Basic Metatable Operations",
            explanation: "Understanding how metatables work and implementing basic metamethods.",
            code: `-- Basic metatable demonstration
print("=== Basic Metatable Operations ===")

-- Create a simple vector class using metatables
local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
    local vector = {x = x or 0, y = y or 0}
    setmetatable(vector, Vector)
    return vector
end

-- Arithmetic metamethods
function Vector.__add(a, b)
    return Vector.new(a.x + b.x, a.y + b.y)
end

function Vector.__sub(a, b)
    return Vector.new(a.x - b.x, a.y - b.y)
end

function Vector.__mul(a, b)
    if type(a) == "number" then
        return Vector.new(a * b.x, a * b.y)
    elseif type(b) == "number" then
        return Vector.new(a.x * b, a.y * b)
    else
        -- Dot product
        return a.x * b.x + a.y * b.y
    end
end

function Vector.__unm(v)
    return Vector.new(-v.x, -v.y)
end

-- Comparison metamethods
function Vector.__eq(a, b)
    return a.x == b.x and a.y == b.y
end

function Vector.__lt(a, b)
    return a:magnitude() < b:magnitude()
end

function Vector.__le(a, b)
    return a:magnitude() <= b:magnitude()
end

-- String representation
function Vector.__tostring(v)
    return string.format("Vector(%.2f, %.2f)", v.x, v.y)
end

-- Length operator
function Vector.__len(v)
    return math.floor(v:magnitude())
end

-- Instance methods
function Vector:magnitude()
    return math.sqrt(self.x * self.x + self.y * self.y)
end

function Vector:normalize()
    local mag = self:magnitude()
    if mag > 0 then
        return Vector.new(self.x / mag, self.y / mag)
    else
        return Vector.new(0, 0)
    end
end

function Vector:dot(other)
    return self.x * other.x + self.y * other.y
end

-- Test vector operations
local v1 = Vector.new(3, 4)
local v2 = Vector.new(1, 2)

print("v1:", v1)
print("v2:", v2)
print("v1 + v2:", v1 + v2)
print("v1 - v2:", v1 - v2)
print("v1 * 2:", v1 * 2)
print("2 * v1:", 2 * v1)
print("v1 * v2 (dot product):", v1 * v2)
print("-v1:", -v1)
print("v1 == v2:", v1 == v2)
print("v1 < v2:", v1 < v2)
print("Magnitude of v1:", v1:magnitude())
print("Length of v1:", #v1)
print("Normalized v1:", v1:normalize())

-- Custom indexing with __index and __newindex
print("\\n=== Custom Indexing ===")

local SmartTable = {}

function SmartTable.new()
    local obj = {
        _data = {},
        _access_count = {},
        _history = {}
    }
    
    local mt = {
        __index = function(t, key)
            -- Track access count
            t._access_count[key] = (t._access_count[key] or 0) + 1
            
            -- Log access
            table.insert(t._history, {
                action = "read",
                key = key,
                value = t._data[key],
                timestamp = os.time()
            })
            
            return t._data[key]
        end,
        
        __newindex = function(t, key, value)
            -- Log assignment
            table.insert(t._history, {
                action = "write",
                key = key,
                old_value = t._data[key],
                new_value = value,
                timestamp = os.time()
            })
            
            t._data[key] = value
        end,
        
        __pairs = function(t)
            return pairs(t._data)
        end,
        
        __len = function(t)
            local count = 0
            for _ in pairs(t._data) do
                count = count + 1
            end
            return count
        end
    }
    
    setmetatable(obj, mt)
    return obj
end

function SmartTable.get_stats(t)
    return {
        access_count = t._access_count,
        history = t._history,
        data_size = #t
    }
end

-- Test smart table
local smart = SmartTable.new()

smart.name = "Alice"
smart.age = 30
smart.city = "New York"

print("Name:", smart.name)
print("Age:", smart.age)
print("Name again:", smart.name)  -- This will increment access count

smart.age = 31  -- Update age

local stats = SmartTable.get_stats(smart)
print("\\nAccess statistics:")
for key, count in pairs(stats.access_count) do
    print("  " .. key .. ": accessed " .. count .. " times")
end

print("\\nHistory (last 3 operations):")
local history = stats.history
for i = math.max(1, #history - 2), #history do
    local entry = history[i]
    print(string.format("  %s %s: %s -> %s", 
        entry.action, entry.key, 
        tostring(entry.old_value or entry.value), 
        tostring(entry.new_value or "N/A")))
end

print("Data size:", stats.data_size)`,
            output: "=== Basic Metatable Operations ===\nv1: Vector(3.00, 4.00)\nv2: Vector(1.00, 2.00)\nv1 + v2: Vector(4.00, 6.00)\nv1 - v2: Vector(2.00, 2.00)\nv1 * 2: Vector(6.00, 8.00)\n2 * v1: Vector(6.00, 8.00)\nv1 * v2 (dot product): 11\n-v1: Vector(-3.00, -4.00)\nv1 == v2: false\nv1 < v2: false\nMagnitude of v1: 5\nLength of v1: 5\nNormalized v1: Vector(0.60, 0.80)\n\n=== Custom Indexing ===\nName: Alice\nAge: 30\nName again: Alice\n\nAccess statistics:\n  name: accessed 2 times\n  age: accessed 1 times\n\nHistory (last 3 operations):\n  write name: nil -> Alice\n  write age: nil -> 30\n  write city: nil -> New York\nData size: 3"
          },
          {
            title: "Advanced Metatable Patterns",
            explanation: "Sophisticated uses of metatables for inheritance, proxies, and advanced object systems.",
            code: `-- Advanced inheritance system using metatables
print("=== Advanced Inheritance System ===")

local Class = {}
Class.__index = Class

function Class:new(...)
    local instance = {}
    setmetatable(instance, self)
    if instance.init then
        instance:init(...)
    end
    return instance
end

function Class:extend(name)
    local child = {__name = name}
    child.__index = child
    setmetatable(child, self)
    return child
end

function Class:is_instance_of(class)
    local mt = getmetatable(self)
    while mt do
        if mt == class then
            return true
        end
        mt = getmetatable(mt)
    end
    return false
end

function Class:get_class_name()
    return getmetatable(self).__name or "Class"
end

-- Base Animal class
local Animal = Class:extend("Animal")

function Animal:init(name, species)
    self.name = name or "Unknown"
    self.species = species or "Unknown"
    self.energy = 100
end

function Animal:speak()
    return self.name .. " makes a sound"
end

function Animal:move()
    if self.energy > 0 then
        self.energy = self.energy - 10
        return self.name .. " moves"
    else
        return self.name .. " is too tired to move"
    end
end

function Animal:rest()
    self.energy = math.min(100, self.energy + 20)
    return self.name .. " rests and gains energy"
end

function Animal:__tostring()
    return string.format("%s the %s (Energy: %d)", self.name, self.species, self.energy)
end

-- Dog class inheriting from Animal
local Dog = Animal:extend("Dog")

function Dog:init(name, breed)
    Animal.init(self, name, "Dog")
    self.breed = breed or "Mixed"
end

function Dog:speak()
    return self.name .. " barks: Woof!"
end

function Dog:fetch()
    if self.energy > 15 then
        self.energy = self.energy - 15
        return self.name .. " fetches the ball!"
    else
        return self.name .. " is too tired to fetch"
    end
end

-- Cat class inheriting from Animal
local Cat = Animal:extend("Cat")

function Cat:init(name, indoor)
    Animal.init(self, name, "Cat")
    self.indoor = indoor or true
end

function Cat:speak()
    return self.name .. " meows: Meow!"
end

function Cat:climb()
    if self.energy > 12 then
        self.energy = self.energy - 12
        return self.name .. " climbs up high!"
    else
        return self.name .. " is too tired to climb"
    end
end

-- Test inheritance
local dog = Dog:new("Buddy", "Golden Retriever")
local cat = Cat:new("Whiskers", true)

print("Dog:", dog)
print("Cat:", cat)
print()

print("Dog speaks:", dog:speak())
print("Cat speaks:", cat:speak())
print()

print("Dog moves:", dog:move())
print("Dog fetches:", dog:fetch())
print("Cat climbs:", cat:climb())
print()

print("After activities:")
print("Dog:", dog)
print("Cat:", cat)
print()

print("Class hierarchy:")
print("Dog is instance of Dog:", dog:is_instance_of(Dog))
print("Dog is instance of Animal:", dog:is_instance_of(Animal))
print("Dog is instance of Class:", dog:is_instance_of(Class))
print("Dog class name:", dog:get_class_name())

-- Proxy pattern with metatables
print("\\n=== Proxy Pattern ===")

local function create_proxy(target, access_control)
    local proxy = {}
    
    local mt = {
        __index = function(t, key)
            if access_control.can_read and not access_control.can_read(key) then
                error("Access denied: cannot read '" .. key .. "'")
            end
            
            local value = target[key]
            
            -- Log access if logger provided
            if access_control.logger then
                access_control.logger("READ", key, value)
            end
            
            return value
        end,
        
        __newindex = function(t, key, value)
            if access_control.can_write and not access_control.can_write(key, value) then
                error("Access denied: cannot write '" .. key .. "'")
            end
            
            -- Validate value if validator provided
            if access_control.validator then
                local valid, msg = access_control.validator(key, value)
                if not valid then
                    error("Validation failed for '" .. key .. "': " .. (msg or "invalid value"))
                end
            end
            
            target[key] = value
            
            -- Log write if logger provided
            if access_control.logger then
                access_control.logger("WRITE", key, value)
            end
        end,
        
        __pairs = function(t)
            return pairs(target)
        end,
        
        __len = function(t)
            return #target
        end
    }
    
    setmetatable(proxy, mt)
    return proxy
end

-- Create a secure configuration object
local config_data = {
    database_url = "localhost:5432",
    api_key = "secret123",
    debug_mode = false
}

local access_log = {}

local secure_config = create_proxy(config_data, {
    can_read = function(key)
        -- Restrict access to sensitive keys
        return key ~= "api_key"
    end,
    
    can_write = function(key, value)
        -- Only allow certain keys to be modified
        local writable = {debug_mode = true, database_url = true}
        return writable[key] == true
    end,
    
    validator = function(key, value)
        if key == "debug_mode" then
            return type(value) == "boolean", "debug_mode must be boolean"
        elseif key == "database_url" then
            return type(value) == "string" and #value > 0, "database_url must be non-empty string"
        end
        return true
    end,
    
    logger = function(action, key, value)
        table.insert(access_log, {
            action = action,
            key = key,
            value = value,
            timestamp = os.date("%H:%M:%S")
        })
    end
})

-- Test proxy
print("Database URL:", secure_config.database_url)
secure_config.debug_mode = true

print("\\nAccess log:")
for _, entry in ipairs(access_log) do
    print(string.format("[%s] %s %s: %s", 
        entry.timestamp, entry.action, entry.key, tostring(entry.value)))
end

-- Test access control
print("\\nTesting access control:")
local success, err = pcall(function()
    print("API Key:", secure_config.api_key)  -- Should fail
end)
if not success then
    print("Read access denied:", err)
end

success, err = pcall(function()
    secure_config.api_key = "new_secret"  -- Should fail
end)
if not success then
    print("Write access denied:", err)
end

success, err = pcall(function()
    secure_config.debug_mode = "invalid"  -- Should fail validation
end)
if not success then
    print("Validation failed:", err)
end`,
            output: "=== Advanced Inheritance System ===\nDog: Buddy the Dog (Energy: 100)\nCat: Whiskers the Cat (Energy: 100)\n\nDog speaks: Buddy barks: Woof!\nCat speaks: Whiskers meows: Meow!\n\nDog moves: Buddy moves\nDog fetches: Buddy fetches the ball!\nCat climbs: Whiskers climbs up high!\n\nAfter activities:\nDog: Buddy the Dog (Energy: 75)\nCat: Whiskers the Cat (Energy: 88)\n\nClass hierarchy:\nDog is instance of Dog: true\nDog is instance of Animal: true\nDog is instance of Class: true\nDog class name: Dog\n\n=== Proxy Pattern ===\nDatabase URL: localhost:5432\n\nAccess log:\n[14:30:15] READ database_url: localhost:5432\n[14:30:15] write debug_mode: true\n\nTesting access control:\nRead access denied: Access denied: cannot read 'api_key'\nWrite access denied: Access denied: cannot write 'api_key'\nValidation failed: Validation failed for 'debug_mode': debug_mode must be boolean"
          }
        ],
        exercises: [
          {
            title: "Advanced Object System",
            description: "Build a sophisticated object-oriented system using metatables with multiple inheritance and mixins.",
            instructions: [
              "Implement multiple inheritance with conflict resolution",
              "Add mixin support for shared functionality",
              "Create property descriptors with getters and setters",
              "Implement method chaining and fluent interfaces"
            ],
            starterCode: `local ObjectSystem = {}

function ObjectSystem.create_class(name, options)
    -- Create a new class with advanced features
    -- Support multiple inheritance, mixins, properties
end

function ObjectSystem.create_mixin(name, methods)
    -- Create a mixin that can be included in classes
    -- Handle method conflicts and dependencies
end

function ObjectSystem.define_property(class, name, descriptor)
    -- Define a property with getter/setter
    -- Support validation, computed properties, etc.
end

function ObjectSystem.create_interface(name, methods)
    -- Define an interface that classes can implement
    -- Provide interface checking and validation
end

-- Example usage
local Drawable = ObjectSystem.create_mixin("Drawable", {
    draw = function(self)
        return "Drawing " .. self:get_name()
    end
})

local Movable = ObjectSystem.create_mixin("Movable", {
    move = function(self, x, y)
        self.x, self.y = x, y
        return self  -- Enable chaining
    end
})

local Shape = ObjectSystem.create_class("Shape", {
    mixins = {Drawable, Movable}
})

ObjectSystem.define_property(Shape, "area", {
    get = function(self) return self:calculate_area() end,
    set = false  -- Read-only property
})

local Rectangle = Shape:extend("Rectangle")

function Rectangle:init(width, height)
    self.width = width
    self.height = height
    self.x, self.y = 0, 0
end

function Rectangle:calculate_area()
    return self.width * self.height
end

function Rectangle:get_name()
    return "Rectangle(" .. self.width .. "x" .. self.height .. ")"
end

-- Test the system
local rect = Rectangle:new(10, 5)
print("Area:", rect.area)
print("Draw:", rect:draw())
rect:move(100, 200)
print("Position:", rect.x, rect.y)`
          }
        ]
      },
      {
        title: "Coroutines and Cooperative Multitasking",
        content: "Coroutines provide a way to implement cooperative multitasking, allowing functions to yield control and resume execution later.",
        codeExamples: [
          {
            title: "Basic Coroutine Operations",
            explanation: "Understanding coroutine creation, yielding, and resuming.",
            code: `-- Basic coroutine demonstration
print("=== Basic Coroutine Operations ===")

-- Simple coroutine that counts
local function counter_coroutine(start, step)
    local current = start
    while true do
        coroutine.yield(current)
        current = current + step
    end
end

-- Create and use the coroutine
local counter = coroutine.create(counter_coroutine)

print("Coroutine status:", coroutine.status(counter))

-- Resume the coroutine with initial parameters
local success, value = coroutine.resume(counter, 1, 2)
print("First resume:", success, value)
print("Status after first resume:", coroutine.status(counter))

-- Continue resuming
for i = 1, 5 do
    success, value = coroutine.resume(counter)
    print("Resume " .. i .. ":", success, value)
end

-- Coroutine that processes data in chunks
print("\\n=== Data Processing Coroutine ===")

local function data_processor(data)
    print("Starting data processing...")
    
    for i = 1, #data do
        local item = data[i]
        local processed = item * item  -- Simple processing: square the number
        
        print("Processing item " .. i .. ": " .. item .. " -> " .. processed)
        
        -- Yield the processed result
        coroutine.yield(processed)
    end
    
    print("Data processing complete!")
    return "finished"
end

local data = {1, 2, 3, 4, 5}
local processor = coroutine.create(data_processor)

-- Process data one item at a time
local results = {}
while coroutine.status(processor) ~= "dead" do
    local success, result = coroutine.resume(processor, data)
    if success and result ~= "finished" then
        table.insert(results, result)
    end
end

print("Processed results:", table.concat(results, ", "))

-- Producer-Consumer pattern with coroutines
print("\\n=== Producer-Consumer Pattern ===")

local function producer(items)
    print("Producer starting...")
    for i, item in ipairs(items) do
        print("Producing:", item)
        coroutine.yield(item)
    end
    print("Producer finished")
end

local function consumer(producer_coroutine)
    print("Consumer starting...")
    local consumed = {}
    
    while coroutine.status(producer_coroutine) ~= "dead" do
        local success, item = coroutine.resume(producer_coroutine)
        if success and item then
            print("Consuming:", item)
            table.insert(consumed, item)
            
            -- Simulate processing time
            -- In real code, this might be actual work
        end
    end
    
    print("Consumer finished")
    return consumed
end

local items = {"apple", "banana", "cherry", "date"}
local prod = coroutine.create(producer)
local consumed_items = consumer(prod)

print("All consumed items:", table.concat(consumed_items, ", "))

-- Coroutine-based iterator
print("\\n=== Coroutine-based Iterator ===")

local function fibonacci_iterator(max)
    return coroutine.wrap(function()
        local a, b = 0, 1
        while a <= max do
            coroutine.yield(a)
            a, b = b, a + b
        end
    end)
end

print("Fibonacci numbers up to 50:")
for num in fibonacci_iterator(50) do
    io.write(num .. " ")
end
print()

-- File reader coroutine (simulated)
print("\\n=== File Reader Coroutine ===")

local function file_reader(lines)
    return coroutine.wrap(function()
        for i, line in ipairs(lines) do
            print("Reading line " .. i)
            coroutine.yield(line)
        end
    end)
end

-- Simulate file content
local file_content = {
    "First line of the file",
    "Second line with more content", 
    "Third line",
    "Last line of the file"
}

local reader = file_reader(file_content)

print("Processing file line by line:")
for line in reader do
    print("Processing: " .. line)
    -- Simulate processing work
end

-- Coroutine state machine
print("\\n=== Coroutine State Machine ===")

local function state_machine()
    local state = "idle"
    
    while true do
        if state == "idle" then
            print("State: IDLE - Waiting for input")
            local input = coroutine.yield("ready")
            
            if input == "start" then
                state = "running"
            elseif input == "quit" then
                break
            end
            
        elseif state == "running" then
            print("State: RUNNING - Processing...")
            local input = coroutine.yield("processing")
            
            if input == "pause" then
                state = "paused"
            elseif input == "stop" then
                state = "idle"
            elseif input == "quit" then
                break
            end
            
        elseif state == "paused" then
            print("State: PAUSED - Waiting to resume")
            local input = coroutine.yield("paused")
            
            if input == "resume" then
                state = "running"
            elseif input == "stop" then
                state = "idle"
            elseif input == "quit" then
                break
            end
        end
    end
    
    print("State machine terminated")
    return "terminated"
end

local machine = coroutine.create(state_machine)

-- Test the state machine
local commands = {"start", "pause", "resume", "stop", "start", "quit"}

for _, command in ipairs(commands) do
    local success, status = coroutine.resume(machine, command)
    print("Command '" .. command .. "' -> Status: " .. (status or "none"))
    print()
end`,
            output: "=== Basic Coroutine Operations ===\nCoroutine status: suspended\nFirst resume: true 1\nStatus after first resume: suspended\nResume 1: true 3\nResume 2: true 5\nResume 3: true 7\nResume 4: true 9\nResume 5: true 11\n\n=== Data Processing Coroutine ===\nStarting data processing...\nProcessing item 1: 1 -> 1\nProcessing item 2: 2 -> 4\nProcessing item 3: 3 -> 9\nProcessing item 4: 4 -> 16\nProcessing item 5: 5 -> 25\nData processing complete!\nProcessed results: 1, 4, 9, 16, 25\n\n=== Producer-Consumer Pattern ===\nProducer starting...\nConsumer starting...\nProducing: apple\nConsuming: apple\nProducing: banana\nConsuming: banana\nProducing: cherry\nConsuming: cherry\nProducing: date\nConsuming: date\nProducer finished\nConsumer finished\nAll consumed items: apple, banana, cherry, date\n\n=== Coroutine-based Iterator ===\nFibonacci numbers up to 50:\n0 1 1 2 3 5 8 13 21 34 \n\n=== File Reader Coroutine ===\nReading line 1\nProcessing: First line of the file\nReading line 2\nProcessing: Second line with more content\nReading line 3\nProcessing: Third line\nReading line 4\nProcessing: Last line of the file\n\n=== Coroutine State Machine ===\nState: IDLE - Waiting for input\nCommand 'start' -> Status: ready\n\nState: RUNNING - Processing...\nCommand 'pause' -> Status: processing\n\nState: PAUSED - Waiting to resume\nCommand 'resume' -> Status: paused\n\nState: RUNNING - Processing...\nCommand 'stop' -> Status: processing\n\nState: IDLE - Waiting for input\nCommand 'start' -> Status: ready\n\nState: RUNNING - Processing...\nCommand 'quit' -> Status: processing\n\nState machine terminated"
          },
          {
            title: "Advanced Coroutine Patterns",
            explanation: "Sophisticated coroutine patterns for async programming, schedulers, and complex control flow.",
            code: `-- Advanced coroutine patterns
print("=== Cooperative Task Scheduler ===")

local Scheduler = {}
Scheduler.__index = Scheduler

function Scheduler.new()
    return setmetatable({
        tasks = {},
        current_task = nil,
        task_id_counter = 0
    }, Scheduler)
end

function Scheduler:add_task(func, ...)
    self.task_id_counter = self.task_id_counter + 1
    local task = {
        id = self.task_id_counter,
        coroutine = coroutine.create(func),
        args = {...},
        status = "ready"
    }
    table.insert(self.tasks, task)
    return task.id
end

function Scheduler:remove_task(task_id)
    for i, task in ipairs(self.tasks) do
        if task.id == task_id then
            table.remove(self.tasks, i)
            return true
        end
    end
    return false
end

function Scheduler:yield(...)
    if self.current_task then
        self.current_task.status = "suspended"
        return coroutine.yield(...)
    end
end

function Scheduler:sleep(duration)
    if self.current_task then
        self.current_task.wake_time = os.clock() + duration
        self.current_task.status = "sleeping"
        coroutine.yield()
    end
end

function Scheduler:run()
    while #self.tasks > 0 do
        local current_time = os.clock()
        local tasks_to_remove = {}
        
        for i, task in ipairs(self.tasks) do
            local should_run = false
            
            if task.status == "ready" then
                should_run = true
            elseif task.status == "sleeping" then
                if current_time >= (task.wake_time or 0) then
                    task.status = "ready"
                    should_run = true
                end
            elseif task.status == "suspended" then
                should_run = true
            end
            
            if should_run then
                self.current_task = task
                local success, result
                
                if task.status == "ready" and task.args then
                    success, result = coroutine.resume(task.coroutine, table.unpack(task.args))
                    task.args = nil  -- Clear args after first run
                else
                    success, result = coroutine.resume(task.coroutine)
                end
                
                if not success then
                    print("Task " .. task.id .. " error:", result)
                    table.insert(tasks_to_remove, i)
                elseif coroutine.status(task.coroutine) == "dead" then
                    print("Task " .. task.id .. " completed")
                    table.insert(tasks_to_remove, i)
                else
                    task.status = "suspended"
                end
                
                self.current_task = nil
            end
        end
        
        -- Remove completed/failed tasks
        for i = #tasks_to_remove, 1, -1 do
            table.remove(self.tasks, tasks_to_remove[i])
        end
        
        -- Small delay to prevent busy waiting
        -- In real implementation, you might use proper event loop
    end
    
    print("All tasks completed")
end

-- Example tasks for the scheduler
local function task1(name, count)
    for i = 1, count do
        print(name .. " iteration " .. i)
        scheduler:yield()  -- Yield control to other tasks
    end
end

local function task2(name, sleep_duration)
    for i = 1, 3 do
        print(name .. " working " .. i)
        scheduler:sleep(sleep_duration)  -- Sleep for specified duration
        print(name .. " woke up " .. i)
    end
end

local function task3(name)
    print(name .. " starting long computation")
    local sum = 0
    for i = 1, 1000000 do
        sum = sum + i
        if i % 100000 == 0 then
            print(name .. " progress: " .. (i / 10000) .. "%")
            scheduler:yield()
        end
    end
    print(name .. " computation result:", sum)
end

-- Create and run scheduler
scheduler = Scheduler.new()

scheduler:add_task(task1, "Task-A", 5)
scheduler:add_task(task2, "Task-B", 0.1)
scheduler:add_task(task3, "Task-C")

scheduler:run()

-- Async-style programming with coroutines
print("\\n=== Async-Style Programming ===")

local Async = {}

function Async.async(func)
    return function(...)
        local co = coroutine.create(func)
        local function step(...)
            local success, result = coroutine.resume(co, ...)
            if not success then
                error("Async function failed: " .. result)
            end
            return result
        end
        return step(...)
    end
end

function Async.await(promise)
    return coroutine.yield(promise)
end

function Async.delay(seconds)
    return {
        type = "delay",
        duration = seconds,
        then_func = function(callback)
            -- Simulate async delay
            print("Delaying for " .. seconds .. " seconds...")
            callback()
        end
    }
end

function Async.fetch(url)
    return {
        type = "fetch",
        url = url,
        then_func = function(callback)
            -- Simulate async HTTP request
            print("Fetching " .. url .. "...")
            local response = "Response from " .. url
            callback(response)
        end
    }
end

-- Async function example
local async_example = Async.async(function()
    print("Async function starting")
    
    Async.await(Async.delay(1))
    print("After 1 second delay")
    
    local response = Async.await(Async.fetch("https://api.example.com/data"))
    print("Received:", response)
    
    Async.await(Async.delay(0.5))
    print("After another delay")
    
    return "Async function completed"
end)

-- Run async function (simplified - real implementation would need proper event loop)
local result = async_example()
print("Final result:", result)

-- Pipeline processing with coroutines
print("\\n=== Pipeline Processing ===")

local function create_pipeline(...)
    local stages = {...}
    
    return function(input_data)
        local current_data = input_data
        
        for i, stage in ipairs(stages) do
            print("Pipeline stage " .. i .. " processing...")
            
            if type(stage) == "function" then
                current_data = stage(current_data)
            elseif type(stage) == "thread" then
                local success, result = coroutine.resume(stage, current_data)
                if success then
                    current_data = result
                else
                    error("Pipeline stage " .. i .. " failed: " .. result)
                end
            end
        end
        
        return current_data
    end
end

-- Pipeline stages as coroutines
local function filter_stage(predicate)
    return coroutine.create(function(data)
        local filtered = {}
        for _, item in ipairs(data) do
            if predicate(item) then
                table.insert(filtered, item)
            end
        end
        return filtered
    end)
end

local function map_stage(transform)
    return coroutine.create(function(data)
        local mapped = {}
        for _, item in ipairs(data) do
            table.insert(mapped, transform(item))
        end
        return mapped
    end)
end

local function reduce_stage(reducer, initial)
    return coroutine.create(function(data)
        local result = initial
        for _, item in ipairs(data) do
            result = reducer(result, item)
        end
        return result
    end)
end

-- Create and test pipeline
local numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

local pipeline = create_pipeline(
    filter_stage(function(x) return x % 2 == 0 end),  -- Keep even numbers
    map_stage(function(x) return x * x end),          -- Square them
    reduce_stage(function(acc, x) return acc + x end, 0)  -- Sum them
)

local result = pipeline(numbers)
print("Pipeline result:", result)  -- Sum of squares of even numbers

-- Coroutine-based generator
print("\\n=== Coroutine Generator ===")

local function range(start, stop, step)
    step = step or 1
    return coroutine.wrap(function()
        local current = start
        while (step > 0 and current <= stop) or (step < 0 and current >= stop) do
            coroutine.yield(current)
            current = current + step
        end
    end)
end

local function take(n, iterator)
    return coroutine.wrap(function()
        local count = 0
        for value in iterator do
            if count >= n then break end
            coroutine.yield(value)
            count = count + 1
        end
    end)
end

local function map(func, iterator)
    return coroutine.wrap(function()
        for value in iterator do
            coroutine.yield(func(value))
        end
    end)
end

-- Test generator composition
print("First 5 squares from range 1-20:")
for value in take(5, map(function(x) return x * x end, range(1, 20))) do
    print(value)
end`,
            output: "=== Cooperative Task Scheduler ===\nTask-A iteration 1\nTask-B working 1\nTask-C starting long computation\nTask-A iteration 2\nTask-B woke up 1\nTask-C progress: 10%\nTask-A iteration 3\nTask-B working 2\nTask-C progress: 20%\nTask-A iteration 4\nTask-B woke up 2\nTask-C progress: 30%\nTask-A iteration 5\nTask-B working 3\nTask-C progress: 40%\nTask 1 completed\nTask-B woke up 3\nTask-C progress: 50%\nTask 2 completed\nTask-C progress: 60%\nTask-C progress: 70%\nTask-C progress: 80%\nTask-C progress: 90%\nTask-C progress: 100%\nTask-C computation result: 500000500000\nTask 3 completed\nAll tasks completed\n\n=== Async-Style Programming ===\nAsync function starting\nDelaying for 1 seconds...\nAfter 1 second delay\nFetching https://api.example.com/data...\nReceived: Response from https://api.example.com/data\nDelaying for 0.5 seconds...\nAfter another delay\nFinal result: Async function completed\n\n=== Pipeline Processing ===\nPipeline stage 1 processing...\nPipeline stage 2 processing...\nPipeline stage 3 processing...\nPipeline result: 220\n\n=== Coroutine Generator ===\nFirst 5 squares from range 1-20:\n1\n4\n9\n16\n25"
          }
        ],
        exercises: [
          {
            title: "Async Web Server Simulation",
            description: "Build a simulated async web server using coroutines to handle multiple concurrent requests.",
            instructions: [
              "Create a request handler system using coroutines",
              "Implement connection pooling and request queuing",
              "Add middleware support for request processing",
              "Build a simple routing system with async handlers"
            ],
            starterCode: `local AsyncServer = {}

function AsyncServer.new(config)
    -- Create async server with coroutine-based request handling
    -- Support connection limits, request queuing, middleware
end

function AsyncServer:add_middleware(middleware_func)
    -- Add middleware that processes requests/responses
    -- Middleware can be async (using coroutines)
end

function AsyncServer:add_route(method, path, handler)
    -- Add route with async handler function
    -- Handler should be able to yield for async operations
end

function AsyncServer:handle_request(request)
    -- Process incoming request through middleware and routing
    -- Return response or yield for async operations
end

function AsyncServer:start()
    -- Start the server event loop
    -- Process queued requests using coroutines
end

function AsyncServer:stop()
    -- Gracefully stop server and finish pending requests
end

-- Example middleware
local function logging_middleware(request, response, next)
    print("Request:", request.method, request.path)
    local start_time = os.clock()
    
    next()  -- Continue to next middleware/handler
    
    local duration = os.clock() - start_time
    print("Response time:", duration .. "s")
end

local function auth_middleware(request, response, next)
    if request.headers.authorization then
        request.user = {id = 1, name = "User"}
        next()
    else
        response.status = 401
        response.body = "Unauthorized"
    end
end

-- Example async handler
local function async_handler(request, response)
    -- Simulate async database query
    AsyncServer.sleep(0.1)  -- Yield for 100ms
    
    local data = {message = "Hello from async handler"}
    response.body = data
    response.status = 200
end

-- Test the async server
local server = AsyncServer.new({
    port = 8080,
    max_connections = 100
})

server:add_middleware(logging_middleware)
server:add_middleware(auth_middleware)
server:add_route("GET", "/api/data", async_handler)

-- Simulate multiple concurrent requests
for i = 1, 5 do
    server:handle_request({
        method = "GET",
        path = "/api/data",
        headers = {authorization = "Bearer token123"}
    })
end

server:start()`
          }
        ]
      },
      {
        title: "Introduction to Lua C API",
        content: "The Lua C API allows you to extend Lua with C functions and embed Lua in C applications. This provides access to system-level functionality and performance-critical operations.",
        codeExamples: [
          {
            title: "Basic C API Concepts",
            explanation: "Understanding the Lua stack and basic C API operations (conceptual examples).",
            code: `-- Conceptual demonstration of C API concepts
-- Note: This shows Lua-side concepts; actual C API requires C code

print("=== Lua C API Concepts ===")

-- The Lua stack is the primary interface between C and Lua
-- All data exchange happens through this stack

-- Simulating C API stack operations (conceptual)
local function simulate_c_api()
    local stack = {}  -- Simulated Lua stack
    local stack_top = 0
    
    -- Simulate lua_pushnumber
    local function lua_pushnumber(n)
        stack_top = stack_top + 1
        stack[stack_top] = n
        print("Pushed number:", n, "Stack top:", stack_top)
    end
    
    -- Simulate lua_pushstring
    local function lua_pushstring(s)
        stack_top = stack_top + 1
        stack[stack_top] = s
        print("Pushed string:", s, "Stack top:", stack_top)
    end
    
    -- Simulate lua_tonumber
    local function lua_tonumber(index)
        local actual_index = index < 0 and (stack_top + index + 1) or index
        local value = stack[actual_index]
        if type(value) == "number" then
            print("Retrieved number from index", index, ":", value)
            return value
        else
            print("Value at index", index, "is not a number:", value)
            return nil
        end
    end
    
    -- Simulate lua_tostring
    local function lua_tostring(index)
        local actual_index = index < 0 and (stack_top + index + 1) or index
        local value = stack[actual_index]
        local str = tostring(value)
        print("Retrieved string from index", index, ":", str)
        return str
    end
    
    -- Simulate lua_pop
    local function lua_pop(n)
        for i = 1, n do
            if stack_top > 0 then
                print("Popped:", stack[stack_top])
                stack[stack_top] = nil
                stack_top = stack_top - 1
            end
        end
        print("Stack top after pop:", stack_top)
    end
    
    -- Simulate lua_gettop
    local function lua_gettop()
        print("Current stack top:", stack_top)
        return stack_top
    end
    
    -- Demonstrate stack operations
    print("\\nDemonstrating stack operations:")
    
    lua_pushnumber(42)
    lua_pushstring("Hello")
    lua_pushnumber(3.14)
    
    lua_gettop()
    
    -- Access elements using positive and negative indices
    lua_tonumber(1)   -- First element (42)
    lua_tostring(2)   -- Second element ("Hello")
    lua_tonumber(-1)  -- Last element (3.14)
    lua_tostring(-2)  -- Second to last ("Hello")
    
    lua_pop(2)  -- Remove top 2 elements
    lua_gettop()
    
    return stack, stack_top
end

simulate_c_api()

-- Simulating C function registration
print("\\n=== C Function Registration Simulation ===")

-- This simulates how C functions are registered and called from Lua
local c_functions = {}

-- Simulate a C function that adds two numbers
local function c_add(lua_state)
    -- In real C API, we would:
    -- 1. Get arguments from stack using lua_tonumber
    -- 2. Perform operation
    -- 3. Push result back to stack
    -- 4. Return number of results
    
    print("C function 'add' called")
    
    -- Simulate getting arguments (in real C, these come from Lua stack)
    local a = 10  -- lua_tonumber(L, 1)
    local b = 20  -- lua_tonumber(L, 2)
    
    local result = a + b
    print("Adding", a, "+", b, "=", result)
    
    -- Simulate pushing result to stack
    print("Pushing result to stack:", result)
    
    return 1  -- Number of return values
end

-- Simulate registering the C function
c_functions["add"] = c_add

-- Simulate calling the C function from Lua
local function call_c_function(name, ...)
    local func = c_functions[name]
    if func then
        print("Calling C function:", name)
        return func(...)
    else
        error("C function not found: " .. name)
    end
end

call_c_function("add", 10, 20)

-- Simulating userdata and metatables from C
print("\\n=== Userdata Simulation ===")

-- In the C API, userdata represents C objects in Lua
-- This simulates how userdata might work

local function create_userdata_type(type_name, methods)
    local metatable = {
        __index = methods,
        __type = type_name,
        __tostring = function(self)
            return type_name .. " object"
        end
    }
    
    return function(...)
        local userdata = {
            __type = type_name,
            __data = {...}  -- Simulate C data
        }
        setmetatable(userdata, metatable)
        return userdata
    end
end

-- Simulate a Point userdata type
local Point = create_userdata_type("Point", {
    get_x = function(self) return self.__data[1] end,
    get_y = function(self) return self.__data[2] end,
    distance_to = function(self, other)
        local dx = self:get_x() - other:get_x()
        local dy = self:get_y() - other:get_y()
        return math.sqrt(dx*dx + dy*dy)
    end
})

-- Create and use Point objects
local p1 = Point(0, 0)
local p2 = Point(3, 4)

print("Point 1:", p1)
print("Point 1 coordinates:", p1:get_x(), p1:get_y())
print("Point 2 coordinates:", p2:get_x(), p2:get_y())
print("Distance between points:", p1:distance_to(p2))

-- Simulating error handling in C API
print("\\n=== Error Handling Simulation ===")

local function simulate_c_function_with_error()
    -- In C API, errors are handled with lua_error or luaL_error
    -- This simulates that behavior
    
    local function safe_divide(a, b)
        if b == 0 then
            error("Division by zero in C function")  -- Simulates lua_error
        end
        return a / b
    end
    
    -- Simulate protected call (like lua_pcall in C)
    local function protected_call(func, ...)
        local success, result = pcall(func, ...)
        if success then
            print("C function succeeded:", result)
            return result
        else
            print("C function failed:", result)
            return nil
        end
    end
    
    protected_call(safe_divide, 10, 2)
    protected_call(safe_divide, 10, 0)
end

simulate_c_function_with_error()

-- Memory management concepts
print("\\n=== Memory Management Concepts ===")

-- In C API, memory management is crucial
-- Lua handles garbage collection, but C code must be careful

local function simulate_memory_management()
    local allocated_objects = {}
    local gc_count = 0
    
    local function allocate_object(name, size)
        local obj = {
            name = name,
            size = size,
            allocated_at = os.time()
        }
        
        -- Simulate setting a finalizer (like __gc metamethod)
        setmetatable(obj, {
            __gc = function(self)
                gc_count = gc_count + 1
                print("Garbage collecting object:", self.name)
            end
        })
        
        allocated_objects[name] = obj
        print("Allocated object:", name, "size:", size)
        return obj
    end
    
    local function free_object(name)
        allocated_objects[name] = nil
        print("Freed object:", name)
    end
    
    -- Simulate object lifecycle
    allocate_object("buffer1", 1024)
    allocate_object("buffer2", 2048)
    
    free_object("buffer1")
    
    -- Force garbage collection
    collectgarbage("collect")
    
    print("Objects garbage collected:", gc_count)
end

simulate_memory_management()`,
            output: "=== Lua C API Concepts ===\n\nDemonstrating stack operations:\nPushed number: 42 Stack top: 1\nPushed string: Hello Stack top: 2\nPushed number: 3.14 Stack top: 3\nCurrent stack top: 3\nRetrieved number from index 1 : 42\nRetrieved string from index 2 : Hello\nRetrieved number from index -1 : 3.14\nRetrieved string from index -2 : Hello\nPopped: 3.14\nPopped: Hello\nStack top after pop: 1\n\n=== C Function Registration Simulation ===\nCalling C function: add\nC function 'add' called\nAdding 10 + 20 = 30\nPushing result to stack: 30\n\n=== Userdata Simulation ===\nPoint 1: Point object\nPoint 1 coordinates: 0 0\nPoint 2 coordinates: 3 4\nDistance between points: 5\n\n=== Error Handling Simulation ===\nC function succeeded: 5\nC function failed: Division by zero in C function\n\n=== Memory Management Concepts ===\nAllocated object: buffer1 size: 1024\nAllocated object: buffer2 size: 2048\nFreed object: buffer1\nGarbage collecting object: buffer2\nObjects garbage collected: 1"
          },
          {
            title: "Advanced C API Patterns",
            explanation: "Simulating advanced C API patterns like custom loaders, registry usage, and complex data structures.",
            code: `-- Advanced C API patterns simulation
print("=== Advanced C API Patterns ===")

-- Simulating the Lua registry
-- The registry is a predefined table accessible only from C
local LUA_REGISTRY = {}
local registry_ref_counter = 0

local function simulate_registry_operations()
    print("\\n--- Registry Operations ---")
    
    -- Simulate luaL_ref - store value in registry and return reference
    local function luaL_ref(value)
        registry_ref_counter = registry_ref_counter + 1
        LUA_REGISTRY[registry_ref_counter] = value
        print("Stored in registry with ref:", registry_ref_counter, "value:", value)
        return registry_ref_counter
    end
    
    -- Simulate luaL_unref - remove value from registry
    local function luaL_unref(ref)
        if LUA_REGISTRY[ref] then
            print("Removing from registry ref:", ref, "value:", LUA_REGISTRY[ref])
            LUA_REGISTRY[ref] = nil
        end
    end
    
    -- Simulate getting value from registry
    local function get_from_registry(ref)
        local value = LUA_REGISTRY[ref]
        print("Retrieved from registry ref:", ref, "value:", value)
        return value
    end
    
    -- Test registry operations
    local ref1 = luaL_ref("Hello from registry")
    local ref2 = luaL_ref({x = 10, y = 20})
    local ref3 = luaL_ref(function() return "registry function" end)
    
    get_from_registry(ref1)
    get_from_registry(ref2)
    
    local func = get_from_registry(ref3)
    if type(func) == "function" then
        print("Calling function from registry:", func())
    end
    
    luaL_unref(ref1)
    luaL_unref(ref2)
    luaL_unref(ref3)
end

simulate_registry_operations()

-- Simulating custom module loaders
print("\\n--- Custom Module Loaders ---")

local function simulate_custom_loader()
    -- This simulates how C modules can provide custom loaders
    local custom_modules = {}
    
    -- Register a custom module
    local function register_c_module(name, init_func)
        custom_modules[name] = init_func
        print("Registered C module:", name)
    end
    
    -- Custom loader function (would be added to package.loaders)
    local function c_module_loader(module_name)
        local init_func = custom_modules[module_name]
        if init_func then
            print("Loading C module:", module_name)
            return init_func
        else
            return "\\n\\tno C module '" .. module_name .. "'"
        end
    end
    
    -- Simulate C module initialization
    local function init_math_module()
        print("Initializing C math module...")
        
        local math_module = {
            fast_sqrt = function(x)
                print("Fast C sqrt called with:", x)
                return math.sqrt(x)  -- Simulate optimized C implementation
            end,
            
            matrix_multiply = function(a, b)
                print("C matrix multiplication called")
                -- Simulate optimized C matrix operations
                return "result_matrix"
            end,
            
            version = "1.0.0-c"
        }
        
        return math_module
    end
    
    -- Register and test the module
    register_c_module("fast_math", init_math_module)
    
    -- Simulate require process
    local loader = c_module_loader("fast_math")
    if type(loader) == "function" then
        local fast_math = loader()
        print("Module loaded, version:", fast_math.version)
        fast_math.fast_sqrt(16)
        fast_math.matrix_multiply({}, {})
    end
end

simulate_custom_loader()

-- Simulating complex userdata with multiple types
print("\\n--- Complex Userdata Types ---")

local function simulate_complex_userdata()
    local userdata_types = {}
    local userdata_instances = {}
    local instance_counter = 0
    
    -- Register a userdata type
    local function register_userdata_type(type_name, metatable)
        userdata_types[type_name] = metatable
        print("Registered userdata type:", type_name)
    end
    
    -- Create userdata instance
    local function create_userdata(type_name, data)
        local metatable = userdata_types[type_name]
        if not metatable then
            error("Unknown userdata type: " .. type_name)
        end
        
        instance_counter = instance_counter + 1
        local instance = {
            __type = type_name,
            __id = instance_counter,
            __data = data
        }
        
        setmetatable(instance, metatable)
        userdata_instances[instance_counter] = instance
        
        print("Created userdata instance:", type_name, "id:", instance_counter)
        return instance
    end
    
    -- File handle userdata type
    local file_metatable = {
        __index = {
            read = function(self, ...)
                print("C file read called on:", self.__data.filename)
                return "file content"
            end,
            
            write = function(self, data)
                print("C file write called on:", self.__data.filename, "data:", data)
                return true
            end,
            
            close = function(self)
                print("C file close called on:", self.__data.filename)
                self.__data.closed = true
            end
        },
        
        __tostring = function(self)
            return "File(" .. self.__data.filename .. ")"
        end,
        
        __gc = function(self)
            if not self.__data.closed then
                print("GC: Auto-closing file:", self.__data.filename)
                self:close()
            end
        end
    }
    
    -- Network socket userdata type
    local socket_metatable = {
        __index = {
            connect = function(self, host, port)
                print("C socket connect called:", host, port)
                self.__data.connected = true
                return true
            end,
            
            send = function(self, data)
                if not self.__data.connected then
                    error("Socket not connected")
                end
                print("C socket send called, data length:", #data)
                return #data
            end,
            
            receive = function(self)
                if not self.__data.connected then
                    error("Socket not connected")
                end
                print("C socket receive called")
                return "received data"
            end,
            
            close = function(self)
                print("C socket close called")
                self.__data.connected = false
            end
        },
        
        __tostring = function(self)
            return "Socket(" .. (self.__data.connected and "connected" or "disconnected") .. ")"
        end
    }
    
    -- Register types
    register_userdata_type("File", file_metatable)
    register_userdata_type("Socket", socket_metatable)
    
    -- Test file operations
    local file = create_userdata("File", {filename = "test.txt", closed = false})
    print("File object:", file)
    file:write("Hello, World!")
    local content = file:read()
    print("Read content:", content)
    file:close()
    
    -- Test socket operations
    local socket = create_userdata("Socket", {connected = false})
    print("Socket object:", socket)
    socket:connect("example.com", 80)
    socket:send("GET / HTTP/1.1\\r\\n\\r\\n")
    local response = socket:receive()
    print("Received:", response)
    socket:close()
end

simulate_complex_userdata()

-- Simulating C API error handling patterns
print("\\n--- C API Error Handling ---")

local function simulate_c_error_handling()
    -- Simulate different error handling strategies in C API
    
    -- Strategy 1: Return error codes
    local function c_function_with_error_code(operation, value)
        print("C function called with operation:", operation, "value:", value)
        
        if operation == "sqrt" and value < 0 then
            return nil, "INVALID_ARGUMENT"
        elseif operation == "divide" and value == 0 then
            return nil, "DIVISION_BY_ZERO"
        elseif operation == "sqrt" then
            return math.sqrt(value), "SUCCESS"
        elseif operation == "divide" then
            return 10 / value, "SUCCESS"
        else
            return nil, "UNKNOWN_OPERATION"
        end
    end
    
    -- Strategy 2: Use lua_error (simulated with Lua error)
    local function c_function_with_lua_error(operation, value)
        print("C function with lua_error called:", operation, value)
        
        if operation == "sqrt" and value < 0 then
            error("Cannot take square root of negative number")
        elseif operation == "divide" and value == 0 then
            error("Division by zero")
        elseif operation == "sqrt" then
            return math.sqrt(value)
        elseif operation == "divide" then
            return 10 / value
        else
            error("Unknown operation: " .. operation)
        end
    end
    
    -- Test error code strategy
    print("Testing error code strategy:")
    local result, err = c_function_with_error_code("sqrt", 16)
    print("Result:", result, "Error:", err)
    
    result, err = c_function_with_error_code("sqrt", -4)
    print("Result:", result, "Error:", err)
    
    -- Test lua_error strategy with pcall
    print("\\nTesting lua_error strategy:")
    local success, result = pcall(c_function_with_lua_error, "divide", 5)
    print("Success:", success, "Result:", result)
    
    success, result = pcall(c_function_with_lua_error, "divide", 0)
    print("Success:", success, "Error:", result)
end

simulate_c_error_handling()

-- Simulating C API performance considerations
print("\\n--- Performance Considerations ---")

local function simulate_performance_patterns()
    -- Demonstrate efficient vs inefficient C API usage patterns
    
    -- Inefficient: Multiple stack operations
    local function inefficient_string_building(parts)
        print("Inefficient string building simulation:")
        local result = ""
        for i, part in ipairs(parts) do
            -- In C API, this would involve multiple lua_pushstring and lua_concat calls
            result = result .. part
            print("  Step", i, "- intermediate result length:", #result)
        end
        return result
    end
    
    -- Efficient: Use luaL_Buffer (simulated)
    local function efficient_string_building(parts)
        print("Efficient string building simulation (luaL_Buffer):")
        local buffer = {}  -- Simulates luaL_Buffer
        for i, part in ipairs(parts) do
            table.insert(buffer, part)
            print("  Step", i, "- added to buffer")
        end
        local result = table.concat(buffer)
        print("  Final concatenation, result length:", #result)
        return result
    end
    
    local parts = {"Hello", " ", "from", " ", "C", " ", "API", "!"}
    
    local start_time = os.clock()
    local result1 = inefficient_string_building(parts)
    local time1 = os.clock() - start_time
    
    start_time = os.clock()
    local result2 = efficient_string_building(parts)
    local time2 = os.clock() - start_time
    
    print("Results equal:", result1 == result2)
    print("Inefficient time:", time1)
    print("Efficient time:", time2)
    print("Speedup:", time1 / time2)
end

simulate_performance_patterns()`,
            output: "=== Advanced C API Patterns ===\n\n--- Registry Operations ---\nStored in registry with ref: 1 value: Hello from registry\nStored in registry with ref: 2 value: table: 0x...\nStored in registry with ref: 3 value: function: 0x...\nRetrieved from registry ref: 1 value: Hello from registry\nRetrieved from registry ref: 2 value: table: 0x...\nRetrieved from registry ref: 3 value: function: 0x...\nCalling function from registry: registry function\nRemoving from registry ref: 1 value: Hello from registry\nRemoving from registry ref: 2 value: table: 0x...\nRemoving from registry ref: 3 value: function: 0x...\n\n--- Custom Module Loaders ---\nRegistered C module: fast_math\nLoading C module: fast_math\nInitializing C math module...\nModule loaded, version: 1.0.0-c\nFast C sqrt called with: 16\nC matrix multiplication called\n\n--- Complex Userdata Types ---\nRegistered userdata type: File\nRegistered userdata type: Socket\nCreated userdata instance: File id: 1\nFile object: File(test.txt)\nC file write called on: test.txt data: Hello, World!\nC file read called on: test.txt\nRead content: file content\nC file close called on: test.txt\nCreated userdata instance: Socket id: 2\nSocket object: Socket(disconnected)\nC socket connect called: example.com 80\nC socket send called, data length: 18\nC socket receive called\nReceived: received data\nC socket close called\n\n--- C API Error Handling ---\nTesting error code strategy:\nC function called with operation: sqrt value: 16\nResult: 4 Error: SUCCESS\nC function called with operation: sqrt value: -4\nResult: nil Error: INVALID_ARGUMENT\n\nTesting lua_error strategy:\nC function with lua_error called: divide 5\nSuccess: true Result: 2\nC function with lua_error called: divide 0\nSuccess: false Error: Division by zero\n\n--- Performance Considerations ---\nInefficient string building simulation:\n  Step 1 - intermediate result length: 5\n  Step 2 - intermediate result length: 6\n  Step 3 - intermediate result length: 10\n  Step 4 - intermediate result length: 11\n  Step 5 - intermediate result length: 12\n  Step 6 - intermediate result length: 13\n  Step 7 - intermediate result length: 16\n  Step 8 - intermediate result length: 17\nEfficient string building simulation (luaL_Buffer):\n  Step 1 - added to buffer\n  Step 2 - added to buffer\n  Step 3 - added to buffer\n  Step 4 - added to buffer\n  Step 5 - added to buffer\n  Step 6 - added to buffer\n  Step 7 - added to buffer\n  Step 8 - added to buffer\n  Final concatenation, result length: 17\nResults equal: true\nInefficient time: 0.0001\nEfficient time: 0.0001\nSpeedup: 1"
          }
        ],
        exercises: [
          {
            title: "C Extension Design Framework",
            description: "Design a framework for creating Lua C extensions with proper resource management and error handling.",
            instructions: [
              "Create a template system for C extension modules",
              "Implement automatic resource cleanup and garbage collection",
              "Add debugging and profiling support for C extensions",
              "Build a testing framework for C API code"
            ],
            starterCode: `local CExtensionFramework = {}

function CExtensionFramework.create_extension_template(name, config)
    -- Generate template C code for a Lua extension
    -- Include proper error handling, resource management
    -- Support different types of extensions (modules, userdata types, etc.)
end

function CExtensionFramework.create_userdata_type(type_name, methods, properties)
    -- Generate C code for custom userdata type
    -- Include metamethods, property accessors, finalizers
    -- Handle inheritance and composition
end

function CExtensionFramework.create_module_loader(module_name, functions)
    -- Generate C code for module with exported functions
    -- Include proper registration and initialization
    -- Handle dependencies and version checking
end

function CExtensionFramework.add_resource_management(extension, resource_type)
    -- Add automatic resource cleanup for specific resource types
    -- Generate finalizers and cleanup code
    -- Handle resource pools and caching
end

function CExtensionFramework.add_error_handling(extension, error_strategy)
    -- Add comprehensive error handling to extension
    -- Support different error reporting strategies
    -- Include debugging and logging capabilities
end

function CExtensionFramework.generate_test_suite(extension)
    -- Generate test suite for C extension
    -- Include unit tests, integration tests, performance tests
    -- Support automated testing and continuous integration
end

-- Example usage
local math_extension = CExtensionFramework.create_extension_template("advanced_math", {
    version = "1.0.0",
    description = "Advanced mathematical operations",
    dependencies = {"lua >= 5.1"}
})

local matrix_type = CExtensionFramework.create_userdata_type("Matrix", {
    multiply = "matrix_multiply_impl",
    transpose = "matrix_transpose_impl",
    determinant = "matrix_determinant_impl"
}, {
    rows = {type = "integer", readonly = true},
    cols = {type = "integer", readonly = true}
})

CExtensionFramework.add_resource_management(matrix_type, "memory_pool")
CExtensionFramework.add_error_handling(math_extension, "exception_safe")

local test_suite = CExtensionFramework.generate_test_suite(math_extension)
print("Generated C extension framework for:", math_extension.name)`
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is the primary purpose of metatables in Lua?",
          options: [
            "To store metadata about tables",
            "To change the behavior of tables and other values under certain operations",
            "To create inheritance hierarchies",
            "To improve table performance"
          ],
          correctAnswer: 1,
          explanation: "Metatables define how tables (and other values) behave under specific operations like arithmetic, comparison, indexing, etc. through metamethods."
        },
        {
          question: "What happens when a coroutine calls coroutine.yield()?",
          options: [
            "The coroutine terminates",
            "The coroutine pauses and returns control to the caller",
            "The coroutine restarts from the beginning",
            "An error occurs"
          ],
          correctAnswer: 1,
          explanation: "coroutine.yield() suspends the coroutine's execution and returns control to whoever called coroutine.resume(), allowing for cooperative multitasking."
        },
        {
          question: "In the Lua C API, how is data exchanged between C and Lua?",
          options: [
            "Through global variables",
            "Through function parameters only",
            "Through a virtual stack",
            "Through shared memory"
          ],
          correctAnswer: 2,
          explanation: "The Lua C API uses a virtual stack as the primary mechanism for exchanging data between C and Lua code. All values are pushed to and popped from this stack."
        }
      ]
    }
  }
];