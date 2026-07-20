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
    T getValue(const std::string& key) {
        const std::string& raw = std::get<std::string>(configMap_.at(key));

        if constexpr (std::is_same_v<T, int>) {
            return std::stoi(raw);
        } else if constexpr (std::is_same_v<T, double>) {
            return std::stod(raw);
        } else if constexpr (std::is_same_v<T, bool>) {
            return (raw == "true" || raw == "1");
        } else {
            return raw;
        }
    }


private:
    void iterateNode(const YAML::Node& node) const;
    using Value = std::variant<int, double, std::string>;
    mutable std::unordered_map<std::string, Value> configMap_;
    mutable std::string key_;
    std::string configPath_;
    YAML::Node root_;
};
