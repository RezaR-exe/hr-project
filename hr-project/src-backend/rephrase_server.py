from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from flask import Flask, request, jsonify

app = Flask(__name__)
tokenizer = AutoTokenizer.from_pretrained("tuner007/pegasus_paraphrase", use_fast=False)
model = AutoModelForSeq2SeqLM.from_pretrained("tuner007/pegasus_paraphrase")

@app.route("/paraphrase", methods=["POST"])
def paraphrase():
    data = request.json
    sentence = data.get("text", "")
    inputs = tokenizer([sentence], truncation=True, padding="longest", return_tensors="pt")
    translated = model.generate(**inputs)
    paraphrased = tokenizer.batch_decode(translated, skip_special_tokens=True)[0]
    return jsonify({"result": paraphrased})

if __name__ == "__main__":
    app.run(port=5000)