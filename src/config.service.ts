import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from './config.interface';

@Injectable()
export class ConfigService {
  private config: AppConfig;

  constructor() {
    const configFilePath = process.env.CONFIG_FILE || './config.json';

    // Load and parse the main configuration file
    const rawConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8')) as AppConfig;

    if (!rawConfig || typeof rawConfig !== 'object') {
      throw new Error('Invalid or empty configuration file.');
    }

    this.config = {} as AppConfig;

    // Iterate through keys and load external files if necessary
    (Object.keys(rawConfig) as Array<keyof AppConfig>).forEach((key) => {
      const rawValue = rawConfig[key];
      if (typeof rawValue === "string") {
        const filePath = this.resolveFilePath(rawValue);
        this.validateFilePath(filePath);
        this.config[key] = this.loadFileContent(filePath) as any;
      } else {
        this.config[key] = rawValue as any;
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
  private interpolateEnvVariables(config: Record<string, any>): AppConfig {
    const processConfig = (value: any): any => {
      if (typeof value === 'string') {
        return value.replace(/\$\{(\w+)\}/g, (_, envVar) => {
          const envValue = process.env[envVar];
          if (envValue === undefined) {
            throw new Error(`Environment variable ${envVar} is not defined`);
          }
          return envValue;
        });
      } else if (Array.isArray(value)) {
        return value.map(processConfig);
      } else if (typeof value === 'object' && value !== null) {
        const result: Record<string, any> = {};
        for (const k of Object.keys(value)) {
          result[k] = processConfig(value[k]);
        }
        return result;
      }
      return value;
    };

    return processConfig(config) as AppConfig;
  }

  /**
   * Resolves a file path, handling prefixes like "file:".
   * @param filePath The raw file path from configuration.
   * @returns The resolved absolute file path.
   */
  private resolveFilePath(filePath: string): string {
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
  private validateFilePath(filePath: string): void {
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
  private loadFileContent(filePath: string): any {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    try {
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error(
        `Error parsing JSON from file: ${filePath}. ${(error as Error).message}`,
      );
    }
  }

  /**
   * Retrieves the fully processed application configuration.
   * @returns The application configuration object.
   */
  getConfig(): AppConfig {
    return this.config;
  }
}
