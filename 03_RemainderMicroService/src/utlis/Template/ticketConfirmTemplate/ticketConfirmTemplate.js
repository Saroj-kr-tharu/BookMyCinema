const generateTicketEmail = (data) => {
    const {
        email,
        Image,
        Ticket,
        movie,
        showtime,
        cinema,
        cinemaLocation,
        showname,
        notificationTime,
        transactionId,
        amount,
        currency,
        status
    } = data;
    
    // Format date and time
    const showDateTime = new Date(showtime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kathmandu'
    });

    // Format amount with currency and proper spacing
    const formattedAmount = `${currency.toUpperCase()} ${Number(amount).toFixed(2)}`;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${movie} - Ticket Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden;">
            <!-- Header with Movie Theme -->
            <div style="background: linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%); padding: 40px 24px; text-align: center; position: relative;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background: url('https://i.imgur.com/7pHqVK7.png') center/cover;"></div>
                <div style="position: relative;">
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 0.5px;">Your Tickets Are Ready!</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 18px; font-weight: 500;">${movie}</p>
                </div>
            </div>

            <!-- Ticket Card -->
            <div style="padding: 32px 24px; position: relative;">
                <!-- Ticket QR Code Section -->
                <div style="margin: -60px auto 32px; width: 200px; height: 200px; background: white; border-radius: 16px; padding: 10px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <img src="${Image}" alt="Ticket QR Code" style="width: 180px; height: 180px; border-radius: 8px; object-fit: contain;"/>
                </div>
                <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: -20px; margin-bottom: 30px;">Scan this QR code at the cinema entrance</p>

                <!-- Movie Details Card -->
                <div style="background: #f8fafc; border-radius: 16px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <p style="color: #64748b; font-size: 14px; margin: 0 0 4px; font-weight: 500;">Cinema</p>
                            <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0;">${cinema}</p>
                        </div>
                        <div>
                            <p style="color: #64748b; font-size: 14px; margin: 0 0 4px; font-weight: 500;">Location</p>
                            <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0;">${cinemaLocation}</p>
                        </div>
                        <div>
                            <p style="color: #64748b; font-size: 14px; margin: 0 0 4px; font-weight: 500;">Screen</p>
                            <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0;">${showname}</p>
                        </div>
                        <div>
                            <p style="color: #64748b; font-size: 14px; margin: 0 0 4px; font-weight: 500;">Seats</p>
                            <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0;">${Array.isArray(Ticket) ? Ticket.join(', ') : Ticket}</p>
                        </div>
                    </div>

                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 4px; font-weight: 500;">Show Time</p>
                        <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0;">${showDateTime}</p>
                    </div>
                </div>

                <!-- Payment Info Card -->
                <div style="background: linear-gradient(to right, #f8fafc, #f1f5f9); border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    <h3 style="margin-top: 0; margin-bottom: 16px; color: #334155; font-size: 16px; font-weight: 600;">Payment Details</h3>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <span style="color: #64748b; font-size: 14px; font-weight: 500;">Amount Paid</span>
                        <span style="color: #059669; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">${formattedAmount}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #64748b; font-size: 14px; font-weight: 500;">Transaction ID</span>
                        <span style="color: #475569; font-size: 14px; font-family: monospace; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">${transactionId}</span>
                    </div>
                </div>
            </div>

            <!-- Important Notes -->
            <div style="padding: 0 24px 32px;">
                <div style="background: #eff6ff; border-radius: 12px; padding: 16px 20px;">
                    <h3 style="color: #1e40af; font-size: 15px; margin: 0 0 12px; font-weight: 600;">Important Information:</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #3b82f6; font-size: 14px;">
                        <li style="margin-bottom: 8px;"><span style="color: #1e3a8a;">Please arrive 30 minutes before showtime</span></li>
                        <li style="margin-bottom: 8px;"><span style="color: #1e3a8a;">Carry a valid ID proof</span></li>
                        <li><span style="color: #1e3a8a;">Outside food and beverages are not allowed</span></li>
                    </ul>
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 24px; background: #f8fafc; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">© ${new Date().getFullYear()} ${cinema}</p>
                <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Need help? Contact us at <a href="mailto:support@${cinema.toLowerCase()}.com" style="color: #3b82f6; text-decoration: none;">support@${cinema.toLowerCase()}.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = generateTicketEmail;