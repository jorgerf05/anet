import scapy.all as scapy 
from mac_vendor_lookup import MacLookup
import json

def scan_arp(network: str,
             timeout: int = 5,
             retries: int = 3):

    request = scapy.ARP() 

    request.pdst = network
    broadcast = scapy.Ether() 

    broadcast.dst = 'ff:ff:ff:ff:ff:ff'
    responses = []

    request_broadcast = broadcast / request 
    clients = scapy.srp(request_broadcast, timeout = timeout, retry = retries)[0]


    for element in clients:
        ip_addr, mac_addr = f"{element[1].psrc}", f"{element[1].hwsrc}"
        print(ip_addr, mac_addr)
        try:
            vendor = MacLookup().lookup(mac_addr)
        except:
            vendor = "Unknown"

        responses.append({
            'ip':f"{ip_addr}",
            'mac':f"{mac_addr}",
            'vendor':f"{vendor}",
        })

    return json.dumps(responses)

if __name__ == "__main__":
    scan_arp("140.10.0.0/21", timeout=20, retries=3)