#include "crf_config.hpp"
#include <iostream>

int ConfigManager::load(const std::string& path) {
    configPath_ = path;

    try {
        root_ = YAML::LoadFile(path);
        if (!root_) {
            std::cerr << "Failed to load YAML config: " << path << std::endl;
            return 1;
        }
    }
    catch (const std::exception& e) {
        std::cerr << "Error loading config file: " << path
                  << " (" << e.what() << ")" << std::endl;
        return 1;
    }
    iterateNode(root_);  // Call iterateNode to print the structure of the root node
#if 0
    for (const auto& [key, value] : configMap_) {
    std::cout << key << " = ";

    std::visit([](auto&& v) {
        std::cout << v;
    }, value);

    std::cout << '\n';
}
#endif

    return 0;
}

void ConfigManager::iterateNode(const YAML::Node& node) const{
    if (node.IsScalar()) {
        // Scalar node
        // std::cout << "Scalar: " << node.Scalar() << "\n";
        configMap_[key_] = node.Scalar();  // Store the node in the configMap_ for later retrieval
    }
    else if (node.IsSequence()) {
        // Sequence: iterate elements
        for (YAML::const_iterator it = node.begin(); it != node.end(); ++it) {
            const YAML::Node& elem = *it;
            iterateNode(elem);  // recurse if you want
        }
    }
    else if (node.IsMap()) {
        // Map: iterator yields key/value pair
        for (YAML::const_iterator it = node.begin(); it != node.end(); ++it) {
            const YAML::Node& key   = it->first;
            const YAML::Node& value = it->second;
            key_ = key.as<std::string>();  // Store the key for later use in configMap_
            // std::cout << "Key: " << key_ << "\n"; If you want to print the key, uncomment this line

            iterateNode(value);  // recurse if you want
        }
    }
}



