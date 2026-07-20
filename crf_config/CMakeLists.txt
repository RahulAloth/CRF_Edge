cmake_minimum_required(VERSION 3.10)
project(crf_inf LANGUAGES CXX)

# ---------------------------------------------------------
# Compiler settings
# ---------------------------------------------------------
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -O3")


# ---------------------------------------------------------
# Source files
# ---------------------------------------------------------
include_directories(${CMAKE_SOURCE_DIR})

find_package(yaml-cpp REQUIRED)

set(SOURCES
    crf_config.cpp
    main.cpp
)

add_executable(crf_config ${SOURCES})


# ---------------------------------------------------------
# Link libraries
# ---------------------------------------------------------
target_link_libraries(crf_config yaml-cpp)
