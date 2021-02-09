from flask import Flask
from flask import request
from flask import send_from_directory
from uplatnica import kreiraj_uplatnicu

app = Flask(__name__)


@app.route("/uplatnica", methods=['POST'])
def generirajUplatnicu():
    naziv_uplatnice = 'uplatnica.pdf'
    uplatnica = kreiraj_uplatnicu(request.data)
    open(f'../generated/{naziv_uplatnice}', 'wb').write(uplatnica)
    return send_from_directory('../generated', naziv_uplatnice)


if __name__ == "__main__":
    # app.run(host='188.34.178.129')
    app.run(host='0.0.0.0')
