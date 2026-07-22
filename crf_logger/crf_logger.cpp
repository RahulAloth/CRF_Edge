#include "crf_logger.hpp"
#include <iostream>

void crfLogger::log(Severity severity, const char* msg) noexcept {
    if (severity <= Severity::kWARNING) {
        std::cout << "[CRF::TensorRT] " << msg << std::endl;
    }
}
