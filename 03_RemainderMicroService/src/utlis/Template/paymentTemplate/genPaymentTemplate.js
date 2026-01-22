const generatePaymentEmail = (data) => {
    const {
        userEmail,
        notificationTime,
        transitionId,
        amount,
        gateway,
        payment_status,
        currency
    } = data;

    // Format date nicely
    const formattedDate = new Date(notificationTime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Format amount with currency symbol
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);

    // Status badge color based on payment_status
    const getStatusColor = (status) => {
        switch (status) {
            case 'SUCCESS': return '#2ecc71';
            case 'FAILED': return '#e74c3c';
            case 'PENDING': return '#f39c12';
            default: return '#95a5a6';
        }
    };

    // Email HTML template using modern design
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Notification</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
          <div style="background-color: #4f46e5; padding: 30px; text-align: center;">
            <div style="margin-bottom: 10px;">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="color: white; margin: 0; font-weight: 600; font-size: 24px;">Payment Notification</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px; letter-spacing: -0.025em;">Hello ${userEmail.split('@')[0]},</p>
            <p style="margin-bottom: 20px;">We're writing to inform you that we've processed a payment for your account.</p>
            
            <div style="font-size: 32px; font-weight: 700; text-align: center; margin: 30px 0; color: #0f172a;">${formattedAmount}</div>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; color: white; background-color: ${getStatusColor(payment_status)}">
                ${payment_status}
              </span>
            </div>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
              
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                <span style="color: #64748b; font-weight: 500; margin-right: 20px;">Transaction ID</span>
                <span style="color: #334155; font-weight: 600; text-align: right;">${transitionId}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                <span style="color: #64748b; font-weight: 500; margin-right: 20px;">Date & Time</span>
                <span style="color: #334155; font-weight: 600; text-align: right;">${formattedDate}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                <span style="color: #64748b; font-weight: 500; margin-right: 20px;">Payment Method</span>
                <span style="color: #334155; font-weight: 600; text-align: right;">${gateway}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                <span style="color: #64748b; font-weight: 500; margin-right: 20px;">Payment Status</span>
                <span style="color: #334155; font-weight: 600; text-align: right;">${payment_status}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                <span style="color: #64748b; font-weight: 500; margin-right: 20px;">Email</span>
                <span style="color: #334155; font-weight: 600; text-align: right;">${userEmail}</span>
              </div>
            </div>
            
            <p style="margin-top: 20px;">If you have any questions about this payment, please don't hesitate to contact our support team.</p>
          </div>
          
          <div style="text-align: center; padding: 20px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            <p style="margin: 5px 0;">© 2025 MovieBooking Inc. All rights reserved.</p>
            <p style="margin: 5px 0;">Nepal Bagmati, Kritipur, TYH 2024</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

    return htmlContent;

};

module.exports = generatePaymentEmail