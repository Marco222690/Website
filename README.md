# Contemporary Philippine Arts from the Regions - Quiz Reviewer

A beautiful, interactive quiz reviewer for Contemporary Philippine Arts from the Regions with 7 separate subjects! 🎨

## 📁 Folder Structure

```
website/
├── index.html              # Main HTML file
├── styles.css              # All the beautiful styling
├── script.js               # Main quiz logic
├── questions/              # 📝 YOUR QUESTIONS GO HERE!
│   ├── subject1.js        # Questions for Subject 1
│   ├── subject2.js        # Questions for Subject 2
│   ├── subject3.js        # Questions for Subject 3
│   ├── subject4.js        # Questions for Subject 4
│   ├── subject5.js        # Questions for Subject 5
│   ├── subject6.js        # Questions for Subject 6
│   └── subject7.js        # Questions for Subject 7
└── README.md               # This file
```

## ✨ Features
- 7 separate subject categories
- Each subject has its own question file for easy editing
- Modern, premium design with smooth animations
- Fully responsive for mobile and desktop
- Score tracking and streak system
- Confetti animations for correct answers
- Detailed results with performance feedback

## 🎯 How to Add Questions Per Subject

### Step 1: Choose which subject to edit
Navigate to the `questions` folder and open the subject file you want to edit:
- `subject1.js` - For your first topic
- `subject2.js` - For your second topic
- And so on...

### Step 2: Add your questions

Open any subject file (e.g., `questions/subject1.js`) and add questions using this format:

```javascript
quizData.subject1 = [
    {
        question: "Your question here?",
        answers: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0  // 0 for A, 1 for B, 2 for C, 3 for D
    },
    {
        question: "Another question?",
        answers: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct: 2  // This means "Choice 3" is correct
    }
    // Add more questions...
];
```

### Important Notes:
- Each question must have exactly 4 answers
- The `correct` value is the INDEX (0-3) of the correct answer
- Don't forget the comma after each question object (except the last one)
- Each subject file is independent - edit them separately!

## 🎨 How to Customize Subject Names

### Step 1: Open `index.html`

### Step 2: Find the subject cards section (around line 62-110)

### Step 3: Change the subject names and icons:

```html
<div class="subject-card" data-subject="subject1">
    <div class="subject-card-icon">📖</div>  <!-- Change this emoji -->
    <h3>Your Subject Name</h3>               <!-- Change this title -->
    <p>Description</p>                        <!-- Change this description -->
    <div class="subject-count" id="count-subject1">0 questions</div>
</div>
```

**Available Emojis for Subjects:**
- 📖 📚 📝 🎨 🖼️ 🎭 🎪 🏛️ 🌟 🎬 🎤 🎸 🎹 🖌️ ✏️ 🖍️

## 🚀 How to Run

### Option 1: Double-click `index.html`
Simply double-click the `index.html` file to open it in your default browser.

### Option 2: Use Live Server (Recommended for Development)
If you have VS Code with Live Server extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Edit questions and see changes instantly!

## 📊 Question Count Display

The website automatically shows how many questions are in each subject:
- If a subject has 0 questions, it will say "No questions available yet"
- The count updates automatically when you refresh the page

## 🎯 Example: Complete Subject Setup

**File: `questions/subject1.js`**
```javascript
quizData.subject1 = [
    {
        question: "What is the capital of the Philippines?",
        answers: ["Cebu", "Manila", "Davao", "Quezon City"],
        correct: 1
    },
    {
        question: "Who painted the Spoliarium?",
        answers: ["Fernando Amorsolo", "Juan Luna", "Carlos Francisco", "Vicente Manansala"],
        correct: 1
    },
    {
        question: "What is 'Parol'?",
        answers: ["A dance", "A Christmas lantern", "A food", "A festival"],
        correct: 1
    }
];
```

**In `index.html`:**
```html
<div class="subject-card" data-subject="subject1">
    <div class="subject-card-icon">🎨</div>
    <h3>Philippine Art History</h3>
    <p>Arts, artists, and heritage</p>
    <div class="subject-count" id="count-subject1">0 questions</div>
</div>
```

## 💡 Tips for Creating Good Quizzes

1. ✅ **Organize by Topic**: Use each subject for a different topic or chapter
2. ✅ **Clear Questions**: Make questions specific and easy to understand
3. ✅ **One Correct Answer**: Ensure only ONE answer is clearly correct
4. ✅ **Plausible Distractors**: Make wrong answers believable but distinct
5. ✅ **Vary Difficulty**: Mix easy, medium, and hard questions
6. ✅ **Add 10+ Questions**: For a good quiz experience per subject

## 🔧 Customization

### Change Colors
Edit the CSS variables in `styles.css` (lines 13-20):
```css
:root {
    --color-primary: hsl(270, 70%, 60%);     /* Purple */
    --color-secondary: hsl(320, 85%, 65%);   /* Pink */
    --color-accent: hsl(190, 90%, 60%);      /* Cyan */
}
```

### Adjust Number of Questions Per Quiz
Edit line 97 in `script.js`:
```javascript
const numQuestions = Math.min(subjectQuestions.length, 10); // Change 10 to your desired number
```

## 🐛 Troubleshooting

**Problem**: Questions not showing
- Check that you added questions to the correct subject file
- Make sure the syntax is correct (commas, brackets, quotes)
- Check browser console (F12) for errors

**Problem**: Subject card shows 0 questions but you added them
- Refresh the page (Ctrl+R or F5)
- Make sure the question file is saved
- Check that the subject name matches (e.g., subject1, subject2)

**Problem**: Webpage not loading properly
- Make sure all files are in the correct folders
- Check that you didn't modify `script.js` accidentally
- Try opening in a different browser

## 📝 Quick Reference: Question Template

Copy and paste this template when adding new questions:

```javascript
{
    question: "Your question here?",
    answers: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0
},
```

---

Made with ❤️ for Philippine Arts education  
**Organized structure for easy editing!** 🎨✨
