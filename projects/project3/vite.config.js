// Configuration ---------------------------------------------------------

// Load Vite and React plugin.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Enable React development tools.
export default defineConfig({
  plugins: [react()],
});
