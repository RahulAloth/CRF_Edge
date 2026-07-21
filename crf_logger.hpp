#pragma once
#include "NvInfer.h"
#pragma once
#include <iostream>
#include <string>

enum class LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    NONE
};

class crfLogger : public nvinfer1::ILogger {
public:
    void log(Severity severity, const char* msg) noexcept override;
};

// Singleton wrapper
class g_crfLogger {
public:
    static crfLogger& get() {
        static crfLogger instance;   // created once, thread-safe
        return instance;
    }

private:
    g_crfLogger() = default;
};

#define LOG_TRACE(msg) Logger::log(LogLevel::TRACE, msg)
#define LOG_DEBUG(msg) Logger::log(LogLevel::DEBUG, msg)
#define LOG_INFO(msg)  Logger::log(LogLevel::INFO,  msg)
#define LOG_WARN(msg)  Logger::log(LogLevel::WARN,  msg)
#define LOG_ERROR(msg) Logger::log(LogLevel::ERROR, msg)

class Logger {
public:
    static void setLevel(LogLevel lvl) { level_ = lvl; }
    static LogLevel getLevel() { return level_; }

    static void log(LogLevel lvl, const std::string& msg) {
        if (lvl >= level_) {
            std::cout << msg << std::endl;
        }
    }

private:
    static inline LogLevel level_ = LogLevel::INFO;
};