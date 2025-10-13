Hrithika Ravishankar
Render Link: https://a3-hrithikaravishankar-persistence.onrender.com/

Grocery List Web App
This is a simple two-tier web app that lets users add grocery items with a category and expiration date. It should show all current items, calculates how many days until expiration (done on the server), and allows deleting items.

How to use:
1. Enter the item name, category, and expiration date in the form
2. Click "Add Item" to add it to the list
3. See the updated list below the form with days until expiration
4. Click "Delete" to remove an item from the list


********************************************************************************************************
Resources I used:
Looked at the libraries for Mongoose and Bootstrap CSS
https://mongoosejs.com/docs/connections.html

# ************************************
****** Design Achievements: ******
# ************************************
- Customized Bootstrap with my own CSS (colors, fonts, spacing).
- Used different input types: text, date, checkbox.

Color palette:
#fff8f5
#d88fa2
#ecb7c1
#f3d3da (for borders and lines)
#4a2c2a

********

Authentication:
Implemented a basic username + password authentication system: 
- If a user logs in with a new username, a new account is created
- If the username exists, the password is checked
- Wrong passwords are rejected, and correct ones allow access

CSS Framework:
- I used Bootstrap to handle most of the layout and styling. This is most present in the login page.

Express

CRAP Principles:
Contrast:
My app uses clear contrast between elements to guide attention. For example, the headings (h1) are styled in a large pink color #d88fa2, which stands out against the soft beige background #fff8f5. Buttons also contrast by using a bold pink shade #ecb7c1, which darkens on hover, making them pop against the lighter form and table backgrounds. This helps users easily identify interactive areas. Text is consistently dark brown #4a2c2a, ensuring it is legible against the white or light backgrounds. By applying these contrasts, my design highlights important areas such as form inputs, buttons, and headers while maintaining an aesthetic, cohesive style.

Repetition
I use repetition in both design and layout to create consistency across the app. The same font family (“Delius”) is applied throughout. All forms and tables share similar white backgrounds with rounded corners and subtle shadows, which ties the login page and main app together. Buttons also repeat the same styling: rounded edges, pink background, and white text, ensuring users instantly recognize them as clickable actions no matter where they appear. This repetition makes the interface predictable and easy to navigate, reducing the learning curve that is needed to use it.

Alignment
The layout of my app is strongly guided by alignment. On the login page, all inputs and labels are neatly left-aligned within a card in the center. On the main grocery page, the form fields are arranged in a grid (.form-flex-container) that aligns inputs and the submit button into a balanced layout. The grocery list table enforces column alignment, so every row lines up under consistent headers like “Item,” “Category,” and “Urgent.” These alignment choices make the interface look structured and professional, avoiding clutter or misaligned elements.

Proximity
Proximity helps group related elements together in my design. On the login page, the username and password inputs are placed close together with labels above them, making it clear that they belong to the same form. The “Login / Create” button is positioned directly below, showcasing its connection to the inputs. On the grocery page, the form is above the table, with fields grouped so users can see all entry requirements in one area. Within the table, item details (name, category, expiration, urgency) are grouped in the same row, making it easy to scan across related information. These proximity choices help users find what they need quickly.

Accessibility:
- I added alt text to images so screen readers can describe them to users.
- I made sure headings (h1, h2, etc.) follow a consistent order so the content is easy to navigate.
- I used labels for input fields so users know what information to type in.
- Buttons have clear text instead of just icons so their purpose is obvious.
- I made sure there is enough color contrast between text and background for readability.
- Form fields include placeholder text for extra guidance.
- I used consistent heading text so people scanning the page can understand sections.
- Links are descriptive (not just “click here”) so users know where they go.
- Font sizes are readable and not too small.
- Interactive elements like buttons have enough spacing so they are easy to click.
- The site works without needing a mouse, since you can tab through forms and buttons.
- I made sure forms give context with both labels and placeholder text, so users don’t have to rely only on layout or guessing to know what to type.
- I structured the HTML with elements like <header> and <main> so that assistive programs (such as a voice reader) can interpret the layout more easily.

# ************************************
****** Technical Achievements: ******
# ************************************
- used express.json(), express.urlencoded(), express-session, connect-mongo, dotenv, mongoose
- also wrote a custom requireAuth function to protect routes so only logged-in users can access their grocery list.

Lighthouse results:
- Performance: 99
- Accessibility: 78
- Best Practices: 96
- SEO: 82


