# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# CRF Frontend — Docker Setup Guide

## 📦 Overview
This project contains the production‑ready Docker image for the CRF Frontend.
The frontend is built using a multi‑stage Docker build and served using NGINX inside the container.

This guide explains:

- How to build the Docker image
- How to run it locally
- How to port it to another machine

---

## 🚀 1. Build the Docker Image

Run the following command from the project root (where the Dockerfile is located):

```code
docker build -t crf-frontend .
```
Verify the image:

docker images

---

## ▶️ 2. Run the Frontend Container

The frontend is served by NGINX, which listens on port 80 inside the container.

You can map it to any free port on your machine.

### Recommended example:

```code
docker run -d -p 9090:80 crf-frontend
```
Open the app in your browser:

```code
http://localhost:9090
```

### Check running containers:

```code
docker ps
```
### Stop the container:

```code
docker stop <container_id>
```
---

## 🌍 3. Port the Docker Image to Another Machine

You can move this image to any machine without needing a registry.

### Step 1 — Save the image to a file

```code
docker save -o crf-frontend.tar crf-frontend
```

This creates a portable file named:

crf-frontend.tar

Copy it via USB, SCP, SSD, cloud, etc.

### Step 2 — Load the image on the target machine

```code
docker load -i crf-frontend.tar
```
### Step 3 — Run it on the target machine

```code
docker run -d -p 9090:80 crf-frontend
```
Open:

```code
http://localhost:9090
```
---

## 🧪 4. Troubleshooting

### Port already in use

If you see:

```code
Bind for 0.0.0.0:<port> failed: port is already allocated
```

Use another port:

```code
docker run -d -p 3000:80 crf-frontend
```

### Check what is using a port

```code
sudo lsof -i :5173
sudo lsof -i :8080
sudo lsof -i :9090
```
---

## 📁 5. Folder Structure (example)

```code
crf-frontend/
 ├── Dockerfile
 ├── dist/              # Built frontend files
 ├── nginx.conf         # Optional custom NGINX config
 └── README.md
```

---

## ✔️ Summary

- You built the image using `docker build`
- You ran it using `docker run -p HOST_PORT:80`
- You ported it using `docker save` and `docker load`
- The app is served by NGINX on port 80 inside the container

This README is production‑ready and can be committed as‑is.

