# Build and Run CRF Inference
## Clean Build

### Remove the existing build directory and create a fresh one:
```Code
rm -rf build

mkdir build
cd build
```
### Configure with CMake
- Generate the build files:

```Code
cmake ..
```
### Compile

- Build using all available CPU cores:

```Code
make -j$(nproc)
```

### Run

- Return to the project root and execute the application:
```Code
cd ..
./crf_inf
```

### Full Build Workflow
```Code
rm -rf build

mkdir build
cd build

cmake ..
make -j$(nproc)

cd ..
./crf_inf

```
# CRF Inference Build Guide

This document describes how to build and run the `crf_inf` application.

## Prerequisites

Ensure the following tools are installed:

- CMake
- GCC / G++
- Make

Verify installation:

```bash
cmake --version
make --version
g++ --version
```

---

## Clean Build

Remove any existing build artifacts:

```bash
rm -rf build
```

Create a new build directory:

```bash
mkdir build
cd build
```

Generate build files using CMake:

```bash
cmake ..
```

Compile the project using all available CPU cores:

```bash
make -j$(nproc)
```

---

## Run the Application

From the project root directory:

```bash
cd ..
./crf_inf
```

---

## Incremental Build

If the build directory already exists and only source files have changed:

```bash
cd build
make -j$(nproc)
```

If `CMakeLists.txt` has been modified:

```bash
cd build
cmake ..
make -j$(nproc)
```

---

## Complete Build Workflow

```bash
rm -rf build

mkdir build
cd build

cmake ..
make -j$(nproc)

cd ..
./crf_inf
```

---

## Common Mistakes

The following commands are invalid and should not be used:

```bash
make ..
make .
cmake
```

Use:

```bash
cmake ..
make -j$(nproc)
```

---

## Output

Successful compilation generates the executable:

```bash
./crf_inf
```
