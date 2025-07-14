#!/usr/bin/env node

/**
 * Worker process starter
 * This script starts the BullMQ worker that processes lead ingestion jobs
 */

console.log('🔧 Starting Web3 Prospector Worker...');
console.log('📅', new Date().toISOString());

// Import the worker (this will start it automatically)
require('./src/services/worker');

console.log('✅ Worker started successfully');
console.log('🔄 Listening for jobs on the "lead-processing" queue');
console.log('⏹️  Press Ctrl+C to stop the worker');
