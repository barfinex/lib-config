import { Detector, Inspector, Provider } from "@barfinex/types";

/**
 * Main configuration interface for the application.
 * Defines separate configuration sections for advisor, inspector, detector, and provider.
 */
/**
 * Main configuration interface for the application.
 * Each module has its own sub-configuration.
 */
export interface AppConfig {
  advisor?: AdvisorConfig;   // Advisor module configuration
  inspector?: Inspector;     // Inspector module configuration
  detector?: Detector;       // Detector module configuration
  provider?: Provider;       // Provider module configuration
}


/**
 * Generic Advisor config with flexible structure.
 */
export interface AdvisorConfig {
  [key: string]: unknown;
}

// Configuration for the Inspector module
// export interface InspectorConfig {
//   general: InspectorGeneralConfig;                 // General settings for Inspector
//   riskManagement: InspectorRiskManagementConfig;   // Risk management settings
//   assetManagement: InspectorAssetManagementConfig; // Asset management settings
//   tradeSettings: InspectorTradeSettingsConfig;     // Trade-related settings
//   strategyLogic: InspectorStrategyLogicConfig;     // Strategy logic configuration
// }



// Risk management settings for the Inspector
// export interface InspectorRiskManagementConfig {
//   takeProfitPercent: number;                // Percentage for taking profit
//   stopLossPercent: number;                  // Percentage for stopping loss
//   breakevenPercent: number;                 // Breakeven point percentage
//   maxDailyLossPercent: number;              // Maximum daily loss allowed (percent)
//   maxDailyProfitPercent: number;            // Maximum daily profit allowed (percent)
//   maxDrawdownPercent: number;               // Maximum allowed drawdown (percent)
//   maxLossTradesPerDay: number;              // Maximum loss trades allowed per day
//   maxTradesPerDay: number;                  // Maximum trades allowed per day
//   riskPerTradePercent: number;              // Risk per trade as a percentage
//   minRiskRewardRatio: number;               // Minimum risk-to-reward ratio
// }

// // Asset management settings for the Inspector
// export interface InspectorAssetManagementConfig {
//   excludedAssets: string[];                 // List of assets to exclude
//   preferredAssets: string[];                // List of preferred assets
//   slippageTolerancePercent: number;         // Tolerance for slippage (percent)
//   spreadTolerancePercent: number;           // Tolerance for spread (percent)
// }

// // Trade-related settings for the Inspector
// export interface InspectorTradeSettingsConfig {
//   maxPositionHoldTime: number;              // Maximum time to hold a position
//   maxPositionSizePercent: number;           // Maximum position size (percent)
//   minPositionSizePercent: number;           // Minimum position size (percent)
//   maxLeverage: number;                      // Maximum leverage allowed
//   defaultLeverage: number;                  // Default leverage
//   trailingStopPercent: number;              // Trailing stop percentage
//   trailingTakeProfitPercent: number;        // Trailing take profit percentage
// }

// // Strategy logic settings for the Inspector
// // export interface InspectorStrategyLogicConfig {
// //   cooldownPeriod: number;                   // Cooldown period after a trade
// //   maxConsecutiveLosses: number;             // Maximum consecutive losses allowed
// //   minROIThreshold: number;                  // Minimum ROI (Return on Investment) threshold
// //   maxROIThreshold: number;                  // Maximum ROI threshold
// // }







// // Telegram notification settings for the detector
// export interface DetectorTelegramNotifications {
//   botToken: string;              // Token for the Telegram bot used for sending notifications
//   chatId: string;                // Chat ID where notifications will be sent
//   messageFormat: string;         // Format of the notification messages
// }

