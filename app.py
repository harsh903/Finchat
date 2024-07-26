from flask import Flask, request, jsonify, render_template
import chatbot  # Import functions from chatbot.py

app = Flask(__name__)

@app.route('/')
@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/finchat")
def finchat():
    return render_template("finchat.html")

@app.route("/realtime_analysis")
def realtime_analysis():
    return render_template("realtime_analysis.html")

@app.route("/query", methods=["POST"])
def ask():
    try:
        data = request.form
        query = data.get("query", "")

        if query:
            response = chatbot.get_response(query)
        else:
            response = "No query provided"

        return jsonify({"response": response})

    except Exception as e:
        app.logger.error(f"Error in /query route: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
