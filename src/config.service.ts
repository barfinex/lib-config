import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from './config.interface';

@Injectable()
export class ConfigService {
  private readonly config: AppConfig;

  constructor() {
    // Path to the main configuration file
    const configFilePath = process.env.CONFIG_FILE || './config.json';

    // Load and parse the configuration file
    const rawConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8')) as AppConfig;

    // Validate the structure of the loaded configuration
    if (!rawConfig || typeof rawConfig !== 'object') {
      throw new Error('Invalid or empty configuration file.');
    }

    this.config = {} as AppConfig;

    // Process and load file paths into the configuration
    Object.keys(rawConfig).forEach((key) => {
      const filePath = this.resolveFilePath(rawConfig[key]);
      this.validateFilePath(filePath);
      this.config[key] = this.loadFileContent(filePath); // Load file content into the configuration
    });



    // Replace "$symbols" with the actual symbols array
    // this.replaceSymbolsPlaceholder();

    // console.log("process.env.PROVIDER_API_TOKEN:", process.env.PROVIDER_API_TOKEN);

    // Replace placeholders with environment variable values
    this.config = this.interpolateEnvVariables(this.config);

    // console.log("this.config :", this.config.provider.subscriptions);
  }

  /**
   * Replaces placeholders in the configuration with values from environment variables.
   * @param config The raw configuration object.
   * @returns The processed configuration object with interpolated environment variables.
   */
  private interpolateEnvVariables(config: Record<string, any>): AppConfig {
    const processConfig = (value: any): any => {
      if (typeof value === 'string') {
        // Replace ${VARIABLE_NAME} with corresponding environment variable
        return value.replace(/\$\{(\w+)\}/g, (_, envVar) => {
          const envValue = process.env[envVar];
          if (envValue === undefined) {
            throw new Error(`Environment variable ${envVar} is not defined`);
          }
          return envValue;
        });
      } else if (Array.isArray(value)) {
        // Recursively process arrays
        return value.map(processConfig);
      } else if (typeof value === 'object' && value !== null) {
        // Recursively process objects
        const result: Record<string, any> = {};
        for (const key of Object.keys(value)) {
          result[key] = processConfig(value[key]);
        }
        return result;
      }
      return value; // Return the value if it's not a string, array, or object
    };

    return processConfig(config) as AppConfig;
  }


  /**
  * Replaces "$symbols" placeholder with the actual symbols array from the config.
  */
  // private replaceSymbolsPlaceholder() {
  //   const symbols = this.config.provider.symbols; // Get the symbols array from the root of the config

  //   if (!symbols || !Array.isArray(symbols)) {
  //     throw new Error('Symbols array is missing or invalid in the configuration.');
  //   }

  //   // Recursively replace "$symbols" in the config
  //   const replaceInObject = (obj: any) => {
  //     for (const key in obj) {
  //       if (obj[key] === '$symbols') {
  //         obj[key] = symbols; // Replace "$symbols" with the actual symbols array
  //       } else if (typeof obj[key] === 'object' && obj[key] !== null) {
  //         replaceInObject(obj[key]); // Recursively process nested objects
  //       }
  //     }
  //   };

  //   replaceInObject(this.config);
  // }


  /**
   * Resolves a file path, handling custom prefixes like 'file:'.
   * @param filePath The raw file path.
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
      return JSON.parse(fileContent); // Parse JSON if the file contains valid data
    } catch (error) {
      throw new Error(`Error parsing JSON from file: ${filePath}. ${(error as Error).message}`);
    }
  }

  /**
   * Retrieves the fully processed configuration object.
   * @returns The application configuration object.
   */
  getConfig(): AppConfig {
    return this.config;
  }
}