// General configuration for the detector
// export interface DetectorGeneralConfig {
//   apiPort: number;               // Port on which the API will run
//   sysName: string;               // Name of the system instance
//   logLevel: string;              // Logging level (e.g., 'debug', 'info', 'warn', 'error')
//   // connectorsApiUrls: ConnectorApiUrl[];     // URL of connectors' APIs
//   useSandbox: boolean;           // Whether to use a sandbox environment
//   startFromScratch: boolean;     // If true, starts with a clean slate
//   quoteCurrency: string;
//   notifications: {               // Notification settings
//     telegram: DetectorTelegramNotifications; // Telegram notification configuration
//   };

// }

// Configuration for individual trading symbols
// export interface DetectorSymbols {
//   symbol: Symbol;                // Trading symbol (e.g., 'BTCUSD')
//   leverage: number;              // Leverage to apply for trades
//   quantity: number;              // Quantity to trade
// }



// // Parameters for indicators used in the detector
// export interface DetectorIndicatorParameters {
//   period: number;                // Time period for the indicator
//   source: string | {             // Source of the indicator values
//     peak: string;                // Source for peak values (if applicable)
//     trough: string;              // Source for trough values (if applicable)
//   };
//   overboughtLevel?: number;      // Level indicating overbought conditions (optional)
//   oversoldLevel?: number;        // Level indicating oversold conditions (optional)
// }

// // Visualization settings for indicators
// export interface DetectorIndicatorVisual {
//   group?: string;                // Optional grouping for visualization
//   paneSysName: string;           // System name of the visualization pane
// }

// // Base indicator configuration
// export interface DetectorBaseIndicator {
//   name: string;                  // Name of the indicator
//   parameters: DetectorIndicatorParameters; // Parameters for the indicator
//   visual: DetectorIndicatorVisual;         // Visualization settings
// }

// // Configuration for custom indicators
// export interface DetectorCustomIndicator extends DetectorBaseIndicator {
//   path: string;                  // File path to the custom indicator script
// }

// // All indicators used in the detector
// export interface DetectorIndicators {
//   general: Record<string, unknown>; // General settings for indicators
//   baseIndicators: DetectorBaseIndicator[]; // List of base indicators
//   customIndicators: DetectorCustomIndicator[]; // List of custom indicators
// }

// // Integration settings for the advisor's features
// export interface DetectorAdvisorIntegration {
//   general: {
//     apiBaseUrl: string;          // Base URL for the advisor's API
//   };
//   features: {
//     tradingAdvice: {             // Settings for trading advice
//       updateIntervalMs: number;  // Interval for updates in milliseconds
//       supportedInstruments: string[]; // List of supported trading instruments
//     };
//     portfolioOptimization: {     // Settings for portfolio optimization
//       maxAssets: number;         // Maximum number of assets in the portfolio
//       riskToleranceLevels: string[]; // Levels of risk tolerance
//     };
//     scenarioAnalysis: {          // Settings for scenario analysis
//       scenarios: string[];       // List of scenarios to analyze
//     };
//     aiIntegration: {             // AI integration settings
//       gptApiKey: string;         // API key for GPT integration
//       useCases: string[];        // List of use cases for AI
//     };
//   };
// }

// // Plugin configuration for the detector
// export interface DetectorPlugin {
//   name: string;                  // Name of the plugin
//   path: string;                  // File path to the plugin
//   enabled: boolean;              // Whether the plugin is enabled
//   options?: Record<string, unknown>; // Optional plugin-specific options
// }

// // Full configuration for the detector
// export interface DetectorConfig {
//   // symbols: Symbol[]; // List of trading symbols to configure
//   general: DetectorGeneralConfig;  // General settings for the detector
//   subscriptions: Subscription[]; // Subscription settings
//   indicators: DetectorIndicators;  // Indicator configurations
//   advisorIntegration: DetectorAdvisorIntegration; // Advisor integration settings
//   plugins: DetectorPlugin[];       // List of plugins and their configurations
// }







// // Configuration for provider settings
// export interface ProviderConfig {
//   restApiToken: string;                         // API token for provider authentication
//   connectors: Connector[];          // List of provider connectors
// }

