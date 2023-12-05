from flask import Flask, jsonify, request
from flask_cors import CORS
from scanarp import scan_arp

app = Flask(__name__)
CORS(app)


@app.route("/api/networkscan")
def scan_results():
    network_cidr = request.args.get("network")
    timeout = int (request.args.get("timeout"))
    retries = int (request.args.get("retries"))
    if not network_cidr:
        return {"Error": "Specify a network in CIDR notation"}, 400

    results = scan_arp(network_cidr, timeout=timeout, retries=retries)
    return jsonify(results)
