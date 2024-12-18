from flask import Flask, request, jsonify
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

# Initialize the Flask app and download NLTK VADER lexicon
nltk.download('vader_lexicon')
app = Flask(__name__)

# Sentiment analysis function
def analyze_sentiment(feedback):
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(feedback)
    if sentiment_scores['compound'] > 0.05:
        return 'Positive'
    elif sentiment_scores['compound'] < -0.05:
        return 'Negative'
    else:
        return 'Neutral'

@app.route('/analyze', methods=['POST'])
def analyze():
    feedback = request.json.get('feedback')
    sentiment = analyze_sentiment(feedback)
    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True)
