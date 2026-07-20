#include <iostream>
#include "crf_config.hpp"

int main() {
    try {
        ConfigManager cfg;
        cfg.load("config.yaml");
        std::cout << cfg.getValue<std::string>("height") << std::endl;  // Example usage of getValue
        std::cout << cfg.getValue<std::string>("confidence_threshold") << std::endl;  // Example usage of getValue
        std::cout << cfg.getValue<std::string>("engine_path") << std::endl;  // Example usage of getValue

    } catch (const std::exception& e) {
        std::cerr << "Config error: " << e.what() << std::endl;
        return 1;   // graceful exit
    }

}