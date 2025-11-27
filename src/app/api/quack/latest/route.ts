import { NextResponse } from 'next/server';

/**
 * Tauri Auto-Update Endpoint (Proxy to GitHub Releases)
 * Fetches latest version info from quack-releases repository
 */
export async function GET() {
  try {
    // Fetch latest release info from GitHub API
    const response = await fetch(
      'https://api.github.com/repos/AlekDob/quack-releases/releases/latest',
      {
        headers: {
          'Accept': 'application/vnd.github+json',
        },
        next: { revalidate: 60 } // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch latest release');
    }

    const release = await response.json();

    // Extract version from tag (remove 'v' prefix)
    const version = release.tag_name.replace(/^v/, '');

    // Find download URLs for each platform
    const assets = release.assets || [];
    const getAssetUrl = (pattern: string) => {
      const asset = assets.find((a: any) => a.name.includes(pattern));
      return asset?.browser_download_url || '';
    };

    const latestVersion = {
      version,
      notes: release.body || 'See release notes on GitHub',
      pub_date: release.published_at,
      platforms: {
        'darwin-aarch64': {
          signature: '',
          url: getAssetUrl('aarch64.dmg'),
        },
        'darwin-x86_64': {
          signature: '',
          url: getAssetUrl('x64.dmg'),
        },
        'windows-x86_64': {
          signature: '',
          url: getAssetUrl('x64.msi'),
        },
        'linux-x86_64': {
          signature: '',
          url: getAssetUrl('amd64.AppImage'),
        },
      },
    };

    return NextResponse.json(latestVersion, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching latest release:', error);

    // Fallback response
    return NextResponse.json(
      { error: 'Failed to fetch latest release' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
