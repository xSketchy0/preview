import { google } from "googleapis";

export default async function handler(req, res) {
    try {
        const cal = google.calendar({
            version: 'v3',
            auth: process.env.GOOGLE_API
        }) 

        const params = {
            calendarId: process.env.CALENDAR_ID,
            orderBy: 'startTime',
            singleEvents: true,
            timeMin: new Date(req.query.startDate),
            timeMax: new Date(req.query.endDate)
        }
    
        const d = await cal.events.list(params)

        res.status(200).json(d.data.items)
    } catch (e) {
        res.status(500).json({
            error: "Failed to load data..."
        })
    }
}