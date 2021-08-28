import os
import nltk
import nltk.corpus
from nltk.text import TextCollection

from flask import request
from flask import Flask
from flask import jsonify
from flask import render_template

import csv

import pymorphy2

import re
import string
import itertools
from operator import is_not
from functools import partial

def load_intents():
    with open('./data/intents.csv', newline='') as f:
        reader = csv.reader(f)
        return list(reader)


def prepare_intents_dict():
    dict = {}
    intents = load_intents()
    for intent_row in intents[1:]:
        if intent_row[0] == '':
            continue

        key_words = list(map(str.strip, intent_row[1].split(',')))
        intent = {
            "title": intent_row[0],
            "words": key_words,
            "handled_by": list(filter(
                partial(is_not, ""),
                intent_row[2:]
            ))
        }
        for word in key_words:
            keyed_intent_arr = dict.setdefault(word, [])
            keyed_intent_arr.append(intent)
    return dict


morph = pymorphy2.MorphAnalyzer()

punct = re.compile("[" + re.escape(string.punctuation) + "]")

root_dir = os.getenv('WORKING_DIR', os.path.abspath(__file__))

print('Running at:')
print(root_dir)

intents_dict = prepare_intents_dict()
app = Flask(__name__)


def classify_task(task):
    sentences = nltk.sent_tokenize(task, language="russian")
    # texts = TextCollection(sentences)

    analyzed = []
    for sentence in sentences:
        tokens = nltk.word_tokenize(sentence, language="russian")
        for token in tokens:
            if punct.search(token):
                continue

            possible_lexems = morph.parse(token)

            # Brute force homonym ambiguity resolution :)
            intent_pool = itertools.chain.from_iterable(filter(
                partial(is_not, None),
                map(lambda tag: intents_dict.get(tag.normal_form, None), possible_lexems)
            ))
            term_ambiguity = list({object_["title"]: object_ for object_ in intent_pool}.values())

            if len(term_ambiguity) == 0:
                continue

            # TODO: Consider using TF-IDF with text converted to normal form once a sufficient corpora is acquired
            # texts.tf(token, sentence)
            analyzed.append({
                "token": token,
                "intent_ambiguity": term_ambiguity,
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
