# Host ↔ Edge File Transfer Test Application

- A lightweight FastAPI-based application used to validate bidirectional file transfer between a Host PC and an Edge device (Jetson, Orin, Linux PC, etc.) prior to integrating the full CRF processing pipeline.

## Overview

- This test setup consists of two independent FastAPI applications:

¸¸¸Ţext
+------------------+
|      HOST        |
| 192.168.178.24   |
| Port 8004        |
+--------+---------+
         |
         | POST test123.txt
         |
         v
+------------------+
|      EDGE        |
|192.168.178.112   |
| Port 8001        |
+--------+---------+
         |
         | POST edge_test.txt
         |
         v
+------------------+
|      HOST        |
+------------------+
¸¸¸

## Scope of the appliction.

- The purpose is to verify:
	- Host → Edge communication
	- Edge → Host communication
	- FastAPI connectivity
	- Network routing
	- Firewall configuration
	- File transfer functionality
	
## Network Configuration

#### Host Machine
IP Address : 192.168.xxx.xx
Port       : 8004

#### Edge Machine
IP Address : 192.xx.178.xx
Port       : 8001

## Prerequisites

-  Install required packages on both machines:
¸¸¸text
pip install fastapi uvicorn requests python-multipart
¸¸¸

##  Starting the Applications
- Start Edge Application
On the Edge device:
¸¸¸text
uvicorn edge_app:app --host 0.0.0.0 --port 8001
¸¸¸

- Expected:
¸¸¸text
INFO: Uvicorn running on http://0.0.0.0:8001
¸¸¸

## Start Host Application

-  On the Host machine:
¸¸¸text
uvicorn host_app:app --host 0.0.0.0 --port 8004
¸¸¸

- Expected:
¸¸¸text
INFO: Uvicorn running on http://0.0.0.0:8004
¸¸¸


### Connectivity Test
- Host → Edge

- Run on Host:
¸¸¸text
curl http://192.168.178.112:8001/
¸¸¸




