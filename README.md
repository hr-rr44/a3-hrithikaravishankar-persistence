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

AI Use: I ran into problems with my server.js routes (especially when adding and updating items). So, I used ChatGPT for debugging help. For example, it helped me realize that I forgot to include certain request body fields and that I declared some variables out of order. 

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
