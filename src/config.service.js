"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ConfigService = class ConfigService {
    constructor() {
        const configFilePath = process.env.CONFIG_FILE || './config.json';
        // Load and parse the main configuration file
        const rawConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
        if (!rawConfig || typeof rawConfig !== 'object') {
            throw new Error('Invalid or empty configuration file.');
        }
        this.config = {};
        // Iterate through keys and load external files if necessary
        Object.keys(rawConfig).forEach((key) => {
            const rawValue = rawConfig[key];
            if (typeof rawValue === "string") {
                const filePath = this.resolveFilePath(rawValue);
                this.validateFilePath(filePath);
                this.config[key] = this.loadFileContent(filePath);
            }
            else {
                this.config[key] = rawValue;
            }
        });
        // Replace environment variable placeholders
        this.config = this.interpolateEnvVariables(this.config);
    }
    /**
     * Replaces placeholders in the configuration with values from environment variables.
     * @param config The raw configuration object.
     * @returns The processed configuration object with interpolated environment variables.
     * @throws An error if a referenced environment variable is not defined.
     */
    interpolateEnvVariables(config) {
        const processConfig = (value) => {
            if (typeof value === 'string') {
                return value.replace(/\$\{(\w+)\}/g, (_, envVar) => {
                    const envValue = process.env[envVar];
                    if (envValue === undefined) {
                        throw new Error(`Environment variable ${envVar} is not defined`);
                    }
                    return envValue;
                });
            }
            else if (Array.isArray(value)) {
                return value.map(processConfig);
            }
            else if (typeof value === 'object' && value !== null) {
                const result = {};
                for (const k of Object.keys(value)) {
                    result[k] = processConfig(value[k]);
                }
                return result;
            }
            return value;
        };
        return processConfig(config);
    }
    /**
     * Resolves a file path, handling prefixes like "file:".
     * @param filePath The raw file path from configuration.
     * @returns The resolved absolute file path.
     */
    resolveFilePath(filePath) {
        if (filePath.startsWith('file:')) {
            return path.resolve(filePath.replace('file:', ''));
        }
        return path.resolve(filePath);
    }
    /**
     * Validates the existence of a file at the given path.
     * @param filePath The path to validate.
     * @throws An error if the file does not exist.
     */
    validateFilePath(filePath) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
    }
    /**
     * Loads and parses the content of a JSON file.
     * @param filePath The path to the JSON file.
     * @returns The parsed JSON content.
     * @throws An error if the file content cannot be parsed.
     */
    loadFileContent(filePath) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(fileContent);
        }
        catch (error) {
            throw new Error(`Error parsing JSON from file: ${filePath}. ${error.message}`);
        }
    }
    /**
     * Retrieves the fully processed application configuration.
     * @returns The application configuration object.
     */
    getConfig() {
        return this.config;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
