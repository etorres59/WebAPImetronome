from flask import Flask, render_template

#Initializes the Flask app
app = Flask(__name__)

# Defines a route for the home page
@app.route('/') # when a user visits http://127.0.0.1:5000/ Flask will call the index function
def index():
    return render_template('index.html') #Renders index.html template

# Run the app when the script is executed directly
if __name__ == '__main__':
    app.run(debug=True) #Enables debug mode for development
    