import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Quack | Multi-Agentic Desktop App',
  description: 'Download Quack - The powerful multi-agentic desktop app built on Claude Agent SDK',
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Download Quack 🦆
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            The powerful multi-agentic desktop app built on Claude Agent SDK
          </p>
        </div>

        {/* Main Download Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 hover:border-purple-400/50 transition-all">
            <div className="text-center mb-8">
              <div className="text-8xl mb-6">🦆</div>
              <h2 className="text-3xl font-bold text-white mb-4">Latest Release</h2>
              <p className="text-purple-200">
                Available for macOS, Windows, and Linux
              </p>
            </div>

            <a
              href="https://github.com/AlekDob/quack-releases/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg py-4 px-8 rounded-lg text-center transition-all hover:scale-105 shadow-lg"
            >
              Download Latest Version →
            </a>

            <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2"></div>
                <p className="text-purple-300 text-sm font-semibold">macOS</p>
                <p className="text-purple-400 text-xs">M1/M2/M3 & Intel</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🪟</div>
                <p className="text-blue-300 text-sm font-semibold">Windows</p>
                <p className="text-blue-400 text-xs">Windows 10/11</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🐧</div>
                <p className="text-green-300 text-sm font-semibold">Linux</p>
                <p className="text-green-400 text-xs">AppImage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-white font-semibold mb-2">Multi-Terminal</h3>
            <p className="text-purple-300 text-sm">Powerful multi-terminal emulator with intelligent state detection</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-white font-semibold mb-2">AI Assistant</h3>
            <p className="text-purple-300 text-sm">Powered by Claude Agent SDK with real-time streaming</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-white font-semibold mb-2">Auto-Update</h3>
            <p className="text-purple-300 text-sm">Automatic updates notification when new versions are available</p>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Installation Instructions</h3>

            <div className="grid md:grid-cols-3 gap-8">
              {/* macOS */}
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3 flex items-center">
                  <span className="text-2xl mr-2"></span>
                  macOS
                </h4>
                <ol className="list-decimal list-inside text-purple-200 space-y-2 text-sm">
                  <li>Download the <code className="bg-black/30 px-1 rounded">.dmg</code> file</li>
                  <li>Open the DMG</li>
                  <li>Drag Quack to Applications</li>
                  <li>If security warning appears:
                    <ul className="list-disc list-inside ml-4 mt-1 text-xs text-purple-300">
                      <li>System Settings → Privacy & Security</li>
                      <li>Click "Open Anyway"</li>
                    </ul>
                  </li>
                </ol>
              </div>

              {/* Windows */}
              <div>
                <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🪟</span>
                  Windows
                </h4>
                <ol className="list-decimal list-inside text-purple-200 space-y-2 text-sm">
                  <li>Download the <code className="bg-black/30 px-1 rounded">.msi</code> file</li>
                  <li>Double-click to run installer</li>
                  <li>Follow installation wizard</li>
                  <li>Launch from Start menu</li>
                </ol>
              </div>

              {/* Linux */}
              <div>
                <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🐧</span>
                  Linux
                </h4>
                <ol className="list-decimal list-inside text-purple-200 space-y-2 text-sm">
                  <li>Download the <code className="bg-black/30 px-1 rounded">.AppImage</code></li>
                  <li>Make executable:
                    <pre className="bg-black/30 px-2 py-1 rounded text-xs mt-1">chmod +x Quack*.AppImage</pre>
                  </li>
                  <li>Run:
                    <pre className="bg-black/30 px-2 py-1 rounded text-xs mt-1">./Quack*.AppImage</pre>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Update Info */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-green-400/30">
            <p className="text-green-300 text-sm">
              ✨ <strong>Auto-updates enabled!</strong> Quack will notify you when new versions are available.
            </p>
          </div>
        </div>

        {/* GitHub Link */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/AlekDob/quack-releases/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-purple-300 hover:text-purple-200 transition-colors text-sm"
          >
            View all releases on GitHub →
          </a>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block text-purple-300 hover:text-purple-200 transition-colors"
          >
            ← Back to Quack Agency
          </a>
        </div>
      </div>
    </div>
  );
}
