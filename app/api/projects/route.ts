import { put, list, del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// GET - List all projects
export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'projects/' });
    
    const projects = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url);
          const data = await response.json();
          return {
            ...data,
            blobUrl: blob.url,
          };
        } catch (e) {
          console.error('Failed to parse project:', blob.pathname, e);
          return null;
        }
      })
    );

    // Filter out null entries and sort by savedAt descending
    const validProjects = projects
      .filter((p) => p !== null)
      .sort((a, b) => (b.savedAt || b.timestamp) - (a.savedAt || a.timestamp));

    return NextResponse.json({ projects: validProjects });
  } catch (error) {
    console.error('Failed to list projects:', error);
    return NextResponse.json(
      { error: 'Failed to list projects' },
      { status: 500 }
    );
  }
}

// POST - Save a project
export async function POST(request: NextRequest) {
  try {
    const session = await request.json();
    
    if (!session.id || !session.prompt || !session.artifacts) {
      return NextResponse.json(
        { error: 'Invalid project data' },
        { status: 400 }
      );
    }

    const projectData = {
      ...session,
      savedAt: Date.now(),
    };

    const blob = await put(
      `projects/${session.id}.json`,
      JSON.stringify(projectData),
      {
        access: 'public',
        contentType: 'application/json',
      }
    );

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error) {
    console.error('Failed to save project:', error);
    return NextResponse.json(
      { error: 'Failed to save project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID required' },
        { status: 400 }
      );
    }

    // List blobs to find the one to delete
    const { blobs } = await list({ prefix: `projects/${projectId}` });
    
    if (blobs.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete all matching blobs
    await Promise.all(blobs.map((blob) => del(blob.url)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
