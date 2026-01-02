'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            reactjs-signal
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Share Store State with the Signal Pattern
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          A lightweight, performant state management library for React built on top of{' '}
          <a
            href="https://github.com/stackblitz/alien-signals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2"
          >
            Alien Signals
          </a>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Link
            href="/docs"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/hunghg255/reactjs-signal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 font-semibold hover:border-gray-400 dark:hover:border-gray-600 transition-all"
          >
            View on GitHub
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Built on Alien Signals for optimal performance with minimal overhead
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Simple API</h3>
            <p className="text-sm text-muted-foreground">
              Intuitive hooks-based API that feels natural to React developers
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="text-lg font-semibold mb-2">Tiny Bundle</h3>
            <p className="text-sm text-muted-foreground">
              Minimal bundle size impact - keep your apps lightweight
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="pt-12 max-w-2xl mx-auto">
          <div className="text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Quick Example</h3>
            </div>
            <pre className="p-4 rounded-lg bg-gray-900 dark:bg-gray-950 overflow-x-auto text-sm">
              <code className="text-gray-100">
{`import { createSignal, useSignal } from 'reactjs-signal';

const countSignal = createSignal(0);

function Counter() {
  const [count, setCount] = useSignal(countSignal);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* NPM Install */}
        <div className="pt-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <code className="text-sm font-mono">npm install reactjs-signal</code>
            <button
              onClick={() => navigator.clipboard.writeText('npm install reactjs-signal')}
              className="text-blue-600 hover:text-blue-700 transition-colors"
              title="Copy to clipboard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
