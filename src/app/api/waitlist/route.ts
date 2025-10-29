import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Add to Brevo (Sendinblue)
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(process.env.BREVO_LIST_ID!)],
        attributes: {
          SOURCE: source || 'website',
          SIGNUP_DATE: new Date().toISOString(),
        },
        updateEnabled: true, // Update if contact already exists
      }),
    })

    if (!brevoResponse.ok && brevoResponse.status !== 400) {
      // 400 means contact already exists, which is fine
      const errorData = await brevoResponse.json()
      console.error('Brevo API error:', errorData)

      // Only return error if it's not a "contact already exists" error
      if (!errorData.message?.includes('already exists')) {
        return NextResponse.json(
          { error: 'Failed to add to waitlist' },
          { status: 500 }
        )
      }
    }

    // Success! Track in PostHog (client-side will handle this)
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!'
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
