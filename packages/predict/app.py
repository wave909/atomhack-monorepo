import os
import nltk
import nltk.corpus
from nltk.text import TextCollection

from flask import request
from flask import Flask
from flask import jsonify
from flask import render_template

import re
import string

punct = re.compile("[" + re.escape(string.punctuation) + "]")

root_dir = os.getenv('WORKING_DIR', os.path.abspath(__file__))

print('Running at:')
print(root_dir)

app = Flask(__name__)


def classify_task(task):
    sentences = nltk.sent_tokenize(task, language="russian")
    texts = TextCollection(sentences)

    analyzed = []
    for sentence in sentences:
        tokens = nltk.word_tokenize(sentence, language="russian")
        for token in tokens:
            if punct.search(token):
                continue
            analyzed.append({
                "term": token,
                "score": texts.tf(token, sentence)  # TODO: Consider using TF-IDF once a sufficient corpora is acquired
            })
    return analyzed


# TODO: Add message queue
@app.route('/classify', methods=["POST", "GET"])
def post_classifier():
    tasks = None
    if "tasks" in request.json:
        tasks = request.json['tasks']

    classified_tasks = list(map(classify_task, tasks))

    return jsonify(classified_tasks)


app.run(debug=False, host='0.0.0.0', port='1338')
