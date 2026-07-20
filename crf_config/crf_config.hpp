#pragma once
#include <yaml-cpp/yaml.h>
#include <string>
#include <sstream>
#include <stdexcept>
#include <string>
#include <variant>
#include <unordered_map>
#include <iostream>

class ConfigManager {
public:
    int load(const std::string& path);
    template<typename T>
    T getValue(const std::string& key) const {
        return std::get<T>(configMap_.at(key));
    }


private:
    void iterateNode(const YAML::Node& node) const;
    using Value = std::variant<int, double, std::string>;
    mutable std::unordered_map<std::string, Value> configMap_;
    mutable std::string key_;
    std::string configPath_;
    YAML::Node root_;
};
